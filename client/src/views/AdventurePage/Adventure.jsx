import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getAdventure, addToWishList, removeFromWishList } from '../../actions/adventureActions';
import { addMessage} from '../../actions/messageActions';
import Moment from 'react-moment';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

// @material-ui/core components
import Avatar from '@material-ui/core/Avatar';
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Close from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

// @material-ui/icons

import Favorite from "@material-ui/icons/Favorite";
import StarRate from "@material-ui/icons/StarRate";
import MailOutline from "@material-ui/icons/MailOutline";
import Place from "@material-ui/icons/Place";
import ShowChart from "@material-ui/icons/ShowChart";
import CalendarToday from "@material-ui/icons/CalendarToday";

// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import HeaderLinksAuth from "components/Header/HeaderLinksAuth.jsx";
import Spinner from "components/common/Spinner.js";
import Badge from "components/Badge/Badge.jsx";
import CommentForm from "views/AdventurePage/CommentForm.jsx";
import CommentItem from './CommentItem';
import AlertMessageModal from './AlertMessageModal.jsx';


import Parallax from "components/Parallax/Parallax.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Footer from "components/Footer/Footer.jsx";
import Button from "components/CustomButtons/Button.jsx";

import productStyle from "assets/jss/material-kit-pro-react/views/productStyle.jsx";

