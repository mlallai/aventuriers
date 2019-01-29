import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/adventureActions";

import withStyles from "@material-ui/core/styles/withStyles";

import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Avatar from "@material-ui/core/Avatar";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import productStyle from "assets/jss/material-kit-pro-react/views/productStyle.jsx";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {},
      errorText: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }
  onSubmit(e) {
    e.preventDefault();

    if (this.state.text.length < 10) {
      this.setState({
        errorText: "Votre commentaire doit contenir au moins 10 caractères."
        // text: ""
      });
    } else {
      const { user } = this.props.auth;
      const { adventureId } = this.props;

      const newComment = {
        text: this.state.text,
        firstName: user.firstName,
        lastName: user.firstName,
        avatar: user.avatar,
        defaultAvatar: user.defaultAvatar
      };

      this.props.addComment(adventureId, newComment);

      this.setState({ text: "", errorText: "" });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { classes, ...rest } = this.props;
    const { user } = this.props.auth;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <GridContainer>
            <GridItem xs={12} md={6}>
              {user.avatar ? (
                <Avatar alt="" src={user.avatar} />
              ) : (
                <Avatar style={{ backgroundColor: "#ffcc00" }}>
                  {user.defaultAvatar}
                </Avatar>
              )}
              {/* <Media
                      // key={Math.random() * Date.now()}
                      avatar={user.avatar}
                      body={ */}
              <CustomInput
                id="reply"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  multiline: true,
                  rows: 4,
                  placeholder: "Ecrivez votre commentaire à l'organisateur...",
                  onChange: this.onChange,
                  name: "text",
                  value: this.state.text
                }}
                // name = "text"
                // value = {this.state.text}
                // onChange = {this.onChange}
              />
              {/* } */}
              {/* // footer={ */}
              <Button
                type="submit"
                color="warning"
                className={classes.floatRight}
              >
                <span
                  style={{
                    textTransform: "uppercase",
                    color: "black",
                    fontWeight: "bold"
                  }}
                >
                  commenter
                </span>
              </Button>
              {/* //           }
            // /> */}
              {this.state.errorText && (
                <div style={{ color: "red", fontSize: "12px" }}>
                  {this.state.errorText}
                </div>
              )}
            </GridItem>
          </GridContainer>
        </form>
      </div>
      //   <div className="post-form mb-3">
      //     <div className="card card-info">
      //       <div className="card-header bg-info text-white">
      //         Make a comment...
      //       </div>
      //       <div className="card-body">
      //         <form onSubmit={this.onSubmit}>
      //           <div className="form-group">
      //             <TextAreaFieldGroup
      //               placeholder="Reply to post"
      //               name="text"
      //               value={this.state.text}
      //               onChange={this.onChange}
      //               error={errors.text}
      //             />
      //           </div>
      //           <button type="submit" className="btn btn-dark">
      //             Submit
      //           </button>
      //         </form>
      //       </div>
      //     </div>
      //   </div>
    );
  }
}
CommentForm.propTypes = {
  //   addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  adventureId: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addComment }
)(withStyles(productStyle)(CommentForm));
