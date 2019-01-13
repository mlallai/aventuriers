import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

 class CommentFeed extends Component {

  render() {
    const { comments, adventureId } = this.props;
     return comments.map(comment => (
      <CommentItem key={comment._id} comment={comment} adventureId={adventureId} />
    ));
  }
}
 CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  adventureId: PropTypes.string.isRequired
};
 export default CommentFeed;