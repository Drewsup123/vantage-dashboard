import React from 'react';
//? Chonky Imports
import { FullFileBrowser } from 'chonky';
import { ChonkyActions } from 'chonky';
//? Firebase Imports
import { collection, addDoc, setDoc, doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FileUpload } from 'primereact/fileupload';
import { FileUploader } from "react-drag-drop-files";
import { Dialog } from 'primereact/dialog';
import { db } from '../../Firebase';
//? Redux Imports
import { getUserFiles, addFolder, moveFile } from '../../store/files/actions';
import { connect } from 'react-redux';
import './index.css'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import toBase64String from '../../helpers/toBase64String';

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

const Files = (props) => {
    const { uid, moveFile } = props;
    const [importFilesOpen, setImportFilesOpen] = React.useState(false);
    const [createFolderOpen, setCreateFolderOpen] = React.useState(false);
    const [newFolderName, setNewFolderName] = React.useState("");
    const [file, setFile] = React.useState(null);
    const [renderedFiles, setRenderedFiles] = React.useState([]);
    const [folderChain, setFolderChain] = React.useState([{ id: 'Home', name: 'Home', isDir: true, }])

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
            "childrenCount":6
        },
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
        {
            id: "custom_id",
            requiresSelection: true,
            hotkeys: ["ctrl+g"],
            button: {
                name: "Custom Action",
                toolbar: true,
                contextMenu: true,
                group: "Actions",
                icon: <i className="material-icons">add</i>
            }
        }
    ];

    const handleAction = (data) => {
        console.log('File action data:', data);
        //console.log("ChonkyActions");
        //console.log(ChonkyActions);
        if (data.id === ChonkyActions.OpenFiles.id) {
            console.log("open files");
            handleOpenFile(data.payload)
        } 
        else if(data.id === "move_files"){
            handleMoveFile(data.payload);
        }
        else if(data.id === "mouse_click_file"){
            
        }
        else if (data.id === ChonkyActions.DeleteFiles.id) {
            // Delete the files
            console.log("delete files");
        }
        else if(data.id === ChonkyActions.CreateFolder.id){
            //? Add a file to current directory
            setCreateFolderOpen(true);
        }
        else if (data.id === ChonkyActions.UploadFiles.id) {
            console.log("upload files");
            setImportFilesOpen(true);
        }
    };

    const handleOpenFile = (payload) => {
        //? SAMPLE PAYLOAD DATA
        // {
        //     "targetFile": {
        //         "id": "M6WuVwYKH4CqqmuKbtMK",
        //         "name": "First_Test",
        //         "ext": "",
        //         "isHidden": false,
        //         "openable": true,
        //         "isSymlink": false,
        //         "selectable": true,
        //         "modDate": 1638556792984,
        //         "parentId": "Home",
        //         "childrenCount": 0,
        //         "childrenIds": [],
        //         "isDir": true
        //     },
        //     "files": [
        //         {
        //             "id": "M6WuVwYKH4CqqmuKbtMK",
        //             "name": "First_Test",
        //             "ext": "",
        //             "isHidden": false,
        //             "openable": true,
        //             "isSymlink": false,
        //             "selectable": true,
        //             "modDate": 1638556792984,
        //             "parentId": "Home",
        //             "childrenCount": 0,
        //             "childrenIds": [],
        //             "isDir": true
        //         }
        //     ]
        // }
        //? Checking if file is directory
        if(payload.targetFile.isDir){
            let updatedFolderChain = [...folderChain];
            console.log("Current Folder Chain: ", updatedFolderChain);
            const currentFolder = updatedFolderChain[updatedFolderChain.length - 1];
            //? Checking if user clicked child of current folder
            console.log("Current Folder: ", currentFolder);
            if(currentFolder.childrenIds?.includes(payload.targetFile.id) || currentFolder.id === "Home"){
                updatedFolderChain.push(payload.targetFile);
            }else{ //? User Clicked a folder on the task bar
                const chainIndex = updatedFolderChain.findIndex(folder => folder.id === payload.targetFile.id);
                updatedFolderChain.splice(chainIndex + 1, updatedFolderChain.length - 1 - chainIndex);
                console.log("Folder Chain on Menu Click: ", updatedFolderChain);
            }
            setFolderChain(updatedFolderChain);
        }else{ //? Target is not a folder -> Proceed with opening file

        }
    }

    const handleMoveFile = (payload) => {
        //? SAMPLE MOVE FILES PAYLOAD
        // {
        //     "sourceInstanceId": "KpDP1YrAL",
        //     "source": {
        //         "id": "Home",
        //         "name": "Home",
        //         "isDir": true
        //     },
        //     "draggedFile": {
        //         "id": "4pHhZFkqiEICR8v9XqSd",
        //         "name": "depressedmofo.png",
        //         "ext": "",
        //         "isHidden": false,
        //         "openable": true,
        //         "isSymlink": false,
        //         "selectable": true,
        //         "size": 11014,
        //         "modDate": 1638490265184,
        //         "thumbnailUrl": "https://firebasestorage.googleapis.com/v0/b/vantage-7e009.appspot.com/o/files-6Z5vx3PllLPgFjDKYqDGrR4mcW22%2Fdepressedmofo.png?alt=media&token=cb3d406b-bbdb-4ba9-ae2e-1ed47dfc7974",
        //         "parentId": "",
        //         "childrenCount": 0,
        //         "childrenIds": []
        //     },
        //     "selectedFiles": [],
        //     "destination": {
        //         "id": "M6WuVwYKH4CqqmuKbtMK",
        //         "name": "First_Test",
        //         "ext": "",
        //         "isHidden": false,
        //         "openable": true,
        //         "isSymlink": false,
        //         "selectable": true,
        //         "modDate": 1638556792984,
        //         "parentId": "",
        //         "childrenCount": 0,
        //         "childrenIds": [],
        //         "isDir": true
        //     },
        //     "copy": false,
        //     "files": [
        //         {
        //             "id": "4pHhZFkqiEICR8v9XqSd",
        //             "name": "depressedmofo.png",
        //             "ext": "",
        //             "isHidden": false,
        //             "openable": true,
        //             "isSymlink": false,
        //             "selectable": true,
        //             "size": 11014,
        //             "modDate": 1638490265184,
        //             "thumbnailUrl": "https://firebasestorage.googleapis.com/v0/b/vantage-7e009.appspot.com/o/files-6Z5vx3PllLPgFjDKYqDGrR4mcW22%2Fdepressedmofo.png?alt=media&token=cb3d406b-bbdb-4ba9-ae2e-1ed47dfc7974",
        //             "parentId": "",
        //             "childrenCount": 0,
        //             "childrenIds": []
        //         }
        //     ]
        // }
        let { destination, draggedFile } = payload;
        console.log(payload);
        const filesCopy = [...renderedFiles];
        const destinationIndex = filesCopy.findIndex(file => file.id === destination.id);
        const fileIndex = filesCopy.findIndex(file => file.id === draggedFile.id);
        if(destinationIndex !== -1 && fileIndex !== -1){
            const destinationCopy = {...filesCopy[destinationIndex]};
            console.log("Destination Copy: ", destinationCopy);
            //? Adding file index to directories children
            filesCopy[destinationIndex] = {
                ...destinationCopy,
                childrenCount: destinationCopy.childrenCount + 1,
                childrenIds: [...destinationCopy.childrenIds, draggedFile.id]
            };
            //? Modifiying parentId of file itself
            console.log(fileIndex, filesCopy);
            const fileCopy = {...filesCopy[fileIndex]};
            console.log("File Copy: ", fileCopy);
            filesCopy[fileIndex] = {
                ...fileCopy,
                parentId: destinationCopy.id
            }
            console.log("Set File Copy: ", filesCopy[fileIndex]);
            //? Setting Rendered Files
            console.log("Setting Rendered Files: ", filesCopy);
            moveFile(filesCopy[fileIndex], filesCopy[destinationIndex]);
            // setRenderedFiles(filesCopy);
        }else{
            //! Error message here
        }
    }

    const handleFileImport = (file) => {
        console.log("File Selected: ", file);
        setFile(file);
    }

    const saveImportedFile = async () => {
        //? Creating storage ref to save the file
        const storage = getStorage();
        const storageRef = ref(storage, `files-${uid}/${file.name}`);
        console.log("File to upload: ", file);
        uploadBytes(storageRef, file).then(async (snapshot) => {
            //? File successfully saved to firebase now create a document in the files collection 
            console.log("Uploaded File to Storage! -> ", snapshot);
            getDownloadURL(snapshot.ref).then(async (url) => {
                console.log("Download Url: ", url);
                let newFileRef = doc(collection(db, "files"));
                console.log(newFileRef);
                console.log(newFileRef.id);
                // let thumb = await toBase64String(file);
                // console.log("Thumbnail Generated: ", thumb);
                const newFile = {
                    path: "",
                    id: newFileRef.id,
                    size: snapshot.metadata.size,
                    modifiedDate: Date.now(),
                    modifiedBy: uid,
                    createdDate: Date.now(),
                    createdBy: uid,
                    value: snapshot.metadata.fullPath,
                    thumbnail: url || "",
                    contentType: snapshot.metadata.contentType,
                    fileName: snapshot.metadata.name,
                    parentId: "",
                    isDir: false,
                    childrenIds: []
                };
                let docRef = await setDoc(newFileRef, newFile);
                console.log("Added Document! -> ", docRef, "New File -> ", newFile);
                //? Add this object to the files array
                //? Add file reference id to userData file array
                const userDataRef = doc(db, "userData", uid);
                await updateDoc(userDataRef, { files: arrayUnion(newFileRef.id) })
            });
        }).catch((err) => {
            console.log("Error: ", err);
        })
    }

    const createNewFolder = () => {
        if(newFolderName){
            props.addFolder(newFolderName);
        }
    }

    React.useEffect(() => {
        //? Setting Rendered Files
        let newlyRenderedFiles = props.files.map(file => {
            return {
                id: file.id,
                name: file.fileName,
                ext: "",
                isHidden: false,
                openable: true,
                isSymlink: false,
                selectable: true,
                size: file.size,
                modDate: file.modifiedDate,
                thumbnailUrl: file.thumbnail,
                parentId: file.parentId ? file.parentId : "Home",
                childrenCount: file.childrenIds?.length || 0,
                childrenIds: file.childrenIds || [],
                isDir: file.isDir || false
            }
        });
        console.log("Rendered Files: ", newlyRenderedFiles);
        setRenderedFiles(newlyRenderedFiles);
    }, [props.files])

    React.useEffect(() => {
        props.getUserFiles();
    }, [])

    const testFirebase = async (e) => {
        e.preventDefault();
        try{
            console.log(
            db.collection("files")
            // .collection(uid)
            // .doc(uid)
            )
            // await setDoc(
            //     doc(db, "files", uid),
            //     [
            //         {
            //             name: "test"
            //         }
            //     ]
            // )
            // let DOC = await getDoc(doc(db, "files", uid));
            // console.log("DOC: ", DOC);
            // console.log("Doc Data: ", DOC.data());
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
                    files={renderedFiles.filter(file => folderChain[folderChain.length - 1].id === file.parentId)} 
                    fileActions={chonky_actions}
                    onFileAction={handleAction} 
                    folderChain={folderChain} 
                    rootFolderId="Home"
                />
                {/* Create Folder Dialog */}
                <Dialog 
                    header="Create Folder"
                    visible={createFolderOpen}
                    id="create_folder_dialog"
                    position="right"
                    resizable
                    draggable
                    keepInViewport
                    modal
                    className="upload-file-dialog"
                    onHide={() => setCreateFolderOpen(false)}
                >
                    <InputText value={newFolderName} onChange={e => { e.preventDefault(); setNewFolderName(e.target.value); }} />
                    {newFolderName && <Button onClick={createNewFolder}>Save Folder</Button>}
                </Dialog>
                {/* Import Files Dialog} */}
                <Dialog 
                    header="Import Files"
                    visible={importFilesOpen}
                    id="import_files_dialog"
                    position="right"
                    resizable
                    draggable
                    keepInViewport
                    modal
                    minY={0}
                    className="upload-file-dialog"
                    onHide={() => setImportFilesOpen(false)}
                >
                    <FileUploader handleChange={handleFileImport} name="file_import" type={[ "PDF", "PNG", "GIF", "TXT", "DOC" ]} classes="upload_file_drop_area" />
                    <p>{file ? `File name: ${file.name}` : "no files uploaded yet"}</p>
                    {file && <Button onClick={saveImportedFile}>Import</Button>}
                </Dialog>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    uid: state.User.uid,
    username: state.User.username,
    files: state.Files.files
})

export default connect(mapStateToProps, { getUserFiles, addFolder, moveFile })(Files);