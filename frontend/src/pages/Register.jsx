import axios from "axios";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const name = nameRef.current.value;
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/auth/register`,
        { name, email, password }
      );
      toast("User register successfully!");
      return navigate("/login");
      //   if (result.data.token) {
      //     localStorage.setItem("token", result.data.token);
      //   }
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
              type="name"
              name="name"
              id="name"
              placeholder="Name"
              ref={nameRef}
            />
          </div>
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
              Register
            </button>
          </div>
        </form>
        <div className="text-center">
          Already have a account? <Link to={"/login"}>Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
