import {initializeApp} from 'firebase/app';
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
  set,
} from 'firebase/database';

import React, { Component } from 'react';
import nextId from "react-id-generator";

import AppInfo from '../app-info';
import SearchPanel from '../search-panel';
import AppFilter  from '../app-filter';
import EmployeesList from '../employees-list';
import EmployeesAddForm from '../employees-add-form';

import './app.css';

const firebaseConfig = {
  databaseURL:
    'https://shop-together-6a782-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const employeesInDB = ref(database, 'employees');

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
      data: [],
      term: '',
      filter: 'all', // active, all, done
    };
	}

	componentDidMount() {
    // Listen for changes in the "employees" collection
    onValue(employeesInDB, (snapshot) => {
      const data = snapshot.val() || [];

      // Convert the object to an array of data
      const stuffArray = Object.keys(data).filter((key) => key !== "filter").map((key) => ({
        id: key,
        ...data[key],
      }));
			stuffArray.forEach((item, index) => {
				item.id = Object.keys(data)[index];
			});

      this.setState({ data: stuffArray });
    });
		// Convert the "filter" value to a string
		onValue(ref(database, 'employees/filter'), (snapshot) => {
			const filter = snapshot.val() || 'all';
			this.setState({ filter });
		});
  }

	onDeleteItem = (id) => {
		this.setState(({ data }) => {
			return {
				data: data.filter((el) => el.id !== id)
			};
		});

		// Remove the employee with the specified ID from the "employees" collection
		let exactLocationOfItemInDB = ref(database, `employees/${id}`);
		remove(exactLocationOfItemInDB);
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

		// Add a new employee to the "employees" collection
		const newEmployeeRef = push(employeesInDB);
		const newEmployeeKey = newEmployeeRef.key;
		newItem.id = newEmployeeKey;
		set(newEmployeeRef, newItem);
	};
	
	onToggleProperty = (id, propName) => {
		const employeeToUpdate = this.state.data.find((item) => item.id === id);
		
		if (!employeeToUpdate) {
			console.error(`Item with ID ${id} not found.`);
			return;
		}

		// Update the property locally
		const updatedEmployee = {...employeeToUpdate, [propName]: !employeeToUpdate[propName]};

		// Update data in the state
		this.setState(({data}) => ({
			data: data.map((item) => (item.id === id ? updatedEmployee : item)),
		}));

		// Update the employee in the "employees" collection
		const employeeRef = ref(database, `employees/${id}`);
		set(employeeRef, updatedEmployee).catch((error) => {
			console.error('Error updating item: ', error);
		});
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
		console.log(filter);
		this.setState({ filter });

		// Update the filter in the "employees" collection
		const employeeRef = ref(database, `employees/filter`);
		set(employeeRef, filter).catch((error) => {
			console.error('Error updating item: ', error);
		});
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