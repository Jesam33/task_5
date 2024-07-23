
import formImage from "/assets/images/form-image.png";
import google from "/assets/icons/google.svg";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../redux-features/authSlice";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth.status);
  const errorState = useSelector((state) => state.auth.error);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(signup({ email: values.email, password: values.password }));
    },
  });

  useEffect(() => {
    if (authState === "succeeded") {
      toast.success("Sign up success");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else if (authState === "failed") {
      toast.error("Provide valid details");
    }
  }, [authState, navigate]);

  return (
    <div className="main-form">
      <div className="main-form__image">
        <img src={formImage} alt="Form" />
      </div>
      <div className="main-form__form">
        <ToastContainer />
        <form onSubmit={formik.handleSubmit}>
          <div className="main-form__form--headers">
            <h1>Create an account</h1>
            <p>Enter your details below</p>
          </div>
          <div className="main-form__form--input">
            <input
              id="name"
              type="text"
              placeholder="Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="errors">{formik.errors.name}</div>
            ) : null}
            <input
              id="email"
              type="text"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="errors">{formik.errors.email}</div>
            ) : null}
            <input
              id="password"
              type="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="errors">{formik.errors.password}</div>
            ) : null}
            {authState === "failed" && errorState ? (
              <div className="errors">{errorState}</div>
            ) : null}
            <input
              type="submit"
              value={authState === "loading" ? "Loading..." : "Create Account"}
            />
            <button type="button">
              <img src={google} alt="Google" />
              <span>Sign Up with Google</span>
            </button>
          </div>
          <p>
            Already have account?{" "}
            <Link to="/login" className="form-link">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
