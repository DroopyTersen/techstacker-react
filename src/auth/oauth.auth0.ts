import { CurrentUser, OAuthProvider } from "./oauth";
import decodeJwt from "jwt-decode";

export interface Auth0Config {
  client_id: string;
  domain: string;
  redirect_uri: string;
  connection?: string;
}

export class Auth0Provider extends OAuthProvider {
  name = "auth0";
  domain: string;
  constructor(config: Auth0Config) {
    super({
      client_id: config.client_id,
      authorizeEndpoint: `https://${config.domain}/authorize`,
      tokenEndpoint: `https://${config.domain}/oauth/token`,
      redirect_uri: config.redirect_uri,
      scope: "openid read:user email profile",
      connection: config.connection,
    });
    this.domain = config.domain;
  }

  logout(returnPath = "/") {
    let logoutUrl = `http://${this.domain}/v2/logout?client_id=${this.config.client_id}&returnTo=${location.origin}${returnPath}`;
    window.location.href = logoutUrl;
  }

  async fetchCurrentUser() {
    let payload: any = decodeJwt(this.auth.tokens.id_token);

    if (payload) {
      let currentUser: CurrentUser = {
        profile: payload,
        id: payload.email || "github-" + payload.nickname.toLowerCase(),
        name: payload.name,
        picture: payload?.picture || "",
      };
      return currentUser;
    }

    return null;
  }
}
