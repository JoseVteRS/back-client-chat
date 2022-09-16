export default interface JWTResponse {
  accessToken: string;
  token_type: string;
  expires_in: number;
}
