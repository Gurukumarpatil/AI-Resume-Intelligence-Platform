import { useState, useEffect, useRef } from "react";
import "./AnalyzerPage.css";

/* ── Animated Counter Hook ── */
function useCountUp(target, duration = 1200, active = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) { setValue(0); return; }
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setValue(target); clearInterval(timer); }
      else setValue(Math.round(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, active, duration]);
  return value;
}

/* ── Grade Color Mapping ── */
function gradeColor(grade) {
  if (!grade) return "#94a3b8";
  const g = grade.toUpperCase();
  if (g.startsWith("A")) return "#10b981";
  if (g.startsWith("B")) return "#06b6d4";
  if (g.startsWith("C")) return "#f59e0b";
  return "#ef4444";
}

function scoreColor(score) {
  if (score >= 80) return "#10b981";
  if (score >= 60) return "#06b6d4";
  if (score >= 40) return "#f59e0b";
  return "#ef4444";
}

/* ── Category Label Map ── */
const categoryLabels = {
  keyword_match: { label: "Keyword Match", icon: "🔑" },
  formatting: { label: "Formatting", icon: "📐" },
  content_quality: { label: "Content Quality", icon: "✍️" },
  impact_metrics: { label: "Impact & Metrics", icon: "📊" },
  ats_readability: { label: "ATS Readability", icon: "🤖" },
};

/* ── Section Label Map ── */
const sectionLabels = {
  contact_info: "Contact Information",
  summary_objective: "Summary / Objective",
  experience: "Work Experience",
  education: "Education",
  skills: "Skills",
  projects: "Projects",
  certifications: "Certifications",
};

/* ── Score Ring Component ── */
function ScoreRing({ score, grade, active }) {
  const displayScore = useCountUp(score, 1400, active);
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (circumference * displayScore) / 100;
  const color = scoreColor(score);

  return (
    <div className="score-ring-wrapper">
      <svg className="score-ring-svg" viewBox="0 0 120 120">
        <circle className="score-ring-bg" cx="60" cy="60" r="54" />
        <circle
          className="score-ring-fill"
          cx="60" cy="60" r="54"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: active ? offset : circumference,
            stroke: color,
          }}
        />
      </svg>
      <div className="score-ring-center">
        <span className="score-ring-number">{displayScore}</span>
        <span className="score-ring-label">/ 100</span>
      </div>
      {grade && (
        <div className="score-grade-badge" style={{ background: gradeColor(grade) }}>
          {grade}
        </div>
      )}
    </div>
  );
}

