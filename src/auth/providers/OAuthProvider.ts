import { Auth } from "../auth";
import { cacheKeys } from "../auth.cacheKeys";
import { CurrentUser, OAuthConfig, OAuthResult } from "../auth.interfaces";

const toQueryString = (values: object) => {
  let params = new URLSearchParams("");
  Object.keys(values).forEach((key) => params.set(key, values[key]));

  return params.toString();
};

// helper function to generate a random string
const makeId = (length) => {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export abstract class OAuthProvider {
  public name: string;
  constructor(public auth: Auth, protected config: OAuthConfig) {}

  private ensureToken = async (): Promise<OAuthResult> => {
    let params = new URLSearchParams(window.location.search);
    if (
      params.get("code") &&
      sessionStorage.getItem(cacheKeys.CODE_VERIFIER) &&
      sessionStorage.getItem(cacheKeys.LOGIN_STATE)
    ) {
      return this.processCode();
    }

    return this.auth.tokens || this.login();
  };

  public ensureLogin = async ({ redirectToOriginal = false } = {}): Promise<Auth> => {
    await this.ensureToken();
    await this.ensureCurrentUser();
    if (redirectToOriginal) {
      let originalUrl = sessionStorage.getItem(cacheKeys.ORIGINAL_URL) || "/";
      window.location.href = originalUrl;
    }
    return this.auth;
  };

  public login = async () => {
    let queryParams = new URLSearchParams(window.location.search);
    const codeVerifier = makeId(43);
    const state = makeId(12);
    sessionStorage.setItem(cacheKeys.CODE_VERIFIER, codeVerifier);
    sessionStorage.setItem(cacheKeys.LOGIN_STATE, state);
    sessionStorage.setItem(cacheKeys.PROVIDER, this.name);
    let originalUrl = queryParams.get("original_url") || "/";
    sessionStorage.setItem(cacheKeys.ORIGINAL_URL, originalUrl);

    let authorizeParams: any = {
      client_id: this.config.client_id,
      response_type: "code",
      redirect_uri: this.config.redirect_uri,
      scope: this.config.scope,
      state: state,
      code_challenge: codeVerifier,
      code_challenge_method: "plain",
    };
    if (this.config.connection) {
      authorizeParams.connection = this.config.connection;
    }
    let queryString = toQueryString(authorizeParams);
    let authorizeUrl = this.config.authorizeEndpoint + "?" + queryString;
    window.location.href = authorizeUrl;
    return null;
  };

  private async ensureCurrentUser() {
    let user = this.auth.currentUser;
    if (this.auth.accessToken && !user) {
      user = await this.fetchCurrentUser();
      sessionStorage.setItem(cacheKeys.CURRENT_USER, JSON.stringify(user));
    }
    return user;
  }

  protected abstract fetchCurrentUser(): Promise<CurrentUser>;

  private processCode = async () => {
    let params = new URLSearchParams(window.location.search);
    let code = params.get("code");
    let state = params.get("state");

    if (!code) {
      throw new Error("code query param not found");
    }
    if (!state) {
      throw new Error("state query param not found");
    }

    if (state !== sessionStorage.getItem(cacheKeys.LOGIN_STATE)) {
      throw new Error("Unable to match state in session storage");
    }

    let data = {
      client_id: this.config.client_id,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: this.config.redirect_uri,
      code_verifier: sessionStorage.getItem(cacheKeys.CODE_VERIFIER),
    };

    let result = await fetch(this.config.tokenEndpoint, {
      method: "POST",
      body: toQueryString(data),
      headers: {
        accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((resp) => resp.json())
      .catch((err) => {
        console.error(err);
        throw new Error("Unable to exchange code for auth token");
      });

    sessionStorage.setItem(cacheKeys.LOGIN_RESULT, JSON.stringify(result));
    sessionStorage.setItem(cacheKeys.CODE_VERIFIER, "");
    sessionStorage.setItem(cacheKeys.LOGIN_STATE, "");

    return result;
  };
}
