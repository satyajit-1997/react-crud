import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Cruddata() {
  const [empdata, empchange] = useState(null);
  const navigation = useNavigate();
  const loadcontent = (id) => {
    navigation("/empdata/" + id);
  };
  const deletecontent = (id) => {
    if (window.confirm("do you want to delete data")) {
      fetch("http://localhost:8000/cruddata/" + id, {
        method: "DELETE",
      })
        .then((res) => {
          alert("Record Deleted");
          navigation("/");
          window.location.reload(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    fetch("http://localhost:8000/cruddata")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        empchange(res);
        console.log(empdata);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="row">
        <div className="container">
          <div className="card">
            <div className="card-title">
              <h2>React JS CRUD</h2>
            </div>

            <div className="card-body">
              <Link to="/empadd" className="btn btn-success mb-3">
                Add New
              </Link>
              <table className="table table-bordered">
                <thead className="bg-primary text-white">
                  <tr>
                    <td>Id</td>
                    <td>Name</td>
                    <td>Phone Number</td>
                    <td>Email</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {empdata &&
                    empdata.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                        <td>
                          <button
                            className="btn btn-dark m-1"
                            onClick={() => loadcontent(item.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => deletecontent(item.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
