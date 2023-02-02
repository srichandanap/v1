import React from 'react'
import NavBar from '../navBar/navBar';
import "./congrats.css";
import { useNavigate } from "react-router-dom";
import congratsImage from "../../asstes/images/img_moduletest_success_illustration 1.png";

const Congrats = () => {
 
  const chapName = JSON.parse(localStorage.getItem("chapName" || "[]"));
  const chapNumber = JSON.parse(localStorage.getItem("chapNumber" || "[]"));
 
  const navigate = useNavigate();

  return (
    <>
    <div>
        <div>
            <NavBar />
            <div className='congratsContent'>
             <img src={congratsImage} alt="image" className='congImage'/>
             <div className='congText'>Congratulations!</div>
             <div className="compDetails">You have completed Chapter {chapNumber} - {chapName} </div>
             <button className='resultText' onClick={() => navigate("/myCourses")}>Click here to visit MyCourses</button>
            </div>
        </div>
    </div>

    </>
  )
}

export default Congrats