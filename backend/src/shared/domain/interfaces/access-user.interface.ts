export default interface AccessUser {
  email: string;
  password?: string;
  grant_type?: 'password' | 'refresh_token';
  refresh_token?: string;
}
