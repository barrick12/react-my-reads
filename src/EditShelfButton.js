import React from 'react'
import './App.css'

export function EditShelfButton(props){
	return(
		<div className="book-shelf-changer">				
			<select onChange={ (event) => {props.handleEditShelfButton(event.target.value, props.bookId)} }
					selected="selected" 
					value={props.bookShelf}>					
				<option value="move" disabled>Move to...</option>
				<option value="currentlyReading">Currently Reading</option>
				<option value="wantToRead">Want to Read</option>
				<option value="read">Read</option>
				<option value="none">None</option>
			</select>
		</div>
	)
}

