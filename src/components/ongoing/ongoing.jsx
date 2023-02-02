import React, { useState, useEffect } from 'react'
import "./ongoing.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { addId } from "../../slive/courseSlice";
import { useDispatch } from "react-redux";

const Ongoing = () => {
    const [ongoingCourse, setOngoingCourse] = useState()
    const navigate = useNavigate();
    const dispatch = useDispatch();

    console.log( sessionStorage.getItem("auth"));


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
                setOngoingCourse(res);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);
    
    return (
        <div className='ongoingMargin'>
            <div className='ongoingItems'>
                {ongoingCourse?.data?.map((data) => {
                    return (
                        <div className='ongoingItem'  onClick={() => {
                            dispatch(addId(data?.course_id));
                            // console.log("clicked")
                            navigate("/overview");
                          }}
                        >
                            <img src={data?.course_image} alt="" className='thumbnail' />
                            <div className='ongoing thumbnailTextOn'>Ongoing</div>
                            <div className='videoName thumbnailTextOn'>{data?.course_name}</div>
                            <div className='chapCount thumbnailTextOn'>{data?.completed_chapter_count}/{data?.chapter_count} Chapters</div>
                            <button className='continue'>Continue</button>
                        </div>
                        
                    );
                })}
            </div>
        </div>
    )
}

export default Ongoing