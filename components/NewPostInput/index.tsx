import {Avatar, Card, CardContent, CardHeader, CircularProgress, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import React, {FC, useEffect, useRef, useState} from "react";
import {v4 as uuid} from "uuid";
import dynamic from "next/dynamic";
import axios from "axios";

import styles from './style.module.css';
import FileUploadPreview from "@/components/FileUploadPreview";
import AddPopUpContainer from "../AddPopUpContainer";
import AddPoll from "@/components/AddPoll";
import NewPostTools from "@/components/NewPostTools";
import GifPicker from "@/components/GifPicker";

import {fileObj, gifDataType, pollOptionsArrType} from "@/interfaces/NewPostInput";
import FileUploadContainer from "@/components/FileUploadContainer";

// const ReactQuill = dynamic(
//     async () => {
//         const { default: RQ } = await import("react-quill-2");
//         return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
//     },
//     {
//         ssr: false
//     }
// );

const EmojiPicker = dynamic(() => {
    return import('emoji-picker-react')
}, {ssr: false});

const optionArr = [
    {
        optionId: uuid(),
        content: '',
    },
    {
        optionId: uuid(),
        content: '',
    }
]

const NewPostInput: FC = () => {
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostContent, setNewPostContent] = useState('test');
    const [uploadArr, setUploadArr] = useState<fileObj[]>([]);
    const [pollOptions, setPollOptions] = useState<pollOptionsArrType>(optionArr);
    const [postCategory, setPostCategory] = useState('');
    const [gifData, setGifData] = useState<gifDataType | {}>({});
    const [gifSearchData, setGifSearchData] = useState('');

    const [onEditing, setOnEditing] = useState(false);
    const [isAddingLink, setIsAddingLink] = useState(false);
    const [isAddingPoll, setIsAddingPoll] = useState(false);
    const [isAddingVideo, setIsAddingVideo] = useState(false);
    const [isAddingEmoji, setIsAddingEmoji] = useState(false);
    const [isAddingGif, setIsAddingGif] = useState(false);

    const handleNewPostInputCardClick = () => {
        setOnEditing(true);
    }

    const handleNewPostTitleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewPostTitle(e.target.value)
    }

    // const handleNewPostContentChange = (newContent) => {
    //     console.log(newContent);
    //     setNewPostContent(newContent)
    // }
    //
    // const handleNewPostContentKeyPress = (e) => {
    //     if (e.code !== "Enter" && e.code !== "Space") return;
    //     autoLinkifyText();
    // };
    //
    // const autoLinkifyText = () => {
    //     console.log(newPostContent);
    //     const linkRegex = /((https?|ftp|smtp):\/\/)?(www\.)[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?/gi;
    //         const isLink = newPostContent.match(linkRegex);
    //         // console.log(isLink);
    //         // if (isLink) {
    //         //     const styledHtml = newPostContent.replace(linkRegex, (match) => {
    //         //         if (newPostContent.charAt(newPostContent.indexOf(match) + match.length + 2) !== 'a') {
    //         //             return `<p><a href="${match}" style="color: blue; text-decoration: underline;">${match}</a></p>`;
    //         //         }
    //         //     });
    //         //     // const editor = quillRef.current.getEditor();
    //         //     // const range = editor.getSelection();
    //         //     // const position = range ? range.index : 0;
    //         //     // return styledHtml
    //         //     // setNewPostContent(styledHtml);
    //         // }
    // }



    const handleBackgroundClick = () => {
        setIsAddingLink(false);
        setIsAddingVideo(false);
    };

    const fetchGif = async (offset=0) => {
        const gifs = await axios("https://api.giphy.com/v1/gifs/trending", {
            params: {
                api_key: "5WMUoVsYYfFB50mgB7BpF4YPuC8MQVHz",
                offset,
                limit: 20,
            }
        });
        return gifs.data.data;
    }

    const handleAddLinkErrorMessage = () => {
        return "";
    }

    const handleAddLinkLinkClick = () => {

    }

    const handleAddVideoErrorMessage = (inputValue : string) => {
        if (inputValue.indexOf('watch?') === -1) {
            return 'Please input valid URL'
        }
    }

    const handleAddVideoLinkClick = (inputValue : string) => {
        const regex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/;
        const videoLink = inputValue.match(regex)![6];
        const imgURL = `https://img.youtube.com/vi/${videoLink}/maxresdefault.jpg`
        const tempUploadArr = [...uploadArr];
        tempUploadArr.push({
            type: 'video',
            fileId: uuid(),
            uploadState: 'uploading',
            data: imgURL,
        })
        setUploadArr([...tempUploadArr])
    }

    const handleCancelButtonClick = () => {
        setOnEditing(false);
    }

    useEffect(() => {
        const fetchGifData = async () => {
            if (isAddingGif && !!gifData) {
                const gifArr = await fetchGif();
                console.log(typeof gifArr[0].images);
                const gifData = {
                    type: 'trending',
                    gifArr,
                    offset: gifArr.length,
                }
                setGifData(gifData);
            }
        }
        fetchGifData()
    }, [isAddingGif])

    return (
        <div>
            {onEditing ? (
                <Card className={styles.NewPostInputCardEditing} data-testid="new-post-input-onEditing">

                    {/**
                     * Username in title should get from the backend server
                     * Group name in title should get from the backend server
                     */}
                    <CardHeader
                        data-testid="new-post-card-header"
                        className={styles.NewPostInputCardHeaderEditing}
                        avatar={
                            <Avatar
                                alt="Avatar"
                                src="/2b_avatar.jpg"
                                sx={{width: 25, height: 25}}
                            />
                        }
                        title={
                            <Typography>
                                <span>
                                    <strong>Abc Acc </strong>
                                    posting in
                                    <strong>NextJS</strong>
                                </span>
                            </Typography>
                        }
                    />
                    <CardContent className={styles.NewPostInputCardContentEditing}>
                        <form>
                            <div>
                                <TextField
                                    type="text"
                                    fullWidth={true}
                                    placeholder="Title"
                                    value={newPostTitle}
                                    variant='standard'
                                    InputProps={{
                                        disableUnderline: true,
                                        style: {
                                            fontSize: '23px',
                                            fontWeight: 'bold',
                                            marginBottom: '8px',
                                        }
                                    }}
                                    onChange={e => handleNewPostTitleChange(e)}
                                />
                            </div>
                            <div className={`${styles['react-quill-container']}`}>
                                {/*<ReactQuill*/}
                                {/*    forwardedRef={quillRef}*/}
                                {/*    onChange={() => handleNewPostContentChange(newPostContent)}*/}
                                {/*    onKeyUp={handleNewPostContentKeyPress}*/}
                                {/*    modules={{toolbar: false,}}*/}
                                {/*    placeholder='Write something...'*/}
                                {/*    className={styles['quill-editor']}*/}
                                {/*    value={newPostContent}*/}
                                {/*/>*/}

                            </div>

                            {(isAddingLink || isAddingVideo) ? (
                                <>
                                    <div className={styles.addPopUpContainer}>
                                        {isAddingLink && (
                                            <AddPopUpContainer
                                                title='Add Link'
                                                inputLabel='Enter a URL'
                                                defaultValue=""
                                                handleCancelClick={handleBackgroundClick}
                                                handleErrorMessage={handleAddLinkErrorMessage}
                                                handleLinkClick={handleAddLinkLinkClick}
                                            />
                                        )}
                                        {isAddingVideo && (
                                            <AddPopUpContainer
                                                title='Add Video'
                                                subTitle='Add a YouTube link.'
                                                inputLabel='Link'
                                                defaultValue=""
                                                handleCancelClick={handleBackgroundClick}
                                                handleErrorMessage={handleAddVideoErrorMessage}
                                                handleLinkClick={handleAddVideoLinkClick}
                                            />
                                        )}
                                    </div>
                                    <div
                                        className={styles.addLinkPopUpContainerBackground}
                                        onClick={handleBackgroundClick}
                                    ></div>
                                </>
                            ) : null}

                            {isAddingPoll && (
                                <>
                                    <AddPoll
                                        pollOptions={pollOptions}
                                        setPollOptions={setPollOptions}
                                        setIsAddingPoll={setIsAddingPoll}
                                    />
                                </>
                            )}

                            {uploadArr.length > 0 ? (
                                <FileUploadContainer data-testid="file-upload-preview-container">
                                    {uploadArr.map(fileObj => (
                                        <FileUploadPreview
                                            key={fileObj.fileId}
                                            fileObj={fileObj}
                                            setUploadArr={setUploadArr}
                                        />
                                    ))}
                                    <FileUploadPreview
                                        setUploadArr={setUploadArr}
                                    />
                                </FileUploadContainer>
                            ) : null}

                            <div>
                                <div className={styles.postToolContainer}>
                                    <div className={styles.IconButtonGroup} data-testid="new-post-tools-container">
                                        <NewPostTools
                                            setUploadArr={setUploadArr}
                                            setIsAddingLink={setIsAddingLink}
                                            setIsAddingVideo={setIsAddingVideo}
                                            setIsAddingGif={setIsAddingGif}
                                            setPostCategory={setPostCategory}
                                            setIsAddingPoll={setIsAddingPoll}
                                            setIsAddingEmoji={setIsAddingEmoji}
                                            postCategory={postCategory}
                                        />
                                    </div>

                                    <div>
                                        <Button
                                            onClick={handleCancelButtonClick}
                                            sx={{
                                                fontSize: '16px',
                                                color: 'rgb(144, 144, 144)',
                                                fontWeight: 'bold',
                                                padding: '0 32px',
                                                ":hover": {
                                                    backgroundColor: 'transparent',
                                                    color: "#202124"
                                                }
                                            }}
                                        >
                                            CANCEL
                                        </Button>
                                        {(newPostContent && newPostTitle) ? (
                                            <Button
                                                sx={{
                                                    fontSize: '16px',
                                                    padding: '12px 24px',
                                                    boxSizing: 'border-box',
                                                    height: '40px',
                                                    fontWeight: 'bold',
                                                    backgroundColor: '#F8D481',
                                                    color: '#202124',
                                                    ":hover": {
                                                        backgroundColor: '#F1D07C',
                                                    }
                                                }}
                                            >
                                                POST
                                            </Button>
                                        ) : (
                                            <Button
                                                disabled
                                                variant="contained"
                                                sx={{
                                                    fontSize: '16px',
                                                    padding: '12px 24px',
                                                    boxSizing: 'border-box',
                                                    height: '40px',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                POST
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </CardContent>

                    <div
                        className={styles.pickerContainer}
                    >
                        {isAddingEmoji && (
                            <>
                                <div
                                    className={styles.emojiPicker}
                                    data-testid="emoji-container"
                                >
                                    <EmojiPicker
                                        width={288}
                                        height={370}
                                        previewConfig={{showPreview: false}}
                                    />

                                </div>
                                <div onClick={() => setIsAddingEmoji(false)}
                                     className={styles.emojiPickerContainerBackground}>
                                </div>
                            </>
                        )}

                        {isAddingGif ? (
                            <>
                                <div
                                    className={styles.gifPicker}
                                    data-testid="gif-container"
                                >
                                    {("gifArr" in gifData && gifData.gifArr) ? (
                                        <GifPicker
                                            gifData={gifData}
                                            setGifData={setGifData}
                                            gifSearchData={gifSearchData}
                                            setGifSearchData={setGifSearchData}
                                            setUploadArr={setUploadArr}
                                            setIsAddingGif={setIsAddingGif}
                                        />
                                    ):(<div data-testid='gif-loading-container' className={styles.gifLoadingContainer}>
                                        <CircularProgress />
                                    </div>)}
                                </div>
                                <div onClick={() => setIsAddingGif(false)}
                                     className={styles.emojiPickerContainerBackground}>
                                </div>
                            </>
                        ) : null}
                    </div>

                </Card>
            ) : (
                <Card
                    className={styles.NewPostInputCardDefault}
                    onClick={handleNewPostInputCardClick}
                >

                    {/**
                     * Avatar img and alt should get from the backend server
                     */}
                    <CardHeader
                        className={styles.NewPostInputCardHeaderDefault}
                        avatar={
                            <Avatar
                                alt="Avatar"
                                src="/2b_avatar.jpg"
                                sx={{width: 40, height: 40}}
                            />
                        }
                        title="Write something"
                        titleTypographyProps={{fontSize: 20}}
                    />
                </Card>
            )}
        </div>
    )
}

export default NewPostInput;