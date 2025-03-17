import { RouteObject } from "react-router-dom";
import Suspenselazy from "@components/Suspenselazy";

const Login = Suspenselazy(
  () => import(/* webpackChunkName:"Login" */ "@pages/Login")
);
const Home = Suspenselazy(
  () => import(/* webpackChunkName:"Home" */ "@pages/Home")
);
const Step = Suspenselazy(
  () => import(/* webpackChunkName:"Steps" */ "@/Pages/Step")
);
const NotFound = Suspenselazy(
  () => import(/* webpackChunkName:"NotFound" */ "@pages/NotFound")
);

const routes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/step",
    element: <Step />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
