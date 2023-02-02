import React, { useState, useEffect } from 'react'
import NavBar from '../navBar/navBar';
import "./homePage.css";
import axios from "axios";
import ReactDOM from "react-dom";
import Carousel from "react-elastic-carousel";
import im from "../../asstes/images/Rectangle 28.png";
import "./dotStyle.css";
import Ongoing from '../ongoing/ongoing';
import script from "../../asstes/images/script.png";
import pen from "../../asstes/images/pen.png";
import img1 from "../../asstes/images/Rectangle 28.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addId } from "../../slive/courseSlice";
import clock from "../../asstes/images/clock.png";


const HomePage = () => {
    const [ongoingCourseHomePage, setOngoingCourseHomePage] = useState();
    const [category, setCategory] = useState();
    const [allCourses, setAllCourses] = useState();
    const [popular, setPopular] = useState();
    const [newest, setNewest] = useState();
    const [catOne, setCatOne] = useState();
    const [catTwo, setCatTwo] = useState();
    const [catTwoName, setCatTwoName] = useState();
    const [catOneName, setCatOneName] = useState();
    const [tabStates, setTabStates] = useState(1)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const items = [
        { id: 1, url: 'https://res.cloudinary.com/dmobwjtw7/image/upload/v1671509347/VirtualLearning/n0xhiiguodqltohntehf.png', itemsToShow: 3 },
        { id: 1, url: 'https://res.cloudinary.com/dmobwjtw7/image/upload/v1671509260/VirtualLearning/om6zojqxveajp79d5qhi.png', itemsToShow: 3 },
        { id: 1, url: 'https://res.cloudinary.com/dmobwjtw7/image/upload/v1671509347/VirtualLearning/n0xhiiguodqltohntehf.png', itemsToShow: 3 },
        { id: 1, url: 'https://res.cloudinary.com/dmobwjtw7/image/upload/v1671509260/VirtualLearning/om6zojqxveajp79d5qhi.png', itemsToShow: 3 },
        { id: 1, url: 'https://res.cloudinary.com/dmobwjtw7/image/upload/v1671509347/VirtualLearning/n0xhiiguodqltohntehf.png', itemsToShow: 3 },
    ];

    useEffect(() => {
        axios
            .get(
                `https://app-virtuallearning-230106135903.azurewebsites.net/user/ongoing-courses`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('auth')}`,
                    },
                }
            )
            .then((res) => {
                console.log(res);
                setOngoingCourseHomePage(res);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);


    useEffect(() => {
        axios
            .get(
                `https://app-virtuallearning-230106135903.azurewebsites.net/user/view/categories`,

            )
            .then((res) => {
                console.log(res);
                setCategory(res);

            })
            .catch((err) => {
                console.error(err);
            });
    }, []);


    useEffect(() => {
        axios
            .get(
                `https://app-virtuallearning-230106135903.azurewebsites.net/user/view/courses`,
                { params: { limit: 4, page: 1 } },

            )
            .then((res) => {
                console.log(res);
                setAllCourses(res?.data);

            })
            .catch((err) => {
                console.error(err);
            });
    }, []);


    useEffect(() => {
        axios
            .get(
                `https://app-virtuallearning-230106135903.azurewebsites.net/user/view/popularCourse`,
                { params: { limit: 4, page: 1 } },

            )
            .then((res) => {
                console.log(res);
                setPopular(res?.data);

            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    useEffect(() => {
        axios
            .get(
                `https://app-virtuallearning-230106135903.azurewebsites.net/user/view/newestCourse`,
                { params: { limit: 4, page: 1 } },

            )
            .then((res) => {
                console.log(res);
                setNewest(res?.data);

            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    useEffect(() => {
        axios
            .get(
                `https://app-virtuallearning-230106135903.azurewebsites.net/user/view/course/category1`,
                { params: { limit: 4, page: 1 } },

            )
            .then((res) => {
                console.log(res);
                setCatOne(res?.data);
                setCatOneName(res?.data[0]?.category_name);

            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    useEffect(() => {
        axios
            .get(
                `https://app-virtuallearning-230106135903.azurewebsites.net/user/view/course/category2`,
                { params: { limit: 4, page: 1 } },

            )
            .then((res) => {
                console.log(res);
                setCatTwo(res?.data);
                setCatTwoName(res?.data[0]?.category_name);

            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <>
            <div>
                <NavBar />
                <div className='myCourseMarginH'>
                    <div>
                        <div className='helloText'>Hello!</div>
                        <div className='nameText'>Mahendra Singh Dhoni</div>
                    </div>
                    <Carousel breakPoints={items}>
                        {items.map(item => <img src={item.url} alt="image" className='thumbnailCar' />)}
                    </Carousel>
                    <div className='headingDistance'>
                        <div className='headingText'>
                            <div className='ongCat'>Ongoing courses</div>
                            <div className='seeAll' onClick={() => { navigate("/myCourses") }}>See All</div>
                        </div>

                        <div className='ongoingMarginHome'>
                            <div className='ongoingItemsHome'>
                                {ongoingCourseHomePage?.data?.slice(0, 3)?.map((data) => {
                                    return (
                                        <div className='ongoingItemHome' onClick={() => {
                                            dispatch(addId(data?.course_id));
                                            navigate("/overview");
                                        }}
                                        >
                                            <img src={data?.course_image} alt="" className='thumbnailHome' />
                                            <div className='textOnImage'>
                                                <div className='chapHome'>
                                                    <div className='thumbnailText vName'>{data?.course_name}</div>
                                                    <div className='thumbnailText'>{data?.completed_chapter_count}/{data?.chapter_count} Chapters</div>
                                                </div>
                                                <div className='contMedia'>
                                                    <button className='continueHome'>Continue</button>
                                                </div>
                                            </div>
                                        </div>

                                    );
                                })}
                            </div>
                        </div>
                        <div className='headingDistance'>
                            <div className='headingText'>
                                <div className='ongCat'>Categories</div>
                                <div className='seeAll'>See All</div>
                            </div>

                            <div className='categories'>
                                {category?.data?.map((data) => {
                                    return (
                                        <div className='categoriesItem'>
                                            {/* <img src={pen} alt="image" /> */}
                                            {(() => {
                                                switch (data?.categoryName) {
                                                    case 'Design':
                                                        return <img className="fb_img" src={pen} alt="image" />
                                                    case 'Development':
                                                        return <img className="fb_img" src={script} alt="imge" />
                                                    default:
                                                        return null
                                                }
                                            })()}

                                            <div>{data?.categoryName}</div>
                                        </div>

                                    )
                                })}
                            </div>
                        </div>
                        <div className='headingDistance'>
                            <div className='headingText'>
                                <div className='choiceYourCourse'>Choice your course</div>
                                <div className='seeAll'>See All</div>
                            </div>
                            <div className='tab'>
                                <div className={tabStates === 1 ? 'tabClassSelect' : 'tabClassUnselect'}
                                    onClick={() => { setTabStates(1) }}>
                                    All
                                </div>
                                <div className={tabStates === 2 ? 'tabClassSelect' : 'tabClassUnselect'} onClick={() => { setTabStates(2) }}>
                                    Popular
                                </div>
                                <div className={tabStates === 3 ? 'tabClassSelect' : 'tabClassUnselect'} onClick={() => { setTabStates(3) }}>
                                    Newest
                                </div>
                            </div>

                            {tabStates === 1 && (
                                <>
                                    <div className='allCat'>
                                        {allCourses?.map((data) => {
                                            return (
                                                <div className='course'
                                                    onClick={() => {
                                                        dispatch(addId(data?.course_id));
                                                        navigate("/overview");
                                                    }}
                                                >
                                                    <div className='imageCat'>
                                                        <img src={data?.course_image} alt="image" className='imgSize' />
                                                        <div className='designLabels'>

                                                            {data?.category_name}
                                                            {/* Development */}
                                                        </div>
                                                    </div>
                                                    <div className='catCourseName'>{data?.course_name}</div>
                                                    <div className='catChapCount'>{data?.chapter_count} Chapters</div>

                                                </div>
                                            )
                                        })}
                                    </div>
                                </>
                            )
                            }


                            {tabStates === 2 && (
                                <>
                                    <div className='allCat'>
                                        {popular?.map((data) => {
                                            return (
                                                <div className='course'
                                                    onClick={() => {
                                                        dispatch(addId(data?.course_id));
                                                        navigate("/overview");
                                                    }}
                                                >
                                                    <div className='imageCat'>
                                                        <img src={data?.course_image} alt="image" className='imgSize' />
                                                        <div className='designLabels'>

                                                            {/* {data?.category_name} */}
                                                            Design
                                                        </div>
                                                    </div>
                                                    <div className='catCourseName'>{data?.course_name}</div>
                                                    <div className='catChapCount'>{data?.chapter_count} Chapters</div>

                                                </div>
                                            )
                                        })}
                                    </div>
                                </>
                            )
                            }


                            {tabStates === 3 && (
                                <>
                                    <div className='allCat'>
                                        {newest?.map((data) => {
                                            return (
                                                <div className='course'
                                                    onClick={() => {
                                                        dispatch(addId(data?.course_id));
                                                        navigate("/overview");
                                                    }}
                                                >
                                                    <div className='imageCat'>
                                                        <img src={data?.course_image} alt="image" className='imgSize' />
                                                        <div className='designLabels'>

                                                            {/* {data?.category_name} */}
                                                            Design
                                                        </div>
                                                    </div>
                                                    <div className='catCourseName'>{data?.course_name}</div>
                                                    <div className='catChapCount'>{data?.chapter_count} Chapters</div>

                                                </div>
                                            )
                                        })}
                                    </div>
                                </>
                            )
                            }
                        </div>

                        <div className='headingDistance'>
                            <div className='headingText'>
                                <div className='choiceYourCourse'>Top courses in {catOneName}</div>
                                <div className='seeAll'>See All</div>
                            </div>

                            <div className='categories'>
                                <div className='allCat'>
                                    {catOne?.map((data) => {
                                        const hours = Math.floor(data?.totalVideoLength / 3600);
                                        const seconds = Math.floor(data?.totalVideoLength % 3600 / 60);
                                        const minutes = Math.floor(data?.totalVideoLength % 3600 % 60);

                                        return (
                                            <div className='course'
                                                onClick={() => {
                                                    dispatch(addId(data?.course_id));
                                                    navigate("/overview");
                                                }}
                                            >
                                                <div className='imageCat'>
                                                    <img src={data?.courseThumbnail} alt="image" className='imgSize' />

                                                </div>
                                                <div className='catCourseName'>{data?.course_name}</div>
                                                <div className='catDetails'>
                                                    <div className='catChapCount'>{data?.chapter_count} Chapters</div>
                                                    <div className='catDetailsTime'>
                                                        <img src={clock} alt="image" className='clockImage' />

                                                        {hours > 0 ? (<div className='totalTime'>{hours}:{minutes}:{seconds}</div>) : (<div className='totalTime'>{minutes}:{seconds}</div>)}
                                                    </div>
                                                </div>

                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>


                        <div className='headingDistance'>
                            <div className='headingText'>
                                <div className='choiceYourCourse'>Top courses in {catTwoName}</div>
                                <div className='seeAll'>See All</div>
                            </div>
                            <div className='categories'>
                                <div className='allCat'>
                                    {catTwo?.map((data) => {
                                        const hours = Math.floor(data?.totalVideoLength / 3600);
                                        const seconds = Math.floor(data?.totalVideoLength % 3600 / 60);
                                        const minutes = Math.floor(data?.totalVideoLength % 3600 % 60);

                                        return (
                                            <div className='course'
                                                onClick={() => {
                                                    dispatch(addId(data?.course_id));
                                                    navigate("/overview");
                                                }}
                                            >
                                                <div className='imageCat'>
                                                    <img src={data?.courseThumbnail} alt="image" className='imgSize' />

                                                </div>
                                                <div className='catCourseName'>{data?.course_name}</div>
                                                <div className='catDetails'>
                                                    <div className='catChapCount'>{data?.chapter_count} Chapters</div>
                                                    <div className='catDetailsTime'>
                                                        <img src={clock} alt="image" className='clockImage' />

                                                        {hours > 0 ? (<div className='totalTime'>{hours}:{minutes}:{seconds}</div>) : (<div className='totalTime'>{minutes}:{seconds}</div>)}
                                                    </div>
                                                </div>

                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage
