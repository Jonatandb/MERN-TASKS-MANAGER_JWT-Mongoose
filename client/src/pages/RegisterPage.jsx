import { useForm } from 'react-hook-form'
import { registerRequest } from '../api/auth.js'

export default function RegisterPage() {
  const { register, handleSubmit } = useForm()

  const onSubmit = handleSubmit(async values => {
    const response = await registerRequest(values)
    console.log(response)
  })

  return (
    <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          placeholder='Username'
          {...register('username', { required: true })}
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
        />
        <input
          type='email'
          placeholder='Email'
          {...register('email', { required: true })}
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
        />
        <input
          type='password'
          placeholder='Password'
          {...register('password', { required: true })}
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
        />
        <button type='submit'>Register</button>
      </form>
    </div>
  )
}
