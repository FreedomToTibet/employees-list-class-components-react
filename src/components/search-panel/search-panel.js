import React, { Component } from 'react';

import './search-panel.css';

class SearchPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			term: ''
		}
	}

	onUpdeteSearch = (e) => {
		this.setState({ term: e.target.value });
		this.props.onUpdeteSearch(e.target.value);
	}

	render() {

		const { term } = this.state;
		return (
			<input type="text" 
						 className="form-control search-input" 
						 placeholder="Find employee"
						 value = { term }
						 onChange={ this.onUpdeteSearch } />
		);
	}	
}

export default SearchPanel;