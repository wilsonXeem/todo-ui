import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// interface Props {
//   title: string;
// }

const Todo: React.FC = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [subTasks, setSubTasks] = useState([]);
  const [subtask, setSubtask] = useState("");
  const [show, setShow] = useState(false);
  const [correctTitle, setCorrectTitle] = useState("");
  const [edit, setEdit] = useState(false);
  const [correctSub, setCorrectSub] = useState("");

  useEffect(() => {
    fetch(`https://todo-zim.herokuapp.com/subtasks/subtasks/${id}`)
      .then((response) => response.json())
      .then((json) => {
        setTitle(json.title);
        setSubTasks(json.subtasks);
      });
  }, []);

  const handleCheck = (_id: any) => {
    fetch(`https://todo-zim.herokuapp.com/subtasks/subtask/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then(() => window.location.reload());
  };

  const handleSubmit = () => {
    fetch(`https://todo-zim.herokuapp.com/subtasks/subtask/${id}`, {
      method: "POST",
      body: JSON.stringify({
        subtask: subtask,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => window.location.reload());
  };

  const updateTask = () => {
    fetch(`http://localhost:8000/tasks/task/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        task: correctTitle,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => window.location.reload());
  };

  const handleEdit = (_id: any) => {
    fetch(`http://localhost:8000/subtasks/edit/${_id}`, {
      method: "PATCH",
      body: JSON.stringify({
        task: correctSub,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then(() => window.location.reload());
  };
  return (
    <section>
      <h1 style={{ textTransform: "uppercase" }}>
        {title}...
        {!show && (
          <button
            onClick={() => setShow(!show)}
            style={{ border: "none", background: "none" }}
          >
            <i>edit</i>
          </button>
        )}
        {show && (
          <span>
            <input
              type="text"
              value={correctTitle}
              onChange={(e) => setCorrectTitle(e.target.value)}
            />{" "}
            <button onClick={updateTask}>save</button>
          </span>
        )}
      </h1>
      <hr />
      <div className="subtasks">
        {subTasks.map((subtask: any, i) => (
          <p key={i} style={{ textDecoration: subtask.done && "line-through" }}>
            <input
              type="checkbox"
              defaultChecked={subtask.done}
              onClick={() => handleCheck(subtask._id)}
            />
            {subtask.subtask}
            {!edit && (
              <button
                onClick={() => setEdit(!edit)}
                style={{ border: "none", background: "none" }}
              >
                <i>edit</i>
              </button>
            )}
            {edit && (
              <span className="edit">
                <input
                  type="text"
                  onChange={(e) => setCorrectSub(e.currentTarget.value)}
                  style={{ width: "70%", marginLeft: "1rem" }}
                />{" "}
                <button onClick={() => handleEdit(subtask._id)}>save</button>
              </span>
            )}
          </p>
        ))}
        <p className="sub-task">
          <input
            type="text"
            placeholder="Add task"
            value={subtask}
            onChange={(e) => setSubtask(e.target.value)}
          />
          <button onClick={handleSubmit}>Add</button>
        </p>
      </div>
    </section>
  );
};

export default Todo;
