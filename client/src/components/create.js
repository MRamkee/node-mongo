import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import "../styles.css";
import { Graph } from "./graph";
import RecordList from "./recordList";

export default function Create() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: ""
  });
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [genderInfo, setGenderInfo] = useState("");
  const GENDERS = ["male", "female"];

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    getGender(form.name);
    setTimeout(() => {
      // When a post request is sent to the create url, we'll add a new record to the database.
      const newPerson = {
        ...form,
        gender: genderInfo || GENDERS[Math.round(Math.random())]
      };

      fetch("http://localhost:5000/record/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newPerson)
      }).catch((error) => {
        window.alert(error);
        return;
      });

      setForm({ name: "", age: "", gender: "" });
      window.document.reload();
    }, 2000);
  }

  useEffect(() => {
    getRecords();

    return;
  }, []);

  function getGender(givenName) {
    return fetch(`https://api.genderize.io/?name=${givenName}`)
      .then((response) => response.json())
      .then((user) => {
        const gen = user?.gender || GENDERS[Math.round(Math.random())];
        setGenderInfo(gen);
      });
  }

  async function getRecords() {
    const response = await fetch(`http://localhost:5000/record/`);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const record = await response.json();

    const options = [
      {
        y: record.filter((item) => item.gender === "male").length,
        label: "Male"
      },
      {
        y: record.filter((item) => item.gender === "female").length,
        label: "Female"
      }
    ];

    setRecords(record);
    setGraphData(options);
  }

  const graphOptions = {
    theme: "dark2",
    animationEnabled: true,
    exportFileName: "Persons",
    exportEnabled: true,
    title: {
      text: "Persons Info"
    },
    data: [
      {
        type: "pie",
        showInLegend: true,
        legendText: "{label}",
        toolTipContent: "{label}: <strong>{y}%</strong>",
        indexLabel: "{y}%",
        indexLabelPlacement: "inside",
        dataPoints: graphData
      }
    ]
  };

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <div style={{ width: "100%" }}>
        <div
          className="box"
          style={{
            margin: "0 auto",
            marginTop: "10px"
          }}
        >
          <h3>Create New Person</h3>
          <form onSubmit={onSubmit}>
            <div className="form-group" style={{ marginTop: "5px" }}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={form.name}
                onChange={(e) => updateForm({ name: e.target.value })}
              />
            </div>
            <div className="form-group" style={{ marginTop: "5px" }}>
              <label htmlFor="age">Age</label>
              <input
                type="text"
                className="form-control"
                id="age"
                value={form.age}
                onChange={(e) => updateForm({ age: e.target.value })}
              />
            </div>
            <div className="form-group" style={{ marginTop: "20px" }}>
              <input
                type="submit"
                value="Create person"
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>
      </div>

      <div width="100%" style={{ display: "flex", marginTop: "50px" }}>
        <div className="box1">
          <h3>Graphical Representation</h3>
          {graphData && <Graph options={graphOptions} />}
        </div>
        <div className="box1">
          {records?.length > 0 && <RecordList resultantRecords={records} />}
        </div>
      </div>
    </div>
  );
}
