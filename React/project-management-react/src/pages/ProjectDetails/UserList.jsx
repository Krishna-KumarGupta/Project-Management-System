import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { assignedIssueToUser } from "@/Redux/Issue/Action"
import { useDispatch, useSelector } from "react-redux"

const UserList = ({issueDetails}) => {
  // const { project } = useSelector(store => store)
  const project = useSelector((store) => store.project)
  const dispatch = useDispatch();
  const handleAssignIssueToUser = (userId) => {
    dispatch(assignedIssueToUser(issueDetails.id, userId))
  }
  

  return (
    <div className="space-y-3">
      <div className="rounded-md  border border-gray-700">
        <p className="py-3 px-3"> {issueDetails.assignee?.fullName || "Unassigne"} </p>
      </div>
      {project.projectDetails?.team.map((item) => <div 
      onClick={()=> handleAssignIssueToUser(item.id)}
      key={item} className="py-2 group hover:bg-slate-800 border-gray-700 cursor-pointer flex items-center space-x-4 rounded-md border px-4">
        <Avatar>
          <AvatarFallback className='bg-gray-800'>
            {item.fullName[0]}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">{item.fullName}</p>
          <p className="text-sm textmutted-foreground">@{item.fullName.toLowerCase()}</p>

        </div>
      </div>
      )
      }
    </div>
  )
}

export default UserList