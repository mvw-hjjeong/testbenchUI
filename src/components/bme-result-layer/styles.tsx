import styled from 'styled-components';

export const Layer = styled.div`
    position:absolute;
    right:0px;
    bottom:0px;
    display:flex;
    justify-content: space-around;
    width:60%;
    height:50px;
    z-index:80;
    font-family: 'LINESeedKR-Th';
    img{
        width:25px;
        height:25px; 
    }
    small{
        lineHeight:0.2; 
        color: #f1f1f1;
    }
    strong{
        font-family: 'LINESeedKR-Bd';
        lineHeight:0.4; 
        color:white;
    }
`