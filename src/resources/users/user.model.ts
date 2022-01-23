import { FastifySchema } from 'fastify';

const user = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    login: { type: 'string' },
  },
};

const getUsersSchema: FastifySchema = {
  response: {
    200: {
      type: 'array',
      items: user,
    },
  },
};

const getUserSchema = {
  response: {
    200: user,
  },
};

const addUserSchema = {
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
};

const updateUserSchema = {
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
};

export { getUsersSchema, getUserSchema, addUserSchema, updateUserSchema };
