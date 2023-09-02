import Button from "@mui/material/Button";
import {TextField} from "@mui/material";
import {IconButton} from "@mui/material";
import {v4 as uuid} from "uuid";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import styles from './style.module.css'
import {FC} from "react";
import {pollOptionsArrType} from "@/interfaces/NewPostInput";

interface addPollPropsType {
    pollOptions: pollOptionsArrType,
    setPollOptions: (newPollOptions: pollOptionsArrType) => void,
    setIsAddingPoll: (state: boolean) => void,
}
const AddPoll:FC<addPollPropsType> = ({pollOptions, setPollOptions, setIsAddingPoll}) => {
    const handleAddOption = () => {
        const newPollOption = {
            optionId: uuid(),
            content: '',
        }
        const tempPollOptions = pollOptions;
        tempPollOptions.push(newPollOption);
        setPollOptions([...tempPollOptions])
    }

    const handleOptionCancelButtonClick = (e: React.MouseEvent<HTMLButtonElement>, optionId: string) => {
        e.preventDefault();
        let tempPollOptions = [...pollOptions];
        tempPollOptions = tempPollOptions.filter(option => option.optionId !== optionId)
        setPollOptions([...tempPollOptions])
    }

    const handleOptionInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        const newOptionContent = e.target.value;
        let tempOptions = [...pollOptions];
        tempOptions[index].content = newOptionContent;
        setPollOptions([...tempOptions])
    }

    const handleRemoveClick = () => {
        setIsAddingPoll(false);
    }

    return (
        <div className={styles.pollContainer}>
            <div className={styles.pollTitleContainer}>
                <p>Poll</p>
                <Button
                    onClick={handleRemoveClick}
                    size='small'
                    color='info'
                >
                    Remove
                </Button>
            </div>

            <>
                {pollOptions.map((option, index) => (
                    <div
                        key={option.optionId}
                        className={styles.pollOptionContainer}
                    >
                        <TextField
                            type='text'
                            fullWidth={true}
                            placeholder={`Option ${index + 1}`}
                            value={option.content}
                            onChange={(e) => handleOptionInput(e, index)}
                        />
                        {pollOptions.length > 2 ? (
                            <IconButton
                                className={styles.pollOptionDeleteButton}
                                onClick={(e) => handleOptionCancelButtonClick(e, option.optionId)}
                            >
                                <CloseOutlinedIcon />
                            </IconButton>
                        ) : (<div></div>)}
                    </div>
                ))}
            </>

            <div>
                <Button
                    variant="outlined"
                    onClick={handleAddOption}
                    className={styles.pollAddOptionButton}
                >ADD OPTION</Button>
            </div>
        </div>
    )
}

export default AddPoll;