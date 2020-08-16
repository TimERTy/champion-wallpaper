import React from "react";
import logo from "../logo.svg";
import "./Page.css";

const Page: React.FC = () => (
	<div className="Page">
		<img src={ logo } className="Page-logo" alt="logo" />
	</div>
);

export default Page;
