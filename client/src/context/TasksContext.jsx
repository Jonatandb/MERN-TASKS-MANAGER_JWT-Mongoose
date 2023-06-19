import { createContext, useCallback, useState } from 'react'
import {
  createTaskRequest,
  getTasksRequest,
  deleteTaskRequest,
} from '../api/tasks'
export const TasksContext = createContext()

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([])

  const getTasks = useCallback(async () => {
    try {
      const res = await getTasksRequest()
      setTasks(res.data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const createTask = async task => {
    const res = await createTaskRequest(task)
    console.log(res)
  }

  const deleteTask = async id => {
    try {
      const res = await deleteTaskRequest(id)
      if (res.status === 204) {
        setTasks(tasks.filter(t => t._id !== id))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <TasksContext.Provider value={{ tasks, createTask, getTasks, deleteTask }}>
      {children}
    </TasksContext.Provider>
  )
}
