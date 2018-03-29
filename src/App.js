import React, {Component} from 'react';
import './App.css';
import {Card, CardText} from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import QuestionCard from './QuestionList/QuestionCard'
import QuestionStepper from './Stepper/Stepper'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stepIndex: 0,
            finish: false,
            questions: [
                {
                    title: '区域',
                    index: 0,
                    selected: false,
                    first: true,
                    options: [
                        {value: 'VIC', label: '维多利亚'},
                        {value: 'TAS', label: '塔斯马尼亚'},
                        {value: 'ACT', label: '首都领地'},
                        {value: 'NSW', label: '新南威尔士'},
                        {value: 'QLD', label: '昆士兰'},
                        {value: 'NT', label: '北领地'},
                        {value: 'WA', label: '西澳'},
                        {value: 'SA', label: '南澳'}
                    ]
                },
                /*{
                    title: '专业',
                    index:1,
                    selected: false,
                    options: [
                        {value: 0, label: '信息科技'},
                        {value: 1, label: '自然和物理科学'},
                        {value: 2, label: '工程和相关科技'},
                        {value: 3, label: '建筑设计和建造'},
                        {value: 4, label: '农业环境和相关科目'},
                        {value: 5, label: '健康医疗'},
                        {value: 6, label: '教育'},
                        {value: 7, label: '管理和金融'},
                        {value: 8, label: '社会和文化'},
                        {value: 9, label: '创造艺术'},
                        {value: 10, label: '食物科技'},
                        {value: 11, label: '家政和个人服务'}
                    ]
                },*/
                {
                    title: '黑历史大拷问',
                    index: 1,
                    selected: false,
                    options: [
                        {value: 'a', label: '老子没有黑历史'},
                        {value: 'b', label: '也就偶尔挂个一两科'},
                        {value: 'c', label: '没有我学校怎么盖楼'}
                    ]
                },
                {
                    title: '个人性格',
                    index: 2,
                    selected: false,
                    loading:false,
                    last: true,
                    warn: false,
                    options: [
                        {value: '1', label: '我是佛系学生'},
                        {value: '2', label: '我是club甩手狂魔'},
                        {value: '3', label: '学习使我精神抖擞'}
                    ]
                },
            ]
        }
    }

    render() {
        const actions = [
            <FlatButton label="再做一遍" primary={true} onClick={this.handleRefresh}/>
        ];
        return (
            <MuiThemeProvider>
                <div>
                    <QuestionStepper {...this.state}/>
                    <div className={'card-container'}>
                        <Card>
                            <CardText>
                                <QuestionCard
                                    questions={this.state.questions[this.state.stepIndex]}
                                    handleButtonClick={this.handleButtonClick}
                                    handleOptionChange={this.handleOptionChange}
                                    handleSubmit={this.handleSubmit}
                                />
                            </CardText>
                        </Card>
                    </div>
                    <Dialog open={this.state.finish} actions={actions}>
                        <div>您的结果是</div>
                        <div>
                            {
                                this.state.schools?(
                                    this.state.schools.map((item,i)=>{
                                        return(
                                            <div key={i}>{item}</div>
                                        )
                                    })
                                ):('')
                            }
                        </div>
                    </Dialog>
                </div>
            </MuiThemeProvider>
        );
    }

    handleOptionChange = (i, index) => {
        let questions = this.state.questions;
        questions[index].selected = i;
        questions[1].selected === 2 && questions[2].selected === 2 ?
            (questions[2].warn = true) :
            (questions[2].warn = false);
        this.setState({
            questions: questions
        })
    };

    handleButtonClick = (dir) => {
        if (dir === 'back') {
            this.setState({
                stepIndex: this.state.stepIndex - 1
            })
        } else {
            this.setState({
                stepIndex: this.state.stepIndex + 1
            })
        }
    };
    handleSubmit = () => {
        let state = this.state.questions[0],
            history = this.state.questions[1],
            personality = this.state.questions[2],
            questions = this.state.questions;
        if (personality.warn === true) {
        }
        else {
            questions[2].loading = true;
            this.setState({
                questions: questions
            });
            axios.get(
                `https://devapi.oneu.me/v1/schools?state=${state.options[state.selected].value}&personality=${personality.options[personality.selected].value}&history=${history.options[history.selected].value}`)
                .then(res => {
                    console.log(res);
                    this.setState({
                        finish: true,
                        schools: res.data
                    })
                })
                .catch(err => {
                    let schools = this.state.schools;
                    schools=["无法找到推荐学校"];
                    this.setState({
                        finish: true,
                        schools:schools
                    })
                }).finally(() => {
                questions[2].loading = false;
                this.setState({
                    questions: questions
                });
            });
        }
    };
    handleRefresh = () => {
        let questions = this.state.questions;
        for (let item of questions) {
            item.selected = false;
            item.loading =false
        }
        this.setState({
            stepIndex: 0,
            finish: false,
            schools: [],
            questions: questions
        })
    }
}

export default App;
