import './app-info.css';

const AppInfo = ({doneIncrease, totalStuff}) => {
	return (
		<div className="app-info">
			<h1>AT company employees</h1>
			<h2>Common amount of employees: {totalStuff}</h2>
			<h2>Count employees for bonus: {doneIncrease}</h2>
		</div>
	)
}

export default AppInfo;