import { createBrowserRouter } from "react-router-dom";
import List from "./pages/List";
import Detail from "./pages/Detail";
import MyList from "./pages/MyList";

const router = createBrowserRouter([
  {
    path: "*",
    element: <div>Page Not Found</div>,
  },
  {
    path: "/",
    element: <List />,
  },
  {
    path: "/:id/detail",
    element: <Detail />,
  },
  {
    path: "/my-list",
    element: <MyList />,
  },
]);

export default router;