/* ── Category Bar Component ── */
function CategoryBar({ label, icon, score, delay, active }) {
  const displayScore = useCountUp(score, 1000, active);
  const color = scoreColor(score);

  return (
    <div className="cat-bar" style={{ animationDelay: `${delay}ms` }}>
      <div className="cat-bar-header">
        <span className="cat-bar-icon">{icon}</span>
        <span className="cat-bar-label">{label}</span>
        <span className="cat-bar-score" style={{ color }}>{displayScore}%</span>
      </div>
      <div className="cat-bar-track">
        <div
          className="cat-bar-fill"
          style={{
            width: active ? `${score}%` : "0%",
            background: color,
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   AnalyzerPage Component
   ══════════════════════════════════════ */
function AnalyzerPage({ onBack }) {
  const [activeTab, setActiveTab] = useState("upload");
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [jobDesc, setJobDesc] = useState("");

  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");
  const [resultsVisible, setResultsVisible] = useState(false);

  const resultsRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError("");
    }
  };

  const clearFile = () => setFile(null);

  const handleAnalyze = async () => {
    setError("");
    setAnalysis(null);
    setResultsVisible(false);

    if (activeTab === "upload" && !file) {
      setError("Please upload a PDF file.");
      return;
    }
    if (activeTab === "text" && !resumeText.trim()) {
      setError("Please paste your resume text.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      if (jobDesc) formData.append("jobDesc", jobDesc);

      if (activeTab === "upload") {
        formData.append("resume", file);
      } else {
        formData.append("resumeText", resumeText);
      }

      const response = await fetch("http://localhost:5000/api/analyze/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze resume");
      }

      setAnalysis(data);
      // Trigger animations after a short delay
      setTimeout(() => setResultsVisible(true), 100);
      // Scroll to results on mobile
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    } catch (err) {
      console.error(err);
      setError(err.message || "An unexpected error occurred. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysis(null);
    setResultsVisible(false);
    setError("");
  };

  /* ── Drag and Drop Handlers ── */
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
        setError("");
      } else {
        setError("Please upload a PDF file only.");
      }
    }
  };

  return (
    <div className="analyzer-page">
      {/* Decorative Blobs */}
      <div className="analyzer-blob analyzer-blob--1" />
      <div className="analyzer-blob analyzer-blob--2" />

      {/* ── Navbar ── */}
      <nav className="analyzer-nav">
        <div className="nav-brand">
          <div className="brand-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="#06b6d4" strokeWidth="2" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span>ResumeAI</span>
          <span className="nav-badge">Analyzer</span>
        </div>
        <button className="analyzer-back-btn" onClick={onBack}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </nav>

      {/* ── Main ── */}
      <main className="analyzer-main">
        <header className="analyzer-header">
          <div className="analyzer-header-badge">
            <span className="badge-pulse" />
            Powered by Google Gemini AI
          </div>
          <h1>Resume <span className="header-accent">Intelligence</span></h1>
          <p>Get an instant ATS score and tailored AI feedback to beat the bots.</p>
        </header>

        <div className="analyzer-container">
          {/* ════════ LEFT: Input Panel ════════ */}
          <div className="analyzer-input-panel">

            {/* Tabs */}
            <div className="analyzer-tabs">
              <button
                className={`tab-btn ${activeTab === "upload" ? "active" : ""}`}
                onClick={() => setActiveTab("upload")}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Upload PDF
              </button>
              <button
                className={`tab-btn ${activeTab === "text" ? "active" : ""}`}
                onClick={() => setActiveTab("text")}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
                Paste Text
              </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              {activeTab === "upload" && (
                <div
                  className={`upload-zone ${dragActive ? "upload-zone--drag" : ""}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {!file ? (
                    <>
                      <div className="upload-icon-wrap">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="17 8 12 3 7 8" />
                          <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                      </div>
                      <p className="upload-title">Drag & drop your resume PDF</p>
                      <span className="upload-sub">or click to browse files</span>
                      <input type="file" accept=".pdf" onChange={handleFileChange} />
                    </>
                  ) : (
                    <div className="file-selected">
                      <div className="file-info">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                        <div>
                          <span className="file-name">{file.name}</span>
                          <span className="file-size">{(file.size / 1024).toFixed(1)} KB</span>
                        </div>
                      </div>
                      <button className="file-remove" onClick={clearFile} title="Remove file">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "text" && (
                <div className="text-input-wrap">
                  <textarea
                    className="analyzer-textarea"
                    placeholder="Paste your entire resume text here..."
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    rows={10}
                  />
                  {resumeText && (
                    <span className="char-count">{resumeText.length.toLocaleString()} characters</span>
                  )}
                </div>
              )}
            </div>

            {/* Job Description */}
            <div className="job-desc-section">
              <div className="job-desc-label-row">
                <label>Job Description</label>
                <span className="optional-badge">Optional</span>
              </div>
              <p className="job-desc-hint">
                Paste the target job posting for highly targeted, role-specific feedback.
              </p>
              <textarea
                className="analyzer-textarea"
                placeholder="Paste the job requirements here..."
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                rows={5}
              />
            </div>

            {/* Error */}
            {error && (
              <div className="analyzer-error">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              className="analyzer-submit-btn"
              onClick={handleAnalyze}
              disabled={loading}
            >
              {loading ? (
                <span className="loading-content">
                  <span className="spinner" />
                  Analyzing with Gemini AI...
                </span>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  Analyze Resume
                </>
              )}
            </button>
          </div>

          {/* ════════ RIGHT: Results Panel ════════ */}
          <div className="analyzer-results-panel" ref={resultsRef}>
            {!analysis && !loading && (
              <div className="results-placeholder">
                <div className="placeholder-visual">
                  <div className="placeholder-ring" />
                  <div className="placeholder-ring placeholder-ring--2" />
                  <div className="placeholder-ring placeholder-ring--3" />
                  <span className="placeholder-icon">🔍</span>
                </div>
                <h3>Awaiting Analysis</h3>
                <p>Upload or paste your resume and click analyze to see your AI-powered ATS score and feedback.</p>
              </div>
            )}

            {loading && (
              <div className="results-loading">
                <div className="loading-visual">
                  <div className="loader-ring" />
                  <span className="loader-text-icon">🤖</span>
                </div>
                <h3>Gemini AI is analyzing...</h3>
                <p>Scanning keywords, formatting, and content quality</p>
                <div className="loading-steps">
                  <div className="load-step load-step--1">Parsing resume content...</div>
                  <div className="load-step load-step--2">Evaluating ATS compatibility...</div>
                  <div className="load-step load-step--3">Generating recommendations...</div>
                </div>
              </div>
            )}

            {analysis && !loading && (
              <div className={`results-content ${resultsVisible ? "results-content--visible" : ""}`}>

                {/* ── Overall Score ── */}
                <div className="result-section score-section">
                  <ScoreRing
                    score={analysis.score ?? 0}
                    grade={analysis.grade}
                    active={resultsVisible}
                  />
                  <div className="score-info">
                    <h2>ATS Match Score</h2>
                    {analysis.summary && <p className="score-summary">{analysis.summary}</p>}
                  </div>
                </div>

                {/* ── Category Breakdown ── */}
                {analysis.category_scores && (
                  <div className="result-section">
                    <h3 className="section-heading">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="20" x2="18" y2="10" />
                        <line x1="12" y1="20" x2="12" y2="4" />
                        <line x1="6" y1="20" x2="6" y2="14" />
                      </svg>
                      Score Breakdown
                    </h3>
                    <div className="cat-bars-container">
                      {Object.entries(analysis.category_scores).map(([key, val], i) => {
                        const info = categoryLabels[key] || { label: key, icon: "📌" };
                        return (
                          <CategoryBar
                            key={key}
                            label={info.label}
                            icon={info.icon}
                            score={val}
                            delay={i * 150}
                            active={resultsVisible}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ── Section Checklist ── */}
                {analysis.section_analysis && (
                  <div className="result-section">
                    <h3 className="section-heading">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      Section Analysis
                    </h3>
                    <div className="section-checklist">
                      {Object.entries(analysis.section_analysis).map(([key, val]) => (
                        <div key={key} className={`checklist-item ${val.found ? "checklist-item--found" : "checklist-item--missing"}`}>
                          <div className="checklist-status">
                            {val.found ? (
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            ) : (
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                              </svg>
                            )}
                          </div>
                          <div className="checklist-info">
                            <span className="checklist-name">{sectionLabels[key] || key}</span>
                            {val.feedback && <span className="checklist-feedback">{val.feedback}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Strengths ── */}
                {analysis.strengths && analysis.strengths.length > 0 && (
                  <div className="result-section">
                    <h3 className="section-heading section-heading--green">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
                        <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                      </svg>
                      Strengths
                    </h3>
                    <div className="strengths-list">
                      {analysis.strengths.map((s, i) => (
                        <div key={i} className="strength-item">
                          <span className="strength-icon">✅</span>
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Missing Keywords ── */}
                {analysis.missing_keywords && analysis.missing_keywords.length > 0 && (
                  <div className="result-section">
                    <h3 className="section-heading section-heading--red">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                      </svg>
                      Missing Keywords
                    </h3>
                    <p className="section-desc">Include these terms to improve your ATS match rate.</p>
                    <div className="keywords-grid">
                      {analysis.missing_keywords.map((kw, i) => {
                        if (typeof kw === "object" && kw !== null) {
                          const imp = (kw.importance || "medium").toLowerCase();
                          return (
                            <div key={i} className={`keyword-card importance-${imp}`}>
                              <div className="keyword-header">
                                <span className="keyword-name">{kw.keyword}</span>
                                <span className={`keyword-badge kbd-${imp}`}>{kw.importance}</span>
                              </div>
                              {kw.context && <p className="keyword-context">{kw.context}</p>}
                            </div>
                          );
                        }
                        return <span key={i} className="keyword-tag">{kw}</span>;
                      })}
                    </div>
                  </div>
                )}

                {/* ── Suggestions ── */}
                {analysis.suggestions && analysis.suggestions.length > 0 && (
                  <div className="result-section">
                    <h3 className="section-heading section-heading--cyan">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12.01" y2="8" />
                      </svg>
                      AI Suggestions
                    </h3>
                    <div className="suggestions-list">
                      {analysis.suggestions.map((s, i) => {
                        if (typeof s === "object" && s !== null) {
                          const typeClass = s.type === "critical" ? "sug-critical" : s.type === "tip" ? "sug-tip" : "sug-improvement";
                          const typeIcon = s.type === "critical" ? "🔴" : s.type === "tip" ? "💡" : "🟡";
                          return (
                            <div key={i} className={`suggestion-card ${typeClass}`}>
                              <div className="sug-header">
                                <span className="sug-icon">{typeIcon}</span>
                                <span className="sug-title">{s.title}</span>
                                <span className={`sug-type-badge ${typeClass}`}>{s.type}</span>
                              </div>
                              <p className="sug-detail">{s.detail}</p>
                            </div>
                          );
                        }
                        return (
                          <div key={i} className="suggestion-card sug-improvement">
                            <div className="sug-header">
                              <span className="sug-icon">💡</span>
                              <span className="sug-title">{typeof s === 'object' ? Object.values(s).join(': ') : s}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ── Analyze Again ── */}
                <button className="analyze-again-btn" onClick={handleReset}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 4 23 10 17 10" />
                    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                  </svg>
                  Analyze Another Resume
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="analyzer-footer">
        <p>© 2026 ResumeAI · Powered by Google Gemini AI · Built with ❤️ for job seekers</p>
      </footer>
    </div>
  );
}

export default AnalyzerPage;
