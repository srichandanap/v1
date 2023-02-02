import React from 'react'
import "./login.css"
import onboardingLogo from "../../asstes/images/img_onboarding_illustration3.png";
import virtualLogo from "../../asstes/images/img_virtuallearn logo_splash 2.png";
import fb from "../../asstes/images/facebook.png";
import google from "../../asstes/images/google.png";
import { useNavigate } from "react-router-dom";
import MyCourses from '../myCourses/myCourses';
import axios from "axios";


const Login = () => {
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const password = e.target.pass.value;
        let result = await fetch("https://app-virtuallearning-230106135903.azurewebsites.net/auth/login",{

            method: "POST",
            headers: {
            "Content-Type": "application/JSON",
            "Accept": "application/JSON",
            "userName": name ,
            "password": password
        },

    });

        result = await result.json();
        console.log(result);
        if (result) {
            sessionStorage.setItem("auth", (result?.token));
            navigate("/homePage");
            // console.log( sessionStorage.getItem("auth"));
          } 
          else {
            console.log("Please enter the correct details");
          }

    // .then((res) => {
    //         console.log(res);
       


    //     })
    //     .catch((err) => {
    //         console.error(err);
    //     });
    }
    return (
        <>
            <div>
                <div className='loginPage'>
                    <div className='flexDivision'>
                        <div className='flexLeft'>
                            <img
                                src={onboardingLogo}
                                alt="logo"
                                className="onboardingLogo"
                            />
                            <div className='seamless'>Seamless Workflow</div>
                            <div className='seamlessContent'>Sync rosters, create and assign impactful video experiences, enrich your flipped classroom, and streamline tedious grading.</div>
                        </div>
                        <div className='flexRight'>
                            <div className='loginFormRow'>
                                <img src={virtualLogo} alt="image" className='virtualLogo' />
                                <div className='welcomeText'>Welcome Back!</div>
                                <div className='loginText'>Easy to learn anytime and anywhere. Login to your account</div>
                                <div className='socialLinks'>
                                    <div className='fbLinks'>
                                        <img src={fb} alt="image" className='image' />
                                    </div>
                                    <div className='fbLinks'>
                                        <img src={google} alt="image" className='image' />
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="loginForm">
                                        <div>
                                            <label htmlFor="name" className="userNameLabel">
                                                Username
                                            </label>
                                            <input
                                                //   autoComplete="off"
                                                type="text"
                                                className="userName"
                                                id="name"
                                                name="name"

                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="name" className="userNameLabel">
                                                Enter your password
                                            </label>
                                            <input
                                                //   autoComplete="off"
                                                type="password"
                                                className="userName"
                                                id="pass"
                                                name="pass"

                                            />
                                        </div>
                                        <button className="loginButton">Login</button>
                                    </div>
                                </form>
                                <div className="dontHaveAccount">Don't have an account? <span className="dontHaveAccountRegister">Register</span></div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Login