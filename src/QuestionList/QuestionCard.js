import React from 'react';
import RaisedButton from 'material-ui/RaisedButton'
import QuestionItem from './QuestionItem'
import RefreshIndicator from 'material-ui/RefreshIndicator';
import img0 from '../public/images/piccut-01.png'
import img1 from '../public/images/piccut-02.png'
import img2 from '../public/images/piccut-03.png'

const imgList = [img0, img1, img2];

class QuestionCard extends React.Component {

    render() {
        let {questions} = this.props;
        return (
            <div>
                <div className={'card-title'}>
                    {questions.title}
                </div>
                <div className={'question-list'}>
                    <QuestionItem onOptionChange={this.onOptionChange}
                                  {...questions}/>
                </div>
                <div className={'nav-button'}>
                {questions.warn ? (
                    <div className={'warn'}>学渣学习也会精神抖擞？逗我呢</div>
                ) : ("")}
                {questions.last ? (
                    <div>
                        <RaisedButton label="上一题" onClick={this.onBackClick}/>
                        <RaisedButton label="提交" disabled={!questions.selected && questions.selected !== 0}
                                      primary={true} onClick={this.onSubmit}/>
                        {questions.loading ? (
                            <div className={'refresh-container'}>
                                <RefreshIndicator status={'loading'} top={-80} left={130}/>
                            </div>
                        ) : ('')}
                    </div>
                ) : (
                    <div>
                        {questions.first ? ('') : (
                            <RaisedButton label="上一题" onClick={this.onBackClick}/>
                        )}
                        <RaisedButton label="下一题" disabled={!questions.selected && questions.selected !== 0}
                                      primary={true} onClick={this.onForwardClick}/>
                    </div>
                )}
                </div>
                <img className={'img'} src={imgList[questions.index]}/>
            </div>
        );
    }

    onOptionChange = (i) => {
        this.props.handleOptionChange(i, this.props.questions.index)
    };

    onBackClick = () => {
        this.props.handleButtonClick('back');
    };
    onForwardClick = () => {
        this.props.handleButtonClick('forward');
    };
    onSubmit = () => {
        this.props.handleSubmit();
    }
}

export default QuestionCard;
