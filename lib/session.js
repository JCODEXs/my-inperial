export const sessionConfig = {
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieName: 'user-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};
