import React, { Component } from 'react';
import nextId from "react-id-generator";

import AppInfo from '../app-info';
import SearchPanel from '../search-panel';
import AppFilter  from '../app-filter';
import EmployeesList from '../employees-list';
import EmployeesAddForm from '../employees-add-form';

import './app.css';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [
				{name: 'Jhon C.', salary: 800, increase: false, rise: true, id: 1},
				{name: 'Alex M.', salary: 1800, increase: true, rise: false, id: 2},
				{name: 'Carl S.', salary: 2300, increase: false, rise: false, id: 3}
			],
			term: '',
			filter: 'all'
		}
	}

	onDeleteItem = (id) => {
		this.setState(({ data }) => {
			return {
				data: data.filter((el) => el.id !== id)
			};
		});
	};

	addItem = (name, salary) => {

		const itemId = nextId();

		const newItem = {
			name,
			salary,
			increase: false,
			raise: false,
			id: itemId
		}

		this.setState(({ data }) => {
			const newArray = [...data, newItem];

			return {
				data: newArray
			};
		});
	};

	onToggleProperty = (id, propName) => {

		this.setState(({ data }) => ({
			data: data.map(item => {
				if (item.id === id) {
					return {...item, [propName]: !item[propName]}
				}
				return item;
			})
		}));
	};

	searchForm = (items, term) => {
		if (!term) {return items;}

		return items.filter((item) => {
			return item.name.toLowerCase().indexOf(term.toLowerCase()) > -1;
		});
	};

	onUpdeteSearch = (term) => {
		this.setState({ term });
	}

	filterPost = (items, filter) => {
		switch (filter) {
			case 'rise': return items.filter(item => item.rise);
			case 'more': return items.filter(item => item.salary > 1000);
			case 'all': return items;
			default: return items;
		};
	};

	onFilterSelect = (filter) => {
		this.setState({ filter });
	};


	render() {

		const { data, term, filter } = this.state;

		const increaseCount = data.filter((el) => el.increase).length;
		const totalStuff = data.length;

		const visibleData = this.filterPost(this.searchForm(data, term), filter);

		return (
			<div className="app">
				<AppInfo doneIncrease={increaseCount} totalStuff={totalStuff}/>
				<div className="search-panel">
					<SearchPanel 
						onUpdeteSearch = { this.onUpdeteSearch } />
					<AppFilter 
						filter={ filter }
						onFilterSelect = { this.onFilterSelect } />
				</div>
				<EmployeesList 
						data = { visibleData } 
						onDelete = { this.onDeleteItem }
						onToggleProperty = { this.onToggleProperty }
				/>
				<EmployeesAddForm onAdd = { this.addItem }/>
			</div>
	);
	}
}

export default App;