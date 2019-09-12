import Button from "@material-ui/core/Button";
import React from "react";
import styled from "styled-components";

const StyledButton = styled(Button)`
  && {
    margin: 10px;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
`;


function Pagination (props) {
  const {first, last, goBack, goForward} = props;
  return (
    <Container>
      { !first &&
      <StyledButton variant="outlined" color="primary" onClick={goBack} type="button">
        Previous
      </StyledButton>
      }
      { !last &&
      <StyledButton variant="outlined" color="primary" onClick={goForward} type="button">
        Next
      </StyledButton>
      }
    </Container>
  )
}

export default Pagination;
