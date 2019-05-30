import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import VpnKey from "@material-ui/icons/VpnKey";
import HowToReg from "@material-ui/icons/HowToReg";
import Home from "@material-ui/icons/Home";
import PowerSettingsNew from "@material-ui/icons/PowerSettingsNew";
import NoteAdd from "@material-ui/icons/NoteAdd";
import ContactMail from "@material-ui/icons/ContactMail";
import DesktopMac from "@material-ui/icons/DesktopMac";

const styles = {
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    link: {
        textDecoration: "none"
    },
    nav: {
        flexGrow: 1
    },
    name: {
        margin: "0 auto",
        position: "relative",
        right: "20px",
        textDecoration: "none",
        color: "white",
        display: "block"
    }
};

class Nav extends Component {
    static defaultProps = {
        a: ["Logout"]
    };
    constructor(props) {
        super(props);
        this.state = {
            left: false
        };
    }

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open
        });
    };

    iconSelect = text => {
        switch (text) {
            case "Home":
                return <Home />;
            case "Add Survey":
                return <NoteAdd />;
            case "View Survey":
                return <DesktopMac />;
            case "Send Mail":
                return <ContactMail />;
            default:
                return <Home />;
        }
    };

    render() {
        const { classes, user } = this.props;
        const sideList = (
            <div className={classes.list}>
                {user.loggedIn && (
                    <List>
                        {["Home", "Add Survey", "View Survey", "Send Mail"].map(
                            (text, i) => {
                                let link = "";
                                text !== "Home" &&
                                    (link = text.split(" ")[0].toLowerCase());
                                return (
                                    <Link
                                        key={i}
                                        className={classes.link}
                                        to={`/${link}`}
                                    >
                                        <ListItem button key={text}>
                                            <ListItemIcon>
                                                {this.iconSelect(text)}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                        </ListItem>
                                    </Link>
                                );
                            }
                        )}
                    </List>
                )}
                <Divider />
                <List>
                    {this.props.a.map((text, i) => {
                        const link = text.toLowerCase();
                        return (
                            <Link
                                key={i}
                                className={classes.link}
                                to={`/${link}`}
                            >
                                <ListItem button key={text}>
                                    <ListItemIcon>
                                        {text === "Login" ? (
                                            <VpnKey />
                                        ) : text === "Logout" ? (
                                            <PowerSettingsNew />
                                        ) : (
                                            <HowToReg />
                                        )}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            </Link>
                        );
                    })}
                </List>
            </div>
        );
        return (
            <div>
                <AppBar className={classes.nav} position="static">
                    <Toolbar>
                        <IconButton
                            onClick={this.toggleDrawer("left", true)}
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="Menu"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Link className={classes.name} to="/">
                            <Typography
                                className={classes.textMain}
                                variant="h6"
                                color="inherit"
                            >
                                EMAILIFY
                            </Typography>
                        </Link>
                        {/* <Link className={classes.link} to="/login">
                            <Button
                                className={classes.loginBtn}
                                color="default"
                                style={{ color: "white" }}
                            >
                                Login
                            </Button>
                        </Link> */}
                    </Toolbar>
                </AppBar>
                <SwipeableDrawer
                    open={this.state.left}
                    onClose={this.toggleDrawer("left", false)}
                    onOpen={this.toggleDrawer("left", true)}
                >
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer("left", false)}
                        onKeyDown={this.toggleDrawer("left", false)}
                    >
                        {sideList}
                    </div>
                </SwipeableDrawer>
            </div>
        );
    }
}

export default withStyles(styles)(Nav);
