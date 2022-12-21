import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginHandlerData } from "../../service/auth.service";
import "./Login.css";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const validation = () => {
    let formisValid = true;
    if (!email) {
      setEmailError("Please enter email");
      formisValid = false;
    } else {
      setEmailError("");
    }
    if (!password) {
      setPasswordError("Please enter password");
      formisValid = false;
    } else {
      setPasswordError("");
    }
    return formisValid;
  };
  const handleSubmit = (e) => {


    if (validation()) {
      postData(e);
      setEmail("");
      setPassword("");
      // console.log("email", email);
      // console.log("password", password);
    }
    e.preventDefault();
  };

  const postData = async (event) => {
    event.preventDefault();
    const body = {
      userId: email,
      password,
    };
    const response = await loginHandlerData(body); // eslint-disable-next-line
    console.log("response", response)
    if (response) {
      localStorage.setItem("accessToken", response?.token);
      localStorage.setItem("role", response?.role);
      localStorage.setItem("userData", JSON.stringify(response));
      navigate("/dashboard");
    } else {
      console.log("err")
    }
  };

  return (
    <section
      className="vh-100 bg-image"
      style={{
        backgroundImage:
          "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
      }}
    >
      <div className="overlay"></div>
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div
              className="col-12 col-md-9 col-lg-7 col-xl-6"
            // style={{ width: "40%", height: "648px" }}
            >
              <form onSubmit={(e) => {
                handleSubmit(e);
              }}
                method="post">
                <div className="card" style={{ borderRadius: "15px" }}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">Login</h2>
                    <label for="exampleInputEmail1">Email</label>
                    <div className="form-outline">
                      <input
                        type="email"
                        id="form3Example3cg"
                        placeholder="Enter email"
                        className="form-control form-control-lg"
                        value={email}
                        onChange={(e) => [
                          setEmail(e.target.value),
                          setEmailError(""),
                        ]}
                      />
                    </div>
                    <div className="errorstyle">{emailError}</div><br />
                    <label for="exampleInputEmail1">Password </label>
                    <div className="form-outline ">
                      <input
                        type="password"
                        id="form3Example4cg"
                        placeholder="Enter password"
                        className="form-control form-control-lg"
                        value={password}
                        onChange={(e) => [
                          setPassword(e.target.value),
                          setPasswordError(""),
                        ]}
                      />
                    </div>
                    <div className="errorstyle">{passwordError}</div>
                    <div className="d-flex justify-content-center mt-3">
                      <button
                        type="submit"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                      >
                        Login
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div >
    </section >
  );
};

export default Login;
