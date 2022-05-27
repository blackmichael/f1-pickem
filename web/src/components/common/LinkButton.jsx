import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Grid, Typography } from "@material-ui/core";

// from https://material-ui.com/guides/composition/#link
export default function LinkButton(props) {
  const { text, to, subtext, width, ...other } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <Link to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <Button component={renderLink} style={{width: width, marginBottom: "15px", justifyContent: "start"}} {...other}>
      <Grid item style={{lineHeight: "0.8", justifyContent: "flex-start"}}>
        <Typography variant="h6" style={{fontSize: "0.9rem", lineHeight: "1.2"}}>
          {text}
        </Typography>
        <Typography variant="overline" style={{fontSize: "0.65rem", color: "pink", lineHeight: "0"}}>
          {subtext}
        </Typography>
      </Grid>
    </Button>
  );
}
