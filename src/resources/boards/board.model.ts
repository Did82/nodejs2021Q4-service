const board = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    columns: {
      type: 'array',
      item: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          order: { type: 'string' },
        },
      },
    },
  },
};

const getBoardsSchema = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: board,
      },
    },
  },
};

const getBoardSchema = {
  schema: {
    response: {
      200: board,
    },
  },
};

const addBoardSchema = {
  schema: {
    body: {
      type: 'object',
      required: ['title', 'columns'],
      properties: {
        title: { type: 'string' },
        columns: {
          type: 'array',
          item: {
            type: 'object',
            required: ['title', 'order'],
            properties: {
              title: { type: 'string' },
              order: { type: 'string' },
            },
          },
        },
      },
    },
    response: {
      201: board,
    },
  },
};

const updateBoardSchema = {
  schema: {
    body: {
      type: 'object',
      required: ['title', 'columns'],
      properties: {
        title: { type: 'string' },
        columns: {
          type: 'array',
          item: {
            type: 'object',
            required: ['title', 'order'],
            properties: {
              title: { type: 'string' },
              order: { type: 'string' },
            },
          },
        },
      },
    },
    response: {
      200: board,
    },
  },
};

export { getBoardsSchema, getBoardSchema, addBoardSchema, updateBoardSchema };
