import React from 'react';
import classes from './calendarCss.module.css';

export const FormView = (props) => {
    const {selectCalendarData, submitPlan, formData, enterContent, closeForm} = props;

    return(
        <div>
          <div className={classes.formStyle}>
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
          <button onClick={closeForm} className={classes.buttonStyle}>×</button>
        </div>
    )
};