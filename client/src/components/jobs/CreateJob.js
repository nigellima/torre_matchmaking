import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  container: {
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    
  },
  grid: {
    minHeight: '30vh'
  }
});

class NewJob extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <Grid
          container
          spacing={24}
          direction="column"
          alignItems="center"
          justify="center"
          className={classes.grid}
          >
          <Grid item xs={9}>
            <Typography className={classes.text} variant="h4" gutterBottom>
              Create New Job Offer
            </Typography>
            <TextField
              id="standard-full-width"
              label="Job Title"
              className={classes.textField}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>   
        </Grid> 
        
      </div>
    )
  }
}

NewJob.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewJob);