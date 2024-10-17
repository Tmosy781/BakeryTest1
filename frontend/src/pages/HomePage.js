import React from 'react';
import styled from 'styled-components';

const HomePageContainer = styled.div`
  text-align: center;
`;



const HomePage = () => {
  return (
    <HomePageContainer>
      <h1>Welcome to Sugar Plum</h1>
      <p>Sorry for the mess! Check back soon!</p>
      
    </HomePageContainer>
  );
};

export default HomePage;