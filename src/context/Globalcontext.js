import React, { useState, createContext,useEffect } from "react";
import { axios } from "../axios";

export const CreateContext = createContext();
function Globalcontext(props) {
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
    <div>
      <CreateContext.Provider
        value={
          (reminders,
          formData,
          latestReminder,
          noReminders,
          getReminder,
          addReminder,
          handleChange,
          deleteReminder,
          onView)
        }
      >
        {props.children}
      </CreateContext.Provider>
    </div>
  );
}

export default Globalcontext;
