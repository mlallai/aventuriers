import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userResetPassword } from '../../actions/authActions';
import {withRouter} from 'react-router-dom'
import qs from "query-string";


// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons

import Lock from "@material-ui/icons/Email";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
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


class ResetPassword extends React.Component {

constructor(props) {

        super(props);
        this.state = {
          password: '',
          verifyPassword: '',
          token: '',
          errors: {}
        }
      }
    
componentWillReceiveProps = nextProps => {
        if(nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          })
        }
      }

componentWillMount = (e) => {
        const urlQuery = qs.parse(this.props.location.search);
        this.setState({
          token: urlQuery.token
        })
      }
    
onChange = e => {
        this.setState({
          [e.target.name]: e.target.value
        })
      }
    
onSubmit = e => {
        e.preventDefault();
    
        const userData = {
          password: this.state.password,
          verifyPassword: this.state.verifyPassword,
          token: this.state.token
        }
        this.props.userResetPassword(userData, this.props.history);
      }

  render() {
    const { classes, ...rest } = this.props;
    const { errors } = this.state;
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
                  <h5 className={classes.cardTitle}>Mot de passe oublié ? Entrez votre email</h5>
                  <CardBody>
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={5} md={5}>
                        <form className={classes.form} onValidate onSubmit={this.onSubmit}>
                          <CustomInput
                            formControlProps={{
                              fullWidth: true,
                              className: classes.customFormControlClasses
                            }}
                            inputProps={{
                              startAdornment: (
                                <InputAdornment
                                  position="start"
                                  className={classes.inputAdornment}
                                >
                                  <Lock
                                    className={classes.inputAdornmentIcon}
                                  />
                                </InputAdornment>
                              ),
                            placeholder: "Entrez votre mot de passe...",
                            onChange:this.onChange,
                            name: "password",
                            value:this.state.password
                            }}
                          />
                          {errors.password && (<div>{errors.password}</div>)}
                          <CustomInput
                            formControlProps={{
                              fullWidth: true,
                              className: classes.customFormControlClasses
                            }}
                            inputProps={{
                              startAdornment: (
                                <InputAdornment
                                  position="start"
                                  className={classes.inputAdornment}
                                >
                                  <Lock
                                    className={classes.inputAdornmentIcon}
                                  />
                                </InputAdornment>
                              ),
                            placeholder: "Confirmez votre mot de passe...",
                            onChange:this.onChange,
                            name: "verifyPassword",
                            value:this.state.verifyPassword
                            }}
                          />
                          {errors.verifyPassword && (<div>{errors.verifyPassword}</div>)}
                          
                          <div className={classes.textCenter}>
                            <Button type="submit" round color="warning">
                              Envoyer
                            </Button>
                          </div>
                        </form>
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

ResetPassword.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}
 const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { userResetPassword })(withStyles(signupPageStyle)(withRouter(ResetPassword)));
