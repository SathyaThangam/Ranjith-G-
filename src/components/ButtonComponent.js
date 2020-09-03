import React from 'react';



// Button Component with customizable properties
function ButtonComponent(props){
        return(
            <button className={props.className} type={props.type} onClick={props.onClick}>{props.innerHTML}</button>
        )
}

export default ButtonComponent;
