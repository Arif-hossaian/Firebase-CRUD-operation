import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Grow,
  Typography,
} from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import useStyles from "./styles.js";
import React, { useState, useEffect } from "react";
import Loading from "../Layout/Loading.jsx";
import Avatar from "../Layout/Avatar.jsx";
import { useFirestore } from "react-redux-firebase";

const Student = () => {
  const { id } = useParams();
  const classes = useStyles();
  const firestore = useFirestore();
  const [student, setStudent] = useState(null);
  const loadStudent = async () => {
    try {
      const docRef = firestore.collection("students").doc(id);
      const result = await docRef.get();
      if (result.exists) setStudent(result.data());
      else alert("No such student id exits");
    } catch (error) {
      console.log("Error:", error);
    }
  };
  useEffect(() => {
    loadStudent();
  }, []);
  if (!student) {
    return <Loading />;
  }
  return (
    <Container>
      <Grow in>
        <Card className={classes.root}>
          <CardContent>
            <Grid container>
              <Grid item xs={12} sm={12} md={4}>
                <Avatar url={`https://i.pravatar.cc/150?img=${id}`} />
              </Grid>
              <Grid item md={8}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography variant="h6">{student.name}</Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    component={Link}
                    to={`/studentForm/${id}`}
                  >
                    edit profile
                  </Button>
                </div>
                <div style={{ marginTop: "15px" }}>
                  <Typography variant="subtitle2">
                    Email:- {student.email}
                  </Typography>
                  <Typography variant="subtitle2">
                    Phone:- {student.phone}
                  </Typography>
                  <Typography variant="subtitle2">
                    Class:- {student.standard}
                  </Typography>
                  <Typography variant="subtitle2">
                    Temporay Address:- {student.address1}
                  </Typography>
                  <Typography variant="subtitle2">
                    Parmanent Address:- {student.address2}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grow>
    </Container>
  );
};

export default Student;
