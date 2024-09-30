import "./NoteContainer.css";

import Note from "./Note";
import { useEffect, useState } from "react";
//uuid is installed!!!!
function NoteContainer(props) {
	const noteElements = generateNoteElements();

	function generateNoteElements() {
		let array = [];
		const columns = Math.floor((props.windowWidth - 30) / 240); //250 = width of note
		for (let i = 0; i < columns; i++) {
			array.push([]);
		}
		props.notes.forEach((note, index) => {
			const noteJSX = (
				<Note
					key={note.id}
					note={note}
					deleteNote={props.deleteNote}
					changeNoteContent={props.changeNoteContent}
					changeNoteTitle={props.changeNoteTitle}
					changeColor={props.changeColor}
				/>
			);
			array[index % columns].push(noteJSX);
		});
		return (
			<div className="note-container--columns">
				{array.map((column, index) => (
					<div key={index} className="note-container--rows">
						{column}
					</div> //look out for key=index
				))}
			</div>
		);
	}

	return (
		<div className="note-container__wrapper">
			<div className="note-container--columns">{noteElements}</div>
		</div>
	);
}

export default NoteContainer;
