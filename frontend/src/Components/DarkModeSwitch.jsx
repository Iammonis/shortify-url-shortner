import React from "react";
import styled from "styled-components";
import { AppContext } from "../Context/AppContext";

const Toggle = styled.div`
  display: grid;
  place-items: center;
  min-height: 60px;
  position: absolute;
  top: 5px;
  right: 5px;
  grid-area: toggle;
  margin: 20px;
  z-index: 100;


  @keyframes reverse {
    0% {
      left: 47px;
      width: 40px;
    }
    60% {
      left: 3px;
      width: 80px;
    }
    100% {
      left: 3px;
    }
  }

  @keyframes switch {
    0% {
      left: 3px;
    }
    60% {
      left: 3px;
      width: 80px;
    }
    100% {
      left: 47px;
      width: 40px;
    }
  }

  .toggleCheckbox {
    display: none;
  }

  /* background */
  .toggleLabel {
    width: 100px;
    height: 54px;
    background: #6b7abb;
    border-radius: 100px;
    border: 3px solid #5d6baa;
    display: flex;
    position: relative;
    transition: all 350ms ease-in;
    cursor: pointer;
  }

  .toggleCheckbox:checked + .toggleLabel {
    background: #96dcee;
    border-color: #72cce3;
  }

  /* sun and moon */
  .toggleCheckbox:checked + .toggleLabel:before {
    animation-name: reverse;
    animation-duration: 350ms;
    animation-fill-mode: forwards;
    transition: all 360ms ease-in;
    background: #fffaa8;
    border-color: #f5eb71;
  }

  .toggleLabel:before {
    animation-name: switch;
    animation-duration: 350ms;
    animation-fill-mode: forwards;
    content: "";
    width: 40px;
    height: 40px;
    border: 3px solid #e8e8ea;
    top: 1px;
    left: 3px;
    position: absolute;
    border-radius: 40px;
    background: white;
  }

  /* moon dimples */
  .toggleLabel:after {
    transition-delay: 0ms;
    transition: all 250ms ease-in;
    position: absolute;
    content: "";
    box-shadow: #e8e8ea -14px 0 0 1px, #e8e8ea -22px 12px 0 -1px;
    left: 80px;
    top: 10px;
    width: 6px;
    height: 6px;
    background: transparent;
    border-radius: 50%;
    opacity: 1;
  }

  .toggleCheckbox:checked + .toggleLabel:after {
    transition-delay: 50ms;
    opacity: 0;
  }

  /* clouds */
  .toggleCheckbox:checked + .toggleLabel .toggleLabelBackground {
    width: 5px;
    left: 65px;
    top: 22px;
  }

  .toggleCheckbox:checked + .toggleLabel .toggleLabelBackground:before {
    top: -4px;
    left: -5px;
    width: 20px;
    height: 5px;
  }

  .toggleCheckbox:checked + .toggleLabel .toggleLabelBackground:after {
    top: 3px;
    width: 20px;
    height: 5px;
    left: -10px;
  }

  /* stars */
  .toggleLabelBackground {
    border-radius: 5px;
    position: relative;
    background: white;
    left: 32px;
    width: 4px;
    transition: all 150ms ease-in;
    top: 25px;
    height: 4px;
  }

  .toggleLabelBackground:before {
    content: "";
    position: absolute;
    width: 4px;
    height: 4px;
    top: -15px;
    border-radius: 5px;
    background: white;
    left: -20px;
    transition: all 150ms ease-in;
  }

  .toggleLabelBackground:after {
    content: "";
    position: absolute;
    width: 4px;
    height: 4px;
    left: -20px;
    top: 10px;
    border-radius: 5px;
    background: white;
    transition: all 150ms ease-in;
  }
`;

export const DarkModeSwitch = () => {
  const { currentTheme, toggleTheme } = React.useContext(AppContext);
  return (
    <Toggle>
      <input
        type="checkbox"
        id="toggle"
        className="toggleCheckbox"
        onChange={toggleTheme}
        checked={currentTheme === "light"}
      />
      <label htmlFor="toggle" className="toggleLabel">
        <span className="toggleLabelBackground"></span>
      </label>
    </Toggle>
  );
};
