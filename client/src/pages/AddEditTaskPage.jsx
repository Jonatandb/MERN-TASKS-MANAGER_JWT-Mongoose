import { useForm } from 'react-hook-form'
import { useTasks } from '../context/useTasks'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

export default function TasksPage() {
  const { register, handleSubmit, setValue } = useForm()
  const { createTask, getTask, updateTask } = useTasks()
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    async function loadTask() {
      if (params?.id) {
        const task = await getTask(params.id)
        setValue('title', task.title)
        setValue('description', task.description)
      }
    }
    loadTask()
  }, [params, getTask, setValue])

  const onSubmit = handleSubmit(values => {
    if (params?.id) {
      updateTask(params.id, values)
    } else {
      createTask(values)
    }
    navigate('/tasks')
  })

  return (
    <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          placeholder='Title'
          autoFocus
          {...register('title')}
          className='w-full text-white bg-zinc-700 px-4 py-2 rounded-md my-2'
        />

        <textarea
          rows='3'
          placeholder='Description'
          {...register('description')}
          className='w-full text-white bg-zinc-700 px-4 py-2 rounded-md my-2'
        ></textarea>

        <button>Save</button>
      </form>
    </div>
  )
}
