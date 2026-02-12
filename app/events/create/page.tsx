"use client";

import { useState } from "react";

export default function CreateEventForm() {
  const [loading, setLoading] = useState(false);

  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const [agendaInput, setAgendaInput] = useState("");
  const [agenda, setAgenda] = useState<string[]>([]);

  const addTag = () => {
    if (!tagInput.trim()) return;
    setTags([...tags, tagInput.trim()]);
    setTagInput("");
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const addAgendaItem = () => {
    if (!agendaInput.trim()) return;
    setAgenda([...agenda, agendaInput.trim()]);
    setAgendaInput("");
  };

  const removeAgendaItem = (index: number) => {
    setAgenda(agenda.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    formData.set("tags", JSON.stringify(tags));
    formData.set("agenda", JSON.stringify(agenda));

    try {
      const res = await fetch("/api/event", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      console.log("Created:", data);
      form.reset();
      setTags([]);
      setAgenda([]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="event-form">
      <div className="form-header">
      <h2>Create Event</h2>
      <p>Fill in the details to publish your event.</p>
    </div>


      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <div className="main-column">
          <div className="field grid">
            <label>Title</label>
            <input name="title" placeholder="Title" required />
          </div>

          <div className="field">
            <label>Description</label>
            <textarea name="description" placeholder="Description" required />
          </div>

          <div className="field">
            <label>Overview</label>
            <textarea name="overview" placeholder="Overview" required />
          </div>

          <div className="field">
            <label>Venue</label>
            <input name="venue" placeholder="Venue" required />
          </div>
          
          <div className="field">
            <label>Location</label>
            <input name="location" placeholder="Location" required />
          </div>

          <div className="field">
            <label>Date</label>
            <input name="date" type="date" required />
          </div>
          
          <div className="field">
            <label>Time</label>
            <input name="time" type="time" required />
          </div>

          <div className="field">
            <select name="mode" required>
              <option value="">Select mode</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          <div className="field">
            <label>Audience</label>
            <input name="audience" placeholder="Audience" required />
          </div>

          <div className="field">
            <label>Organizer info</label>
            <textarea name="organizer" placeholder="Organizer info" required />
          </div>
        </div>

        <div className="side-column">
          <div className="dynamic-field" >
            <div className="input-group">
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add tag"
              />
              <button type="button" onClick={addTag}>
                Add
              </button>
            </div>

            <div className="items">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="item"
                  onClick={() => removeTag(i)}
                >
                  {tag} ✕
                </span>
              ))}
            </div>
          </div>

          {/* AGENDA */}
          <div className="dynamic-field">
            <div className="input-group">
              <input
                value={agendaInput}
                onChange={(e) => setAgendaInput(e.target.value)}
                placeholder="Add agenda item"
              />
              <button type="button" onClick={addAgendaItem}>
                Add
              </button>
            </div>

            <ul className="items">
              {agenda.map((item, i) => (
                <li
                  key={i}
                  className="item list-none"
                  onClick={() => removeAgendaItem(i)}
                >
                  {item} ✕
                </li>
              ))}
            </ul>
          </div>

          <div className="field">
            <label>Image</label>
            <input name="image" type="file" accept="image/*" required />
          </div>

          <button className="submit-btn" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Event"}
          </button>
        </div>
      </form>
    </section>
  );
}
