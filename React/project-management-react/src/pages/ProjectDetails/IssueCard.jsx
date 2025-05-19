import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DotsVerticalIcon, PersonIcon } from "@radix-ui/react-icons"
import UserList from "./UserList"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { deleteIssue } from "@/Redux/Issue/Action"

const IssueCard = ({ item, projectId }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleIssueDelete = () => {
        dispatch(deleteIssue(item.id))
    }

    return (
        <Card className='rounded-md py-1 pb-2 border-gray-700'>
            <CardHeader className='py-0 space-y-0'>
                <div className="flex justify-between items-center">
                    <CardTitle
                        className='cursor-pointer'
                        onClick={() => navigate(`/project/${projectId}/issue/${item.id}`)}>
                        {item.title}</CardTitle>

                    {/* Dropdown for issue actions */}
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button className='rounded-full hover:bg-gray-800' size='icon' variant='ghost'>
                                <DotsVerticalIcon />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-black text-white border border-gray-700 shadow-xl rounded-md">
                            <DropdownMenuItem className="hover:bg-gray-800">In Progress</DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-gray-800">Done</DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-gray-800">Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={handleIssueDelete} className="hover:bg-gray-800">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>

            <CardContent className='py-0'>
                <div className="flex items-center justify-between">
                    <p>FBP - 1</p>
                    <DropdownMenu className='w-[30rem] border border-red-400'>
                        <DropdownMenuTrigger>
                            <Button
                                size='icon'
                                className="w-8 h-8 transition-all duration-200
                                bg-gray-800 text-white rounded-full 
                                hover:bg-white hover:text-black">
                                <Avatar >
                                    <AvatarFallback>
                                        <PersonIcon />
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-black text-white border border-gray-800 shadow-xl rounded-md">
                            <UserList issueDetails={item} />
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </CardContent>
        </Card>
    )
}

export default IssueCard
