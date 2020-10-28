import React, { useMemo } from "react";
import "../scss/BusSeatsComponent.scss";
import { Stage, Layer, Path } from "react-konva";
import SeatComponent from "./SeatComponent";
import uid from "uid";
function BusSeatsComponent() {
    
    const text = (value) => console.log("hello text",value);

    const seats = useMemo(()=>{
        let tempSeats = [];
        let x = 70,y=[-5,45,115];
        y.forEach((col) => {
             for (let index = 0; index < 7; index++) {
					tempSeats.push(
						<SeatComponent
							x={x}
                            y={col}
                            disabled = {index % 6 === 0}
							key={uid()}
							strokeColor="red"
							onClick={(value) => {
								text(value);
							}}
						/>
					);
					x += 40;
                }
                x = 70
        })
       
        return tempSeats;
    },[])

	return (
		<div className="canvas-container">
			<Stage width={384} height={176}>
				<Layer>
					<Path
						x={0}
						y={0}
						data="M 5 5 C 5 2 9 2 9 5 C 9 8 5 8 5 5 M 6 3 L 7 5 M 9 5 L 7 5 M 6 7 L 7 5 Z"
						stroke="black"
						strokeWidth={0.2}
						scaleX={5}
						fill="transparent"
						scaleY={5}
					/>
                    {seats}
				</Layer>
			</Stage>
		</div>
	);
}

export default BusSeatsComponent;
