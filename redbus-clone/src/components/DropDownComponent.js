import React, { memo } from "react";
import "../scss/DropDownComponent.scss";
function DropDownComponent({ list, setValue,children }) {
	if (list !== undefined)
		return (
			<div className="dropdown-input-container">
				<ul className="dropdown-content">
					{list.map((element) => {
						return (
							<li key={element.key} className="dropdown-element">
								<div
									onClick={(element) =>
										setValue(element.target.innerText)
									}
								>
									{element.name}
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		);
	else 
		return(
			<div className="dropdown-input-container">
				<div className="dropdown-content">
					{children}
				</div>
			</div>
		)
}

export default memo(DropDownComponent);
