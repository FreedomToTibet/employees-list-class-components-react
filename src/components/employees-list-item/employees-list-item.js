import React from 'react';

import './employees-list-item.css';

const EmlpoyeesListItem = (props) => {

	const { name, salary, onDelete, onToggleProperty, increase, rise } = props;

	let classNames = "list-group-item d-flex justify-content-between";

	return (
		<li className={ `${classNames} ${increase ? "increase" : ""} ${rise ? "like" : ""}` }>
			<span className="list-group-item-label"
				onClick={ onToggleProperty } 
				data-toggle="rise">{name}</span>
			<input type="text" className="list-group-item-input" defaultValue={salary + '$'} />
			<div className="d-flex justify-content-center align-items-center">

				<button type="button" className="btn-cookie btn-sm"
					onClick={ onToggleProperty } 
					data-toggle="increase">
					<i className="fas fa-cookie"></i>
				</button>

				<button type="button" className="btn-trash btn-sm"
					onClick={ onDelete }>
					<i className="fas fa-trash"></i>
				</button>

				<i className="fas fa-star"></i>
			</div>
		</li>
	);
}

export default EmlpoyeesListItem;