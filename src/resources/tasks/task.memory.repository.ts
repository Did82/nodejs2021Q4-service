import { v4 as uuidv4 } from 'uuid';
import db, { ITask } from '../../common/db';
import { MyReq } from './task.service';

export interface ITaskPostBody {
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId?: string | null;
}

const getAll = async () => db.tasks;

const addTask = async (req: MyReq) => {
  const id: string = uuidv4();
  const boardId: string = req.url.split('/')[2];
  const newTask: ITask = { id, ...req.body, boardId };
  db.tasks = [...db.tasks, newTask];
  return newTask;
};

const getTask = async (id: string) => db.tasks.find((item) => item.id === id);

const deleteTask = async (id: string) => {
  let result: string = 'not_found';
  const task: ITask | undefined = db.tasks.find((item) => item.id === id);
  if (task) {
    db.tasks = db.tasks.filter((item) => item.id !== id);
    result = 'ok';
  }
  return result;
};

const updateTask = async (id: string, body: ITaskPostBody) => {
  db.tasks = db.tasks.map((item) => (item.id === id ? { id, ...body } : item));
  return db.tasks.find((item) => item.id === id);
};

export default { getAll, addTask, getTask, deleteTask, updateTask };
