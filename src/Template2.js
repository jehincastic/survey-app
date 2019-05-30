import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/styles";
import Nav from "./Nav";
import QuestionsForm from "./QuestionsForm";
import Clear from "@material-ui/icons/Clear";

const styles = {
    heading: {
        color: "#3f51b5"
    },
    form: {
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "55vh",
        overflowY: "scroll",
        overflowX: "hidden"
    },
    surveyInput: {
        width: "30%"
    },
    surveyInputSecond: {
        width: "30%",
        marginLeft: "20px !important"
    },
    nextbtn: {
        position: "relative",
        top: "-36px"
    },
    submitbtn: {
        position: "relative",
        top: "56px"
    },
    surveyDiv: {
        width: "100%"
    },
    maxmin: {
        margin: "0 20px !important"
    },
    icon: {
        marginTop: "35px",
        marginLeft: "10px",
        transition: "all 0.5s ease",
        "&:hover": {
            opacity: "0.6",
            transform: "scale(1.2)"
        }
    }
};

class TemplateTwo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            i: 0,
            questions: [""],
            nextQuestions: [],
            title: "",
            maxvalue: "",
            minvalue: ""
        };
    }

    componentDidMount() {
        if (this.props.user.email === "") {
            this.props.history.push("/login");
        }
    }

    handleChange = e => {
        const ques = [...this.state.questions];
        ques[e.target.name] = e.target.value;
        this.setState({
            questions: ques
        });
    };

    removeQuestion = index => {
        const questions = [...this.state.questions];
        const nextQuestions = [...this.state.nextQuestions];
        questions[index] = undefined;
        nextQuestions[index - 1] = undefined;
        this.setState({
            questions: questions,
            nextQuestions: nextQuestions
        });
    };

    handleTitleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleNextQuestion = () => {
        const index = this.state.i + 1;
        const { classes } = this.props;
        this.setState({ i: index }, () => {
            const questionsDisplay = (
                <div key={index} className={classes.surveyDiv}>
                    <TextField
                        id={`standard-question${index}`}
                        label={`Question`}
                        className={classes.surveyInputSecond}
                        value={this.state.questions[index]}
                        onChange={this.handleChange}
                        autoComplete="question"
                        type="text"
                        name={index.toString()}
                        margin="normal"
                        required
                    />
                    <Clear
                        onClick={() => this.removeQuestion(index)}
                        className={classes.icon}
                    />
                </div>
            );
            const q = [...this.state.nextQuestions];
            q.push(questionsDisplay);
            this.setState({ nextQuestions: q });
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { questions, maxvalue, minvalue } = this.state;
        const arrayQuestions = questions.filter(Boolean);
        const obj = {
            questions: arrayQuestions,
            maxvalue,
            minvalue
        };
        this.setState({
            i: 1,
            questions: [""],
            nextQuestions: [],
            title: "",
            maxvalue: "",
            minvalue: ""
        });
        localStorage.setItem("template2", JSON.stringify(obj));
        this.props.history.push("/template3");
    };

    render() {
        const { classes } = this.props;
        const { nextQuestions } = this.state;
        return (
            <div>
                <Nav user={this.props.user} />
                <h1 className={classes.heading}>Template 2</h1>
                <div>
                    <QuestionsForm
                        maxvalue={this.props.maxvalue}
                        minvalue={this.props.minvalue}
                        match={this.props.match}
                        title={this.state.title}
                        handleTitleChange={this.handleTitleChange}
                        questions={this.state.questions[0]}
                        handleSubmit={this.handleSubmit}
                        handleChange={this.handleChange}
                        handleNextQuestion={this.handleNextQuestion}
                        nextQuestions={nextQuestions}
                        classes={classes}
                    />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(TemplateTwo);
