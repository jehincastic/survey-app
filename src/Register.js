import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";

const styles = {
    heading: {
        color: "#3f51b5"
    },
    emailField: {
        width: "30%"
    },
    nameField: {
        width: "30%"
    },
    passwordField: {
        width: "30%"
    },
    btn: {
        width: "80px",
        position: "relative",
        top: "20px"
    },
    form: {
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "30vh",
        justifyContent: "space-between"
    },
    login: {
        position: "relative",
        top: "100px",
        color: "#3f51b5",
        borderColor: "#3f51b5"
    }
};

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            name: "",
            open: false
        };
    }

    componentDidMount() {
        this.props.registerFunc();
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        this.setState({ open: false });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { name, email, password } = this.state;
        this.setState({
            email: "",
            password: "",
            name: ""
        });
        axios
            .post("http://localhost:4000/register", {
                name: name,
                email: email,
                password: password
            })
            .then(res => res.data)
            .then(data => {
                if (data.message === "Email Already Found") {
                    this.setState({ open: true });
                } else {
                    localStorage.setItem("token", data.token);
                    this.props.registerFunc();
                    this.props.history.push("/");
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Nav a={["Login", "Register"]} user={this.props.user} />
                <h1 className={classes.heading}>Register</h1>
                <div className={classes.containerForm}>
                    <form onSubmit={this.handleSubmit} className={classes.form}>
                        <TextField
                            id="standard-name"
                            label="Name"
                            className={classes.nameField}
                            value={this.state.name}
                            onChange={this.handleChange}
                            autoComplete="name"
                            type="text"
                            name="name"
                            margin="normal"
                            required
                        />
                        <TextField
                            id="standard-email"
                            label="Email"
                            className={classes.emailField}
                            value={this.state.email}
                            onChange={this.handleChange}
                            autoComplete="email"
                            type="email"
                            name="email"
                            margin="normal"
                            required
                        />
                        <TextField
                            id="standard-password-input"
                            label="Password"
                            className={classes.passwordField}
                            type="password"
                            name="password"
                            autoComplete="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            margin="normal"
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.btn}
                        >
                            Register
                        </Button>
                    </form>
                    <div className={classes.login}>
                        Already have an account login{" "}
                        <Link to="/login">here</Link>.
                    </div>
                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left"
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    ContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    message={
                        <span id="message-id">
                            Email Already Registered
                        </span>
                    }
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    ]}
                />
            </div>
        );
    }
}

export default withStyles(styles)(Register);
