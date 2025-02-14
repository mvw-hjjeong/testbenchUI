import styled from 'styled-components';

export const Layer = styled.div`
    position:fixed;
    width:100vw;
    height: 100vh; 
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'LINESeedKR-Bd', sans-serif;
    overflow: hidden;
    background:#111;
    z-index:3;
  a{
    color: #fff;
    text-decoration: none;
  }
  
  .scroll{
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    color: rgba(#fff, 0.5);
    font-family: 'LINESeedKR-Bd';
    font-size: calc(0.5rem + 0.35vw);
    z-index: 10;
  }
  
  ul, li{
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .nav{
    position: absolute;
    top: 2rem;
    z-index: 10;
    
    ul{
      display: flex;
      align-items: center;
      height: 1rem;
    }
    
    li{
      display: block;
      margin: 0 1rem;
      padding: 0;
    }
    
    a{
      position: relative;
      display: flex;
      align-items: center;
      font-size: calc(0.5rem + 0.35vw);
      font-family: 'LINESeedKR-Bd', helvetica, sans-serif;
      
      span{
        position: relative;
        
        &:before{
          content: '';
          position: absolute;
          left: 0;
          bottom: -0.35rem;
          width: 100%;
          height: 1px;
          background-color: rgba(#fff, 0.25);
          transition: transform .75s ease;
          transform-origin: right;
          transform: scaleX(0);
        }
      }
      
      &:hover,
      &.is-active {
  
        span{
          
          &:before{
            transform: scaleX(1);
            transform-origin: left;
          }
        }
      }
    }
  }
  
  .vert-text{
    position: absolute;
    bottom: 2rem;
    right: 2rem;
    width: 15rem;
    display: flex;
    align-items: right;
    z-index: 10;
      
    span{
      display: block;
      color: #fff;
      text-transform: uppercase;
      line-height: 1.1;
      transform: rotate(-90deg) translateY(15rem);
      transform-origin: bottom left;
      font-size: 15px;
    }
  }
  
  .cart-total{
    display: block;
    height: 2rem;
    width: 2rem;
    background-color: rgba(#fff, 0.25);
    border-radius: 50%;
    text-align: center;
    line-height: 2rem;
    margin-left: 1rem;
  }
  
  .slider{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    &__text{
      position: absolute;
      bottom: calc(2rem + 3vw);
      left: calc(2rem + 3vw);
      z-index: 10;
      font-family: 'LINESeedKR-Bd';
      font-size: calc(1rem + 4vw);
      text-transform: uppercase;
      transform-origin: top;
      line-height: 1.075;
      color: #fff;
      font-weight: 500;
      
      &-line{
        overflow: hidden;
      }
    }
    
    &__inner{
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
    }
    
    &__nav{
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      z-index: 10;
    }
    
    &-bullet{
      display: flex;
      align-items: center;
      justify-content: end;
      padding: 1rem 0;
      
      &__text{
        color: #fff;
        font-size: 0.65rem;
        margin-right: 1rem;
      }
      
      &__line{
        background-color: #fff;
        height: 1px;
        width: 1rem;
      }
    }
    
    canvas{
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
    }
  }
  
  .slide{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;

    &__content{  
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 0;
      top: 10vh;
      right: 0;
    }
    
    &__img{
      position: relative;
      width: 25vw;
      height: 70vh;
      padding: 0;
      margin: 0;
      min-width: 12.5rem;
      transform-origin: top;
      background-color: transparent;

      &:first-child{
        top: -1.5rem;
      }
      
      &:last-child{
        bottom: -1.5rem;
      }
      
      img{
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
`;
