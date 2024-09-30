import "./App.css";
import Header from "./components/Header";
import ContentContainer from "./components/ContentContainer";
import NoteContainer from "./components/NoteContainer";

import { useState, useEffect } from "react";

import notesData from "./notesData";

function App() {
	const [notes, setNotes] = useState([]);

	const [width, setWidth] = useState(1209);

	const [sort, setSort] = useState("date");

	useEffect(() => {
		function handleResize() {
			setWidth(window.innerWidth);
		}
		window.addEventListener("resize", handleResize);
		handleResize();
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [setWidth]);

	function handleChangeNoteContent(event, id) {
		setNotes((prevNotes) => {
			return prevNotes.map((note) => {
				return note.id === id ? { ...note, content: event.target.value } : note;
			});
		});
	}

	function handleChangeNoteTitle(event, id) {
		setNotes((prevNotes) => {
			return prevNotes.map((note) => {
				return note.id === id ? { ...note, title: event.target.value } : note;
			});
		});
	}

	function handleDelete(event, id) {
		//event.stopPropegation() //dont need???
		setNotes((prevNotes) => {
			return prevNotes.filter((note) => note.id !== id);
		});
	}

	function handleChangeColor(event, id, color) {
		const colorArray = [
			"red",
			"orange",
			"yellow",
			"green",
			"blue",
			"purple",
			"pink",
			"darkGray",
			"lightGray",
		];
		setNotes((prevNotes) => {
			return prevNotes.map((note) => {
				if (note.id === id) {
					return {
						...note,
						color: colorArray[colorArray.indexOf(color) + 1],
					};
				} else {
					return note;
				}
			});
		});
	}

	function handleNewNote() {
		setNotes((prevNotes) => {
			return [
				{
					title: "New Note",
					content: "",
					color: "gray",
					state: "",
					lists: "",
					id: new Date().getTime(),
				},
				...prevNotes,
			];
		});
	}

	//https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
	function compareTitles(a, b) {
		if (a.title < b.title) {
			return -1;
		}
		if (a.title > b.title) {
			return 1;
		}
		return 0;
	}

	function compareDates(a, b) { //newest first
		if (a.id > b.id) {
			return -1;
		}
		if (a.id < b.id) {
			return 1;
		}
		return 0;
	}
	//EDIT!!!
	function handleSortNotes() {
		if (sort === "date") {
			setSort("title");
			setNotes((prevNotes) => prevNotes.sort(compareTitles));
		} else if (sort === "title") {
			setSort("color");
		} else if (sort === "color") {
			setSort("date");
			setNotes((prevNotes) => prevNotes.sort(compareDates))
		}
	}

	return (
		<div className="App">
			<Header newNote={handleNewNote} changeSort={handleSortNotes} sort={sort}/>
			<NoteContainer
				notes={notes}
				windowWidth={width}
				deleteNote={handleDelete}
				changeNoteContent={handleChangeNoteContent}
				changeNoteTitle={handleChangeNoteTitle}
				changeColor={handleChangeColor}
			/>
		</div>
	);
}

export default App;
