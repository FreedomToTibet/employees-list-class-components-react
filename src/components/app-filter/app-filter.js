import './app-filter.css';

const AppFilter = (props) => {

	const buttonsData = [
		{name: 'all', label: 'All'},
		{name: 'rise', label: 'Career plan'},
		{name: 'more', label: 'Salary over 1000$'}
	];

	const buttons = buttonsData.map(({ name, label }) => {

		const isActive = props.filter === name;
		const classBtn = isActive ? 'btn-light' : 'btn-outline-light';

		return (
			<button type='button'
							className={ `btn ${classBtn}` }
							key={name}
							onClick={() => props.onFilterSelect(name)} >
								{label}
			</button>
		) 
	})

	return (
		<div className="btn-group">
			{ buttons }
		</div>
	);
}

export default AppFilter;