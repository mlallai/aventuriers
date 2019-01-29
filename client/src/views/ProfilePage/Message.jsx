import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Moment from "react-moment";
import { getMessage, addReply } from "../../actions/messageActions";
import FooterBar from "views/Footer/FooterBar.jsx";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";

// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import HeaderLinksAuth from "components/Header/HeaderLinksAuth.jsx";

import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Media from "components/Media/Media.jsx";
import Spinner from "components/common/Spinner.js";

import signupPageStyle from "assets/jss/material-kit-pro-react/views/signupPageStyle.jsx";

import image from "assets/img/mountain.jpg";

const dashboardRoutes = [];

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedMessage: "",
      loadedMessageSenderID: {},
      loadedMessageRecipientID: {},
      loadedReplies: [],
      errorText: "",
      text: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    if (this.props.match.params.id) {
      this.props.getMessage(this.props.match.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { message } = nextProps;
    if (message.message) {
      const loadedMessage = message.message;
      const loadedMessageSenderID = message.message.senderID;
      const loadedMessageRecipientID = message.message.recipientID;
      const loadedReplies = message.message.replies;
      this.setState({
        loadedMessage: loadedMessage,
        loadedReplies: loadedReplies,
        loadedMessageSenderID: loadedMessageSenderID,
        loadedMessageRecipientID: loadedMessageRecipientID
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.state.text.length < 10) {
      this.setState({
        errorText: "Votre commentaire doit contenir au moins 10 caractères."
        // text: ""
      });
    } else {
      const messData = {
        text: this.state.text
      };
      this.props.addReply(
        this.props.message.message._id,
        messData,
        this.props.history
      );
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { classes, message, ...rest } = this.props;
    const {
      loadedMessage,
      loadedReplies,
      loadedMessageSenderID,
      loadedMessageRecipientID
    } = this.state;

    const { isAuthenticated, user } = this.props.auth;

    // Setup of conversation user
    let messagePartnerFirstName;
    let messagePartnerLastName;
    if (
      loadedMessageSenderID === undefined ||
      loadedMessageRecipientID === undefined
    ) {
      messagePartnerFirstName = "";
      messagePartnerLastName = "";
    } else {
      if (loadedMessageSenderID._id === user.id) {
        messagePartnerFirstName = loadedMessageRecipientID.firstName;
        messagePartnerLastName = loadedMessageRecipientID.lastName;
      } else {
        messagePartnerFirstName = loadedMessageSenderID.firstName;
        messagePartnerLastName = loadedMessageSenderID.lastName;
      }
    }
    // End of Setup of conversation user

    // Setup of original message
    let originalMessage = undefined;
    if (loadedMessage === undefined || loadedMessageSenderID === undefined) {
      originalMessage = (
        <h4>
          <Spinner />
        </h4>
      );
    } else {
      originalMessage = (
        <GridContainer>
          <GridItem xs={2}>
            {loadedMessageSenderID.avatar ? (
              <Avatar style={{ float: "right" }}>
                {" "}
                {loadedMessageSenderID.avatar}{" "}
              </Avatar>
            ) : (
              <Avatar style={{ float: "right", backgroundColor: "#2a8afa" }}>
                {" "}
                {loadedMessageSenderID.defaultAvatar}{" "}
              </Avatar>
            )}
          </GridItem>
          <GridItem xs={10} md={7}>
            <small style={{ fontWeight: "bold" }}>
              {loadedMessageSenderID.firstName} {loadedMessageSenderID.lastName}
            </small>
            <br />
            <small style={{ fontStyle: "italic" }}>
              le <Moment format={"DD/MM/YYYY"}>{loadedMessage.date}</Moment>
            </small>
            <br />
            <p style={{ fontSize: "14px", color: "#555555" }}>
              {loadedMessage.text}
            </p>
          </GridItem>
        </GridContainer>
      );
    }
    // End of Setup of original message

    // Setup of Replies
    let originalMessageReplies = undefined;
    if (
      loadedReplies === undefined ||
      loadedMessageSenderID === undefined ||
      loadedMessageRecipientID === undefined
    ) {
      originalMessageReplies = (
        <h4>
          <Spinner />
        </h4>
      );
    } else {
      originalMessageReplies = loadedReplies.map(reply => (
        <div>
          <GridContainer>
            <GridItem xs={2}>
              {reply.senderID === loadedMessageSenderID._id ? (
                <Avatar style={{ float: "right", backgroundColor: "#2a8afa" }}>
                  {" "}
                  {loadedMessageSenderID.defaultAvatar}{" "}
                </Avatar>
              ) : (
                <Avatar style={{ float: "right", backgroundColor: "#2a8afa" }}>
                  {" "}
                  {loadedMessageRecipientID.defaultAvatar}{" "}
                </Avatar>
              )}
            </GridItem>
            <GridItem xs={10} md={7}>
              <small style={{ fontWeight: "bold" }}>
                {reply.senderID === loadedMessageSenderID._id
                  ? loadedMessageSenderID.firstname
                  : loadedMessageRecipientID.firstName}{" "}
                {reply.senderID === loadedMessageSenderID._id
                  ? loadedMessageSenderID.lastName
                  : loadedMessageRecipientID.lastName}
              </small>
              <br />
              <small style={{ fontStyle: "italic" }}>
                le <Moment format={"DD/MM/YYYY"}>{reply.date}</Moment>
              </small>
              <br />
              <p style={{ fontSize: "14px", color: "#555555" }}>{reply.text}</p>
            </GridItem>
          </GridContainer>
        </div>
      ));
    }

    // End ofSetup of Replies

    return (
      <div>
        <Header
          color="transparent"
          routes={dashboardRoutes}
          brand="Adventurer"
          links={
            !isAuthenticated ? (
              <HeaderLinks dropdownHoverColor="info" />
            ) : (
              <HeaderLinksAuth dropdownHoverColor="info" />
            )
          }
          fixed
          changeColorOnScroll={{
            height: 50,
            color: "white"
          }}
          {...rest}
        />
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={10} md={10}>
                <Card className={classes.cardSignup}>
                  <h2 className={classes.cardTitle}>
                    Conversation avec {messagePartnerFirstName}{" "}
                    {messagePartnerLastName}
                  </h2>
                  <CardBody>
                    <GridContainer
                      justify="center"
                      style={{ display: "block" }}
                    >
                      {/*  Envoyer un message */}
                      <div>
                        <form onSubmit={this.onSubmit}>
                          <GridContainer>
                            <GridItem xs={12} md={12}>
                              {user.avatar ? (
                                <Avatar alt="" src={user.avatar} />
                              ) : (
                                <Avatar style={{ backgroundColor: "#ffcc00" }}>
                                  {user.defaultAvatar}
                                </Avatar>
                              )}
                              <CustomInput
                                id="reply"
                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  multiline: true,
                                  rows: 4,
                                  placeholder: "Ecrivez votre message..",
                                  onChange: this.onChange,
                                  name: "text",
                                  value: this.state.text
                                }}
                                // name = "text"
                                // value = {this.state.text}
                                // onChange = {this.onChange}
                              />
                            </GridItem>
                          </GridContainer>
                          <Button
                            type="submit"
                            color="warning"
                            className={classes.floatRight}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                color: "black",
                                fontWeight: "bold"
                              }}
                            >
                              Envoyer le message
                            </span>
                          </Button>
                          {/* <Media
                            avatar={user.defaultAvatar}
                            body={
                              <CustomInput
                                id="reply"
                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  multiline: true,
                                  rows: 4,
                                  placeholder: "Ecrivez votre message..",
                                  onChange: this.onChange,
                                  name: "text",
                                  value: this.state.text
                                }}
                              />
                            }
                            footer={
                              <Button
                                type="submit"
                                color="warning"
                                className={classes.floatRight}
                              >
                                <span
                                  style={{
                                    textTransform: "uppercase",
                                    color: "black",
                                    fontWeight: "bold"
                                  }}
                                >
                                  Envoyer le message
                                </span>
                              </Button>
                            }
                          /> */}
                          {this.state.errorText && (
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {this.state.errorText}
                            </div>
                          )}
                        </form>
                      </div>

                      {/* Fin Envoyer un message */}
                      <GridContainer style={{ display: "block" }}>
                        {originalMessageReplies}
                      </GridContainer>
                      <br />
                      {originalMessage}
                    </GridContainer>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          <FooterBar />
        </div>
      </div>
    );
  }
}

Message.propTypes = {
  auth: PropTypes.object.isRequired,
  getMessage: PropTypes.func.isRequired,
  addReply: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  message: state.message
});

export default connect(
  mapStateToProps,
  { getMessage, addReply }
)(withStyles(signupPageStyle)(withRouter(Message)));
