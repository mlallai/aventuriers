/* eslint-disable */
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getUserMessages } from '../../actions/messageActions';
import { Link } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import HeaderLinksAuth from "components/Header/HeaderLinksAuth.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import Button from "components/CustomButtons/Button.jsx";

import profilePageStyle from "assets/jss/material-kit-pro-react/views/profilePageStyle.jsx";
import Spinner from "components/common/Spinner.js";

const dashboardRoutes = [];

class MessagePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedUserMessages: [],
    
    };
  }

  componentWillMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    this.props.getUserMessages();
  }

  componentWillReceiveProps(nextProps) {
    const { message } = nextProps;

    let loadedUserMessages;
    if (message.messages) {
      loadedUserMessages = message.messages;
      this.setState({loadedUserMessages: loadedUserMessages})
      console.log(loadedUserMessages)
    }
    else {
      this.setState({loadedUserMessages: [] })
    }
    
  }

  render() {
    const { value } = this.state;
    const { classes, loading, ...rest } = this.props;
    const { isAuthenticated, user } = this.props.auth;
    const { loadedUserMessages } = this.state;

    // Mise en forme Messages

    let messageList = undefined;
    if (loadedUserMessages === null || loading || undefined) {
      messageList = (
        <h4>
          <Spinner />
        </h4>
      );
    } else {
    loadedUserMessages === [] ?
    messageList = <h4>Aucun message.</h4>
    :
      messageList = loadedUserMessages.map(mess => (
        <GridContainer style={{marginBottom: '20px', alignItems: 'center'}}>
                <GridItem xs={12} md={3}>
                Conversation avec {mess.recipientID.firstName === user.firstName ? mess.senderID.firstName : mess.recipientID.firstName} {mess.recipientID.lastName === user.lastName ? mess.senderID.lastName : mess.recipientID.lastName}
                </GridItem>
                <GridItem xs={12} md={3}>
                    <Link to={`/message/${mess._id}`}><Button
                          color="warning"
                          block
                          className={classes.subscribeButton}
                        >
                        <span style={{color: 'black', fontWeight: 'bold'}}>
                        Voir la conversation
                        </span>
                        </Button>
                        </Link>
                </GridItem>
                <hr/>
        </GridContainer>
      ));
    }
    
    // Fin Mise en forme Messages

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
            height: 200,
            color: "white"
          }}
          {...rest}
        />
        <Parallax
          image={require("assets/img/mountain.jpg")}
          filter="dark"
          className={classes.parallax}
        />
       {/* MESSAGES */}
       <div
          className={classNames(classes.main, classes.mainRaised)}
          style={{ paddingTop: "70px", paddingBottom: '70px' }}
        >
          <div className={classes.container}>
          <h3>Messages</h3>
          {messageList}
          </div>
        </div>
        <Footer
            content={
              <div>
                <div className={classes.left}>
                  <List className={classes.list}>
                    <ListItem className={classes.inlineBlock}>
                      <a
                        href="/"
                        className={classes.block}
                      >
                        Adventurer
                      </a>
                    </ListItem>
                    <ListItem className={classes.inlineBlock}>
                      <a
                        href="#"
                        className={classes.block}
                      >
                        About us
                      </a>
                    </ListItem>
                    <ListItem className={classes.inlineBlock}>
                      <a
                        href="https://medium.com/adventurerapp"
                        target="_blank"
                        className={classes.block}
                      >
                        Blog
                      </a>
                    </ListItem>
                  </List>
                </div>
                <div className={classes.right} style={{fontSize: '14px'}}>
                  &copy; {1900 + new Date().getYear()} , made with{" "}
                  <Favorite style={{color: 'green'}} className={classes.icon} /> by{" "}
                  Adventurer, for an
                  ethical outdoor world.
                </div>
              </div>
            }
          />
      </div>
    );
  }
}

MessagePage.propTypes = {
  getUserMessages: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
  message: state.message
});

export default connect(
  mapStateToProps,
  { getUserMessages }
)(withStyles(profilePageStyle)(MessagePage));
