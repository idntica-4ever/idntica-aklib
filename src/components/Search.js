import React from 'react';
import '../Search.css';
import axios from 'axios';

import PageNavigation from './PageNavigation';
//import Bookquery from './Bookquery';
import BookqueryDis from './BookqueryDis';

const config = require('../config.json');


class Search extends React.Component {

	constructor( props ) {
		super( props );

		this.state = {
			query: '',
			results: {},
			loading: false,
			message: '',
			totalResults: 0,
			totalPages: 0,
			currentPageNo: 0,
		};

		this.cancel = '';
	}







	/**
	 * Get the Total Pages count.
	 *
	 * @param total
	 * @param denominator Count of results per page
	 * @return {number}
	 */
	getPageCount = ( total, denominator ) => {
		const divisible	= 0 === total % denominator;
		const valueToBeAdded = divisible ? 0 : 1;
		return Math.floor( total/denominator ) + valueToBeAdded;
	};

	/**
	 * Fetch the search results and update the state with the result.
	 * Also cancels the previous query before making the new one.
	 *
	 * @param {int} updatedPageNo Updated Page No.
	 * @param {String} query Search Query.
	 *
	 */
    
         // handle global search
  handleglobalsearch = async(book_query, event) => {
    event.preventDefault();
   try {

      const params = {
        "book_query": book_query
      };
      const res = await axios.get(`${config.api.invokeUrl}/books/global-book-search/${book_query}`, params);
      this.setState({ queries: res.data });

     this.assignSearchedresults();
     // validating search results

    } catch (error) {
      console.log(`An error has occurred: ${error}`);
    }
  }

     fetchSearchResults = async( updatedPageNo = '', query ) => {
        console.log ("query:", query);
		const pageNumber = updatedPageNo ? `&page=${updatedPageNo}` : '';
       
        try {

            const params = {
              "book_query": query
            };
      
			console.log("Fetching API for query : ", query);
			
            const res = await axios.get(`${config.api.invokeUrl}/books/global-book-search/${query}`, params);
           this.setState({ queries: res.data });
           
                const total = res.data.total;
                
				const totalPagesCount = this.getPageCount( total, 20 );
				//console.log("Length : ", res.data.hits.length);
				const resultNotFoundMsg = ! res.data.hits.length
										? 'There are no more search results. Please try a new search'
										: '';
                console.log("Fetched Data", total);
                this.setState( {
					results: res.data.hits,
					message: resultNotFoundMsg,
					totalResults: total,
					totalPages: totalPagesCount,
					currentPageNo: updatedPageNo,
					loading: false
				} )
			} 
			catch (err) {
                console.log(`An error has occurred: ${err}`);
              }
	};

	handleOnInputChange = ( event ) => {
		const query = event.target.value;
		if ( ! query ) {
			this.setState( { query, results: {}, message: '', totalPages: 0, totalResults: 0 } );
		} else {
			this.setState( { query, loading: true, message: '' }, () => {
				this.fetchSearchResults( 1, query );
			} );
		}
	};

	/**
	 * Fetch results according to the prev or next page requests.
	 *
	 * @param {String} type 'prev' or 'next'
	 */
	handlePageClick = ( event ) => {
		event.preventDefault();
		const updatePageNo = 'prev' === event
			? this.state.currentPageNo - 1
			: this.state.currentPageNo + 1;

		if( ! this.state.loading  ) {
			this.setState( { loading: true, message: '' }, () => {
				this.fetchSearchResults( updatePageNo, this.state.query );
			} );
		}
	};



	renderSearchResults = () => {
		const { results } = this.state;

		if ( Object.keys( results ).length && results.length ) {
			return (
				<div className="results-container">
                    { results.map( result => {
                        return( <BookqueryDis Book_Title= {result.Book_Title} 
                            Book_Author={result.Book_Author} Book_Classification_No={result.Book_Classification_No} 
                            Book_Status={result.Book_Status} Book_Scope={result.Book_Scope} key={result.author_title} />
                          
                            
                            )
                            
                    }
                   
                 ) }
               
				</div>
			)
		}
	};

					
							//<a key={ result.Book_Titile } href={ result.previewURL } className="result-item">
								//<h6 className="image-username">{result.user}</h6>
								//<div className="image-wrapper">
								//	<img className="image" src={ result.previewURL } alt={`${result.username} image`}/>
							//	</div>
							//</a>
					
	render() {
		const { query, loading, message, currentPageNo, totalPages} = this.state;

		const showPrevLink = 1 < currentPageNo;
        const showNextLink = totalPages > currentPageNo;
        
        const booklist = this.state.queries && this.state.queries.length > 0
        ?this.state.queries.map(result => <BookqueryDis Book_Title= {result.Book_Title} 
          Book_Author={result.Book_Author} Book_Classification_No={result.Book_Classification_No} 
          Book_Status={result.Book_Status} Book_Scope={result.Book_Scope} Author_Title={result.Author_Title} key={result.Author_Title} />)
        : <div className="tile notification is-warning">NO BOOKS / AUTHOR found.... Try again...</div> 
       
		return (
			<div className="container">
			{/*	Heading*/}
			<h2 className="heading">Arul Kadal Library</h2>
			{/* Search Input*/}
			<label className="search-label" htmlFor="search-input">
				<input
					type="text"
                    name="query"
                    
					value={ query }
					id="search-input"
					placeholder="Search..."
                    onChange={this.handleOnInputChange}
                    
				/>
				<i className="fa fa-search search-icon" aria-hidden="true"/>
			</label>


		

			{/*	Result*/}
			{ this.renderSearchResults() }

			{/*Navigation*/}
			<PageNavigation
				loading={loading}
				showPrevLink={showPrevLink}
				showNextLink={showNextLink}
				handlePrevClick={ () => this.handlePageClick('prev')}
				handleNextClick={ () => this.handlePageClick('next')}
			/>
<div>
<div className="py-5">
              <div className="container">
                  
              <div className="row"> {booklist}</div></div></div>

</div>
			</div>
		)
	}
}

export default Search
