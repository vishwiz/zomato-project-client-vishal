import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import BookTable from "../components/bookTable.js";
import '../componentCss/card.css'

const styles = {
  card: {
    maxWidth: 460
  },
  media: {
    height: 240
  },
  starRating:{
    float:"right",
    background:"green",
  }
};

function MediaCard(props) {
  const { classes } = props;
  console.log(props);

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.restaurantsImage}
          title="Best Of Food Adda"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.restaurantsName}
          </Typography>
          <Typography gutterBottom>
            {props.restaurantsLocality_Verbose}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
       {/* <div className=""> */}
       <BookTable 
        restaurantsData = {props.restaurantsData} />
               <div className="star-rating"><h3 className={classes.starRating}>&#9734; {props.restaurantsData.user_rating.aggregate_rating}</h3></div>
         {/* </div> */}
      </CardActions>
    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MediaCard);
