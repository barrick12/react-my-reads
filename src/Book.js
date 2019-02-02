import React from 'react'
import './App.css'
import { EditShelfButton } from './EditShelfButton'

export function Book(props){
	if(props.book === undefined) {return (<p></p>) };
  	let bookImageUrl= ( props.book.imageLinks === undefined || props.book.imageLinks.thumbnail === undefined) ? "" : props.book.imageLinks.thumbnail ;
	return(
		<div className="book">
			<div className="book-top">
				<div className="book-cover" style={{ width: 128, height: 193, background: 'url(' + bookImageUrl + ')', alt:"Missing thumbnail" }}>
				</div>
				<EditShelfButton 	handleEditShelfButton={props.handleEditShelfButton}
									bookId={props.book.id}
									bookShelf={props.book.shelf}/>
			</div>
			<div className="book-title">{ (props.book.title===undefined) ? "" : props.book.title }</div>
			<div className="book-authors">{ (props.book.authors===undefined) ? "" : props.book.authors[0]} </div>
		</div>
	)
}


