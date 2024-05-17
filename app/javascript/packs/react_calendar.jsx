import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios'; 

const ReactCalendars = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [selectCalendarData, setSelectCalendarData] = useState(null);
  const [formIndex, setFormIndex] = useState(false);
  const [formData, setFormData] = useState({ date: "", content: "" });

  const fetchCalendarData = () => {
    axios.get("/calendars/calendar_data")
      .then(response => {
        setCalendarData(response.data);
      })
      .catch(error => {
        console.error("Error fetching calendar data:", error);
      });
  };

  useEffect(() => {
    fetchCalendarData();
  }, []);

  const onClickDate = (date) => {
    console.log("Date clicked:", date);
    setSelectCalendarData(date);
    setFormIndex(true);
    setFormData({ date: date, content: "" });
  };

  const enterContent = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitPlan = (event) => {
    event.preventDefault();
    axios.post("/calendars/save_content", formData)
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
    cursor: "pointer"
  };

  const formStyle = {
    index: "10",
    width: "60%",
    height: "50%",
    position: "fixed",
    top: "150px",
    left: "150px",
    backgroundColor: "rgba(192, 192, 192, 0.9)",
    paddingTop: "20px",
    border: "1px solid black",
    borderRadius: "5px",
    textAlign: "center"
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
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {formIndex && (
        <div style={formStyle}>
          <form onSubmit={submitPlan}>
            <h3> {selectCalendarData} 日の予定を追加</h3>
            <textarea
              type="text"
              name="content"
              class="plan-textarea"
              value={formData.content}
              onChange={enterContent}
              placeholder="予定を入力"
              required
            ></textarea>
            <button type="submit" class="plan-save">保存</button>
          </form>
        </div>
      )}
    </div>
  );
};

// document.addEventListener("DOMContentLoaded", () => {
//   const calendarDataEl = document.getElementById("calendar-data");
//   createRoot(calendarDataEl).render(<ReactCalendars />);
// });

// DOMContentLoadedの代わりに、Turboリンクのロードイベントを使用する
document.addEventListener("DOMContentLoaded", () => {
  const calendarDataEl = document.getElementById("calendar-data");
  if (calendarDataEl) { // Elementが存在するかチェック
    createRoot(calendarDataEl).render(<ReactCalendars />);
  }
});

