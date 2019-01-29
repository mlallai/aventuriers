/* eslint-disable */
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import Input from "@material-ui/core/Input";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import Search from "@material-ui/icons/Search";
import Home from "@material-ui/icons/Home";

// core components
import Button from "components/CustomButtons/Button.jsx";
import LoginModal from "./LoginModal.jsx";
import AlertModal from "./AlertModal.jsx";

import headerLinksStyle from "assets/jss/material-kit-pro-react/components/headerLinksStyle.jsx";

function HeaderLinks({ ...props }) {
  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const smoothScroll = (e, target) => {
    if (window.location.pathname === "/sections") {
      var isMobile = navigator.userAgent.match(
        /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
      );
      if (isMobile) {
        // if we are on mobile device the scroll into view will be managed by the browser
      } else {
        e.preventDefault();
        var targetScroll = document.getElementById(target);
        scrollGo(document.documentElement, targetScroll.offsetTop, 1250);
      }
    }
  };
  const scrollGo = (element, to, duration) => {
    var start = element.scrollTop,
      change = to - start,
      currentTime = 0,
      increment = 20;

    var animateScroll = function() {
      currentTime += increment;
      var val = easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  };
  var onClickSections = {};

  const { classes, dropdownHoverColor } = props;
  return (
    <List className={classes.list + " " + classes.mlAuto}>
      <ListItem className={classes.listItem}>
        {/* <Input /> */}
        <Button
          href="#pablo"
          className={
            classes.navLink
            // + " " + classes.navLinkActive
          }
          onClick={e => e.preventDefault()}
          color="transparent"
        >
          <Link
            to="/adventures"
            color="transparent"
            className={classes.navLink}
          >
            <Search />
            Rechercher
          </Link>
        </Button>
        {/* <SearchComponent /> */}
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="#pablo"
          className={
            classes.navLink
            // + " " + classes.navLinkActive
          }
          onClick={e => e.preventDefault()}
          color="transparent"
        >
          <Link to="/" color="transparent" className={classes.navLink}>
            <Home />
            Accueil
          </Link>
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <AlertModal feature={"créer une annonce"} />
      </ListItem>
      <ListItem className={classes.listItem}>
        {/* <Button
          href=""
          color={window.innerWidth < 960 ? "info" : "white"}
          target="_blank"
          className={classes.navButton}
          round
        >
           Connexion
        </Button> */}
        <LoginModal />
      </ListItem>
    </List>
  );
}

HeaderLinks.defaultProps = {
  hoverColor: "primary"
};

HeaderLinks.propTypes = {
  dropdownHoverColor: PropTypes.oneOf([
    "dark",
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose"
  ])
};

export default withStyles(headerLinksStyle)(HeaderLinks);
