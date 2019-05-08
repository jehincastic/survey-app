import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import Nav from "./Nav";

const styles = {
    title: {
        marginTop: "38vh",
        fontSize: "3rem",
        fontWeight: "100",
        color: "#3f51b5"
    },
    titleBold: {
        fontWeight: "200"
    },
    link: {
        textDecoration: "none",
        marginRight: "20px"
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    nav: {
        flexGrow: 1
    },
    name: {
        flexGrow: 1
    },
    secondBtn: {
        marginLeft: "20px",
        textDecoration: "none"
    }
};

class Home extends Component {  
    componentDidMount() {
        this.props.loginFunc();
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Nav a={["Login", "Register"]} user={this.props.user} />
                <h1 className={classes.title}>
                    Welcome to <span className={classes.titleBold}>NAME!</span>
                </h1>
                <Link className={classes.link} to="/register">
                    <Button variant="contained" color="primary">
                        Register
                    </Button>
                </Link>
                <Link className={classes.secondBtn} to="/login">
                    <Button variant="contained" color="primary">
                        Login
                    </Button>
                </Link>
            </div>
        );
    }
}

export default withStyles(styles)(Home);
