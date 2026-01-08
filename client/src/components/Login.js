import React, { use, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  let emailref = useRef();
  let passwordref = useRef();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      validatedToken();
    }
  }, []);
  let validatedToken = async () => {
    let loginData = new FormData();
    loginData.append("token", localStorage.getItem("token"));

    let reqOptionss = {
      method: "post",
      body: loginData,
    };

    let JSONData = await fetch("/validate", reqOptionss);
    let JSOData = await JSONData.json();
    console.log(JSOData);
    alert(JSOData.msg);

    if (JSOData.status === "success") {
      dispatch({ type: "login", data: JSOData.data });
      navigate("/Dashboard");
    }
  };
  let sendingLogin = async () => {
    let loginData = new FormData();
    loginData.append("email", emailref.current.value);
    loginData.append("password", passwordref.current.value);

    let reqOptionss = {
      method: "post",
      body: loginData,
    };

    let JSONData = await fetch("/login", reqOptionss);
    let JSOData = await JSONData.json();
    console.log(JSOData);
    alert(JSOData.msg);

    if (JSOData.status === "success") {
      localStorage.setItem("token", JSOData.data.token);
      dispatch({ type: "login", data: JSOData.data });
      navigate("/Dashboard");
    }
  };
  return (
    <div>
      <form>
        <div>
          <label>email:</label>
          <input ref={emailref}></input>
        </div>
        <div>
          <label>password:</label>
          <input ref={passwordref}></input>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              sendingLogin();
            }}
          >
            submit
          </button>
        </div>
      </form>
      <br></br>
      <br></br>
      <p>New User? Please </p> <Link to="/Signup">Signup</Link>
    </div>
  );
}

export default Login;
