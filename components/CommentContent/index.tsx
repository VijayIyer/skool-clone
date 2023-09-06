import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';

export default function CommentContent() {
    return (
        <Box sx={{ width: '100%' }}>
            <Stack>
                <Stack direction="row" spacing={2}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <Card sx={{ margin: "8px 13px" }}>
                        <CardHeader
                            action={
                            <IconButton aria-label="edit comment">
                                <MoreHorizIcon />
                            </IconButton>
                            }
                            title="Shrimp and Chorizo Paella"
                            subheader="September 14, 2016"
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                            This impressive paella is a perfect party dish and a fun meal to cook
                            together with your guests. Add 1 cup of frozen peas along with the mussels,
                            if you like.
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="like this comment">
                                <ThumbUpOutlinedIcon />
                            </IconButton>
                            <span>{}</span>
                            <Button>Reply</Button>
                        </CardActions>
                    </Card>
                    {/* <Stack direction="row">
                        <IconButton aria-label="like">
                            <ThumbUpOutlinedIcon />
                        </IconButton>
                        <span>{}</span>
                    </Stack>
                    <Button>Reply</Button> */}
                </Stack>
            </Stack>
        </Box>
    )
}