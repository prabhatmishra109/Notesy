import React from "react";

function UserDetail({ userArray }) {

  return (
    <div className="contact-table-container">
      <h2 className="table-title">User Details</h2>

      <div className="table-wrapper">
        <table className="contact-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(userArray) && userArray.map((uobj, index) => (
              <tr key={uobj.id || index}>
                <td>{index + 1}</td>
                <td>{uobj.name}</td>
                <td>{uobj.email}</td>
                <td>{uobj.phone}</td>
                <td>{uobj.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserDetail;