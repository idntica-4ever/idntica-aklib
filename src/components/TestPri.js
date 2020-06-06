import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Form from "./Form";


export default class TestPri extends Component {
    constructor(props) {
        super(props);
        this.state = {
          post: {
            query: ""
           
          },
          jobs: []
        };
    }
   // handle global search
   handleChange = e => {
    const { query, value } = e.target;

    this.setState(prevState => ({
      post: { ...prevState.post, [query]: value }
    }));
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState(prevState => ({
      jobs: [...prevState.jobs, prevState.post],
      post: { query: ""}
    }));
  };




    render() {
        return (
            <div className="App">
        
        
        <Form
          handleChange={this.handleChange}
          post={this.state.post}
          handleSubmit={this.handleSubmit}
        />
        <div className="post-container">
          <ul>
            {this.state.jobs.map((job, index) => (
              <li key={index}>
                <ul className="post-tile">
                  <li className="post-tile-name">{job.name}</li>
                 
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
        )
    }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<TestPri />, rootElement);