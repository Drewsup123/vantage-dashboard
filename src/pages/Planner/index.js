import React from 'react';
import ReactGridLayout, { WidthProvider } from 'react-grid-layout';
import "react-grid-layout/css/styles.css";
import RichTextExample from './RichTextExample';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { SplitButton } from 'primereact/splitbutton';
import { InputText } from 'primereact/inputtext';

const GridLayout = WidthProvider(ReactGridLayout);

export const Planner = () => {

    const defaultLayout = [
        {
            h: 4,
            i: "textarea",
            isBounded: undefined,
            isDraggable: undefined,
            isResizable: undefined,
            maxH: undefined,
            maxW: undefined,
            minH: undefined,
            minW: undefined,
            moved: false,
            resizeHandles: undefined,
            static: false,
            w: 11,
            x: 0,
            y: 0
        },
        {
            h: 4,
            i: "moodtracker",
            isBounded: undefined,
            isDraggable: undefined,
            isResizable: undefined,
            maxH: undefined,
            maxW: undefined,
            minH: undefined,
            minW: undefined,
            moved: false,
            resizeHandles: undefined,
            static: false,
            w: 4,
            x: 0,
            y: 4
        },
        {
            h: 4,
            i: "quote",
            isBounded: undefined,
            isDraggable: undefined,
            isResizable: undefined,
            maxH: undefined,
            maxW: undefined,
            minH: undefined,
            minW: undefined,
            moved: false,
            resizeHandles: undefined,
            static: false,
            w: 6,
            x: 5,
            y: 4
        },
    ];

    const handleLayoutChange = (newLayout) => {
        console.log("New Layout: ", newLayout);
    }

    return (
        <div className="grid">
            <div className="col-12">
                <h1>Planner</h1>
                <Toolbar 
                    left={() => (
                    <React.Fragment>
                        <Button label="New" icon="pi pi-plus" className="p-mr-2" />
                        <Button label="Upload" icon="pi pi-upload" className="p-button-success" />
                        {/* <i className="pi pi-bars p-toolbar-separator p-mr-2" />
                        <SplitButton label="Save" icon="pi pi-check" model={[]} className="p-button-warning"></SplitButton> */}
                    </React.Fragment>
                    )}
                    right={() => (
                        <React.Fragment>
                            {/* <Button icon="pi pi-search" className="p-mr-2" /> */}
                            <span className="p-input-icon-left">
                                <i className="pi pi-search" />
                                <InputText placeholder="Search" />
                            </span>
                            <Button icon="pi pi-calendar" className="p-button-success p-mr-2" />
                            {/* <Button icon="pi pi-times" className="p-button-danger" /> */}
                        </React.Fragment>
                    )}
                />
                <GridLayout
                    cols={24}
                    // style={this.props.tableOpen ? {height: "30%"} : {height: "calc(100% - 45px)"}}
                    className="dashboard-grid w-100 d-flex justify-content-between"
                    layout={defaultLayout}
                    onLayoutChange={handleLayoutChange}
                    // rowHeight={(window.innerHeight - 135)/12} // 135
                    rowHeight={50}
                    margin={[10, 10]}
                    autoSize={false}
                    // onResizeStop={this.handleResizeChange}
                >
                    <div key="textarea" className="card">
                        <RichTextExample />
                    </div>
                    <div key="moodtracker" className="card">
                        MT
                    </div>
                    <div key="quote" className="card">
                        Q
                    </div>
                </GridLayout>
            </div>
        </div>
    );
}

export default Planner;