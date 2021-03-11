import { useCallback, useEffect, useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {


  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Comentado LocalStorage devido ao problema que ocorre ao realizar o teste do mesmo
  // useEffect(() => {
  //   const getStorage = localStorage.getItem('taskStorage');
  //   if (getStorage) {
  //     const task = JSON.parse(getStorage);
  //     setTasks(task)
  //   }
  //   console.log('executou o storage')
  // }, [])

  const handleCreateNewTask = useCallback(() => {
    if (!newTaskTitle) {
      return;
    }
    const newTask: Task[] = [...tasks, {
      id: Date.now(),
      isComplete: false,
      title: newTaskTitle
    }]
    setNewTaskTitle('');
    setTasks(newTask)
    // localStorage.setItem('taskStorage', JSON.stringify(newTask));
  }, [newTaskTitle, tasks]);

  const handleToggleTaskCompletion = useCallback((id: number) => {
    const newArray = tasks.map(task => {
      task.isComplete = task.id === id ? !task.isComplete : task.isComplete;
      return task
    })
    // localStorage.setItem('taskStorage', JSON.stringify([]));
    setTasks(newArray)
  }, [tasks]);

  const handleRemoveTask = useCallback((id: number) => {
    const newArray = tasks.filter(task => task.id !== id);
    // localStorage.setItem('taskStorage', JSON.stringify(newArray));
    setTasks(newArray);
  }, [tasks])

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
          <button type="submit" disabled={!newTaskTitle}
            style={{ cursor: !newTaskTitle ? 'not-allowed' : 'pointer' }}
            data-testid="add-task-button"
            onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
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

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}