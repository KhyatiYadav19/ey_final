import React, { useState } from 'react';
import axios from 'axios';

export default function InputForm({ setIsOpen }) {
    const [username, setUsername] = useState(""); // New state for username
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState("");

    const handleOnSubmit = async (e) => {
        e.preventDefault(); // Prevents page reload
        setError(""); // Clear previous errors

        let endpoint = isSignUp ? "register" : "login";
        let requestData = isSignUp 
            ? { username, email, password }  // Include username in sign-up
            : { email, password };           // Login only needs email & password

        try {
            const res = await axios.post(`http://localhost:5000/${endpoint}`, requestData);

            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));

                if (setIsOpen) setIsOpen(false); // Close modal if function exists
            }
        } catch (error) {
            console.error("Login/Register Error:", error);
            setError(error.response?.data?.error || "Something went wrong");
        }
    };

    return (
        <div>
            <form className="form" onSubmit={handleOnSubmit}>
                {isSignUp && ( // Show username field only during sign-up
                    <div className="form-control">
                        <label>Username</label>
                        <input
                            type="text"
                            className="input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                )}
                <div className="form-control">
                    <label>Email</label>
                    <input
                        type="email"
                        className="input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-control">
                    <label>Password</label>
                    <input
                        type="password"
                        className="input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>
                <br />
                {error && <h6 className="error">{error}</h6>}
                <br />
                <p onClick={() => setIsSignUp((prev) => !prev)} style={{ cursor: "pointer", color: "blue" }}>
                    {isSignUp ? "Already have an account? Login" : "Create New Account"}
                </p>
            </form>
        </div>
    );
}
