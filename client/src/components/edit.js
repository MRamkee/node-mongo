import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
  const [form, setForm] = useState({
    name: "",
    position: "",
    gender: "",
    records: []
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(
        `http://localhost:5000/record/${params.id.toString()}`
      );

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedPerson = {
      name: form.name,
      age: form.age,
      gender: form.gender
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedPerson),
      headers: {
        "Content-Type": "application/json"
      }
    });

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div style={{ marginTop: "10px" }} class="box">
      <form onSubmit={onSubmit}>
        <div>
          <h3>Update Person Info</h3>
          <div className="form-group" style={{ marginTop: "5px" }}>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={form.name}
              onChange={(e) => updateForm({ name: e.target.value })}
            />
          </div>
          <div className="form-group" style={{ marginTop: "5px" }}>
            <label htmlFor="age">Age: </label>
            <input
              type="text"
              className="form-control"
              id="age"
              value={form.age}
              onChange={(e) => updateForm({ age: e.target.value })}
            />
          </div>
          <div className="form-group" style={{ marginTop: "5px" }}>
            {/* <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="positionIntern"
              value="Intern"
              checked={form.gender === "Intern"}
              onChange={(e) => updateForm({ gender: e.target.value })}
            />
            <label htmlFor="positionIntern" className="form-check-label">
              Intern
            </label>
          </div> */}
            <div
              className="form-check form-check-inline"
              style={{ marginTop: "5px" }}
            >
              <input
                className="form-check-input"
                type="radio"
                name="positionOptions"
                id="positionJunior"
                value="male"
                checked={form.gender === "male"}
                onChange={(e) => updateForm({ gender: e.target.value })}
              />
              <label htmlFor="positionJunior" className="form-check-label">
                male
              </label>
            </div>
            <div
              className="form-check form-check-inline"
              style={{ marginTop: "5px" }}
            >
              <input
                className="form-check-input"
                type="radio"
                name="positionOptions"
                id="positionSenior"
                value="female"
                checked={form.gender === "female"}
                onChange={(e) => updateForm({ gender: e.target.value })}
              />
              <label htmlFor="positionSenior" className="form-check-label">
                female
              </label>
            </div>
          </div>
          <br />

          <div className="form-group">
            <input type="submit" value="Update" className="btn btn-primary" />
          </div>
        </div>
      </form>
    </div>
  );
}
