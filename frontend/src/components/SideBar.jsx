import React, { useState } from "react";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  return (
    <section className="jobboard-signup-section">
      <div className="jobboard-signup-card">
        <div className="jobboard-signup-header">
          <span className="jobboard-signup-badge">Create Account</span>
          <h1>Join JobBoard</h1>
          <p>
            Create your account to explore jobs, save opportunities, and track
            your applications.
          </p>
        </div>

        <form className="jobboard-signup-form">
          <div className="jobboard-form-row">
            <div className="jobboard-form-group">
              <label>First Name</label>
              <input type="text" placeholder="First name" />
            </div>

            <div className="jobboard-form-group">
              <label>Last Name</label>
              <input type="text" placeholder="Last name" />
            </div>
          </div>

          <div className="jobboard-form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>

          <div className="jobboard-form-group">
            <label>Password</label>
            <div className="jobboard-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
              />
              <button
                type="button"
                className="jobboard-password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="jobboard-checkbox">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={() => setAgreeTerms((prev) => !prev)}
            />
            <span>
              I agree to the <a href="/terms">Terms</a> and{" "}
              <a href="/privacy">Privacy Policy</a>
            </span>
          </div>

          <button type="submit" className="jobboard-primary-btn">
            Create Account
          </button>

          <div className="jobboard-divider">
            <span>or</span>
          </div>

          <div className="jobboard-social-login">
            <button className="jobboard-social-btn">
              <span>G</span>
              Continue with Google
            </button>

            <button className="jobboard-social-btn">
              <span>in</span>
              Continue with LinkedIn
            </button>
          </div>

          <p className="jobboard-login-text">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>

<style>{`

.jobboard-signup-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 20px;

  background:
  radial-gradient(circle at top left, rgba(37,99,235,0.12), transparent 30%),
  radial-gradient(circle at bottom right, rgba(99,102,241,0.12), transparent 30%),
  linear-gradient(135deg,#f8fafc,#eef4ff);
}

.jobboard-signup-card {
  width:100%;
  max-width:560px;
  background:rgba(255,255,255,0.92);
  backdrop-filter:blur(16px);
  border-radius:28px;
  padding:40px 32px;
  border:1px solid rgba(226,232,240,0.9);
  box-shadow:
  0 20px 60px rgba(15,23,42,0.08),
  0 8px 24px rgba(37,99,235,0.08);
}

.jobboard-signup-header h1{
  margin:0 0 10px;
  font-size:2.2rem;
}

.jobboard-signup-badge{
  background:rgba(37,99,235,0.1);
  color:#2563eb;
  padding:6px 14px;
  border-radius:999px;
  font-size:.85rem;
  font-weight:700;
}

.jobboard-form-row{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:16px;
}

.jobboard-form-group{
  display:flex;
  flex-direction:column;
  margin-bottom:16px;
}

.jobboard-form-group input{
  padding:12px 14px;
  border-radius:10px;
  border:1px solid #e2e8f0;
}

.jobboard-input-wrapper{
  position:relative;
}

.jobboard-password-toggle{
  position:absolute;
  right:12px;
  top:50%;
  transform:translateY(-50%);
  border:none;
  background:none;
  cursor:pointer;
}

.jobboard-primary-btn{
  width:100%;
  padding:12px;
  border:none;
  border-radius:10px;
  font-weight:700;
  background:linear-gradient(135deg,#2563eb,#1d4ed8);
  color:white;
  margin-top:10px;
}

.jobboard-divider{
  text-align:center;
  margin:20px 0;
  color:#94a3b8;
}

.jobboard-social-login{
  display:flex;
  flex-direction:column;
  gap:10px;
}

.jobboard-social-btn{
  border:1px solid #e2e8f0;
  border-radius:10px;
  padding:10px;
  background:white;
}

.jobboard-checkbox{
  display:flex;
  gap:10px;
  font-size:.9rem;
}

`}</style>
    </section>
  );
};

export default SignUp;