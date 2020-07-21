interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      name: string;
      email: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER,

  defaults: {
    from: {
      name: process.env.FROM_NAME,
      email: process.env.FROM_EMAIL,
    },
  },
} as IMailConfig;
