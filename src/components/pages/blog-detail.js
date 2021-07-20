import React, { Component } from "react";
import axios from "axios";

export default class BlogDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentId: this.props.match.params.slug,
            blogItem: {}

        }


    }

    getBlogItem() {
        axios.get(
            `https://johncasper.devcamp.space/portfolio/portfolio_blogs/${this.state.currentId}`
            ).then(res => {
                this.setState({
                    blogItem: res.data.portfolio_blog
                })
            }).catch(err => {
                console.log("Get blog Item error: ", err);
            })
    }

    componentDidMount() {
        this.getBlogItem();
    }
    render() {
        const { 
            title,
            content,
            featured_image_url,
            blog_status
        } = this.state.blogItem;

        return(
            <div className="blog-container">
                <div className="content-container">
                    <h1>{title}</h1>
                    <hr/>
                    <div className="featured-image-wrapper">
                        <img src={featured_image_url}/>
                    </div>

                    <hr/>
                    <div className="content">
                        {content}
                    </div>
                </div>
            </div>
        )
    }
}

