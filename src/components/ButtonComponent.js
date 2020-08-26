import React,{Component} from 'react';


class ButtonComponent extends Component {
    constructor() {
        super();
    }

    render(){
        return(
            <button className={this.props.className} type={this.props.type} onClick={this.props.onClick}>{this.props.innerHTML}</button>
        )
    }
}

export default ButtonComponent;
