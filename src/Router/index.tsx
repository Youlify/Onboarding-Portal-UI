import { RouteObject } from "react-router-dom";
import Suspenselazy from "@components/Suspenselazy";

const Login = Suspenselazy(
  () => import(/* webpackChunkName:"Login" */ "@pages/Login")
);
const Home = Suspenselazy(
  () => import(/* webpackChunkName:"Home" */ "@pages/Home")
);
const Step = Suspenselazy(
  () => import(/* webpackChunkName:"Step" */ "@pages/Step")
);
const StepIndex = Suspenselazy(
  () => import(/* webpackChunkName:"StepIndex" */ "@pages/Step/Index/index")
);
const StepAllDone = Suspenselazy(
  () => import(/* webpackChunkName:"StepAllDone" */ "@pages/Step/AllDone")
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
    element: <Step />,
    children: [
      {
        path: "/step",
        element: <StepIndex />,
      },
      {
        path: "/step/allDone",
        element: <StepAllDone />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
