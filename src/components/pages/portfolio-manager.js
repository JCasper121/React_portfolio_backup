import React, { Component} from "react";
import axios from "axios";
import PortfolioSidebarList from "../portfolio/portfolio-sidebar-list";
import PortfolioForm from "../portfolio/portfolio-form";
export default class PortfolioManager extends Component {
    constructor() {
        super();

        this.state = {
            portfolioItems: [],
            isLoading: false,
            data: [],
            portfolioToEdit: {}


        }
        this.handleNewFormSubmission = this.handleNewFormSubmission.bind(this);
        this.handleEditFormSubmission = this.handleEditFormSubmission.bind(this);
        this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.clearPortfolioToEdit = this.clearPortfolioToEdit.bind(this);
    }

    getPortfolioItems() {
        axios.get('https://johncasper.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc', {withCredentials: true})
            .then(response => {
                // handle success
                this.setState({
                    portfolioItems: [...response.data.portfolio_items]
                })
            })
            .catch(error => {
                // handle error
                console.log("Error: ", error);
            })
            .then(function () {
                // always executed
            });
    }

    handleNewFormSubmission(portfolioItem) {
        this.setState({
            portfolioItems: [portfolioItem].concat(this.state.portfolioItems)
        })
    }

    handleEditFormSubmission() {
        this.getPortfolioItems();
    }

    handleFormSubmissionError(error) {
        console.log("handleFormSUbmission error: ", error);
    }

    handleDeleteClick(item) {
        axios.delete(
            `https://johncasper.devcamp.space/portfolio/portfolio_items/${item.id}`, 
            {withCredentials: true}
        ).then(response => {
            console.log("Response from delete: ", response);
            this.setState({
                portfolioItems: this.state.portfolioItems.filter(i => {
                    return i.id !== item.id;
                })
            })
            return response.data;
        }).catch(err => {
            console.log("Handle delte click error: ", err);
        })
    }

    handleEditClick(portfolioItem) {
        this.setState({
            portfolioToEdit: portfolioItem
        })
    }

    clearPortfolioToEdit() {
        this.setState({
            portfolioToEdit: {}
        })
    }


    componentDidMount() {
        this.getPortfolioItems();
    }

    render() {
        return (
            <div className="portfolio-manager-wrapper">
                <div className="left-column">
                    <PortfolioForm
                        handleNewFormSubmission = {this.handleNewFormSubmission}
                        handleEditFormSubmission = {this.handleEditFormSubmission}
                        handleFormSubmissionError = {this.handleFormSubmissionError}
                        clearPortfolioToEdit = {this.clearPortfolioToEdit}
                        portfolioToEdit = {this.state.portfolioToEdit}/>
                </div>
                <div className="right-column">
                    
                    <PortfolioSidebarList 
                        portfolioItems={this.state.portfolioItems} 
                        handleDeleteClick={this.handleDeleteClick}
                        handleEditClick={this.handleEditClick}/>
                </div>
            </div>
        )
    }
}