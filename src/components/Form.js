import React from "react";

export default ({ handleglobalsearch, onAddBookQueryChange, newquery }) => {
  
  return (
    <div className="form-container">
   
        <div className="form-group">
          <input
            className="col-12 form-control"
            name="book_query"
            onChange={onAddBookQueryChange}
            type="text"
            value={this.state.newquery.book_query}
            placeholder="Search Your Books Here..."
          />
        </div>
       
        <button  className="btn btn-primary" onClick={handleglobalsearch}>
          Submit
        </button>
      
    </div>
  );
};
