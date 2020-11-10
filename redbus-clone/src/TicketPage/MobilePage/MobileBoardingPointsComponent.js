import React, { useState,useEffect } from "react";
import "../../scss/MobileBoardingPointsComponent.scss";
import uid from "uid";
import emptyRadio from "../../img/radio_btn_empty.svg";
import filledRadio from "../../img/radio_btn_filled.svg";
function MobileBoardingPointsComponent({ data, heading }) {
    const [selectedValue, setSelectedValue] = useState("");
    
    useEffect(() => {
        // setItems([
        //     <div key={uid} className="mb-boarding-pt">
		// 		<img
		// 			src={filledRadio}
		// 			alt="click to select"
		// 			onClick={() => setSelectedValue(selectedValue)}
		// 		/>
		// 		{selectedValue}
		// 	</div>
        // ])
    },[selectedValue]);

	const [items, setItems] = useState(() => {
		return data.map((item) => (
			<div
				key={uid()}
				className="mb-boarding-pt"
				onClick={() => setSelectedValue(item)}
			>
				<img
					src={selectedValue === item ? filledRadio : emptyRadio}
					alt="click to select"
				/>
				{item}
			</div>
		));
	});
	return (
		<div className="mb-boarding-pt-container">
			<div className="mb-boarding-pt-heading">{heading}</div>
			{items}
		</div>
	);
}

export default MobileBoardingPointsComponent;
