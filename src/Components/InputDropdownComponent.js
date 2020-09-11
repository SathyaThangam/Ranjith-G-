import React, { Component } from 'react'

import "../css/InputDropDownComponent.scss";

class InputDropdownComponent extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            dropdownContent:''
        }
    }

    
    
    render() {
        return (
			<div className="input-container">
				<input type={this.props.type} placeholder={this.props.placeholder} />
				<div className="dropdown-content">
					{this.state.dropdownContent}
				</div>
			</div>
		);
    }
}

export default InputDropdownComponent;