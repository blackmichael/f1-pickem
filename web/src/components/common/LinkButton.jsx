import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

// from https://material-ui.com/guides/composition/#link
export default function LinkButton(props) {
    const { text, to, ...other } = props;
  
    const renderLink = React.useMemo(
      () => React.forwardRef((itemProps, ref) => <Link to={to} ref={ref} {...itemProps} />),
      [to],
    );
  
    return (
        <Button component={renderLink} {...other} >
          {text}
        </Button>
    );
  }