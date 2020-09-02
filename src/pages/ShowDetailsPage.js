import React from 'react'

import '../css/ShowDetailsPage.css';
import showData from '../data/showData.json';  //data from json
import AccordianComponent from '../components/AccordianComponent';

export default function ShowDetailsPage(props) {


    // filtering to get the particular show by id
    const item = showData.filter((item)=>{
        return item.id == props.match.params.id;
    })[0];
    console.log(item);
    // const summary = item.summary;
    return (
        <div className="content-container">
            <div className="banner-container">
                <div className="image"><img src={item.image.original} alt={item.name}/></div>
                <div className="image-details">
                    <div className="heading">
                        <h1>{item.name}</h1>
                        <div className="sub-heading">
                        {`${item.genres} | ${item.language} | 8+ | ${item.runtime} mins`}
                        </div>
                    </div>
                    <div>
                        To be Announced |
                    </div>
                </div>
            </div>
            <div className="page-details">
                <div className="page-details-left"></div>
                <div className="page-details-right">
                    <div className="page-info">
                        <div><h3>Note</h3></div>
                        <p>
                        You’ve watched them on TV and stage, now talk to them! Talk to the Stars: In conversation with the cast of Mahabharat – The Epic Tale. Be a part of the lucky few who get to share a conversation and learn behind-the-scene secrets, insights into the characters of Duryodhan, Shakuni and the Mahabharat, fun stories about the play and an overall interesting and entertaining experience with Puneet Issar and Gufi Paintal. 
                        </p>
                    </div>
                    <div><h3>About</h3></div>
                    <div className="show-description" dangerouslySetInnerHTML={{__html:item.summary}}>
                        {/* summary goes here... */}
                    </div>
                    <div className="display-accord">
                        <AccordianComponent/>
                        <AccordianComponent/>
                        <AccordianComponent/>
                        <AccordianComponent/>
                    </div>
                </div>

            </div>
        </div>
    )
}
