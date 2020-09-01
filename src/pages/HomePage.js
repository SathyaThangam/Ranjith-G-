import React, {Component} from 'react';
import CardComponent from '../components/CardComponent';
import '../css/HomePage.css';
import '../components/NavBarComponent';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NavBarComponent from '../components/NavBarComponent';


class HomePage extends Component {

    
     
    render(){

        const data = [{
            "id": 15299,
            "url": "http://www.tvmaze.com/shows/15299/the-boys",
            "name": "The Boys",
            "type": "Scripted",
            "language": "English",
            "genres": [
              "Drama",
              "Action",
              "Science-Fiction"
            ],
            "status": "Running",
            "runtime": 60,
            "premiered": "2019-07-26",
            "officialSite": "https://www.amazon.com/dp/B07QQQ52B3",
            "schedule": {
              "time": "",
              "days": [
                "Friday"
              ]
            },
            "rating": {
              "average": 8.6
            },
            "weight": 100,
            "network": null,
            "webChannel": {
              "id": 3,
              "name": "Amazon Prime",
              "country": null
            },
            "externals": {
              "tvrage": null,
              "thetvdb": 355567,
              "imdb": "tt1190634"
            },
            "image": {
              "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/267/668204.jpg",
              "original": "http://static.tvmaze.com/uploads/images/original_untouched/267/668204.jpg"
            },
            "summary": "<p>In a world where superheroes embrace the darker side of their massive celebrity and fame, <b>The Boys</b> centres on a group of vigilantes known informally as \"The Boys,\" who set out to take down corrupt superheroes with no more than blue collar grit and a willingness to fight dirty.</p>",
            "updated": 1598464652,
            "_links": {
              "self": {
                "href": "http://api.tvmaze.com/shows/15299"
              },
              "previousepisode": {
                "href": "http://api.tvmaze.com/episodes/1665502"
              },
              "nextepisode": {
                "href": "http://api.tvmaze.com/episodes/1855137"
              }
            }
          },
          {
            "id": 42691,
            "url": "http://www.tvmaze.com/shows/42691/our-boys",
            "name": "Our Boys",
            "type": "Scripted",
            "language": "Hebrew",
            "genres": [
              "Drama",
              "War",
              "History"
            ],
            "status": "Ended",
            "runtime": 60,
            "premiered": "2019-08-12",
            "officialSite": "https://www.hbo.com/our-boys",
            "schedule": {
              "time": "21:00",
              "days": [
                "Monday"
              ]
            },
            "rating": {
              "average": 7.4
            },
            "weight": 91,
            "network": {
              "id": 8,
              "name": "HBO",
              "country": {
                "name": "United States",
                "code": "US",
                "timezone": "America/New_York"
              }
            },
            "webChannel": null,
            "externals": {
              "tvrage": null,
              "thetvdb": 365890,
              "imdb": "tt10517426"
            },
            "image": {
              "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/207/519487.jpg",
              "original": "http://static.tvmaze.com/uploads/images/original_untouched/207/519487.jpg"
            },
            "summary": "<p>In the summer of 2014, three Jewish teenagers are kidnapped and murdered by Hamas militants. Israel is shocked, shaken and furious. Two days later, the burned body of a Palestinian teenager from eastern Jerusalem is found in a forest on the western outskirts of the city. In the ensuing days, an agent from the internal terror division of the Shin Bet investigates the murder, while the parents of the slain teenager begin their long and anguished journey toward justice and consolation.</p><p>Filmed in Israel, <b>Our Boys</b> is based on the true events which led to the outbreak of war in Gaza. The series follows the investigation of Muhammad Abu Khdeir's murder, and tells the story of all those involved, Jews and Arabs alike, whose lives were forever changed by these events.</p>",
            "updated": 1571429385,
            "_links": {
              "self": {
                "href": "http://api.tvmaze.com/shows/42691"
              },
              "previousepisode": {
                "href": "http://api.tvmaze.com/episodes/1691996"
              }
            }
          },
          {
            "id": 7925,
            "url": "http://www.tvmaze.com/shows/7925/baker-boys",
            "name": "Baker Boys",
            "type": "Scripted",
            "language": "English",
            "genres": [
              "Drama",
              "Comedy"
            ],
            "status": "Ended",
            "runtime": 60,
            "premiered": "2011-01-23",
            "officialSite": "http://www.bbc.co.uk/programmes/b017ljl1",
            "schedule": {
              "time": "21:00",
              "days": [
                "Sunday"
              ]
            },
            "rating": {
              "average": null
            },
            "weight": 45,
            "network": {
              "id": 352,
              "name": "BBC One Wales",
              "country": {
                "name": "United Kingdom",
                "code": "GB",
                "timezone": "Europe/London"
              }
            },
            "webChannel": null,
            "externals": {
              "tvrage": null,
              "thetvdb": 224901,
              "imdb": "tt1708951"
            },
            "image": {
              "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/29/72516.jpg",
              "original": "http://static.tvmaze.com/uploads/images/original_untouched/29/72516.jpg"
            },
            "summary": "<p><b>Baker Boys</b> is a series charting the lives of a tight-knit community in a small South Wales town after it is hit by the economic downturn.</p>",
            "updated": 1573146315,
            "_links": {
              "self": {
                "href": "http://api.tvmaze.com/shows/7925"
              },
              "previousepisode": {
                "href": "http://api.tvmaze.com/episodes/440011"
              }
            }
          },
          {
            "id": 7233,
            "url": "http://www.tvmaze.com/shows/7233/wild-boys",
            "name": "Wild Boys",
            "type": "Scripted",
            "language": "English",
            "genres": [
              "Drama",
              "Adventure",
              "Western"
            ],
            "status": "Ended",
            "runtime": 60,
            "premiered": "2011-09-04",
            "officialSite": null,
            "schedule": {
              "time": "19:30",
              "days": [
                "Sunday"
              ]
            },
            "rating": {
              "average": null
            },
            "weight": 79,
            "network": {
              "id": 251,
              "name": "Seven Network",
              "country": {
                "name": "Australia",
                "code": "AU",
                "timezone": "Australia/Sydney"
              }
            },
            "webChannel": null,
            "externals": {
              "tvrage": 29459,
              "thetvdb": 251453,
              "imdb": "tt1865572"
            },
            "image": {
              "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/26/67233.jpg",
              "original": "http://static.tvmaze.com/uploads/images/original_untouched/26/67233.jpg"
            },
            "summary": "<p>In Hopetoun there are few rules… And even fewer willing to follow them. In this town moral codes are muddied by circumstance and opportunity. There's gold for the taking, cash being splashed and power wielded ruthlessly with little regard for right and wrong. It's hard to know the good guys from the bad when guns, blades and fists speak louder than any law. This is the world of the Wild Boys, a high-energy adventure series about a gang of bushrangers whose charisma is as captivating and entertaining as their extreme exploits in the Australian bush. Set in 1860s NSW at the frontier – where gold has lured the opportunistic away from the still fledgling main colonies, – Wild Boys follows four men on the outside of the law as they come up against authority, the rich and greedy and the foibles of their own hearts.</p>",
            "updated": 1566337492,
            "_links": {
              "self": {
                "href": "http://api.tvmaze.com/shows/7233"
              },
              "previousepisode": {
                "href": "http://api.tvmaze.com/episodes/413033"
              }
            }
          },
          {
            "id": 302,
            "url": "http://www.tvmaze.com/shows/302/trailer-park-boys",
            "name": "Trailer Park Boys",
            "type": "Scripted",
            "language": "English",
            "genres": [
              "Comedy",
              "Crime"
            ],
            "status": "To Be Determined",
            "runtime": 25,
            "premiered": "2001-04-22",
            "officialSite": "https://www.netflix.com/title/70153385",
            "schedule": {
              "time": "",
              "days": [
                "Friday"
              ]
            },
            "rating": {
              "average": 8.1
            },
            "weight": 88,
            "network": null,
            "webChannel": {
              "id": 1,
              "name": "Netflix",
              "country": null
            },
            "externals": {
              "tvrage": 6408,
              "thetvdb": 70566,
              "imdb": "tt0290988"
            },
            "image": {
              "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/2/5013.jpg",
              "original": "http://static.tvmaze.com/uploads/images/original_untouched/2/5013.jpg"
            },
            "summary": "<p>Follow the booze-fueled misadventures of three longtime pals and petty serial criminals who run scams from their Nova Scotia trailer park.</p>",
            "updated": 1570987385,
            "_links": {
              "self": {
                "href": "http://api.tvmaze.com/shows/302"
              },
              "previousepisode": {
                "href": "http://api.tvmaze.com/episodes/1428618"
              }
            }
          },
          {
            "id": 31910,
            "url": "http://www.tvmaze.com/shows/31910/boys",
            "name": "Boys",
            "type": "Scripted",
            "language": "Swedish",
            "genres": [
              "Drama"
            ],
            "status": "Ended",
            "runtime": 16,
            "premiered": "2015-10-12",
            "officialSite": "https://www.svt.se/boys/",
            "schedule": {
              "time": "",
              "days": [
                "Monday"
              ]
            },
            "rating": {
              "average": null
            },
            "weight": 0,
            "network": null,
            "webChannel": {
              "id": 190,
              "name": "SVT Play",
              "country": {
                "name": "Sweden",
                "code": "SE",
                "timezone": "Europe/Stockholm"
              }
            },
            "externals": {
              "tvrage": null,
              "thetvdb": 303373,
              "imdb": null
            },
            "image": {
              "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/127/319264.jpg",
              "original": "http://static.tvmaze.com/uploads/images/original_untouched/127/319264.jpg"
            },
            "summary": "<p>A story of two boys looking for their identity in a world where the traditional role of the man is changing. They are longing for success, endless love and passionate sex - but what happens if you fail?</p>",
            "updated": 1505429176,
            "_links": {
              "self": {
                "href": "http://api.tvmaze.com/shows/31910"
              },
              "previousepisode": {
                "href": "http://api.tvmaze.com/episodes/1299659"
              }
            }
          },
          {
            "id": 752,
            "url": "http://www.tvmaze.com/shows/752/my-boys",
            "name": "My Boys",
            "type": "Scripted",
            "language": "English",
            "genres": [
              "Drama",
              "Comedy"
            ],
            "status": "Ended",
            "runtime": 30,
            "premiered": "2006-11-28",
            "officialSite": null,
            "schedule": {
              "time": "21:30",
              "days": [
                "Sunday"
              ]
            },
            "rating": {
              "average": null
            },
            "weight": 83,
            "network": {
              "id": 32,
              "name": "TBS",
              "country": {
                "name": "United States",
                "code": "US",
                "timezone": "America/New_York"
              }
            },
            "webChannel": null,
            "externals": {
              "tvrage": 10417,
              "thetvdb": 79600,
              "imdb": "tt0496356"
            },
            "image": {
              "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/6/15187.jpg",
              "original": "http://static.tvmaze.com/uploads/images/original_untouched/6/15187.jpg"
            },
            "summary": "<p>A comedy/drama centering on PJ Franklin, a twenty-something female sports writer for the Chigaco Sun-Times, whose 'family' consists of a bunch of lovable guys who share all her favorite pastimes - sports, poker and beer, but finding a boyfriend and making a future for herself can be tricky for a girl with so many men in her life!</p>",
            "updated": 1573154891,
            "_links": {
              "self": {
                "href": "http://api.tvmaze.com/shows/752"
              },
              "previousepisode": {
                "href": "http://api.tvmaze.com/episodes/66633"
              }
            }
          }]

        const settings = {
            dots:true,
            infinite:true,
            speed:500,
            arrows:true,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]
        };


        return(
            <>
            <NavBarComponent />
            <div className="gallery">
            <Slider className="slider-back" {...settings}>
                {data.map((item) => {
                 return   <CardComponent showName={item.name} showLang = {item.language} showDate = {item.premiered} showImg={item.image.medium}/>
                })}
            </Slider>
            </div>
            </>
        )
    }

}

export default HomePage;
