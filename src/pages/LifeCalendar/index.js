import React from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { TimelineDemo } from '../TimelineDemo';

const LifeCalendar = () => {
    return (
        <div className="grid">
            <div className="col-12">
                <TabMenu model={
                    [
                        {label: 'Calendar', icon: 'pi pi-fw pi-calendar'},
                        {label: 'Timeline', icon: 'pi pi-fw pi-home'},
                    ]
                } />
                <TimelineDemo />
            </div>
        </div>
    );
}

export default LifeCalendar;