import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Button,
  Grid,
  Typography,
  Grow,
} from "@material-ui/core";
import useStyles from "./styles.js";
import { Link } from "react-router-dom";
import React from "react";
import { useFirestoreConnect, useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import Loading from "../Layout/Loading.jsx";

const Students = () => {
  const classes = useStyles();
  const firestore = useFirestore();
  const students = useSelector((state) => state.firestore.ordered.students);
  useFirestoreConnect([
    {
      collection: "students",
    },
  ]);
  const deleteStudentField = async (id) => {
    try {
      await firestore.collection("students").doc(id).delete();
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  if (!students) {
    return <Loading />;
  }

  return (
    <Container>
      <Grow in>
        <Grid container spacing={3}>
          {students.map((student) => (
            <Grid item xs={12} sm={3} md={4} key={student.id}>
              <Card className={classes.root}>
                <CardMedia
                  className={classes.media}
                  alt="Arif"
                  image={`https://i.pravatar.cc/150?img=${student.id}`}
                />
                <CardContent>
                  <div className={classes.CardContent}>
                    <Typography variant="h5" gutterBottom>
                      {student.name}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      {student.email}
                    </Typography>
                  </div>
                </CardContent>

                <CardActions className={classes.cardActions}>
                  <Button
                    size="small"
                    color="primary"
                    component={Link}
                    to={`/student/${student.id}`}
                  >
                    View Profile
                  </Button>
                  <Button
                    size="small"
                    color="secondary"
                    variant="outlined"
                    onClick={() => deleteStudentField(student.id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grow>
    </Container>
  );
};

export default Students;
