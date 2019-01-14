import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import {withRouter} from 'react-router-dom'


// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import signupPageStyle from "assets/jss/material-kit-pro-react/views/signupPageStyle.jsx";

import image from "assets/img/mountain.jpg";


const dashboardRoutes = [];


class EmailSent extends React.Component {
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          color="transparent"
          routes={dashboardRoutes}
          brand="Adventurer"
          links={<HeaderLinks dropdownHoverColor="info" />}
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
                  <h5 className={classes.cardTitle}>Mot de passe envoyé !</h5>
                  <CardBody>
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={5} md={5}>
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
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
      </div>
    );
  }
}

EmailSent.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}
 const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(withStyles(signupPageStyle)(withRouter(EmailSent)));


// export default connect(mapStateToProps, { registerUser })(Register);
// export default withStyles(signupPageStyle);
