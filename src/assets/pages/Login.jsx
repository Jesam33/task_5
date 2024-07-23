import formImage from "/assets/images/form-image.png";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux-features/authSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authState = useSelector((state) => state.auth.status);

  const errorState = useSelector((state) => state.auth.error);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required"),
      email: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      // setSuccess("");
      dispatch(login({ email: values.email, password: values.password }));
    },
  });

  const loginBtn = () => {
    if (authState === "succeeded") {
      // setSuccess("User Authorized. Redirecting to Cart Page ...");
      toast.success("User Authorized");
      setTimeout(() => {
        navigate("/");
      }, 3000)
    }else if (authState === "failed") {
      toast.error("Provide valid details");
    }
  };
  // useEffect(() => {

  // }, [authState, navigate]);

  return (
    <div className="main-form">
      <div className="main-form__image">
        <img src={formImage} role="presentation" />
      </div>
      <div className="main-form__form">
      <ToastContainer />
        <form onSubmit={formik.handleSubmit}>
          <div className="main-form__form--headers">
            <h1>Log in to Exclusive</h1>
            <p>Enter your details below</p>
            {/* {success == "" ? null : <p className="success">{success}</p>} */}
          </div>
          <div className="main-form__form--input">
            <input
              id="email"
              type="text"
              placeholder="Email or Phone Number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {/* {formik.touched.email && formik.errors.email ? (
              <div className="errors">{formik.errors.email}</div>
            ) : null} */}
            {/* {authState === "failed" ? (
              <div className="errors">{errorState.slice(22, -2)}</div>
            ) : null} */}
            <input
              id="password"
              type="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {/* {formik.touched.password && formik.errors.password ? (
              <div className="errors">{formik.errors.password}</div>
            ) : null} */}
            {/* {authState === "failed" ? (
              <div className="errors">{errorState.slice(22, -2)}</div>
            ) : null} */}
            
            <div className="main-form__form--footer">
              {/* <input
                type="submit"
                value={authState !== "succeeded" ? "Log In" : "Loading..."}
              /> */}
              <input
              type="submit"
                onClick={loginBtn}
                value="Log In"
                style={{
                  border: "none",
                  borderRadius: "4px",
                  background: '#E07575',
                  color: "#F5F5F5",
                  // padding: "16px 122px",
                  // fontFamily: "utils.$web-font",
                  cursor: "pointer",
                }}
              />
              <p>Forget Password ?</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
