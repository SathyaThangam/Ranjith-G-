import React, { Component } from "react";
import axios from 'axios';

import "../css/ShowDetailsPage.css";
import showData from "../data/showData.json"; //data from json
import AccordianComponent from "../components/AccordianComponent";
import ToastComponent from "../components/ToastComponent";

class ShowDetailsPage extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      toastShow:"",
      toastMessage:""
    }
  
  }

  paymentHandler = async (e) => {
    const API_URL = 'http://localhost:8000/';
    e.preventDefault();
    console.log("Payment handler");
    const orderUrl = `${API_URL}order`;
    const response = await axios.get(orderUrl);
    const { data } = response;
    const options = {
      key: process.env.RAZORPAY_API_KEY,
      name: "Ticket Insider",
      description: "Tickets",
      order_id: data.id,
      handler: (response) => {
        try {
          const paymentId = response.razorpay_payment_id;
          const url = `${API_URL}capture/${paymentId}`;
          axios
            .post(url)
            .then((res) =>{
              const data = JSON.parse(res.data);
              console.log(data.status);
              if (data.status === 'captured') {
                this.setState({
                  toastShow:'show success',
                  toastMessage:"Payment success"
                })
                // setTimeout(this.setState({toastShow:'',toastMessage:''}), 3000);
              }
            })
            .catch((err) => console.log(err));
          // console.log(captureResponse);
        } catch (err) {
          console.log(err);
        }
      },
      theme: {
        color: "#6cfc6a",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
};

  render() {
    const item = showData.filter((item) => {
      // eslint-disable-next-line
      return item.id == this.props.match.params.id;
    })[0];
     return (
    <div className="content-container">
      <div className="banner-container">
        <div className="image">
          <img src={item.image.original} alt={item.name} />
        </div>
        <div className="image-details">
          <div className="image-details-heading">
            <div className="image-details-left">
              <div className="heading">
                <h1>{item.name}</h1>
                <div className="sub-heading">
                  {`${item.genres} | ${item.language} | 8+ | ${item.runtime} mins`}
                </div>
              </div>
            </div>
            <div className="image-details-right">
              <button className="pay-button" onClick={this.paymentHandler}>Pay Now</button>
            </div>
          </div>
          <div>To be Announced |</div>
        </div>
      </div>
      <div className="page-details">
        <div className="page-details-left"></div>
        <div className="page-details-right">
          <div className="page-info">
            <div>
              <h3>Note</h3>
            </div>
            <p>
              You’ve watched them on TV and stage, now talk to them! Talk to the
              Stars: In conversation with the cast of Mahabharat – The Epic
              Tale. Be a part of the lucky few who get to share a conversation
              and learn behind-the-scene secrets, insights into the characters
              of Duryodhan, Shakuni and the Mahabharat, fun stories about the
              play and an overall interesting and entertaining experience with
              Puneet Issar and Gufi Paintal.
            </p>
          </div>
          <div>
            <h3>About</h3>
          </div>
          <div
            className="show-description"
            dangerouslySetInnerHTML={{ __html: item.summary }}
          >
            {/* summary goes here... */}
          </div>
          <div className="display-accord">
            <AccordianComponent />
            <AccordianComponent />
            <AccordianComponent />
            <AccordianComponent />
          </div>
          <ToastComponent className={this.state.toastShow} message={this.state.toastMessage} />
        </div>
      </div>
    </div>
  );
  }
 
}

export default ShowDetailsPage;