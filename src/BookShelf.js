import React from 'react'
import './App.css'
import { Book } from './Book.js'

export function BookShelf(props){
	return(	
		<div className="bookshelf">
			<h2 className="bookshelf-title">{props.bookShelfName}</h2>
			<div className="bookshelf-books">
				<ol className="books-grid">				
					{props.books.map( (b) => (<li key={b.id}><Book book={b} handleEditShelfButton={props.handleEditShelfButton}/></li> ) )}
				</ol>
			</div>
		</div>		
	)
}

