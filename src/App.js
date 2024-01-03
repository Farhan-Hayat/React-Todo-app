import React, { useState } from "react";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [addTask, setAddTask] = useState("");
  const [lastIdUsed, setLastUsedId] = useState(0);
  const [requestUpdate, setRequestUpdate] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const handleChecked = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleAddTask = () => {
    if (!addTask) return;
    setLastUsedId((prevId) => prevId + 1);
    setTasks((prevTasks) => [
      ...prevTasks,
      { task: addTask, completed: false, id: lastIdUsed + 1 },
    ]);
    setAddTask("");
  };

  const handleDelete = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleUpdateRequest = (id) => {
    if (requestUpdate) {
      setRequestUpdate(false);
    } else {
      setRequestUpdate(true);
    }
    setAddTask((prevTask) => {
      const task = tasks.find((t) => t.id === id);
      if (task) {
        setTaskToUpdate(task.id);
        return task.task;
      } else {
        return "";
      }
    });
  };

  const handleUpdate = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (!addTask) return task;
        if (task.id === id) {
          setRequestUpdate(false);
          setAddTask("")
          return { ...task, task: addTask };
        } else {
          return task;
        }
      })
    );
  };

  return (
    <div className="App">
      <div className="mainCont">
        <h1>Todo List</h1>
        <div className="addTaskCont">
          <input
            type="text"
            value={addTask}
            onChange={(e) => setAddTask(e.target.value)}
          />
          {!requestUpdate && <button onClick={handleAddTask}>Add</button>}
          {requestUpdate && (
            <button onClick={() => handleUpdate(taskToUpdate)}>Update</button>
          )}
        </div>
        <div className="taskCardCont">
          {tasks.map((task) => (
            <div className="taskCard" key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleChecked(task.id)}
              />
              {!task.completed && <p>{task.task}</p>}
              {task.completed && <p><s>{task.task}</s></p>}
              {!task.completed && (
                <button onClick={() => handleUpdateRequest(task.id)}>Update</button>
              )}
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
