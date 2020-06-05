import React, { Component } from 'react'

export default class BookqueryDis extends Component {
    render() {
        return (
            <div className="container1">
                <div className="row">

                <div className="row my-2 text-capitalize text-center">
                    <p >Book Title: {this.props.Book_Title }</p>
            
                    </div>
                    <div className="row my-2 text-capitalize text-center">
              
              <p >Book Author:{ this.props.Book_Author}</p>
             
                    </div>
                    <div className="row my-2 text-capitalize text-center">
                  
              <p>Book Classification:{ this.props.Book_Classification_No}</p>
        
                    </div>
                    <div className="row my-2 text-capitalize text-center">
                
              
              <p >Book Scope: { this.props.Book_Scope}</p>
            
                    </div>
                 <div className="row my-2 text-capitalize text-center">
              <p >Book Status: { this.props.Book_Status}</p>
                    </div>

                    <div className="row my-2 text-capitalize text-center">
              <p >Author_Title: { this.props.Author_Title}</p>
                    </div>
                </div>
                
            </div>
        )
    }
}
