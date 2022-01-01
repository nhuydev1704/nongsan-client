import { Grid } from '@mui/material';
import styled from 'styled-components';

export const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    background-color: #f1f1f1;
    position: fixed;
    inset: 0;
`;

export const GridStyled = styled(Grid)`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const GridBeforeStyled = styled(Grid)`
    position: relative;
    padding-right: 20px;
    &::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        background-color: #ccc;
        height: 100%;
        width: 1px;
        display: block;
    }
    &::after {
        content: 'OR';
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: -19px;
        background-color: #f1f1f1;
        display: block;
        padding: 8px 10px;
        border-radius: 50%;
        color: #888;
    }
`;
