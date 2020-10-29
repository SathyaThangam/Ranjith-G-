import React, { useRef, useState, useEffect } from "react";
import "../scss/SideDrawComponent.scss";
function SideDrawComponent({ children, show }) {
	const ref = useRef(null);

	const [display, setDisplay] = useState(show);

    useEffect(() => {
        setDisplay(show)
    },[show]);

	useEffect(() => {
		const clickOutside = (event) => {
			if (display && ref.current && !ref.current.contains(event.target)) {
				setDisplay(false);
			}
		};
		window.addEventListener("click", clickOutside);
		return () => window.removeEventListener("click", clickOutside);
	}, [ref, display]);

	if (display) {
		return (
			<div className={"side-draw-container"}>
				<div ref={ref} className="side-draw-content">
					{children}
				</div>
				<div className="dark-container"></div>
			</div>
		);
	} else return <></>;
}

export default SideDrawComponent;
