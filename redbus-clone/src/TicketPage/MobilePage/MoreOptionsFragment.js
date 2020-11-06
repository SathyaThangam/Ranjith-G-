import React from "react";
import rightArrow from "../../img/right_arrow.svg";
function MoreOptionsFragment({heading,newBadge}) {
	return (
		<div className="mobile-filter-segment more-options">
			<span>
				{heading}{" "}
				{newBadge ? <span className="new-badge">NEW</span> : ""}
			</span>
			<img className="right-arrow" src={rightArrow} alt="more options" />
		</div>
	);
}

export default MoreOptionsFragment;
