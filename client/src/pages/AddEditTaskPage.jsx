import { useForm } from 'react-hook-form'
import { useTasks } from '../context/useTasks'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

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
        setValue(
          'date',
          task.date ? dayjs(task.date).utc().format('YYYY-MM-DD') : null,
        )
      }
    }
    loadTask()
  }, [params, getTask, setValue])

  const onSubmit = handleSubmit(data => {
    const task = {
      title: data.title,
      description: data.description,
      date: data.date
        ? dayjs(data.date).utc(true).format()
        : dayjs(new Date()).utc(true).format(),
    }

    if (params?.id) {
      updateTask(params.id, task)
    } else {
      createTask(task)
    }

    navigate('/tasks')
  })

  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        <form onSubmit={onSubmit}>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            placeholder='Title'
            autoFocus
            {...register('title')}
            className='w-full text-white bg-zinc-700 px-4 py-2 rounded-md my-2'
          />

          <label htmlFor='description'>Description</label>
          <textarea
            rows='3'
            placeholder='Description'
            {...register('description')}
            className='w-full text-white bg-zinc-700 px-4 py-2 rounded-md my-2'
          ></textarea>

          <label htmlFor='date'>Date</label>
          <input
            className='w-full text-white bg-zinc-700 px-4 py-2 rounded-md my-2'
            type='date'
            {...register('date')}
          />

          <button className='bg-indigo-500 px-3 py-2 rounded-md'>Save</button>
        </form>
      </div>
    </div>
  )
}
