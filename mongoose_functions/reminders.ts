import mongoose from 'mongoose';

require('dotenv').config();
const List = require('../models/reminders/list');

/* const mongoDB = `mongodb+srv://Samuel:${process.env.REMINDERS_DB_KEY}@cluster0.tffuu.mongodb.net/Reminders?retryWrites=true&w=majority`; */

type task = {
  mainTask: string,
  completed: boolean,
  editing: boolean
}

type subtask = {
  title: string,
  completed: boolean
}

type tasks = {
  task: {
    mainTask: string,
    completed: boolean,
    editing: boolean
  }
}[]

type IList = {
  _id: string,
  tasks: task[],
  collaborators: string[],
  title: string,
  completed: boolean,
  lock: boolean,
  owner: string,
  listType: string
}

const addList = async (
  title: string,
  tasks: tasks,
  completed: boolean,
  lock: boolean,
  owner: string,
  collaborators: string[],
  listType: string,
) => {
  try {
    const list = new List({
      title,
      tasks,
      completed,
      lock,
      owner,
      collaborators,
      listType,
    });

    await list.save();
    return list;
  } catch (err) {
    return { error: 'Error creating list' };
  }
};

const findLists = async (user: string) => {
  try {
    const lists = await List.find(
      {
        $or: [
          { owner: user },
          { collaborators: { $all: [user] } },
        ],
      },
    );

    if (lists.length === 0) throw new Error('This user has no lists');
    return lists;
  } catch (err) {
    if ((err as Error).message === 'This user has no lists') {
      return { error: (err as Error).message };
    }
    return { error: 'Error fetching lists' };
  }
};

const findOneList = async (id: string) => {
  try {
    const list = await List.find(
      {
        _id: id,
      },
    );

    if (list.length === 0) throw new Error('List not found');
    return list;
  } catch (err) {
    if ((err as Error).message === 'List not found') {
      return { error: (err as Error).message };
    }
    return { error: 'Error fetching list' };
  }
};

const addTask = async (id: string, task: task) => {
  try {
    if (!task || !id) throw new Error('No ID or Task');
    const response = await List.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $push: { tasks: task },
      },
      {
        new: true,
      },
    );

    return response;
  } catch (err) {
    if ((err as Error).message === 'No ID or Task') {
      return (err as Error).message;
    }
    return { error: 'Error creating task' };
  }
};

const listComplete = async (id: string, complete: boolean) => {
  try {
    if (!id) throw new Error('Error updating list');
    const response = await List.findOneAndUpdate(
      {
        _id: id,
      },
      {
        completed: complete,
      },
      {
        new: true,
      },
    );

    return response;
  } catch (err) {
    return { error: (err as Error).message };
  }
};

const editList = async (list: IList) => {
  try {
    if (!list) throw new Error('Error updating list');
    const response = await List.replaceOne(
      {
        _id: list._id,
      },
      list,
    );

    return response;
  } catch (err) {
    return { error: (err as Error).message };
  }
};

const deleteList = async (id: string) => {
  try {
    if (!id) throw new Error('Error deleting list');
    const response = await List.deleteOne({ _id: id });

    return response;
  } catch (err) {
    return { error: (err as Error).message };
  }
};

const taskComplete = async (id: string, task: task, complete: boolean) => {
  try {
    if (!id || !task) throw new Error('Error updating task');
    const response = await List.findOneAndUpdate(
      {
        _id: id,
        'tasks.mainTask': task.mainTask,
      },
      {
        $set: { 'tasks.$.completed': complete },
      },
      {
        new: true,
      },
    );

    return response;
  } catch (err) {
    return { error: (err as Error).message };
  }
};

const editTask = async (id: string, originalTask: task, task: task) => {
  try {
    if (!id || !task || !originalTask) throw new Error('Error updating task');
    const response = await List.findOneAndUpdate(
      {
        _id: id,
        'tasks.mainTask': originalTask,
      },
      {
        $set: { 'tasks.$': task },
      },
      {
        new: true,
      },
    );

    return response;
  } catch (err) {
    return { error: (err as Error).message };
  }
};

const removeTask = async (id: string, tasks: task) => {
  try {
    if (!id || !tasks) throw new Error('Error removing task');
    const response = await List.findOneAndUpdate(
      {
        _id: id,
      },
      {
        tasks,
      },
      {
        new: true,
      },
    );

    return response;
  } catch (err) {
    return { error: (err as Error).message };
  }
};

const subTaskComplete = async (id: string, task: task, subtasks: subtask) => {
  const response = await List.findOneAndUpdate(
    {
      _id: id,
      'tasks.mainTask': task.mainTask,
    },
    {
      $set: { 'tasks.$.subTasks': subtasks },
    },
    {
      new: true,
    },
  );

  return response;
};

module.exports = {
  addList,
  findLists,
  findOneList,
  addTask,
  listComplete,
  taskComplete,
  editTask,
  removeTask,
  subTaskComplete,
  editList,
  deleteList,
};
