import React, { useState } from "react";
import "./styles.css";

const emailPattern = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,3}$/;

const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [fieldTouched, setFieldTouched] = useState({
    email: false,
    password: false,
  });
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);

  const emailValid = emailPattern.test(email);
  const passwordValid = passwordPattern.test(password);

  const emailRules = [
    { label: "Contains @", ok: /@/.test(email) },
    { label: "Contains dot", ok: /\./.test(email) },
    { label: "Valid format", ok: emailValid },
  ];

  const passwordRules = [
    { label: "8+ characters", ok: /.{8,}/.test(password) },
    { label: "Uppercase (A-Z)", ok: /[A-Z]/.test(password) },
    { label: "Lowercase (a-z)", ok: /[a-z]/.test(password) },
    { label: "Number (0-9)", ok: /[0-9]/.test(password) },
    { label: "Symbol (@$!%*?&)", ok: /[@$!%*?&]/.test(password) },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setFieldTouched({ email: true, password: true });

    if (emailValid && passwordValid) {
      setIsLoginSuccessful(true);
    }
  };

  const handleReset = () => {
    setIsLoginSuccessful(false);
    setEmail("");
    setPassword("");
    setFieldTouched({ email: false, password: false });
  };

  // ===== SUCCESS SCREEN =====
  if (isLoginSuccessful) {
    return (
      <div className="success-page">
        <div className="success-box">
          <div className="success-icon">✈️</div>
          <h2>Login Successful!</h2>
          <p>Welcome to Travelista Tours 🌍</p>
          <button onClick={handleReset}>← Back to Login</button>
        </div>
      </div>
    );
  }

  // ===== REUSABLE RULE COMPONENT =====
  const RuleItem = ({ label, ok }) => (
    <div className={ok ? "rule rule-ok" : "rule rule-no"}>
      <span className={ok ? "dot dot-ok" : "dot dot-no"}>{ok ? "✓" : "✗"}</span>
      {label}
    </div>
  );

  return (
    <div className="page">
      {/* LEFT SIDE */}
      <div className="left">
        <div className="left-content">
          <h1 className="brand">✈️ Travelista Tours</h1>
          <p className="tagline">✦ YOUR JOURNEY AWAITS</p>
          <h2 className="quote">
            Travel is the only purchase
            <br />
            that enriches you in ways
            <br />
            beyond material wealth.
          </h2>
          <div className="divider-line" />
          <p className="desc">
            Discover breathtaking destinations,
            <br />
            curated experiences, and memories
            <br />
            that last a lifetime.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="right">
        <div className="card">
          <h2 className="card-title">Welcome Back</h2>
          <p className="card-sub">Login with your email and password</p>

          <form onSubmit={handleSubmit} noValidate>
            {/* EMAIL */}
            <div className="field">
              <label>Email Address</label>
              <div className="input-wrap">
                <input
                  className={`input ${
                    fieldTouched.email && email
                      ? emailValid
                        ? "ok"
                        : "err"
                      : ""
                  }`}
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() =>
                    setFieldTouched((t) => ({
                      ...t,
                      email: true,
                    }))
                  }
                />
              </div>

              {fieldTouched.email && email && (
                <div className="rules">
                  {emailRules.map((rule) => (
                    <RuleItem
                      key={rule.label}
                      label={rule.label}
                      ok={rule.ok}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* PASSWORD */}
            <div className="field">
              <label>Password</label>
              <div className="input-wrap">
                <input
                  className={`input ${
                    fieldTouched.password && password
                      ? passwordValid
                        ? "ok"
                        : "err"
                      : ""
                  }`}
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() =>
                    setFieldTouched((t) => ({
                      ...t,
                      password: true,
                    }))
                  }
                />

                <button
                  type="button"
                  className="eye"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? "🙈" : "👁️"}
                </button>
              </div>

              {fieldTouched.password && password && (
                <div className="rules">
                  {passwordRules.map((rule) => (
                    <RuleItem
                      key={rule.label}
                      label={rule.label}
                      ok={rule.ok}
                    />
                  ))}

                  <p
                    className={
                      passwordValid ? "result result-ok" : "result result-no"
                    }
                  >
                    {passwordValid
                      ? "✅ Strong password!"
                      : "❌ Password too weak"}
                  </p>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={!(emailValid && passwordValid)}
            >
              LOGIN
            </button>
          </form>

          <p className="register">
            Don't have an account? <span>Register Now</span>
          </p>
        </div>
      </div>
    </div>
  );
}
