import React,{useState} from "react";
import GoogleMapReact from "google-map-react";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import "../css/MapComponent.scss"
import { round } from "../helpers/helper";
import { connect } from "react-redux";
import {setCoordinates} from "../redux";
function MapComponent(props) {

    const [markerCoords, setMarkerCoords] = useState(props.center)

	const onClick = ({ x, y, lat, lng, event }) =>{
        // console.log(x, y, lat, lng, event);
        const markerPosition = { lat: round(lat), lng: round(lng) };
        setMarkerCoords(markerPosition)
        props.setCoords(markerPosition)
        props.setLocationState(true)

    }
	return (
		// <div style={{ height: "100vh", width: "100%" }}>
		<div className="map-container">
			<GoogleMapReact
				bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API_KEY }}
				defaultCenter={props.center}
				defaultZoom={props.zoom}
				onClick={onClick}
			>
				<div {...markerCoords}>
					<LocationOnIcon
						style={{
							color: "#FF0000",
						}}
					/>
				</div>
			</GoogleMapReact>
		</div>
	);
}



const mapDispatchToProps = (dispatch) => {
	return {
		setCoords: (newCoords) => dispatch(setCoordinates(newCoords)),
	};
};

export default connect(null,mapDispatchToProps)(MapComponent);
