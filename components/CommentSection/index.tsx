import CommentList from "../CommentList";
import styles from "./CommentSection.module.css";

interface CommentProps {
    user: object,
    content: string,
    time: string,
    replies: object
}

interface CommentSectionProps {
    comments: CommentProps[]
}

export default function CommentSection() {
    return (
        <div className={styles.commentSection}>
            <CommentList/>
            {/* {comments.map(comment => {
                return (
                    <Comment />
                )
            })} */}
            <div className={styles.replyBar}></div>
        </div>
    )
}