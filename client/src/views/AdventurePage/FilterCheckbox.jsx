import React, { Component } from 'react';
import PropTypes from "prop-types";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
import withStyles from "@material-ui/core/styles/withStyles";

import basicsStyle from "assets/jss/material-kit-pro-react/views/componentsSections/basicsStyle.jsx";

class FilterCheckbox extends Component {
  
  state = {
    isChecked: false,
  }

  toggleCheckboxChange = () => {
    const { handleCheckboxChange, label } = this.props;

    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));

    handleCheckboxChange(label);
  }

  render() {
    const { label, classes } = this.props;
    const { isChecked } = this.state;

    return (
        <FormControlLabel
                    control={
                      <Checkbox
                        tabIndex={-1}
                        onChange={this.toggleCheckboxChange}
                        checked={isChecked}
                        checkedIcon={<Check className={classes.checkedIcon} />}
                        icon={<Check className={classes.uncheckedIcon} />}
                        classes={{
                          checked: classes.checked,
                          root: classes.checkRoot
                        }}
                      />
                    }
                    classes={{ label: classes.label }}
                    label={label}
                  />
    //   <div className={classes}>
    //     <label>
    //       <input
    //         type="checkbox"
    //         value={label}
    //         checked={isChecked}
    //         onChange={this.toggleCheckboxChange}
    //       />

    //       <span className="checkmark">{label}</span>
    //     </label>
    //   </div>
    );
  }
}

FilterCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
};

export default withStyles(basicsStyle) (FilterCheckbox);