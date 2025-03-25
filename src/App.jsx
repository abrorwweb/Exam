import React, { useContext, useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contaxt";
import Like from "./pages/like/Like";
import Download from "./pages/download/Download";
import ImageInfo from "./pages/ImageInfo/ImageInfo";
import Register, { action as RegisterAction } from "./pages/register/Register";
import Login, { action as LoginAction } from "./pages/login/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { GlobalContext } from "./context/globalContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import Profile from "./pages/profile/Profile";
// import { action as HomeActions } from "./pages/home/Home";

function App() {
  let { user, dispatch, authReady } = useContext(GlobalContext);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <Layout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
          // action: HomeActions,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/likes",
          element: <Like />,
        },
        {
          path: "/download-images",
          element: <Download />,
        },
        {
          path: "/image-info",
          element: <ImageInfo />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
      action: RegisterAction,
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: LoginAction,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch({ type: "LOGIN", payload: user });
      dispatch({ type: "AUTH_READY" });
    });
  }, []);

  return <>{authReady && <RouterProvider router={routes} />}</>;
}

export default App;
