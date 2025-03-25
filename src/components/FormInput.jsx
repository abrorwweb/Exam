import { FaSearch } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

function FormInput({ type, placeholder, name }) {
  return (
    <label className="input input-md input-bordered flex w-full items-center gap-2 md:input-md">
      <input
        type={type}
        className="grow outline-none"
        placeholder={placeholder}
        name={name}
      />
      {placeholder == "Search" && <FaSearch className="h-4 w-4 opacity-70" />}
      {placeholder == "User name" && (
        <FaUserAlt className="h-4 w-4 opacity-70" />
      )}
      {placeholder == "Email" && <MdEmail className="h-4 w-4 opacity-70" />}
      {placeholder == "password" && (
        <RiLockPasswordFill className="h-4 w-4 opacity-70" />
      )}
      {placeholder == "confirm password" && (
        <RiLockPasswordFill className="h-4 w-4 opacity-70" />
      )}
    </label>
  );
}

export default FormInput;
