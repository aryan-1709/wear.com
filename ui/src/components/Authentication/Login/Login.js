import React, { useState, useEffect, useContext } from "react";
import basestyle from "../Base.module.css";
import loginstyle from "./Login.module.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { UserContext } from "../../../Contexts/userContext";

const path = process.env.REACT_APP_SERVER_URL;
// const path = process.env.REACT_APP_LOCALHOST;

const Login = () => {
  const { setuserInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };
  const validateForm = (values) => {
    const error = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "Please enter a valid email address";
    }
    if (!values.password) {
      error.password = "Password is required";
    }
    return error;
  };

  const loginHandler = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      try {
        axios.post(`${path}/user/login`, user).then((res) => {
          alert(res.data.msg);
          if(res.data.state === 1){
            setuserInfo(res.data.user);
            navigate("/", { replace: true });
          }
          else if(res.data.state === 3){
            navigate("/signup");
          }else{
            setIsSubmit(false);
            setUserDetails({
              email:user.email,
              password: "",
            });
            setFormErrors({});
          }
        });
      } catch (error) {
        navigate("/serverError");
      }
    }
  }, [formErrors, isSubmit, navigate, setuserInfo, user]);
  return (
    <div className={`${loginstyle.login} w-full`}>
      <div>
        <strong className="underline"> Dummy email id:</strong><div className="inline-block"> dummy@xyz.com</div>
        <br></br>
        <strong className="underline"> Dummy passoword:</strong><div className="inline-block"> 123abc</div>
      </div>
      <form>
        <di className="font-extrabold text-[25px]">Login</di>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={changeHandler}
          value={user.email}
        />
        <p className={basestyle.error}>{formErrors.email}</p>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={changeHandler}
          value={user.password}
        />
        <p className={basestyle.error}>{formErrors.password}</p>
        <button className={basestyle.button_common} onClick={loginHandler}>
          Login
        </button>
      </form>
      <NavLink to="/signup">Not yet registered? Register Now</NavLink>
    </div>
  );
};
export default Login;
