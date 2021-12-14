const user = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    login: { type: 'string' },
  },
};

const getUsersSchema = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: user,
      },
    },
  },
};

const getUserSchema = {
  schema: {
    response: {
      200: user,
    },
  },
};

const addUserSchema = {
  schema: {
    body: {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string' },
        login: { type: 'string' },
        password: { type: 'string' },
      },
    },
    response: {
      201: user,
    },
  },
};

const updateUserSchema = {
  schema: {
    body: {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string' },
        login: { type: 'string' },
        password: { type: 'string' },
      },
    },
    response: {
      200: user,
    },
  },
};

module.exports = {
  getUsersSchema,
  getUserSchema,
  addUserSchema,
  updateUserSchema,
};
