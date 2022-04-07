module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '1b3c5f74ba5181b26da7d179f97f0f11'),
  },
});
