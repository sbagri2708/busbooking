import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Styles/login.module.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import { error, success } from "../Utils/notification";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function Signup() {
  const initialData = {
    fname: "",
    lname: "",
    email: "",
    password: "",
    gender: "",
    phonenumber: "",
    address: ""
  };
  const [signUpcreds, setsignUpcreds] = useState(initialData);
  const [showpassword, setshowpassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setsignUpcreds({
      ...signUpcreds,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      signUpcreds.fname === "" ||
      signUpcreds.lname === "" ||
      signUpcreds.phonenumber === "" ||
      signUpcreds.email === "" ||
      signUpcreds.password === "" ||
      signUpcreds.address === "" ||
      signUpcreds.gender === ""
    ) {
      error("Plaese Fill All The Details");
    } else {
      try {
        let response = await axios.post(
          "http://localhost:8080/user/signup",
          signUpcreds
        );
        console.log(response);
        if (response.data.status === "Failed") {
          error(response.data.message);
        } else {
          navigate("/signin");
          success(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <div className={styles.login}>
        <h1 className="h3 mb-3 fw-bold">Sign Up</h1>
        <div>
          <p style={{ textAlign: "left", marginBottom: "0px" }}>First Name</p>
          <input
            type="fname"
            className="form-control"
            placeholder="Enter First Name"
            name="fname"
            onChange={handleChange}
          />
        </div>
        <div>
          <p style={{ textAlign: "left", marginBottom: "0px" }}>Last Name</p>
          <input
            type="lname"
            className="form-control"
            placeholder="Enter Last Name"
            name="lname"
            onChange={handleChange}
          />
        </div>
        <div>
          <p style={{ textAlign: "left", marginBottom: "0px" }}>Email</p>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email address"
            name="email"
            onChange={handleChange}
          />
        </div>
        <p style={{ textAlign: "left", marginBottom: "0px" }}>Password</p>
        <div className="form-floating">
          <div className="input-group mb-3">
            <input
              type={showpassword ? "text" : "password"}
              className="form-control"
              placeholder="Enter Your Password"
              name="password"
              onChange={handleChange}
            />
            <span
              className="input-group-text"
              style={{ cursor: "pointer" }}
              onClick={() => setshowpassword(!showpassword)}
            >
              {showpassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </span>
          </div>
        </div>
        <div>
          <p style={{ textAlign: "left", marginBottom: "0px" }}>Phone Number</p>
          <input
            type="phonenumber"
            className="form-control"
            placeholder="Enter Phone Number"
            name="phonenumber"
            onChange={handleChange}
          />
        </div>
        <div>
          <p style={{ textAlign: "left", marginBottom: "0px" }}>Address</p>
          <input
            type="address"
            className="form-control"
            placeholder="Enter Address"
            name="address"
            onChange={handleChange}
          />
        </div>
        <p style={{ textAlign: "left", marginBottom: "0px" }}>Gender</p>
        <select
          name={"gender"}
          onChange={handleChange}
          class="form-select"
          aria-label="Default select example"
        >
          <option selected>Select Your Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        
        <button
          className="w-100 mt-3 btn btn-lg btn-primary"
          onClick={handleSubmit}
        >
          Sign up
        </button>
        <div style={{ textAlign: "center", marginTop: "15px" }}>
          <p>
            Already A User?{" "}
            <Link
              to={"/signin"}
              style={{
                paddingLeft: 8,
                textDecoration: "none",
              }}
            >
              SignIn
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
