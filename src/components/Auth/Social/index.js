import React from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

const SocialLogin = () => {
    const responseGoogle = (response) => {
        console.log(response);
    };

    const responseFacebook = (response) => {
        console.log(response);
    };

    return (
        <div className="flex flex-row justify-center items-center space-x-3">
            <GoogleLogin
                clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                buttonText=""
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
                textButton=""
                cssClass="social_login bg-fb"
            />
        </div>
    );
};

export default SocialLogin;
