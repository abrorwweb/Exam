import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Form, Link, useActionData } from "react-router-dom";
import FormInput from "../../components/FormInput";
import { useRegister } from "../../hooks/useRegister";
import { useLogin } from "../../hooks/useLogin";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  return { email, password };
};

function Login() {
  const data = useActionData();
  const { registerWithGoogle } = useRegister();
  const { loginWithEmail } = useLogin();
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  useEffect(() => {
    if (data?.email && data?.password) {
      loginWithEmail(data.email, data.password);
    }
  }, [data]);

  return (
    <>
      <div
        className="flex h-screen items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: 'url("https://picsum.photos/1920/1080")' }}
      >
        <div className="mx-2 flex w-full max-w-md flex-col items-center gap-6 rounded-xl bg-white/20 px-6 py-8 shadow-xl backdrop-blur-md">
          <h1 className="text-3xl font-bold text-white">LOGIN</h1>
          <Form method="post" className="flex w-full flex-col gap-3">
            <FormInput name="email" type="email" placeholder="Email" />
            <FormInput name="password" type="password" placeholder="Password" />
            <div className="mt-5 flex flex-col gap-3 w-full">
              <button className="w-full rounded-3xl border bg-white/30 py-2 text-lg font-semibold text-white transition-all hover:bg-white/40 hover:scale-105">
                Login
              </button>
              <button
                type="button"
                onClick={registerWithGoogle}
                className="flex w-full items-center justify-center gap-2 rounded-3xl border bg-white/30 py-2 text-lg font-semibold text-white transition-all hover:bg-white/40 hover:scale-105"
              >
                Google <FcGoogle className="text-2xl" />
              </button>
            </div>
            <div className="flex flex-col justify-between text-center sm:flex-row">
              <button
                type="button"
                className="text-[17px] text-white underline hover:text-gray-300"
                onClick={() => setShowResetModal(true)}
              >
                Forget password?
              </button>
              <Link to="/register" className="text-[17px] text-white underline hover:text-gray-300">
                You don't have an account yet?
              </Link>
            </div>
          </Form>
        </div>
      </div>

      
      {showResetModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-96 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Reset Password</h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
            <div className="flex justify-end mt-4 gap-3">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-md"
                onClick={() => setShowResetModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={() => {
                  alert(`Password reset email sent to: ${resetEmail}`);
                  setShowResetModal(false);
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
