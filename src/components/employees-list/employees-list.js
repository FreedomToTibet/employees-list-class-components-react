import React from 'react';

import EmployeesListItem from '../employees-list-item';
import './employees-list.css';

const EmployeesList = ({ data, onDelete, onToggleProperty }) => {

	const elements = data.map(item => {
		const {id, ...itemProps} = item;
		
		return (
			<EmployeesListItem 
					key={id} 
					{...itemProps} 
					onDelete={ () => onDelete(id) }
					onToggleProperty = { (e) => onToggleProperty(id, e.currentTarget.getAttribute('data-toggle')) }
			/>
		)
	});

	return (
		<ul className="app-list list-group">
			{elements}
		</ul>
	);
}

export default EmployeesList;