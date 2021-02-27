import { UndrawContainer } from "@components/UndrawContainer";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    <div>
      <UndrawContainer name="login" title={<h1 className="text-bold">Welcome!</h1>}>
        <div style={{ width: "200px" }}>
          <div className="btn-group btn-group-block">
            <button className="btn btn-primary" onClick={() => msAuth.login()}>
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
    </div>
  );
};

export const MicrosoftAuthCallback = () => {
  useEffect(() => {
    msAuth.ensureLogin({ redirectToOriginal: true });
  }, []);
  return (
    <div>
      <h1>Finishing sign in...</h1>
      <UndrawImage name="season-change" />
    </div>
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
    <div>
      <UndrawImage name="quiting-time" />
      <button className="btn btn-primary" onClick={logout}>
        Log out
      </button>
    </div>
  );
};

function UndrawImage({ name, ...rest }) {
  let src = `/images/undraw/${name}.svg`;

  return <img src={src} {...rest} />;
}
