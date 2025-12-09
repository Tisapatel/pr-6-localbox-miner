import React from "react";
import "./Page.css";

function Page({ user, handleChange, handleSubmit, validate, error, editId }) {
  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      return;
    }
    handleSubmit(e);
  };

  return (
    <div className="page">
      <div className="card">
        {/* LEFT */}
        <div className="left">
          <p className="small">START FOR FREE</p>

          <h1>{editId ? "EDIT ACCOUNT" : "CREATE NEW ACCOUNT"}</h1>

          <form className="form" onSubmit={onSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={user.username || ""}
              onChange={handleChange}
            />
            {error.username && <span className="error-text">{error.username}</span>}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={user.email || ""}
              onChange={handleChange}
            />
            {error.email && <span className="error-text">{error.email}</span>}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password || ""}
              onChange={handleChange}
            />
            {error.password && <span className="error-text">{error.password}</span>}

            <button type="submit">
              {editId ? "Update Account" : "Create Account"}
            </button>
          </form>
        </div>

        {/* RIGHT */}
        <div className="right">
          <img src="/character.png" alt="Character" />
        </div>
      </div>
    </div>
  );
}

export default Page;