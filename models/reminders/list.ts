import mongoose from 'mongoose';

const listSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tasks: { type: Array, required: true },
  completed: { type: Boolean, required: true },
  lock: { type: Boolean, required: true },
  owner: { type: String, required: true },
  collaborators: { type: Array, required: true },
  listType: { type: String, required: true },
},
{ collection: 'todo-lists' });

const List = mongoose.model('todo-lists', listSchema);

module.exports = List;
