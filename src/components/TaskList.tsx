import { useState, useEffect } from "react";
import { FiTrash, FiCheckSquare } from "react-icons/fi";
import "../styles/tasklist.scss";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  console.log("newTaskTitle", newTaskTitle);

  useEffect(() => {
    setNewTaskTitle("");
  }, [tasks]);
 
  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    const newTaskObj: Task = {
      id: Date.now(),
      title: newTaskTitle,
      isComplete: false,
    };

    newTaskObj.title.trim().length > 0
      ? setTasks([...tasks, newTaskObj])
      : alert("Por favor, preencha o título do novo TODO.");
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    // copy toggled task obj from the tasks state
    const thisTaskIndex: number = tasks.findIndex((task) => task.id === id);
    let taskToUpdate: Task = tasks[thisTaskIndex];

    // toggle toggled task `isComplete` attribute
    taskToUpdate.isComplete = !taskToUpdate.isComplete;

    // copy tasks to new object to facilitate the tasks state update with the actual Arr index
    let newTaskArr: Task[] = tasks;
    newTaskArr.splice(thisTaskIndex, 1, taskToUpdate);

    // setState to force refresh
    setTasks([...newTaskArr]);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    
    // Get toggled task id
    const thisTaskIndex: number = tasks.findIndex((task) => task.id === id);

    // copy tasks to new object to facilitate the tasks state update
    let newTask: Task[] = tasks;
    newTask.splice(thisTaskIndex, 1);

    // setState to force refresh
    setTasks([...newTask]);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
