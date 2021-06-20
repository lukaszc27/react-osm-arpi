import React from 'react';
import styled from 'styled-components';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.css";

import SearchBar from './components/SearchBar'
import MyMap from './components/Map';

const Wrapper = styled.main`
`;

const App : React.FC = () => {
  return (
    <Wrapper className="container-fluid">
      <SearchBar />
      <MyMap />
    </Wrapper>
  );
}
export default App;