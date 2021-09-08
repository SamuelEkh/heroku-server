import express, { Request, Response } from 'express';
const cors = require('cors');

const router = express.Router();
const mongo = require('../mongoose_functions/reminders');

router.use(express.json());
router.use(cors({ 
  origin: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

type errObj = {
  error: string
};

const errorHandler = (response: errObj) => {
  if (response.error) throw new Error(response.error);
};

router.post('/lists', async (req: Request, res: Response) => {
  try {
    const {
      title, tasks, completed, lock, owner, collaborators, listType,
    } = req.body;

    const response = await mongo.addList(
      title,
      tasks,
      completed,
      lock,
      owner,
      collaborators,
      listType,
    );
    errorHandler(response);

    res.status(201).json(response);
  } catch (err) {
    res.status(500).send((err as Error).message);
  }
});

router.get('/lists/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (id.indexOf('@') === -1) {
      const response = await mongo.findOneList(id);
      errorHandler(response);
      return res.json(response);
    }
    const response = await mongo.findLists(id);
    errorHandler(response);
    return res.json(response);
  } catch (err) {
    return res.status(404).send((err as Error).message);
  }
});

router.put('/lists', async (req: Request, res: Response) => {
  try {
    const { id, complete, list } = req.body;
    if (id) {
      const response = await mongo.listComplete(id, complete);
      errorHandler(response);
      return res.json(response);
    }
    if (list) {
      const response = await mongo.editList(list);
      errorHandler(response);
      return res.status(204).send();
    }
    return null;
  } catch (err) {
    return res.status(500).send((err as Error).message);
  }
});

router.delete('/lists', async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const response = await mongo.deleteList(id);
    errorHandler(response);
    return res.status(204).json(response);
  } catch (err) {
    return res.status(500).send((err as Error).message);
  }
});

router.post('/lists/tasks', async (req: Request, res: Response) => {
  try {
    const { id, task } = req.body;
    const response = await mongo.addTask(id, task);
    errorHandler(response);

    res.status(201).json(response);
  } catch (err) {
    res.status(500).send((err as Error).message);
  }
});

router.put('/lists/tasks', async (req: Request, res: Response) => {
  try {
    const {
      id, task, complete, originalTask, subtasks, tasks,
    } = req.body;

    if (id && originalTask && task) {
      const response = await mongo.editTask(id, originalTask, task);
      errorHandler(response);
      return res.json(response);
    }

    if (id && task && subtasks) {
      const response = await mongo.subTaskComplete(id, task, subtasks);
      errorHandler(response);
      return res.json(response);
    }

    if (id && task) {
      const response = await mongo.taskComplete(id, task, complete);
      errorHandler(response);
      return res.json(response);
    }

    if (id && tasks) {
      const response = await mongo.removeTask(id, tasks);
      errorHandler(response);
      return res.status(204).send();
    }

    throw new Error('Invalid parameters');
  } catch (err) {
    return res.status(500).send((err as Error).message);
  }
});

module.exports = router;
