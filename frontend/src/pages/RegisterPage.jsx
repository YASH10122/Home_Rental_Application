// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "../styles/Register.scss";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.confirmPassword ||
        formData.confirmPassword === ""
    );
  }, [formData.confirmPassword, formData.password]);

   console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData));

    try {
      const register_form = new FormData();

      for (let i in FormData) {
        register_form.append(i, formData[i]);
      }

      const response = await fetch("http://localhost:4546/auth/register", {
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        navigate("/login");
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            required
          />
          <input
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleChange}
            type="password"
            required
          />

          {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords are not matched!</p>
          )}

          <button type="submit">REGISTER</button>
        </form>
        <a href="/login">Already have an account? Log In Here</a>
      </div>
    </div>
  );
}

export default RegisterPage;
