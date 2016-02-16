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
import AnswerCard from '../AnswerCard';

import { browserHistory } from 'react-router'

function getEmptyChallenge() {
  return {title: '', questions: []};
}

const ChallengeView = React.createClass({

  propTypes: {
    challenge: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      canSubmit: true
    }
  },

  getChallengeQuestionCount() {
    const questions = this.props.challenge.questions || [];
    return questions.length;
  },

  getChallengeQuestion() {
    return {answers: [], ...this.props.challenge.questions[this.props.currentQuestion]};
  },

  shouldShowForm() {
    return this.props.editable;
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

    // XXX called with both events and data objects. only want the data object one
    if(Object.keys(inputs).indexOf('title') < 0 || Object.keys(inputs).indexOf('image') < 0) {
      return;
    }

    const {title, image} = inputs;
    const question = {question: inputs.question, answers: []};

    let answerIndex = 0;
    while(Object.keys(inputs).indexOf('answerText' + answerIndex) >= 0) {
      question.answers[answerIndex] = {
        text: inputs['answerText' + answerIndex],
        image: inputs['answerImage' + answerIndex] || '' // not required
      }
      answerIndex++;
    }

    this.props.updateModel(title, image, question);
  },

  submitFormHandler() {
    this.props.submitFormHandler();
  },

  getTitle() {
    return this.shouldShowForm() ? (
      <div>
        <FormsyText
          key={`titleInput${this.props.challenge.id}`}
          name="title" 
          validations="isWords"
          fullWidth={true}
          required
          hintText="Choose a catchy title"
          value={this.props.challenge.title}
          floatingLabelText="Challenge Title" />
      </div>
    ) : (
      <h1 key="title" className="titleItem">{this.props.challenge.title}</h1>
    );
  },

  getPromoImage() {
    return this.shouldShowForm() ? (
      <FormsyText
        key={`imageInput${this.props.challenge.id}`}
        name="image" 
        validations="isUrl"
        fullWidth={true}
        required
        hintText="200px tall, really wide!"
        value={this.props.challenge.image}
        floatingLabelText="Promo Image" />
    ) : (
      <div key="image" className="promoImage" style={{backgroundImage: `url('${this.props.challenge.image}')`}} />
    );
  },

  navigateQuestion(change) {
    this.props.navigateQuestion(change);
  },

  getQuestionListTitle() {
    const questionCount = this.getChallengeQuestionCount();
    const backClass = this.props.currentQuestion == 0 ? 'inactive' : 'active';
    const nextClass = questionCount == this.props.currentQuestion + 1 ? 'inactive' : 'active';
    return (
      <div key="questionListTitle" className="questionListTitle">
        <IconButton
          className={["navPrev", nextClass].join(' ')}
          onClick={this.navigateQuestion.bind(this, -1)}>
          <i className="material-icons">navigate_before</i>
        </IconButton>
        <div className="titleText">
          Question {this.props.currentQuestion + 1} of {questionCount}
        </div>
        {this.shouldShowForm() && (
          <IconButton
            key="questionadd"
            className={["addQuestion"].join(' ')}
            onClick={this.addQuestionHandler}>
            <i className="material-icons">add_to_photos</i>
          </IconButton>
        )}
        <IconButton
          className={["navNext", nextClass].join(' ')}
          onClick={this.navigateQuestion.bind(this, 1)}>
          <i className="material-icons">navigate_next</i>
        </IconButton>
      </div>
    );
  },

  getQuestionCount() {
    return this.props.challenge.questions.length;
  },

  getQuestionSection() {
    if(this.props.challenge.questions.length) {
      return (
        <div key="question" className="question">
          {this.getQuestion()}
          {this.getAnswers()}
          {this.getAddAnswerButton()}
        </div>
      );
    } else {
      return "No question yet";
    }
  },

  getQuestion() {
    return this.shouldShowForm() ? (
      <FormsyText
        key={`questionInput${this.props.currentQuestion}`}
        name="question" 
        validations="isWords"
        required
        hintText="What question will people be predicting?"
        value={this.getChallengeQuestion().question}
        fullWidth={true}
        floatingLabelText="Question?" />
    ) : (
      <div key="question" className="questionTitle">{this.getChallengeQuestion().question}</div>
    );
  },

  getAnswers() {
    const question = this.getChallengeQuestion();
    const answerNum = question.answers.length;
    const ret = [];
    for(let i = 0 ; i < answerNum ; i++) {
      ret.push(this.getAnswer(question, i));
    }
    return ret;
  },

  getAnswer(question, index) {
    const answer = question.answers[index] || {};
    return this.shouldShowForm() ? (
      <div key={`answerContainer${this.props.currentQuestion}${index}`}>
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
      <AnswerCard key={`answerContainer${this.props.currentQuestion}${index}`} {...answer} />
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
    this.props.addModelAnswer();
  },

  removeAnswerHandler(index) {
    this.props.removeModelAnswer(index);
  },

  addQuestionHandler() {
    this.props.addModelQuestion();
  },

  getSubmissionButton() {
    return this.shouldShowForm() ? (
      <RaisedButton
        key="submitbutton"
        type="submit"
        label="Save"
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
          this.getSubmissionButton()
        ])}
      </InlineCss>
    );
  }
});

export default ChallengeView;