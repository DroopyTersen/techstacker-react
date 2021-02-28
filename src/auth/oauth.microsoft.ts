import { CurrentUser, OAuthProvider } from "./oauth";

export interface MicrosoftAuthConfig {
  /** Azure AD App Registration App ID */
  client_id: string;
  /** A redirect url you configured in the Azure AD App registration. Defaults to the root of your app */
  redirect_uri?: string;
  /** Defaults to User.Read */
  scope?: string;
}

export class MicrosoftAuth extends OAuthProvider {
  name = "microsoft";
  constructor(config: MicrosoftAuthConfig) {
    super({
      authorizeEndpoint: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
      tokenEndpoint: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
      scope: "User.Read",
      redirect_uri: location.origin,
      ...config,
    });
  }

  async fetchCurrentUser() {
    let profile = await fetchGraphProfile(this.auth.accessToken);
    console.log("🚀 | fetchCurrentUser | profile", profile);
    if (profile) {
      let currentUser: CurrentUser = {
        profile,
        id: profile.userPrincipalName,
        name: profile.displayName || `${profile.givenName} ${profile.surname}` || profile.mail,
      };
      return currentUser;
    }
    return null;
  }
}

interface UserProfile {
  displayName: string;
  givenName: string;
  jobTitle: string;
  mail: string;
  mobilePhone: string;
  officeLocation: string;
  preferredLanguage?: any;
  surname: string;
  userPrincipalName: string;
  id: string;
}

const fetchGraphProfile = function (token): Promise<UserProfile> {
  const url = "https://graph.microsoft.com/v1.0/me/";
  return fetch(url, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((resp) => resp.json());
};
