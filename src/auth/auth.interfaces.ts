export interface OAuthConfig {
  authorizeEndpoint: string;
  tokenEndpoint: string;
  client_id: string;
  scope: string;
  redirect_uri: string;
  connection?: string;
}
export interface OAuthResult {
  access_token: string;
  expires_in?: number;
  refresh_token?: string;
  id_token?: string;
}

export interface CurrentUser {
  id: string;
  name: string;
  picture?: string;
  [key: string]: any;
}
