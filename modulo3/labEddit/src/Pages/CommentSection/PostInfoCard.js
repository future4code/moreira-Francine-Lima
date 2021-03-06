import {
  PostContainer,
  BottomPostContainer,
  BottomPostContainerComment,
} from "./style";
import thumbUp from "../../assets/thumbs-up.png";
import thumbDown from "../../assets/thumbs-down.png";
import { usePutDownVote } from "../../Hooks/usePutDownVote";
import { usePostUpvote } from "../../Hooks/usePostUpvote";
import { useEffect } from "react";
import { useDeleteVote } from "../../Hooks/useDeleteVote";
import { useChangeVotes } from "../../Hooks/useChangeVotes";
function PostInfoCard(props) {
  //axios post Upvote
  const { onPostVote } = usePostUpvote(`/posts/${props.idPost}/votes`);
  //axios put downvote
  const { onDownvote } = usePutDownVote(`/posts/${props.idPost}/votes`);
  const deleteVote = useDeleteVote(`/posts/${props.idPost}/votes`);

  const { onDownVotes, onUpVotes } = useChangeVotes(
    deleteVote,
    onDownvote,
    onPostVote
  );

  useEffect(() => {
    props.getDataPosts();
  }, [onUpVotes, onDownVotes]);
  return (
    <PostContainer>
      <h4>{props.usernamePost}</h4>
      <p> {props.titlePost}</p>
      <article>{props.bodyPost}</article>
      <BottomPostContainer>
        <div>
          <img
            onClick={() => onUpVotes(props.idPost)}
            src={thumbUp}
            alt="voto positivo"
          />
          <p>{props.voteSumPost}</p>
          <img
            onClick={() => onDownVotes(props.idPost)}
            src={thumbDown}
            alt="voto negativo"
          />
        </div>
        <BottomPostContainerComment>
          <p>{props.commentCountPost ? props.commentCountPost : 0}</p>
          <p>Comentários</p>
        </BottomPostContainerComment>
      </BottomPostContainer>
    </PostContainer>
  );
}
export default PostInfoCard;
