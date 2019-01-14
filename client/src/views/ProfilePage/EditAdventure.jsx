import React from "react";
import Datetime from "react-datetime";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'
import { updateAdventure, getAdventure, addAdventure } from '../../actions/adventureActions';


// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Check from "@material-ui/icons/Check";
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


class EditAdventure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // checked: false,
      title: '',
      mainActivity: '',
      recurring: false,
    //   secondActivity: '',
      summary: '',
      level: '',
      requiredPeople: '',
      country: '',
      location: '',
      from: '',
      duration: '',
      id: '',
      errors: {}
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.mainActivitySelected = this.mainActivitySelected.bind(this);
    this.levelSelected = this.levelSelected.bind(this);
    this.requiredPeopleSelected = this.requiredPeopleSelected.bind(this);
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
            // secondActivity: loadedAdventure.secondActivity,
            summary: loadedAdventure.summary,
            level: loadedAdventure.level,
            requiredPeople: loadedAdventure.requiredPeople,
            country: loadedAdventure.country,
            location: loadedAdventure.location,
            from: loadedAdventure.from,
            duration: loadedAdventure.duration,
            id: loadedAdventure.id
        })
    }
}

onSubmit(e) {
    e.preventDefault();

    const advData = {
      title: this.state.title,
      mainActivity: this.state.mainActivity,
      recurring: this.state.recurring,
    //   secondActivity: this.state.secondActivity,
      summary: this.state.summary,
      level: this.state.level,
      requiredPeople: this.state.requiredPeople,
      country: this.state.country,
      location: this.state.location,
      from: this.state.from,
      duration: this.state.duration,
      id: this.state.id
    };
    this.props.updateAdventure(advData, this.props.history);

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleToggle() {
    const { recurring } = this.state;
    // const currentIndex = checked.indexOf(value);
    // const newChecked = [...checked];

    if (recurring === false) {
      this.setState({recurring: true})
    } else {
      this.setState({recurring: false})
    }
  }


  mainActivitySelected = event => {
    this.setState(() => {
      return {
        mainActivity: event.target.value
      }
    })
  };

  levelSelected = event => {
    this.setState(() => {
      return {
        level: event.target.value
      }
    })
  };

  requiredPeopleSelected = (event) => {
    this.setState(() => {
      return {
        requiredPeople: event.target.value
      }
    })
  };

  dateSelected = (Date) => {
    this.setState(() => {
      return {
        from: Date
      }
    })
  };

  
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }
  render() {
    const { classes, ...rest } = this.props;
    const { errors } = this.state;
    const { isAuthenticated, user } = this.props.auth;

    const mainActivityItems = [
      {
        name: "Randonnée"
      },
      {
        name: "Trail"
      },
      {
        name: "Kitesurf"
      },
      {
        name: "Ski"
      },
    ]

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
      },
    ]

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
      },
    ]

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
                  <h2 className={classes.cardTitle}>Editer une aventure</h2>
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
                                style={{fontSize: '14px'}}
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
                                style={{fontSize: '14px'}}
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
                                      style={{fontSize: '12px'}}
                                  >
                                    {item.name}
                                  </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                          {errors.mainActivity && (<div style={{color: 'red'}}>{errors.mainActivity}</div>)}
                    {/* Choix du titre */}
                    <CustomInput
                            formControlProps={{
                              fullWidth: true,
                              className: classes.customFormControlClasses
                            }}
                            inputProps={{
                            placeholder: "Titre de l'aventure...",
                            onChange:this.onChange,
                            name: "title",
                            value:this.state.title
                            }}
                          />
                          {errors.title && (<div style={{color: 'red'}}>{errors.title}</div>)}
                    {/* Choix du niveau */}
                          <FormControl
                                fullWidth
                                className={classes.selectFormControl}
                              >
                              <InputLabel
                                htmlFor="simple-select"
                                className={classes.selectLabel}
                                style={{fontSize: '14px'}}
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
                                style={{fontSize: '14px'}}
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
                                      style={{fontSize: '12px'}}
                                  >
                                    {item.name}
                                  </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                          {errors.level && (<div style={{color: 'red'}}>{errors.level}</div>)}
                        {/* Choix du pays */}
                          <CustomInput
                            formControlProps={{
                              fullWidth: true,
                              className: classes.customFormControlClasses
                            }}
                            inputProps={{
                            placeholder: "Pays...",
                            onChange:this.onChange,
                            name: "country",
                            value:this.state.country
                            }}
                          />
                          {errors.country && (<div>{errors.country}</div>)}
                    {/* Choix du lieu */}
                          <CustomInput
                            formControlProps={{
                              fullWidth: true,
                              className: classes.customFormControlClasses
                            }}
                            inputProps={{
                            placeholder: "Lieu...",
                            onChange:this.onChange,
                            name: "location",
                            value:this.state.location
                            }}
                          />
                          {errors.location && (<div style={{color: 'red'}}>{errors.location}</div>)}
                      {/* Choix de l'activité récurrente */}
                          <FormControlLabel
                              control={
                                <Checkbox
                                  tabIndex={-1}
                                  onClick={() => this.handleToggle()}
                                  value={this.state.checked}
                                  onChange={this.onChange}
                                  name="checked"
                                  checkedIcon={<Check className={classes.checkedIcon} />}
                                  icon={<Check className={classes.uncheckedIcon} />}
                                  classes={{
                                    checked: classes.checked,
                                    root: classes.checkRoot
                                  }}
                                />
                              }
                              classes={{ label: classes.label }}
                              label="Activité récurrente"
                          />
                          {errors.recurring && (<div style={{color: 'red'}}>{errors.recurring}</div>)}
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                  <h3>Infos facultatives</h3>
                  {/* Choix du nbre de personnes */}
                  <FormControl
                                fullWidth
                                className={classes.selectFormControl}
                              >
                              <InputLabel
                                htmlFor="simple-select"
                                className={classes.selectLabel}
                                style={{fontSize: '14px'}}
                              >
                              Nombre d'équipiers recherchés
                              </InputLabel>
                              <Select
                                MenuProps={{
                                  className: classes.selectMenu
                                }}
                                classes={{
                                  select: classes.select
                                }}
                                style={{fontSize: '14px'}}
                                value={this.state.requiredPeople}
                                onChange={this.requiredPeopleSelected}
                              >
                              {requiredPeopleItems.map(item => (
                                  <MenuItem 
                                  value={item.name}
                                  key={item.name}
                                  classes={{
                                        root: classes.selectMenuItem,
                                        selected: classes.selectMenuItemSelected
                                      }}
                                      style={{fontSize: '12px'}}
                                  >
                                    {item.name}
                                  </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                          {errors.requiredPeople && (<div style={{color: 'red'}}>{errors.requiredPeople}</div>)}
                  {/* Choix de la date */}
                          <br /><br />
                          <FormControl fullWidth
                          >
                            <Datetime
                              timeFormat={true}
                              inputProps={{
                              placeholder: "Date de l'aventure prévue",
                              name: "from"
                              }}
                              onChange = {this.dateSelected}
                              name = "from"
                              value = {this.state.from}
                            />
                          </FormControl>
                          {errors.from && (<div style={{color: 'red'}}>{errors.from}</div>)}
                      {/* Choix de la durée */}
                          <CustomInput
                            formControlProps={{
                              fullWidth: true,
                              className: classes.customFormControlClasses
                            }}
                            inputProps={{
                            placeholder: "Durée de l'aventure, en jours",
                            onChange:this.onChange,
                            name: "duration",
                            value: this.state.duration
                            }}
                          />
                          {errors.duration && (<div style={{color: 'red'}}>{errors.duration}</div>)}
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
                              onChange:this.onChange,
                              name: "summary",
                              value:this.state.summary
                            }}
                          />
                          {errors.summary && (<div style={{color: 'red'}}>{errors.summary}</div>)}
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

EditAdventure.propTypes = {
    auth: PropTypes.object.isRequired,
    updateAdventure: PropTypes.func.isRequired,
    addAdventure: PropTypes.func.isRequired,
    getAdventure: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    adventure: PropTypes.object.isRequired,
  };
   const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    adventure: state.adventure
  });

export default connect(mapStateToProps, { updateAdventure, getAdventure, addAdventure }) (withStyles(signupPageStyle)(withRouter(EditAdventure)));

