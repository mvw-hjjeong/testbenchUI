import styled from "styled-components";

export const Screen = styled.div`

  height: 100vh;
  color: #fff;
  overflow: hidden;
  .panels {
    list-style: none;
    position: fixed;
    top: 0;
    left: 50%;
    width: 200vw;
    height: 100vh;
    transform: translateX(-50%) skewX(-35deg);
    clip-path: circle(100%);
    z-index: 1;
    background: #fafafb;
    .panel {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: calc(100% / 6);
      transform: scaleY(0);
      transform-origin: top;
      background: #02020c;
      &:nth-child(even) {
        transform-origin: bottom;
      }
      &:nth-child(2) {
        left: calc(calc(100% / 6) - 1px);
      }
      &:nth-child(3) {
        left: calc(calc(calc(100% / 6) * 2) - 2px);
      }
      &:nth-child(4) {
        left: calc(calc(calc(100% / 6) * 3) - 4px);
      }
      &:nth-child(5) {
        left: calc(calc(calc(100% / 6) * 4) - 5px);
      }
      &:nth-child(6) {
        left: calc(calc(calc(100% / 6) * 5) - 6px);
      }
    }
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .page-main {
    display: flex;
    height: 100vh;
    padding: 100px 15px;
    clip-path: circle(20%);
    overflow-y: auto;
    background: #02020c;
    div {
      text-align: center;
      margin: auto;
      h1 {
        font-size: 3rem;
      }
    }
  }
`;
