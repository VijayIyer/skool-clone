import { CommentType } from "./comment";
import { Box } from "@mui/material";
import CommentItem from "../CommentItem";
import CommentBar from "../CommentBar";
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
        width: "791px",
        padding: "8px 32px"
      }}
    >
      {comments.map((comment: CommentType) => (
        <CommentItem key={comment.id} comment={comment} profileImg='' />
      ))}
      <CommentBar/>
    </Box>
  );
}
