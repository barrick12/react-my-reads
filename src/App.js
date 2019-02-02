import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import { OpenSearchButton } from './OpenSearchButton.js'
import { SearchBooks} from  './SearchBooks.js'
import { BookShelf } from './BookShelf.js'

class BooksApp extends React.Component {
	constructor(props){
      	super(props);
  		this.state = {
			books: [],
			query: []
		}
     this.handleOnClick=this.handleOnClick.bind(this); 
	 this.handleOnChangeSearch=this.handleOnChangeSearch.bind(this); 
     this.handleOnClickShelf=this.handleOnClickShelf.bind(this);
    }

	componentDidMount(){
		BooksAPI.getAll().then(
			(returnedBooks) => {
				this.setState((currstate) => { return {books: returnedBooks}  })
			}
		)
	}
  
  	handleOnChangeSearch(query) {
        
			BooksAPI.search(query,20)        	
				.then( (returnedBooks) => { if (returnedBooks && !returnedBooks.error) {
			
					this.setState((currState) => {		
              	   
					    let newBooks = returnedBooks; 	
                  		console.log(newBooks);
                        let booksWithShelf= currState.query;                  		
                  		booksWithShelf.length=0;
                 
                        for(var i=0;i<newBooks.length;i++) {             	                                                                                                           							
                          let bookFound = false;
                          for (var j=0;j<currState.books.length;j++){
                            if(currState.books[j].id === newBooks[i].id) {bookFound=true; break;};
                          }
                            if (!bookFound) {                              	
                              	newBooks[i].shelf= "none"                                             	
                          	}
                          	else {
                            	newBooks[i].shelf = currState.books[j].shelf;
                          	}
                          	booksWithShelf.push(newBooks[i]);
                        }
                        return {query:  [...booksWithShelf]};
					
					})
				}
				else {this.setState((currState) => {return{query:[]}} )} 
				})
				
	}  

handleOnClick(value,bookId) {	
	BooksAPI.update({id: bookId},value).then ( (response)=>{ if(response && !response.error) {
		if (value.toLowerCase()==="none") {          	          	
			this.setState( (currState)=> { 
				let newState = currState;               
				return { books: newState.books.filter( (b)=> b.id !== bookId ) } 
			} )
					
		}
		else {
			this.setState( (currState)=> { 
				let newState = currState.books;
				for(var i=0; i<newState.length; i++) {
				  if (newState[i].id === bookId) {
					newState[i].shelf = value;
					break;
				  }                  
				}			            
				return{ books: newState };            
			})
		}   
		
	}})
}
  
  /*
	handleOnClick(value,bookId) {	
  		if (value.toLowerCase()==="none") {          	          	
          	this.setState( (currState)=> { 
              let newState = currState;               
              return { books: newState.books.filter( (b)=> b.id !== bookId ) } 
            } )
          BooksAPI.update({id: bookId},value);          
        }
       	else {
          this.setState( (currState)=> { 
			let newState = currState.books;
            for(var i=0; i<newState.length; i++) {
              if (newState[i].id === bookId) {
                newState[i].shelf = value;
                break;
              }                  
            }			
            BooksAPI.update( {id: bookId}, value);
            return{ books: newState };            
            }           
            )          
        }   
	}
  */
  handleOnClickShelf(value,bookId) {
   	this.setState((currState)=>{
    
    let newBooks = currState.books;
    let newQuery = currState.query;

    let existingBook = newBooks.filter( (b)=>(b.id === bookId));
      
    if( typeof existingBook === 'undefined' || existingBook.length === 0 ) { 
      var newBook = newQuery.filter((b)=>(b.id===bookId))
	  
	  for(var k =0; k<newQuery.length; k++) {      
      		if (newQuery[k].id===bookId) {newQuery[k].shelf = value; break;}          
        } 
      return { books: newBooks.concat( { ...newBook[0], shelf: value} ), query: newQuery };
    }
    else{
    	for(var i =0; i<newBooks.length; i++) {      
      		if (newBooks[i].id===bookId) {newBooks[i].shelf = value; break;}          
        }
      return { books: newBooks};
    }    
      
  })
   	BooksAPI.update( {id: bookId}, value);
  }
  
  
	render() {
		return (          
        <div>
          
        <Route exact path='/' render={() => ( 
        <div className="app">           
				<div className="list-books">
					<div className="list-books-title">
						<h1>MyReads</h1>
					</div>
             
					<div className="list-books-content">
						<div>
							<BookShelf bookShelfName={"Currently Reading"}	books={ this.state.books.filter( (b)=> b.shelf==="currentlyReading" ) } 
																			handleEditShelfButton={this.handleOnClick} />
							<BookShelf bookShelfName={"Want To Read"} 	books={ this.state.books.filter( (b)=> b.shelf==="wantToRead" ) } 
																		handleEditShelfButton={this.handleOnClick}/>
							<BookShelf bookShelfName={"Read"} 	books={ this.state.books.filter( (b)=> b.shelf==="read" ) } 
																handleEditShelfButton={this.handleOnClick}/>
						</div> 
					</div> 
					<OpenSearchButton handleOnChangeSearch={this.handleOnChangeSearch}/>
                    
				</div>			
		</div>
		)} />

		<Route path='/search' render={() => ( 
		<SearchBooks shelvedBooks={this.state.query} handleOnChangeSearch={(event)=>this.handleOnChangeSearch(event)} handleOnClickShelf={this.handleOnClickShelf}  /> 
 		)} />

		</div>
		)
	}
}


export default BooksApp