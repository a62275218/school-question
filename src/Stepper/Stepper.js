import React from 'react';
import {Step, StepLabel, Stepper} from 'material-ui'

class QuestionStepper extends React.Component {
    constructor(props) {
        super(props);
        this.handleNext = () => {
            this.setState({
                stepIndex: this.props.questions.stepIndex + 1
            })
        }
    }

    render() {
        return (
            <Stepper activeStep={this.props.stepIndex}>
                {
                    this.props.questions.map((item, i) => {
                        return (
                            <Step key={i}>
                                <StepLabel>{item.title}</StepLabel>
                            </Step>
                        )
                    })
                }
            </Stepper>
        )
    }
}

export default QuestionStepper