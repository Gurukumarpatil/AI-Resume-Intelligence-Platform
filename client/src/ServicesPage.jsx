import "./ServicesPage.css";

function ServicesPage({ onSelectBuilder, onSelectAnalyzer, onBack }) {
  return (
    <div className="services-page">
      {/* Navbar */}
      <nav className="services-nav">
        <div className="nav-brand">
          <div className="brand-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="2" width="18" height="20" rx="3" fill="#2563eb" />
              <path d="M7 7h10M7 11h7M7 15h9" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <span>ResumeAI</span>
        </div>
        <button className="services-back-btn" onClick={onBack}>
          ← Back
        </button>
      </nav>

      {/* Main Content */}
      <div className="services-content">
        <div className="services-badge">🚀 Choose Your Tool</div>

        <h1 className="services-title">What would you like to do?</h1>
        <p className="services-subtitle">
          Select a tool below to get started. Build a polished resume or analyse
          an existing one with AI.
        </p>

        <div className="services-grid">
          {/* Resume Builder Card */}
          <div
            id="service-builder"
            className="service-card service-card--builder"
            onClick={onSelectBuilder}
          >
            <div className="service-icon service-icon--builder">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2563eb"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <path d="M7 8h10M7 12h6M7 16h8" />
              </svg>
            </div>
            <h3>Resume Builder</h3>
            <p>
              Create a professional, ATS-friendly resume with live preview,
              multiple templates, and one-click PDF export.
            </p>
            <span className="service-action service-action--builder">
              Start Building
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </div>

          {/* AI Resume Analyser Card */}
          <div
            id="service-analyser"
            className="service-card service-card--analyser"
            onClick={onSelectAnalyzer}
          >
            <div className="service-icon service-icon--analyser">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <path d="M11 8v6M8 11h6" />
              </svg>
            </div>
            <h3>AI Resume Analyser</h3>
            <p>
              Upload your resume and get instant AI-powered feedback on
              formatting, keywords, and overall strength.
            </p>
            <span className="service-action service-action--analyser">
              Analyze Resume
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <footer className="services-footer">
        <p>© 2026 ResumeAI · Built with ❤️ for job seekers everywhere</p>
      </footer>
    </div>
  );
}

export default ServicesPage;
