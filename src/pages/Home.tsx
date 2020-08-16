import React from "react";
import logo from "../logo.svg";
import "./Home.css";

const Home: React.FC = () => (
	<div className="Home">
		<img src={ logo } className="Home-logo" alt="logo" />
	</div>
);

export default Home;
