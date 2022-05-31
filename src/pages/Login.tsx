import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [change, setChange] = useState(true);

  const navigate = useNavigate();

  const handleSignIn = () => {
    fetch("http://localhost:8000/user/signin", {
      method: "POST",
      body: JSON.stringify({
        email: email,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          setError(json.error);
        } else {
          navigate(`/tasks/${json.user._id}`);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleSignUp = () => {
    fetch("http://localhost:8000/user/signup", {
      method: "POST",
      body: JSON.stringify({
        email: email,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          setError(json.error);
        } else {
          navigate(`/tasks/${json.newUser._id}`);
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      {change ? (
        <section className="login">
          <h1>Sign in with email</h1>
          <div>
            <input
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />
            <p>
              <i style={{ color: "red" }}>{error}</i>
            </p>
            <button onClick={handleSignIn}>Sign in</button>
            <br />
            <br />
            <i
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => setChange(!change)}
            >
              Click here to sign up
            </i>
          </div>
        </section>
      ) : (
        <section className="login">
          <h1>Sign up with email</h1>
          <div>
            <input
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />
            <p>
              <i style={{ color: "red" }}>{error}</i>
            </p>
            <button onClick={handleSignUp}>Sign up</button><br /><br />
            <i
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => setChange(!change)}
            >
              Already a user, click here to sign in
            </i>
          </div>
        </section>
      )}
    </>
  );
};

export default Login;
