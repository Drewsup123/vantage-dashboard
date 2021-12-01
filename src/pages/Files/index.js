import React from 'react';
//? Chonky Imports
import { FullFileBrowser } from 'chonky';
import { ChonkyActions } from 'chonky';
//? Firebase Imports
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../Firebase';

//? File Data type
// id: string; // (Required) String that uniquely identifies the file
// name: string; // (Required) Full name, e.g. `MyImage.jpg`
// ext?: string; // File extension, e.g. `.jpg`
// isDir?: boolean; // Is a directory, default: false
// isHidden?: boolean; // Is a hidden file, default: false
// isSymlink?: boolean; // Is a symlink, default: false
// isEncrypted?: boolean; // Is encrypted in some way, default: false
// openable?: boolean; // Can be opened, default: true
// selectable?: boolean; // Can be selected, default: true
// draggable?: boolean; // Can be dragged, default: true
// droppable?: boolean; // Can have files dropped into it, default: true for folders
// size?: number; // File size in bytes
// modDate?: Date | string; // Last change date (or its string representation)
// childrenCount?: number; // Number of files inside of a folder (only for folders)
// // Default preview overriding
// color?: string; // Color to use for this file
// icon?: ChonkyIconName | string | any; // Icon to use for this file
// thumbnailUrl?: string; // Automatically load thumbnail from this URL
// [property: string]: any; // Any other user-defined property

const Files = () => {

    const files = [
        { id: 'lht', name: 'Projects', isDir: true, childrenCount: 1, color: 'blue' },
        null,
        {
            id: 'mcd',
            name: 'rafal olbinski ambrella',
            ext: 'jpg',
            isHidden: false,
            openable: true,
            isSymlink:false,
            selectable: true,
            size: 1024,
            modDate: Date('December 17, 1995 03:24:00'),
            thumbnailUrl: 'https://static.wixstatic.com/media/2f9864_47b60a2645a345fc8e31d011cce466ef~mv2_d_1216_1575_s_2.jpg',
        },
        {
        "rootFolderId":"qwerty123456",
        "fileMap":{
            "qwerty123456":{
            "id":"qwerty123456",
            "name":"Chonky Demo",
            "isDir":true,
            "childrenIds":[
                "e598a85f843c",
                "b53aa057fad1",
                "b6667221f24b",
                "002705459ca4",
                "a9fd7c8a04db",
                "549c1f93247a",
                "zFe",
                "zJr",
                "zHy",
                "vCt"
            ],
            "childrenCount":6},
            "e598a85f843c":{
                "id":"e598a85f843c",
                "name":"Chonky Source Code",
                "isDir":true,
                "modDate":"2020-10-24T17:48:39.866Z",
                "childrenIds":[
                "9514a3d74d57",
                "ed918037b975",
                "c21e08daf308",
                "0729af954fe6",
                "a1361e98e01d",
                "12dd195bb146",
                "f9b3b8472664",
                "998c5fed54dc",
                "e6b2e6181d54",
                "24c33e69f0f1",
                "a3a6f4860f0a",
                "b4344ec9eb06",
                "0b05bc983fd9"
                ],
                "childrenCount":13,
                "parentId":"qwerty123456"
            }
            }
        }
    ];

    const folderChain = [
        { id: 'xcv', name: 'Folder 1', isDir: true },
    ];

    const chonky_actions = [ 
        ChonkyActions.UploadFiles,
        ChonkyActions.DeleteFiles,
        ChonkyActions.CreateFolder,
        ChonkyActions.CopyFiles,
        ChonkyActions.ChangeSelection,
        ChonkyActions.ClearSelection,
        ChonkyActions.DownloadFiles,
        ChonkyActions.EnableListView,
        ChonkyActions.FocusSearchInput,
        ChonkyActions.KeyboardClickFile,
        ChonkyActions.MouseClickFile,
    ];

    const handleAction = (data) => {
        console.log('File action data:', data);
        //console.log("ChonkyActions");
        //console.log(ChonkyActions);

         if (data.id === ChonkyActions.OpenFiles.id) {
            console.log("open files");
        } else if (data.id === ChonkyActions.DeleteFiles.id) {
            // Delete the files
            console.log("delete files");
        }
        else if (data.id === ChonkyActions.UploadFiles.id) {
            console.log("upload files");
        }
    };

    const testFirebase = async (e) => {
        e.preventDefault();
        try{
            const docRef = await addDoc(
                collection(db, "users"),
                {
                    first: "testAdd",
                    last: "TestAdding",
                    number: 123,
                    array: ["Hello", 12],
                    object: { key1: 1, key2: "Hello" }
                }
            );
            console.log("DocRef: ", docRef);
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className="grid">
            <div className="col-12">
                <h1>Files</h1>
                <button className="btn" onClick={testFirebase}>Test Firebase</button>
                <FullFileBrowser 
                    files={files} 
                    fileActions={chonky_actions}
                    onFileAction={handleAction} 
                    folderChain={folderChain} 
                />
            </div>
        </div>
    );
}

export default Files;