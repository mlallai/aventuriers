import React from "react";
import classNames from "classnames";
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profileActions';
import isEmpty from 'validation/isEmpty.js';

// react plugin for creating date-time-picker
import Datetime from "react-datetime";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Tooltip from "@material-ui/core/Tooltip";
import Popover from "@material-ui/core/Popover";
import Checkbox from "@material-ui/core/Checkbox";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Close from "@material-ui/icons/Close";
import Notifications from "@material-ui/icons/Notifications";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Assignment from "@material-ui/icons/Assignment";
import Mail from "@material-ui/icons/Mail";
import Face from "@material-ui/icons/Face";
import Timeline from "@material-ui/icons/Timeline";
import Code from "@material-ui/icons/Code";
import Group from "@material-ui/icons/Group";
import Email from "@material-ui/icons/Email";
import Check from "@material-ui/icons/Check";
import AttachFile from "@material-ui/icons/AttachFile";
import Layers from "@material-ui/icons/Layers";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Instruction from "components/Instruction/Instruction.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomFileInput from "components/CustomFileInput/CustomFileInput.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";
import Accordion from "components/Accordion/Accordion.jsx";
import ImageUpload from "components/CustomUpload/ImageUpload.jsx";

import javascriptStyles from "assets/jss/material-kit-pro-react/views/componentsSections/javascriptStyles.jsx";

import dg1 from "assets/img/dg1.jpg";
import dg2 from "assets/img/dg2.jpg";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class AddExperience extends React.Component {
  anchorElLeft = null;
  anchorElTop = null;
  anchorElBottom = null;
  anchorElRight = null;
  constructor(props) {
    super(props);
    this.state = {
      classicModal: false,
      noticeModal: false,
      smallModal: false,
      loginModal: false,
      signupModal: false,
      openLeft: false,
      openTop: false,
      openBottom: false,
      openRight: false,
      checked: [],
      activity: '',
      desc: '',
      location: '',
      from: '',
      to: '',
      duration: '',
      errors: {}
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

//   componentDidMount() {
//     this.props.getCurrentProfile();
//     console.log(this.props)
//   }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
      console.log("nextprops.errors", nextProps.errors)
    }
}

onSubmit(e) {
    e.preventDefault();

    const expData = {
      activity: this.state.activity,
      desc: this.state.desc,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      duration: this.state.duration
    };
    console.log(expData)
    this.props.addExperience(expData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  }
  handleClickOpen(modal) {
    var x = [];
    x[modal] = true;
    this.setState(x);
  }
  handleClose(modal) {
    var x = [];
    x[modal] = false;
    this.setState(x);
  }
  handleClosePopover(state) {
    this.setState({
      [state]: false
    });
  }
  handleClickButton(state) {
    this.setState({
      [state]: true
    });
  }
  render() {
    const { classes } = this.props;
    const { errors } = this.state;
   
    return (
      <div
        className={`${classes.section} cd-section`}
        id="javascriptComponents"
      >
        <div className={classes.container}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12} lg={12}>
                    <form onSubmit={this.onSubmit}>
                        Activité
                            <CustomInput
                                id="regular"
                                inputProps={{
                                    placeholder: this.state.activity,
                                    name:"activity",
                                    value: this.state.activity,
                                    onChange: this.onChange
                                }}
                                formControlProps={{
                                    fullWidth: true
                                }}
                                />
                                {errors.activity && (<div>{errors.activity}</div>)}
                        Une description
                            <CustomInput
                                id="regular"
                                inputProps={{
                                    placeholder: this.state.desc,
                                    name:"desc",
                                    value: this.state.desc,
                                    onChange: this.onChange
                                }}
                                formControlProps={{
                                    fullWidth: true
                                }}
                                />
                                {errors.desc && (<div>{errors.desc}</div>)}
                        Lieu
                            <CustomInput
                                id="regular"
                                inputProps={{
                                    placeholder: this.state.location,
                                    name:"location",
                                    value: this.state.location,
                                    onChange: this.onChange
                                }}
                                formControlProps={{
                                    fullWidth: true
                                }}
                                />
                                {errors.location && (<div>{errors.location}</div>)}
                        From
                            <CustomInput
                                id="regular"
                                inputProps={{
                                    placeholder: this.state.from,
                                    name:"from",
                                    value: this.state.from,
                                    onChange: this.onChange
                                }}
                                formControlProps={{
                                    fullWidth: true
                                }}
                                />
                                {errors.from && (<div>{errors.from}</div>)}
                        To
                            <CustomInput
                                id="regular"
                                inputProps={{
                                    placeholder: this.state.to,
                                    name:"to",
                                    value: this.state.to,
                                    onChange: this.onChange
                                }}
                                formControlProps={{
                                    fullWidth: true
                                }}
                                />
                                {errors.to && (<div>{errors.to}</div>)}
                        Durée
                            <CustomInput
                                id="regular"
                                inputProps={{
                                    placeholder: this.state.duration,
                                    name:"duration",
                                    value: this.state.duration,
                                    onChange: this.onChange
                                }}
                                formControlProps={{
                                    fullWidth: true
                                }}
                                />
                                {errors.duration && (<div>{errors.duration}</div>)}
                        <Button
                        type="submit"
                        // onClick={() => this.handleClose("classicModal")}
                        color="danger"
                        simple
                      >
                        Enregistrer
                      </Button>
                    </form>
                </GridItem>
                </GridContainer>
        </div>
    </div>
    );
  }
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
   const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
  });

export default connect(mapStateToProps, { addExperience }) (withStyles(javascriptStyles)(withRouter(AddExperience)));

