import {IconButton, ListItemText, MenuItem, Select, SelectChangeEvent, Stack, Tooltip} from "@mui/material";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import GifOutlinedIcon from "@mui/icons-material/GifOutlined";
import React, {FC, RefObject} from "react";
import {v4 as uuid} from "uuid";
import {fileObj} from "@/interfaces/NewPostInput";

interface newPostToolsPropsType {
    attachmentInputRef: RefObject<HTMLInputElement>,
    setUploadArr: (oldFileObj: (pre: fileObj[]) => fileObj[]) => void,
    setIsAddingLink: (state: boolean) => void,
    setIsAddingVideo: (state: boolean) => void,
    setIsAddingGif: (state: boolean) => void,
    setPostCategory: (state: string) => void,
    setIsAddingPoll: (state: boolean) => void,
    setIsAddingEmoji: (state: boolean) => void,
    postCategory: string,
}
const NewPostTools: FC<newPostToolsPropsType> = (props) => {
    const {
        attachmentInputRef,
        setUploadArr,
        setIsAddingLink,
        setIsAddingVideo,
        setIsAddingGif,
        setPostCategory,
        setIsAddingPoll,
        setIsAddingEmoji,
        postCategory,
    } = props;

    const handleAttachmentClick = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
        e.preventDefault();
        if (attachmentInputRef.current) {
            attachmentInputRef.current.click();
        }
    }

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const filesArr = e.target.files;
        if (!filesArr || filesArr.length === 0) {
            return;
        }
        const temp: fileObj = {
            type: 'attachment',
            fileId: uuid(),
            uploadState: 'uploading',
            data: filesArr[0],
        }
        setUploadArr((pre) => {
            const tempUploadArr = [...pre];
            tempUploadArr.push(temp);
            return tempUploadArr;
        })
        // setUploadArr([...uploadArr, temp]);
    };

    const handleInputFileClick = (e: React.MouseEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        target.value = "";
    };

    const handleAddLinkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsAddingLink(true);
    }

    const handleAddVideoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsAddingVideo(true)
    }

    const handleAddGifClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsAddingGif(true)
    }

    const handleCategoryChange = (e: SelectChangeEvent<string>) => {
        setPostCategory(e.target.value)
    }

    const handleAddPollClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsAddingPoll(true);
    }

    const handleAddEmojiClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsAddingEmoji(true)
    }

    return (
        <div>
            <Stack direction="row" spacing={1}>
                <Tooltip
                    title="Add attachment"
                    placement="top"
                    arrow
                >
                    <div>
                        <IconButton
                            onClick={e => handleAttachmentClick(e)}
                        >
                            <AttachFileOutlinedIcon/>
                        </IconButton>
                        <input
                            ref={attachmentInputRef}
                            onClick={(e) => handleInputFileClick(e)}
                            onChange={handleFileUpload}
                            style={{display: 'none'}}
                            type="file"
                        />
                    </div>
                </Tooltip>

                <Tooltip
                    title="Add link"
                    placement="top"
                    arrow
                >
                    <IconButton
                        onClick={e => handleAddLinkClick(e)}
                    >
                        <InsertLinkOutlinedIcon/>
                    </IconButton>
                </Tooltip>

                <Tooltip
                    title="Add YouTube"
                    placement="top"
                    arrow
                >
                    <IconButton
                        onClick={e => handleAddVideoClick(e)}
                    >
                        <SubscriptionsOutlinedIcon/>
                    </IconButton>

                </Tooltip>
                <Tooltip
                    title="Add Poll"
                    placement="top"
                    arrow
                >
                    <IconButton
                        onClick={e => handleAddPollClick(e)}
                    >
                        <PollOutlinedIcon/>
                    </IconButton>

                </Tooltip>
                <Tooltip
                    title="Add emoji"
                    placement="top"
                    arrow
                >
                    <IconButton
                        onClick={e => handleAddEmojiClick(e)}
                    >
                        <EmojiEmotionsOutlinedIcon/>
                    </IconButton>

                </Tooltip>
                <Tooltip
                    title="Add gif"
                    placement="top"
                    arrow
                >
                    <IconButton
                        onClick={e => handleAddGifClick(e)}
                    >
                        <GifOutlinedIcon/>
                    </IconButton>
                </Tooltip>

                <div>
                    <Select
                        value={postCategory}
                        onChange={(e) => handleCategoryChange(e)}
                        displayEmpty
                        renderValue={(selected) => (
                            <span>{selected || 'Select a Category'}</span>
                        )}
                        sx={{
                            '.MuiOutlinedInput-notchedOutline': { border: 0 },
                            height:'40px',
                            fontWeight: 'bold',
                            fontSize: '14px',
                        }}
                    >
                        <MenuItem value="General Discussion">
                            <ListItemText
                                primary="General discussion"
                                secondary="Discuss anything here"
                            />
                        </MenuItem>
                        <br/>
                        <MenuItem value="Test Category">
                            <ListItemText
                                primary="Test Categoty"
                                secondary="This category is only added for testing purpose"
                            />
                        </MenuItem>
                    </Select>
                </div>
            </Stack>
        </div>
    )
}

export default NewPostTools;