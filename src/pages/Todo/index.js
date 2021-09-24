import React from 'react';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';

const Todo = () => {
    const menu2 = React.createRef();

    const lists = {
        today: [
            {
                isComplete: true,
                message: "Go Grocery Shopping"
            },
            {
                isComplete: false,
                message: "Fix tire on the car"
            },
        ],
        yesterday:[ 
            {
                isComplete: false,
                message: "Go Grocery Shopping"
            },
            {
                isComplete: true,
                message: "Fix tire on the car"
            },
        ]
        ,
    }

    return (
    <div className="card">
        <div className="flex align-items-center justify-content-between mb-4">
            <h5>Todo List: </h5>
            <div>
                <Button type="button" icon="pi pi-ellipsis-v" className="p-button-rounded p-button-text p-button-plain" onClick={(event) => menu2.current.toggle(event)}/>
                <Menu ref={menu2} popup model={[{label: 'Add New', icon: 'pi pi-fw pi-plus'}, {label: 'Remove', icon: 'pi pi-fw pi-minus'}]}/>
            </div>
        </div>

        <span className="block text-600 font-medium mb-3">TODAY</span>
        <ul className="p-0 mx-0 mt-0 mb-4 list-none">
            {
                lists.today.map((todoItem) => (
                    <li className="flex align-items-center py-2 border-bottom-1 surface-border">
                        <div className={`w-3rem h-3rem flex align-items-center justify-content-center ${todoItem.isComplete ? "bg-blue-100" : "bg-pink-100"} border-circle mr-3 flex-shrink-0`}>
                            <i className={`pi ${todoItem.isComplete ? "pi-check text-blue-500" : "pi-circle-off text-pink-500"} text-xl`}/>
                        </div>
                        <span className="text-900 line-height-3">{todoItem.message}</span>
                    </li>
                ))
            }
        </ul>

        <span className="block text-600 font-medium mb-3">YESTERDAY</span>
        <ul className="p-0 m-0 list-none">
            {
                lists.yesterday.map((todoItem) => (
                    <li className="flex align-items-center py-2 border-bottom-1 surface-border">
                        <div className={`w-3rem h-3rem flex align-items-center justify-content-center ${todoItem.isComplete ? "bg-blue-100" : "bg-pink-100"} border-circle mr-3 flex-shrink-0`}>
                            <i className={`pi ${todoItem.isComplete ? "pi-check text-blue-500" : "pi-circle-off text-pink-500"} text-xl`}/>
                        </div>
                        <span className="text-900 line-height-3">{todoItem.message}</span>
                    </li>
                ))
            }
        </ul>
    </div>
    );
}

export default Todo;