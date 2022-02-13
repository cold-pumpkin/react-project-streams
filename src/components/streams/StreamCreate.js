import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamCreate extends React.Component {
  // 렌더링할 Field - 호출될 때 redux-form 관련 props가 인자로 넘어옴
  renderInput({ input, label }) {  // redux-form props에서 destructuring
    // redux-form props의 input이 가진 모든 property들을 input element의 props로 넘기기
    return (
      <div className='field'>
        <label>{label}</label>
        <input {...input}/> 
      </div>
    );
  }

  // submit callback
  onSubmit(formValue) {
    // event 받을 필요 없음 - handleSubmit()이 e.preventDefault() 해줌
    console.log(formValue);
  }

  render() {
    console.log(this.props);  // redux form props
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form'>
        <Field name='title' component={this.renderInput} label="Enter Title"/>
        <Field name='description' component={this.renderInput} label="Enter Description" />
        <button className='ui button primary'>Submit</button>
      </form>
    ); 
  }
}

// redux form 연동
export default reduxForm({
  form: 'streamCreate'  // key: form reducer - value: form의 이름
})(StreamCreate);