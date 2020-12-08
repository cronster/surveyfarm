//Users review surveys before final submit
import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import * as actions from "../../actions";
import { withRouter } from "react-router-dom";
import _ from "lodash";

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
	const reviewFields = _.map(formFields, ({ name, label }) => {
		return (
			<div key={name}>
				<label>{label}</label>
				<div>{formValues[name]}</div>
			</div>
		);
	});

	return (
		<div>
			<h5>Please confirm your entries</h5>
			{reviewFields}
			<button className="yellow darken-3 btn-flat" onClick={onCancel}>
				Back
			</button>
			<button
				className="btn waves-effect waves-light right"
				type="submit"
				name="action"
				onClick={() => submitSurvey(formValues, history)}
			>
				Submit
				<i className="material-icons right">send</i>
			</button>
		</div>
	);
};

function mapStateToProps(state) {
	return { formValues: state.form.surveyForm.values }; // console.log(state) to see nested path
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
