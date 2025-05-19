import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusIcon } from "@radix-ui/react-icons";
import InviteUserForm from "./InviteUserForm";
import IssueList from "./IssueList";
import ChatBox from "./ChatBox";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProjectById } from "@/Redux/Project/Action";
import { useParams } from "react-router-dom";

const ProjectDetails = () => {
    const dispatch = useDispatch();
    const { project } = useSelector(store => store)
    const { id } = useParams();
    const handleProjectInvitation = () => { };


    useEffect(() => {
        dispatch(fetchProjectById(id))
    }, [id])

    return (
        <>
            <div className="mt-5 lg:px-10 flex justify-between gap-5">
                {/* Left Section: Project Details and Task Board */}
                <ScrollArea className="h-screen lg:w-[70%] pr-2">
                    <div className="text-gray-400 pb-10 w-full">
                        <h1 className="text-lg font-semibold pb-5">
                            {project.projectDetails?.name}
                        </h1>

                        <div className="space-y-5 pb-10 text-sm">
                            <p className="w-full md:max-w-lg lg:max-w-xl">
                                {project.projectDetails?.description}
                            </p>

                            <div className="flex">
                                <p className="w-25">Project Lead :</p>
                                <p>{project.projectDetails?.owner.fullName}</p>
                            </div>

                            <div className="flex items-center">
                                <p className="w-25">Members :</p>
                                <div className="flex items-center gap-2">
                                    {project.projectDetails?.team.map((item) => (
                                        <Avatar
                                            key={item}
                                            className="cursor-pointer transition-all duration-200 
                                        bg-gray-800 text-white rounded-full 
                                        hover:bg-white hover:text-black"
                                        >
                                            <AvatarFallback>{item.fullName[0]}</AvatarFallback>
                                        </Avatar>
                                    ))}
                                </div>

                                <Dialog>
                                    <DialogTrigger>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={handleProjectInvitation}
                                            className="ml-2 transition-all duration-200 border border-gray-800 
                                        bg-gray-800 text-white 
                                        hover:bg-white hover:text-black"
                                        >
                                            <span>invite</span>
                                            <PlusIcon className="w-3 h-3" />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>Invite User</DialogHeader>
                                        <InviteUserForm />
                                    </DialogContent>
                                </Dialog>
                            </div>

                            <div className="flex">
                                <p className="w-25">Category :</p>
                                <p>{project.projectDetails?.category}</p>
                            </div>

                            <div className="flex">
                                <p className="w-25">Status :</p>
                                <Badge className="cursor-pointer bg-white text-black border border-gray-900 shadow-xl rounded-full">
                                    In Progress
                                    {/* {project.projectDetails?.statue} */}
                                </Badge>
                            </div>
                        </div>

                        {/* Tasks Section */}
                        <section >
                            <p className="py-5 border-b text-lg tracking-wider">Tasks</p>
                            <div className="lg:flex md:flex gap-3 justify-between py-5">
                                <IssueList status="pending" title="To-do List" />
                                <IssueList status="in_progress" title="In Progress" />
                                <IssueList status="done" title="Done" />
                            </div>
                        </section>
                    </div>
                </ScrollArea>

                {/* Right Section: Chat Box */}
                <div className="lg:w-[30%] rounded-md sticky top-10">
                    <ChatBox />
                </div>
            </div>
        </>
    );
};

export default ProjectDetails;
