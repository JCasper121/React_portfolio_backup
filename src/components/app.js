import React, { Component } from 'react';
import moment from "moment";
import axios from "axios";
import NavigationComponent from "./navigation/navigation-container";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import BlogDetail from "./pages/blog-detail";
import PortfolioManager from "./pages/portfolio-manager";
import PortfolioDetail from "./portfolio/portfolio-detail";
import Auth from "./pages/auth";
import NoMatch from "./pages/no-match";
import Icons from "../helpers/icons";

import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'

export default class App extends Component {
  constructor(props){
    Icons();
    super(props);
    this.state = {
      loggedInStatus: "NOT_LOGGED_IN"
    }

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
  }

  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus:"LOGGED_IN"
    })
  }

  handleUnsuccessfulLogin() {
    this.setState({
      loggedInStatus:"NOT_LOGGED_IN"
    })
  }

  handleSuccessfulLogout() {
    this.setState({
      loggedInStatus:"NOT_LOGGED_IN"
    })
  }

  checkLoginStatus() {

    return axios.get("https://api.devcamp.space/logged_in", {
      withCredentials: true
    }).then( res => {
      const loggedIn = res.data.logged_in;
      const loggedInStatus = this.state.loggedInStatus;

      if(loggedIn && loggedInStatus === "LOGGED_IN") {

        return loggedIn;

      } else if(loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
        this.setState({
          loggedInStatus: "LOGGED_IN"
        })
      } else if(!loggedIn && loggedInStatus === "LOGGED_IN") {
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN"
        })
      }
    }).catch( err => {
      console.log("error", err)
    })
  }

  authorizedPages() {
    return [
      <Route key="portfolio-manager" path="/portfolio-manager" component={PortfolioManager}/>
    ]
  }

  // Lifecycle Hooks
  componentDidMount(){
    this.checkLoginStatus();
  }

  render() {
    return (
      <div className='container'>
        <BrowserRouter>
          <div>
            <NavigationComponent 
              loggedInStatus = {this.state.loggedInStatus} 
              handleSuccessfulLogout = {this.handleSuccessfulLogout}
              />
            <Switch>
              <Route exact path="/" component={Home}/>

              <Route 
                exact path="/auth"
                render = {
                  props => (
                    <Auth
                      {...props}
                      handleSuccessfulLogin = {this.handleSuccessfulLogin}
                      handleUnsuccessfulLogin = {this.handleUnsuccessfulLogin}
                      />
                  )
                }/>

              <Route path="/about-me" component={About}/>
              <Route path="/contact" component={Contact}/>
              <Route path="/blog" render = {
                props => (
                  <Blog {...props} loggedInStatus={this.state.loggedInStatus}/>
                )}/>,
              <Route path='/b/:slug' 
                render = {props => (
                  <BlogDetail 
                    {...props}
                    loggedInStatus={this.state.loggedInStatus}/>
                )}
                />,

              {this.state.loggedInStatus === "LOGGED_IN" ? this.authorizedPages() : null}

              <Route exact path="/portfolio/:slug" component={PortfolioDetail}/>
              <Route component={NoMatch} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
