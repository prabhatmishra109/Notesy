import React from 'react'
import '../../css/contactdetail.css'

function ContactDetail({ contactArray,deleteByid }) {
  return (
    <div className="contact-table-container">
      <h2 className="table-title">Contact Queries</h2>

      <div className="table-wrapper">
        <table className="contact-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Question</th>
              <th>Select</th>
            </tr>
          </thead>

          <tbody>
            {contactArray.map((cobj, index) => (
              <tr key={index}>
                <td>{cobj.id}</td>
                <td>{cobj.name}</td>
                <td>{cobj.email}</td>
                <td>{cobj.phone}</td>
                <td>{cobj.question}</td>
                <th><button className='btn btn-danger' onClick={()=>{
                  deleteByid(cobj.id)
                }}>
                Delete</button></th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ContactDetail