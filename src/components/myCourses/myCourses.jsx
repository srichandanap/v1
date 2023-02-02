import React, { useState } from 'react'
import "./myCourses.css"
import NavBar from '../navBar/navBar'
import Ongoing from '../ongoing/ongoing'
import Completed from '../completed/completed'

const MyCourses = () => {
    const [tabState, setTabState] = useState(1)
    return (
        <div>
            <NavBar />
            <div className='myCourseMargin'>
                <div>
                    <div className='myCourseText'>My Course</div>
                </div>
                <div className='tabs'>
                    <div className={tabState === 1 ? 'tabClassTwo' : 'tabClassOne'}
                        onClick={() => { setTabState(1) }}>
                        Ongoing
                    </div>
                    <div className={tabState === 2 ? 'tabClassTwo' : 'tabClassOne'} onClick={() => { setTabState(2) }}>
                        Completed
                    </div>
                </div>
                <div>
                    {tabState === 1 ? <Ongoing /> : <Completed />}
                   
                </div>
            </div>
        </div>
    )
}

export default MyCourses