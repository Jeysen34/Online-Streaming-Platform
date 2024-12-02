import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const Navigate = useNavigate();

  // handle form submission
  function handleForm(event) {
    event.preventDefault();
    // fetch request to server
    fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          Navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // user authentication form (register)
  return (
    <div>
      <div className="signupCard">
        <div className="signupcard-header">
          <h2>Sign Up</h2>
        </div>
        <form onSubmit={handleForm}>
          <div className="form-group">
            <label for="name">Name</label>
            <input
              type="name"
              className="form-control"
              id="name"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              required
              value={name}
            />
          </div>
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

          <button type="submit" className="registerBtn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserRegister;
