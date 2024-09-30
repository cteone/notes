import "./Header.css";
import { VscAdd } from "react-icons/vsc";

function Header(props) {
	return (
		<div className="header">
			<button className="new-note__button" onClick={props.newNote}>
				<VscAdd />
			</button>
			<button className="sort__button" onClick={props.changeSort}>
				{props.sort}
			</button>
		</div>
	);
}

export default Header;
