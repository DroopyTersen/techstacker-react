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
  constructor(config: Auth0Config) {
    super({
      client_id: config.client_id,
      authorizeEndpoint: `https://${config.domain}/authorize`,
      tokenEndpoint: `https://${config.domain}/oauth/token`,
      redirect_uri: config.redirect_uri,
      scope: "openid read:user email profile",
      connection: config.connection,
    });
  }

  // TODO:
  // https://auth0.com/docs/api/authentication#logout
  // logout()

  async fetchCurrentUser() {
    let payload: any = decodeJwt(this.auth.tokens.id_token);

    if (payload) {
      let currentUser: CurrentUser = {
        profile: payload,
        id: payload.email || "github-" + payload.nickname.toLowerCase(),
        name: payload.name,
      };
      return currentUser;
    }

    return null;
  }
}
