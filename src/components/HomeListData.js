import React, { Component } from 'react';
import '../css/Styles.css';
import styled from 'styled-components';
import DigitRoll from "digit-roll-react";
export class HomeListData extends Component {
    render() {
        return (
            <HomeListDataFrag>
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
        </HomeListDataFrag>
        )
    }
}

export default HomeListData
const HomeListDataFrag = styled.nav `
height: 150vh !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;

    .DigitRoll__Cell {
        background-color: #2a2a72;
        
      border-color: chartreuse;
      }
      .Digit{
          padding-left: 1rem !important;
          line-height: 2rem;
      }
      .Digit2{
        padding-left: 3.5rem !important;
        line-height: 2rem;
    }
      .DigitRoll {
        text-align: center !important;
        font-size: 38px;
        color: #fdfdff;
       
        font-weight: 300;
        border: none !important;
        padding-left: 2.5rem;
        
        
        
      }
      
      .DigitRoll__Divider {
        width: 100%;
        
      }
      


`