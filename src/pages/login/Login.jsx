import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { Form, Link, useActionData } from "react-router-dom";
import FormInput from "../../components/FormInput";
import { useRegister } from "../../hooks/useRegister";
import { useLogin } from "../../hooks/useLogin";
import Modal from "../../components/Modal";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  let emailForReset = formData.get("email_for_reset");

  if (emailForReset?.trim()) {
    return { emailForReset };
  }
  return { email, password };
};

function Login() {
  const data = useActionData();
  const { registerWithGoogle } = useRegister();
  const { loginWithEmail } = useLogin();

  useEffect(() => {
    if (data?.email && data?.password) {
      loginWithEmail(data.email, data.password);
    }
  }, [data]);

  return (
    <>
      <Modal />
      <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient">
  <div className="mx-2 flex w-full max-w-md flex-col items-center gap-6 rounded-xl bg-white/10 px-6 py-8 shadow-xl backdrop-blur-md">
    <h1 className="text-3xl font-bold text-white">LOGIN</h1>
    <Form method="post" className="flex w-full flex-col gap-3">
      <FormInput name="email" type="email" placeholder="Email" />
      <FormInput name="password" type="password" placeholder="Password" />
      <div className="mt-5 flex flex-col gap-3 w-full">
        <button className="w-full rounded-3xl border bg-white/20 py-2 text-lg font-semibold text-white transition-all hover:bg-white/30 hover:scale-105">
          Login
        </button>
        <button
          onClick={registerWithGoogle}
          className="flex w-full items-center justify-center gap-2 rounded-3xl border bg-white/20 py-2 text-lg font-semibold text-white transition-all hover:bg-white/30 hover:scale-105"
        >
          Google {<FcGoogle className="text-2xl" />}
        </button>
      </div>
      <div className="flex flex-col justify-between text-center sm:flex-row">
        <button className="text-sm text-white underline hover:text-gray-300" type="button">
          Forget password
        </button>
        <Link to="/register" className="text-sm text-white underline hover:text-gray-300">
          You don't have an account yet?
        </Link>
      </div>
    </Form>
  </div>
</div>

    </>
  );
}

export default Login;
