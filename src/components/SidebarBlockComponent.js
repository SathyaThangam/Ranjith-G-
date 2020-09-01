import React from 'react'

export default function SidebarBlockComponent(props) {

    const heading_style = {
        color:"#333333",

    }

    const sub_heading_style = {
            color:"#999999",
            fontSize:"12px",
            marginTop:"5px"
    }

    const component_style = {
        padding:"10px",
        background:"white",
        marginBottom:"1px",
        textAlign:"left",
        cursor:"pointer"
    }

    return (
        <div className={props.className} style={component_style}>
            <h4 style={heading_style}>{props.heading}</h4>
            <p style={sub_heading_style}>{props.subHeading}</p>
        </div>
    )
}
