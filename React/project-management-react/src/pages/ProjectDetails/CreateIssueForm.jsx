import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createIssue } from "@/Redux/Issue/Action"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

const CreateIssueForm = ({status}) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const form = useForm({
    defaultValues: {
      issueName: "",
      description: "",
      projectId: id,
      status: status,
    },
  });

  const onSubmit = (data) => {
    data.projectId = id;
    data.status = status; // <-- Make sure status is included in the dispatched data
    dispatch(createIssue({
      title: data.issueName,
      description: data.description,
      projectId: data.projectId,
      status: data.status,  // <-- Add status here
    }));
    console.log("create issue data", data);
  };

  return (
    <div>
      <Form {...form}>
        <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>

          <FormField control=
            {form.control}
            name="issueName"
            render={({ field }) =>
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="issueName..." />
                </FormControl>
                <FormMessage />
              </FormItem>}
          />

          <FormField control=
            {form.control}
            name="description"
            render={({ field }) =>
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="description..." />
                </FormControl>
                <FormMessage />
              </FormItem>}
          />


          <DialogClose>
            <Button type="submit" className="w-full mt-2 bg-gray-800 text-white hover:bg-white hover:text-black">Create Issue</Button>
          </DialogClose>
        </form>
      </Form>
    </div>
  )
}

export default CreateIssueForm