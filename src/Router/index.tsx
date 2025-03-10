import { RouteObject } from "react-router-dom";
import Suspenselazy from "@components/Suspenselazy";

const routes: RouteObject[] = [
  {
    path: "/login",
    element: Suspenselazy(
      () => import(/* webpackChunkName:"Login" */ "@pages/Login")
    ),
  },
  {
    path: "/",
    element: Suspenselazy(
      () => import(/* webpackChunkName:"Home" */ "@pages/Home")
    ),
  },
  {
    path: "/step",
    element: Suspenselazy(
      () => import(/* webpackChunkName:"Steps" */ "@/Pages/Step")
    ),
  },
  {
    path: "*",
    element: Suspenselazy(
      () => import(/* webpackChunkName:"NotFound" */ "@pages/NotFound")
    ),
  },
];

export default routes;
