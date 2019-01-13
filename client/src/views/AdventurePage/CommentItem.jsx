import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/adventureActions';

import withStyles from "@material-ui/core/styles/withStyles";

import Media from "components/Media/Media.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Reply from "@material-ui/icons/Reply";
import Button from "components/CustomButtons/Button.jsx";
import Moment from "react-moment";
import Avatar from '@material-ui/core/Avatar';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import productStyle from "assets/jss/material-kit-pro-react/views/productStyle.jsx";


class CommentItem extends Component {
  
onDeleteClick(adventureId, commentId) {
        this.props.deleteComment(adventureId, commentId);
      }

   render() {
    // const { errors } = this.state;
    const { classes, comment, ...rest  } = this.props;
    const { isAuthenticated, user } = this.props.auth;

    return (

        <div>
            <GridContainer>
              <GridItem xs={2}>
              {comment.avatar?
                      <Avatar style={{float: 'right'}}> {comment.avatar} </Avatar>
                      :
                      <Avatar style={{float: 'right', backgroundColor: "#2a8afa"}}> {comment.defaultAvatar} </Avatar>
                    }
              </GridItem>
              <GridItem xs={10} md={7}>
              <small style={{fontWeight: 'bold'}}>{comment.firstName} {comment.lastName}</small>
                      <br/>
                      <small style={{fontStyle: 'italic'}}>le <Moment format={"DD/MM/YYYY"}>{comment.date}</Moment></small>
                      <br/>
                      <p style={{fontSize: '14px', color: '#555555'}}>{comment.text}</p>
              </GridItem>
            </GridContainer>
            <hr/>
        </div>
    );
  }
}
CommentItem.propTypes = {
deleteComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  adventureId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
};
 const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { deleteComment })(withStyles(productStyle)(CommentItem));