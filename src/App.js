import React, { Suspense, lazy } from "react";

import { Loading, Header, Footer } from "./components";
import { Button, ButtonGroup, Container, Typography, CssBaseline } from "@material-ui/core";

const Home = lazy(() => import("./pages/Home"));
const Page = lazy(() => import("./pages/Page"));
const MatchHistory = lazy(() => import("./pages/MatchHistory"));
const styles = {
    root: {
        minHeight: "100vh"
    },
    main: {
        alignContent: "center",
        alignItems: "center"
    },
    match: {
        color: "white",
        backgroundColor: "black"
    }
};

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            page: "Home"
        };
    }

    render() {
        return (
            <div style={styles.root}>
                <CssBaseline />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <Header />
                <ButtonGroup size="large" fullWidth color="primary" aria-label="Full width outlined button group">
                    <Button
                        onClick={() => {
                            this.setState({ page: "Home" });
                        }}
                    >
                        Home
                    </Button>
                    <Button
                        onClick={() => {
                            this.setState({ page: "MatchHistory" });
                        }}
                    >
                        MatchHistory
                    </Button>
                    <Button
                        onClick={() => {
                            this.setState({ page: "Page" });
                        }}
                    >
                        OtherPage
                    </Button>
                </ButtonGroup>
                <Container fixed component="main" style={styles.main}>
                    <Suspense fallback={<Loading />}>
                        {this.state.page === "Home" ? <Home /> : ""}
                        {this.state.page === "MatchHistory" ? <MatchHistory /> : ""}
                        {this.state.page === "Page" ? <Page /> : ""}
                    </Suspense>
                </Container>
                <Footer />
            </div>
        );
    }
}

export default App;
