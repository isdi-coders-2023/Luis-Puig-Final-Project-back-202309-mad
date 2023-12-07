import { UsersController } from '../controllers/users.controller.js';
import createDebug from 'debug';
import { Router as createRouter } from 'express';
import { UsersMongoRepo } from '../repos/users/users.mongo.repo.js';

const debug = createDebug('W8E:users:router');

export const usersRouter = createRouter();
debug('Starting');

const repo = new UsersMongoRepo();
const controller = new UsersController(repo);

usersRouter.get('/', controller.getAll.bind(controller));

usersRouter.post('/register', controller.create.bind(controller));

usersRouter.post('/login', controller.login.bind(controller));

usersRouter.patch('/login', controller.login.bind(controller));
