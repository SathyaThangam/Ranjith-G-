import React, { useState, useEffect } from "react";
import { enGB } from "date-fns/locale";
import { DatePicker } from "react-nice-dates";
import "react-nice-dates/src/style.scss";
import InputComponent from "../components/InputComponent";

function DateComponent({ label, setValue,type }) {
    const minimumDate = new Date();
    
    const style = {
        position:"relative"
    }

	const [date, setDate] = useState(new Date());

	useEffect(() => {
		setValue(date);
	}, [date,setValue]);

	return (
		<div style={style}>
			<DatePicker
				date={date}
				onDateChange={setDate}
				minimumDate={minimumDate}
				locale={enGB}
			>
				{({ inputProps, focused }) => (
					<InputComponent inputProps={inputProps} label={label} type={type}/>
				)}
			</DatePicker>
		</div>
	);
}

export default DateComponent;
