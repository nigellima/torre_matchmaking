import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Downshift from 'downshift';
import deburr from 'lodash/deburr';

import TextEditor from './TextEditor';
import { getMatchedSkills } from '../../actions/skillActions'

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
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
});


class NewJob extends Component {
  constructor(props){
    super(props);
    this.state = {
      description: '',
      contract_type: '',
      inputValue: '',
      selectedItem: [],
      suggestions: []
    }
  }

  //Autocomplete functions
  renderInput = (inputProps) => {
    const { InputProps, classes, ref, ...other } = inputProps;

    return (
      <TextField
        InputProps={{
          inputRef: ref,
          classes: {
            root: classes.inputRoot,
            input: classes.inputInput,
          },
          ...InputProps,
        }}
        {...other}
      />
    );
  }

  renderSuggestion = ({ suggestion, index, itemProps, highlightedIndex, selectedItem }) => {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

    return (
      <MenuItem
        {...itemProps}
        key={suggestion.label}
        selected={isHighlighted}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {suggestion.label}
      </MenuItem>
    );
  }


  getSuggestions = (value) => {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
      ? []
      : this.state.suggestions.filter(suggestion => {
          const keep =
            count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

          if (keep) {
            count += 1;
          }

          return keep;
        });
  }

  handleKeyDown = event => {
    const { inputValue, selectedItem } = this.state;
    if (selectedItem.length && !inputValue.length && event.key === 'Backspace') {
      this.setState({
        selectedItem: selectedItem.slice(0, selectedItem.length - 1),
      });
    }
  };

  handleInputChange = event => {
    this.props.getMatchedSkills(event.target.value);
    this.setState({ inputValue: event.target.value });
  };

  handleChange = item => {
    let { selectedItem } = this.state;
    
    if (selectedItem.indexOf(item) === -1) {
      selectedItem = [...selectedItem, item];
    }

    this.setState({
      inputValue: '',
      selectedItem,
    });
    
  };

  handleDelete = item => () => {
    this.setState(state => {
      const selectedItem = [...state.selectedItem];
      selectedItem.splice(selectedItem.indexOf(item), 1);
      return { selectedItem };
    });
  };
  //End of autocomplete functions

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onDescriptionChange = (value) => {
    this.setState({ description: value });
  }


  render() {
    const { classes } = this.props;
    const { inputValue, selectedItem } = this.state;
    const types = [
        { label: '* Select Contract Type ', value: 0 },
        { label: 'Long-term', value: 'LONG' },
        { label: 'Short-term', value: 'SHORT' },
    ]

    const { skills } = this.props.skill;

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

            {/* Autocomplete for required skillset */}
            <Typography className={classes.text} variant="h5" gutterBottom>
              Select Required Skills
            </Typography>
            <Downshift
              id="downshift-multiple"
              inputValue={inputValue}
              onChange={this.handleChange}
              selectedItem={selectedItem}
            >
              {({
                getInputProps,
                getItemProps,
                isOpen,
                inputValue: inputValue2,
                selectedItem: selectedItem2,
                highlightedIndex,
              }) => (
                <div className={classes.container}>
                  {this.renderInput({
                    fullWidth: true,
                    classes,
                    InputProps: getInputProps({
                      startAdornment: selectedItem.map(item => (
                        <Chip
                          key={item}
                          tabIndex={-1}
                          label={item}
                          className={classes.chip}
                          onDelete={this.handleDelete(item)}
                        />
                      )),
                      onChange: this.handleInputChange,
                      onKeyDown: this.handleKeyDown,
                      placeholder: 'Select multiple skills',
                    }),
                  })}
                  {isOpen ? (
                    <Paper className={classes.paper} square>
                      {skills.map((suggestion, index) =>
                        this.renderSuggestion({
                          suggestion,
                          index,
                          itemProps: getItemProps({ item: suggestion.label }),
                          highlightedIndex,
                          selectedItem: selectedItem2,
                        }),
                      )}
                    </Paper>
                  ) : null}
                </div>
              )}
            </Downshift>
          </Grid>   
        </Grid> 
        
      </div>
    )
  }
}

NewJob.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
  skill: state.skill,
});

export default withRouter(
  connect(mapStateToProps, { getMatchedSkills })(withStyles(styles)(NewJob))
)
