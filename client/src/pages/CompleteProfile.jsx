import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Select,
  MenuItem,
  Paper,
  Stack,
  LinearProgress,
  Grid,
} from "@mui/material";

export default function CompleteProfile() {
  const [step, setStep] = useState("personal");
  const [progress, setProgress] = useState(0);
  const [form, setForm] = useState({
    fullName: "",
    headline: "",
    bio: "",
    location: "",
    photo: null,
    languages: [],
    education: [],
    experience: [],
    internships: [],
    projects: [],
    skills: [],
    current: { company: "", title: "", start: "", type: "On-site" },
    contact: { email: "", phone: "", links: "" },
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    updateProgress({ ...form, [name]: value });
  };

  const updateProgress = data => {
    let score = 0;
    if (data.fullName) score += 8;
    if (data.headline) score += 6;
    if (data.bio) score += 6;
    if (data.location) score += 6;
    if (data.photo) score += 5;
    if (data.languages.length) score += 10;
    if (data.education.length) score += 10;
    if (data.experience.length) score += 15;
    if (data.internships.length) score += 5;
    if (data.projects.length) score += 10;
    if (data.skills.length) score += 10;
    if (data.current.company) score += 6;
    if (data.contact.email) score += 4;
    if (score > 100) score = 100;
    setProgress(score);
  };

  const addItem = (key, item) => {
    const newForm = { ...form, [key]: [...form[key], item] };
    setForm(newForm);
    updateProgress(newForm);
  };

  const removeItem = (key, index) => {
    const updated = form[key].filter((_, i) => i !== index);
    const newForm = { ...form, [key]: updated };
    setForm(newForm);
    updateProgress(newForm);
  };

  const sections = [
    "personal",
    "languages",
    "education",
    "experience",
    "internships",
    "projects",
    "skills",
    "current",
    "contact",
  ];

  const renderSection = () => {
    switch (step) {
      case "personal":
        return (
          <Stack spacing={3} alignItems="center" width="100%">
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Headline"
              name="headline"
              value={form.headline}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Short Bio"
              name="bio"
              value={form.bio}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={form.location}
              onChange={handleChange}
            />

            <Button variant="outlined" component="label">
              Upload Photo
              <input
                hidden
                type="file"
                onChange={e => {
                  const f = e.target.files[0];
                  const newForm = { ...form, photo: f ? f.name : null };
                  setForm(newForm);
                  updateProgress(newForm);
                }}
              />
            </Button>

            {form.photo && (
              <Typography variant="body2" color="text.secondary">
                Uploaded: {form.photo}
              </Typography>
            )}
          </Stack>
        );

      case "languages":
        return (
          <Stack spacing={3} alignItems="center" width="100%">
            <TextField id="langName" label="Language" sx={{ width: "60%" }} />
            <Select
              id="langLevel"
              defaultValue="Beginner"
              sx={{ width: "60%" }}
            >
              <MenuItem value="Beginner">Beginner</MenuItem>
              <MenuItem value="Intermediate">Intermediate</MenuItem>
              <MenuItem value="Fluent">Fluent</MenuItem>
              <MenuItem value="Native">Native</MenuItem>
            </Select>
            <Button
              variant="contained"
              onClick={() => {
                const name = document.getElementById("langName").value;
                const level = document.getElementById("langLevel").value;
                if (name) addItem("languages", { name, level });
                document.getElementById("langName").value = "";
              }}
            >
              Add
            </Button>

            <Stack spacing={1} mt={2} width="60%">
              {form.languages.map((l, i) => (
                <Paper
                  key={i}
                  sx={{
                    p: 1.5,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  variant="outlined"
                >
                  <Typography>
                    {l.name} — {l.level}
                  </Typography>
                  <Button
                    variant="text"
                    color="error"
                    size="small"
                    onClick={() => removeItem("languages", i)}
                  >
                    ✕
                  </Button>
                </Paper>
              ))}
            </Stack>
          </Stack>
        );

      case "education":
        return (
          <Stack spacing={3} alignItems="center" width="100%">
            <TextField
              id="eduTitle"
              label="Degree / Course"
              sx={{ width: "60%" }}
            />
            <TextField id="eduInst" label="Institution" sx={{ width: "60%" }} />
            <Button
              variant="contained"
              onClick={() => {
                const title = document.getElementById("eduTitle").value;
                const inst = document.getElementById("eduInst").value;
                if (title && inst) addItem("education", { title, inst });
                document.getElementById("eduTitle").value = "";
                document.getElementById("eduInst").value = "";
              }}
            >
              Add
            </Button>

            <Stack spacing={1} mt={2} width="60%">
              {form.education.map((e, i) => (
                <Paper
                  key={i}
                  sx={{
                    p: 1.5,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  variant="outlined"
                >
                  <Typography>
                    {e.title} — {e.inst}
                  </Typography>
                  <Button
                    variant="text"
                    color="error"
                    size="small"
                    onClick={() => removeItem("education", i)}
                  >
                    ✕
                  </Button>
                </Paper>
              ))}
            </Stack>
          </Stack>
        );

      case "skills":
        return (
          <Stack spacing={3} alignItems="center" width="100%">
            <Stack direction="row" spacing={2} sx={{ width: "60%" }}>
              <TextField id="skillName" label="Skill Name" fullWidth />
              <Select
                id="skillLevel"
                defaultValue="Beginner"
                sx={{ width: 150 }}
              >
                <MenuItem value="Beginner">Beginner</MenuItem>
                <MenuItem value="Intermediate">Intermediate</MenuItem>
                <MenuItem value="Expert">Expert</MenuItem>
              </Select>
              <Button
                variant="contained"
                onClick={() => {
                  const name = document.getElementById("skillName").value;
                  const level = document.getElementById("skillLevel").value;
                  if (name) addItem("skills", { name, level });
                  document.getElementById("skillName").value = "";
                }}
              >
                Add
              </Button>
            </Stack>

            <Stack
              direction="row"
              flexWrap="wrap"
              gap={1.5}
              mt={2}
              sx={{ width: "60%" }}
            >
              {form.skills.map((s, i) => (
                <Paper
                  key={i}
                  variant="outlined"
                  sx={{
                    px: 2,
                    py: 0.5,
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Typography variant="body2">
                    {s.name} ({s.level})
                  </Typography>
                  <Button
                    variant="text"
                    color="error"
                    size="small"
                    onClick={() => removeItem("skills", i)}
                  >
                    ✕
                  </Button>
                </Paper>
              ))}
            </Stack>
          </Stack>
        );

      default:
        return <Typography align="center">Section coming soon...</Typography>;
    }
  };

  return <div>CompleteProfile</div>;
}
