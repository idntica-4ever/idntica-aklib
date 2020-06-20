import React, { Component } from 'react';
import '../css/Styles.css';



export class SliderEffect extends Component {
    

    render() {
        return (
           
          <header class="top-navbar">
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container">
              <a class="navbar-brand" href="index.html">
                <img src="images/logo-seo.png" alt="" />
              </a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbars-seo" aria-controls="navbars-rs-food" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbars-seo">
                <ul class="navbar-nav ml-auto">
                  <li class="nav-item active">   <a href="/register" className="button is-primary">
                   <strong>Register</strong>
                   </a>

                   
                   </li>
                  <li class="nav-item"><a href="/" className="button is-primary">
                   <strong>Book Registration</strong>
                   </a></li>
                  <li class="nav-item"><a href="/" className="button is-primary">
                   <strong>Issuing Books</strong>
                   </a></li>
                 
                 
                </ul>
              </div>
            </div>
          </nav>
        </header>
        )
    }
}

export default SliderEffect
