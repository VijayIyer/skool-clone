import styles from './index.module.css';
import {useEffect, useRef, useState} from "react";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {IconButton} from "@mui/material";

const FileUploadContainer = ({children}) => {
    const [scrollPosition, setScrollPosition] = useState(0)

    const fileUploadContainerRef = useRef(null);

    const handleNextClick = (e) => {
        e.preventDefault();
        const containerWidth = fileUploadContainerRef.current.offsetWidth;
        const totalChildrenWidth = getTotalChildrenWidth();
        if ((scrollPosition + 215) > (totalChildrenWidth - containerWidth)) {
            setScrollPosition(totalChildrenWidth - containerWidth);
        } else {
            setScrollPosition(scrollPosition + 215)
        }
    }

    const handlePreClick = (e) => {
        e.preventDefault();
        const containerWidth = fileUploadContainerRef.current.offsetWidth;
        if (scrollPosition - 215 <= 0) {
            setScrollPosition(0)
        } else {
            setScrollPosition(scrollPosition - 215)
        }
    }

    const getTotalChildrenWidth = () => {
        if (fileUploadContainerRef.current) {
            const allChildren = fileUploadContainerRef.current.children;
            let totalChildrenWidth = 0;
            for (let i = 0; i < allChildren.length; i++) {
                totalChildrenWidth += (allChildren[i].offsetWidth + 5);
            }
            return totalChildrenWidth - 5;
        }

    }

    useEffect(() => {
        if (fileUploadContainerRef.current) {
            const containerWidth = fileUploadContainerRef.current.offsetWidth;
            const totalChildrenWidth = getTotalChildrenWidth();
            if (totalChildrenWidth - containerWidth <= 0) {
                setScrollPosition(0)
            } else {
                setScrollPosition(totalChildrenWidth - containerWidth)
            }
        }

    }, [children])

    useEffect(() => {
        const container = fileUploadContainerRef.current;
        if (container) {
            container.scrollLeft = scrollPosition;
        }
    }, [scrollPosition]);


    console.log(fileUploadContainerRef);


    return (
        <div className={styles.carouselPreviewContainer}>
            {(scrollPosition > 0) && (
                <div className={styles.leftIconContainer}>
                    <IconButton
                        className={styles.iconButton}
                        onClick={e => handlePreClick(e)}
                    >
                        <KeyboardArrowLeftIcon/>
                    </IconButton>
                </div>
            )}
            <div ref={fileUploadContainerRef} className={styles.fileUploadContainer}>
                {children}
            </div>
            {fileUploadContainerRef.current && (scrollPosition < (getTotalChildrenWidth() - fileUploadContainerRef.current.offsetWidth)) && (
                <div className={styles.rightIconContainer}>
                    <IconButton
                        className={styles.iconButton}
                        onClick={e => handleNextClick(e)}
                    >
                        <KeyboardArrowRightIcon/>
                    </IconButton>
                </div>
            )}
        </div>
    )
};

export default FileUploadContainer;