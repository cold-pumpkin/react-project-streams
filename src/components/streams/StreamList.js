import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  // 현재 userId와 스트리밍 정보의 userId 일치하면 Delete/Edit 버튼 노출
  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className='right floated content'>
          <button className='ui button primary'>
            Edit
          </button>
          <button className='ui button negative'>
            Delete
          </button>
        </div>
      );
    }
  }

  // 스트리밍 리스트 노출
  renderList() {
    return this.props.streams.map(stream => {
      return(
        <div className='item' key={stream.id}>
          {this.renderAdmin(stream)}
          <i className='large middle aligned icon camera' />
          <div className='content'>
            {stream.title}
            <div className='description'>{stream.description}</div>
          </div>
        </div>
      );
    });
  }

  // 로그인 상태인 경우 Create Stream 버튼 노출
  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right '}}>
          <Link to='/streams/new' className='ui button primary'>
            Create Stream
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className='ui celled list'>
          {this.renderList()}
        </div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { 
    streams: Object.values(state.streams), // 값들을 array로 변환
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  }; 
}

export default connect(mapStateToProps, { fetchStreams })(StreamList);