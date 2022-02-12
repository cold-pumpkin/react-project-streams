import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StreamCreate from './streams/StreamCreate';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Routes>
              <Route path="/" exact element={<StreamList />} />
              <Route path="/streams/new" exact element={<StreamCreate />} />
              <Route path="/streams/edit" exact element={<StreamEdit />} />
              <Route path="/streams/delete" exact element={<StreamDelete />} />
              <Route path="/streams/show" exact element={<StreamShow />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;