import React, { useState, useEffect } from 'react'
import "./completed.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addId } from "../../slive/courseSlice";


const Completed = () => {
    const [comCourse, setComCourse] = useState()

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        axios
            .get(
                `https://app-virtuallearning-230106135903.azurewebsites.net/user/completed-courses`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('auth')}`,
                    },
                }
            )
            .then((res) => {
                console.log(res);
                setComCourse(res?.data);
                // console.log(comCourse)
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);
    // console.log(ongoingCourse)
    return (
        <div className='ongoingMargin-com'>
            {comCourse && comCourse.length === 0 ?
             <div className='noCourse'> No completed courses
             </div>
             :
                (
                    <>
                        <div className='ongoingItems-com'>
                            {comCourse?.map((data) => {
                                return (
                                    <div className='ongoingItem-com' onClick={() =>{
                                        dispatch(addId(data?.course_id));
                                    navigate("/overview");

                                    }}>
                                        <img src={data?.course_image} alt="" className='thumbnail-com' />
                                        <div className='ongoing thumbnailText-com'>Completed</div>
                                        <div className='videoNames thumbnailText-com'>{data?.course_name}</div>
                                        {/* <div className='chapCount thumbnailText-com'>{data?.completed_chapter_count}/{data?.chapter_count} Chapters</div> */}
                                        <button className='continue-com' type='button'>View certificate</button>
                                    </div>

                                );
                            })}
                        </div>
                    </>
                )
            
                }
        </div>
    )
}

export default Completed