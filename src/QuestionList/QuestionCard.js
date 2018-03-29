import React from 'react';
import RaisedButton from 'material-ui/RaisedButton'
import QuestionItem from './QuestionItem'
import RefreshIndicator from 'material-ui/RefreshIndicator';

class QuestionCard extends React.Component {

    render() {
        let {questions} = this.props;
        return (
            <div>
                <div>
                    {questions.title}
                </div>
                <QuestionItem onOptionChange={this.onOptionChange}
                              {...questions}/>
                {questions.warn?(
                    <div className={'warn'}>学渣学习也会精神抖擞？逗我呢</div>
                ):("")}
                {questions.last?(
                    <div>
                        <RaisedButton label="上一题" onClick={this.onBackClick}/>
                        <RaisedButton label="提交" disabled={!questions.selected && questions.selected !== 0} primary={true} onClick={this.onSubmit}/>
                        {questions.loading?(
                            <div className={'refresh-container'}>
                                <RefreshIndicator status={'loading'} top={-38} left={190}/>
                            </div>
                        ):('')}
                    </div>
                ):(
                    <div>
                        {questions.first?(''):(
                            <RaisedButton label="上一题" onClick={this.onBackClick}/>
                        )}
                        <RaisedButton label="下一题" disabled={!questions.selected && questions.selected !== 0} primary={true} onClick={this.onForwardClick}/>
                    </div>
                )}

            </div>
        );
    }

    onOptionChange = (i) => {
        this.props.handleOptionChange(i,this.props.questions.index)
    };

    onBackClick = () => {
        this.props.handleButtonClick('back');
    };
    onForwardClick = () => {
        this.props.handleButtonClick('forward');
    };
    onSubmit = ()=>{
        this.props.handleSubmit();
    }
}

export default QuestionCard;
