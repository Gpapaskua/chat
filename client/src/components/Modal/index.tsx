import React, { ReactNode } from "react";
import { GrClose } from "react-icons/gr";

interface IModalProps {
  open: boolean;
  title?: string | ReactNode;
  children?: string | ReactNode;
  onClose?: () => void;
}

export default function Modal({ open, title, onClose, children }: IModalProps) {
  if (!open) {
    return null;
  }
  return (
    <>
      <div
        role="presentation"
        onClick={onClose}
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto bg-dark/50 fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div
          role="dialog"
          onClick={(e) => e.stopPropagation()}
          className="relative w-full my-6 mx-auto max-w-[700px]"
        >
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-3 border-b border-solid border-gray rounded-t">
              {title ? (
                <div className="text-lg font-semibold">{title}</div>
              ) : null}
              <button
                onClick={onClose}
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              >
                {/* <span className="bg-transparent text-black opacity-1 h-6 w-6 text-2xl block outline-none focus:outline-none">
                </span> */}
                <GrClose className="text-black text-lg" />
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">{children}</div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
