import React from 'react';
import ReactLifeTimeline from 'react-life-timeline'

let myBirthday = new Date("02/06/2000");

export const EmptyPage = () => {

    return (
        <div className="grid">
            <div className="col-12">
            <h1>Life by Weeks</h1>
            {/* <ReactLifeTimeline
                birthday={myBirthday}
            /> */}
            </div>
        </div>
    );
}
