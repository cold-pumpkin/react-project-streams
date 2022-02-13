import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions';

class StreamCreate extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className='ui error message'>
          <div className='header'>{error}</div>
        </div>
      );
    }
  }

  // 렌더링할 Field - 호출될 때 redux-form 관련 props가 인자로 넘어옴
  renderInput = ({ input, label, meta }) => {  // redux-form props에서 destructuring
    // redux-form props의 input이 가진 모든 property들을 input element의 props로 넘기기
    const className = `field ${meta.error && meta.touched ? 'error': ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete='off' />
        <div>{this.renderError(meta)}</div> 
      </div>
    );
  }

  // submit callback
  onSubmit = (formValue) => {
    // event 받을 필요 없음 - handleSubmit()이 e.preventDefault() 해줌
    this.props.createStream(formValue);
  }

  render() {
    //console.log(this.props);  // redux form props
    return (
      <form 
        onSubmit={this.props.handleSubmit(this.onSubmit)} 
        className='ui form error'
      >
        <Field name='title' component={this.renderInput} label="Enter Title"/>
        <Field name='description' component={this.renderInput} label="Enter Description" />
        <button className='ui button primary'>Submit</button>
      </form>
    ); 
  }
}

const validate = (formValues) => {
  const errors = {};
  
  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }

  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }

  return errors;
};

// redux form 연동
const formWrapped = reduxForm({
  form: 'streamCreate',  // key: form reducer - value: form의 이름
  validate               // validate() 연동
})(StreamCreate);

// action creator 연동
export default connect(null, { createStream })(formWrapped);