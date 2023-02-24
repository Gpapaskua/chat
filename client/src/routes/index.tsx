import Messenger from "@/features/chat/Messenger";
import Layout from "@/components/Layout";
import Login from "@/features/auth/Login";
import ChatContextProvider from "@/features/chat/context/chatContext";
import ChatRoom from "@/features/chat/ChatRoom";
import AxiosWrapper from "@/helpers/AxiosWrapper";
import RequireAuth from "@/features/auth/RequireAuth";
import PersistAuth from "@/features/auth/PersistAuth";

const routes = () => [
  {
    path: "/auth",
    element: <Login />,
  },
  {
    element: <PersistAuth />,
    children: [
      {
        element: (
          <AxiosWrapper>
            <RequireAuth />
          </AxiosWrapper>
        ),
        children: [
          {
            element: <Layout />,
            children: [
              {
                path: "/",
                element: (
                  <ChatContextProvider>
                    <Messenger />
                  </ChatContextProvider>
                ),
                children: [
                  {
                    path: "/:roomId",
                    element: <ChatRoom />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
