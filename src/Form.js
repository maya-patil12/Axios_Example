import React from "react";
import {axios} from './axios';
function Form() {
  return (
    <div>
      <h1 className="text-center">Reminder</h1>
      <div className="container"></div>
      <hr />
      <div class="container">
        <h1 className="text-center">Add Reminder</h1>
        <br />
        <form id="contact" action="" method="post">
          <div className="row">
            <div className="col-md-4">
              <label className="control-label m-3 font-weight-bold">ID</label>
              <input
                placeholder="Your name"
                type="text"
                className="form-control m-3"
                name="id"
              />
            </div>
            <div className="col-md-4">
              <label className="control-label m-3 font-weight-bold">
                Reminder
              </label>
              <input
                placeholder="Your Email Address"
                className="form-control m-3"
                type="email"
                name="reminder"
              />
            </div>
            <div className="col-md-4">
              <label className="control-label m-3 font-weight-bold">Time</label>
              <input
                placeholder="Your Email Address"
                className="form-control m-3"
                type="email"
                name="time"
              />
            </div>
          </div>

          <button
            className="btn btn-success btn-lg m-3"
            name="submit"
            type="submit"
            id="contact-submit"
            data-submit="...Sending"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
