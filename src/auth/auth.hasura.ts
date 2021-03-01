import { auth } from "./auth";

export const setHasuraToken = async (providerName) => {
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
  if (data?.user?.role) {
    sessionStorage.setItem(auth.cachKeys.HASURA_ROLE, data.user.role);
  }
  return data;
};
