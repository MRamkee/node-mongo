import React, { useState } from "react";
import { Link } from "react-router-dom";

const Record = (props) => (
  <tr>
    <td>{props.record.name}</td>
    <td>{props.record.age}</td>
    <td>{props.record.gender}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.record._id}`}>
        Edit
      </Link>{" "}
      |
      <button
        className="btn btn-link"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function RecordList({ resultantRecords }) {
  const arrayReverseObj = (obj) =>
    Object.keys(obj)
      .sort()
      .reverse()
      .map((key) => ({ ...obj[key], key }));

  const [records, setRecords] = useState(
    arrayReverseObj(resultantRecords).slice(0, 10)
  );

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE"
    });
    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
    window.location.reload();
  }

  // This method will map out the records on the table
  function recordList() {
    return (
      records?.map((record) => {
        return (
          <Record
            record={record}
            deleteRecord={() => deleteRecord(record._id)}
            key={record._id}
          />
        );
      }) || "No Data Available"
    );
  }

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <h3>Person List</h3>
      <table
        className="table table-striped"
        style={{ marginTop: 20, fontSize: "14px", margin: "5px" }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
}
