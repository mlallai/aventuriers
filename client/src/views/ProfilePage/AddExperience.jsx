import React from "react";
import Datetime from "react-datetime";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addExperience } from "../../actions/profileActions";
import Dropzone from "react-dropzone";
import axios from "axios";
import classNames from "classnames";
import { GoogleComponent } from "react-google-location";
import countriesSelect from "./Countries";
import Place from "react-algolia-places";

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
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import signupPageStyle from "assets/jss/material-kit-pro-react/views/signupPageStyle.jsx";

import image from "assets/img/mountain.jpg";

const dashboardRoutes = [];
// const cloudinary = require('cloudinary');

const config_api_key = "834569565449654";
// const config_secret_key = "n2y6t-uMogfMbQ9PD26onY1LwGk";
const config_preset = "iusjncko";
const config_cloud_name = "adventurer";
const config_tags = "Image test";

const API_KEY = "AIzaSyA4WFpHaLAMbx4L3Fx_Zcrpl80CjgHFORc";

class AddExperience extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      mainActivity: "",
      summary: "",
      level: "",
      country: "",
      location: "",
      from: "",
      duration: "",
      errors: {},
      loadingPics: "",
      uploadedPics: [],
      place: "",
      cityName: "",
      cityLat: "",
      cityLng: "",
      cityCountry: "",
      cityPostcode: ""
    };
    // this.handleToggle = this.handleToggle.bind(this);
    this.mainActivitySelected = this.mainActivitySelected.bind(this);
    this.levelSelected = this.levelSelected.bind(this);
    this.handleCity = this.handleCity.bind(this);
    // this.requiredPeopleSelected = this.requiredPeopleSelected.bind(this);
    // this.handleUploadImages = this.handleUploadImages.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    let expPlaceData;
    if (this.state.place !== undefined) {
      expPlaceData = this.state.place;
    } else {
      expPlaceData = "";
    }

    const expData = {
      title: this.state.title,
      mainActivity: this.state.mainActivity,
      summary: this.state.summary,
      level: this.state.level,
      country: this.state.cityCountry,
      location: this.state.cityName,
      from: this.state.from,
      duration: this.state.duration,
      uploadedPics: this.state.uploadedPics
    };
    this.props.addExperience(expData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  //   handleToggle() {
  //     const { recurring } = this.state;

  //     if (recurring === false) {
  //       this.setState({recurring: true})
  //     } else {
  //       this.setState({recurring: false})
  //     }
  //   }

  mainActivitySelected = event => {
    this.setState(() => {
      return {
        mainActivity: event.target.value
      };
    });
  };

  handleCity(o) {
    this.setState({
      cityName: o.suggestion.name,
      cityLat: o.suggestion.latlng.lat,
      cityLng: o.suggestion.latlng.lng,
      cityCountry: o.suggestion.country,
      cityPostcode: o.suggestion.postcode
    });
  }

  countrySelected = event => {
    this.setState(() => {
      return {
        country: event.target.value
      };
    });
  };

  levelSelected = event => {
    this.setState(() => {
      return {
        level: event.target.value
      };
    });
  };

  //   requiredPeopleSelected = (event) => {
  //     this.setState(() => {
  //       return {
  //         requiredPeople: event.target.value
  //       }
  //     })
  //   };

  dateSelected = Date => {
    this.setState(() => {
      return {
        from: Date
      };
    });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }

  // Stockage de des photos dans cloudinary
  handleUploadImages = images => {
    // uploads is an array that would hold all the post methods for each image to be uploaded, then we'd use axios.all()
    const handleUploadPics = [];
    const uploads = images.map(image => {
      const ctx = this;
      // Changing the text displayed in DropZone area
      ctx.setState({ loadingPics: "Upload en cours..." });
      const formData = new FormData();
      formData.append("file", image);
      formData.append("tags", config_tags); // Add tags for the images - {Array}
      formData.append("upload_preset", config_preset); // Replace the preset name with your own
      formData.append("api_key", config_api_key); // Replace API key with your own Cloudinary API key
      formData.append("api_secret", config_api_key); // Replace API secret with your own Cloudinary API secret
      formData.append("timestamp", (Date.now() / 1000) | 0);
      // Replace cloudinary upload URL with yours
      return fetch(
        `https://api.cloudinary.com/v1_1/${config_cloud_name}/image/upload/`,
        {
          method: "POST",
          body: formData
        }
      )
        .then(response => {
          return response.json();
        })
        .then(pictures => {
          handleUploadPics.push(pictures.url);
        });
      // .then(function(response) {
      //   console.log("response.data", response);
      // })
      // .then(res => console.log("response after cloudi upload", res))
    });

    // We would use axios `.all()` method to perform concurrent image upload to cloudinary.
    axios.all(uploads).then(() => {
      // ... do anything after successful upload. You can setState() or save the data
      this.setState({ loadingPics: "Téléchargement terminé !" });
      this.setState({ uploadedPics: handleUploadPics });
    });
  };

  render() {
    const { classes, ...rest } = this.props;
    const { errors, country } = this.state;
    const { isAuthenticated, user } = this.props.auth;

    const mainActivityItems = [
      {
        name: "Alpinisme"
      },
      {
        name: "Canyoning"
      },
      {
        name: "Cyclisme"
      },
      {
        name: "Equitation"
      },
      {
        name: "Escalade"
      },
      {
        name: "Canoë-kayak"
      },
      {
        name: "Kitesurf"
      },
      {
        name: "Paddle"
      },
      {
        name: "Parachute"
      },
      {
        name: "Parapente"
      },
      {
        name: "Planche à voile"
      },
      {
        name: "Plongée"
      },
      {
        name: "Randonnée"
      },
      {
        name: "Ski"
      },
      {
        name: "Ski de fond"
      },
      {
        name: "Ski de randonnée"
      },
      {
        name: "Snowboard"
      },
      {
        name: "Surf"
      },
      {
        name: "Trail"
      },
      {
        name: "Trek"
      },
      {
        name: "Voile"
      },
      {
        name: "Voyage à cheval"
      },
      {
        name: "Voyage à pied"
      },
      {
        name: "Voyage à vélo"
      },
      {
        name: "VTT"
      },
      {
        name: "Wakeboard"
      }
    ];

    const levelItems = [
      {
        name: "Débutant"
      },
      {
        name: "Confirmé"
      },
      {
        name: "Avancé"
      },
      {
        name: "Expert"
      }
    ];

    const requiredPeopleItems = [
      {
        name: 1
      },
      {
        name: 2
      },
      {
        name: 3
      },
      {
        name: 4
      },
      {
        name: 5
      },
      {
        name: 6
      },
      {
        name: 7
      },
      {
        name: 8
      },
      {
        name: 9
      },
      {
        name: 10
      }
    ];

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
                    Ajouter une précédente aventure
                  </h2>
                  <CardBody>
                    <form onValidate onSubmit={this.onSubmit}>
                      <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={6}>
                          <h3>Infos obligatoires</h3>
                          {/* Choix du sport */}
                          <FormControl
                            fullWidth
                            className={classes.selectFormControl}
                          >
                            <InputLabel
                              htmlFor="simple-select"
                              className={classes.selectLabel}
                              style={{ fontSize: "14px" }}
                            >
                              Choix du sport
                            </InputLabel>
                            <Select
                              MenuProps={{
                                className: classes.selectMenu
                              }}
                              classes={{
                                select: classes.select
                              }}
                              style={{ fontSize: "14px" }}
                              value={this.state.mainActivity}
                              onChange={this.mainActivitySelected}
                            >
                              {mainActivityItems.map(item => (
                                <MenuItem
                                  value={item.name}
                                  key={item.name}
                                  classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected
                                  }}
                                  style={{ fontSize: "12px" }}
                                >
                                  {item.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          {errors.mainActivity && (
                            <div style={{ color: "red" }}>
                              {errors.mainActivity}
                            </div>
                          )}
                          {/* Choix du titre */}
                          <CustomInput
                            formControlProps={{
                              fullWidth: true,
                              className: classes.customFormControlClasses
                            }}
                            inputProps={{
                              placeholder: "Titre de l'aventure...",
                              onChange: this.onChange,
                              name: "title",
                              value: this.state.title
                            }}
                          />
                          {errors.title && (
                            <div style={{ color: "red" }}>{errors.title}</div>
                          )}
                          {/* Choix du niveau */}
                          <FormControl
                            fullWidth
                            className={classes.selectFormControl}
                          >
                            <InputLabel
                              htmlFor="simple-select"
                              className={classes.selectLabel}
                              style={{ fontSize: "14px" }}
                            >
                              Niveau
                            </InputLabel>
                            <Select
                              MenuProps={{
                                className: classes.selectMenu
                              }}
                              classes={{
                                select: classes.select
                              }}
                              style={{ fontSize: "14px" }}
                              value={this.state.level}
                              onChange={this.levelSelected}
                            >
                              {levelItems.map(item => (
                                <MenuItem
                                  value={item.name}
                                  key={item.name}
                                  classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected
                                  }}
                                  style={{ fontSize: "12px" }}
                                >
                                  {item.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          {errors.level && (
                            <div style={{ color: "red" }}>{errors.level}</div>
                          )}
                          <br />
                          <br />
                          <p
                            style={{
                              padding: "12px 0 7px",
                              fontSize: "0.85rem",
                              fontWeight: "400",
                              lineHeight: "1.42857",
                              textDecoration: "none",
                              textTransform: "uppercase",
                              color: "#3C4858",
                              letterSpacing: "0"
                            }}
                          >
                            Lieu / Lieu de départ de l'aventure passée
                          </p>
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
                        <GridItem xs={12} sm={12} md={6}>
                          <h3>Infos facultatives</h3>
                          {/* Choix de la date */}
                          <br />
                          <br />
                          <FormControl fullWidth>
                            <Datetime
                              timeFormat={false}
                              inputProps={{
                                placeholder: "Date de l'aventure prévue",
                                name: "from"
                              }}
                              onChange={this.dateSelected}
                              name="from"
                              value={this.state.from}
                            />
                          </FormControl>
                          {errors.from && (
                            <div style={{ color: "red" }}>{errors.from}</div>
                          )}
                          {/* Choix de la durée */}
                          <TextField
                            // id="standard-number"
                            label="Durée de l'aventure, en jours"
                            name="duration"
                            value={this.state.duration}
                            onChange={this.onChange}
                            type="number"
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true
                            }}
                            margin="normal"
                            style={{ width: "100%" }}
                          />
                          {errors.duration && (
                            <div style={{ color: "red" }}>
                              {errors.duration}
                            </div>
                          )}
                          {/* Choix du résumé */}
                          <CustomInput
                            labelText="Présentez votre aventure..."
                            id="textarea-input"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              multiline: true,
                              rows: 5,
                              placeholder: "Résumé...",
                              onChange: this.onChange,
                              name: "summary",
                              value: this.state.summary
                            }}
                          />
                          {errors.summary && (
                            <div style={{ color: "red" }}>{errors.summary}</div>
                          )}

                          <Dropzone onDrop={this.handleUploadImages}>
                            {({
                              getRootProps,
                              getInputProps,
                              isDragActive
                            }) => {
                              return (
                                <div
                                  {...getRootProps()}
                                  className={classNames("dropzone", {
                                    "dropzone--isActive": isDragActive
                                  })}
                                >
                                  <input {...getInputProps()} />
                                  {isDragActive ? (
                                    <p>Drop files here...</p>
                                  ) : (
                                    <Button color="primary" size="sm">
                                      Sélectionnez vos photos
                                    </Button>
                                  )}
                                </div>
                              );
                            }}
                          </Dropzone>
                          {this.state.loadingPics}
                        </GridItem>
                        <div className={classes.textCenter}>
                          <Button type="submit" round color="warning">
                            C'est parti
                          </Button>
                        </div>
                      </GridContainer>
                    </form>
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
                      <a href="/" className={classes.block}>
                        Adventurer
                      </a>
                    </ListItem>
                    <ListItem className={classes.inlineBlock}>
                      <a href="#" className={classes.block}>
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
                <div className={classes.right} style={{ fontSize: "14px" }}>
                  &copy; {1900 + new Date().getYear()} , made with{" "}
                  <Favorite
                    style={{ color: "green" }}
                    className={classes.icon}
                  />{" "}
                  by Adventurer, for an ethical outdoor world.
                </div>
              </div>
            }
          />
        </div>
      </div>
    );
  }
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { addExperience }
)(withStyles(signupPageStyle)(withRouter(AddExperience)));
