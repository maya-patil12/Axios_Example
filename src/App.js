import React, { useState, useEffect ,useContext} from "react";
import {CreateContext} from './context/Globalcontext';
import "./App.css";
import { axios } from "./axios";
import Reminder from "./components/Reminder";
import Latestreminder from "./components/Latestreminder";

function App() {
  // const {reminders,formData,latestReminder,noReminders,getReminder,addReminder,handleChange,deleteReminder,onView}=useContext(CreateContext);
  const [reminders, setReminders] = useState([]);
  const [formData, setFormdata] = useState({});
  const [latestReminder, setLatest] = useState([]);
  const noReminders = !reminders || (reminders && reminders.length === 0);
  const getReminder = async () => {
    const response = await axios.get("/reminders").catch((err) => {
      console.log("Error:", err);
    });
    if (response && response.data) {
      setReminders(response.data);
      setLatest([response.data[response.data.length - 1]]);
    }
    // console.log(response.data);
  };

  const addReminder = async (event) => {
    event.preventDefault();
    console.log(formData);
    const response = await axios.post("/reminders", formData).catch((err) => {
      console.log("Error: ", err);
    });

    if (response) await getReminder();

    setFormdata({});
  };

  const handleChange = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };

  const deleteReminder = async (id) => {
    const response = await axios.delete(`/reminders/${id}`).catch((err) => {
      console.log("Error deleting: ", err);
    });

    if (response) await getReminder();
  };

  const onView = async (id) => {
    const response = await axios.get(`/reminders/${id}`).catch((err) => {
      console.log("Error getting: ", err);
    });
    if (response && response.data) {
      setReminders([response.data]);
    }
    console.log(response.data);
    alert(id);
  };

  useEffect(() => {
    getReminder();
  }, []);
  return (
    <div className="App">
      <h1 className="text-center pt-5 pb-4">Reminder</h1>
      <br />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            {noReminders && <h1>No Reminders Found</h1>}
            {!noReminders &&
              reminders.map((reminder, idx) => (
                <Reminder
                  key={idx}
                  {...reminder}
                  onDelete={deleteReminder}
                  onView={onView}
                />
              ))}
          </div>
          <div className="col-md-6">
            <h2>Latest Reminders</h2>
               {latestReminder.map((latestReminders, idx) => (
                <Latestreminder
                  key={idx}
                  {...latestReminders}
                  onDelete={deleteReminder}
                  onView={onView}
                />
              ))}
          </div>
        </div>

        <br />
      </div>
      <hr />
      <div className="container">
        <h1 className="text-center">Add Reminder</h1>
        <br />
        <form id="contact" onSubmit={addReminder}>
          <div className="row">
            <div className="col-md-4">
              <label className="control-label m-3 font-weight-bold">ID</label>
              <input
                placeholder="Your ID"
                type="text"
                className="form-control m-3"
                name="id"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="control-label m-3 font-weight-bold">
                Reminder
              </label>
              <input
                placeholder="Your Reminder"
                className="form-control m-3"
                type="text"
                name="reminder"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="control-label m-3 font-weight-bold">Time</label>
              <input
                placeholder="Your Time"
                className="form-control m-3"
                type="text"
                name="time"
                onChange={handleChange}
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

export default App;
