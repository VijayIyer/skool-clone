import styles from "./index.module.css"
import {CircularProgress, IconButton} from "@mui/material";
import Image from "next/image";
import React, {FC, useEffect, useRef, useState} from "react";
import { v4 as uuid } from 'uuid';
import {fileObj} from "@/interfaces/NewPostInput";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export interface FileUploadPreviewProps {
    fileObj?: fileObj;
    setUploadArr: (oldFileObj: (pre: fileObj[]) => fileObj[]) => void,
    setIsShowingDetail?: (fileObj: fileObj) => void,
}

const defaultFileObj = {
    type: 'attachment',
    fileId: uuid(),
    uploadState: 'selection',
    data: null,
}

const FileUploadPreview: FC<FileUploadPreviewProps> = ({setIsShowingDetail, setUploadArr, fileObj=defaultFileObj}) => {
    const {type, fileId, uploadState, data} = fileObj;
    const [imageFile, setImageFile] = useState(data);

    const attachmentInputRef = useRef<HTMLInputElement | null>(null);

    const handleAttachmentClick = () => {
        if (attachmentInputRef.current) {
            attachmentInputRef.current.click();
        }
    }

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const filesArr = e.target.files;
        if (filesArr?.length === 0) {
            return
        }
        const file = filesArr?.[0];
        if (!file || !validateFile(file)) {
            return
        }
        const temp: fileObj = {
            type,
            fileId: uuid(),
            uploadState: 'uploading',
            data: file,
        }
        setUploadArr(pre => {
            const tempUploadArr = [...pre];
            tempUploadArr.push(temp)
            return [...tempUploadArr]
        })
    }

    const handleInputFileClick = (e: React.MouseEvent<HTMLInputElement>) => {
        const { target } = e;
        if (target instanceof HTMLInputElement) {
            target.value = "";
        }
    };

    const handleFileRead = () => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setTimeout(() => {
                if (e.target !== null ) {
                    const result = e.target.result;
                    const tempFileObj: fileObj = {
                        type,
                        fileId,
                        uploadState: 'preview',
                        data: result as string,
                    }
                    setUploadArr(pre => {
                        const tempUploadArr = [...pre];
                        const indexToReplace = tempUploadArr.findIndex(fileObj => fileObj.fileId === fileId);
                        if (indexToReplace !== -1) {
                            tempUploadArr[indexToReplace] = tempFileObj;
                        }
                        return tempUploadArr
                    })
                    setImageFile(result as string);
                }

            }, 1000)
        };
        reader.readAsDataURL(imageFile as File)
    }


    /**
     * the image data should be gotten from the backend server,
     * fetch fileObj.data is doesn't work because of CORS.
     **/
    const handleYouTubeImgFetch = () => {
        const tempFileObj: fileObj = {
            type,
            fileId,
            uploadState: 'preview',
            data: fileObj.data,
        }
        setUploadArr(pre => {
            const tempUploadArr = [...pre];
            const indexToReplace = tempUploadArr.findIndex(fileObj => fileObj.fileId === fileId);
            if (indexToReplace !== -1) {
                tempUploadArr[indexToReplace] = tempFileObj;
            }
            return tempUploadArr;
        })
        setImageFile(tempFileObj.data)
    }

    const validateFile = (file: File) => {
        const legalExts = ['.jpg', '.jpeg', '.bmp', '.webp', '.gif', '.png'];
        if (!file) {
            return
        }
        const name = file.name.toLowerCase();
        if (!legalExts.some(ext => name.endsWith(ext))) {
            alert('Wrong file format');
            return false;
        }
        return true;
    }

    const handleFileDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setUploadArr(pre => {
            let tempUploadArr = [...pre];
            tempUploadArr = tempUploadArr.filter(fileObj => fileObj.fileId !== fileId);
            return [...tempUploadArr]
        })
    }

    useEffect(() => {
        if (fileObj.uploadState === 'uploading' && fileObj.type === 'attachment') {
            handleFileRead()
        } else if (fileObj.uploadState === 'uploading' && fileObj.type === 'video') {
            handleYouTubeImgFetch()
        }
    }, [fileObj])

    return (
        <div className={(type === 'video') ? styles.uploadVideoDiv : styles.uploadItemDiv}>
            {(uploadState === 'selection') && (
                <div
                    data-testid='new-attachment-div'
                    className={styles.uploadSelectIconDiv}
                    onClick={handleAttachmentClick}
                >
                    <span>+</span>
                    <input
                        data-testid="preview-input-file"
                        ref={attachmentInputRef}
                        onChange={handleFileUpload}
                        onClick={(e) => handleInputFileClick(e)}
                        style={{display: 'none'}}
                        type="file"
                    />
                </div>
            )}
            {uploadState === 'uploading'? (
                <div className={styles.uploadProgressDiv}>
                    <CircularProgress />
                </div>
            ):null}
            {uploadState === 'preview'? (
                <div className={styles.uploadResult}>
                    <IconButton
                        data-testid='preview-full-screen-button'
                        onClick={() => setIsShowingDetail ? setIsShowingDetail(fileObj as fileObj) : null}
                        className={styles.detailIconButton}
                    >
                        <SearchIcon />
                    </IconButton>
                    <IconButton
                        data-testid='preview-delete-button'
                        onClick={e => handleFileDelete(e)}
                        className={styles.deleteIconButton}
                    >
                        <ClearIcon />
                    </IconButton>
                    {imageFile && (type === 'video') && (
                        <>
                            <Image src={imageFile as string} width={367} height={210} style={{objectFit: "cover"}} alt="uploaded image" />
                            <div className={styles.videoStartIcon}>
                                <PlayArrowIcon style={{fontSize: '70px', color: 'white'}} />
                            </div>

                        </>

                    )}
                    {imageFile && ((type === 'attachment') || (type === 'gif')) && (
                        <Image src={imageFile as string} width={210} height={210} style={{objectFit: "cover"}} alt="uploaded image" />
                    )}
                </div>
            ):null}
        </div>
    )
}

export default FileUploadPreview