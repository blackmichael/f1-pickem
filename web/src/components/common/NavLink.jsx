import React from "react";
import { ListItem, Typography, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function NavLink(props) {
  const { icon, primary, to } = props;
  const isMobile = window.innerWidth <= 500;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <Link to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <Grid item>
      <ListItem 
        button 
        disableGutters={isMobile} 
        component={renderLink} 
    >
        {icon}
        <Typography variant="body1">
          {primary}
        </Typography>
      </ListItem>
    </Grid>
  );
}