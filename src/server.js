"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const config_1 = require("./common/config");
const user_router_1 = __importDefault(require("./resources/users/user.router"));
const board_router_1 = __importDefault(require("./resources/boards/board.router"));
const task_router_1 = __importDefault(require("./resources/tasks/task.router"));
const fastify = (0, fastify_1.default)({
    logger: true,
});
const port = parseInt(config_1.PORT, 10) || 3000;
fastify.register(require('fastify-swagger'), {
    exposeRoute: true,
    routePrefix: '/docs',
    swagger: {
        info: { title: 'nodejs2021Q4-service' },
    },
});
fastify.register(user_router_1.default);
fastify.register(board_router_1.default);
fastify.register(task_router_1.default);
const start = async () => {
    try {
        await fastify.listen(port);
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
