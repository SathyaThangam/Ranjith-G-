import React,{Component} from 'react';
import '../css/InputComponent.css';


class InputComponent extends Component {
    constructor() {
        super();
    }

    render(){
        return(
            <div >
                <input  className="form-input" type={this.props.type} name={this.props.name} placeholder ={this.props.placeholder}/>
            </div>
        )
    }
}

export default InputComponent;
