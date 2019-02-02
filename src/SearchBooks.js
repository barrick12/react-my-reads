import React from 'react'
import {Book} from './Book.js'
import './App.css'
import { Throttle } from 'react-throttle';
import { Link } from 'react-router-dom'


export function SearchBooks(props){
	return(
		<div className="search-books">
			<div className="search-books-bar">

        		<Link className="close-search" to="/" onClick={ (event)=>{props.handleOnChangeSearch(' '); }} >Close</Link>
				<div className="search-books-input-wrapper">
					<Throttle time="100" handler="onChange">
                      <input type="text" 
                              placeholder="Search by title or author" 
                              onChange={(event)=>{props.handleOnChangeSearch(event.target.value);   }}
                              />
					</Throttle>
				</div>
			</div>
			<div className="search-books-results">
				<ol className="books-grid">
					{props.shelvedBooks.map( (b) => (<li key={b.id}><Book book={b}  handleEditShelfButton={props.handleOnClickShelf}  /> </li> ) )} 
				</ol>
			</div>
		</div>
	)
}
