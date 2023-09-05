import styles from './index.module.css'
import {IconButton, InputAdornment, OutlinedInput} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import React, {FC, useEffect} from "react";
import {v4 as uuid} from "uuid";
import {fileObj, gifDataType} from "@/interfaces/NewPostInput";
import axios from "axios";
import useDebounce from "@/hooks/useDebounce";

interface gifPickerPropsType {
    gifData: gifDataType,
    setGifData: (gifData: gifDataType) => void,
    gifSearchData: string,
    setGifSearchData: (data: string) => void,
    setUploadArr: (oldFileObj: (pre: fileObj[]) => fileObj[]) => void,
    setIsAddingGif: (state: boolean) => void,
}

const GifPicker: FC<gifPickerPropsType> = (props) => {
    const {
        gifData,
        setGifData,
        gifSearchData,
        setGifSearchData,
        setUploadArr,
        setIsAddingGif,
    } = props;

    const debouncedValue = useDebounce(gifSearchData, 1000);

    const handleGifContainerScroll = async (e: React.SyntheticEvent<HTMLDivElement>) => {
        const container = e.target as HTMLDivElement;
        if (container.scrollHeight - container.scrollTop === container.clientHeight) {
            const {type, gifArr, offset} = gifData;
            if (type === 'trending') {
                const newGifArr = await fetchGif(offset);
                gifArr.push(...newGifArr);
                const gifData = {
                    type,
                    gifArr,
                    offset: gifArr.length,
                }
                setGifData(gifData)
            } else if (type === 'search') {
                const newGifArr = await updateGifData(offset);
                gifArr.push(...newGifArr);
                const gifData = {
                    type,
                    gifArr,
                    offset: gifArr.length,
                }
                setGifData(gifData)
            }
        }
    }

    const handleGifSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGifSearchData(e.target.value)
    }

    const handleGifSearchDelete = async () => {
        const gifArr = await fetchGif();
        const gifData = {
            type: 'trending',
            gifArr,
            offset: gifArr.length,
        }
        setGifData(gifData);
        setGifSearchData("")
    }

    const handleGifClick = (imgURL: string) => {
        const temp: fileObj = {
            type: 'attachment',
            fileId: uuid(),
            uploadState: 'preview',
            data: imgURL,
        }
        setUploadArr((pre) => {
            const tempUploadArr = [...pre];
            tempUploadArr.push(temp);
            return tempUploadArr;
        });
        setIsAddingGif(false)
    }

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

    const updateGifData = (async (offset=0) => {
        const gifs = await axios.get("https://api.giphy.com/v1/gifs/search", {
            params: {
                api_key: "5WMUoVsYYfFB50mgB7BpF4YPuC8MQVHz",
                q: debouncedValue,
                offset,
                limit: 20,
            }
        })
        return gifs.data.data
    })

    useEffect(() => {
        const fetchUpdatedGifData = async () => {
            if (debouncedValue.trim() !== '') {
                const gifArr = await updateGifData();
                const gifData = {
                    type: 'search',
                    gifArr,
                    offset: gifArr.length,
                }
                setGifData(gifData)
            } else {
                const gifArr = await fetchGif();
                const gifData = {
                    type: 'trending',
                    gifArr,
                    offset: gifArr.length,
                }
                setGifData(gifData);
            }

        }

        fetchUpdatedGifData();
    }, [debouncedValue])

    return (
        <div
            data-testid="gif-image-container"
            className={styles.gifPickerContainer}
            onScroll={(e) => handleGifContainerScroll(e)}
        >
            <div className={styles.gifSearchContainer}>
                <OutlinedInput
                    data-testid="gif-search-input"
                    value={gifSearchData}
                    onChange={handleGifSearchInput}
                    sx={{
                        borderColor: "#909090"
                    }}
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    }
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                onClick={handleGifSearchDelete}
                            >
                                <CloseOutlinedIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </div>
            <div data-testid="gif-images">
                {gifData.gifArr.map((el, index) => {
                    if (index % 2 === 0) {
                        return (<div key={el.id} className={styles.gifContainer}>
                            <img onClick={() => handleGifClick(el.images.fixed_height.url)} src={el.images.fixed_height.url} />
                            {gifData.gifArr[index + 1] && <img onClick={() => handleGifClick(gifData.gifArr[index + 1].images.fixed_height.url)} src={gifData.gifArr[index + 1].images.fixed_height.url} />}
                        </div>)
                    }
                })}
            </div>
        </div>
    )
}

export default GifPicker;