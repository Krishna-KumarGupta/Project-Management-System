import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { Button } from "@/components/ui/button";
import "./Auth.css";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(true);

  return (
    <div className="loginContainer">
      <div className="box h-[30rem] w-[25rem]">
        <div className="minContainer login py-5">
          <div className="loginBox w-full px-10 space-y-5">
            {isSignup ? <Signup /> : <Login />}

            <div className="mt-6 text-center">
              <span className="text-sm text-gray-400">
                {isSignup ? "Already have an account? " : "Don't have an account?"}
              </span>
              <Button 
                variant="ghost" 
                className="ml-2 px-2 py-1 text-sm transition-all duration-200 
                                        text-white rounded-full 
                                        hover:bg-white hover:text-black"
                onClick={() => setIsSignup(!isSignup)}
              >
                {isSignup ? "Sign in" : "Sign up"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
