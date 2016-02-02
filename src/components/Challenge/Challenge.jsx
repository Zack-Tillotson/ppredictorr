import React from 'react';

import {connect} from 'react-redux';
import selector from './selector';
import actions from '../../Application/state/actions';

import InlineCss from "react-inline-css";
import styles from './styles';

import Formsy from 'formsy-react';
import {FormsyText} from 'formsy-material-ui';
import IconButton from 'material-ui/lib/icon-button';
import RaisedButton from 'material-ui/lib/raised-button';

import { browserHistory } from 'react-router'

function getEmptyChallenge() {
  return {title: '', questions: []};
}

const Challenge = React.createClass({

  model: {}, // Updated via form change handler

  getInitialState() {
    return {
      currentQuestion: 0,
      currentAnswers: 2,
      canSubmit: true
    }
  },

  componentDidMount() {
    this.model = this.getChallenge();
  },

  getChallenge() {
    if(this.props.route.type == 'create') {
      return getEmptyChallenge();
    } else {
      return this.props.challenges.find(challenge => challenge.id == this.props.params.id) || getEmptyChallenge();
    }
  },

  getChallengeQuestionCount() {
    const questions = this.model.questions || [];
    return questions.length;
  },

  getChallengeQuestion() {
    return this.getChallenge().questions[this.state.currentQuestion] || {answers: []};
  },

  shouldShowForm() {
    return this.props.route.type != 'view';
  },

  getContainer(children) {
    return this.shouldShowForm() ? (
      <Formsy.Form
        ref="form"
        onSubmit={this.submitFormHandler}
        onChange={this.onChange}>
        {children}
      </Formsy.Form>
    ) : (
      <div className="container">{children}</div>
    );
  },

  onChange(inputs, isChanged) {
    if(Object.keys(inputs).indexOf('title') < 0 || Object.keys(inputs).indexOf('image') < 0) {
      return;
    }

    const question = {question: inputs.question, answers: []};

    let answerIndex = 0;
    while(Object.keys(inputs).indexOf('answerText' + answerIndex) >= 0) {
      question.answers[answerIndex] = {
        text: inputs['answerText' + answerIndex],
        image: inputs['answerImage' + answerIndex] || '' // not required
      }
      answerIndex++;
    }

    this.model.title = inputs.title;
    this.model.image = inputs.image;
    this.model.questions = this.model.questions || [];
    this.model.questions[this.state.currentQuestion] = question;
  },

  submitFormHandler() {
    if(!this.state.canSubmit) {
      console.log('canSubmit is false, todo.'); 
    }
    this.props.dispatch.putChallenge(this.model)
      .then((result) => {
        browserHistory.push('/challenges/');
      });
  },

  getTitle() {
    return this.shouldShowForm() ? (
      <FormsyText
        key="titleInput"
        name="title" 
        validations="isWords"
        required
        hintText="Choose a catchy title"
        value={this.getChallenge().title}
        floatingLabelText="Challenge Title" />
    ) : (
      <div key="title" className="titleItem">{this.props.challenge.title}</div>
    );
  },

  getPromoImage() {
    return this.shouldShowForm() ? (
      <FormsyText
        key="imageInput"
        name="image" 
        validations="isUrl"
        required
        hintText="The picture should be 200px tall and really wide!"
        value={this.getChallenge().image}
        floatingLabelText="Promo Image" />
    ) : (
      <div key="image" className="titleItem"><img src={this.props.challenge.image} /></div>
    );
  },

  getQuestionListTitle() {
    const questionCount = this.getChallengeQuestionCount() + 1;
    const backClass = this.state.currentQuestion == 0 ? 'inactive' : 'active';
    const nextClass = questionCount == this.state.currentQuestion + 1 ? 'inactive' : 'active';
    return (
      <div key="questionListTitle" className="questionListTitle">
        <IconButton
          className={["navPrev", nextClass].join(' ')}>
          <i className="material-icons">navigate_before</i>
        </IconButton>
        <div className="titleText">
          Question {this.state.currentQuestion + 1} of {questionCount}
        </div>
        <IconButton
          className={["navNext", nextClass].join(' ')}>
          <i className="material-icons">navigate_next</i>
        </IconButton>
      </div>
    );
  },

  getQuestionCount() {
    return this.state.questionCount;
  },

  getQuestionSection() {
    return (
      <div key="question" className="question">
        {this.getQuestion()}
        {this.getAnswers()}
        {this.getAddAnswerButton()}
      </div>
    );
  },

  getQuestion() {
    return this.shouldShowForm() ? (
      <FormsyText
        key="questionInput"
        name="question" 
        validations="isWords"
        required
        hintText="What question will people be predicting?"
        value={this.getChallengeQuestion().title}
        floatingLabelText="Question?" />
    ) : (
      <div key="image" className="questionItem"><img src={this.getChallengeQuestion().title} /></div>
    );
  },

  getAnswers() {
    const question = this.getChallengeQuestion();
    const answerNum = this.state.currentAnswers;
    const ret = [];
    for(let i = 0 ; i < answerNum ; i++) {
      ret.push(this.getAnswer(question, i));
    }
    return ret;
  },

  getAnswer(question, index) {
    const answer = question.answers[index] || {};
    return this.shouldShowForm() ? (
      <div key={`answerText${index}`}>
        <FormsyText
          name={`answerText${index}`} 
          validations="isWords"
          required
          hintText={`Answer #${index + 1}`}
          value={answer.text}
          floatingLabelText={`Answer #${index + 1}`} />
        <FormsyText
          name={`answerImage${index}`} 
          validations="isUrl"
          hintText={`Nice small image`}
          value={answer.image}
          floatingLabelText={`Image for Answer #${index + 1}`} />
          <IconButton
            className="removeAnswerBtn"
            onClick={this.removeAnswerHandler.bind(this, index)}>
            <i className="material-icons">clear</i>
          </IconButton>
      </div>
    ) : (
      <div key="text" className="questionItem">{answer.text} {answer.image}</div>
    );

  },

  getAddAnswerButton() {
    return this.shouldShowForm() ? (
      <IconButton
        key="addAnswerBtn"
        className="addAnswerBtn"
        onClick={this.addAnswerHandler}>
        <i className="material-icons">add</i>
      </IconButton>
    ) : null;    
  },

  addAnswerHandler() {
    this.setState({currentAnswers: this.state.currentAnswers + 1});
  },

  removeAnswerHandler(index) {
    const currentAnswers = this.state.currentAnswers > 0 ? this.state.currentAnswers - 1 : 0;
    this.setState({currentAnswers});
  },

  getQuestionListAdd() {
    return (
      <IconButton
        key="questionadd"
        className={["navNext"].join(' ')}
        onClick={this.addQuestionHandler}>
        <i className="material-icons">add_to_photos</i>
      </IconButton>
    );
  },

  addQuestionHandler() {
    this.refs.form.reset({title: this.model.title, image: this.model.image});
    this.setState({currentAnswers: 2, currentQuestion: this.getChallengeQuestionCount()});
  },

  getSubmissionButton() {
    return this.shouldShowForm() ? (
      <RaisedButton
        key="submitbutton"
        type="submit"
        label="Submit"
        disabled={!this.state.canSubmit} />
    ) : null;
  },

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="container">
        {this.getContainer([
          this.getTitle(),
          this.getPromoImage(),
          this.getQuestionListTitle(),
          this.getQuestionSection(),
          this.getQuestionListAdd(),
          this.getSubmissionButton()
        ])}
      </InlineCss>
    );
  }
});

export default connect(selector, actions)(Challenge);