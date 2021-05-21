import React from "react";

function Latestreminder(props) {
  const { reminder, time, id, onDelete ,onView} = props;

  return (
    <div className="reminder-wrapper">
      <div className="reminder-container">
        <div className="reminder-id">{id}</div>
        <div className="reminder">{reminder}</div>
        <div className="reminder-time">{time}</div>
      </div>
      <span className="reminder-remove" onClick={() => onView(id)}>
      <i class="fa fa-eye" aria-hidden="true"></i>
      </span>
      <span className="reminder-remove" onClick={() => onDelete(id)}>
        ❌
      </span>
    </div>
  );
}
export default Latestreminder;