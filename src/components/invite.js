//invite
import React from 'react';

//import './invite.css'

export default function Invite (props) {
  return (
    <div className="modal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Modal Heading</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <div className="modal-body">Here's where link goes</div>
        </div>
      </div>
    </div>
  )
}