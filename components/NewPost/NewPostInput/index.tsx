import {Avatar, Card, CardContent, CardHeader, CircularProgress, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import React, {FC, useEffect, useRef, useState} from "react";
import {v4 as uuid} from "uuid";
import dynamic from "next/dynamic";
import axios from "axios";

import styles from './style.module.css';
import FileUploadPreview from "../FileUploadPreview";
import AddPopUpContainer from "../AddPopUpContainer";
import AddPoll from "../AddPoll";
import NewPostTools from "@/components/NewPost/NewPostTools";
import GifPicker from "../GifPicker";

import {fileObj, gifDataType, pollOptionsArrType, postDataType} from "@/interfaces/NewPostInput";
import FileUploadContainer from "../FileUploadContainer";
import TextEditor, {TextEditorRef} from "@/components/TextEditor";
import {useAddLink} from "@/components/TextEditor/hooks";

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
    const { isAddLinkDisabled, addLink } = useAddLink("post-editor");

    const [onEditing, setOnEditing] = useState(false);
    const [isAddingLink, setIsAddingLink] = useState(false);
    const [isAddingPoll, setIsAddingPoll] = useState(false);
    const [isAddingVideo, setIsAddingVideo] = useState(false);
    const [isAddingEmoji, setIsAddingEmoji] = useState(false);
    const [isAddingGif, setIsAddingGif] = useState(false);

    const editorRef = useRef<TextEditorRef | null>(null);

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

    const handleAddLinkLinkClick = (linkAddress: string) => {
        console.log(linkAddress);
        addLink(linkAddress)
    }

    // @ts-ignore
    const handleEmojiClick = (emojiObj) => {
        if (editorRef.current) {
            editorRef.current.insertEmoji(emojiObj.unified);
            editorRef.current.focus();
            setIsAddingEmoji(false);
        }
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

    const handlePostButtonClick = () => {
        if (newPostTitle && newPostContent && postCategory) {
            const data: postDataType = {
                category: "",
                comments: [],
                content: "",
                likes: [],
                title: "",
                user_id: "",
                user_name: ""
            }
            data.title = newPostTitle;
            data.content = JSON.stringify(newPostContent);
            data.category = postCategory;
            data.user_name = localStorage.getItem('user_name');
            data.user_id = localStorage.getItem('ObjectID');

            for (const pollOption of pollOptions) {
                if (pollOption.content) {
                    if (!data.poll) {
                        data.poll = [
                            {
                                option: pollOption.content,
                                votes: [],
                            }
                        ]
                    } else {
                        data.poll.push({
                            option: pollOption.content,
                            votes: [],
                        })
                    }
                }
            }

            if (uploadArr.length > 0) {
                for (const uploadElement of uploadArr) {
                    if (!data.attachments) {
                        data.attachments = [
                            {
                                id: uploadElement.fileId,
                                fileName: "",
                                fileType: uploadElement.type,
                                url: uploadElement.data as string,
                            }
                        ]
                    } else {
                        data.attachments.push({
                            id: uploadElement.fileId,
                            fileName: "",
                            fileType: uploadElement.type,
                            url: uploadElement.data as string,
                        })
                    }
                }
            }
            setNewPostTitle('');
            setNewPostContent('');
            setUploadArr([]);
            setPollOptions(optionArr);
            setPostCategory('');
            setGifData({});
            setGifSearchData('');
            setOnEditing(false);
        } else {
            alert("Please enter title, content and category.")
        }
    }

    useEffect(() => {
        const fetchGifData = async () => {
            if (isAddingGif && !!gifData) {
                const gifArr = await fetchGif();
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
                                    <strong> NextJS</strong>
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
                            <div className={styles.postTextEditor}>
                                <TextEditor
                                    id="post-editor"
                                    placeholder="Write Something..."
                                    ariaLabel="add post"
                                    ref={editorRef}
                                />

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
                                <FileUploadContainer>
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
                                            attachment={true}
                                            link={true}
                                            video={true}
                                            poll={true}
                                            emoji={true}
                                            gif={true}
                                            select={true}
                                            isAddLinkDisabled={isAddLinkDisabled}
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
                                            data-testid="cancel-button"
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
                                                data-testid="post-button"
                                                onClick={handlePostButtonClick}
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
                                        onEmojiClick={handleEmojiClick}
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
                    data-testid='post-default'
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