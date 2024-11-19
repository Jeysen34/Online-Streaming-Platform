import React, { useState } from "react";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // handle form submission
  function handleForm(event) {
    event.preventDefault();
    // fetch request to server
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

  // user authentication form (login)
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleForm}>
        <div className="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            value={email}
          />
        </div>
        <div className="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            value={password}
          />
        </div>
        <button type="submit" className="loginBtn">
          Login
        </button>
      </form>
    </div>
  );
}

export default UserLogin;
