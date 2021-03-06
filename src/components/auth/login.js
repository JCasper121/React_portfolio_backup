import React, { Component} from "react";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            errorText: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    
    handleChange(event) {
        this.setState({
            errorText: ""
        })
        
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        axios.post("https://api.devcamp.space/sessions",
        {
            client: {
                email: this.state.email,
                password: this.state.password
            }
        },
        { withCredentials: true }

        ).then(res => {
            if(res.data.status === "created") {
                //debugger;
                this.props.handleSuccessfulAuth();
                
            }else {
                this.setState({ 
                    errorText: "Invalid email or password"
                })
                this.props.handleUnsuccessfulAuth();
            }
        }).catch(err => {
            this.setState({
                errorText: "An error occurred."
            });
            console.log("Unsuccessful", err);
            this.props.handleUnsuccessfulAuth();
        });

        event.preventDefault();

    }

    render() {
        return(
            <div>
                <h1>LOGIN TO ACCESS YOUR DASHBOARD</h1>
                <div>{this.state.errorText}</div>
                <form onSubmit={this.handleSubmit} className="auth-form-wrapper">
                    <div className="form-group">
                        <FontAwesomeIcon icon="envelope-open-text"/>
                        <input 

                            type="email"
                            name="email"
                            placeholder="Your email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            />

                    </div>
                    <div className="form-group">
                        <FontAwesomeIcon icon="lock"/>
                        <input 

                            type="password"
                            name="password"
                            placeholder="Your password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            />

                    </div>
                        <button className="btn" type="submit">Login</button>
                </form>
            </div>
        )
    }
}