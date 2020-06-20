import React from 'react';
import '../css/Styles.css';
import DigitRoll from "digit-roll-react";


export default function HomeContent() {
  return (
    <div className="tst-try">
      
        <div className="row">
          <div className="col">
          <div class="flip-box">
  <div class="flip-box-inner">
    <div class="flip-box-front">
      <h2>Total Books</h2>
    </div>
    <div class="flip-box-back">
     
    
                        <span data-scroll class="global-radius icon_wrap effect-1"><i class="flaticon-briefcase"></i></span>
                        <DigitRoll num={22535} length={5} divider="" delay="3" />
                       <h3>Total Books</h3>
                    

    </div>
  </div>
        </div>

          </div>
          <div className="col">
          <div class="flip-box">
  <div class="flip-box-inner">
    <div class="flip-box-front">
      <h2>Total Journals</h2>
    </div>
    <div class="flip-box-back">
      <h2>2,350</h2>
    </div>
  </div>
        </div>
          </div>
          <div className="col">
          <div class="flip-box">
  <div class="flip-box-inner">
    <div class="flip-box-front">
      <h2>Total Articles</h2>
    </div>
    <div class="flip-box-back">
      <h2>8,000</h2>
    </div>
  </div>
        </div>
          </div>
          <div className="col">
          <div class="flip-box">
  <div class="flip-box-inner">
    <div class="flip-box-front">
      <h2>Total Members</h2>
    </div>
    <div class="flip-box-back">
      <h2>30</h2>
    </div>
  </div>
        </div>
          </div>
        </div>
    </div>
  )
}
