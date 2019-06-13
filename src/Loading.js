import React from "react";
import "./Loading.css";

class Loading extends React.Component {
    Clock() {
        const loadMessage = ["Loading", "Loading.", "Loading..", "Loading...", "Loading...."];
        const [time, setTime] = React.useState(0);
        React.useEffect(() => {
            const timer = window.setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 200);
            return () => {
                window.clearInterval(timer);
            };
        }, []);

        return <div className="LoadingScreen">{loadMessage[time % 5]}</div>;
    }

    render() {
        return <this.Clock />;
    }
}

export default Loading;
