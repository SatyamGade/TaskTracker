import { useEffect, useState } from 'react';
import Task from './Task';
import { nanoid } from 'nanoid';

function Main() {

  // its for UI
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("tasks")) || []);
  const [viewForm, setViewForm] = useState(false);
  const [formData, setFormData] = useState({
    taskTitle: "",
    taskDescription: ""
  })
  const [doneTasks, setDoneTasks] = useState(() => JSON.parse(localStorage.getItem("done")) || []);
  const [delTask, setDelTask] = useState(() => JSON.parse(localStorage.getItem("deleted")) || []);
  const [prevHisOfActiveTask, setPrevHisOfActiveTask] = useState([]);
  const [filter, setFilter] = useState((!tasks[0] === doneTasks[0]));

  const markAsDone = (e, id) => {
    e.preventDefault();
    const completeTask = tasks.find((task) => task.id === id);
    setDoneTasks((prevTask) => [completeTask, ...prevTask]);
    completeTask.stat = true;
    setTasks((prevTask) => prevTask.filter((task) => task.id !== id));
  }

  const addNewTask = () => {
    const newTask = {
      title: formData.taskTitle,
      description: formData.taskDescription,
      date: new Date().toLocaleString(),
      id: nanoid(),
      stat: false
    };
    setTasks(prevTask => [newTask, ...prevTask]);
  }

  const deleteTask = (e, id) => {
    if (e !== null) {
      e.preventDefault();
    }
    const delTask = tasks.find((task) => task.id === id);
    setDelTask((prevTask) => [delTask, ...prevTask]);
    setTasks((prevTask) => prevTask.filter((task) => task.id !== id));
  }

  const editTask = (e, id) => {
    e.preventDefault();
    const t = tasks.find((task) => task.id === id);
    setFormData({
      taskTitle: `${t.title}`,
      taskDescription: `${t.description}`
    })
    setViewForm(true);
    deleteTask(null, id);
  }

  // form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    addNewTask();
    setViewForm(false);
    setFormData({
      taskTitle: "",
      taskDescription: ""
    })
  }

  // onChange handler for form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => {
      return {
        ...prevData,
        [name]: value
      }
    })
  }

  const handleFilterAlreadyDone = () => {
    setFilter((prev) => !prev);
    setPrevHisOfActiveTask(tasks);
    setTasks(JSON.parse(localStorage.getItem("done")) || []);
  }

  const handleFilterActive = () => {
    setFilter((prev) => !prev);
    setTasks([...prevHisOfActiveTask] || []);
  }

  // UI elements
  const taskElements = tasks.map((element, index) => {
    return <div key={index} className="col-md-4 my-2">
      <Task
        title={element.title}
        description={element.description}
        date={element.date}
        id={element.id}
        markAsDone={markAsDone}
        deleteTask={deleteTask}
        editTask={editTask}
        stat={element.stat}
      />
    </div>
  })

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("done", JSON.stringify(doneTasks));
    localStorage.setItem("deleted", JSON.stringify(delTask));
  }, [tasks, doneTasks, delTask])

  return (
    <div className="container">
      {
        viewForm
          ?
          <>
            <form onSubmit={handleSubmit} className="my-3" autoComplete="off">
              <div className="mb-3">
                <label htmlFor="title" className="form-label mt-3">Title</label>
                <input type="text" className="form-control" id="title" name="taskTitle" value={formData.taskTitle} onChange={handleChange} placeholder="Enter title for your task" required minLength="3" />
              </div>
              <div className="mb-3">
                <label htmlFor="details" className="form-label">Description</label>
                <textarea type="text" className="form-control" id="details" name="taskDescription" value={formData.taskDescription} onChange={handleChange} placeholder="Enter description of your task" required minLength="5" />
              </div>
              <button className="btn btn-primary mb-3" type="submit">Add to the tasks</button>
            </form>
          </>
          :
          <>
            {
              tasks.length > 0
                ?
                <div>
                  <div className="overflow-y-auto" style={{ height: '91vh' }}>
                    <div className="position-relative">
                      <h2 className="text-center my-3">Your Tasks</h2>
                      {
                        doneTasks.length > 0
                        &&
                        <div className="dropdown position-absolute top-0 start-0">
                          <button className="btn btn-sm border dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Filter</button>
                          <ul className="dropdown-menu">
                            <li role="button" style={{ display: `${filter ? "" : "none"}` }} onClick={handleFilterActive} className="dropdown-item">Active Tasks</li>
                            <li role="button" style={{ display: `${filter ? "none" : ""}` }} onClick={handleFilterAlreadyDone} className="dropdown-item">Already Done Tasks</li>
                          </ul>
                        </div>
                      }
                    </div>
                    <div className="row mx-1">
                      {taskElements}
                    </div>
                  </div>
                  {
                    !filter
                    &&
                    <button type="button" onClick={() => setViewForm(true)} className="position-absolute bottom-0 end-0 btn btn-primary mb-3 me-3">New task</button>
                  }
                </div>
                :
                <div className="d-flex justify-content-center align-items-center" style={{ width: '100%', height: '85vh' }}>
                  <div className="text-center">
                    <h2>No Tasks Added!!!</h2>
                    <button className="btn btn-primary mt-3" onClick={() => setViewForm(true)}>Add new task</button>
                  </div>
                </div>
            }
          </>
      }
    </div>
  );
}

export default Main;