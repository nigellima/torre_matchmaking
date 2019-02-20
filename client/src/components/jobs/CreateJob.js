import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';

import TextEditor from './TextEditor';

const styles = theme => ({
  container: {
  },
  textField: {
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2
  },
  grid: {
    minHeight: '30vh'
  },
  text: {
    paddingTop: theme.spacing.unit * 2,
  },
});

class NewJob extends Component {

  constructor(props){
    super(props);
    this.state = {
      description: '',
      contract_type: ''
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onDescriptionChange = (value) => {
    this.setState({ description: value });
  }


  render() {
    const { classes } = this.props;
    const types = [
        { label: '* Select Contract Type ', value: 0 },
        { label: 'Long-term', value: 'LONG' },
        { label: 'Short-term', value: 'SHORT' },
    ]


    return (
      <div className={classes.container}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          className={classes.grid}
          >
          <Grid item xs={9}>
            <Typography className={classes.text} variant="h4" gutterBottom>
              Create New Job Offer
            </Typography>
            <Typography className={classes.text} variant="h5" gutterBottom>
              Title
            </Typography>
            <TextField
              id="standard-full-width"
              className={classes.textField}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Typography className={classes.text} variant="h5" gutterBottom>
              Description
            </Typography>
            <TextEditor
              onChange={this.onDescriptionChange}
              value={this.state.description}
              name='description'
              className={classes.textField}
            />
            <Typography className={classes.text} variant="h5" gutterBottom>
              Contract Type
            </Typography>
            <TextField
              id="contract-type"
              select
              fullWidth
              className={classes.textField}
              value={this.state.contract_type}
              name='contract_type'
              onChange={this.onChange}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText="Please select the desired contract type. 
                          This information will be used to sort the best candidates for you"
              margin="normal"
            >
              {types.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
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