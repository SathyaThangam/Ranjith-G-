import React, { memo, useState } from "react";
import "../scss/InputComponent.scss";
function InputComponent({ label, type, value, setValue,addSpace, inputProps }) {
	const [empty, setEmpty] = useState(false);

	return (
		<div className={empty ? "input-container empty" : "input-container"}>
			{addSpace ? <span className="space-container"></span> : ""}
			<div className="input-label-group">
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
		</div>
	);
}

export default memo(InputComponent);
