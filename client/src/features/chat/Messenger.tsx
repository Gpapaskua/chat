// import { filledInput, largeInputClasses } from "../styles/input";
import { Outlet } from "react-router-dom";
import ChatActions from "./components/ChatActions";
import Input from "@/components/Input";
import Conversations from "./components/Conversations";

export default function Messenger() {
  return (
    <div className="flex justify-center mt-4">
      <div className="w-full mx-12 min-h-[calc(100vh-6rem)] bg-transparent">
        <div className="flex gap-8 h-[calc(100vh-8rem)]">
          <div className="w-80 shrink-0 flex flex-col gap-8 items-stretch">
            <div className="h-14 flex flex-col gap-6">
              <form>
                <Input
                  variant="rounded"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="SEARCH"
                />
              </form>
            </div>
            <div className="w-full py-6 bg-white shadow-sm rounded-3xl h-full">
              <Conversations />
            </div>
          </div>
          <div className="grow flex flex-col gap-8 items-stretch">
            <ChatActions />
            <div className="w-full flex flex-col justify-between bg-white shadow-sm rounded-3xl h-full px-2 pb-2">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
