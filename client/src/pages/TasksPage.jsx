import { useEffect } from 'react'
import { useTasks } from '../context/useTasks'

export default function TasksPage() {
  const { tasks, getTasks } = useTasks()

  useEffect(() => {
    getTasks()
  }, [getTasks])

  if (tasks.length === 0) return (<h1>No tasks</h1>)

  return (
    <div>
      {tasks.map(t => (
        <div key={t._id}>
          <h1>{t.title}</h1>
          <p>{t.description}</p>
        </div>
      ))}
    </div>
  )
}
