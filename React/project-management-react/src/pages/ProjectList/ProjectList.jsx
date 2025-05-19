import { Button } from "@/components/ui/button";
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { MagnifyingGlassIcon, MixerHorizontalIcon } from "@radix-ui/react-icons";
import React, { useState } from 'react'
import { Input } from "@/components/ui/input";
import ProjectCard from "@/pages/Project/ProjectCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects, searchProjects } from "@/Redux/Project/Action";

export const tags = [
    "all",
    "react",
    "nextjs",
    "spring boot",
    "mysql",
    "mongodb",
    "angular",
    "python",
    "flask",
    "django"
]

const ProjectList = () => {

    const [keyword, setKeyword] = useState("");
    const { project } = useSelector(store => store)
    const handleFilterCategory = (value) => {
        if (value == "all") {
            dispatch(fetchProjects({}))
        }
        else
            dispatch(fetchProjects({ category: value }))
    };
    const handleFilterTags = (value) => {
        if (value == "all") {
            dispatch(fetchProjects({}))
        }
        else
            dispatch(fetchProjects({ tag: value }))
    };
    console.log("project store", project)

    const dispatch = useDispatch();

    const handleSearchChange = (e) => {
        setKeyword(e.target.value)
        dispatch(searchProjects(e.target.value));
    };


    return (
        <>
            <div className='relative px-5 lg:px-0 lg:flex gap-5 justify-center py-5'>

                <section className='filterSection'>
                    <Card className='p-5 sticky top-10 bg-black text-white border border-gray-700 shadow-lg'>
                        <div className='flex justify-between lg:w-[20rem]'>
                            <p className='text-xl -tracking-wider hover:text-gray-400'>filters</p>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="bg-gray-800 transition-all duration-200 text-white hover:bg-white hover:text-black" >
                                <MixerHorizontalIcon />
                            </Button>
                        </div>

                        <CardContent className="mt-5">
                            <ScrollArea className="space-y-7 h-[70vh]">
                                <div>
                                    <h1 className='pb-3 text-gray-400 border-b border-gray-700'>Category</h1>
                                    <div className='pt-5'>
                                        <RadioGroup
                                            className="space-y-7 pt-5"
                                            defaultValue="all"
                                            onValueChange={(value) =>
                                                handleFilterCategory(value)}>
                                            <div className='flex items-center space-x-2'>
                                                <RadioGroupItem value="all" id="r1" />
                                                <Label htmlFor="r1">all</Label>
                                            </div>
                                            <div className='flex items-center space-x-2'>
                                                <RadioGroupItem value='fullstack' id="r2" />
                                                <Label htmlFor="r2">fullstack</Label>
                                            </div>
                                            <div className='flex items-center space-x-2'>
                                                <RadioGroupItem value='frontend' id="r3" />
                                                <Label htmlFor="r3">frontend</Label>
                                            </div>
                                            <div className='flex items-center space-x-2'>
                                                <RadioGroupItem value='backend' id="r4" />
                                                <Label htmlFor="r4">backend</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </div>

                                <div className="pt-7">
                                    <h1 className='pb-3 text-gray-400 border-b border-gray-700'>Tag</h1>
                                    <div className='pt-5'>
                                        <RadioGroup
                                            className="space-y-7 pt-5"
                                            defaultValue="all"
                                            onValueChange={(value) =>
                                                handleFilterTags(value)}>
                                            {tags.map((item) => <div key={item} className='flex items-center space-x-2'>
                                                <RadioGroupItem value={item} id={'r1-${item}'} />
                                                <Label htmlFor={'r1-${item}'}>{item}</Label>
                                            </div>)}
                                        </RadioGroup>
                                    </div>
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </section>

                <section className='projectListSection w-full lg:w-[48rem]'>
                    <div className="flex gap-2 items-center pb-5 justify-between">

                        <div className="relative p-0 w-full">
                            <Input
                                onChange={handleSearchChange}
                                placeholder="search project"
                                className="40% px-9 border-gray-700" />
                            <MagnifyingGlassIcon className="absolute top-3 left-3" />
                        </div>
                    </div>

                    <div>
                        <div className="space-y-5 min-h-[74vh]">

                            {
                                keyword ? project.searchProjects?.map((item, index) =>
                                    <ProjectCard item={item} key={item.id * index} />)
                                    : project.projects?.map((item) => (
                                        <ProjectCard key={item.id} item={item} />))
                            }

                        </div>
                    </div>

                </section>

            </div>
        </>
    )
}

export default ProjectList