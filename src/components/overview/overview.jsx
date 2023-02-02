import React, { useState, useEffect, useRef } from 'react'
import NavBar from '../navBar/navBar'
import ReactPlayer from "react-player";
import "./overview.css"
import arrow from "../../asstes/images/Vector.png"
import plus from "../../asstes/images/plus.png"
import minus from "../../asstes/images/minus.png"
import thumbnail from "../../asstes/images/Rectangle 28.png"
import icn_includes_duration from "../../asstes/images/icn_includes_duration.png"
import icn_includes_supportfiles from "../../asstes/images/icn_includes_supportfiles.png"
import test from "../../asstes/images/icn_includes_test.png"
import access from "../../asstes/images/icn_includes_lifetime.png"
import web from "../../asstes/images/icn_includes_global.png"
import cert from "../../asstes/images/icn_includes_certificate.png"
import youllLearn from "../../asstes/images/icn_youlllearn.png"
import dots from "../../asstes/images/Ellipse 9.png"
import instructorImage from "../../asstes/images/img_instructor1 copy@3x 1.png"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import redPlay from "../../asstes/images/Red Play.png";
import greyPlay from "../../asstes/images/grey play.png";
import moduleTest from "../../asstes/images/moduletest.png";
import { addVideo, addLessonId, addModal, addInitVideo, addtotalQuestions, addtestName, addAssignId, addChapName, addCourseName, addChapNumber } from "../../slive/courseSlice";
import perc from "../../asstes/images/perc.png";
import greenTick from "../../asstes/images/Group 132.png";
import whiteRing from "../../asstes/images/Group 134.png";
import greenRing from "../../asstes/images/Group 133.png";
import { useNavigate } from "react-router-dom";
import { setMaxListeners } from 'events';

