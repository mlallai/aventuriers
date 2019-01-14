import React from "react";
import PropTypes from 'prop-types';
import { connect } from  'react-redux';
import {withRouter} from 'react-router-dom'

import { loginUser } from '../../actions/authActions';
// react plugin for creating date-time-picker
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import Button from "components/CustomButtons/Button.jsx";
import AddCircle from "@material-ui/icons/AddCircle";

import javascriptStyles from "assets/jss/material-kit-pro-react/views/componentsSections/javascriptStyles.jsx";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class AlertModal extends React.Component {
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
      email: '',
      password: '',
      errors: {}
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    // Check to see if we are already logged in
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/')
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors){
      this.setState({errors: nextProps.errors})
     }

    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/profile');
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = (e) => {
    e.preventDefault()
     const userData = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.loginUser(userData);
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
      <div>
                 {/* BUTTON SMALL MODAL */}
                  <Button
                    color="info"
                    round
                    className={classes.subscribeButton}
                    onClick={() => this.handleClickOpen("smallModal")}
                    >
                    <AddCircle style={{color: "#ffffff"}} /><span style={{color: "#ffffff"}}>Créer une aventure</span>
                    </Button>
                  {/* SMALL MODAL START */}
                  <Dialog
                    classes={{
                      root: classes.modalRoot,
                      paper: classes.modal + " " + classes.modalSmall
                    }}
                    open={this.state.smallModal}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => this.handleClose("noticeModal")}
                    aria-labelledby="small-modal-slide-title"
                    aria-describedby="small-modal-slide-description"
                  >
                    <DialogTitle
                      id="small-modal-slide-title"
                      disableTypography
                      className={classes.modalHeader}
                    >
                      <Button
                        simple
                        className={classes.modalCloseButton}
                        key="close"
                        aria-label="Close"
                        onClick={() => this.handleClose("smallModal")}
                      >
                        {" "}
                        <Close className={classes.modalClose} />
                      </Button>
                    </DialogTitle>
                    <DialogContent
                      id="small-modal-slide-description"
                      className={
                        classes.modalBody + " " + classes.modalSmallBody
                      }
                      style={{textAlign: 'center'}}
                    >
                      <h5 style={{fontWeight: 'bold', textTransform: 'uppercase', fontSize: '14px'}}>Vous devez être connecté pour {this.props.feature} :)</h5>
                    </DialogContent>
                    <DialogActions
                      className={
                        classes.modalFooter + " " + classes.modalFooterCenter
                      }
                    >
                      <Button
                        onClick={() => this.handleClose("smallModal")}
                        link
                        className={classes.modalSmallFooterFirstButton}
                      >
                       OK
                      </Button>
                    </DialogActions>
                  </Dialog>
                  {/* SMALL MODAL END */}
      </div>
    );
  }
}

AlertModal.propTypes = {
    auth: PropTypes.object.isRequired,
  };

const mapStateToProps = state => ({
    auth: state.auth,
  });



export default connect(mapStateToProps, { loginUser })(withStyles(javascriptStyles)(withRouter(AlertModal)));

