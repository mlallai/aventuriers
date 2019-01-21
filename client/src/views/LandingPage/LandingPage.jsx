import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getLatestAdventures } from "../../actions/adventureActions";
import Moment from "react-moment";
import FooterBar from "views/Footer/FooterBar.jsx";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
import Search from "@material-ui/icons/Search";

// core components
import Header from "components/Header/Header.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import HeaderLinksAuth from "components/Header/HeaderLinksAuth.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import SectionPreFooter1 from "views/ComponentsPage/Sections/SectionPreFooter1.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import Info from "components/Typography/Info.jsx";
import Badge from "components/Badge/Badge.jsx";

import landingPageStyle from "assets/jss/material-kit-pro-react/views/landingPageStyle.jsx";

import mountainPic from "assets/img/examples/mountainPic.jpg";
import kitesurfPic from "assets/img/examples/kitesurfPic.jpg";
import parachutePic from "assets/img/examples/parachutePic.jpg";
import trekkingPic from "assets/img/examples/trekkingPic.jpg";

import Features from "./Features.jsx";

import Spinner from "components/common/Spinner.js";
import EcoBadge from "assets/img/logos/EcoBadge.png";

const dashboardRoutes = [];

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedAdventures: [],
      loading: false
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    this.props.getLatestAdventures();
    console.log("props did mount", this.props);
  }

  componentWillReceiveProps(nextProps) {
    // const { course, loading } = nextProps;

    if (nextProps.adventure.adventure) {
      const loadedAdventures = nextProps.adventure.adventure;
      this.setState({ loadedAdventures: loadedAdventures });
    }
  }

  render() {
    const { classes, ...rest } = this.props;
    const { isAuthenticated } = this.props.auth;
    const { loadedAdventures, loading } = this.state;

    let adventureLandingItem;
    if (loadedAdventures === null || loading) {
      adventureLandingItem = <Spinner />;
    } else {
      adventureLandingItem = loadedAdventures.map(adv => (
        <GridItem xs={12} sm={6} md={3}>
          }
          <Card plain blog style={{ marginTop: "5px" }}>
            <div>
              <CardHeader
                plain
                image
                style={{ position: "relative", textAlign: "center" }}
              >
                <div style={{ width: "100%" }}>
                  {adv.pictures[0] ? (
                    <Link to={`/adventure/${adv._id}`}>
                      <img
                        style={{ minHeight: "170px", maxHeight: "170px" }}
                        src={adv.pictures[0]}
                        alt="..."
                      />
                    </Link>
                  ) : (
                    <Link to={`/adventure/${adv._id}`}>
                      <img
                        style={{ minHeight: "170px", maxHeight: "170px" }}
                        src={adv.defaultPictures[0]}
                        alt="..."
                      />
                    </Link>
                  )}
                </div>
                <div style={{ position: "absolute", top: "0px", left: "2px" }}>
                  <GridContainer>
                    <GridItem xs={6}>
                      {adv.from ? (
                        <Badge color="warning">
                          <span style={{ color: "black" }}>
                            <Moment format={"DD/MM/YY"}>{adv.from}</Moment>
                          </span>
                        </Badge>
                      ) : (
                        <Badge color="warning">
                          <span style={{ color: "black" }}>A DEFINIR</span>
                        </Badge>
                      )}
                    </GridItem>
                    <GridItem xs={6}>
                      {adv.ecoLabel.length > 0 ? (
                        <img
                          style={{ width: "25px" }}
                          src={EcoBadge}
                          alt="..."
                        />
                      ) : (
                        ""
                      )}
                    </GridItem>
                  </GridContainer>
                  {/* <GridContainer>
                          <GridItem xs={12}>
                            <span style={{color: '#ffffff', textTransform: 'uppercase', fontSize: '10px', fontWeight: 'bold'}}>Niveau {adv.level}</span>
                          </GridItem>
                          </GridContainer> */}
                  <GridContainer>
                    <GridItem xs={12}>
                      {adv.recurring ? (
                        <Badge color="info">
                          <span style={{ color: "#ffffff" }}>
                            ACTIVITE RECURRENTE
                          </span>
                        </Badge>
                      ) : (
                        ""
                      )}
                    </GridItem>
                  </GridContainer>
                </div>
              </CardHeader>
            </div>
            <CardBody plain>
              <Info>
                <h6 className={classes.cardCategory}>
                  {adv.mainActivity} - {adv.location}
                  <br />
                  <span style={{ color: "#9c27b0" }}>Niveau {adv.level}</span>
                </h6>
              </Info>
              <div>
                <Link
                  to={`/adventure/${adv._id}`}
                  onClick={e => e.preventDefault()}
                >
                  <h3
                    style={{
                      fontSize: "1.4em",
                      color: "#3C4858",
                      marginTop: "0",
                      marginBottom: "0",
                      minHeight: "65px"
                    }}
                    className={classes.cardTitle}
                  >
                    {adv.title}
                  </h3>
                </Link>
              </div>
              {/* {adv.summary ?
                          <div>
                            <p style={{marginBottom: '0', height: '50px', overflow: 'scroll'}} className={classes.description}>
                            {adv.summary}
                            </p>
                          </div>
                          : ''} */}
              <div>
                <Link style={{ color: "black" }} to={`/adventure/${adv._id}`}>
                  {" "}
                  <Button color="warning" size="sm">
                    <span style={{ color: "black", fontWeight: "bold" }}>
                      Voir
                    </span>
                  </Button>
                </Link>
              </div>
            </CardBody>
          </Card>
        </GridItem>
      ));
    }
    return (
      <div>
        {/* {!isAuthenticated ? */}
        <Header
          style={{}}
          color="transparent"
          routes={dashboardRoutes}
          brand="AVENTURIERS.CO"
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
        <Parallax image={require("assets/img/mountain.jpg")} filter="dark">
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={6} md={6}>
                <h1 style={{ fontSize: "45px" }} className={classes.title}>
                  La plateforme de l'aventure <br /> responsable.
                </h1>
                <h3>
                  Adventurer est le premier site communautaire d'échange et de
                  partage entre passionnés de sports outdoor.
                </h3>
                <br />
                <Link to="/adventures">
                  <Button
                    color="warning"
                    round
                    className={classes.subscribeButton}
                    href="/"
                    // target="_blank"
                  >
                    <span style={{ color: "black" }}>
                      Rechercher une aventure
                    </span>
                  </Button>
                </Link>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem>
                <h2 className={classes.title} style={{ color: "#3C4858" }}>
                  Dernières aventures proposées
                </h2>
              </GridItem>
            </GridContainer>
            <GridContainer>{adventureLandingItem}</GridContainer>
          </div>
          <div className={classes.container}>
            <Features />
            <GridContainer justify="center">
              <GridItem>
                <h2 className={classes.title} style={{ color: "#3C4858" }}>
                  Tous les sports outdoor
                </h2>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={6} md={6}>
                <Card
                  raised
                  background
                  style={{ backgroundImage: `url(${mountainPic})` }}
                >
                  <CardBody background>
                    <a href="#" onClick={e => e.preventDefault()}>
                      <h2
                        style={{ color: "white" }}
                        className={classes.cardTitleWhite}
                      >
                        Sports de montagne
                      </h2>
                      <h6 style={{ color: "#ffffff" }}>
                        Randonnée, Trail, Alpinisme
                      </h6>
                    </a>
                    <Link to={`/adventures`}>
                      <Button round color="warning">
                        <Search />
                        Trouver mon projet
                      </Button>
                    </Link>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={6}>
                <Card
                  raised
                  background
                  style={{ backgroundImage: `url(${kitesurfPic})` }}
                >
                  <CardBody background>
                    <a href="#" onClick={e => e.preventDefault()}>
                      <h2
                        style={{ color: "white" }}
                        className={classes.cardTitleWhite}
                      >
                        Sports de mer
                      </h2>
                      <h6 style={{ color: "#ffffff" }}>
                        Surf, voile, kitesurf, planche à voile
                      </h6>
                    </a>
                    <Link to={`/adventures`}>
                      <Button round color="warning">
                        <Search />
                        Trouver mon projet
                      </Button>
                    </Link>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={6}>
                <Card
                  raised
                  background
                  style={{ backgroundImage: `url(${parachutePic})` }}
                >
                  <CardBody background>
                    <a href="#" onClick={e => e.preventDefault()}>
                      <h2
                        style={{ color: "white" }}
                        className={classes.cardTitleWhite}
                      >
                        Sports aériens
                      </h2>
                      <h6 style={{ color: "#ffffff" }}>Parapente, parachute</h6>
                    </a>
                    <Link to={`/adventures`}>
                      <Button round color="warning">
                        <Search />
                        Trouver mon projet
                      </Button>
                    </Link>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={6}>
                <Card
                  raised
                  background
                  style={{ backgroundImage: `url(${trekkingPic})` }}
                >
                  <CardBody background>
                    <a href="#" onClick={e => e.preventDefault()}>
                      <h2
                        style={{ color: "white" }}
                        className={classes.cardTitleWhite}
                      >
                        Voyages d'aventure
                      </h2>
                      <h6 style={{ color: "#ffffff" }}>
                        Treks, voyage à vélo, voyage à cheval
                      </h6>
                    </a>
                    <Link to={`/adventures`}>
                      <Button round color="warning">
                        <Search />
                        Trouver mon projet
                      </Button>
                    </Link>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
            <SectionPreFooter1 />
          </div>
        </div>
        <FooterBar />
      </div>
    );
  }
}

const styles = {
  cardContainer: {
    position: "relative"
  },
  cardImage: {
    width: "100%"
  },
  cardText: {
    position: "absolute"
  }
};

LandingPage.propTypes = {
  auth: PropTypes.object.isRequired,
  getLatestAdventures: PropTypes.func.isRequired,
  adventure: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  adventure: state.adventure
});

export default connect(
  mapStateToProps,
  { getLatestAdventures }
)(withStyles(landingPageStyle)(LandingPage));
