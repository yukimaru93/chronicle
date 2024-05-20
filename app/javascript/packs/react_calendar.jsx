import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios'; 

const ReactCalendars = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [selectCalendarData, setSelectCalendarData] = useState(null);
  const [formIndex, setFormIndex] = useState(false);
  const [formData, setFormData] = useState({ year: new Date().getFullYear(), month: new Date().getMonth() + 1, date: "", content: "", calendar_id: 1 });

  const fetchCalendarData = () => {
    axios.get("/calendars/calendar_data")
      .then(response => {
        setCalendarData(response.data.calendar);
        setEventData(response.data.events)
      })
      .catch(error => {
        console.error("Error fetching calendar data:", error);
      });
  };

  useEffect(() => {
    fetchCalendarData();
  }, []);

  const onClickDate = (date) => {
    const event = eventData.find(event => event.date === date);
    if ((event != null)&&(event != undefined)) {
      setSelectCalendarData(date);
      setFormIndex(true);
      setFormData({ ...formData, date: date,content: event.content});
    }else{
      setSelectCalendarData(date);
      setFormIndex(true);
      setFormData({ ...formData, date: date,content: ""});
    }
  };

  const closeForm = () => {
    setFormIndex(false);
  };

  const enterContent = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitPlan = (event) => {
    event.preventDefault();
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    axios.post("/calendars/save_content", { event: formData }, {
      headers: {
        'X-CSRF-Token': csrfToken
      }
    })
      .then(response => {
        console.log('Event saved:', response.data);
        setFormIndex(false);
        fetchCalendarData();
      })
      .catch(error => {
        console.error("Error saving event", error);
      });
  };

  const tableStyle = {
    border: "1px solid black",
    verticalAlign: "top",
    fontSize: "2vw",
    padding: "5px 0 0 5px",
    cursor: "pointer",
    width: "calc(100% / 7)",
    height: "20%"
  };

  const pStyle = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: "calc(12px + 0.5vw)",
    lineHeight: "1.2",
  }

  const formStyle = {
    zIndex: "10",
    width: "60%",
    height: "50%",
    position: "fixed",
    top: "150px",
    left: "150px",
    backgroundColor: "rgba(192, 192, 192, 0.9)",
    paddingTop: "20px",
    border: "1px solid black",
    borderRadius: "5px",
    textAlign: "center",
  };

  const buttonStyle = {
    zIndex: "10",
    position: "fixed",
    top: "130px",
    right: "310px",
    width: "40px"
  }

  const getEventForDate = (date) => {
    const event = eventData.find(event => event.date === date);
    return event ? event.content : "";
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>日</th>
            <th>月</th>
            <th>火</th>
            <th>水</th>
            <th>木</th>
            <th>金</th>
            <th>土</th>
          </tr>
        </thead>
        <tbody>
          {calendarData.map((week, index) => (
            <tr key={index}>
              {week.map((day, dayIndex) => (
                <td key={dayIndex} style={tableStyle} onClick={() => onClickDate(day.date)}>
                  {day.date}
                  <p style={pStyle}>{getEventForDate(day.date)}</p>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {formIndex && (
        <div>
          <div style={formStyle}>
            <form onSubmit={submitPlan}>
              <h3> {selectCalendarData} 日の予定を追加</h3>
              <textarea
                type="text"
                name="content"
                className="plan-textarea"
                value={formData.content}
                onChange={enterContent}
                placeholder="予定を入力"
                required
              ></textarea>
              <button type="submit" className="plan-save">保存</button>
            </form>
          </div>
          <button onClick={closeForm} style={buttonStyle}>×</button>
        </div>
      )}
    </div>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  const calendarDataEl = document.getElementById("calendar-data");
  if (calendarDataEl) { 
    createRoot(calendarDataEl).render(<ReactCalendars />);
  }
});
