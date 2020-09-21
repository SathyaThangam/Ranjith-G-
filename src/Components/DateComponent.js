import React, { useState } from "react";
import { enGB } from "date-fns/locale";
import { DatePicker } from "react-nice-dates";
import "react-nice-dates/src/style.scss";
import "../css/InputComponent.scss";
function DateComponent() {
	const [date, setDate] = useState();
	return (
		<div className="input-container">
			<DatePicker
				date={date}
				onDateChange={setDate}
				minimumDate={new Date()}
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
