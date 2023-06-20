import { createContext, useCallback, useState } from 'react'
import {
  createTaskRequest,
  getTasksRequest,
  deleteTaskRequest,
  getTaskRequest,
  updateTaskRequest,
} from '../api/tasks'
export const TasksContext = createContext()

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([])

  const getTask = async id => {
    try {
      const res = await getTaskRequest(id)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  const getTasks = useCallback(async () => {
    const res = await getTasksRequest()
    setTasks(res.data)
  }, [])

  const createTask = async task => {
    await createTaskRequest(task)
  }

  const deleteTask = async id => {
    const res = await deleteTaskRequest(id)
    if (res.status === 204) {
      setTasks(tasks.filter(t => t._id !== id))
    }
  }

  const updateTask = async (id, task) => {
    try {
      await updateTaskRequest(id, task)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <TasksContext.Provider
      value={{ tasks, createTask, getTask, getTasks, deleteTask, updateTask }}
    >
      {children}
    </TasksContext.Provider>
  )
}
