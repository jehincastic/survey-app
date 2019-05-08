import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const EmailForm = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div className={props.classes.form}>
                    <TextField
                        id="standard-email"
                        label="Add Email (seprate by commas)"
                        className={props.classes.surveyInput}
                        value={props.email}
                        onChange={props.handleEmailChange}
                        autoComplete="question"
                        type="text"
                        name="email"
                        margin="normal"
                        required
                    />
                </div>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={props.classes.submitbtn}
                >
                    Finish
                </Button>
            </form>
            <Button
                variant="contained"
                color="primary"
                onClick={props.routeChangeGoBack}
                className={props.classes.nextbtn}
            >
                Go Back
            </Button>
        </div>
    );
};

export default EmailForm;
