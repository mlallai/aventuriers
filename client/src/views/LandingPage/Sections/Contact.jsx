import React from "react";
import signupPageStyle from "assets/jss/material-kit-pro-react/views/signupPageStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import HeaderLinksAuth from "components/Header/HeaderLinksAuth.jsx";
import image from "assets/img/mountain.jpg";
import GridContainer from "components/Grid/GridContainer.jsx";
import FooterBar from "views/Footer/FooterBar.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

const dashboardRoutes = [];

class Contact extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }

  render() {
    const { classes, ...rest } = this.props;
    const { isAuthenticated, user } = this.props.auth;
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
            height: 100,
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
              <Card className={classes.cardSignup}>
                <h2 className={classes.cardTitle}>Contact</h2>
                <CardBody>
                  <GridContainer justify="center">
                    <GridItem xs={12} sm={5} md={5}>
                      <h4>Adventurer SAS</h4>
                      <p>
                        129 ter rue du chemin vert
                        <br />
                        75011
                        <br />
                        Paris
                        <hr />
                        contact@adventurer-app.com
                      </p>
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridContainer>
          </div>
        </div>
        <FooterBar />
      </div>
    );
  }
}

Contact.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withStyles(signupPageStyle)(Contact));
