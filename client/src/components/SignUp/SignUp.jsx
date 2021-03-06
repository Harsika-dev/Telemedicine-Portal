import React, { useState, useContext } from "react";
import { UserContext } from "../../UserContext";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  Paper,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./style";
import { Redirect } from "react-router-dom";
import { signup } from "../../Api/api";

const initialUserInformation = {
  email: "",
  name :"",
  city : "",
  password: "",
  role:""
};

export const SignUp = () => {
  const [userInformation, setUserInformation] = useState(
    initialUserInformation
  );

  const [error, setError] = useState("");

  const [user, addToken] = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserInformation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    signup(userInformation)
      .then((data) => {
        if (!data) {
          setError("Bad Request Please try again");
          setUserInformation(initialUserInformation);
          return;
        }
        setError("");
        setUserInformation(initialUserInformation);
        console.log(data.token)
        addToken(data.token);
      })
      .catch((err) => setError(err));
  };

  const classes = useStyles();

  return user !== undefined ? (
    <Redirect to="/dashboard" />
  ) : (
    <Paper
      variant="elevation"
      elevation={5}
      component="main"
      className={classes.container}
    >
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            className={classes.input}
            value={userInformation.name}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            className={classes.input}
            value={userInformation.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="city"
            name="city"
            className={classes.input}
            value={userInformation.city}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            className={classes.input}
            value={userInformation.password}
            onChange={handleChange}
          />
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="role"
            label="role"
            type="role"
            className={classes.input}
            value={userInformation.role}
            onChange={handleChange}
          />
         
          <Typography color="secondary" variant="h6">
            {error}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            size="large"
          >
            Sign Up
          </Button>
        </form>
      </div>
    </Paper>
  );
};

export default SignUp;
