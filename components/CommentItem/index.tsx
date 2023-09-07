import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Comment from "../Comments/comment";
import { CommentType } from "../Comments/comment";
import { useState } from 'react';
interface CommentItemProps {
    comment: CommentType;
    profileImg: string;
}

export default function CommentItem({ profileImg, comment }: CommentItemProps) {
    const [isFold, setIsFold] = useState<Boolean>(true);

    if (!comment.replies) return <Comment key={comment.id} comment={comment} profileImg='' />

    return (
        <>
            <Comment key={comment.id} comment={comment} profileImg='' />
            <Box sx={{ marginLeft: '58px' }}>
                <Stack spacing={2}>
                    {comment.replies.map((reply, index) => {
                        if (isFold && index >= 2) return
                        else return <Comment key={reply.id} comment={reply} profileImg='' />
                    })}
                    {(isFold && comment.replies.length > 2) ? (<Stack direction="row" spacing={3} sx={{ cursor: "pointer" }} onClick={() => setIsFold(false)}>
                        <svg width="13" height="13" viewBox="0 0 40 40" fill="#909090" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: "100%", maxHeight: "100%" }}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M7.39287 13.3229L5.12462 2.07623C4.88105 0.868542 3.81985 0 2.58785 0C1.15862 0 0 1.15862 0 2.58785V16.3444C0 21.1247 3.87523 24.9999 8.65557 24.9999H22.3268C22.7712 24.9999 23.1757 25.0985 23.5294 25.2702V30.9129C23.4425 31.2801 23.4425 31.6634 23.5294 32.0305V40L40 22.5L23.5294 5.00003V12.9562C23.4374 13.3332 23.4373 13.728 23.5294 14.1047V18.9163C23.1153 19.1494 22.6165 19.2624 22.0638 19.1946L12.4648 18.0183C9.93937 17.7088 7.89588 15.817 7.39287 13.3229Z">
                            </path>
                        </svg>
                        <p>View {comment.replies.length - 2} more replies</p>
                    </Stack>) : null}
                </Stack>
            </Box>

        </>
    )
}