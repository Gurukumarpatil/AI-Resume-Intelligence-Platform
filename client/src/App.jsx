import { useState } from "react";
import html2pdf from "html2pdf.js";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [template, setTemplate] = useState("classic");

  const handleSave = async () => {
    await fetch("http://localhost:5000/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        skills: skills.split(","),
        education,
        experience,
      }),
    });

    alert("Saved to DB");
  };

  const downloadPDF = () => {
    const element = document.getElementById("resume");

    const opt = {
      margin: 0.5,
      filename: "resume.pdf",
      html2canvas: { scale: 2, backgroundColor: "#ffffff" },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  // 🔥 TEMPLATE 1 - CLASSIC
  const ClassicTemplate = () => (
    <div>
      <h1>{name || "Your Name"}</h1>
      <p>{email}</p>

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
    </div>
  );

  // 🔥 TEMPLATE 2 - MODERN
  const ModernTemplate = () => (
    <div>
      <div style={{ background: "#222", color: "#fff", padding: "20px" }}>
        <h1>{name || "Your Name"}</h1>
        <p>{email}</p>
      </div>

      <div style={{ padding: "20px" }}>
        {skills && (
          <>
            <h3 style={{ color: "#333" }}>Skills</h3>
            <p>{skills}</p>
          </>
        )}

        {education && (
          <>
            <h3 style={{ color: "#333" }}>Education</h3>
            <p>{education}</p>
          </>
        )}

        {experience && (
          <>
            <h3 style={{ color: "#333" }}>Experience</h3>
            <p>{experience}</p>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", padding: "30px", gap: "30px" }}>
      
      {/* LEFT */}
      <div style={{ width: "35%" }}>
        <h2>Enter Details</h2>

        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <br /><br />

        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br /><br />

        <input placeholder="Skills" value={skills} onChange={(e) => setSkills(e.target.value)} />
        <br /><br />

        <input placeholder="Education" value={education} onChange={(e) => setEducation(e.target.value)} />
        <br /><br />

        <input placeholder="Experience" value={experience} onChange={(e) => setExperience(e.target.value)} />
        <br /><br />

        {/* TEMPLATE SELECT */}
        <h3>Select Template</h3>
        <select value={template} onChange={(e) => setTemplate(e.target.value)}>
          <option value="classic">Classic</option>
          <option value="modern">Modern</option>
        </select>

        <br /><br />

        <button onClick={handleSave}>Save</button>
        <br /><br />

        <button onClick={downloadPDF}>Download PDF</button>
      </div>

      {/* RIGHT */}
      <div
        id="resume"
        style={{
          width: "60%",
          border: "1px solid #ccc",
          background: "#fff",
          color: "#000",
        }}
      >
        {template === "classic" && <ClassicTemplate />}
        {template === "modern" && <ModernTemplate />}
      </div>
    </div>
  );
}

export default App;