import React from 'react';
//import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { unstable_HistoryRouter as HistoryRouter, Routes, Route } from 'react-router-dom';
import StreamCreate from './streams/StreamCreate';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import Header from './Header';
import history from '../history';

const App = () => {
  return (
    <div className='ui container'>
      <HistoryRouter history={history}>
        <div>
        <Header />  {/* 컴포넌트 내부에 <Link> 있는 경우 <BrowserRouter> 밑으로 가야 함 */}
          <Routes>
            <Route path="/" exact element={<StreamList />} />
            <Route path="/streams/new" exact element={<StreamCreate />} />
            <Route path="/streams/edit/:id" exact element={<StreamEdit />} />
            <Route path="/streams/delete" exact element={<StreamDelete />} />
            <Route path="/streams/show" exact element={<StreamShow />} />
          </Routes>
        </div>
      </HistoryRouter>
    </div>
  );
};

export default App;