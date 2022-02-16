import React from "react";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const [formError, setFormError] = useState({});
  const [submit, setSubmit] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // info : client side validation logic of form
  const validate = (value) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!value.firstName || !value.lastName) {
      errors.name = "Name is required";
    }
    if (!value.email) {
      errors.email = "Email is required";
    } else if (!regex.test(value.email)) {
      errors.email = "Enter a valid email";
    }
    if (!value.password) {
      errors.password = "Password is required";
    } else if (value.password.length < 3) {
      errors.password = "Password must me longer than 3 characters";
    }
    return errors;
  };
  useEffect(() => {
    setFormError({});
    setFormError(validate(user));
  }, [user]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    // console.log(user);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { firstName, lastName, password, email } = user;
    setSubmit(true);
    if (Object.keys(formError).length === 0) {
      const res = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          password,
          email,
        }),
      });
      const data = await res;
      if (data.status === 422 || !data) {
        window.alert("Invalid registration");
      } else {
        window.alert("Registration success");
        // navigate("/login");
      }
    }
  };

  return (
    <>
      <div className="hero min-h-screen">
        <div className="flex-col justify-center hero-content lg:flex-row ">
          <div className="rounded-md shadow-2xl bg-base-100 bg-opacity-90">
            <div className="p-5">
              <div className="text-center">Sign up with google</div>
              <div className="divider">OR</div>
              <form method="post" onSubmit={handleRegister}>
                <div className="form-control flex flex-row">
                  <div className="w-full">
                    <label className="label" htmlFor="firstName">
                      <span className="label-text">First Name</span>
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      placeholder="First name"
                      className="input input-primary w-full"
                      name="firstName"
                      onChange={handleChange}
                      value={user.firstName}
                      autoComplete="false"
                      // required
                    />
                  </div>
                  <div className="ml-2 w-full">
                    <label className="label" htmlFor="lastName">
                      <span className="label-text">Last Name</span>
                    </label>
                    <input
                      type="text"
                      className="input input-primary w-full"
                      name="lastName"
                      onChange={handleChange}
                      placeholder="Last name"
                      value={user.lastName}
                      autoComplete="false"
                      // required
                    />
                  </div>
                </div>
                <p className="text-center text-red-500">
                  {submit ? formError.name : null}
                </p>
                {/* <div className="form-control">
                  <label className="label" htmlFor="phoneNumber">
                    <span className="label-text">Phone</span>
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Phone number"
                    onChange={handleChange}
                    className="input input-primary"
                    value={user.phoneNumber}
                    pattern="[0-9]{10}"
                    required
                  />
                </div> */}
                <div className="form-control">
                  <label className="label" htmlFor="email">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="input input-primary"
                    onChange={handleChange}
                    value={user.email}
                    autoComplete="false"
                    // required
                  />
                </div>
                <p className="text-center text-red-500">
                  {submit ? formError.email : null}
                </p>

                {/* <div className="form-control">
                  <label className="label" htmlFor="college">
                    <span className="label-text">College</span>
                  </label>
                  <input
                    type="text"
                    id="college"
                    name="college"
                    placeholder="College"
                    className="input input-primary"
                    onChange={handleChange}
                    value={user.college}
                  />
                </div> */}
                <div className="form-control">
                  <label className="label" htmlFor="password">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    className="input input-primary"
                    onChange={handleChange}
                    value={user.password}
                    // required
                  />
                </div>
                <p className="text-center text-red-500">
                  {submit ? formError.password : null}
                </p>
                {/* <div className="form-control">
                  <label className="label" htmlFor="password">
                    <span className="label-text">Confirm password</span>
                  </label>
                  <input
                    type="text"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Password"
                    className="input input-primary"
                  />
                </div> */}
                <div className="form-control mt-6">
                  <button
                    type="submit"
                    className="btn btn-secondary w-full"
                    // disabled={disabled}
                  >
                    Register
                  </button>
                  {/* {!user.firstName ||
                  !user.lastName ||
                  !user.email ||
                  !user.phoneNumber ||
                  !user.password ? (
                    <button type="submit" className="btn btn-secondary w-full">
                      Register
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-secondary w-full">
                      Register
                    </button>
                  )} */}
                </div>
                <p className="text-neutral">
                  Already have an account ?
                  <Link to="/login">
                    <span className="text-primary"> Login </span>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
