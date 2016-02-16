import React from 'react';

import {connect} from 'react-redux';
import selector from './selector';
import actions from '../../Application/state/actions';

import InlineCss from "react-inline-css";
import styles from './styles';

import { browserHistory } from 'react-router';

const ChallengeQuestions = React.createClass({

  propTypes: {
    challenge: React.PropTypes.object.isRequired // from selector
  },

  getInitialState() {
    return {
      model: this.props.challenge,
      currentQuestion: 0
    }
  },

  componentWillReceiveProps(nextProps) {
    const model = {...this.props.model, ...nextProps.challenge};
    this.setState({model, currentQuestion: 0});
  },

  shouldShowForm() {
    return false;
  },

  updateModel(title, image, question) {
    const model = {...this.state.model, title, image};
    model.questions[this.state.currentQuestion] = question;

    this.setState({model});
  },

  submitFormHandler() {
    this.props.dispatch.putChallenge(this.state.model);
  },

  navigateQuestion(change) {
    const newQuestion = this.state.currentQuestion + change;
    const currentQuestion = newQuestion < 0 || newQuestion > this.state.model.questions.length - 1 
        ? this.state.currentQuestion
        : newQuestion;
    this.setState({currentQuestion});
  },

  addModelQuestion() {
    const model = {...this.state.model};
    model.questions = [...model.questions, this.props.getEmptyQuestion()];
    this.setState({model, currentQuestion: model.questions.length - 1});
  },

  addModelAnswer() {
    const model = {...this.state.model};
    model.questions[this.state.currentQuestion].answers = 
      [...model.questions[this.state.currentQuestion].answers, this.props.getEmptyAnswer()];
    this.setState({model});
  },

  removeModelAnswer(index) {

  },

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="container">
        Do me!
      </InlineCss>
    );
  }
});

export default connect(selector, actions)(ChallengeQuestions);