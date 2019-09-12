import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";


const Container = styled.div`
  margin: 5em;
  display: flex;
  justify-content: center;
  align-content: center;
`;


function Loading () {
  return (
    <Container>
      <CircularProgress color="secondary" />
    </Container>
  )
}

export default Loading;
