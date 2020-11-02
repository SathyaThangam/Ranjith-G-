import React,{useState,useEffect} from "react";
import HeaderComponent from "../components/HeaderComponent";
import DesktopPage from "./DesktopPage";
import MobilePage from "./MobilePage/index";
function TicketPage() {
	const [width, setWidth] = useState(window.innerWidth)
	const handleResize = () => setWidth(window.innerWidth);
	useEffect(() => {
		window.addEventListener('resize',handleResize);
		return () => {
			window.removeEventListener('resize',handleResize);
		}
	}, [])
	return width <= 500 ? (
		<MobilePage/>
	) : (
		<span>
			<HeaderComponent />
			<DesktopPage />
		</span>
	);
}


// function TicketPage() {
// 	return (
// 		<div>
// 			<HeaderComponent/>
// 			<DesktopPage/>	
// 		</div>
// 	)
// }


export default TicketPage;
