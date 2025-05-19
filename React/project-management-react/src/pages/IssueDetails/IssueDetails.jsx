import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router-dom"
import CreateCommentForm from "./CreateCommentForm";
import CommentCard from "./CommentCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchIssueById, updateIssueStatus } from "@/Redux/Issue/Action";
import { fetchComments } from "@/Redux/Comment/Action";

const IssueDetails = () => {

    const { projectId, issueId } = useParams();
    const dispatch = useDispatch();
    const issue = useSelector(state => state.issue);
    const comment = useSelector(state => state.comment);


    const handleUpdateIssueStatus = (status) => {
        dispatch(updateIssueStatus({ status, id: issueId }));
        console.log(status);
    };

    useEffect(() => {
        dispatch(fetchIssueById(issueId));
        dispatch(fetchComments(issueId))
    }, [issueId]);

    return (
        <div className="px-20 py-8 text-gray-400">
            <div className="flex justify-between border p-10 rounded-lg border-gray-700">
                <ScrollArea className="h-[80vh] w-[60%]">
                    <div>
                        <h1 className="text-lg font-semibold text-gray-400">{issue.issueDetails?.title}</h1>
                        <div className="py-5">
                            <h2 className="font-semibold text-gray-400">Description</h2>
                            <p className="text-gray-400 text-sm mt-3">{issue.issueDetails?.description}</p>
                        </div>
                        <div className="mt-5">
                            <h1 className="pb-3">Activity</h1>
                            <Tabs defaultValue="comments" className='w-[400px]'>
                                <TabsList className='bg-gray-800 mb-5'>
                                    <TabsTrigger className='data-[state=active]:bg-gray-900' value="all">
                                        All
                                    </TabsTrigger>
                                    <TabsTrigger className='data-[state=active]:bg-gray-900' value="comments">
                                        Comments
                                    </TabsTrigger>
                                    <TabsTrigger className='data-[state=active]:bg-gray-900' value="history">
                                        History
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value='all'>
                                    All make changes to your profile here.
                                </TabsContent>

                                <TabsContent value='comments'>
                                    <CreateCommentForm issueId={issueId} />
                                    <div className="mt-8 space-y-6">
                                        {comment.comments.map((item) => (
                                            <CommentCard item={item} key={item.id} />
                                        ))}

                                    </div>
                                </TabsContent>

                                <TabsContent value='history'>
                                    History: Change your password here.
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </ScrollArea>

                <div className="w-full lg:w-[30%] space-y-2">
                    <Select onValueChange={handleUpdateIssueStatus}>
                        <SelectTrigger className="w-[180px] transition-all duration-200 border-gray-700 text-white
                                                         hover:bg-white hover:text-black">
                            <SelectValue placeholder="To Do" />
                        </SelectTrigger>
                        <SelectContent className="bg-black text-white border border-gray-800">
                            <SelectItem className='text-white hover:bg-white hover:text-black' value="pending">To Do</SelectItem>
                            <SelectItem className='text-white hover:bg-white hover:text-black' value="in progress">In Progress</SelectItem>
                            <SelectItem className='text-white hover:bg-white hover:text-black' value="done">Done</SelectItem>
                        </SelectContent>
                    </Select>

                    <div className="border rounded-lg border-gray-700">
                        <p className="border-b py-3 px-5 border-gray-700">Details</p>
                        <div className="p-5">
                            <div className="space-y-7">
                                <div className="flex gap-10 items-center">
                                    <p className="w-[7rem]">Assignee</p>
                                    {issue.issueDetails?.assignee?.fullName ? <div className="flex items-center gap-3">
                                        <Avatar className='h-8 w-8 text-xs transition-all duration-200 bg-gray-800 text-white
                                                         hover:bg-white hover:text-black'>
                                            <AvatarFallback>{issue.issueDetails?.assignee?.fullName[0]}</AvatarFallback>
                                        </Avatar>
                                        <p>{issue.issueDetails?.assignee?.fullName}</p>
                                    </div> : <p>unassigned</p>
                                    }


                                </div>

                                <div className="flex gap-10 items-center">
                                    <p className="w-[7rem]">Labels</p>
                                    <p>None</p>
                                </div>

                                <div className="flex gap-10 items-center">
                                    <p className="w-[7rem]">Status</p>
                                    <Badge className='bg-white text-black rounded-full'>{issue.issueDetails?.status}</Badge>
                                </div>

                                <div className="flex gap-10 items-center">
                                    <p className="w-[7rem]">Release</p>
                                    <p>03-04-2025</p>
                                </div>

                                <div className="flex gap-10 items-center">
                                    <p className="w-[7rem]">Reporter</p>
                                    <div className="flex items-center gap-3">
                                        <Avatar className='h-8 w-8 text-xs transition-all duration-200 bg-gray-800 text-white
                                                         hover:bg-white hover:text-black'>
                                            <AvatarFallback>I</AvatarFallback>
                                        </Avatar>
                                        <p>Kirito</p>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default IssueDetails