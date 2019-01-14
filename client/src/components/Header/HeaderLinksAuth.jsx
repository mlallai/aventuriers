/* eslint-disable */
import React, { Component } from "react";
// nodejs library to set properties for components
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import Mail from "@material-ui/icons/Mail";
import AddCircle from "@material-ui/icons/AddCircle";
import Search from "@material-ui/icons/Search";
import Home from "@material-ui/icons/Home";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-kit-pro-react/components/headerLinksStyle.jsx";

class HeaderLinksAuth extends Component {

  onLogoutClick (e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }


  render () {

  const { classes, dropdownHoverColor } = this.props;
  const { isAuthenticated, user } = this.props.auth;
  
  return (
    <List className={classes.list + " " + classes.mlAuto}>
      <ListItem className={classes.listItem}>
      <Button
          href="#pablo"
          className={classes.navLink
            // + " " + classes.navLinkActive
          }
          onClick={e => e.preventDefault()}
          color="transparent"
       >
          <Link to="/adventures" color="transparent" className={classes.navLink}><Search />Rechercher</Link>
       </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
      <Button
          href="#pablo"
          className={classes.navLink
            // + " " + classes.navLinkActive
          }
          onClick={e => e.preventDefault()}
          color="transparent"
       >
          <Link to="/" color="transparent" className={classes.navLink}><Home />Accueil</Link>
       </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
      <Button
         className={classes.navLink}
         onClick={e => e.preventDefault()}
         color="transparent"
       >
        <Link to="/messages" color="transparent" className={classes.navLink}> <Mail />Messages</Link>
        </Button>
      </ListItem>
      {/* <ListItem className={classes.listItem}>
      <Button
         className={classes.navLink}
         onClick={e => e.preventDefault()}
         color="transparent"
       >
        <AccountCircle /> <Link to="/profile" color="transparent" className={classes.navLink}>Profil</Link>
        </Button>
      </ListItem> */}
      <ListItem className={classes.listItem}>
      <Button
          color="info"
          round
          className={classes.subscribeButton}
          href="/"
           // target="_blank"
         >
           <Link to ="/add-adventure"><AddCircle style={{color: "#ffffff"}} /><span style={{color: "#ffffff"}}>Créer une aventure</span>
           </Link>
       </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
      <CustomDropdown
                      // dropdownHeader="Dropdown header"
                      buttonText ={user.firstName}
                      buttonProps={{
                        round: true,
                        block: true,
                        backgroundColor: "warning"
                      }}
                      dropPlacement="bottom"
                      dropdownList={[
                        <span style={{background: 'none'}}><Link style={{color: "black"}} to="/profile"><span>Mon Profil</span></Link></span>,
                        <span style={{background: 'none'}} onClick={this.onLogoutClick.bind(this)}>Se déconnecter</span>
                        // "Another action",
                        // "Sometjing else here",
                        // { divider: true },
                        // "Separeted link"
                      ]}
                    />
      </ListItem>
    </List>
  );
}
}

HeaderLinksAuth.defaultProps = {
  hoverColor: "primary"
};

HeaderLinksAuth.propTypes = {
  dropdownHoverColor: PropTypes.oneOf([
    "dark",
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose"
  ]),
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect (mapStateToProps, { logoutUser, clearCurrentProfile })(withStyles(headerLinksStyle)(HeaderLinksAuth));
