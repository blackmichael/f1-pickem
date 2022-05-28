import React, { Component } from "react";
import { Page, Subtitle } from "components/common/Page";
import { Grid, Typography } from "@material-ui/core";

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <Page>
                    <Grid item xs={12}>
                        <Typography variant="h4">Something went wrong</Typography>
                        <Subtitle>Please fix me</Subtitle>
                    </Grid> 
                </Page>
            );
        }

        return this.props.children;
    }
}
