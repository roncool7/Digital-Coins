/// <reference path="../jquery-3.4.1.js" />
"use strict";

$(function(){
//About page
    $("#aboutPage").click(function(){
        reportsActiveFlag = false;
        $("#showAll").empty();
        $("#progress").css("display", "none");
        $('#main-header').css('display','none');
        let html = `
        <div class="aboutMe-section">
        <div class="container">
            <div class="row">
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <div class="feature">
                        <div class="feature-box">
                            <div class="clearfix">
                                <div class="feature-content">
                                    <h4>Name & Age</h4>
                                    <p>Ron Ben Naim 28 Years old</p>
                                </div>
                            </div>
                        </div>
                        <div class="feature-box">
                            <div class="clearfix">
                                <div class="feature-content">
                                    <h4>City & Girl Friend</h4>
                                    <p>I live in Ramat Gan with my girlfriend, we have been together for 6 years and her profession is a teacher</p>
                                </div>
                            </div>
                        </div>
                        <div class="feature-box">
                            <div class="clearfix">
                                <div class="feature-content">
                                    <h4>My Life</h4>
                                    <p>Originally I'm from Dimona, we have family business in Dimona over 15 years of sweets, toys, food, home goods, so my whole life I've been dealing with customers, goods and people management.</p>
                                </div>
                            </div>
                        </div>
                        <div class="feature-box">
                            <div class="clearfix">
                                <div class="feature-content">
                                    <h4>My Hobbies</h4>
                                    <p>One of my main hobbies is to play strategy games on the cell phone
                                        My competitive nature I love games that have something to fight for.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <div class="aboutMe-banner">
                        <img src="./assets/about.PNG" height="350px" alt="Me :-)" id="aboutMe">
                    </div>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <div class="aboutMe">
                        <h2 class="aboutMe-title">About The Project</h2>
                        <p class="aboutMe-text">This project presents currency types, their value in dollars, euros, and shekels.</p>
                        <p class="aboutMe-text">On the site you can find more information about the currency.</p>
                        <p class="aboutMe-text">When possible, add currency to your list of reports.</p>
                        <p class="aboutMe-text">And see in real time the value of the coins in the graph.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Footer -->
    <footer class="page-footer" style="background-color: gold;">
        <div class="footer-copyright text-center py-4">Ron Ben Naim© 2020 Copyright</div>
      </footer>`;
        $("#showAll").html(html);
        // effect
        var fadeInText = $(".feature-content");
        var i = 0;
        var loop = window.setInterval(function () {
            $(fadeInText[i]).css('visibility',"visible");
            if (i == fadeInText.length)
                clearInterval(loop);
            i++;
        }, 1000);
    });
});