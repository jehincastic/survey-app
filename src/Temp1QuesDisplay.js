import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";

let displayVal = "";

const styles = () => ({
    wrap: {
        width: "100vw",
        overflowX: "hidden"
    },
    sep: {
        display: "flex",
        flexWrap: "wrap",
        marginBottom: "50px"
    },
    title: {
        color: "#3f51b5"
    },
    btn: {
        width: "80px",
        position: "absolute !important",
        left: "64px"
    },
    label: {
        textAlign: "left",
        width: "100%",
        fontSize: 24,
        marginBottom: "10px"
    },
    container: {
        marginLeft: "70px",
        marginTop: "80px",
        width: "100vw"
    },
    textField: {
        width: "45vw",
        marginTop: "-5px !important"
    }
});

let id = 0;
function createData(name) {
    id += 1;
    return { id, name };
}

export class Temp1QuesDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            survey: [],
            answers: [],
            questions: [],
            display: null
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        const { answers } = this.state;
        let done = true;
        answers.forEach(a => {
            if (a === "") {
                done = false;
            }
        });
        if (!done) {
            alert("Please Submit All Answers");
        } else {
            axios
                .post(
                    `http://localhost:4000/survey/${
                        this.props.match.params.recid
                    }/${this.props.match.params.surid}`,
                    {
                        answers: this.state.answers
                    }
                )
                .then(res => res.data)
                .then(data => {
                    if (data.message === "Updated") {
                        this.props.history.push("/success");
                    } else {
                        this.props.history.push("/failed");
                    }
                });
        }
    };

    handleChange = e => {
        const ans = [...this.state.answers];
        const i = Number(e.target.name);
        ans[i] = e.target.value;
        this.setState({ answers: ans });
    };

    componentDidMount() {
        axios
            .get(
                `http://localhost:4000/survey/${
                    this.props.match.params.recid
                }/${this.props.match.params.surid}`
            )
            .then(res => res.data)
            .then(data => {
                if (Number(data.template) !== 1) {
                    const link = this.props.match.url.replace(
                        "questions-temp1",
                        "questions-temp" + data.template
                    );
                    this.props.history.push(link);
                } else {
                    if (!data.message) {
                        this.setState({ survey: data }, () => {
                            const rows = [...this.state.questions];
                            const ans = [...this.state.answers];
                            data.questions.map(q => {
                                ans.push("");
                                rows.push(createData(q));
                                this.setState({
                                    questions: rows,
                                    answers: ans
                                });
                                return true;
                            });
                        });
                    } else if (data.message === "404 Not Found") {
                        this.props.history.push("/420");
                    } else if (data.message === "Response Submitted") {
                        this.props.history.push("/submitted");
                    }
                }
            });
    }

    display = () => {
        const ques = [...this.state.questions];
        displayVal = ques.map(q => {
            const index = q.id - 1;
            return (
                <div className={this.props.classes.sep} key={q.id}>
                    <label
                        className={this.props.classes.label}
                        htmlFor={q.id.toString()}
                    >
                        {q.name}
                    </label>
                    <TextField
                        id={q.id.toString()}
                        name={index.toString()}
                        label="Your Answer"
                        multiline
                        rowsMax="4"
                        value={this.state.answers[index]}
                        onChange={this.handleChange}
                        className={this.props.classes.textField}
                        margin="normal"
                        required
                    />
                </div>
            );
        });
    };

    render() {
        this.display();
        const { title } = this.state.survey;
        const { classes } = this.props;
        return (
            <div className={classes.wrap}>
                <h1 className={classes.title}>{`Survey on ${title}`}</h1>
                <form
                    className={classes.container}
                    noValidate
                    autoComplete="off"
                    onSubmit={this.handleSubmit}
                >
                    {displayVal}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.btn}
                    >
                        Submit
                    </Button>
                </form>
            </div>
        );
    }
}

export default withStyles(styles)(Temp1QuesDisplay);
