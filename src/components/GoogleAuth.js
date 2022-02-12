import React from 'react';

class GoogleAuth extends React.Component {
  state = { isSignedIn: null };

  // 컴포넌트 마운트 후 한번 auth2 추가 라이브러리 코드 로드
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      // callback - 로드 후 라이브러리 정보 초기화
      window.gapi.client.init({  // init: Promise 리턴
        clientId: '523807311811-kqpg3cdvhc9cr16s2tr588f75djr4vbt.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();    // auth2 인스턴스 획득 후 window 객체에 넣어둠
        this.setState({ isSignedIn : this.auth.isSignedIn.get() });
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  // isSignedIn 이 바뀌면 state 바꾸귀 위해 호출
  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return <div>I dont know if we are signed in</div>;
    } else if (this.state.isSignedIn) {
      return <div>I am signed in!</div>;
    } else {
      return <div>I am not signed in</div>;
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }

}

export default GoogleAuth;