import { UndrawContainer } from "@components/UndrawContainer";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, OAuthProvider } from "./oauth";
import { Auth0Provider } from "./oauth.auth0";
import { MicrosoftAuth } from "./oauth.microsoft";

let msProvider = new MicrosoftAuth({
  client_id: "4f4f74ac-3c6e-4f3c-a5fd-d16590f893f2",
  redirect_uri: location.origin + "/auth/microsoft",
});

let auth0Provider = new Auth0Provider({
  client_id: "6vOmDwnROV8Gkr3NujQvMB1QfLjJhjdM",
  redirect_uri: location.origin + "/auth/auth0",
  // connection: "github",
  domain: "droopytersen.us.auth0.com",
});

export const LoginScreen = () => {
  if (auth.isLoggedIn) {
    return <div className="loading"></div>;
  }

  return (
    <UndrawContainer name="login" title={<h1 className="text-bold">Hey, come on in!</h1>}>
      <div style={{ width: "200px" }}>
        <div className="btn-group btn-group-block">
          <button className="btn btn-primary" onClick={() => auth0Provider.login()}>
            Public Log in
          </button>
        </div>
        <div className="btn-group btn-group-block mt-2">
          <button className="btn btn-primary box-shadow" onClick={() => msProvider.login()}>
            Enterprise Log in
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
        <pre>{JSON.stringify(auth.currentUser, null, 2)}</pre>
      </UndrawContainer>
    </>
  );
};

const setHasuraToken = async (providerName) => {
  let data = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({
      token: auth?.tokens?.id_token || auth.accessToken,
      user: auth.currentUser,
      provider: providerName,
    }),
  }).then((resp) => resp.json());

  if (data?.token) {
    sessionStorage.setItem(auth.cachKeys.HASURA_TOKEN, data.token);
  }
  return data;
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

export const LogoutScreen = ({ force = false, redirect = "/" }) => {
  let navigate = useNavigate();
  const logout = () => {
    auth.logout();
    navigate(redirect);
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
      <div style={{ width: "200px" }}>
        <div className="btn-group btn-group-block">
          <button className="btn btn-primary box-shadow" onClick={logout}>
            Log out
          </button>
        </div>
      </div>
    </UndrawContainer>
  );
};

function UndrawImage({ name, ...rest }) {
  let src = `/images/undraw/${name}.svg`;

  return <img src={src} {...rest} />;
}
