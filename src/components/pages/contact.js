import React from "react";
import contactPicture from "../../../static/assets/images/auth/login.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import ReactTooltip from "react-tooltip";

const contactMethods = {};

contactMethods["email"] = "johncasper121@gmail.com";
contactMethods["phone"] = "(208) 761 - 1056";
contactMethods["location"] = "Boise, ID";


function handleCopyText(contactType) {
    console.log("In handle copy text\ncontactMethods: ", contactMethods, "contactType: ", contactType);
    const contactMethod = contactMethods[contactType];
    console.log("Method: ", contactMethod);
    navigator.clipboard.writeText(contactMethod);

}

export default function() {
    return (
        <div className="content-page-wrapper">
            <div 
                className="left-column"
                style={{
                    background: `url(${contactPicture})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}/>
            <div className="right-column">
                
                <div className="contact-info-wrapper">
                    <div className="contact-item">
                        <div className="contact-text">{contactMethods["email"]}</div>
                        <div className="contact-icon">
                            <FontAwesomeIcon 
                                onClick={() => {handleCopyText("email")}} 
                                icon="envelope-open-text"/>
                        </div>
                    </div>
                    <div className="contact-item">
                        <div className="contact-text">{contactMethods["phone"]}</div>
                        <div className="contact-icon">
                            <FontAwesomeIcon 
                                onClick={() => {handleCopyText("phone")}} 
                                icon="phone"/>
                        </div>
                    </div>
                    <div className="contact-item">
                        <div className="contact-text">{contactMethods["location"]}</div>
                        <div className="contact-icon">
                            <FontAwesomeIcon 
                                onClick={() => {handleCopyText("location")}} 
                                icon="map-marker-alt"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}