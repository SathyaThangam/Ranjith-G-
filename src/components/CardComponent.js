import React,{Component} from 'react';
import '../css/CardComponent.css';
import card_image from '../img/card_image.jpg';

class CardComponent extends Component {
    constructor(props) {
        super(props);
    }

    render(){

        return(
            <div className="card-container">
                <img src={card_image} alt="image" />
                <div className="card-content">
                    <div className="date-container">
                        <span>25</span>
                        <p>SEP</p>
                    </div>
                    <div className="detail-container">
                        <h4>The BOYS</h4>
                        <div>Amazon prime</div>
                        <div>Series | English</div>
                        <div>Rs. 199 onwards</div>
                    </div>
                </div>
            </div>
        )
    }

}

export default CardComponent;
