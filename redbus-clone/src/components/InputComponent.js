import React, { memo, useState } from "react";
import "../scss/InputComponent.scss";
function InputComponent({ label, type, value, setValue, iconImg, inputProps }) {
	const icon =
		iconImg !== undefined ? (
			<span className="icon-container">
				<img src={iconImg} alt="icon" />
			</span>
		) : (
			""
		);
	const [empty, setEmpty] = useState(false);

	return (
		<div className={empty ? "input-container empty" : "input-container"}>
			{icon}
			<input
				type={type}
				value={value}
				{...(inputProps !== undefined ? inputProps : "")}
				onChange={(e) => {
					if (e.target.value === "") setEmpty(true);
					else setEmpty(false);
					setValue(e.target.value);
				}}
			/>
			<label>{label}</label>
		</div>
	);
}

export default memo(InputComponent);
