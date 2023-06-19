import { useAuth } from '../context/useAuth'
import { Link } from 'react-router-dom'

export default function NavBar() {
  const { isAuthenticated, logout, user } = useAuth()

  return (
    <nav className='bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg'>
      <Link to='/'>
        <h1 className='text-2xl font-bold  select-none'>Tasks Manager</h1>
      </Link>

      <ul className='flex gap-x-2'>
        {isAuthenticated ? (
          <>
            <li className='select-none'>Welcome {user.username}</li>
            <li>
              <Link
                to='/add-task'
                className='bg-indigo-500 px-4 py-1 rounded-sm select-none'
              >
                Add Task
              </Link>
            </li>
            <li>
              <Link
                to='/profile'
                className='bg-indigo-500 px-4 py-1 rounded-sm select-none'
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to='/'
                onClick={() => logout()}
                className='bg-indigo-500 px-4 py-1 rounded-sm select-none'
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to='/login'
                className='bg-indigo-500 px-4 py-1 rounded-sm select-none'
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to='/register'
                className='bg-indigo-500 px-4 py-1 rounded-sm select-none'
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}
