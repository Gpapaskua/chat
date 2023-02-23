import { Navigate } from "react-router-dom";
import Messenger from "@/features/chat/Messenger";
import Layout from "@/components/Layout";
import Login from "@/features/auth/Login";
import ChatContextProvider from "@/features/chat/context/chatContext";
import ChatRoom from "@/features/chat/ChatRoom";

const routes = (isLoggedIn: boolean) => [
  {
    path: "/auth",
    element: !isLoggedIn ? <Login /> : <Navigate to="/" />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: isLoggedIn ? (
          <ChatContextProvider>
            <Messenger />
          </ChatContextProvider>
        ) : (
          <Navigate to="/auth" />
        ),
        children: [
          {
            path: "/:roomId",
            element: isLoggedIn ? <ChatRoom /> : <Navigate to="/auth" />,
          },
        ],
      },
    ],
  },
];

export default routes;
