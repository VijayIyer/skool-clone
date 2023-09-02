import {TextField} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material";
import Button from "@mui/material/Button";
import {FC, useEffect, useState} from "react";
import styles from './style.module.css'

interface addPopUpContainerPropsType {
    title: string,
    subTitle?: string,
    inputLabel: string,
    defaultValue: string,
    handleCancelClick: () => void,
    handleErrorMessage: (inputValue: string) => (string | void),
    handleLinkClick: (inputValue: string) => (string | void),
}

const theme = createTheme({
    palette: {
        "linkColor": {main: "#F8D481"},
        "textColor": {main: '#202124'},
        'cancelColor': {main: "#909090"},
    }
});

const AddPopUpContainer: FC<addPopUpContainerPropsType> = ({title, subTitle="", inputLabel, defaultValue, handleCancelClick, handleErrorMessage, handleLinkClick}) => {
    const [inputValue, setInputValue] = useState(defaultValue);
    const [errorMessage, setErrorMessage] = useState('');

    const handleLinkInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(e.target.value)
    }

    const handleLinkButtonClick = () => {
        const errMessage = handleErrorMessage(inputValue);
        if (errMessage) {
            setErrorMessage(errMessage)
        } else {
            handleLinkClick(inputValue)
            handleCancelClick()
        }
    }

    const handleCancelButtonClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        handleCancelClick()
    }

    useEffect(() => {
        setInputValue(defaultValue)
    }, [defaultValue])

    return (
        <div className={styles.addLinkPopUpContainer}>
            <ThemeProvider theme={theme}>
                <h2>{title}</h2>
                {subTitle && (<p>{subTitle}</p>)}
                <TextField
                    label={inputLabel}
                    variant="outlined"
                    color='textColor'
                    value={inputValue}
                    fullWidth={true}
                    className={styles.addLinkInputContainer}
                    onChange={e => handleLinkInput(e)}
                />
                {errorMessage? (<p className={styles.addLinkErrorMessage}>{errorMessage}</p>) : null}
                <div className={styles.addLinkButtonGroup}>
                    <Button
                        color='cancelColor'
                        onClick={e => handleCancelButtonClick(e)}
                    >
                        <b>CANCEL</b>
                    </Button>
                    <Button
                        color='linkColor'
                        variant='contained'
                        onClick={handleLinkButtonClick}
                    >
                        <b>LINK</b>
                    </Button>
                </div>
            </ThemeProvider>

        </div>
    )
}

export default AddPopUpContainer