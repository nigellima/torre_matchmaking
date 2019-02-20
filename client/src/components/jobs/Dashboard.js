import React from 'react';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import JobsList from './JobsList';

const styles = theme => ({
  text: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  container: {
    paddingTop: theme.spacing.unit * 4,
  },
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

function Dashboard(props) {
  const { classes } = props;
  return (
    <div className={classes.container}>
      <Typography className={classes.text} variant="h3" gutterBottom>
        Jobs Dashboard
      </Typography>
      <Button variant="contained" color="primary" className={classes.button}>
        Add New Job
        <AddIcon className={classes.rightIcon} />
      </Button>
      <JobsList/>
    </div>
  )
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);