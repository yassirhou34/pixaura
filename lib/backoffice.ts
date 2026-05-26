/**
 * URL de connexion du backoffice Pixaura (dépôt séparé).
 * L’icône profil du header vitrine redirige vers cette URL.
 */
export const BACKOFFICE_LOGIN_URL =
  process.env.NEXT_PUBLIC_BACKOFFICE_LOGIN_URL ??
  "https://pixaura-front-office.vercel.app/login"
