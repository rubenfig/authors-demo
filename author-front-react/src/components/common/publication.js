import React from "react";
import {Card, CardContent, CardHeader, Divider, Typography, makeStyles} from "@material-ui/core";
import Moment from "react-moment";

const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: 20
  },
  content: {
    whiteSpace: "pre-wrap"
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    textAlign: "center"
  },
  divider: {
    marginTop: 20,
    marginBottom: 20
  }
}));


function Publication (props) {
  const {author, publication} = props;
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader className={classes.header} title={publication.title}>
      </CardHeader>
      <CardContent className={classes.content}>
          {publication.body}
        <Divider className={classes.divider} />
        <Typography paragraph align="right">
          Written by: {author.fullname}
        </Typography>
        <Typography paragraph align="right">
          {author.email}
        </Typography>
        <Typography paragraph align="right">
          <Moment date={publication.date} format={"YYYY-MM-DD HH:mm"} />
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Publication;
