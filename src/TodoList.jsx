import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TodoList.css";

const API_URL = "http://localhost:3001/tasks";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", dueDate: "", status: "Pending" });
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addNewTask = async () => {
    try {
      await axios.post(API_URL, newTask);
      fetchTasks(); // Refresh tasks after adding a new one
      setNewTask({ title: "", description: "", dueDate: "", status: "Pending" });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await axios.put(`${API_URL}/${taskId}`, { status: newStatus });
      fetchTasks(); // Refresh tasks after updating status
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_URL}/${taskId}`);
      fetchTasks(); // Refresh tasks after deleting
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateTaskValue = (key, value) => {
    setNewTask({ ...newTask, [key]: value });
  };

  const startEditing = (task) => {
    setEditingTask({ ...task });
  };

  const updateEditingTask = (key, value) => {
    setEditingTask({ ...editingTask, [key]: value });
  };

  const saveEditedTask = async () => {
    try {
      console.log("Saving task:", editingTask);
      await axios.put(`${API_URL}/${editingTask._id}`, editingTask);
      fetchTasks(); // Refresh tasks after updating
      setEditingTask(null); // Clear the editing state
    } catch (error) {
      console.error("Error saving edited task:", error);
    }
  };

  return (
    <div>
      <div className="inp">
        <br />
        <input
          type="text"
          placeholder="Enter title"
          value={newTask.title}
          onChange={(e) => updateTaskValue("title", e.target.value)}
          className="form-control"
        />
        <br /><br />
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => updateTaskValue("description", e.target.value)}
          className="form-control"
        />
        <br /><br />
        <input
          type="date"
          placeholder="Due Date"
          value={newTask.dueDate}
          onChange={(e) => updateTaskValue("dueDate", e.target.value)}
          className="form-control"
        />
        <br /><br />
        <button onClick={addNewTask} className="btn btn-outline-danger">Add Task</button>
      </div>
      <br /><br />
      <hr />
      <h4>Tasks To Do</h4>
      <br />
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="mb-6">
            {editingTask && editingTask._id === task._id ? (
              <>
                <input
                  type="text"
                  value={editingTask.title}
                  onChange={(e) => updateEditingTask("title", e.target.value)}
                  className="form-control"
                />
                <br /><br />
                <input
                  type="text"
                  value={editingTask.description}
                  onChange={(e) => updateEditingTask("description", e.target.value)}
                  className="form-control"
                />
                <br /><br />
                <input
                  type="date"
                  value={editingTask.dueDate}
                  onChange={(e) => updateEditingTask("dueDate", e.target.value)}
                  className="form-control"
                />
                <br /><br />
                <button onClick={saveEditedTask} className="btn btn-primary">Save</button>&nbsp;&nbsp; 
                <button onClick={() => setEditingTask(null)} className="btn btn-secondary">Cancel</button>
              </>
            ) : (
              <>
                <span style={task.status === "Done" ? { textDecorationLine: "line-through" } : {}}>
                  <b>Task:</b> {task.title} &nbsp;&nbsp; 
                  <b>Description:</b> {task.description}&nbsp;&nbsp; 
                  <b>Due:</b> {task.dueDate} &nbsp;&nbsp; 
                  <b>Status:</b> {task.status}
                </span>
                &nbsp; &nbsp;
                <button onClick={() => deleteTask(task._id)} className="btn btn-danger">Delete</button>
                &nbsp; &nbsp;
                <button onClick={() => updateTaskStatus(task._id, "Done")} className="btn btn-success">Mark as Done</button>
                &nbsp; &nbsp;
                <button onClick={() => startEditing(task)} className="btn btn-primary">Edit</button>
                <br /><br />
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
