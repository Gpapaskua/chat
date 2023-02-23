import { Outlet } from "react-router-dom";
import Header from "./Header";

const PageWrapper = () => {
  return (
    <div className="w-full min-h-screen bg-gray">
      <Header />
      <Outlet />
    </div>
  );
};

export default PageWrapper;
