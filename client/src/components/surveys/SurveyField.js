//Renders a single label and text input
import React from "react";
export default ({ input, label, meta: { error, touched } }) => {
	//console.log(props);
	//input is from props.input
	//Printing the props object will show a lot of event handlers created by redux-form
	return (
		<div>
			<label>{label}</label>
			<input {...input} style={{ marginBottom: "5px" }} />
			<div className="red-text" style={{ marginBottom: "20px" }}>
				{touched && error}
			</div>
		</div>
	);
};
