import React, { Component } from 'react'

export default class WorkinProgress extends Component {
    render() {
        return (
            <div className="work-prog">
            <div className="content has-text-centered">
                <img className="work-prog-img" src={require('../../images/Work-in-Progress.gif')} /> 
                
                </div>
            </div>
        )
    }
}
