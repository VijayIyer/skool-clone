import styles from './index.module.css';
import {FC, ReactNode, useEffect, useRef, useState} from "react";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {IconButton} from "@mui/material";

interface FileUploadContainerProps {
    children: ReactNode
}

type GetTotalChildrenWidth = () => number;

const FileUploadContainer: FC<FileUploadContainerProps> = ({children}) => {
    const [scrollPosition, setScrollPosition] = useState(0)

    const fileUploadContainerRef = useRef<HTMLDivElement | null>(null);

    const handleNextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (fileUploadContainerRef.current) {
            const containerWidth = fileUploadContainerRef.current.offsetWidth;
            const totalChildrenWidth = getTotalChildrenWidth();
            if ((scrollPosition + 215) > (totalChildrenWidth as number - containerWidth)) {
                setScrollPosition(totalChildrenWidth as number - containerWidth);
            } else {
                setScrollPosition(scrollPosition + 215)
            }
        }
    }

    const handlePreClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (scrollPosition - 215 <= 0) {
            setScrollPosition(0)
        } else {
            setScrollPosition(scrollPosition - 215)
        }
    }

    const getTotalChildrenWidth: GetTotalChildrenWidth = () => {
        if (fileUploadContainerRef.current) {
            const allChildren = fileUploadContainerRef.current.children;
            let totalChildrenWidth = 0;
            for (let i = 0; i < allChildren.length; i++) {
                const child = allChildren[i] as HTMLElement
                totalChildrenWidth += (child.offsetWidth + 5);
            }
            return totalChildrenWidth - 5;
        }
        return 0;
    }

    useEffect(() => {
        if (fileUploadContainerRef.current) {
            const containerWidth = fileUploadContainerRef.current.offsetWidth;
            const totalChildrenWidth = getTotalChildrenWidth() as number;
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

    return (
        <div className={styles.carouselPreviewContainer} data-testid="file-upload-preview-container">
            {(scrollPosition > 0) && (
                <div className={styles.leftIconContainer}>
                    <IconButton
                        data-testid='pre-icon-button'
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
                        data-testid='next-icon-button'
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