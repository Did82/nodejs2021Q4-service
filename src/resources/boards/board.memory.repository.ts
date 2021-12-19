import { v4 as uuidv4 } from 'uuid';
import db, { IBoard, IColumn } from '../../common/db';

export interface IBoardPostBody {
  title: string;
  columns: IColumnPostBody[];
}

export interface IColumnPostBody {
  title: string;
  order: number;
}

const getAll = async () => db.boards;

const addColumn = (column: IColumnPostBody) => {
  const id: string = uuidv4();
  return { id, ...column };
};

const addBoard = async (board: IBoardPostBody) => {
  const id: string = uuidv4();
  const { title, columns } = board;
  const newColumns: IColumn[] = columns.map((item) => addColumn(item));
  const newBoard: IBoard = { id, title, columns: newColumns };
  db.boards = [...db.boards, newBoard];
  return newBoard;
};

const getBoard = async (id: string) => db.boards.find((item) => item.id === id);

const deleteBoard = async (id: string) => {
  let result: string = 'not_found';
  const board: IBoard | undefined = db.boards.find((item) => item.id === id);
  if (board) {
    db.boards = db.boards.filter((item) => item.id !== id);
    db.tasks = db.tasks.filter((task) => task.boardId !== id);
    result = 'ok';
  }
  return result;
};

const updateBoard = async (id: string, body: IBoardPostBody) => {
  const { title } = body;
  db.boards = db.boards.map((item) =>
    item.id === id ? { id, title, columns: [...item.columns] } : item
  );
  return db.boards.find((item) => item.id === id);
};

export default { getAll, addBoard, getBoard, deleteBoard, updateBoard };
