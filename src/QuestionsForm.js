import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const QuestionsForm = props => {
    let title = null;
    if (props.match.path === "/template1") {
        title = (
            <TextField
                id="standard-title"
                label="Survey Title"
                className={props.classes.surveyInput}
                value={props.title}
                onChange={props.handleTitleChange}
                autoComplete="question"
                type="text"
                name="title"
                margin="normal"
                required
            />
        );
    }
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div className={props.classes.form}>
                    {title}
                    {props.match.path === "/template2" ? (
                        <div>
                            <TextField
                                id="standard-title"
                                label="Min Value"
                                className={props.classes.maxmin}
                                value={props.minvalue}
                                onChange={props.handleTitleChange}
                                autoComplete="question"
                                type="text"
                                name="minvalue"
                                margin="normal"
                                required
                            />
                            <TextField
                                id="standard-title"
                                label="Max Value"
                                className={props.classes.maxmin}
                                value={props.maxvalue}
                                onChange={props.handleTitleChange}
                                autoComplete="question"
                                type="text"
                                name="maxvalue"
                                margin="normal"
                                required
                            />{" "}
                        </div>
                    ) : props.match.path === "/template3" ? (
                        <TextField
                            id="standard-title"
                            label="Column Title (seperate by commas)"
                            className={props.classes.surveyInput}
                            value={props.colTitle}
                            onChange={props.handleTitleChange}
                            autoComplete="question"
                            type="text"
                            name="colTitle"
                            margin="normal"
                            required
                        />
                    ) : null}
                    <TextField
                        id="standard-question"
                        label="Question"
                        className={props.classes.surveyInput}
                        value={props.questions}
                        onChange={props.handleChange}
                        autoComplete="question"
                        type="text"
                        name="0"
                        margin="normal"
                        required
                    />
                    {props.nextQuestions}
                </div>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={props.classes.submitbtn}
                >
                    Submit
                </Button>
            </form>
            <Button
                variant="contained"
                color="primary"
                onClick={props.handleNextQuestion}
                className={props.classes.nextbtn}
            >
                Next
            </Button>
        </div>
    );
};

export default QuestionsForm;
