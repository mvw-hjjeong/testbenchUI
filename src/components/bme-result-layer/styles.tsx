import styled from 'styled-components';

export const Layer = styled.div`
    position:absolute;
    right:0px;
    bottom:0px;
    display:flex;
    justify-content: space-around;
    width:60%;
    height:50px;

    img{
        width:30px;
        height:30px; 
    }
    small{
        lineHeight:0.5; 
        color: #f1f1f1;
    }
    strong{
        color:white;
    }
`