import styled from 'styled-components';

export const LogLayer = styled.div`
    position:absolute;
    right:0px;
    top:0px;
    display:flex;
    justify-content:right;
    align-items:center;
    width:50%;
    height:30px;
    background:red;
    z-index:99;
`

export const TimeLayer = styled.div`
    position:absolute;
    left:60px;
    bottom:10px;
    display:flex;
    justify-content:left;
    align-items:center;
    width:300px;
    height:30px;
    z-index:99;
    color:white;
    font-family: 'LINESeedKR-Th'!important;
    font-weight: 500;
}
`