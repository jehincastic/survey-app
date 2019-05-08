import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import NoteAdd from "@material-ui/icons/NoteAdd";
import ContactMail from "@material-ui/icons/ContactMail";
import DesktopMac from "@material-ui/icons/DesktopMac";

const styles = {
    link: {
        textDecoration: "none"
    },
    card: {
        maxWidth: "345px",
        height: "300px"
    },
    media: {
        height: "140px"
    },
    icon: {
        transform: "scale(2)",
        color: "black"
    },
    content: {
        height: "85%",
        paddingTop: "30px"
    }
};

class CardItem extends Component {
    render() {
        const { classes } = this.props;
        let icon = "";
        switch (this.props.icon) {
            case "Note Add":
                icon = <NoteAdd className={classes.icon} />;
                break;
            case "Send Mail":
                icon = <ContactMail className={classes.icon} />;
                break;
            case "Desktop Mac":
                icon = <DesktopMac className={classes.icon} />;
                break;
            default:
                break;
        }
        return (
            <Card className={classes.card}>
                <CardActionArea className={classes.content}>
                    <Link className={classes.link} to={`/${this.props.link}`}>
                        {icon}
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                            >
                                {this.props.title}
                            </Typography>
                            <Typography component="p">
                                {this.props.text}
                            </Typography>
                        </CardContent>
                    </Link>
                </CardActionArea>
                <CardActions>
                    <Link className={classes.link} to={`/${this.props.link}`}>
                        <Button size="small" color="primary">
                            {this.props.btnText}
                        </Button>
                    </Link>
                </CardActions>
            </Card>
        );
    }
}

export default withStyles(styles)(CardItem);
