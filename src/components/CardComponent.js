import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import '../css/CardComponent.css';

class CardComponent extends Component {

    render(){

        const{showName,showLang,showDate,showImg,id} = this.props;
        const date = new Date(showDate);
        var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        return(
            <Link style={{textDecoration:"none",color:"inherit"}} to={`/details/${id}`}>
            <div className="card-container">
                <img src={showImg} alt="show" />
                <div className="card-content">
                    <div className="date-container">
                        <span>{date.getDate()}</span>
                        <p>{months[date.getMonth()]}</p>
                    </div>
                    <div className="detail-container">
                        <h4>{showName}</h4>
                        <div>Amazon prime</div>
                        <div>Series | {showLang}</div>
                        <div>Rs. 199 onwards</div>
                    </div>
                </div>
            </div>
            </Link>
        )
    }

}

export default CardComponent;
