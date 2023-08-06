import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/user/pages/Home";
import LoginCard from "./components/user/LoginCard";
import SignupCard from "./components/user/SignupCard";
import Profile from "./components/user/pages/Profile";
import { Provider } from "react-redux";
import { persistor, store } from "./utils/store/store";
import { PersistGate } from "redux-persist/integration/react";
import AdminLogin from "./components/user/pages/AdminLogin";
import AdminDash from "./components/user/pages/AdminDash";

function App() {
  return (
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor} >
        <RouterProvider router={appRouter} />
      </PersistGate>
    </Provider>
  );
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <LoginCard />
  },
  {
    path: "/signup",
    element: <SignupCard />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/admin",
    element: <AdminLogin />
  },
  {
    path:'/admin/dash',
    element:<AdminDash />
  }
])


export default App;