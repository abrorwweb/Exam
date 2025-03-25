import { Form, Link, useActionData } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useEffect } from "react";
import FormInput from "../../components/FormInput";
import { useRegister } from "../../hooks/useRegister";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let fullName = formData.get("full_name");
  let email = formData.get("email");
  let password = formData.get("password");
  let confirmPassword = formData.get("confirm_password");

  if (password == confirmPassword) {
    return {
      fullName,
      email,
      password,
      confirmPassword,
    };
  } else {
    toast.warn("password is not equal!");
    return null;
  }
};

function Register() {
  const { registerWithGoogle, registerWithEmail } = useRegister();

  const data = useActionData();
  useEffect(() => {
    if (data) {
      registerWithEmail(data.fullName, data.email, data.password);
      // console.log(data.fullName);
    }
  }, [data]);

  return (
<div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient">
  <div className="mx-2 flex w-full max-w-md flex-col items-center gap-6 rounded-xl bg-white/10 px-6 py-8 shadow-xl backdrop-blur-md">
    <h1 className="text-3xl font-bold text-white">REGISTER</h1>
    <Form method="post" className="flex w-full flex-col gap-3">
      <FormInput name="full_name" type="text" placeholder="User name" />
      <FormInput name="email" type="email" placeholder="Email" />
      <FormInput name="password" type="password" placeholder="Password" />
      <FormInput name="confirm_password" type="password" placeholder="Confirm password" />
      
      <div className="mt-5 flex flex-col gap-3 w-full">
        <button className="w-full rounded-3xl bg-white/20 py-2 text-lg font-semibold text-white transition-all hover:bg-white/30 hover:scale-105">
          Register
        </button>
        <button
          onClick={registerWithGoogle}
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-3xl bg-white/20 py-2 text-lg font-semibold text-white transition-all hover:bg-white/30 hover:scale-105"
        >
          Google {<FcGoogle className="text-3xl" />}
        </button>
      </div>
      <div className="flex justify-center">
        <Link to="/login" className="text-sm text-white underline hover:text-gray-300">
          You already have an account?
        </Link>
      </div>
    </Form>
  </div>
</div>

  );
}

export default Register;
