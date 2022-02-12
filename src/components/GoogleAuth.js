import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  // 컴포넌트 마운트 후 한번 auth2 추가 라이브러리 코드 로드
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      // callback - 로드 후 라이브러리 정보 초기화
      window.gapi.client
      .init({  // init: Promise 리턴
        clientId: '523807311811-kqpg3cdvhc9cr16s2tr588f75djr4vbt.apps.googleusercontent.com',
        scope: 'email'
      })
      .then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();    // auth2 인스턴스 획득 후 window 객체에 넣어둠
        
        this.onAuthChange(this.auth.isSignedIn.get());    // redux store의 state 변경
        this.auth.isSignedIn.listen(this.onAuthChange); // 실제 인증상태 변경하는 시점 감지
      });
    });
  }

  // isSignedIn 이 바뀌면 state 바꾸귀 위해 호출
  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  }

  onSignOutClick = () => {
    this.auth.signOut();
  }

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (   // 로그인 상태
        <button onClick={this.onSignOutClick} className='ui red google button'>
          <i className='google icon' />
            Sign Out
        </button>
      );
    } else {  
      return (  // 로그아웃 상태
        <button onClick={this.onSignInClick} className='ui red google button'>
          <i className='google icon' />
            Sign In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);