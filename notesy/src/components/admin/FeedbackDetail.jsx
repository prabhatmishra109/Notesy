import React from 'react'
import '../../css/feedbackdetail.css'

function FeedbackDetail({ feedbackArray, deleteByid }) {

  if (!feedbackArray || feedbackArray.length === 0) {
    return <p className="no-feedback">No Feedback Available</p>
  }

  return (
    <div className="feedback-list">
      {feedbackArray.map((fobj, index) => (
        <div className="feedback-item" key={index}>
          <p><strong>Email:</strong> {fobj.email}</p>
          <p><strong>Rating:</strong> {fobj.rating}</p>
          <p><strong>Review:</strong> {fobj.review}</p>
          <p><strong><button className='btn btn-danger' onClick={()=>{
                  deleteByid(fobj.id)
                }}>
                Delete</button></strong></p>
        </div>
      ))}
    </div>
  )
}

export default FeedbackDetail