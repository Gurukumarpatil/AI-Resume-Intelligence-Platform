import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    skills: "",
  });

  const handleSubmit = async () => {
    try {
      await fetch("http://localhost:5000/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          skills: form.skills.split(","),
        }),
      });

      alert("Saved!");
    } catch (error) {
      console.error(error);
      alert("Error saving data");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Resume Builder</h1>

      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <br />
      <br />

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <br />
      <br />

      <input
        placeholder="Skills (comma separated)"
        value={form.skills}
        onChange={(e) => setForm({ ...form, skills: e.target.value })}
      />
      <br />
      <br />

      <button onClick={handleSubmit}>Save</button>
    </div>
  );
}

export default App;
