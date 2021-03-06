import React from "react";
import classNames from "classnames";
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile, createProfile } from '../../actions/profileActions';
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

class EditProfile extends React.Component {
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
      age: '',
      desc: '',
      country: '',
      location:'',
      sports: '',
      website: '',
      facebook: '',
      instagram: '',
      youtube: '',
      errors: {}
      
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
    console.log(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
      console.log("nextprops.errors", nextProps.errors)
    }
    if (nextProps.profile.profile) {
        const profile = nextProps.profile.profile;

    // If profile field doesnt exist, make empty string
    profile.age = !isEmpty(profile.age) ? profile.age : '';
    profile.desc = !isEmpty(profile.desc) ? profile.desc : '';
    profile.country = !isEmpty(profile.country) ? profile.country : '';
    profile.location = !isEmpty(profile.location) ? profile.location : '';
    profile.sports = !isEmpty(profile.sports) ? profile.sports : '';
    profile.website = !isEmpty(profile.website) ? profile.website : '';
    profile.facebook = !isEmpty(profile.facebook) ? profile.facebook : '';
    profile.instagram = !isEmpty(profile.instagram) ? profile.instagram : '';
    profile.youtube = !isEmpty(profile.youtube) ? profile.youtube : '';

    // Set component fields state
    this.setState({
        age: profile.age,
        desc: profile.desc,
        country: profile.country,
        location: profile.location,
        sports: profile.sports,
        website: profile.website,
        facebook: profile.facebook,
        youtube: profile.youtube,
        instagram: profile.instagram
      });
    }
}

onSubmit(e) {
    e.preventDefault();

    const profileData = {
      age: this.state.age,
      desc: this.state.desc,
      country: this.state.country,
      location: this.state.location,
      sports: this.state.sports,
      website: this.state.website,
      facebook: this.state.facebook,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };
    console.log(profileData)
    this.props.createProfile(profileData, this.props.history);
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
    const { isAuthenticated, user } = this.props.auth;
    const { profile, loading } = this.props.profile;
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
                        Votre âge
                            <CustomInput
                                id="regular"
                                inputProps={{
                                    placeholder: this.state.age,
                                    name:"age",
                                    value: this.state.age,
                                    onChange: this.onChange
                                }}
                                formControlProps={{
                                    fullWidth: true
                                }}
                                />
                                {errors.age && (<div>{errors.age}</div>)}
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
                        Votre pays
                            <CustomInput
                                id="regular"
                                inputProps={{
                                    placeholder: this.state.country,
                                    name:"country",
                                    value: this.state.country,
                                    onChange: this.onChange
                                }}
                                formControlProps={{
                                    fullWidth: true
                                }}
                                />
                                {errors.country && (<div>{errors.country}</div>)}
                        Votre ville
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
                        Sports
                            <CustomInput
                                id="regular"
                                inputProps={{
                                    placeholder: this.state.sports,
                                    name:"sports",
                                    value: this.state.sports,
                                    onChange: this.onChange
                                }}
                                formControlProps={{
                                    fullWidth: true
                                }}
                                />
                                {errors.sports && (<div>{errors.sports}</div>)}
                        <Button
                        type="submit"
                        // onClick={() => this.handleClose("classicModal")}
                        color="danger"
                        simple
                      >
                        Enregistrer
                      </Button>
                    </form>
                    {/* </DialogContent>
                    <DialogActions className={classes.modalFooter}>
                    </DialogActions>
                  </Dialog> */}
                </GridItem>
                </GridContainer>
        </div>
    </div>
    );
  }
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}
 const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile }) (withStyles(javascriptStyles)(withRouter(EditProfile)));

