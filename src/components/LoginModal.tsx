import React from "react";
import { TransactionModal } from "./TransactionalModel";

function LoginModal({ isLoggedIn, onClick}) {
  return (
    <TransactionModal show={!isLoggedIn} showLoading={false}>
      <div>
        <h1 className="text-3xl text-center font-extrabold">
          Please Login to Continue 🔒
        </h1>
        {/* <p className="text-gray-600">
            Please wait while your AI is being created...
          </p> */}
        <button
          onClick={onClick}
          className="mt-5 relative flex h-9 w-full items-center justify-center px-8 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
        >
          <span className="relative text-sm font-semibold text-white">
            {isLoggedIn ? "Log Out" : "Log In"}
          </span>
        </button>
      </div>
    </TransactionModal>
  );
}

export default LoginModal;
