import { directive } from "babel-types";
import React, { Component } from "react";
import {Link} from "react-router-dom";
import PortfolioItem from "./portfolio-item";
import axios from "axios";


export default class PortfolioContainer extends Component {
    constructor() {
        super();

        this.state = {
            pageTitle: "Welcome to my portfolio",
            isLoading: false,
            data: []


        }

        this.handleFilter = this.handleFilter.bind(this);
    }

    handleFilter(filter) {
        if(filter == "CLEAR_FILTERS") {
            this.getPortfolioItems();
        } else {
            this.getPortfolioItems(filter);
        }
    }

    getPortfolioItems(filter = null) {
        axios.get('https://johncasper.devcamp.space/portfolio/portfolio_items')
            .then(response => {
                // handle success
                if(filter) {
                    this.setState({
                        data: this.state.data.filter(i => {
                            return i.category === filter;
                        })
                    })
                }else {
                    this.setState({
                        data: response.data.portfolio_items
                    })
                }
            })
            .catch(error => {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    portfolioItems() {
        return this.state.data.map(item => {
            return <PortfolioItem
                key={item.id}
                item={item} />;
        })
    }

    componentDidMount() {
        this.getPortfolioItems();
    }

    render() {
        if (this.state.isLoading) {
            return <div>Loading...</div>;
        }

        return (
            <div className="homepage-wrapper">
                <div className="filter-links">

                    <button className="btn" onClick={() => this.handleFilter("Scheduling")}>
                        Scheduling
                    </button>
                    <button className="btn" onClick={() => this.handleFilter("Enterprise")}>
                        Enterprise
                    </button>
                    <button className="btn" onClick={() => this.handleFilter("Education")}>
                        Education
                    </button>
                     <button className="btn" onClick={() => this.handleFilter("CLEAR_FILTERS")}>
                        All
                        </button>
                        {/*<button className="btn" onClick={() => this.handleFilter("Technology")}>
                        Technology
                        </button>
                        <button className="btn" onClick={() => this.handleFilter("Delivery")}>
                        Delivery
                    </button> */}
                    </div>
                <div className="portfolio-items-wrapper">
                    {this.portfolioItems()}
                </div>
            </div>
        )
    }
}