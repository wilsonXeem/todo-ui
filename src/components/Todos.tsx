import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  tasks: any[];
  id: any;
}

const Todos: React.FC<Props> = ({ tasks, id }) => {
  const [input, setInput] = useState<string>("");
  const navigate = useNavigate();
  
  const handleSubmit = () => {
    fetch(`http://localhost:8000/tasks/task/${id}`, {
      method: "POST",
      body: JSON.stringify({
        task: input.toLowerCase(),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => window.location.reload());
  };

  return (
    <>
      <div className="todos">
        {tasks.map((task) => {
          return (
            <div
              className="todo"
              key={task._id}
              onClick={() => navigate(`/task/${task._id}`)}
            >
              <h3>{task.task}</h3>
              <p>Added on {task.timeAdded}</p>
              <h2>{task.subtasks.length} items</h2>
            </div>
          );
        })}
        <div className="todo add">
          <h3>Add Task</h3>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add task"
          />
          <br />
          <button onClick={handleSubmit}>ADD</button>
        </div>
      </div>
    </>
  );
};

export default Todos;
