// import React from 'react';
// import ReactDOM from 'react-dom';
// import React, { useState, useEffect } from 'react';


// const CalendarView = () => {
//   // useStateフックを使って状態を管理する
//   const [calendarData, setCalendarData] = useState([[{date:" "}]]);

//   // useEffectフックを使って副作用を処理する
//   useEffect(() => {
//     async function responseData() {
//       try {
//         const response = await fetch("/calendars");
//         if(!response.ok){
//           throw new Error("Network response was not ok");
//         };
//         const date = await response.json();
//         setCalendarData(date);
//       }catch(error){
//         console.error("There was a problem with the fetch operation:", error);
//       }
//     }

//     responseData();
//   }, []); 

//   return (
//     <tbody id="calendar_detail">
//       {calendarData.map((week, i) => {
//         return (
//           <tr key={i}>
//             {week.map((day, j) => {
//               return (
//                 <td key={j}>{day.date}</td>
//               );
//             })}
//           </tr>
//         );
//       })}
//     </tbody>
//   );  
// };

// export default CalendarView;