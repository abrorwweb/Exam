import { Form, Link, useActionData } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
import FormInput from "../../components/FormInput";
import { useRegister } from "../../hooks/useRegister";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let fullName = formData.get("full_name");
  let email = formData.get("email");
  let password = formData.get("password");
  let confirmPassword = formData.get("confirm_password");

  if (password === confirmPassword) {
    return { fullName, email, password };
  } else {
    return { error: "Passwords do not match!" };
  }
};

function Register() {
  const { registerWithGoogle, registerWithEmail } = useRegister();
  const data = useActionData();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (data?.error) {
      setErrorMessage(data.error);
    } else if (data) {
      registerWithEmail(data.fullName, data.email, data.password);
    }
  }, [data]);

  return (
    <>
      <div
        className="flex h-screen items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: 'url("https://picsum.photos/1920/1080")' }}
      >
        <div className="mx-2 flex w-full max-w-md flex-col items-center gap-6 rounded-xl bg-white/20 px-6 py-8 shadow-xl backdrop-blur-md">
          <h1 className="text-3xl font-bold text-white">REGISTER</h1>
          {errorMessage && (
            <div className="w-full p-2 text-center text-red-500 bg-red-100 rounded-md">
              {errorMessage}
            </div>
          )}
          <Form method="post" className="flex w-full flex-col gap-3">
            <FormInput name="full_name" type="text" placeholder="User name" />
            <FormInput name="email" type="email" placeholder="Email" />
            <FormInput name="password" type="password" placeholder="Password" />
            <FormInput name="confirm_password" type="password" placeholder="Confirm password" />

            <div className="mt-5 flex flex-col gap-3 w-full">
              <button className="w-full rounded-3xl bg-white/30 py-2 text-lg font-semibold text-white transition-all hover:bg-white/40 hover:scale-105">
                Register
              </button>
              <button
                onClick={registerWithGoogle}
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-3xl bg-white/30 py-2 text-lg font-semibold text-white transition-all hover:bg-white/40 hover:scale-105"
              >
                Google <FcGoogle className="text-3xl" />
              </button>
            </div>
            <div className="flex justify-center">
              <Link to="/login" className="text-[17px] text-white underline hover:text-gray-300">
                Already have an account?
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Register;
