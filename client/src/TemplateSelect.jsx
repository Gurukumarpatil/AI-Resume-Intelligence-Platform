import "./TemplateSelect.css";
import resumeSapphire from "./assets/resume_sapphire.png";
import resumeAmber from "./assets/resume_amber.png";
import resumeGarnet from "./assets/resume_garnet.png";
import resumeExecutive from "./assets/resume_executive.png";
import resumeCreative from "./assets/resume_creative.png";
import resumeProfessional from "./assets/resume_professional.png";

const templates = [
  {
    id: "classic",
    name: "Classic",
    description: "Clean and professional — perfect for traditional industries like finance, law, and education.",
    image: resumeSapphire,
    tags: ["Professional", "ATS-Friendly"],
  },
  {
    id: "modern",
    name: "Modern",
    description: "Bold header with a contemporary layout — ideal for tech, startups, and creative roles.",
    image: resumeAmber,
    tags: ["Creative", "Eye-catching"],
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and elegant with generous white space — great for any industry.",
    image: resumeGarnet,
    tags: ["Simple", "Elegant"],
  },
  {
    id: "executive",
    name: "Executive",
    description: "Authoritative dark header with structured sections — built for senior leadership and management roles.",
    image: resumeExecutive,
    tags: ["Leadership", "Formal"],
  },
  {
    id: "creative",
    name: "Creative",
    description: "Two-column layout with a vibrant sidebar — designed for designers, marketers, and artists.",
    image: resumeCreative,
    tags: ["Artistic", "Two-Column"],
  },
  {
    id: "professional",
    name: "Professional",
    description: "Balanced two-column design with skill bars and timeline — ideal for experienced professionals.",
    image: resumeProfessional,
    tags: ["Structured", "Detailed"],
  },
];

function TemplateSelect({ onSelect, onBack }) {
  return (
    <div className="template-select-page">
      {/* Navbar */}
      <nav className="ts-nav">
        <div className="nav-brand">
          <div className="brand-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="2" width="18" height="20" rx="3" fill="#2563eb" />
              <path d="M7 7h10M7 11h7M7 15h9" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <span>ResumeAI</span>
        </div>
        <button className="ts-back-btn" onClick={onBack}>
          ← Back
        </button>
      </nav>

      {/* Header */}
      <div className="ts-header">
        <span className="ts-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
          </svg>
          Step 1 of 2
        </span>
        <h1 className="ts-title">Choose your template</h1>
        <p className="ts-subtitle">
          Pick a design that fits your style. You can always switch later.
        </p>
      </div>

      {/* Template Cards */}
      <div className="ts-grid">
        {templates.map((tpl, index) => (
          <div
            key={tpl.id}
            className="ts-card"
            style={{ animationDelay: `${index * 0.08}s` }}
            onClick={() => onSelect(tpl.id)}
          >
            {/* Preview Image */}
            <div className="ts-card-preview">
              <img src={tpl.image} alt={`${tpl.name} template preview`} />
              <div className="ts-card-overlay">
                <button className="ts-use-btn">
                  Use This Template
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Card Info */}
            <div className="ts-card-info">
              <h3>{tpl.name}</h3>
              <p>{tpl.description}</p>
              <div className="ts-tags">
                {tpl.tags.map((tag) => (
                  <span key={tag} className="ts-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TemplateSelect;
