import FormInput from "./FormInput";
import { Form, useActionData } from "react-router-dom";

export async function action({ request }) {
  const formData = await request.formData();
  const searchQuery = formData.get("name");
  console.log("Search query:", searchQuery);
  return { searchQuery };
}

function Search() {
  const data = useActionData();

  return (
    <div>
      <Form method="post" className="max-w-96 mx-auto gap-2 w-full flex">
        <FormInput type="text" placeholder="Search" name="name" />
        <button className="btn btn-primary md:hidden btn-sm">Search</button>
      </Form>
      {data?.searchQuery && (
        <p className="mt-2 text-center">Search Result: {data.searchQuery}</p>
      )}
    </div>
  );
}

export default Search;