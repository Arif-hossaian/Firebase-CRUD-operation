import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Grow,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputForm from "./InputForm";
import React, { useState } from "react";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "400px", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const firebase = useFirebase();
  const history = useHistory();
  const classes = useStyles();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase.login(user);
    history.push("/");
  };
  return (
    <Container maxWidth="sm">
      <Grow in>
        <Card className={classes.paper} variant="outlined">
          <CardContent>
            <Typography component="h1" variant="h5" align="center">
              Login
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={5}>
                <InputForm
                  label="Enter your email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  required
                />
                <InputForm
                  label="Enter your password"
                  name="password"
                  value={user.password}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                className={classes.submit}
              >
                Sign in
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grow>
    </Container>
  );
};

export default Login;
