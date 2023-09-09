import axios from "axios";
import { useRef } from "react";
import { toast } from "react-toastify";
import { Link, redirect, useNavigate } from "react-router-dom";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/auth/login`,
        { email, password }
      );

      if (result.data.token) {
        localStorage.setItem("token", result.data.token);
        return navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast(error.response.data.msg);
    }
  };
  return (
    <div
      className="flex items-center justify-center h-screen"
      style={
        {
          // backgroundColor: "red",
        }
      }
    >
      <div className="">
        <form
          onSubmit={handleSubmit}
          className="bg-slate-500 p-10 rounded-lg flex flex-col justify-center items-center gap-5"
        >
          <div>
            <input
              className="rounded-sm p-2 outline-none"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              ref={emailRef}
            />
          </div>
          <div>
            <input
              className="rounded-sm p-2 outline-none"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              ref={passwordRef}
            />
          </div>

          <div>
            <button
              className="bg-amber-300 p-1 px-5 rounded-full "
              type="submit"
            >
              Login
            </button>
          </div>
        </form>

        <div className="text-center">
          Not a member? <Link to={"/register"}>Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
