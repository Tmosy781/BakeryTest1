import React from 'react';
import styled from 'styled-components';

const HomePageContainer = styled.div`
  text-align: center;
`;

const HomePage = () => {
  return (
    <HomePageContainer>
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page of our application. Here you can find various features and information.</p>
    </HomePageContainer>
  );
};

export default HomePage;