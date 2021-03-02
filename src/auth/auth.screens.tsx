import { UndrawContainer } from "@components/UndrawContainer";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setHasuraToken } from "./auth.hasura";
import { auth } from "./auth";
import MicrosoftAuthProvider from "./providers/MicrosoftAuthProvider";
import Auth0Provider from "./providers/Auth0Provider";
import { OAuthProvider } from "./providers/OAuthProvider";

let msProvider = new MicrosoftAuthProvider(auth, {
  client_id: "4f4f74ac-3c6e-4f3c-a5fd-d16590f893f2",
  redirect_uri: location.origin + "/auth/microsoft",
});

let auth0Provider = new Auth0Provider(auth, {
  client_id: "6vOmDwnROV8Gkr3NujQvMB1QfLjJhjdM",
  redirect_uri: location.origin + "/auth/auth0",
  connection: "github",
  domain: "droopytersen.us.auth0.com",
});

export function useForceLogin() {
  let navigate = useNavigate();
  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate("/login", { replace: true });
    }
  }, []);
}

export const LoginScreen = () => {
  if (auth.isLoggedIn) {
    return <div className="loading"></div>;
  }

  return (
    <UndrawContainer name="login" title={<h1 className="text-bold">Hey, come on in!</h1>}>
      <div style={{ width: "200px" }}>
        <div className="btn-group btn-group-block">
          <button className="btn btn-primary box-shadow" onClick={() => auth0Provider.login()}>
            Log in with Github
          </button>
        </div>
        <div className="btn-group btn-group-block mt-2">
          <button className="btn btn-primary box-shadow" onClick={() => msProvider.login()}>
            Log in with Microsoft
          </button>
        </div>
      </div>
    </UndrawContainer>
  );
};

export const CurrentUserScreen = () => {
  let navigate = useNavigate();
  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate("/login");
    }
  });

  if (!auth.isLoggedIn) return null;

  return (
    <>
      <UndrawContainer name="profile" title={<h1>{auth.currentUser?.name || "Current User"}</h1>}>
        <div>
          <Link to="/logout" className="btn btn-primary box-shadow">
            Log out
          </Link>
        </div>
        <pre className="box-shadow">{JSON.stringify(auth.currentUser, null, 2)}</pre>
      </UndrawContainer>
    </>
  );
};

function useAuthCallback(authProvider: OAuthProvider) {
  useEffect(() => {
    authProvider
      .ensureLogin()
      .then(() => setHasuraToken(authProvider.name))
      .then(() => {
        window.location.href = "/";
      });
  }, []);
}

export const MicrosoftAuthCallback = () => {
  useAuthCallback(msProvider);

  return (
    <UndrawContainer title="" name="season-change">
      <div className="loading loading-lg"></div>
    </UndrawContainer>
  );
};

export const GithubAuthCallback = () => {
  useAuthCallback(auth0Provider);

  return (
    <UndrawContainer title="" name="season-change">
      <div className="loading loading-lg"></div>
    </UndrawContainer>
  );
};

export const LogoutScreen = ({ force = true }) => {
  const logout = async () => {
    if (auth.isLoggedIn) {
      let provider = auth.provider;
      auth.logout();
      if (provider === "auth0") {
        return auth0Provider.logout("/logout");
      } else {
        window.location.reload();
      }
    }
  };
  useEffect(() => {
    if (force) {
      logout();
    }
  }, []);
  return (
    <UndrawContainer
      opacity=".2"
      name="quiting-time"
      title={<h1 className="text-bold">See ya!</h1>}
    >
      {!force && (
        <div style={{ width: "200px" }}>
          <div className="btn-group btn-group-block">
            <button className="btn btn-primary box-shadow" onClick={logout}>
              Log out
            </button>
          </div>
        </div>
      )}
    </UndrawContainer>
  );
};
