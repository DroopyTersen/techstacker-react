import { cacheKeys } from "./auth.cacheKeys";
import { CurrentUser, OAuthResult } from "./auth.interfaces";

export const auth = {
  get tokens(): OAuthResult {
    try {
      let result = JSON.parse(sessionStorage.getItem(cacheKeys.LOGIN_RESULT));

      if (!result.access_token) {
        throw new Error("unexpected data in stored oauth token result");
      }
      return result;
    } catch (err) {
      return null;
    }
  },

  get currentUser(): CurrentUser {
    try {
      return JSON.parse(sessionStorage.getItem(cacheKeys.CURRENT_USER));
    } catch (err) {
      return null;
    }
  },

  get accessToken(): string {
    return auth.tokens?.access_token;
  },

  get isLoggedIn(): boolean {
    return !!(auth.hasuraToken && auth.currentUser);
  },

  get provider() {
    return sessionStorage.getItem(cacheKeys.PROVIDER);
  },

  logout: () => {
    sessionStorage.clear();
  },

  replace: (value: OAuthResult) => {
    sessionStorage.setItem(cacheKeys.LOGIN_RESULT, JSON.stringify(value));
  },

  // Layering this in
  get role() {
    return sessionStorage.getItem(cacheKeys.HASURA_ROLE) || "";
  },
  get hasuraToken() {
    return sessionStorage.getItem(cacheKeys.HASURA_TOKEN);
  },
  checkRole: (allowedRoles: string[] = []) => {
    if (!auth.role) return false;
    return ["admin", ...allowedRoles].includes(auth.role);
  },

  cachKeys: cacheKeys,
};

(window as any).auth = auth;
export type Auth = typeof auth;
