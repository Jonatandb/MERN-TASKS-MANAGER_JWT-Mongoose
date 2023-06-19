import { useForm } from 'react-hook-form'
import { useTasks } from '../context/useTasks'
import { useNavigate } from 'react-router-dom'

export default function TasksPage() {
  const { register, handleSubmit } = useForm()
  const { createTask } = useTasks()
  const navigate = useNavigate()

  const onSubmit = handleSubmit(values => {
    createTask(values)
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
