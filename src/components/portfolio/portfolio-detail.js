import React, {Component} from "react";
import PortfolioContainer from "../portfolio/portfolio-container";
import axios from "axios";

export default class PortfolioDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            portfolioItem: {

            },
        }
    }

    componentDidMount() {
        this.getPortfolioItem();
    }

    getPortfolioItem() {
        axios.get(`https://jacqobin.devcamp.space/portfolio/portfolio_items/${this.props.match.params.slug}`,
            { withCredentials: true }
         ).then(res => {
            console.log(res);
            this.setState({ 
                portfolioItem: res.data.portfolio_item,
            })
        }).catch(err => {
            console.log("Get portfolio item err: ", err);
        })
    }
    render() {
        const { 
            banner_image_url,
            category,
            description,
            logo_url,
            name,
            thumb_image_url,
            url
        } = this.state.portfolioItem;

        const bannerStyles = {
            backgroundImage: `url(${banner_image_url})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center"
        }

        const logoStyles = {
            width: "200px",
        }


        return (
            <div className="portfolio-detail">
                <h2>{name}</h2>
                <h4>{category}</h4>
                <div className="banner" style={bannerStyles}>
                    <img src={logo_url} style={logoStyles}/>
                </div>
                
                <div className="portfolio-detail-description-wrapper">
                    <div className="description">{description}</div>
                </div>
                <div className="bottom-content-wrapper">
                    <a href={url} className="site-link" target="_blank">
                        Link to {name}
                    </a>
                </div>
            </div>
        );
    }
}