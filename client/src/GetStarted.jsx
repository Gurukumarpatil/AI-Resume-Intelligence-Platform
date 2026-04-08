import "./GetStarted.css";
import heroIllustration from "./assets/hero_illustration.png";

function GetStarted({ onGetStarted }) {
  return (
    <div className="landing">
      {/* Floating cloud shapes */}
      <div className="cloud cloud--1" />
      <div className="cloud cloud--2" />
      <div className="cloud cloud--3" />

      {/* Navbar */}
      <nav className="landing-nav">
        <div className="nav-brand">
          <div className="brand-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="2" width="18" height="20" rx="3" fill="#2563eb" />
              <path d="M7 7h10M7 11h7M7 15h9" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <span>ResumeAI</span>
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#about">About</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            AI-Powered Resume Platform
          </div>

          <h1 className="hero-title">
            Build your perfect
            <br />
            <span className="hero-title-accent">resume</span> in minutes
          </h1>

          <p className="hero-description">
            Create stunning, ATS-friendly resumes that stand out. Our intelligent
            platform helps you craft professional resumes with beautiful templates,
            real-time preview, and instant PDF export — all completely free.
          </p>

          <button className="hero-cta" id="get-started-btn" onClick={onGetStarted}>
            Get Started
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          <div className="hero-trust">
            <div className="hero-trust-avatars">
              <div className="trust-avatar trust-avatar--1">JD</div>
              <div className="trust-avatar trust-avatar--2">AK</div>
              <div className="trust-avatar trust-avatar--3">RM</div>
              <div className="trust-avatar trust-avatar--4">+</div>
            </div>
            <span className="hero-trust-text">Trusted by <strong>10,000+</strong> job seekers</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-illustration-wrapper">
            <img src={heroIllustration} alt="Resume illustration" className="hero-illustration" />
            {/* Floating badges */}
            <div className="floating-badge floating-badge--ats">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              ATS Friendly
            </div>
            <div className="floating-badge floating-badge--pdf">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              PDF Export
            </div>
            <div className="floating-badge floating-badge--template">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
              Templates
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="features-inner">
          <div className="section-header">
            <span className="section-badge">Features</span>
            <h2 className="section-title">Focus on you.<br />We'll handle the rest.</h2>
            <p className="section-subtitle">
              Everything you need to create a professional resume that gets you noticed.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrap feature-icon--blue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                  <path d="M7 8h10M7 12h6M7 16h8" />
                </svg>
              </div>
              <h3>Multiple Templates</h3>
              <p>Choose from professionally designed templates tailored for any industry and role.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrap feature-icon--cyan">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3>Live Preview</h3>
              <p>See every change reflected instantly with our real-time resume preview editor.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrap feature-icon--amber">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>
              <h3>One-Click PDF</h3>
              <p>Export pixel-perfect, print-ready PDFs with a single click. No formatting issues.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrap feature-icon--green">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3>ATS Optimized</h3>
              <p>Every resume is optimized for Applicant Tracking Systems with a 95% pass rate.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About / Stats Section */}
      <section id="about" className="about-section">
        <div className="about-inner">
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Resumes Created</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">95%</span>
              <span className="stat-label">ATS Pass Rate</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">2 min</span>
              <span className="stat-label">Avg. Build Time</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">100%</span>
              <span className="stat-label">Free Forever</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="nav-brand">
              <div className="brand-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="2" width="18" height="20" rx="3" fill="#2563eb" />
                  <path d="M7 7h10M7 11h7M7 15h9" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
              <span>ResumeAI</span>
            </div>
            <p className="footer-tagline">Build resumes that get you hired.</p>
          </div>
          <p className="footer-copy">© 2026 ResumeAI · Built with ❤️ for job seekers everywhere</p>
        </div>
      </footer>
    </div>
  );
}

export default GetStarted;
