import {IconButton, ListItemText, MenuItem, Select, SelectChangeEvent, Stack, Tooltip} from "@mui/material";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import GifOutlinedIcon from "@mui/icons-material/GifOutlined";
import React, {FC, useRef} from "react";
import {v4 as uuid} from "uuid";
import {fileObj} from "@/interfaces/NewPostInput";

interface newPostToolsPropsType {
    attachment?: boolean,
    link?: boolean,
    video?: boolean,
    poll?: boolean,
    emoji?: boolean,
    gif?: boolean,
    select?: boolean,
    setUploadArr?: (oldFileObj: (pre: fileObj[]) => fileObj[]) => void,
    setIsAddingLink?: (state: boolean) => void,
    setIsAddingVideo?: (state: boolean) => void,
    setIsAddingGif?: (state: boolean) => void,
    setPostCategory?: (state: string) => void,
    setIsAddingPoll?: (state: boolean) => void,
    setIsAddingEmoji?: (state: boolean) => void,
    postCategory?: string,
}
const NewPostTools: FC<newPostToolsPropsType> = (props) => {
    const attachmentInputRef = useRef<HTMLInputElement | null>(null);

    const {
        attachment = false,
        link = false,
        video = false,
        poll = false,
        emoji = false,
        gif = false,
        select = false,
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
        if (setUploadArr) {
            setUploadArr((pre) => {
                const tempUploadArr = [...pre];
                tempUploadArr.push(temp);
                return tempUploadArr;
            })
        }
    };

    const handleInputFileClick = (e: React.MouseEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        target.value = "";
    };

    const handleAddLinkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (setIsAddingLink) {
            setIsAddingLink(true);
        }
    }

    const handleAddVideoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (setIsAddingVideo) {
            setIsAddingVideo(true)
        }
    }

    const handleAddGifClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (setIsAddingGif) {
            setIsAddingGif(true)
        }
    }

    const handleCategoryChange = (e: SelectChangeEvent<string>) => {
        if (setPostCategory) {
            setPostCategory(e.target.value)
        }
    }

    const handleAddPollClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (setIsAddingPoll) {
            setIsAddingPoll(true);
        }
    }

    const handleAddEmojiClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (setIsAddingEmoji) {
            setIsAddingEmoji(true)
        }
    }

    return (
        <div>
            <Stack direction="row" spacing={1}>
                {attachment && (
                    <Tooltip
                        title="Add attachment"
                        placement="top"
                        arrow
                    >
                        <div>
                            <IconButton
                                data-testid='add-attachment-icon-button'
                                onClick={e => handleAttachmentClick(e)}
                            >
                                <AttachFileOutlinedIcon/>
                            </IconButton>
                            <input
                                data-testid="file-input"
                                ref={attachmentInputRef}
                                onClick={(e) => handleInputFileClick(e)}
                                onChange={handleFileUpload}
                                style={{display: 'none'}}
                                type="file"
                            />
                        </div>
                    </Tooltip>
                )}

                {link && (
                    <Tooltip
                        title="Add link"
                        placement="top"
                        arrow
                    >
                        <IconButton
                            data-testid='add-link-icon-button'
                            onClick={e => handleAddLinkClick(e)}
                        >
                            <InsertLinkOutlinedIcon/>
                        </IconButton>
                    </Tooltip>
                )}

                {video && (
                    <Tooltip
                        title="Add Video"
                        placement="top"
                        arrow
                    >
                        <IconButton
                            data-testid='add-video-icon-button'
                            onClick={e => handleAddVideoClick(e)}
                        >
                            <SubscriptionsOutlinedIcon/>
                        </IconButton>

                    </Tooltip>
                )}

                {poll && (
                    <Tooltip
                        title="Add Poll"
                        placement="top"
                        arrow
                    >
                        <IconButton
                            data-testid='add-poll-icon-button'
                            onClick={e => handleAddPollClick(e)}
                        >
                            <PollOutlinedIcon/>
                        </IconButton>

                    </Tooltip>
                )}

                {emoji && (
                    <Tooltip
                        title="Add emoji"
                        placement="top"
                        arrow
                    >
                        <IconButton
                            data-testid='add-emoji-icon-button'
                            onClick={e => handleAddEmojiClick(e)}
                        >
                            <EmojiEmotionsOutlinedIcon/>
                        </IconButton>

                    </Tooltip>
                )}

                {gif && (
                    <Tooltip
                        title="Add gif"
                        placement="top"
                        arrow
                    >
                        <IconButton
                            data-testid='add-gif-icon-button'
                            onClick={e => handleAddGifClick(e)}
                        >
                            <GifOutlinedIcon/>
                        </IconButton>
                    </Tooltip>
                )}

                {select && (
                    <div>
                        <Select
                            value={postCategory}
                            onChange={(e) => handleCategoryChange(e)}
                            displayEmpty
                            renderValue={(selected) => (
                                <span data-testid="select-category">{selected || 'Select a Category'}</span>
                            )}
                            sx={{
                                '.MuiOutlinedInput-notchedOutline': { border: 0 },
                                height:'40px',
                                fontWeight: 'bold',
                                fontSize: '14px',
                            }}
                        >
                            <MenuItem value="General Discussion" data-testid='category-option'>
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
                )}


            </Stack>
        </div>
    )
}

export default NewPostTools;