const dashboardRoutes = [];

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class Adventure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colorSelect: "0",
      sizeSelect: "0",
      loadedAdventure: [],
      loadedUser: '',
      loadedProfile: '',
      recurringInfo: '',
      loading: true,
      isLiked: false,
      comments: [],
      pictures: [],
      text: '',
      errors: {},
      loadedProfileSports: []
    };
    this.findUserLikes = this.findUserLikes.bind(this);
    this.onLikeClick = this.onLikeClick.bind(this);
    this.onDislikeClick = this.onDislikeClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleSelect = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleClickOpen(modal) {
    var x = [];
    x[modal] = true;
    this.setState(x);
  }
  handleClose(modal) {
    var x = [];
    x[modal] = false;
    this.setState(x);
  }

  componentWillMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    if (this.props.match.params.id) {
        this.props.getAdventure(this.props.match.params.id)
    }
  }

  componentWillReceiveProps(nextProps) {

    const { adventure } = nextProps;
    const loadedUser  = nextProps.adventure.adventure.user;
    const loadedProfile  = nextProps.adventure.adventure.profile;

    if(adventure.adventure) {
      const loadedAdventure = adventure.adventure;
      const comments = adventure.adventure.comments;
      const pictures = adventure.adventure.pictures;
      this.setState({loadedAdventure: loadedAdventure, comments: comments, pictures: pictures, loading: false});
      if (loadedUser) {
        this.setState({loadedUser: loadedUser});
      } 
      if (loadedProfile) {
        this.setState({loadedProfile: loadedProfile, loadedProfileSports: loadedProfile.sports});
      }    
      
    }

    // if (adventure.adventure.user){
    //   console.log("user id des next props", adventure.adventure.user._id)
    //   this.props.getProfileByUserID(adventure.adventure.user._id)
    // }

    let loadedLikes;
    if (adventure.adventure.likes !== nextProps) {
    // if (adventure.adventure.likes) {
      loadedLikes = adventure.adventure.likes;
      this.findUserLikes(loadedLikes)
    // }
    }
  }

  findUserLikes = likes => {

    const { auth } = this.props;
    if (likes) {
    if(likes.filter(like => like.user === auth.user.id).length > 0) {
      this.setState({
        isLiked: true
      })
    }
  }
  }

  onLikeClick = id => {
    this.props.addToWishList(id);
    this.setState({
      isLiked: !this.state.isLiked
    })
  }

  onDislikeClick = id => {
    this.props.removeFromWishList(id);
    this.setState({
      isLiked: !this.state.isLiked
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const messData = {
      text: this.state.text
    };
    this.props.addMessage(this.props.adventure.adventure.user._id, messData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { classes, ...rest  } = this.props;
    const { isAuthenticated, user } = this.props.auth;
    const { loadedAdventure, loadedUser, loadedProfile, loadedProfileSports, loading, recurringInfo, comments, pictures, errors} = this.state;
    console.log("loadedProfileSports", loadedProfileSports)
    let wish;
    if (this.state.isLiked === false) {
      wish = (
        <Button onClick={() => this.onLikeClick(loadedAdventure._id)} round color="warning">
        <StarRate style={{color: 'black'}} /> <span style={{color: 'black', fontWeight: 'bold'}}>Ajouter à mes favoris</span>
      </Button>
      )
    } else {
      wish = (
        <Button onClick={() => this.onDislikeClick(loadedAdventure._id)} round color="danger">
        Supprimer de mes favoris
      </Button>
      )
    }

    let profileSports;
    if (loadedProfileSports === undefined || null || loading) {
      profileSports = ''
    }
    else {
      profileSports = loadedProfileSports.map(sport => (
        <Badge color="info"><span style={{color: '#ffffff'}}>{sport}</span></Badge>
      ));
    }

    let pics = undefined;
    let images  = undefined;
    if (pictures === undefined || null || loading || loadedAdventure === loading) {
      pics = (<Spinner />)
    } else {
      pics = pictures;
        if (pics[0]) {
        images = pics.map( pic =>
          <div><img src={pic} alt=""/></div>)
        }
        else {
          images = (<div><img src={loadedAdventure.defaultPictures[0]} alt=""/></div>)
        }
    }

  let adventureMainPic;
  if (pictures === undefined || null || loading) {
    adventureMainPic = (<Spinner />)
  } else {
    if (pictures[0]) {
      adventureMainPic = pictures[0]
    } else {
      adventureMainPic = loadedAdventure.defaultPictures[0]
    }
  }


    let loadedComments;
    if (comments === undefined) {
      loadedComments = (
          <Spinner />
      )
  } else {
    loadedComments = comments.map(comment =>
      <CommentItem key={comment._id} comment={comment} adventureId={comment.id} />
      )
    }

    let profileContent;
    let advContent;

    // PROFILE CONTENT
    if (loading) {
      profileContent = (
          <Spinner />
      )
  } else {
    profileContent = (
    <div
    // className={classNames(classes.main, classes.mainRaised)}
    >
      <GridContainer>
          <GridItem md={12} sm={12}>
                <GridContainer style={{alignItems: 'center', justifyContent: 'center'}}>
                  <GridItem xs={12} sm={12} md={12}>
                  {loadedUser.avatar?
                    <Avatar alt="" src={loadedUser.avatar} />
                    :
                    <GridContainer style={{justifyContent: 'center'}}><Avatar style={{backgroundColor: "#2a8afa"}}>{loadedUser.defaultAvatar}</Avatar></GridContainer>
                  }
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <GridContainer style={{justifyContent: 'center'}}>
                    <span style={{textTransform: 'uppercase', fontSize: '14px', fontWeight: 'bold'}}>{loadedUser.firstName} {loadedUser.lastName}</span>
                    </GridContainer>
                    </GridItem>
                  </GridContainer>
                  <br/>
                  <GridContainer style={{justifyContent: 'center'}}>
                  {loadedProfile.age ?
                    <p>{loadedProfile.age} ans,&nbsp;</p>  
                    :
                    ''
                    }
                    {loadedProfile.location ?
                    <p>{loadedProfile.location},&nbsp;</p>  
                    :
                    ''
                    }
                    {loadedProfile.country ?
                    <p>{loadedProfile.country}</p>  
                    :
                    ''
                    }
                  </GridContainer>
                  <GridContainer style={{justifyContent: 'center'}}>
                    {loadedProfile.desc ?
                    <GridItem xs={12}><p>Bio: <span style ={{fontStyle: 'italic'}}>{loadedProfile.desc}</span></p></GridItem>
                    :
                    ''
                    }
                  </GridContainer>
                  <GridContainer style={{justifyContent: 'center'}}>
                  <div style={{margin: '0px', justifyContent: 'center'}}>
                  {profileSports}
                  </div>
                </GridContainer>
          </GridItem>
      </GridContainer>
      <br/>
      <GridContainer>
      <GridItem md={12} sm={12}>
        {/* ADD PROFILE SUMMARY & PROFILE SPORTS */}
      </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem md={12} sm={12} style={{textAlign: 'center'}}>
          {wish}
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem md={12} sm={12} style={{textAlign: 'center'}}>
        {isAuthenticated ?
        <Button onClick={() => this.handleClickOpen("classicModal")} round color="default">
        <MailOutline style={{color: '#ffffff'}} /> <span style={{color: '#ffffff', fontWeight: 'bold'}}>Contacter</span>
      </Button>
      :
      <AlertMessageModal feature={"envoyer un message"}/>
        }
       
                  <Dialog
                    classes={{
                      root: classes.modalRoot,
                      paper: classes.modal
                    }}
                    open={this.state.classicModal}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => this.handleClose("classicModal")}
                    aria-labelledby="classic-modal-slide-title"
                    aria-describedby="classic-modal-slide-description"
                  >
                    <DialogTitle
                      id="classic-modal-slide-title"
                      disableTypography
                      className={classes.modalHeader}
                    >
                      <Button
                        simple
                        className={classes.modalCloseButton}
                        key="close"
                        aria-label="Close"
                        onClick={() => this.handleClose("classicModal")}
                      >
                        {" "}
                        <Close className={classes.modalClose} />
                      </Button>
                      {/* <h4 className={classes.modalTitle}>Votre message</h4> */}
                    </DialogTitle>
                    <form onSubmit={this.onSubmit}>
                    <DialogContent
                      id="classic-modal-slide-description"
                      className={classes.modalBody}
                      style={{minWidth: '400px'}}
                    >
                       <CustomInput
                            labelText="Ecrivez votre message..."
                            id="textarea-input"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              multiline: true,
                              rows: 5,
                              placeholder: "Votre message",
                              onChange:this.onChange,
                              name: "text",
                              value:this.state.text
                            }}
                          />
                          {errors.summary && (<div style={{color: 'red'}}>{errors.summary}</div>)}
                    </DialogContent>
                    <Button type="submit" link>Envoyer Message</Button>
                    </form>
                    <DialogActions className={classes.modalFooter}>
                      <Button
                        onClick={() => this.handleClose("classicModal")}
                        color="danger"
                        simple
                      >
                        Fermer
                      </Button>
                    </DialogActions>
                  </Dialog>
        </GridItem>
      </GridContainer>
          
      </div>
  )
}

    // ADVENTURE CONTENT
    if (loading) {
            advContent = (
                <Spinner />
            )
        } else {
            advContent = (
          <div
          // className={classNames(classes.main, classes.mainRaised)}
          >
          <GridContainer>
          <h2 className={classes.title}>{loadedAdventure.title}</h2>
          
          </GridContainer>
          <br/>
          <GridContainer style={{width: '100%', marginleft: '0px', marginRight: 'Opx'}}>
            <GridItem xs={12} sm={6} md={3} style={{marginBottom: '20px', boxShadow: '0 12px 24px -10px rgba(0, 0, 0, 0.1)'}} >
             {/* Info Localisation */}
              <GridContainer>
                            <GridItem xs={4} style={{paddingLeft: '70px'}}>
                                <Place style={{color: '#ffcc00'}}/>
                            </GridItem>
                            <GridItem xs={4}>
                                <p style={{marginBottom: '-8px', color: 'black', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '11px'}}>Localisation</p>
                                <p style={{lineHeight: '2em',marginBottom: '-8px', color: 'black', fontSize: '11px'}}>{loadedAdventure.location}</p>
                                <p style={{lineHeight: '2em',color: 'black', fontSize: '11px'}}>{loadedAdventure.country}</p>
                                
                            </GridItem>
                </GridContainer>
            </GridItem>
            <br/>
            <GridItem xs={12} sm={6} md={3} style={{marginBottom: '20px',boxShadow: '0 12px 24px -10px rgba(0, 0, 0, 0.1)'}}>
                {/* Info Niveau */}
                        <GridContainer>
                          <GridItem xs={4} style={{paddingLeft: '70px'}}>
                              <StarRate style={{color: '#ffcc00'}}/>
                          </GridItem>
                          <GridItem xs={4}>
                              <p style={{marginBottom: '-8px', color: 'black', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '11px'}}>Niveau</p>
                              <p style={{lineHeight: '2em',marginBottom: '-8px', color: 'black', fontSize: '11px'}}>{loadedAdventure.level}</p>
                              {loadedAdventure.requiredPeople ? <p style={{lineHeight: '1.5em', color: 'black', fontSize: '11px'}}>{loadedAdventure.requiredPeople} équipiers</p> : ''}
                              
                          </GridItem>
                        </GridContainer>
            </GridItem>
            <br/>
            <GridItem xs={12} sm={6} md={3} style={{marginBottom: '20px',boxShadow: '0 12px 24px -10px rgba(0, 0, 0, 0.1)'}}>
            {/* Info Activité */}
            <GridContainer>
                          <GridItem xs={4} style={{paddingLeft: '70px'}}>
                              <ShowChart style={{color: '#ffcc00'}}/>
                          </GridItem>
                          <GridItem xs={4}>
                              <p style={{marginBottom: '-8px', color: 'black', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '11px'}}>Activité</p>
                              <p style={{lineHeight: '2em',marginBottom: '-8px', color: 'black', fontSize: '11px'}}>{loadedAdventure.mainActivity}</p>
                              
                              
                          </GridItem>
                        </GridContainer>
            </GridItem>
            <br/>
            <GridItem xs={12} sm={6} md={3} style={{marginBottom: '20px',boxShadow: '0 12px 24px -10px rgba(0, 0, 0, 0.1)'}}>
            {/* Info Date */}
            <GridContainer>
                          <GridItem xs={4} style={{paddingLeft: '70px'}}>
                              <CalendarToday style={{color: '#ffcc00'}}/>
                          </GridItem>
                          <GridItem xs={4}>
                              <p style={{marginBottom: '-8px', color: 'black', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '11px'}}>Date</p>
                              {loadedAdventure.from ? 
                              <div>
                              <p style={{lineHeight: '2em', color: 'black', fontSize: '11px'}}><Moment format={"DD/MM/YYYY"}>{loadedAdventure.from}</Moment></p> 
                              {loadedAdventure.duration ? <p style={{lineHeight: '2em', color: 'black', fontSize: '11px'}}>{loadedAdventure.duration} jours</p> : ''}
                              </div>
                              : <p style={{lineHeight: '2em', color: 'black', fontSize: '11px'}}>Non définie</p>}
                              
                          </GridItem>
                        </GridContainer>
            </GridItem>
          <br/>
          </GridContainer>
          <br/>
            <GridContainer>
                <GridItem md={5} sm={5}>
                  {/* <ImageGallery
                    showFullscreenButton={false}
                    showPlayButton={false}
                    startIndex={3}
                    items={images}
                  /> */}
                  <Carousel>
                    {images}
                  </Carousel>
                  
                </GridItem>
                <GridItem md={7} sm={7}>
                <div>
                    <h3 style={{marginTop: '0px'}}className={classes.title}>A propos</h3>
                    <br />
                    <br />
                    <p>{loadedAdventure.summary ? loadedAdventure.summary : "Pas de résumé" }</p>
                </div>
                </GridItem>
              </GridContainer>
              <GridContainer>
                  <GridItem xs={12}>
                  <div>
                          <h4 style={{textAlign: 'left', fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase'}}className={`${classes.title}`}>
                            Commentaires
                          </h4>
                          <br/>
                        {isAuthenticated ? <CommentForm adventureId={loadedAdventure._id} /> : <h5>Vous devez être connecté pour poster un commentaire</h5>}
                        {/* <CommentFeed adventureId={loadedAdventure._id} comments={loadedAdventure.comments} /> */}
                        <br/><br/>
                        {loadedComments}
                  </div>
                  </GridItem>
              </GridContainer>
            </div>
        )
    }
    
    return (
      <div className={classes.productPage}>
        <Header
          color="transparent"
          routes={dashboardRoutes}
          brand="Adventurer"
          links={ !isAuthenticated ? <HeaderLinks dropdownHoverColor="info" /> : <HeaderLinksAuth dropdownHoverColor="info" />}
          fixed
          changeColorOnScroll={{
            height: 100,
            color: "white"
          }}
          {...rest}
        />
        <Parallax
        style={{maxHeight: '600px'}}
          image={adventureMainPic}
          filter="dark"
          className={classes.parallax}
        >
        </Parallax>
        <div
          className={classNames(classes.main, classes.mainRaised)}
          style={{ paddingTop: "70px", marginLeft: '30px', marginRight: '30px' }}
        >
          <div className={classNames(classes.container)}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  {/* <div className={classes.container}> */}
                  <GridContainer style ={{justifyContent: 'center', padding: '10px', margin: '10px', border: '1px solid rgba(232, 236, 241, 1)', borderRadius: '8px'}}>
                      {profileContent}
                    </GridContainer>
                  {/* </div> */}
                  </GridItem>
                  <GridItem xs={12} sm={12} md={9}>
                  {/* <div className={classes.container}> */}
                        {advContent}
                  {/* </div> */}
                  </GridItem>
                </GridContainer>
          </div>
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
    );
  }
}

Adventure.propTypes = {
    auth: PropTypes.object.isRequired,
    getAdventure: PropTypes.func.isRequired,
    addToWishList: PropTypes.func.isRequired,
    removeFromWishList: PropTypes.func.isRequired,
    adventure: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addMessage: PropTypes.func.isRequired,

  }
   const mapStateToProps = (state) => ({
    auth: state.auth,
    adventure: state.adventure,
    errors: state.errors,
    messages: state.messages,
  })

export default connect(mapStateToProps, { getAdventure, addToWishList, removeFromWishList, addMessage })(withStyles(productStyle)(Adventure));