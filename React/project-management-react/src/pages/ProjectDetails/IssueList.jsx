import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import IssueCard from "./IssueCard"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "@radix-ui/react-icons"
import CreateIssueForm from "./CreateIssueForm"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchIssues } from "@/Redux/Issue/Action"
import { useParams } from "react-router-dom"

const IssueList = ({ title, status }) => {
    const dispatch = useDispatch();
    const { issue } = useSelector(store => store)
    const { id } = useParams();

    useEffect(() => {
        dispatch(fetchIssues(id))
    }, [id])

    return (
        <div>
            <Dialog>
                <Card className="w-full md:w-[300px] lg:w-[310px] border-gray-700">

                    <CardHeader>
                        <CardTitle>{title}</CardTitle>
                    </CardHeader>
                    <CardContent className='px-2'>
                        <div className="space-y-2">
                            {issue.issues.filter((item) => item.status === status).map((item, index) =>
                                <IssueCard projectId={id} item={item} key={`${item.id}-${index}`} />
                            )}
                        </div>
                    </CardContent>

                    <CardFooter>
                        <DialogTrigger>
                            <Button
                                variant='outline'
                                className='w-full flex items-center transition-all duration-200 border-gray-800 
                                bg-gray-800 text-white
                                hover:bg-white hover:text-black'>
                                Create Issue
                                <PlusIcon />
                            </Button>
                        </DialogTrigger>
                    </CardFooter>
                </Card>
                <DialogContent className='bg-black border-gray-900'>
                    <DialogHeader>
                        <DialogTitle>Create New Issue</DialogTitle>
                    </DialogHeader>
                    <CreateIssueForm status={status} />
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default IssueList