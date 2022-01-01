import React from 'react';
import GoogleLogin from 'react-google-login';
import styled from 'styled-components';
import FacebookLogin from 'react-facebook-login';
const DivStyled = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
`;
const SocialLogin = () => {
    const responseGoogle = (response) => {
        console.log(response);
    };

    const responseFacebook = (response) => {
        console.log(response);
    };

    return (
        <DivStyled>
            {/* <GoogleLogin
                clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                buttonText="Đăng nhập với google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                className="social_login bg-gg"
            />
            <FacebookLogin
                appId=""
                autoLoad={true}
                fields="name,email,picture"
                callback={responseFacebook}
                icon="fa-facebook"
                textButton="Đăng nhập với facebook"
                cssClass="social_login bg-fb"
            /> */}
        </DivStyled>
    );
};

export default SocialLogin;
