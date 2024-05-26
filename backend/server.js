const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
// const PORT = 3001; // This line specifies the port to use

// // Other middleware and route configurations...

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

//collection name is 'tasks'.
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: String,
  status: String,
});

const Task = mongoose.model('Task', taskSchema);

app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const newTask = new Task(req.body);
  const savedTask = await newTask.save();
  res.json(savedTask);
});

app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    console.log('Task ID:', id); // Log the ID to ensure it is received correctly
    const updateData = req.body;
    console.log('Update Data:', updateData); // Log the update data to ensure it is received correctly
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ error: 'Invalid task ID' });
    }
  
    Task.findOneAndUpdate({ _id: id }, updateData, { new: true })
      .then(updatedTask => {
        if (!updatedTask) {
          return res.status(404).send({ error: 'Task not found' });
        }
        res.send(updatedTask);
      })
      .catch(error => {
        console.error('Error updating task status:', error);
        res.status(500).send({ error: 'Internal server error' });
      });
  });
  

app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

mongoose.connect('mongodb://localhost:27017/todolist', { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
