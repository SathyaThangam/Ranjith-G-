import React , {Component} from 'react';
import ButtonComponent from '../components/ButtonComponent.js';
import '../css/HeaderComponent.css';

class HeaderComponent extends Component{
        render(){
            return(
                <div className="header">
                    <h1>TicketInsider</h1>
                </div>
            )
        }
}

export default HeaderComponent;
