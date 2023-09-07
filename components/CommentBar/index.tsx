import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import GifIcon from '@mui/icons-material/Gif';

export default function CommentBar() {
    return (
        <div>
            <Stack direction="row" spacing={2}>
                <Avatar
                    sx={{
                        width: 40,
                        height: 40,
                    }}
                >
                    {/* Image to show current login user */}
                    <img
                        src={""}
                        alt='Profile Picture'
                        style={{
                            maxWidth: "100%",
                        }}
                    />
                </Avatar>
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%", height: "40px", borderRadius: "8px", bgcolor: "#F8F7F5"}}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Your Comment"
                        inputProps={{ 'aria-label': 'write down your post comment' }}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <InsertLinkIcon />
                    </IconButton>
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <YouTubeIcon />
                    </IconButton>
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <InsertEmoticonIcon />
                    </IconButton>
                    <IconButton sx={{ p: '10px' }} aria-label="directions">
                        <GifIcon />
                    </IconButton>
                </Paper>
            </Stack>
        </div>
    );
}
