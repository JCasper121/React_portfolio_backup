import React, {Component} from 'react';
import axios from 'axios';
import RichTextEditor from "../forms/rich-text-editor";
import DropzoneComponent from "react-dropzone-component";

export default class BlogForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            blog_status: '',
            content: "",
            featured_image: ""
        }


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRichTextEditorChange = this.handleRichTextEditorChange.bind(this);

        this.componentConfig = this.componentConfig.bind(this);
        this.djsConfig =  this.djsConfig.bind(this);
        this.handleFeaturedImageDrop = this.handleFeaturedImageDrop.bind(this);

        this.featuredImageRef = React.createRef();

    }

    componentConfig() {
        return {
            iconFiletypes: [".jpg", ".png"],
            showFiletypeIcon: true,
            postUrl: "https://httpbin.org/post"
        }
    }

    djsConfig() {
        return {
            addRemoveLinks: true,
            maxFiles: 1
        }
    }

    handleFeaturedImageDrop() {
        return {
            addedfile: file => this.setState({
                featured_image : file
            })
        }
    }

    handleRichTextEditorChange(content) {
        this.setState({content})
    }

    buildForm() {
        let formData = new FormData();

        formData.append("portfolio_blog[title]", this.state.title);
        formData.append("portfolio_blog[blog_status]", this.state.blog_status);
        formData.append("portfolio_blog[content]", this.state.content);
        
        if(this.state.featured_image) {
            
            formData.append("portfolio_blog[featured_image]", this.state.featured_image);
        }

        return formData;
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        axios.post(
            "https://johncasper.devcamp.space/portfolio/portfolio_blogs",
             this.buildForm(),
             {withCredentials: true}
        ).then(res => {

            if(this.state.featured_image) {
                this.featuredImageRef.current.dropzone.removeAllFiles();
            }

            this.setState({
                title: '',
                blog_status: '',
                content: ''
            });


            this.props.handleSuccessfulBlogFormSubmission(res.data.portfolio_blog);
            
        }).catch(err => {
            console.log("Handle submit blog error: ", err);
        })
        event.preventDefault();
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit} className="blog-form-wrapper">
                <div className="two-column">
                    <input
                        name="title"
                        onChange={this.handleChange}
                        placeholder="Blog Title"
                        type="text"
                        value={this.state.title}/>
                    <input 
                        name="blog_status"
                        onChange={this.handleChange}
                        placeholder="Blog Status"
                        type="text"
                        value={this.state.blog_status}/>
                </div>
                <div className="one-column">
                    <RichTextEditor
                        handleRichTextEditorChange = {this.handleRichTextEditorChange}
                    />
                </div>
                <div className="image-uploaders">
                    <DropzoneComponent
                        ref={this.featuredImageRef}
                        config = {this.componentConfig()}
                        djsConfig= {this.djsConfig()}
                        eventHandlers = {this.handleFeaturedImageDrop()}
                        >
                            <div className="dz-message">Featured Image</div>
                        </DropzoneComponent>
                </div>
                <button className="btn">Save</button>
            </form>
        )
    }
}