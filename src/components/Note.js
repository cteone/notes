import "./Note.css";
import { useState } from "react";

import { VscSymbolColor, VscTrash } from "react-icons/vsc";
import TextareaAutosize from "react-textarea-autosize";

function Note(props) {
	const [textareaHeight, setTextareaHeight] = useState(1);

	console.log(props);
	const color =
		props.note.color === "red"
			? "#F9C6C9"
			: props.note.color === "orange"
			? "#F7D9C4"
			: props.note.color === "yellow"
			? "#FAEDCB"
			: props.note.color === "green"
			? "#C9E4DE"
			: props.note.color === "blue"
			? "#C6DEF1"
			: props.note.color === "purple"
			? "#DBCDF0"
			: props.note.color === "pink"
			? "#F2C6DE"
			: props.note.color === "darkGray"
			? "#D2D2CF"
			: "#E2E2DF"; //light gray

	new Date(props.note.id).toLocaleDateString();

	return (
		<div className="note" style={{ background: color }}>
			<input
				type="text"
				onChange={(event) => props.changeNoteTitle(event, props.note.id)}
				className="note__title"
				value={props.note.title || ""}
				placeholder="Title"
			/>
			<TextareaAutosize
				placeholder="text"
				onChange={(event) => props.changeNoteContent(event, props.note.id)}
				value={props.note.content}
				className="note__body--input"
			/>
			<div className="note__footer">
				<p className="note__date">
					{new Date(props.note.id).toLocaleDateString()}
				</p>
				<div className="note__icon__container">
					<VscSymbolColor
						onClick={(event) =>
							props.changeColor(event, props.note.id, props.note.color)
						}
						style={{ className: "note__icon" }}
					/>
					<VscTrash
						onClick={(event) => props.deleteNote(event, props.note.id)}
						style={{ className: "note__icon" }}
					/>
				</div>
			</div>
			<div className="note__footer">
				<p className="note__date">
					{`Start: ${new Date(props.note.id).toLocaleDateString()}`}
				</p>
			</div>
		</div>
	);
}

export default Note;
