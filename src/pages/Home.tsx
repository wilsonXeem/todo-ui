import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Todos from "../components/Todos";

export const Home: React.FC = () => {
  const [tasks, setTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8000/tasks/task/${id}`)
      .then((response) => response.json())
      .then((json) => {
        setTasks(json.tasks);
      });
  }, [id]);

  return (
    <>
      <div>
        <h1>Hey, this is your to-do list.</h1>
        <Todos tasks={tasks} id={id} />
      </div>
    </>
  );
};
