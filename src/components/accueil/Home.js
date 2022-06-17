import React, {Component } from "react";
import "./home.css"
import Footer from "../footer/Footer";
import ArticleL from "../article/Article_L"
import ArticleR from "..//article/Article_R"
import Navbar from "../navbar/Navbar";




function Home (){
    return (
         <div className="home" id="home">
             <div className="home_page">
            <Navbar/>
            <div className="titre">     
                 <p className="text_titre">Welcome to</p>
                 <div className="img"></div>
                 </div>
                 <h5 className="paragrahe">Find a Conference, Apply and Participate</h5>
                 <button className="btn_t"><p>View Conferences</p></button>    
            </div>
            <div className="classarticle">
            <ArticleL 
                titre="chosse a conference"
                para="In the conferences page, you can
                find all conferences available to participate in,
                you can use the filters to find the best one
                for you, pick then click apply
                for conference to submit your article."
            />
            <ArticleR
                titre="Apply for a conference"
                para="After choosing a conference, you can
                apply for it, upload your articles, answer some
                few questions and wait for review, you can check 
                the status of these articles from your profile page."
            />
            <ArticleL
               titre="Wait for results" 
               para=" After applying for a conference,
               our reviewers will validate your article and
               score it according to a specific and detailed
               process, as soon as the review is over, you will
               be notified about the status of your
               application."
            />
            </div>
            <Footer/>
         </div>
    ) 
     
    
}

export default Home