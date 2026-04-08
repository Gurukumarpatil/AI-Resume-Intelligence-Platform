import { useState, useEffect } from "react";
import html2pdf from "html2pdf.js";
import GetStarted from "./GetStarted";
import ServicesPage from "./ServicesPage";
import TemplateSelect from "./TemplateSelect";
import "./App.css";

function App() {
  const [page, setPage] = useState("getStarted");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [skills, setSkills] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [projects, setProjects] = useState([{ name: "", description: "" }]);
  const [interests, setInterests] = useState("");
  const [template, setTemplate] = useState("classic");

  const [resumes, setResumes] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // FETCH DATA
  const fetchResumes = async () => {
    const res = await fetch("http://localhost:5000/resumes");
    const data = await res.json();
    setResumes(data);
  };

  useEffect(() => {
    if (page === "builder") {
      fetchResumes();
    }
  }, [page]);

  // SAVE / UPDATE
  const handleSave = async () => {
    const data = {
      name,
      email,
      phone,
      address,
      linkedin,
      skills: skills.split(","),
      education,
      experience,
      projects,
      interests,
    };

    if (editingId) {
      await fetch(`http://localhost:5000/update/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      alert("Updated");
      setEditingId(null);
    } else {
      await fetch("http://localhost:5000/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      alert("Saved");
    }

    fetchResumes();
  };

  // DELETE
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/delete/${id}`, {
      method: "DELETE",
    });
    fetchResumes();
  };

  // EDIT
  const handleEdit = (r) => {
    setName(r.name);
    setEmail(r.email);
    setPhone(r.phone || "");
    setAddress(r.address || "");
    setLinkedin(r.linkedin || "");
    setSkills(r.skills.join(","));
    setEducation(r.education || "");
    setExperience(r.experience || "");
    setProjects(r.projects && r.projects.length > 0 ? r.projects : [{ name: "", description: "" }]);
    setInterests(r.interests || "");
    setEditingId(r._id);
  };

  // PDF
  const downloadPDF = () => {
    const element = document.getElementById("resume");

    html2pdf().from(element).set({
      margin: 0.5,
      filename: "resume.pdf",
      html2canvas: { scale: 2, backgroundColor: "#fff" },
    }).save();
  };

  // TEMPLATES
  const ContactLine = () => {
    const parts = [
      email,
      phone,
      address,
    ].filter(Boolean);
    return parts.length > 0 ? (
      <p className="resume-contact-line">{parts.join(" • ")}</p>
    ) : null;
  };

  const LinkedInLine = ({ className }) => (
    linkedin ? <p className={className || "resume-linkedin"}>LinkedIn: {linkedin}</p> : null
  );

  const hasProjects = projects.some(p => p.name.trim() || p.description.trim());

  const addProject = () => {
    setProjects([...projects, { name: "", description: "" }]);
  };

  const removeProject = (index) => {
    if (projects.length <= 1) return;
    setProjects(projects.filter((_, i) => i !== index));
  };

  const updateProject = (index, field, value) => {
    const updated = projects.map((p, i) => i === index ? { ...p, [field]: value } : p);
    setProjects(updated);
  };

  const InterestsSection = ({ headingClass, className }) => (
    interests ? (
      <div className={className}>
        <h3 className={headingClass}>Other Interests</h3>
        <p>{interests}</p>
      </div>
    ) : null
  );

  const Classic = () => (
    <div className="classic-template">
      <h1>{name || "Your Name"}</h1>
      <ContactLine />
      <LinkedInLine />

      {skills && (
        <>
          <h3>Skills</h3>
          <ul>
            {skills.split(",").map((s, i) => (
              <li key={i}>{s.trim()}</li>
            ))}
          </ul>
        </>
      )}

      {education && (
        <>
          <h3>Education</h3>
          <p>{education}</p>
        </>
      )}

      {experience && (
        <>
          <h3>Experience</h3>
          <p>{experience}</p>
        </>
      )}

      {hasProjects && (
        <>
          <h3>Projects</h3>
          {projects.filter(p => p.name.trim() || p.description.trim()).map((p, i) => (
            <div key={i} className="resume-project-item">
              {p.name && <p className="resume-project-name">{p.name}</p>}
              {p.description && <p>{p.description}</p>}
            </div>
          ))}
        </>
      )}
      <InterestsSection />
    </div>
  );

  const Modern = () => (
    <div className="modern-template">
      <div className="modern-header">
        <h1>{name || "Your Name"}</h1>
        <p>{[email, phone].filter(Boolean).join(" | ")}</p>
        {address && <p>{address}</p>}
        {linkedin && <p>LinkedIn: {linkedin}</p>}
      </div>

      <div className="modern-body">
        {skills && <p><b>Skills:</b> {skills}</p>}
        {education && <p><b>Education:</b> {education}</p>}
        {experience && <p><b>Experience:</b> {experience}</p>}
        {hasProjects && projects.filter(p => p.name.trim() || p.description.trim()).map((p, i) => (
          <p key={i}><b>{p.name || "Project"}:</b> {p.description}</p>
        ))}
        {interests && <p><b>Other Interests:</b> {interests}</p>}
      </div>
    </div>
  );

  const Minimal = () => (
    <div className="minimal-template">
      <h1>{name || "Your Name"}</h1>
      <div className="minimal-divider" />
      <p className="minimal-email">{[email, phone].filter(Boolean).join(" • ")}</p>
      {address && <p className="minimal-email">{address}</p>}
      {linkedin && <p className="minimal-email">LinkedIn: {linkedin}</p>}

      {skills && (
        <div className="minimal-section">
          <h3>Skills</h3>
          <p>{skills}</p>
        </div>
      )}

      {education && (
        <div className="minimal-section">
          <h3>Education</h3>
          <p>{education}</p>
        </div>
      )}

      {experience && (
        <div className="minimal-section">
          <h3>Experience</h3>
          <p>{experience}</p>
        </div>
      )}

      {hasProjects && (
        <div className="minimal-section">
          <h3>Projects</h3>
          {projects.filter(p => p.name.trim() || p.description.trim()).map((p, i) => (
            <div key={i} className="resume-project-item">
              {p.name && <p><b>{p.name}</b></p>}
              {p.description && <p>{p.description}</p>}
            </div>
          ))}
        </div>
      )}

      {interests && (
        <div className="minimal-section">
          <h3>Other Interests</h3>
          <p>{interests}</p>
        </div>
      )}
    </div>
  );

  const Executive = () => (
    <div className="executive-template">
      <div className="exec-header">
        <h1>{name || "Your Name"}</h1>
        <p>{[email, phone].filter(Boolean).join(" | ")}</p>
        {address && <p>{address}</p>}
        {linkedin && <p>LinkedIn: {linkedin}</p>}
      </div>
      <div className="exec-body">
        {experience && (
          <div className="exec-section">
            <h3>Professional Experience</h3>
            <p>{experience}</p>
          </div>
        )}
        {education && (
          <div className="exec-section">
            <h3>Education</h3>
            <p>{education}</p>
          </div>
        )}
        {skills && (
          <div className="exec-section">
            <h3>Core Competencies</h3>
            <div className="exec-skills">
              {skills.split(",").map((s, i) => (
                <span key={i} className="exec-skill-tag">{s.trim()}</span>
              ))}
            </div>
          </div>
        )}
        {hasProjects && (
          <div className="exec-section">
            <h3>Key Projects</h3>
            {projects.filter(p => p.name.trim() || p.description.trim()).map((p, i) => (
              <div key={i} className="resume-project-item">
                {p.name && <p><b>{p.name}</b></p>}
                {p.description && <p>{p.description}</p>}
              </div>
            ))}
          </div>
        )}
        {interests && (
          <div className="exec-section">
            <h3>Other Interests</h3>
            <p>{interests}</p>
          </div>
        )}
      </div>
    </div>
  );

  const Creative = () => (
    <div className="creative-template">
      <div className="creative-sidebar">
        <div className="creative-avatar">{(name || "Y")[0]}</div>
        <h2>{name || "Your Name"}</h2>
        <p className="creative-email">{email}</p>
        {phone && <p className="creative-email">📞 {phone}</p>}
        {address && <p className="creative-email">📍 {address}</p>}
        {linkedin && <p className="creative-email">🔗 {linkedin}</p>}
        {skills && (
          <div className="creative-sidebar-section">
            <h4>Skills</h4>
            <ul>
              {skills.split(",").map((s, i) => (
                <li key={i}>{s.trim()}</li>
              ))}
            </ul>
          </div>
        )}
        {interests && (
          <div className="creative-sidebar-section">
            <h4>Interests</h4>
            <p className="creative-sidebar-text">{interests}</p>
          </div>
        )}
      </div>
      <div className="creative-main">
        {experience && (
          <div className="creative-section">
            <h3>Experience</h3>
            <p>{experience}</p>
          </div>
        )}
        {education && (
          <div className="creative-section">
            <h3>Education</h3>
            <p>{education}</p>
          </div>
        )}
        {hasProjects && (
          <div className="creative-section">
            <h3>Projects</h3>
            {projects.filter(p => p.name.trim() || p.description.trim()).map((p, i) => (
              <div key={i} className="resume-project-item">
                {p.name && <p><b>{p.name}</b></p>}
                {p.description && <p>{p.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const Professional = () => (
    <div className="professional-template">
      <div className="prof-sidebar">
        <div className="prof-avatar">{(name || "Y")[0]}</div>
        <div className="prof-contact">
          <h4>Contact</h4>
          <p>{email}</p>
          {phone && <p>{phone}</p>}
          {address && <p>{address}</p>}
          {linkedin && <p>{linkedin}</p>}
        </div>
        {skills && (
          <div className="prof-skills">
            <h4>Skills</h4>
            {skills.split(",").map((s, i) => (
              <div key={i} className="prof-skill-bar">
                <span>{s.trim()}</span>
                <div className="prof-bar"><div className="prof-bar-fill" /></div>
              </div>
            ))}
          </div>
        )}
        {interests && (
          <div className="prof-skills">
            <h4>Interests</h4>
            <p className="prof-sidebar-text">{interests}</p>
          </div>
        )}
      </div>
      <div className="prof-main">
        <h1>{name || "Your Name"}</h1>
        {experience && (
          <div className="prof-section">
            <h3>Experience</h3>
            <div className="prof-timeline">
              <div className="prof-timeline-dot" />
              <p>{experience}</p>
            </div>
          </div>
        )}
        {education && (
          <div className="prof-section">
            <h3>Education</h3>
            <div className="prof-timeline">
              <div className="prof-timeline-dot" />
              <p>{education}</p>
            </div>
          </div>
        )}
        {hasProjects && (
          <div className="prof-section">
            <h3>Projects</h3>
            {projects.filter(p => p.name.trim() || p.description.trim()).map((p, i) => (
              <div key={i} className="prof-timeline">
                <div className="prof-timeline-dot" />
                <div>
                  {p.name && <p><b>{p.name}</b></p>}
                  {p.description && <p>{p.description}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderTemplate = () => {
    switch (template) {
      case "modern": return <Modern />;
      case "minimal": return <Minimal />;
      case "executive": return <Executive />;
      case "creative": return <Creative />;
      case "professional": return <Professional />;
      default: return <Classic />;
    }
  };

  // ── Get Started Page ──
  if (page === "getStarted") {
    return <GetStarted onGetStarted={() => setPage("services")} />;
  }

  // ── Services Page ──
  if (page === "services") {
    return (
      <ServicesPage
        onSelectBuilder={() => setPage("templateSelect")}
        onBack={() => setPage("getStarted")}
      />
    );
  }

  // ── Template Selection Page ──
  if (page === "templateSelect") {
    return (
      <TemplateSelect
        onSelect={(tpl) => {
          setTemplate(tpl);
          setPage("builder");
        }}
        onBack={() => setPage("services")}
      />
    );
  }

  // ── Builder Page ──
  return (
    <div className="builder-page">
      {/* Navbar */}
      <nav className="builder-nav">
        <div className="nav-brand">
          <div className="brand-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="2" width="18" height="20" rx="3" fill="#2563eb" />
              <path d="M7 7h10M7 11h7M7 15h9" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <span>ResumeAI</span>
        </div>
        <button className="builder-back-btn" onClick={() => setPage("templateSelect")}>
          ← Back
        </button>
      </nav>

      <div className="builder-layout">
        {/* FORM */}
        <div className="builder-form">
          <h3>📝 Build Your Resume</h3>

          <div className="form-group">
            <label>Name</label>
            <input
              className="form-input"
              placeholder="John Doe"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              className="form-input"
              placeholder="john@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              className="form-input"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              className="form-input"
              placeholder="Bangalore, India"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>LinkedIn</label>
            <input
              className="form-input"
              placeholder="linkedin.com/in/johndoe"
              value={linkedin}
              onChange={e => setLinkedin(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Skills</label>
            <input
              className="form-input"
              placeholder="React, Node.js, Python"
              value={skills}
              onChange={e => setSkills(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Education</label>
            <input
              className="form-input"
              placeholder="B.Tech in Computer Science"
              value={education}
              onChange={e => setEducation(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Experience</label>
            <input
              className="form-input"
              placeholder="2 years at Google"
              value={experience}
              onChange={e => setExperience(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Projects</label>
            {projects.map((proj, i) => (
              <div key={i} className="project-entry">
                <div className="project-entry-header">
                  <span className="project-entry-num">#{i + 1}</span>
                  {projects.length > 1 && (
                    <button
                      type="button"
                      className="project-remove-btn"
                      onClick={() => removeProject(i)}
                      title="Remove project"
                    >×</button>
                  )}
                </div>
                <input
                  className="form-input"
                  placeholder="Project name"
                  value={proj.name}
                  onChange={e => updateProject(i, 'name', e.target.value)}
                />
                <textarea
                  className="form-input form-textarea"
                  placeholder="Brief description of the project"
                  value={proj.description}
                  onChange={e => updateProject(i, 'description', e.target.value)}
                  rows={2}
                />
              </div>
            ))}
            <button type="button" className="project-add-btn" onClick={addProject}>
              + Add Project
            </button>
          </div>

          <div className="form-group">
            <label>Other Interests</label>
            <input
              className="form-input"
              placeholder="Open source, Photography, Hiking"
              value={interests}
              onChange={e => setInterests(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Template</label>
            <div className="template-indicator">
              <span className="template-indicator-name">{template.charAt(0).toUpperCase() + template.slice(1)}</span>
              <button className="template-change-btn" onClick={() => setPage("templateSelect")}>Change</button>
            </div>
          </div>

          <div className="form-actions">
            <button className="btn-save" onClick={handleSave}>
              {editingId ? "Update" : "Save"} Resume
            </button>
            <button className="btn-pdf" onClick={downloadPDF}>
              📄 PDF
            </button>
          </div>
        </div>

        {/* PREVIEW */}
        <div className="builder-preview">
          <h3>Preview</h3>
          <div id="resume" className="resume-preview">
            {renderTemplate()}
          </div>
        </div>

        {/* SAVED LIST */}
        <div className="builder-saved">
          <h3>💾 Saved Resumes</h3>
          {resumes.length === 0 && (
            <p className="no-resumes">No saved resumes yet</p>
          )}
          {resumes.map(r => (
            <div key={r._id} className="saved-resume-item">
              <p className="saved-resume-name">{r.name}</p>
              <div className="saved-resume-actions">
                <button className="btn-edit" onClick={() => handleEdit(r)}>Edit</button>
                <button className="btn-delete" onClick={() => handleDelete(r._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;