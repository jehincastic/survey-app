import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const QuestionsForm = (props) => {
    return (
        <div>
            <form onSubmit={props.routeChange}>
                <div className={props.classes.form}>
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
                    <TextField
                        id="standard-question"
                        label="Question-1"
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
