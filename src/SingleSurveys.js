import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = {
    link: {
        textDecoration: "none"
    },
    card: {
        maxWidth: 345
    },
    media: {
        height: 140
    },
    content: {
        height: "100%",
        paddingTop: "30px"
    },
    middle: {
        width: "120px",
        margin: "0 auto"
    }
};

class SingleSurveys extends Component {
    handleClick = () => {
        this.props.handleSurveyClick(this.props.survey.id);
    }
    render() {
        const { classes, survey } = this.props;
        return (
            <div>
                <Card className={classes.card}>
                    <CardActionArea
                        onClick={this.handleClick}
                        className={classes.content}
                    >
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h3"
                                component="h2"
                            >
                                {survey.title}
                            </Typography>
                            <Typography component="p">
                                Number of Questions : {survey.noOfQuestions}
                                <br />
                                Number of Recipients : {survey.noOfRecipients}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions className={classes.middle}>
                        <Button
                            onClick={this.handleClick}
                            size="small"
                            color="primary"
                        >
                            {this.props.btnText}
                        </Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(SingleSurveys);
