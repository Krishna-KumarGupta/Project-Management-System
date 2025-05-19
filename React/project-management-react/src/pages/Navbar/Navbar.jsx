import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import CreateProjectForm from '../Project/CreateProjectForm'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { PersonIcon } from '@radix-ui/react-icons'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '@/Redux/Auth/Action'

const Navbar = () => {
  const { auth } = useSelector(store => store)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogout=()=>{
    dispatch(logout())
  }

  return (
    <div className='border-b py-4 px-5 flex items-center justify-between bg-black text-white border-gray-700'>
      <div className='flex items-center gap-3'>
        {/* Project Management Title with Hover Effect */}
        <p onClick={() => navigate("/")} className='cursor-pointer hover:text-gray-400 transition-colors duration-200 px-2 py-1 rounded-md'>
          Project Management
        </p>

        {/* New Project Button */}
        <Dialog>
          <DialogTrigger>
            <Button
              variant="ghost"
              className="px-3 py-1 rounded-md transition-all duration-200
                     bg-black text-white hover:bg-white hover:text-black">
              New Project
            </Button>
          </DialogTrigger>

          <DialogContent className="bg-black text-white shadow-lg rounded-md">
            <DialogHeader>Create New Project</DialogHeader>
            <CreateProjectForm />
          </DialogContent>
        </Dialog>

        {/* Upgrade Button */}
        <Button
          onClick={() => navigate("/Upgrade_plan")}
          variant="ghost"
          className="px-3 py-1 rounded-md transition-all duration-200 
                         bg-black text-white hover:bg-white hover:text-black" >
          Upgrade
        </Button>
      </div>

      <div className='flex gap-3 items-center'>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-2 transition-all duration-200 border-gray-800 
                     bg-gray-800 text-white 
                     hover:bg-white hover:text-black">
              <PersonIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-gray-900 dark:bg-gray-950 border border-gray-900 dark:border-gray-900 shadow-xl rounded-md">
            <DropdownMenuItem className="transition-all duration-200 border border-gray-800 
                                bg-gray-800 text-white
                                hover:bg-white hover:text-black" 
                                onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu >
        <p className='cursor-pointer hover:text-gray-400 
        transition-colors duration-200 px-2 py-1 rounded-md'>{auth.user?.fullName}</p>
      </div>
    </div>
  )
}

export default Navbar