const Overview = () => {
    const [tabChange, setTabChange] = useState(1)
    const [overviewDetails, setOverviewDetails] = useState(true)
    const [completedDetails, setCompletedDetails] = useState(false)
    const [videoData, setVideoData] = useState("")
    const [overviewData, setOverviewData] = useState("")
    const [chapterData, setChapterData] = useState("")
    const [show, setShow] = useState(null);
    const dispatch = useDispatch();
    const [played, setPlayed] = useState(0);
    const [videoStatus, setVideoStatus] = useState(false)
    const [videoCompleted, setVideoCompleted] = useState(false)
    const [videoCompletedTwo, setVideoCompletedTwo] = useState(false)
    const [controls, setControls] = useState(false)
    const [playing, setPlaying] = useState(false)
    const [modal, setModal] = useState(false)
    const [dResult, setDResult] = useState(false)

    var supportStatus = "";
    var videoLink = "";
    var lengthsVar = "false";
    var lengthsVarTwo = "false";
    var lengths = 0;
    var initVideo = "";
    var dispatchResult = "false";
    var secondsResult = 0;
    var l = 0;
    var assResult = "false";

    const playerRef = useRef();
    const navigate = useNavigate();

    const id = JSON.parse(localStorage.getItem("courseId" || "[]"));
    const sec = JSON.parse(localStorage.getItem("secondsPlayed" || "[]"));
    // const videoLink = JSON.parse(localStorage.getItem("video" || "[]"));
    videoLink = useSelector((state) => state.course.video);
    const lessonId = useSelector((state) => state.course.lessonId);
    const modalDetails = useSelector((state) => state.course.modalDetails);
    secondsResult = modalDetails?.durationCompleted;
    // console.log(secondsResult);


    function secondsToHms(d) {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);

        var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
        var mDisplay = m > 0 ? m + (m == 1 || s == 0 ? " min " : " min, ") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? " sec" : " sec") : "";
        return hDisplay + mDisplay + sDisplay;
    }

    const data = overviewData;

    const toggle = (i) => {
        if (show === i) {
            return setShow(null)
        }
        setShow(i)
    }


    useEffect(() => {
        axios
            .get(
                `https://app-virtuallearning-230106135903.azurewebsites.net/user/view/courseOverview`,
                {
                    params: { courseId: id },
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('auth')}`,
                    },
                }

            )
            .then((res) => {
                console.log(res);
                setOverviewData(res?.data)
                videoLink = overviewData?.overview?.videoLink;


            })
            .catch((err) => {
                console.error(err);
            });
    }, [id]);


    // useEffect(() => {
    //     durations();
    // }, [played])

    const durations = async () => {
        await axios
            .request(
                `https://app-virtuallearning-230106135903.azurewebsites.net/user/lesson`,
                {
                    method: "post",
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('auth')}`,
                    },
                    params: { lessonId: lessonId, duration: sec },


                }
            )
            .then((res) => {
                console.log(res);

            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        axios
            .get(
                `https://app-virtuallearning-230106135903.azurewebsites.net/user/view/chapter`,
                {
                    params: { courseId: id },
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('auth')}`,
                    },
                }

            )
            .then((res) => {
                console.log(res);
                setChapterData(res?.data)
                initVideo = res?.data?.overviewVideo;
                // console.log(initVideo);

            })
            .catch((err) => {
                console.error(err);
            });
    });

    supportStatus = data?.courseIncludes?.supportFiles;

    return (
        <div>
            <NavBar />
            <div className='myCourseMarginO'>
                {overviewData?.joined_course &&
                    (
                        <>
                            <div className='path'>

                                <div className='myCoursePath' onClick={() => { navigate("/myCourses") }}>My Course&nbsp;&nbsp;</div>
                                <img src={arrow} alt="image" className='arrow' />

                                <div className='ongoingPath'> &nbsp;&nbsp;{(chapterData?.certificateGenerated) ? "Completed" : "Ongoing"}</div>

                            </div>
                        </>
                    )}


                <div className='courseDetails'>
                    {overviewDetails &&
                        <div className='courseDetailsLeft'>
                            <div className='videoOngoing'>
                                <ReactPlayer
                                    url={overviewData?.overview?.videoLink}
                                    controls
                                    className="react-player"
                                    width="100%"
                                    height="100%"
                                //   ref={playerRef}
                                //   onPause={()=> durations()}
                                //   onPlay={onPlay}
                                //   playing={playing}
                                //   onEnded={onEnd}
                                //   onSeek={() => {
                                //     setPause(false);
                                //   }}
                                //   onProgress={(progress) => {
                                //     setPlayed(progress.playedSeconds);
                                //     dispatch(pauseTimeState(progress.playedSeconds));
                                //     localStorage.setItem("pauseTimeLocal", progress.playedSeconds);
                                //   }}
                                />

                                <div className='previewText'>Preview the course</div>
                            </div>

                            <div className='courseLabel'>
                                <div>
                                    <div className='labelStyle'>{data?.courseHeader?.course_name}</div>
                                    <div className='labelDetailsText'>{data?.courseHeader?.chapter_count} Chapter | {data?.courseHeader?.lesson_count} lessons</div>
                                </div>
                                <div className='designLabel'>

                                    {data?.courseHeader?.category_name}
                                </div>
                            </div>
                            <hr className='lineBorders'></hr>
                            <div className='courseDescription'>{data?.overview?.courseDescription}</div>
                            <div className='aboutFigma'>{data?.overview?.previewCourseContent}</div>
                        </div>
                    }

                    {completedDetails &&
                        <div className='courseDetailsLeft'>
                            <div className='videoOngoing'>

                                <ReactPlayer
                                    url={videoLink}
                                    controls={controls}
                                    className="react-player"
                                    width="100%"
                                    height="100%"
                                    // height="100%"
                                    ref={playerRef}
                                    // onPause={() =>{ durations() setVideoStatus(false) }}
                                    //   onPlay={() =>{setVideoStatus(false)}}
                                    playing={playing}
                                    //   onEnded={onEnd}
                                    //   onSeek={() => {
                                    //     setPause(false);
                                    //   }}
                                    onProgress={(progress) => {
                                        setPlayed(parseInt(progress.playedSeconds));
                                        localStorage.setItem("secondsPlayed", JSON.stringify(parseInt(progress.playedSeconds)))
                                        console.log(played)
                                        durations();

                                    }}
                                />


                                {modal &&
                                    <div className='startModal'>
                                        <div className='pausedText'>Your lesson paused at {parseFloat(secondsResult)}.&nbsp;Do you want to continue watching?</div>
                                        <div className='watchBtns'>
                                            <div className='contWatching' onClick={() => {
                                                playerRef.current.seekTo(secondsResult, 'seconds');
                                                setControls(true);
                                                setPlaying(true);
                                                setModal(false);
                                            }}>Continue watching</div>
                                            <div className='watchStart' onClick={() => {
                                                playerRef.current.seekTo(0, 'seconds');
                                                setControls(true);
                                                setPlaying(true);
                                                setModal(false);
                                            }}>Watch from beginning</div>
                                        </div>
                                    </div>}
                            </div>

                            <div className='courseLabel'>
                                <div>
                                    <div className='labelStyle'>{data?.courseHeader?.course_name}</div>
                                    <div>{data?.courseHeader?.chapter_count} Chapter | {data?.courseHeader?.lesson_count} lessons</div>
                                </div>
                                <div className='designLabel'>

                                    {data?.courseHeader?.category_name}
                                </div>
                            </div>

                        </div>
                    }
                    <div className='contents'>
                        <div className='contentTabs'>
                            <div className={tabChange === 1 ? 'contentOverviewActive' : 'contentOverview'} onClick={() => { setTabChange(1); setOverviewDetails(true); setCompletedDetails(false) }}>
                                Overview
                            </div>
                            <div className={tabChange === 2 ? 'contentOverviewActive' : 'contentOverview'} onClick={() => { setTabChange(2); setOverviewDetails(false); setCompletedDetails(true) }}>
                                Chapters
                            </div>
                        </div>

                        {overviewDetails &&
                            (
                                <>
                                    <div className='courseIncludeComponents'>

                                        <div className='courseIncludesFLex'>
                                            <div className='courseIncludes'>Course Includes</div>
                                            <div className='rowElementss'>
                                                <img src={icn_includes_duration} alt="image" className='courseIncludesImage' />
                                                <div className='courseDetailText'>{data?.courseIncludes?.totalHourVideo} total hours video</div>
                                            </div>
                                            {supportStatus === true &&

                                                (<div className='rowElementss'>
                                                    <img src={icn_includes_supportfiles} alt="image" className='courseIncludesImage' />
                                                    <div className='courseDetailText'>Support Files</div>
                                                </div>
                                                )
                                            }

                                            <div className='rowElementss'>
                                                <img src={test} alt="image" className='courseIncludesImage' />
                                                <div className='courseDetailText'>{data?.courseIncludes?.moduleTest} Module Test</div>
                                            </div>

                                            {data?.courseIncludes?.fullLifetimeAccess === true &&
                                                (<div className='rowElementss'>
                                                    <img src={access} alt="image" className='courseIncludesImage' />
                                                    <div className='courseDetailText'>Full lifetime access</div>
                                                </div>
                                                )}

                                            <div className='rowElementss'>
                                                <img src={web} alt="image" className='courseIncludesImage' />
                                                <div className='courseDetailText'>{data?.courseIncludes?.accessOn} </div>
                                            </div>

                                            {data?.courseIncludes?.certificateOfCompletion === true &&
                                                (
                                                    <>
                                                        <div className='rowElementss'>
                                                            <img src={cert} alt="image" className='courseIncludesImage' />
                                                            <div className='courseDetailText'>Certificate of Completion</div>
                                                        </div>
                                                    </>
                                                )}
                                        </div>

                                        <div className='courseIncludesFLex'>
                                            <div className='courseIncludes'>What you'll learn</div>
                                            {overviewData?.overview?.courseOutcome?.map((data) => {
                                                return (
                                                    <div className='rowElements'>
                                                        <img src={youllLearn} alt="image" className='whatYouLearnImage' />
                                                        <div className='whatYouLearnText'>{data}</div>
                                                    </div>
                                                )
                                            })}

                                        </div>

                                        <div className='courseIncludesFLex'>
                                            <div className='courseIncludes'>Requirements</div>
                                            {overviewData?.overview?.courseOutcome?.map((data) => {
                                                return (
                                                    // <div className='rowElementsRequire'>
                                                    <ul className='rowElementsRequire'>
                                                        {/* <img src={dots} alt="image" className='requirementImage' /> */}
                                                        <li className='whatYouLearnText'>{data}</li>
                                                        {/* <li>{data}</li> */}
                                                    </ul>
                                                    // </div>
                                                )
                                            })}
                                        </div>

                                        <div className='courseIncludesFLex'>
                                            <div className='courseIncludes'>Instructor</div>
                                            <div className='rowElementsInstructor'>
                                                <img src={overviewData?.instructor?.profile_pic} alt="image" className='instructorImage' />
                                                <div>
                                                    <div className='instructorName'>{overviewData?.instructor?.instructorName}</div>
                                                    <div className='instructorOccu'>{overviewData?.instructor?.occupation}</div>
                                                </div>
                                            </div>
                                            <div className='rowElements'>
                                                <div className='whatYouLearnText'>{overviewData?.instructor?.about}</div>

                                            </div>

                                        </div>
                                        {console.log(overviewData?.joined_course)}
                                        {overviewData?.joined_course === false ? <button className='joinCourseBtn'>Join Course</button> : ""}

                                    </div>
                                </>
                            )
                        }

                        {completedDetails &&
                            (
                                <>
                                    <div className='courseIncludeComponents'>
                                        <div className='courseIncludes'>Course Content</div>
                                        <div className='chapListText'>{chapterData?.courseContentResponse?.chapterCount} Chapter | {
                                            chapterData?.courseContentResponse?.lessonCount} lessons | {chapterData?.courseContentResponse?.moduleTest} Assignment Test | {chapterData?.courseContentResponse?.totalVideoLength
                                            }h total length</div>
                                    </div>

                                    {chapterData?.lessonResponseList?.map((data, i) => {

                                        return (
                                            <>
                                                {/* <div> */}


                                                <div className='accordianDiv'>
                                                    <div className='chapNameAccor' onClick={() => toggle(i)}>
                                                        <div className={data?.chapterCompleted === true ? 'lessonNameCompleted' : 'chapName'}>Chapter {data?.chapterNumber} - {data?.chapterName}</div>
                                                        <div className='accor'> {show === i ? <img src={minus} alt="image" className='minImg' /> : <img src={plus} alt="image" className='minImg' />}</div>
                                                    </div>
                                                    {show === i && <div className='accorHidden'>
                                                        {chapterData?.lessonResponseList[i]?.lessonList?.map((data, j) => {

                                                            return (
                                                                <>
                                                                    <div className='progress'>
                                                                        <div>
                                                                            {data.lessonCompleted === true ? (
                                                                                <img src={greenTick} alt="image" className='rings' />
                                                                            )
                                                                                :
                                                                                (data.lessonCompleted === false && data.durationCompleted > 0 ? (<img src={greenRing} alt="image" className='rings' />) : (<img src={whiteRing} alt="image" className='rings' />))
                                                                            }
                                                                        </div>

                                                                        <div className='accorChap' onClick={() => {
                                                                            (((j === 0 && chapterData?.joinedCourse === true) ? ((chapterData?.lessonResponseList[i]?.chapterNumber !== 1 && (
                                                                                ((chapterData?.lessonResponseList[i - 1]?.chapterCompleted === true)) ? lengthsVar = "true" : lengthsVar = "false")))
                                                                                : (chapterData?.lessonResponseList[i]?.lessonList[j - 1]?.lessonCompleted === true ? lengthsVarTwo = "true" : lengthsVarTwo = "false")));

                                                                            (((j === 0 && chapterData?.lessonResponseList[i]?.chapterNumber === 1) || data?.lessonCompleted === true || lengthsVar === "true" || lengthsVarTwo === "true") ?
                                                                                dispatchResult = "true" : dispatchResult = "false");



                                                                            if (dispatchResult === "true" && chapterData?.joinedCourse === true) {
                                                                                console.log("dispatch");
                                                                                dispatch(addVideo(data?.videoLink));
                                                                                dispatch(addLessonId(data?.lessonId));
                                                                                dispatch(addModal(chapterData?.lessonResponseList[i]?.lessonList[j]));
                                                                                // durations();
                                                                            }
                                                                            else {
                                                                                console.log("dont dispatch")
                                                                            }

                                                                            if (data?.durationCompleted === 0) {
                                                                                setModal(false);
                                                                                setPlaying(true);
                                                                                setControls(true);
                                                                            }
                                                                            else {
                                                                                setModal(true);
                                                                                setPlaying(false);
                                                                                setControls(false);
                                                                            }

                                                                            // (dResult ? ( (dispatch(addVideo(data?.videoLink)), dispatch(addLessonId(data?.lessonId)), dispatch(addModal(chapterData?.lessonResponseList[i]?.lessonList[j])) )): console.log("dont dispatch") )
                                                                        }}>

                                                                            {/* {(data?.durationCompleted === 0 ? (setModal(false), setPlaying(true), setControls(true)) : (setModal(true), setPlaying(false), setControls(false)))
                                                                        } */}





                                                                            <div className='accorLeft'>
                                                                                <div className='lessonCount'>{data?.lessonNumber}</div>

                                                                                <div className='accorChapDetails'>
                                                                                    <div className={data?.lessonCompleted === true ? 'lessonName' : 'lessonTextNotCompleted'}>{data?.lessonName}</div>
                                                                                    <div className='lessonDuration'>{secondsToHms(data?.duration)}</div>
                                                                                </div>
                                                                            </div>
                                                                            {/* <div> */}
                                                                            {data?.lessonCompleted === true ? <img src={redPlay} alt="image" className='playImage' /> : <img src={greyPlay} alt="image" className='playImage' />}
                                                                            {/* </div> */}
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )
                                                        })}
                                                        {data?.assignmentResponse !== null && (
                                                            //  l = data?.lessonList?.length
                                                            <>
                                                                {/* {console.log(data?.lessonList[l - 1]?.lessonCompleted)} */}

                                                                <div className='progress'>

                                                                    <div>
                                                                        {data?.assignmentResponse?.assignmentCompleted === true ? (
                                                                            <img src={greenTick} alt="image" className='rings' />
                                                                        )
                                                                            :
                                                                            (<img src={whiteRing} alt="image" className='rings' />)
                                                                        }
                                                                    </div>

                                                                    <div className='accorChap' onClick={() => {

                                                                        data?.lessonList[data?.lessonList?.length - 1]?.lessonCompleted === true && data?.assignmentResponse?.assignmentCompleted === false ? assResult = "true" : assResult = "false"

                                                                        if (assResult === "true") {
                                                                            dispatch(addtotalQuestions(data?.assignmentResponse?.questionCount));
                                                                            dispatch(addtestName(data?.assignmentResponse?.assignmentName));
                                                                            dispatch(addAssignId(data?.assignmentResponse?.assignmentId));
                                                                            dispatch(addChapName(data?.chapterName));
                                                                            dispatch(addChapNumber(data?.chapterNumber));
                                                                            navigate("/testPage");
                                                                        }
                                                                        else {
                                                                            console.log("dont dispatch");

                                                                        }

                                                                        //         data?.lessonList[l-1]?.lessonCompleted === true ? 
                                                                        //  (dispatch(addtotalQuestions(data?.assignmentResponse?.questionCount));
                                                                        //      dispatch(addtestName(data?.assignmentResponse?.assignmentName));
                                                                        //       dispatch(addAssignId(data?.assignmentResponse?.assignmentId));
                                                                        //        navigate("/testPage");)
                                                                        //        :
                                                                        //         ""
                                                                    }}>
                                                                        <div className='testColumn'>  <img src={moduleTest} alt="image" className='testImage' />
                                                                            <div className='accorChapDetails'>
                                                                                <div className={data?.assignmentResponse?.assignmentCompleted === true ? 'lessonName' : 'lessonTextNotCompleted'}>{data?.assignmentResponse?.assignmentName}</div>
                                                                                <div className='lessonDuration'>{secondsToHms(data?.assignmentResponse?.testDuration)} | {data?.assignmentResponse?.questionCount} Questions</div>
                                                                            </div></div>
                                                                        {data?.assignmentResponse?.assignmentCompleted === true &&
                                                                            <div className='percGrade'>
                                                                                <div className='perc'>{data?.assignmentResponse?.grade}%</div>
                                                                                <div className='approvalText'>Approval Rate</div>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </div>

                                                            </>
                                                        )
                                                        }

                                                    </div>
                                                    }
                                                </div>
                                                {/* </div> */}
                                            </>
                                        )
                                    })}

                                </>
                            )}

                    </div>
                </div>

            </div>
        </div >
    )
}

export default Overview
