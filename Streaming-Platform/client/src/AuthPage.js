import React, { useState } from "react";

function AuthPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // handle registration form submission
  function handleRegister(event) {
    event.preventDefault();
    // sending registration data to the server
    fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Registration successful");
        }
      });
  }

  // handle login form submission
  function handleLogin(event) {
    event.preventDefault();
    // sending login data to the server
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Login successful"); 
        }
      });
  }

  // user authentication form (register and login)
  return (
    <div>
      <div className="AuthenticationTitle">
        <h1>Authentication</h1>
      </div>
      <div className="container">
        {/* registration form */}
        <div className="signupCard">
          <h2>Sign Up</h2>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* submit button for registration */}
            <button type="submit" className="registerBtn">
              Register
            </button>
          </form>
        </div>

        {/* login form */}
        <div className="loginCard">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="loginEmail">Email</label>
              <input
                type="email"
                className="form-control"
                id="loginEmail"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="loginPassword">Password</label>
              <input
                type="password"
                className="form-control"
                id="loginPassword"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* submit button for login */}
            <button type="submit" className="loginBtn">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
