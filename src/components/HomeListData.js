import React, { Component } from 'react';
import '../css/Styles.css';
import DigitRoll from "digit-roll-react";
export class HomeListData extends Component {
    render() {
        return (
            <div class="parallax section lb">
            <div class="container">
                <div class="row text-center stat-wrap">
                    <div class="col-md-3 col-sm-6 col-xs-12">
                        <span data-scroll class="global-radius icon_wrap effect-1"><i class="flaticon-briefcase"></i></span>
                       <DigitRoll num={22535} length={5} divider="" delay="3" />
                        <h3>Books</h3>
                    </div>
    
                    <div class="col-md-3 col-sm-6 col-xs-12">
                        <span data-scroll class="global-radius icon_wrap effect-1"><i class="flaticon-happy"></i></span>
                        <div className="Digit">
                        <DigitRoll num={3210} length={4} divider="" delay="3" />
                        </div>
                        <h3>Journals</h3>
                    </div>
    
                    <div class="col-md-3 col-sm-6 col-xs-12">
                        <span data-scroll class="global-radius icon_wrap effect-1"><i class="flaticon-idea"></i></span>
                        <div className="Digit">
                        <DigitRoll num={8210} length={4} divider="" delay="3" /></div>
                        <h3>Articles</h3>
                    </div>
    
                    <div class="col-md-3 col-sm-6 col-xs-12">
                        <span data-scroll class="global-radius icon_wrap effect-1"><i class="flaticon-customer-service"></i></span>
                        <div className="Digit2">
                        <DigitRoll num={30} length={2} divider="" delay="3" /></div>
                        <h3>Members</h3>
                        
                    </div>
                </div>
            </div>
        </div>
    
        )
    }
}

export default HomeListData
