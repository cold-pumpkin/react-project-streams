import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchStream } from '../../actions';
import { connect } from 'react-redux';

const StreamEdit = ({ streams }) => {  // props에서 destructuring
  const { id } = useParams();
  
  useEffect(() => {
    fetchStream(id);
  }, [id]);
  
  const stream = streams[id];
  if (!stream)
    return <div>Loading...</div>
  
  return (
    <div>{stream.title}</div>
  );
};

const mapStateToProps = (state) => {
  return { streams: state.streams }; // 위에서 props 로 사용 가능
};

export default connect(mapStateToProps, {fetchStream})(StreamEdit);