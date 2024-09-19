import React from 'react';
import styled from 'styled-components';

const HomePageContainer = styled.div`
  text-align: center;
`;

const RoundedImage = styled.img`
  border-radius: 50%;
  width: 400px; /* Adjust the width as needed */
  height: 450px; /* Adjust the height as needed */
`;

const HomePage = () => {
  return (
    <HomePageContainer>
      <h1>Welcome to Sugar Plum</h1>
      <p>Sorry for the mess! Check back soon!</p>
      <RoundedImage src="/Construction.png" alt="Construction" />
    </HomePageContainer>
  );
};

export default HomePage;