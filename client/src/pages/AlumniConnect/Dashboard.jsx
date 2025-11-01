import React, { useState } from "react";
import "./AlumniConnect";

const CompleteProfile = () => {
  const sections = [
    { id: "basic", name: "Basic Info" },
    { id: "language", name: "Language" },
    { id: "education", name: "Education" },
    { id: "internships", name: "Internships" },
    { id: "experience", name: "Experience" },
    { id: "skills", name: "Skills" },
    { id: "current", name: "Current Position" },
    { id: "contact", name: "Contact" },
  ];

  const [activeSection, setActiveSection] = useState("basic");
  // Skills state

  // --- Skill Management States ---
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState({ name: "", level: "Beginner" });

  // For editing existing skills
  const [editIndex, setEditIndex] = useState(null);
  const [editSkill, setEditSkill] = useState({ name: "", level: "Beginner" });

  // --- Handlers ---

  // Add a new skill
  const handleAddSkill = () => {
    if (!skillInput.name.trim()) return;
    setSkills([...skills, skillInput]);
    setSkillInput({ name: "", level: "Beginner" });
  };

  // Remove a skill
  const handleRemoveSkill = index => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  // Start editing a skill
  const handleEditSkill = index => {
    setEditIndex(index);
    setEditSkill(skills[index]);
  };

  // Save an edited skill
  const handleSaveSkill = index => {
    if (!editSkill.name.trim()) return;
    const updatedSkills = [...skills];
    updatedSkills[index] = editSkill;
    setSkills(updatedSkills);
    setEditIndex(null);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditSkill({ name: "", level: "Beginner" });
  };

  // --- Experience States ---
  const [experiences, setExperiences] = useState([]);
  const [experienceInput, setExperienceInput] = useState({
    company: "",
    role: "",
    duration: "",
    description: "",
  });

  // --- Handlers ---

  // Add new experience
  const handleAddExperience = () => {
    if (!experienceInput.company.trim() || !experienceInput.role.trim()) return;
    setExperiences([...experiences, experienceInput]);
    setExperienceInput({
      company: "",
      role: "",
      duration: "",
      description: "",
    });
  };

  // Remove experience
  const handleRemoveExperience = index => {
    const updatedExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(updatedExperiences);
  };

  // --- Education States ---
  const [education, setEducation] = useState([]);
  const [educationInput, setEducationInput] = useState({
    institution: "",
    degree: "",
    year: "",
    details: "",
  });

  // --- Handlers ---

  // Add education entry
  const handleAddEducation = () => {
    if (!educationInput.institution.trim() || !educationInput.degree.trim())
      return;
    setEducation([...education, educationInput]);
    setEducationInput({
      institution: "",
      degree: "",
      year: "",
      details: "",
    });
  };

  // Remove education entry
  const handleRemoveEducation = index => {
    const updatedEducation = education.filter((_, i) => i !== index);
    setEducation(updatedEducation);
  };

  // --- Internship States ---
  const [internships, setInternships] = useState([]);
  const [internshipInput, setInternshipInput] = useState({
    organization: "",
    role: "",
    duration: "",
    description: "",
  });

  // --- Handlers ---

  // Add internship
  const handleAddInternship = () => {
    if (!internshipInput.organization.trim() || !internshipInput.role.trim())
      return;
    setInternships([...internships, internshipInput]);
    setInternshipInput({
      organization: "",
      role: "",
      duration: "",
      description: "",
    });
  };

  // Remove internship
  const handleRemoveInternship = index => {
    const updatedInternships = internships.filter((_, i) => i !== index);
    setInternships(updatedInternships);
  };

  // --- Language States ---
  const [languages, setLanguages] = useState([]);
  const [languageInput, setLanguageInput] = useState({
    name: "",
    level: "Beginner",
  });

  // Edit states
  const [editLangIndex, setEditLangIndex] = useState(null);
  const [editLanguage, setEditLanguage] = useState({
    name: "",
    level: "Beginner",
  });

  // --- Handlers ---

  // Add a language
  const handleAddLanguage = () => {
    if (!languageInput.name.trim()) return;
    setLanguages([...languages, languageInput]);
    setLanguageInput({ name: "", level: "Beginner" });
  };

  // Remove a language
  const handleRemoveLanguage = index => {
    const updatedLanguages = languages.filter((_, i) => i !== index);
    setLanguages(updatedLanguages);
  };

  // Edit language
  const handleEditLanguage = index => {
    setEditLangIndex(index);
    setEditLanguage(languages[index]);
  };

  // Save edited language
  const handleSaveLanguage = index => {
    if (!editLanguage.name.trim()) return;
    const updatedLanguages = [...languages];
    updatedLanguages[index] = editLanguage;
    setLanguages(updatedLanguages);
    setEditLangIndex(null);
  };

  return (
    <div className="profile-wrapper">
      {/* ===== Sidebar ===== */}
      <aside className="sidebar">
        <h2 className="sidebar-title">Profile Sections</h2>
        <ul className="sidebar-list">
          {sections.map(sec => (
            <li
              key={sec.id}
              className={`sidebar-item ${
                activeSection === sec.id ? "active" : ""
              }`}
              onClick={() => setActiveSection(sec.id)}
            >
              {sec.name}
            </li>
          ))}
        </ul>
      </aside>

      {/* ===== Form Area ===== */}
      <div className="form-area">
        <h2 className="form-title">
          {sections.find(s => s.id === activeSection)?.name || ""}
        </h2>

        <form className="profile-form">
          {/* === BASIC INFO === */}
          {activeSection === "basic" && (
            <>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Enter your full name" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="Enter your email" />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input type="text" placeholder="Enter your phone number" />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input type="text" placeholder="City, Country" />
                </div>
              </div>
              <div className="form-group">
                <label>Bio</label>
                <textarea placeholder="Write a short bio..."></textarea>
              </div>
            </>
          )}

          {/* === LANGUAGE SECTION === */}
          {activeSection === "language" && (
            <>
              <div className="form-grid">
                <div className="form-group">
                  <label>Language</label>
                  <input
                    type="text"
                    placeholder="e.g. English, Hindi, Spanish"
                    value={languageInput.name}
                    onChange={e =>
                      setLanguageInput({
                        ...languageInput,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Proficiency</label>
                  <select
                    value={languageInput.level}
                    onChange={e =>
                      setLanguageInput({
                        ...languageInput,
                        level: e.target.value,
                      })
                    }
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>Fluent</option>
                    <option>Native</option>
                  </select>
                </div>
              </div>

              <div
                className="form-actions"
                style={{ justifyContent: "flex-start" }}
              >
                <button
                  className="add-skill-btn"
                  onClick={handleAddLanguage}
                  type="button"
                >
                  + Add Language
                </button>
              </div>

              {languages.length > 0 && (
                <div className="skills-list">
                  {languages.map((lang, index) => (
                    <div key={index} className="skill-item">
                      {editLangIndex === index ? (
                        <>
                          <input
                            type="text"
                            value={editLanguage.name}
                            onChange={e =>
                              setEditLanguage({
                                ...editLanguage,
                                name: e.target.value,
                              })
                            }
                            style={{ width: "45%", marginRight: "8px" }}
                          />
                          <select
                            value={editLanguage.level}
                            onChange={e =>
                              setEditLanguage({
                                ...editLanguage,
                                level: e.target.value,
                              })
                            }
                            style={{ width: "30%", marginRight: "8px" }}
                          >
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>
                            <option>Fluent</option>
                            <option>Native</option>
                          </select>
                          <button
                            className="save-skill"
                            type="button"
                            onClick={() => handleSaveLanguage(index)}
                          >
                            💾
                          </button>
                          <button
                            className="cancel-edit"
                            type="button"
                            onClick={() => setEditLangIndex(null)}
                          >
                            ✕
                          </button>
                        </>
                      ) : (
                        <>
                          <span>
                            {lang.name} — <em>{lang.level}</em>
                          </span>
                          <div>
                            <button
                              className="edit-skill"
                              onClick={() => handleEditLanguage(index)}
                              type="button"
                              style={{ marginRight: "8px" }}
                            >
                              ✎
                            </button>
                            <button
                              className="remove-skill"
                              onClick={() => handleRemoveLanguage(index)}
                              type="button"
                            >
                              ✕
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* === EDUCATION === */}
          {activeSection === "education" && (
            <>
              <div className="form-grid">
                <div className="form-group">
                  <label>Institution Name</label>
                  <input
                    type="text"
                    placeholder="e.g. IIT Delhi, Harvard University"
                    value={educationInput.institution}
                    onChange={e =>
                      setEducationInput({
                        ...educationInput,
                        institution: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Degree / Course</label>
                  <input
                    type="text"
                    placeholder="e.g. B.Tech in Computer Science"
                    value={educationInput.degree}
                    onChange={e =>
                      setEducationInput({
                        ...educationInput,
                        degree: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Year / Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 2020 - 2024"
                    value={educationInput.year}
                    onChange={e =>
                      setEducationInput({
                        ...educationInput,
                        year: e.target.value,
                      })
                    }
                  />
                </div>

                <div
                  className="form-group"
                  style={{ gridColumn: "1 / span 2" }}
                >
                  <label>Additional Details</label>
                  <textarea
                    placeholder="Achievements, GPA, Major projects, etc."
                    rows="3"
                    value={educationInput.details}
                    onChange={e =>
                      setEducationInput({
                        ...educationInput,
                        details: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
              </div>

              <div
                className="form-actions"
                style={{ justifyContent: "flex-start" }}
              >
                <button
                  className="add-skill-btn"
                  onClick={handleAddEducation}
                  type="button"
                >
                  + Add Education
                </button>
              </div>

              {education.length > 0 && (
                <div className="skills-list">
                  {education.map((edu, index) => (
                    <div key={index} className="skill-item">
                      <div>
                        <strong>{edu.degree}</strong> —{" "}
                        <span>{edu.institution}</span>
                        <br />
                        <small>{edu.year}</small>
                        <p style={{ marginTop: "5px", color: "#555" }}>
                          {edu.details}
                        </p>
                      </div>
                      <button
                        className="remove-skill"
                        onClick={() => handleRemoveEducation(index)}
                        type="button"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* === INTERNSHIPS === */}
          {activeSection === "internships" && (
            <>
              <div className="form-grid">
                <div className="form-group">
                  <label>Organization Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Microsoft, Deloitte"
                    value={internshipInput.organization}
                    onChange={e =>
                      setInternshipInput({
                        ...internshipInput,
                        organization: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Role / Position</label>
                  <input
                    type="text"
                    placeholder="e.g. Data Analyst Intern"
                    value={internshipInput.role}
                    onChange={e =>
                      setInternshipInput({
                        ...internshipInput,
                        role: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. June 2023 - Aug 2023"
                    value={internshipInput.duration}
                    onChange={e =>
                      setInternshipInput({
                        ...internshipInput,
                        duration: e.target.value,
                      })
                    }
                  />
                </div>

                <div
                  className="form-group"
                  style={{ gridColumn: "1 / span 2" }}
                >
                  <label>Description</label>
                  <textarea
                    placeholder="Describe your work, achievements or projects..."
                    rows="3"
                    value={internshipInput.description}
                    onChange={e =>
                      setInternshipInput({
                        ...internshipInput,
                        description: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
              </div>

              <div
                className="form-actions"
                style={{ justifyContent: "flex-start" }}
              >
                <button
                  className="add-skill-btn"
                  onClick={handleAddInternship}
                  type="button"
                >
                  + Add Internship
                </button>
              </div>

              {internships.length > 0 && (
                <div className="skills-list">
                  {internships.map((intern, index) => (
                    <div key={index} className="skill-item">
                      <div>
                        <strong>{intern.role}</strong> at{" "}
                        <span>{intern.organization}</span>
                        <br />
                        <small>{intern.duration}</small>
                        <p style={{ marginTop: "5px", color: "#555" }}>
                          {intern.description}
                        </p>
                      </div>
                      <button
                        className="remove-skill"
                        onClick={() => handleRemoveInternship(index)}
                        type="button"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* === EXPERIENCE === */}
          {activeSection === "experience" && (
            <>
              <div className="form-grid">
                <div className="form-group">
                  <label>Company</label>
                  <input
                    type="text"
                    placeholder="e.g. Google, Infosys"
                    value={experienceInput.company}
                    onChange={e =>
                      setExperienceInput({
                        ...experienceInput,
                        company: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Role / Position</label>
                  <input
                    type="text"
                    placeholder="e.g. Software Engineer"
                    value={experienceInput.role}
                    onChange={e =>
                      setExperienceInput({
                        ...experienceInput,
                        role: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. Jan 2023 - Dec 2024"
                    value={experienceInput.duration}
                    onChange={e =>
                      setExperienceInput({
                        ...experienceInput,
                        duration: e.target.value,
                      })
                    }
                  />
                </div>

                <div
                  className="form-group"
                  style={{ gridColumn: "1 / span 2" }}
                >
                  <label>Description</label>
                  <textarea
                    placeholder="Briefly describe your work or projects..."
                    rows="3"
                    value={experienceInput.description}
                    onChange={e =>
                      setExperienceInput({
                        ...experienceInput,
                        description: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
              </div>

              <div
                className="form-actions"
                style={{ justifyContent: "flex-start" }}
              >
                <button
                  className="add-skill-btn"
                  onClick={handleAddExperience}
                  type="button"
                >
                  + Add Experience
                </button>
              </div>

              {experiences.length > 0 && (
                <div className="skills-list">
                  {experiences.map((exp, index) => (
                    <div key={index} className="skill-item">
                      <div>
                        <strong>{exp.role}</strong> at{" "}
                        <span>{exp.company}</span>
                        <br />
                        <small>{exp.duration}</small>
                        <p style={{ marginTop: "5px", color: "#555" }}>
                          {exp.description}
                        </p>
                      </div>
                      <button
                        className="remove-skill"
                        onClick={() => handleRemoveExperience(index)}
                        type="button"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* === SKILLS === */}
          {activeSection === "skills" && (
            <>
              <div className="form-grid">
                <div className="form-group">
                  <label>Skill Name</label>
                  <input
                    type="text"
                    placeholder="e.g. ReactJS, Python"
                    value={skillInput.name}
                    onChange={e =>
                      setSkillInput({ ...skillInput, name: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Proficiency</label>
                  <select
                    value={skillInput.level}
                    onChange={e =>
                      setSkillInput({ ...skillInput, level: e.target.value })
                    }
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>Expert</option>
                  </select>
                </div>
              </div>

              <div
                className="form-actions"
                style={{ justifyContent: "flex-start" }}
              >
                <button
                  className="add-skill-btn"
                  onClick={handleAddSkill}
                  type="button"
                >
                  + Add Skill
                </button>
              </div>

              {skills.length > 0 && (
                <div className="skills-list">
                  {skills.map((skill, index) => (
                    <div key={index} className="skill-item">
                      {editIndex === index ? (
                        <>
                          <input
                            type="text"
                            value={editSkill.name}
                            onChange={e =>
                              setEditSkill({
                                ...editSkill,
                                name: e.target.value,
                              })
                            }
                            style={{ width: "45%", marginRight: "8px" }}
                          />
                          <select
                            value={editSkill.level}
                            onChange={e =>
                              setEditSkill({
                                ...editSkill,
                                level: e.target.value,
                              })
                            }
                            style={{ width: "30%", marginRight: "8px" }}
                          >
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>
                            <option>Expert</option>
                          </select>
                          <button
                            className="save-skill"
                            type="button"
                            onClick={() => handleSaveSkill(index)}
                          >
                            💾
                          </button>
                          <button
                            className="cancel-edit"
                            type="button"
                            onClick={() => setEditIndex(null)}
                          >
                            ✕
                          </button>
                        </>
                      ) : (
                        <>
                          <span>
                            {skill.name} — <em>{skill.level}</em>
                          </span>
                          <div>
                            <button
                              className="edit-skill"
                              onClick={() => handleEditSkill(index)}
                              type="button"
                              style={{ marginRight: "8px" }}
                            >
                              ✎
                            </button>
                            <button
                              className="remove-skill"
                              onClick={() => handleRemoveSkill(index)}
                              type="button"
                            >
                              ✕
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* === CURRENT POSITION === */}
          {activeSection === "current" && (
            <>
              <div className="form-grid">
                <div className="form-group">
                  <label>Company</label>
                  <input type="text" placeholder="Current company name" />
                </div>
                <div className="form-group">
                  <label>Role / Position</label>
                  <input type="text" placeholder="Your current role" />
                </div>
                <div className="form-group">
                  <label>Employment Type</label>
                  <select>
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Internship</option>
                    <option>Freelance</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Start Date</label>
                  <input type="month" />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input type="text" placeholder="City / Remote" />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea placeholder="Describe your current responsibilities..."></textarea>
              </div>
            </>
          )}

          {/* === CONTACT === */}
          {activeSection === "contact" && (
            <div className="form-grid">
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Enter contact email" />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input type="text" placeholder="Enter contact number" />
              </div>
              <div className="form-group">
                <label>LinkedIn / Portfolio</label>
                <input type="text" placeholder="Profile or website link" />
              </div>
            </div>
          )}

          <div className="form-actions">
            <button type="submit" className="save-btn">
              Save
            </button>
            <button type="reset" className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
