import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root:{
    padding: theme.spacing.unit * 2,
  },
  text: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing.unit * 2,
  },
});

class JobsList extends Component { 
  render() {
    const { classes } = this.props;
    const jobs = [
      
    ];
    return (
      <div>
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs>
              <Paper square className={classes.paper}>
                <Typography className={classes.text} variant="h5" gutterBottom>
                  Added Jobs
                </Typography>
                <List className={classes.list}>
                  <List className={classes.list}>
                    {jobs.map(({ id, primary, secondary, person }) => (
                      <Fragment key={id}>
                        {id === 1 && <ListSubheader className={classes.subHeader}>Today</ListSubheader>}
                        {id === 3 && <ListSubheader className={classes.subHeader}>Yesterday</ListSubheader>}
                        <ListItem button>
                          <ListItemText primary={primary} secondary={secondary} />
                        </ListItem>
                      </Fragment>
                    ))}
                  </List>
                </List>
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>
                <Typography className={classes.text} variant="h5" gutterBottom>
                  Suggested Candidates
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </div>
        
      </div>
    )
  }
}


JobsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(JobsList);