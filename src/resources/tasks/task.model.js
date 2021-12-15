const task = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    order: { type: 'number' },
    description: { type: 'string' },
    userId: { type: ['string', 'null'] },
    boardId: { type: ['string', 'null'] },
    columnId: { type: ['string', 'null'] },
  },
};

const getTasksSchema = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: task,
      },
    },
  },
};

const getTaskSchema = {
  schema: {
    response: {
      200: task,
    },
  },
};

const addTaskSchema = {
  schema: {
    body: {
      type: 'object',
      required: ['title', 'order', 'boardId'],
      properties: {
        title: { type: 'string' },
        order: { type: 'number' },
        description: { type: 'string' },
        userId: { type: ['string', 'null'] },
        boardId: { type: ['string', 'null'] },
        columnId: { type: ['string', 'null'] },
      },
    },
    response: {
      201: task,
    },
  },
};

const updateTaskSchema = {
  schema: {
    body: {
      type: 'object',
      required: ['title', 'order', 'boardId'],
      properties: {
        title: { type: 'string' },
        order: { type: 'number' },
        description: { type: 'string' },
        userId: { type: ['string', 'null'] },
        boardId: { type: ['string', 'null'] },
        columnId: { type: ['string', 'null'] },
      },
    },
    response: {
      200: task,
    },
  },
};

module.exports = {
  getTasksSchema,
  getTaskSchema,
  addTaskSchema,
  updateTaskSchema,
};
