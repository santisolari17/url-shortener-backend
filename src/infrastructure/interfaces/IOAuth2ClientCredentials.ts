/**
 * Interface that defines objects that represents a client user that is allowed to use this system
 */
export interface IOAuth2ClientCredentials {
  /** An identifier that describes the identity of the client */
  clientId: string;
  /** A random client secret key/string (usually an UUID) */
  clientSecret: string;
}
