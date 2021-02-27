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

const cacheKeys = {
  CODE_VERIFIER: "oauth-code-verifier",
  LOGIN_STATE: "oauth-login-state",
  LOGIN_RESULT: "oauth-result",
  ORIGINAL_URL: "oauth-original-url",
};

export interface OAuthConfig {
  authorizeEndpoint: string;
  tokenEndpoint: string;
  client_id: string;
  scope: string;
  redirect_uri: string;
}
export interface OAuthResult {
  access_token: string;
  expires_in: number;
  refresh_token: string;
}

export class OAuth {
  constructor(protected config: OAuthConfig) {}

  get accessToken() {
    return this.tokens?.access_token;
  }

  get isLoggedIn() {
    return !!this.accessToken;
  }

  get tokens(): OAuthResult {
    try {
      let result = JSON.parse(sessionStorage.getItem(cacheKeys.LOGIN_RESULT));
      console.log("🚀 | getTokens | result", result);

      if (!result.access_token) {
        throw new Error("unexpected data in stored oauth token result");
      }
      return result;
    } catch (err) {
      return null;
    }
  }

  public logout = () => {
    sessionStorage.setItem(cacheKeys.LOGIN_RESULT, "");
  };

  public ensureToken = async (): Promise<OAuthResult> => {
    let params = new URLSearchParams(window.location.search);
    if (
      params.get("code") &&
      sessionStorage.getItem(cacheKeys.CODE_VERIFIER) &&
      sessionStorage.getItem(cacheKeys.LOGIN_STATE)
    ) {
      return this.processCode();
    }

    return this.tokens || this.login();
  };

  public login = async () => {
    const codeVerifier = makeId(43);
    const state = makeId(12);

    sessionStorage.setItem(cacheKeys.CODE_VERIFIER, codeVerifier);
    sessionStorage.setItem(cacheKeys.LOGIN_STATE, state);
    sessionStorage.setItem(cacheKeys.ORIGINAL_URL, window.location.href);

    let queryString = toQueryString({
      client_id: this.config.client_id,
      response_type: "code",
      redirect_uri: this.config.redirect_uri,
      scope: this.config.scope,
      state: state,
      code_challenge: codeVerifier,
      code_challenge_method: "plain",
    });
    let authorizeUrl = this.config.authorizeEndpoint + "?" + queryString;
    window.location.href = authorizeUrl;
    return null;
  };

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
        "Content-Type": "application/x-www-form-urlencoded;",
      },
    })
      .then((resp) => resp.json())
      .catch((err) => {
        console.error(err);
        throw new Error("Unable to exchange code for auth token");
      });

    sessionStorage.setItem(cacheKeys.LOGIN_RESULT, JSON.stringify(result));
    let originalUrl = sessionStorage.getItem(cacheKeys.ORIGINAL_URL);
    sessionStorage.setItem(cacheKeys.CODE_VERIFIER, "");
    sessionStorage.setItem(cacheKeys.LOGIN_STATE, "");
    sessionStorage.setItem(cacheKeys.ORIGINAL_URL, "");

    if (originalUrl) {
      window.location.href = originalUrl;
      return null;
    }

    return result;
  };
}
