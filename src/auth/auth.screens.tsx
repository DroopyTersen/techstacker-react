import { UndrawContainer } from "@components/UndrawContainer";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./oauth";
import { MicrosoftAuth } from "./oauth.microsoft";

let msAuth = new MicrosoftAuth({
  client_id: "4f4f74ac-3c6e-4f3c-a5fd-d16590f893f2",
  redirect_uri: location.origin + "/auth/microsoft",
});
export const LoginScreen = () => {
  if (auth.isLoggedIn) {
    return <div className="loading"></div>;
  }

  return (
    <UndrawContainer name="login" title={<h1 className="text-bold">Hey, come on in!</h1>}>
      <div style={{ width: "200px" }}>
        <div className="btn-group btn-group-block">
          <button className="btn btn-primary box-shadow" onClick={() => msAuth.login()}>
            Log in with Microsoft
          </button>
        </div>
        <div className="btn-group btn-group-block mt-2">
          <button className="btn btn-primary" disabled={true}>
            Log in with Github
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

export const MicrosoftAuthCallback = () => {
  useEffect(() => {
    msAuth.ensureLogin({ redirectToOriginal: true });
  }, []);
  return (
    <UndrawContainer
      //   title={<h2 className="text-muted text-bold">Hold your horses</h2>}
      title=""
      name="season-change"
    >
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
