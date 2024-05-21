import React from 'react';
import classes from './calendarCss.module.css';

export const CalendarView = (props) => {
    const {calendarData, onClickDate, getEventForDate} = props

    return (
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
                <td key={dayIndex} className={classes.tableStyle} onClick={() => onClickDate(day.date)}>
                  {day.date}
                  <p className={classes.pStyle}>{getEventForDate(day.date)}</p>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
};