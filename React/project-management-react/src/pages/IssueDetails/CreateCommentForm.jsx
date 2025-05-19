import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useDispatch } from "react-redux"
import { createComment } from "@/Redux/Comment/Action"

const CreateCommentForm = ({ issueId }) => {
  const dispatch = useDispatch();
  const form = useForm({
    defaultValues: {
      content: "",
    }
  })

  const onSubmit = (data) => {
    dispatch(createComment({ content: data.content, issueId }))
    console.log("create project data", data)
  }

  return (
    <div>
      <Form {...form}>
        <form className='flex gap-2' onSubmit={form.handleSubmit(onSubmit)}>

          <FormField control=
            {form.control}
            name="content"
            render={({ field }) =>
              <FormItem className='flex gap-2'>
                <div>
                  <Avatar className="transition-all duration-200 bg-gray-800 text-white hover:bg-white hover:text-black">
                    <AvatarFallback>K</AvatarFallback>
                  </Avatar>
                </div>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="w-[20rem] border-gray-700 py-4 px-5"
                    placeholder="add comment here..." />
                </FormControl>
                <FormMessage />
              </FormItem>}
          />

          <Button
            type="submit"
            className="py-4 transition-all duration-200 bg-gray-800 text-white hover:bg-white hover:text-black">
            Save
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default CreateCommentForm