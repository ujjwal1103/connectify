import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, setPost } from "../redux/services/postSlice";
import { deleteThisPost } from "./services/postServices";
import SinglePost from "../common/SinglePost";
import { Heart } from "../icons";

const Post = ({ post }) => {
  const [showPost, setShowPost] = useState(false);
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  const deleteCurrentPost = async (e, postId) => {
    e.stopPropagation();
    const res = await deleteThisPost(postId);
    if (res) dispatch(deletePost(postId));
  };

  const handleSetPost = () => {
    showCurrentPost();
    dispatch(setPost(post));
  };

  const showCurrentPost = () => {
    setShowPost((prev) => !prev);
    // document.body.classList.toggle("overflow-hidden");
  };

  return (
    <div key={post._id} className="mx-auto  h-80  ">
      <div
        className="group relative h-full  bg-gray-700 rounded-xl"
        onClick={handleSetPost}
      >
        <img
          src={post.imageUrl}
          alt=""
          srcset=""
          width={400}
          className="object-cover h-full rounded-md"
        />
        <div className="group-hover:flex hidden absolute rounded-md top-0 w-full h-full  group-hover:bg-black group-hover:bg-opacity-30  justify-center items-center">
          <span onClick={(e) => deleteCurrentPost(e, post._id)}>
            {/* <span> */}
            <Heart size={44} color="white" />
          </span>
        </div>
      </div>
      {showPost && (
        <SinglePost setClose={showCurrentPost} post={post} posts={posts} fromFeed={false}/>
      )}
    </div>
  );
};

export default Post;
