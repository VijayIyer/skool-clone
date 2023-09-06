import { CommentType } from "./comment";
import { Box } from "@mui/material";
import Comment from "./comment";
interface CommentListProps {
  comments: Array<CommentType>;
}
export default function CommentList({ comments }: CommentListProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {comments.map((comment: CommentType) => (
        <Comment key={comment.id} comment={comment} profileImg='' />
      ))}
    </Box>
  );
}
