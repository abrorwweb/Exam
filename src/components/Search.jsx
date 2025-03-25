import FormInput from "./FormInput";
import { Form } from "react-router-dom";
function Search() {
  return (
    <Form method="post" className="max-w-96 mx-auto gap-2 w-full flex">
      <FormInput type="text" placeholder="Search" name="name" />
      <button className="btn btn-primary md:hidden btn-sm">Search</button>
    </Form>
  );
}

export default Search;
