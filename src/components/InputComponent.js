import React,{Component} from 'react';
import '../css/InputComponent.css';


class InputComponent extends Component {
    render(){
        return(
            <div >
                <input  className={`form-input ${this.props.className}`} type={this.props.type} name={this.props.name} placeholder ={this.props.placeholder} onChange= {event => this.props.onChange(event)}/>
            </div>
        )
    }
}

export default InputComponent;
