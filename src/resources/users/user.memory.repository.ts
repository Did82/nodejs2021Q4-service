import { v4 as uuidv4 } from 'uuid';
import db from '../../common/db';

export interface IUserPostBody {
  name: string;
  login: string;
  password: string;
}

const getAll = async () => db.users;

const addUser = async (user: IUserPostBody) => {
  const id: string = uuidv4();
  const newUser = { id, ...user };
  db.users = [...db.users, newUser];
  return newUser;
};

const getUser = async (id: string) => db.users.find((item) => item.id === id);

const deleteUser = async (id: string) => {
  let result = 'not_found';
  const user = db.users.find((item) => item.id === id);
  if (user) {
    db.users = db.users.filter((item) => item.id !== id);
    db.tasks = db.tasks.map((item) =>
      item.userId === id ? { ...item, userId: null } : item
    );
    result = 'ok';
  }
  return result;
};

const updateUser = async (id: string, body: IUserPostBody) => {
  db.users = db.users.map((item) => (item.id === id ? { id, ...body } : item));
  return db.users.find((item) => item.id === id);
};

export default { getAll, addUser, getUser, deleteUser, updateUser };
