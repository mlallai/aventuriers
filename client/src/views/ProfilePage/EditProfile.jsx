import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCurrentProfile, createProfile } from "../../actions/profileActions";
import isEmpty from "validation/isEmpty.js";
import TagsInput from "react-tagsinput";
import Place from "react-algolia-places";
import FooterBar from "views/Footer/FooterBar.jsx";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";

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

import signupPageStyle from "assets/jss/material-kit-pro-react/views/signupPageStyle.jsx";

import image from "assets/img/mountain.jpg";

const dashboardRoutes = [];

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      age: "",
      desc: "",
      country: "",
      location: "",
      sports: "",
      website: "",
      facebook: "",
      instagram: "",
      youtube: "",
      errors: {},
      sports: [],
      cityName: "",
      cityLat: "",
      cityLng: "",
      cityCountry: "",
      cityPostcode: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleTags = this.handleTags.bind(this);
    this.handleCity = this.handleCity.bind(this);
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // If profile field doesnt exist, make empty string
      profile.age = !isEmpty(profile.age) ? profile.age : "";
      profile.desc = !isEmpty(profile.desc) ? profile.desc : "";
      profile.country = !isEmpty(profile.country) ? profile.country : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.sports = !isEmpty(profile.sports) ? profile.sports : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.facebook = !isEmpty(profile.facebook) ? profile.facebook : "";
      profile.instagram = !isEmpty(profile.instagram) ? profile.instagram : "";
      profile.youtube = !isEmpty(profile.youtube) ? profile.youtube : "";

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
      country: this.state.cityCountry,
      location: this.state.cityName,
      sports: this.state.sports,
      website: this.state.website,
      facebook: this.state.facebook,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };
    console.log(profileData);
    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleTags(regularTags) {
    this.setState({ sports: regularTags });
  }

  handleCity(o) {
    this.setState({
      cityName: o.suggestion.name,
      cityLat: o.suggestion.latlng.lat,
      cityLng: o.suggestion.latlng.lng,
      cityCountry: o.suggestion.country,
      cityPostcode: o.suggestion.postcode
    });
  }

  render() {
    const { classes, ...rest } = this.props;
    const { errors } = this.state;
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
                  <h2 className={classes.cardTitle}>Editer mon profil</h2>
                  <CardBody>
                    <form onValidate onSubmit={this.onSubmit}>
                      <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={12}>
                          {/* Sports */}
                          <p>Vos sports préférés</p>
                          <TagsInput
                            inputProps={{
                              placeholder: "+ Ajouter"
                            }}
                            value={this.state.sports}
                            onChange={this.handleTags}
                            tagProps={{ className: "react-tagsinput-tag info" }}
                          />
                          {/* Age */}
                          <TextField
                            // id="standard-number"
                            label="Saisissez votre âge"
                            name="age"
                            value={this.state.age}
                            onChange={this.onChange}
                            type="number"
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true
                            }}
                            margin="normal"
                            style={{ width: "100%" }}
                          />
                          {errors.age && (
                            <div style={{ color: "red" }}>{errors.age}</div>
                          )}
                          {/* BIO */}
                          {/* Choix du résumé */}
                          <CustomInput
                            labelText="Votre description"
                            id="textarea-input"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              multiline: true,
                              rows: 5,
                              placeholder: "Présentez-vous...",
                              onChange: this.onChange,
                              name: "desc",
                              value: this.state.desc
                            }}
                          />
                          {errors.desc && (
                            <div style={{ color: "red" }}>{errors.desc}</div>
                          )}
                          <p>Votre ville</p>
                          <Place
                            id="location"
                            type="city"
                            appId="plPMSCRAI5KI"
                            apiKey="ccc2d1c1fea0b91859b497137b714aee"
                            placeholder="Saisissez la ville"
                            onChange={o => this.handleCity(o)}
                            language="fr"
                          />
                          {errors.location && (
                            <div style={{ color: "red" }}>
                              {errors.location}
                            </div>
                          )}
                        </GridItem>
                        <div className={classes.textCenter}>
                          <Button type="submit" round color="warning">
                            Enregistrer mon profil
                          </Button>
                        </div>
                      </GridContainer>
                    </form>
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

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withStyles(signupPageStyle)(withRouter(EditProfile)));
