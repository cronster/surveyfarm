import React from "react";
import "materialize-css";
import { Carousel, Parallax } from "react-materialize";

const Landing = () => {
	return (
		<div style={{ textAlign: "center" }}>
			<div className="section white">
				<div className="row container">
					<h3 className="header">Why use our product?</h3>
					<p className="grey-text text-darken-3 lighten-3">
						Get better insights for your surveys. A single platform
						for all your promotional needs.
					</p>
				</div>
			</div>
			<div>
				<Parallax
					image={
						<img
							alt=""
							src={require("../images/SurveyFarmLandingPage2.jpg")}
						/>
					}
					options={{
						responsiveThreshold: 0
					}}
				/>
				<div className="section white">
					<div className="row container">
						<h3 className="header">What do we do?</h3>
						<p className="grey-text text-darken-3 lighten-3">
							We help businesses understand their customer's need.
							React swiftly to changing customer requirements.
							Stay cashflow positive!
						</p>
					</div>
				</div>
				<Parallax
					image={
						<img
							alt=""
							src={require("../images/SurveyFarmLandingPage3.webp")}
						/>
					}
					options={{
						responsiveThreshold: 0
					}}
				/>
				<div className="section white">
					<div className="row container">
						<h3 className="header">
							Get easy access to your survey and promotional needs
						</h3>
						<p className="grey-text text-darken-3 lighten-3">
							Minimal cost. Minimal effort.
						</p>
					</div>
				</div>
				<Parallax
					image={
						<img
							alt=""
							src={require("../images/SurveyFarmLandingPage1.png")}
						/>
					}
					options={{
						responsiveThreshold: 0
					}}
				/>
			</div>
		</div>
	);
};

export default Landing;
