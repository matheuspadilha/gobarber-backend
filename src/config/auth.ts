export default {
  jwt: {
    secret: process.env.APP_SECRET || 'default',
    expiresIn: process.env.EXPIRES_IN || '1d',
  },
};
