import styled, { css } from "styled-components";

export const Card = styled.div`
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

  ${(props) =>
    props.hover &&
    css`
      cursor: pointer;
      transition: 0.2s;
      &:hover {
        background: rgba(255, 255, 255, 0.8);
      }
      &:active {
        background: rgb(255, 255, 255);
      }
    `}

  ${(props) =>
    props.active &&
    css`
      background: rgba(255, 255, 255, 0.8);
    `}
`;
