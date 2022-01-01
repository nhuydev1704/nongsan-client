import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@mui/material/Button';
const Div = styled.div`
    display: flex;
    position: fixed;
    inset: 0;
    background: #f1f1f1;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const H1 = styled.h1`
    font-size: 2rem;
    color: #333;
`;
const BtnText = styled(Link)`
    color: white;
`;

const Flex = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
`;
const NotFound = () => {
    return (
        <Div>
            <div>
                <H1>404 | Not Found</H1>
                <Flex>
                    <Button variant="contained">
                        <BtnText to="/">Trở lại</BtnText>
                    </Button>
                </Flex>
            </div>
        </Div>
    );
};

export default NotFound;
