import React from "react";
import { enGB } from "date-fns/locale";
import { DatePicker } from "react-nice-dates";
import "react-nice-dates/src/style.scss";
import "../css/InputDropDownComponent.scss";

function DateComponent(props) {
	return (
		<div className="input-dropdown-container">
			<DatePicker
				date={props.date}
				onDateChange={props.handleInput}
				minimumDate={props.date}
				locale={enGB}
			>
				{({ inputProps, focused }) => (
					<input
						className={"input" + (focused ? " -focused" : "")}
						{...inputProps}
					/>
				)}
			</DatePicker>
		</div>
	);
}

export default DateComponent;
