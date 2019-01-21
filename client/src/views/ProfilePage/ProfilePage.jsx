/* eslint-disable */
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import {
  getCurrentProfile,
  deleteExperience
} from "../../actions/profileActions";
import {
  getUserAdventures,
  deleteAdventure,
  getWishedAdventures
} from "../../actions/adventureActions";

import { Link } from "react-router-dom";
import Moment from "react-moment";
import FooterBar from "views/Footer/FooterBar.jsx";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons

import Favorite from "@material-ui/icons/Favorite";
import History from "@material-ui/icons/History";
import AddCircle from "@material-ui/icons/AddCircle";
import Edit from "@material-ui/icons/Edit";

import Avatar from "@material-ui/core/Avatar";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import HeaderLinksAuth from "components/Header/HeaderLinksAuth.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Badge from "components/Badge/Badge.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Info from "components/Typography/Info.jsx";

import profilePageStyle from "assets/jss/material-kit-pro-react/views/profilePageStyle.jsx";
import Spinner from "components/common/Spinner.js";

const dashboardRoutes = [];

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#ffcc00"
  },
  indicator: {
    backgroundColor: "white"
  }
});

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedProfileExperience: [],
      loadedUserAdventures: [],
      loadedProfileSports: [],
      wishedAdventures: [],
      newProfile: {},
      value: 0
    };
    this.delete = this.delete.bind(this);
  }

  componentWillMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    this.props.getCurrentProfile();
    this.props.getUserAdventures();
    this.props.getWishedAdventures();
  }

  componentWillReceiveProps(nextProps) {
    const { profile, adventure } = nextProps;
    let loadedProfileExperience;
    let loadedProfileSports;
    let newProfile;

    if (profile.profile) {
      loadedProfileExperience = profile.profile.experience;
      loadedProfileSports = profile.profile.sports;
      newProfile = profile.profile;
      this.setState({
        loadedProfileExperience: loadedProfileExperience,
        loadedProfileSports: loadedProfileSports,
        newProfile: newProfile
      });
    } else {
      this.setState({
        loadedProfileExperience: [],
        loadedProfileSports: [],
        newProfile: {}
      });
    }

    let loadedUserAdventures;
    if (adventure.adventures) {
      loadedUserAdventures = adventure.adventures;
      this.setState({ loadedUserAdventures: loadedUserAdventures });
    }

    let wishedAdventures;
    if (adventure.wishedAdventures) {
      wishedAdventures = adventure.wishedAdventures;
      this.setState({ wishedAdventures: wishedAdventures });
    }
  }

  delete = () => {
    console.log("Hello");
    console.log(this.props.adventure._id);
    this.props.deleteAdventure(this.props.adventure._id, this.props.history);
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    const { classes, ...rest } = this.props;
    const { isAuthenticated, user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    const {
      loadedProfileExperience,
      loadedProfileSports,
      newProfile,
      loadedUserAdventures,
      wishedAdventures
    } = this.state;
    console.log("user", user);

    let userSports;
    if (loadedProfileSports === undefined || loading || null) {
      userSports = "Non définis.";
    } else {
      userSports = loadedProfileSports.map(sport => (
        <Badge color="info">
          <span style={{ color: "#ffffff" }}>{sport}</span>
        </Badge>
      ));
    }

    let adventureList;
    if (loadedUserAdventures !== undefined) {
      adventureList = loadedUserAdventures.map(adv => (
        <GridItem xs={12} sm={4} md={4}>
          <Card plain blog>
            <div>
              <CardHeader
                plain
                image
                style={{ position: "relative", textAlign: "center" }}
              >
                <div style={{ width: "100%" }}>
                  <Link to={`/adventure/${adv._id}`}>
                    {adv.pictures[0] ? (
                      <img src={adv.pictures[0]} alt="..." />
                    ) : (
                      <img
                        style={{ minHeight: "160px" }}
                        src={adv.defaultPictures[0]}
                        alt="..."
                      />
                    )}
                  </Link>
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
                    <GridItem xs={6}>{adv.eco ? { EcoBadge } : ""}</GridItem>
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

              <Link to={`/adventure/${adv._id}`}>
                <h3
                  style={{
                    fontSize: "1.4em",
                    fontWeight: "normal",
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
                <br />
                <Button
                  color="default"
                  size="sm"
                  onClick={() => {
                    this.props.deleteAdventure(adv._id);
                  }}
                >
                  <span style={{ color: "#ffffff", fontWeight: "bold" }}>
                    Supprimer
                  </span>
                </Button>
              </div>
            </CardBody>
          </Card>
        </GridItem>
      ));
    } else {
      adventureList = "";
    }

    let experience;
    if (loadedProfileExperience !== undefined) {
      experience = loadedProfileExperience.map(exp => (
        <GridItem xs={12} sm={4} md={4}>
          <Card plain blog>
            <div>
              <CardHeader
                plain
                image
                style={{ position: "relative", textAlign: "center" }}
              >
                <div style={{ width: "100%" }}>
                  {exp.pictures[0] ? (
                    <img src={exp.pictures[0]} alt="..." />
                  ) : (
                    <img
                      style={{ minHeight: "160px" }}
                      src={exp.defaultPictures[0]}
                      alt="..."
                    />
                  )}
                </div>
                <div style={{ position: "absolute", top: "0px", left: "2px" }}>
                  <GridContainer>
                    <GridItem xs={6}>
                      {exp.from ? (
                        <Badge color="warning">
                          <span style={{ color: "black" }}>
                            <Moment format={"DD/MM/YY"}>{exp.from}</Moment>
                          </span>
                        </Badge>
                      ) : (
                        <Badge color="warning">
                          <span style={{ color: "black" }}>A DEFINIR</span>
                        </Badge>
                      )}
                    </GridItem>
                    <GridItem xs={6}>{exp.eco ? { EcoBadge } : ""}</GridItem>
                  </GridContainer>
                  {/* <GridContainer>
                          <GridItem xs={12}>
                            <span style={{color: '#ffffff', textTransform: 'uppercase', fontSize: '10px', fontWeight: 'bold'}}>Niveau {exp.level}</span>
                          </GridItem>
                          </GridContainer> */}
                </div>
              </CardHeader>
            </div>
            <CardBody plain>
              <Info>
                <h6 className={classes.cardCategory}>
                  {exp.mainActivity} - {exp.location}
                  <br />
                  <span style={{ color: "#9c27b0" }}>Niveau {exp.level}</span>
                </h6>
              </Info>
              <h3
                style={{
                  fontSize: "1.4em",
                  color: "#3C4858",
                  fontWeight: "normal",
                  marginTop: "0",
                  marginBottom: "0",
                  minHeight: "70px"
                }}
                className={classes.cardTitle}
              >
                {exp.title}
              </h3>
              {exp.summary ? (
                <div>
                  <p
                    style={{
                      marginBottom: "0",
                      height: "50px",
                      overflow: "scroll"
                    }}
                    className={classes.description}
                  >
                    {exp.summary}
                  </p>
                </div>
              ) : (
                ""
              )}
              <div>
                <Button
                  color="default"
                  size="sm"
                  onClick={() => {
                    this.props.deleteExperience(exp._id);
                  }}
                >
                  <span style={{ color: "#ffffff", fontWeight: "bold" }}>
                    Supprimer
                  </span>
                </Button>
              </div>
            </CardBody>
          </Card>
        </GridItem>
      ));
    } else {
      experience = "";
    }

    // Mise en forme Wished Adventures

    let wishedAdventuresList;
    if (wishedAdventures !== undefined) {
      wishedAdventuresList = wishedAdventures.map(adv => (
        <GridItem xs={12} sm={4} md={4}>
          <Card plain blog>
            <div>
              <CardHeader
                plain
                image
                style={{ position: "relative", textAlign: "center" }}
              >
                <div style={{ width: "100%" }}>
                  <Link to={`/adventure/${adv._id}`}>
                    {adv.pictures[0] ? (
                      <img src={adv.pictures[0]} alt="..." />
                    ) : (
                      <img
                        style={{ minHeight: "160px" }}
                        src={adv.defaultPictures[0]}
                        alt="..."
                      />
                    )}
                  </Link>
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
                    <GridItem xs={6}>{adv.eco ? { EcoBadge } : ""}</GridItem>
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

              <Link
                to={`/adventure/${adv._id}`}
                onClick={e => e.preventDefault()}
              >
                <h3
                  style={{
                    fontSize: "1.4em",
                    color: "#3C4858",
                    fontWeight: "normal",
                    marginTop: "0",
                    marginBottom: "0",
                    minHeight: "65px"
                  }}
                  className={classes.cardTitle}
                >
                  {adv.title}
                </h3>
              </Link>
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
    } else {
      wishedAdventuresList = "";
    }

    // Fin Mise en forme Wished Adventures

    let profileBtn;
    // if (profile === null || {}) {
    if (Object.keys(newProfile).length > 0) {
      profileBtn = (
        <Button
          color="warning"
          round
          className={classes.subscribeButton}
          href="/"
          // target="_blank"
        >
          <Link to="/edit-profile">
            <span style={{ color: "black" }}>
              <Edit />
              Editer mon profil
            </span>
          </Link>
        </Button>
      );
    } else {
      profileBtn = (
        <Button
          color="warning"
          round
          className={classes.subscribeButton}
          href="/"
          // target="_blank"
        >
          <Link to="/create-profile">
            <span style={{ color: "black" }}>Créer mon profil</span>
          </Link>
        </Button>
      );
    }

    let experienceLink;
    if (Object.keys(newProfile).length > 0) {
      experienceLink = <Link to="/add-experience">Ajouter une expérience</Link>;
    } else {
      experienceLink = "Créez votre profil pour ajouter une expérience";
    }

    let profileContent;

    if (profile === null || loading) {
      profileContent = (
        <h4>
          <Spinner />
        </h4>
      );
    } else {
      // check if login user has profile data
      // if(Object.keys(profile).length > 0) {
      profileContent = (
        <div
          className={classNames(classes.main, classes.mainRaised)}
          style={{ paddingTop: "70px" }}
        >
          <div className={classes.container}>
            <GridContainer
              style={{ justifyContent: "center", textAlign: "center" }}
            >
              <GridItem xs={12} sm={12} md={3}>
                <GridContainer
                  style={{
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "10px",
                    margin: "10px",
                    border: "1px solid rgba(232, 236, 241, 1)",
                    borderRadius: "8px"
                  }}
                >
                  <GridItem
                    md={12}
                    sm={12}
                    style={{ justifyContent: "center", textAlign: "center" }}
                  >
                    <GridContainer
                      style={{
                        alignItems: "center",
                        textAlign: "center",
                        justifyContent: "center"
                      }}
                    >
                      {user.avatar ? (
                        <GridItem>
                          <Avatar alt="" src={user.avatar} />
                        </GridItem>
                      ) : (
                        <GridItem
                          style={{ display: "inline", alignItems: "center" }}
                        >
                          <GridContainer
                            style={{
                              justifyContent: "center",
                              alignItems: "center"
                            }}
                          >
                            <Avatar
                              style={{
                                backgroundColor: "#2a8afa",
                                textAlign: "center"
                              }}
                            >
                              {user.defaultAvatar}
                            </Avatar>
                          </GridContainer>
                        </GridItem>
                      )}
                      <GridItem xs={12} sm={12} md={12}>
                        <h5 style={{ margin: "0px" }} className={classes.title}>
                          {user.firstName} {user.lastName}
                        </h5>
                      </GridItem>
                    </GridContainer>
                    <GridContainer
                      style={{ justifyContent: "center", textAlign: "center" }}
                    >
                      {profile.age ? <p>{profile.age} ans,&nbsp;</p> : ""}
                      {profile.location ? <p>{profile.location},&nbsp;</p> : ""}
                      {profile.country ? <p>{profile.country}</p> : ""}
                    </GridContainer>
                    <GridContainer style={{ justifyContent: "center" }}>
                      <div style={{ margin: "0px", justifyContent: "center" }}>
                        <h5
                          style={{ margin: "0px", textAlign: "center" }}
                          className={classes.title}
                        >
                          Sports pratiqués
                        </h5>
                        {userSports}
                      </div>
                    </GridContainer>
                  </GridItem>
                </GridContainer>
                <br />
                <GridContainer />
              </GridItem>
              <GridItem xs={12} sm={12} md={9}>
                <GridContainer>
                  <GridItem xs={12} md={8}>
                    <div>
                      <h1 style={{ marginTop: "0px", marginBottom: "30px" }}>
                        Bonjour {user.firstName}
                      </h1>
                    </div>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} md={3}>
                    {profileBtn}
                  </GridItem>
                  <GridItem xs={12} md={3}>
                    <Button
                      color="warning"
                      round
                      className={classes.subscribeButton}
                      href="/"
                      // target="_blank"
                    >
                      <Link to="/add-adventure">
                        <AddCircle style={{ color: "black" }} />
                        <span style={{ color: "black" }}>
                          Créer une aventure
                        </span>
                      </Link>
                    </Button>
                  </GridItem>
                  <GridItem xs={12} md={3}>
                    <Button
                      color="warning"
                      round
                      className={classes.subscribeButton}
                      href="/"
                      // target="_blank"
                    >
                      <Link to="/add-experience">
                        <History style={{ color: "black" }} />
                        <span style={{ color: "black" }}>
                          Ajouter une aventure passée
                        </span>
                      </Link>
                    </Button>
                  </GridItem>
                </GridContainer>
                <br />
                <div className={classes.root}>
                  <AppBar style={{ background: "#ffffff" }} position="static">
                    <Tabs
                      value={value}
                      onChange={this.handleChange}
                      inkBarContainerStyle={{ backgroundColor: "blue" }}
                    >
                      <Tab
                        style={{ color: "#414d5d", fontSize: "11px" }}
                        label="Informations"
                      />
                      <Tab
                        style={{ color: "#414d5d", fontSize: "11px" }}
                        label="Prochaines Aventures"
                      />
                      <Tab
                        style={{ color: "#414d5d", fontSize: "11px" }}
                        label="Précédentes Aventures"
                      />
                      <Tab
                        style={{ color: "#414d5d", fontSize: "11px" }}
                        label="Wish List"
                      />
                    </Tabs>
                  </AppBar>
                  {value === 0 && (
                    <TabContainer>
                      <div>
                        {/* <div>
                    <h3 style={{textTransform: 'uppercase', marginTop: '0px', marginBottom: '10px'}}>Bio</h3>
                    </div> */}
                        {/* Container Desc */}
                        <GridContainer
                          style={{ marginBottom: "20px", textAlign: "left" }}
                        >
                          <h6>A propos</h6>
                          <GridItem
                            xs={12}
                            style={{
                              border: "1px solid rgba(232, 236, 241, 1)",
                              paddingTop: "10px",
                              borderRadius: "8px",
                              display: "table-cell",
                              verticalAlign: "middle"
                            }}
                          >
                            <div>
                              <p>{profile.desc}</p>
                            </div>
                          </GridItem>
                        </GridContainer>
                        {/* Container Firstname */}
                        <GridContainer style={{ marginBottom: "20px" }}>
                          <GridItem xs={12} md={5}>
                            <GridContainer
                              style={{
                                marginBottom: "20px",
                                textAlign: "left"
                              }}
                            >
                              <h6>Prénom</h6>
                              <GridItem
                                xs={12}
                                style={{
                                  border: "1px solid rgba(232, 236, 241, 1)",
                                  paddingTop: "10px",
                                  borderRadius: "8px",
                                  display: "table-cell",
                                  verticalAlign: "middle"
                                }}
                              >
                                <div>
                                  <p>{user.firstName}</p>
                                </div>
                              </GridItem>
                            </GridContainer>
                          </GridItem>
                          <GridItem xs={0} md={2} />
                          <GridItem xs={12} md={5}>
                            <GridContainer
                              style={{
                                marginBottom: "20px",
                                textAlign: "left"
                              }}
                            >
                              <h6>Nom</h6>
                              <GridItem
                                xs={12}
                                style={{
                                  border: "1px solid rgba(232, 236, 241, 1)",
                                  paddingTop: "10px",
                                  borderRadius: "8px",
                                  display: "table-cell",
                                  verticalAlign: "middle"
                                }}
                              >
                                <div>
                                  <p>{user.lastName}</p>
                                </div>
                              </GridItem>
                            </GridContainer>
                          </GridItem>
                        </GridContainer>
                        {/* Container Email */}
                        <GridContainer style={{ marginBottom: "20px" }}>
                          <GridItem xs={12} md={12}>
                            <GridContainer
                              style={{
                                marginBottom: "20px",
                                textAlign: "left"
                              }}
                            >
                              <h6>Email</h6>
                              <GridItem
                                xs={12}
                                style={{
                                  border: "1px solid rgba(232, 236, 241, 1)",
                                  paddingTop: "10px",
                                  borderRadius: "8px",
                                  display: "table-cell",
                                  verticalAlign: "middle"
                                }}
                              >
                                <div>
                                  <p>{user.email}</p>
                                </div>
                              </GridItem>
                            </GridContainer>
                          </GridItem>
                        </GridContainer>
                      </div>
                    </TabContainer>
                  )}
                  {value === 1 && (
                    <TabContainer>
                      <div>
                        <GridContainer>{adventureList}</GridContainer>
                      </div>
                    </TabContainer>
                  )}
                  {value === 2 && (
                    <TabContainer>
                      <GridContainer>{experience}</GridContainer>
                    </TabContainer>
                  )}
                  {value === 3 && (
                    <TabContainer>
                      <div>
                        <div>{wishedAdventuresList}</div>
                      </div>
                    </TabContainer>
                  )}
                </div>
              </GridItem>
            </GridContainer>
            <Clearfix />
          </div>
        </div>
      );
    }

    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRoundedCircle,
      classes.imgFluid
    );
    const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

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
        {profileContent}
        <FooterBar />
      </div>
    );
  }
}

ProfilePage.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getUserAdventures: PropTypes.func.isRequired,
  getWishedAdventures: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteExperience: PropTypes.func.isRequired,
  deleteAdventure: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  adventure: state.adventure,
  wishedAdventures: state.wishedAdventures
});

export default connect(
  mapStateToProps,
  {
    getCurrentProfile,
    deleteExperience,
    getUserAdventures,
    deleteAdventure,
    getWishedAdventures
  }
)(withStyles(profilePageStyle)(ProfilePage));
