import React, {Component} from 'react';

import './employees-add-form.css';

class EmployeesAddForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			salary: ''
		}
	}

	onChangeValue = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	onSubmit = (e) => {
		const { onAdd } = this.props;
		const { name, salary } = this.state;

		e.preventDefault();

		if (!salary) return;

		onAdd(name, salary);
		this.setState({
			name: '',
			salary: ''
		})
	}
 
	render() {
		const { name, salary} = this.state;

		return (
			<div className="app-add-form">
				<h3>Add a new employee</h3>
				<form className="add-form d-flex"
				onSubmit={this.onSubmit}>
					<input type="text" className="form-control new-post-label" 
						placeholder="Name"
						name="name"
						value={ name } 
						minLength="3"
						required 
						onChange={this.onChangeValue} />
					<input type="number" className="form-control new-post-label" placeholder="Salary $"
						step="100"
						name="salary"
						value={ salary } 
						required 
						onChange={this.onChangeValue} />
					<button type="submit"
									className="btn btn-outline-light"
					>Add</button>
				</form>
			</div>
		);
	}
}

export default EmployeesAddForm;