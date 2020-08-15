import React, { useEffect, useState } from "react";
import "./Loading.css";

const Loading: React.FC = () => {
	const loadMessage = [ "Loading", "Loading.", "Loading..", "Loading...", "Loading...." ];
	const [ time, setTime ] = useState( 0 );
	useEffect( () => {
		const timer = window.setInterval( () => {
			setTime( prevTime => prevTime + 1 );
		}, 200 );
		return () => {
			window.clearInterval( timer );
		};
	}, [] );

	return <div className="LoadingScreen">{ loadMessage[ time % 5 ] }</div>;
};

export default Loading;
