import React from "react";
import { AppContext } from "../Context/AppContext";
import styled from "styled-components";

const Image = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  flex-direction: column;
  background: ${props => props.theme.bodyBackground};

  img {
    width: fit-content;
    max-width: 100%;
    object-fit: contain;
  }

  h1 {
      color: ${props => props.theme.primaryColor};
  }
`;

export const PageNotFound = () => {
  const { currentTheme, theme } = React.useContext(AppContext);
  return (
    <Image theme={theme}>
      <img
        src={
          currentTheme === "dark"
            ? "https://i.imgur.com/hqILpuY.png"
            : "https://i.imgur.com/UhCJu9M.png"
        }
        alt="404"
      />
      <h1>Page Not Found</h1>
    </Image>
  );
};
