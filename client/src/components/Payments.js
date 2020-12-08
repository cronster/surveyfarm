import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { Button, Icon } from "react-materialize";
import { connect } from "react-redux";
import * as actions from "../actions";

class Payments extends Component {
	render() {
		return (
			<StripeCheckout
				name="SurveyFarm"
				description="1$ equivalent to 1 credit."
				amount={500}
				token={(token) => this.props.handleToken(token)}
				stripeKey={process.env.REACT_APP_STRIPE_KEY}
			>
				<Button
					floating
					icon={<Icon>account_balance_wallet</Icon>}
					large
					node="button"
					tooltip="ADD CREDITS"
					tooltipOptions={{
						position: "left"
					}}
					waves="light"
				/>
			</StripeCheckout>
		);
	}
}

export default connect(null, actions)(Payments);
