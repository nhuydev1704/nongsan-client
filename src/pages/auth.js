import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled as styledMui } from '@mui/material/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormLogin from '../components/Auth/FormAuth/FormLogin';
import SocialLogin from '../components/Auth/Social';
import LayoutComponet from '../components/global/LayoutComponet';
import { Div, GridBeforeStyled, GridStyled } from '../static/styled/AuthStyled';

const Item = styledMui(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: '60px 10px',
    color: theme.palette.text.secondary,
    border: '0',
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;',
    borderRadius: '20px',
}));

const AuthPage = () => {
    let navigate = useNavigate();
    console.log('vao day');

    const { auth, loading } = useSelector((state) => state);

    React.useEffect(() => {
        if (auth.token) navigate('/');
    }, [auth.token, navigate]);

    return (
        <LayoutComponet loading={loading}>
            <Div>
                <Box sx={{ flexGrow: 1, width: '100%' }}>
                    <GridStyled container>
                        <Grid item xs={11} sm={11} md={8} lg={6}>
                            <Item>
                                <Grid container spacing={2}>
                                    <GridBeforeStyled item xs={5}>
                                        <SocialLogin />
                                    </GridBeforeStyled>
                                    <Grid item xs={7}>
                                        <FormLogin />
                                    </Grid>
                                </Grid>
                            </Item>
                        </Grid>
                    </GridStyled>
                </Box>
            </Div>
        </LayoutComponet>
    );
};

export default AuthPage;
