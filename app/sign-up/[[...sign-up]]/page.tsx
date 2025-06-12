import React from "react";
import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div
      style={{ background: "linear-gradient(to bottom, #0a68ff, #0a68ff)" }}
      className="flex justify-center items-center flex-col gap-10 w-full h-screen"
    >
      <SignUp />
    </div>
  );
};

export default SignUpPage;
