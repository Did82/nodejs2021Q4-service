// const user = {
//   type: 'object',
//   properties: {
//     id: { type: 'string' },
//     name: { type: 'string' },
//     login: { type: 'string' },
//   },
// };

const loginSchema = {
  schema: {
    body: {
      type: 'object',
      required: ['login', 'password'],
      properties: {
        login: { type: 'string' },
        password: { type: 'string' },
      },
    },
    // response: {
    //   200: user,
    // },
  },
};

export { loginSchema };
