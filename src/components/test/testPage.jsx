import React, { useState, useEffect } from 'react'
import NavBar from '../navBar/navBar'
import "./testPage.css"
import axios from "axios";
import timer from "../../asstes/images/Group 183.png"
import notSelectedAnswer from "../../asstes/images/Ellipse 10.png";
import selectedAnswer from "../../asstes/images/Answer Tick Icon.png";
import rightArrow from "../../asstes/images/rightA.png";
import leftArrow from "../../asstes/images/leftA.png";
import { MultiStepForm, Step } from "react-multi-form";
import { useDispatch, useSelector } from "react-redux";
import { pushResult } from "../../slive/courseSlice";
import { useNavigate } from "react-router-dom";


const TestPage = () => {

    const [countDown, setCountDown] = useState(0);
    const [runTimer, setRunTimer] = useState(true);

    const [testModal, setTestModal] = useState(false);

    const [test, setTest] = useState();
    const [active, setActive] = useState(1);
    const [resObjLength, setResOjbLength] = useState();
    const [select, setSelect] = useState(false);
    const [testShow, setTestShow] = useState(null);
    const [pageQ, setPageQ] = useState(1);
    const [resultObj, setResultObject] = useState([{
        questionId: "",
        givenAnswer: ""
    }]);
    // const [finalArr, setFinalArr] = useState([{}]);

    const [qId, setQId] = useState();
    const [ans, setAns] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    var answersArr = new Array();
    var finalArr = []
    // const totalQuestions = useSelector((state) => state.course.totalQuestions);
    const totalQuestions = JSON.parse(localStorage.getItem("tq" || "[]"));
    const assignId = JSON.parse(localStorage.getItem("assignId" || "[]"));
    const chapName = JSON.parse(localStorage.getItem("chapName" || "[]"));
    const chapNumber = JSON.parse(localStorage.getItem("chapNumber" || "[]"));
    const testName = useSelector((state) => state.course.testName);

    // console.log(answersArr);

    // for(var z=1; z<resultObj.length; z++){
    //     if(resultObj[z].givenAnswer === "undefined" || resultObj[z].questionId === "undefined"){
    //         continue;
    //     }

    //     else{
    //        finalArr.push(resultObj);
    //     }
    // }
    // console.log(finalArr);
    // console.log(resultObj[0].givenAnswer)

    const toggleTest = (i) => {
        if (testShow === i) {
            return setTestShow(null)
        }
        setTestShow(i)
    }

    const rem = () => {
        setResultObject(resultObj.shift());
        console.log(resultObj)
    }




    useEffect(() => {
        let timerId;

        if (runTimer) {
            setCountDown(60 * 1);
            timerId = setInterval(() => {
                setCountDown((countDown) => countDown - 1);
            }, 1000);
        } else {
            clearInterval(timerId);
        }

        return () => clearInterval(timerId);
    }, [runTimer]);

    useEffect(() => {
        if (countDown < 0 && runTimer) {
            console.log("expired");
            setRunTimer(false);
            setCountDown(0);
            testSubmit()
        }
    }, [countDown, runTimer]);

    const togglerTimer = () => setRunTimer((t) => !t);

    const seconds = String(countDown % 60).padStart(2, 0);
    const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);


    useEffect(() => {
        axios
            .get(
                `https://app-virtuallearning-230106135903.azurewebsites.net/user/questions`,
                {
                    params: { assignmentId: assignId, limit: 1, page: pageQ },
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('auth')}`,
                    },
                }
            )
            .then((res) => {
                console.log(res);
                setTest(res?.data);

            })
            .catch((err) => {
                console.error(err);
            });
    }, [pageQ]);

    const testSubmit = async () => {
        rem();
        console.log(resultObj);
        await axios
            .request(
                `https://app-virtuallearning-230106135903.azurewebsites.net/user/assignment`,

                {
                    method: "post",
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('auth')}`,
                        'Content-Type': 'application/json'
                    },
                    data: {
                        "assignmentId": assignId,

                        "questionAnswers":
                            // [
                            //         resultObj.slice(1, resultObj.length-1)?.map((data, i) => {
                            //             setResOjbLength(resultObj.length-1)
                            //             return (

                            //     {
                            //     "questionId": data.questionId,      
                            //     "givenAnswer": data.givenAnswer  
                            //     }(i === resObjLength ? "," : "")

                            //     )
                            // })

                            resultObj
                        // ]

                    }

                }
            )
            .then((res) => {
                console.log(resultObj)
                console.log(res);

                if (res?.data === "Assignment saved successfully") {

                    navigate("/congrats");
                    // navigate("/myCourses");
                }
                else {
                    alert("test not submitted correctly");
                }

            })
            .catch((err) => {
                console.log(err);
            });


    };

    return (
        <div>
            <div>
                <NavBar />
                <div className='myCourseMargin'>
                    <div className='moduletestText'>{testName}</div>

                    {testModal && (
                        <div class="overlay">
                            <div className='modalComp'>
                                <div className='endText'> Do you want to end the test?</div>
                                <div className='remTimeText'>You still have time remaining</div>
                                <div className='remTimeText'>
                                    If you want to check your answer again, press cancel button. If you want to end the test and submit your answers you can press submit button.
                                </div>


                                <div className='modalBtn'>
                                    <button className='cancelBtn' onClick={() => { setTestModal(false) }}>Cancel</button>
                                    <button className='reSubBtn' onClick={() => { setTestModal(false); testSubmit() }}>Submit</button>
                                </div>

                            </div>
                        </div>
                    )}

                    <form className='formDiv' id='quiz'>
                        <MultiStepForm activeStep={active} style="margin-bottom: 0px; display:none">
                            {test?.map((data, i) => {
                                dispatch(pushResult(data))
                                return (
                                    <>
                                        {/* <div key={i}> */}
                                        <Step>
                                            <div className='questionsDiv'>
                                                <div className='questionDesc'>

                                                    <div className='questionNumberText'>Question {pageQ} of {totalQuestions}</div>
                                                    <div className='timingText'>
                                                        <img src={timer} alt="image" />
                                                        <div className='remainingText'>{minutes}:{seconds} remaining</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='questionPart'>
                                                <div className='questions'>{data?.questionName}</div>

                                                {test[i]?.options?.map((datas, j) => {
                                                    var newArr = []
                                                    return (
                                                        <>
                                                            <div className='answerDiv' name={j} onClick={() => {
                                                                toggleTest(datas);
                                                                setQId(data?.questionId)
                                                                setAns(datas)
                                                                // setResultObject([...resultObj, {questionId: data?.questionId, givenAnswer: datas}])

                                                                newArr = [...resultObj];

                                                                newArr[pageQ] = { questionId: data?.questionId, givenAnswer: datas };

                                                                setResultObject(newArr);
                                                                localStorage.setItem("answers", JSON.stringify(resultObj));
                                                            }}
                                                            >
                                                                {/* {
                                                                console.log(resultObj)
                                                                
                                                                } */}

                                                                <div className={testShow === datas || resultObj[pageQ]?.givenAnswer === datas ? "answerRows" : "answerRow"}>
                                                                    <div>
                                                                        {testShow === datas || resultObj[pageQ]?.givenAnswer === datas ? <img src={selectedAnswer} alt="image" /> : <img src={notSelectedAnswer} alt="image" />}
                                                                    </div>
                                                                    <div className={testShow === datas || resultObj[pageQ]?.givenAnswer === datas ? 'answerBLocks' : 'answerBLock'}>{datas}</div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )

                                                })}

                                            </div>
                                        </Step>
                                        {/* </div> */}
                                    </>
                                )
                            })}
                        </MultiStepForm>
                        <div className='footerDivQ'>
                            <div className='changeQuestionDiv'>
                                <div className='changeDiv'>
                                    <div className='chapListDiv'>
                                        <div className='chapNameCountText'>Chapter {chapNumber}</div>
                                        <div className='chapTextTwo'>{chapName}</div>
                                    </div>
                                    <button className='arrBtn' type='button'><img src={leftArrow} alt="image" onClick={() => { pageQ === 1 ? setPageQ(1) : setPageQ(pageQ - 1) }} /></button>
                                    {pageQ === totalQuestions ? (<button className='arrBtnSubmit' type='button' onClick={() => { (countDown < 0) ? (testSubmit()) : (setTestModal(true)) }}>Submit</button>) : (<button className='arrBtn' type='button'><img src={rightArrow} alt="image" onClick={() => { setPageQ(pageQ + 1) }} /></button>)}

                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div >
    )
}

export default TestPage
