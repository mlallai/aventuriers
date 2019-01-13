import React from "react";
import classNames from "classnames";
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateAdventure, getAdventure } from '../../actions/adventureActions';
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

class AddAdventure extends React.Component {
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
      title: '',
      mainActivity: '',
      recurring: false,
      secondActivity: '',
      summary: '',
      level: '',
      requiredPeople: '',
      country: '',
      location: '',
      from: '',
      duration: '',
      errors: {},
      loadedAdventure: []
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

componentWillMount () {
    if (this.props.match.params.id) {
        this.props.getAdventure(this.props.match.params.id)
        console.log("props willmount",this.props)
    }
}

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
      console.log("nextprops.errors", nextProps.errors)
    }

    const { adventure } = nextProps;
    if (adventure.adventure) {
        const loadedAdventure = adventure.adventure;
        this.setState({loadedAdventure: loadedAdventure});
        console.log("loadedAdventure", loadedAdventure);
        this.setState({
            title: loadedAdventure.title,
            mainActivity: loadedAdventure.mainActivity,
            recurring: loadedAdventure.recurring,
            secondActivity: loadedAdventure.secondActivity,
            summary: loadedAdventure.summary,
            level: loadedAdventure.level,
            requiredPeople: loadedAdventure.requiredPeople,
            country: loadedAdventure.country,
            location: loadedAdventure.location,
            from: loadedAdventure.from,
            duration: loadedAdventure.duration,
        })
    }
}

onSubmit(e) {
    e.preventDefault();

    const advData = {
      title: this.state.title,
      mainActivity: this.state.mainActivity,
      recurring: this.state.recurring,
      secondActivity: this.state.secondActivity,
      summary: this.state.summary,
      level: this.state.level,
      requiredPeople: this.state.requiredPeople,
      country: this.state.country,
      location: this.state.location,
      from: this.state.from,
      duration: this.state.duration,
    };
    console.log(advData)
    this.props.updateAdventure(advData, this.props.history);
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
                        Titre
                            <CustomInput
                                id="regular"
                                inputProps={{
                                    placeholder: this.state.title,
                                    name:"title",
                                    value: this.state.title,
                                    onChange: this.onChange
                                }}
                                formControlProps={{
                                    fullWidth: true
                                }}
                                />
                                {errors.title && (<div>{errors.title}</div>)}
                        Sport principal
                            <CustomInput
                                id="regular"
                                inputProps={{
                                    placeholder: this.state.mainActivity,
                                    name:"mainActivity",
                                    value: this.state.mainActivity,
                                    onChange: this.onChange
                                }}
                                formControlProps={{
                                    fullWidth: true
                                }}
                                />
                                {errors.mainActivity && (<div>{errors.mainActivity}</div>)}
                        Récurrent ? (saisir true ou false)
                            <CustomInput
                                id="regular"
                                inputProps={{
                                    placeholder: this.state.recurring,
                                    name:"recurring",
                                    value: this.state.recurring,
                                    onChange: this.onChange
                                }}
                                formControlProps={{
                                    fullWidth: true
                                }}
                                />
                                {errors.recurring && (<div>{errors.recurring}</div>)}
                        Activités secondaires ?
                            <CustomInput
                                id="regular"
                                inputProps={{
                                    placeholder: this.state.secondActivity,
                                    name:"secondActivity",
                                    value: this.state.secondActivity,
                                    onChange: this.onChange
                                }}
                                formControlProps={{
                                    fullWidth: true
                                }}
                                />
                                {errors.secondActivity && (<div>{errors.secondActivity}</div>)}
                        Résumé
                            <CustomInput
                                id="regular"
                                inputProps={{
                                    placeholder: this.state.summary,
                                    name:"summary",
                                    value: this.state.summary,
                                    onChange: this.onChange
                                }}
                                formControlProps={{
                                    fullWidth: true
                                }}
                                />
                                {errors.summary && (<div>{errors.summary}</div>)}
                        Niveau
                            <CustomInput
                                id="regular"
                                inputProps={{
                                    placeholder: this.state.level,
                                    name:"level",
                                    value: this.state.level,
                                    onChange: this.onChange
                                }}
                                formControlProps={{
                                    fullWidth: true
                                }}
                                />
                                {errors.level && (<div>{errors.level}</div>)}
                        Nombre d'équipiers recherchés
                            <CustomInput
                                id="regular"
                                inputProps={{
                                    placeholder: this.state.requiredPeople,
                                    name:"requiredPeople",
                                    value: this.state.requiredPeople,
                                    onChange: this.onChange
                                }}
                                formControlProps={{
                                    fullWidth: true
                                }}
                                />
                                {errors.requiredPeople && (<div>{errors.requiredPeople}</div>)}
                        Pays
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
                        // onClick={() => this.handleSuccessMessage()}
                        color="danger"
                        simple
                      >
                        Enregistrer
                      </Button>
                      {/* {successMessage} */}
                    </form>
                </GridItem>
                </GridContainer>
        </div>
    </div>
    );
  }
}

AddAdventure.propTypes = {
    updateAdventure: PropTypes.func.isRequired,
    getAdventure: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    adventure: PropTypes.object.isRequired,
  };
   const mapStateToProps = state => ({
    errors: state.errors,
    adventure: state.adventure
  });

export default connect(mapStateToProps, { updateAdventure, getAdventure }) (withStyles(javascriptStyles)(withRouter(AddAdventure)));

