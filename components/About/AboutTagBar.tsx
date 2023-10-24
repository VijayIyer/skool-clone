import { Stack } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import ProfileAvatar from "../ProfileAvatar";

interface TagBarProps {
    type: string,
    memberNum: number,
    creator: {
        fullName: string
    },
    paymentType: string
}

export default function TagBar({type, memberNum, paymentType, creator}: TagBarProps) {
    return (
        <Stack direction="row" spacing={4}>
            <Stack direction="row" spacing={2}>
                <LockOutlinedIcon/>
                <h4>{type} group</h4>
            </Stack>
            <Stack direction="row" spacing={2}>
                <PeopleOutlineIcon/>
                <h4>{memberNum} members</h4>
            </Stack>
            <Stack direction="row" spacing={2}>
                <SellOutlinedIcon/>
                <h4>{paymentType}</h4>
            </Stack>
            <Stack direction="row" spacing={2}>
                <ProfileAvatar/>
                <h4>By {creator.fullName}</h4>
            </Stack>
        </Stack>
    )
}