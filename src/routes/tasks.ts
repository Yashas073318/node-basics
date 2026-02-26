import { Router } from 'express';

import { createTask, getTask, listTasks } from '../data/store.js';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ tasks: listTasks() });
});

router.get('/:id', (req, res) => {
  const task = getTask(Number(req.params.id));
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  return res.json(task);
});

router.post('/', (req, res) => {
  const { title, completed = false } = req.body as {
    title?: string;
    completed?: boolean;
  };
  if (!title) {
    return res.status(400).json({ message: 'title is required' });
  }
  const created = createTask({ title, completed });
  return res.status(201).json(created);
});

export default router;
