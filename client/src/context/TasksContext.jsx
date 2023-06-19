import { createContext, useCallback, useState } from 'react'
import { createTaskRequest, getTasksRequest } from '../api/tasks'
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

  return (
    <TasksContext.Provider value={{ tasks, createTask, getTasks }}>
      {children}
    </TasksContext.Provider>
  )
}
