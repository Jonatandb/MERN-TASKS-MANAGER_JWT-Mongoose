import { useForm } from 'react-hook-form'
import { useAuth } from '../context/useAuth'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { signin, isAuthenticated, errors: loginErrors } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate('/tasks')
  }, [isAuthenticated, navigate])

  const onSubmit = handleSubmit(data => {
    signin(data)
  })

  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        {loginErrors.map((error, i) => (
          <div className='bg-red-500 p-2 text-white text-center my-2' key={i}>
            {error}
          </div>
        ))}
        <h1 className='text-2xl font-bold'>Login</h1>

        <form onSubmit={onSubmit}>
          <input
            type='email'
            placeholder='Email'
            {...register('email', { required: true })}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          />
          {errors.email && <p className='text-red-500'>Email is required</p>}

          <input
            type='password'
            placeholder='Password'
            {...register('password', { required: true })}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          />
          {errors.password && (
            <p className='text-red-500'>Password is required</p>
          )}
          <div className='flex flex-col items-center'>
            <button
              type='submit'
              className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mt-4'
            >
              Login
            </button>
          </div>
        </form>

        <p className='flex gap-x-2 justify-between mt-3'>
          Don&apos;t have an account? <Link className='text-sky-500' to='/register'>Sign up</Link>
        </p>
      </div>
    </div>
  )
}
