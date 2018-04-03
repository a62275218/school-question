import React from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

class QuestionItem extends React.Component{

    render(){
        return (
            <RadioButtonGroup valueSelected={this.props.selected} onChange={this.onOptionChange} name={this.props.title}>
                {
                    this.props.options.map((item, i) => {
                        return (
                            <RadioButton key={i} value={i} label={item.label}/>
                        )
                    })
                }
            </RadioButtonGroup>
        )
    }

    onOptionChange = (e,i)=>{
        this.props.onOptionChange(i);
    }
}

export default QuestionItem;