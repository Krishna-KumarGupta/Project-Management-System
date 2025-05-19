import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useForm } from "react-hook-form";
import { Input } from '@/components/ui/input';
import { DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { tags } from '../ProjectList/ProjectList';
import { Cross1Icon } from '@radix-ui/react-icons';
import { useDispatch } from 'react-redux';
import { createProject } from '@/Redux/Project/Action';

const CreateProjectForm = () => {
  const dispatch = useDispatch();

  const handleTagsChange = (newValue) => {
    const currentTags = form.getValues("tags")

    const updatetags = currentTags.includes(newValue) ?
      currentTags.filter(tags => tags !== newValue) : [...currentTags, newValue];

    form.setValue("tags", updatetags)
  }

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      tags: ["javascript", "react"],
    }
  })

  const onSubmit = (data) => {
    dispatch(createProject(data))
    console.log("create project data", data)
  }

  return (
    <div>
      <Form {...form}>
        <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>

          <FormField control=
            {form.control}
            name="name"
            render={({ field }) =>
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="project name..." />
                </FormControl>
                <FormMessage />
              </FormItem>}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) =>
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="project description..." />
                </FormControl>
                <FormMessage />
              </FormItem>}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) =>
              <FormItem>
                <FormControl>
                  <Select
                    defaultValue="fullstack"
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value)
                    }}
                  ><SelectTrigger className="w-full border-gray-700">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent className='p-5 sticky top-10 bg-black text-white border border-gray-700 shadow-lg '>
                      <SelectItem className='hover:bg-gray-800' value="fullstack">Full Stack</SelectItem>
                      <SelectItem className='hover:bg-gray-800' value="frontend">Frontend</SelectItem>
                      <SelectItem className='hover:bg-gray-800' value="backend">Backend</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) =>
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      handleTagsChange(value)
                    }}
                  ><SelectTrigger className="w-full border-gray-700">
                      <SelectValue placeholder="Tags" />
                    </SelectTrigger>
                    <SelectContent className='p-5 sticky top-10 bg-black text-white border border-gray-700 shadow-lg '>
                      {tags.map((item) => <SelectItem key={item} className='hover:bg-gray-800' value={item}>{item}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </FormControl>
                <div className='flex gap-1 flex-wrap'>
                  {field.value.map((item) => <div key={item} onClick={() => handleTagsChange(item)}
                    className="cursor-pointer flex rounded-full items-center border gap-2 px-4 py-1">
                    <span className="text-sm">{item}</span>
                    <Cross1Icon className="h-2 w-3" />
                  </div>)}
                </div>
                <FormMessage />
              </FormItem>}
          />

          <DialogClose>
            {false ? <div><p>you can create only 3 project with free plan,
              please updgrade your plan.</p></div> :
              <Button type="submit" className="w-full mt-2 transition-all duration-200 bg-gray-800 text-white hover:bg-white hover:text-black">
                Create Project
              </Button>}
          </DialogClose>
        </form>
      </Form>
    </div>
  )
}

export default CreateProjectForm