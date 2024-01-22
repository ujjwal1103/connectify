import { forwardRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, setPost } from "../../redux/services/postSlice";
import { deleteThisPost } from "../services/postServices";
import SinglePost from "../../common/SinglePost";
import {
  BookMark,
  BookMarkFill,
  Chat,
  Heart,
  HeartFill,
  OutlineMenuFold,
} from "../../icons";
import Modal from "../../shared/Modal";

const Post = ({ post },ref) => {
  const [showPost, setShowPost] = useState(false);
  const [menuOption, setMenuOption] = useState(false);
  const [isLiked, setIsLiked] = useState(post?.isLiked);
  const [isBookMarked, setIsBookMarked] = useState(false);
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  const deleteCurrentPost = async (postId) => {
    try {
      const res = await deleteThisPost(postId);
      if (res) dispatch(deletePost(postId));
    } catch (error) {
      console.log(error)
    }
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
    <div ref={ref && ref} className="relative group w-full h-[270px] flex items-center rounded shadow-xl justify-center">
      <img
        src={post.imageUrl}
        alt=""
        className="object-cover w-full h-full rounded group-hover:opacity-80"
        onClick={handleSetPost}
      />

      <div className="absolute w-12 h-12  right-0 top-0 rounded-b flex justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300">
        <div className="flex  justify-center items-center w-full ">
          <button onClick={() => setMenuOption(true)}>
            <OutlineMenuFold size={24} color="white" />
          </button>
        </div>
      </div>
      <div className="absolute w-full h-24 bg-gradient-to-b from-transparent to-neutral-950 bottom-0 rounded-b flex items-end opacity-0 group-hover:opacity-100 transition duration-300">
        <div className="flex gap-5 justify-center w-full py-3">
          {isLiked ? (
            <HeartFill
              size={24}
              color="red"
              onClick={() => setIsLiked(false)}
            />
          ) : (
            <Heart size={24} color="red" onClick={() => setIsLiked(true)} />
          )}
          <Chat size={24} color="" onClick={handleSetPost} />
          {isBookMarked ? (
            <BookMarkFill size={24} onClick={() => setIsBookMarked(false)} />
          ) : (
            <BookMark
              size={24}
              color=""
              onClick={() => setIsBookMarked(true)}
            />
          )}
        </div>
      </div>
      {showPost && (
        <Modal onClose={() => setShowPost(false)}>
          <SinglePost
            setClose={showCurrentPost}
            post={post}
            posts={posts}
            fromFeed={false}
          />
        </Modal>
      )}
      {menuOption && (
        <Modal onClose={() => setMenuOption(false)}>
          <ul className="w-96 p-2 rounded-xl bg-zinc-950 flex  flex-col gap-2">
            <li className="p-2 w-full font-bold bg-red-300 rounded-xl border-2 border-red-950 text-red-950">
              {post?._id}
            </li>
            <li className="p-2 w-full font-bold bg-red-300 rounded-xl border-2 border-red-950 text-red-950">
              <button onClick={() => deleteCurrentPost(post._id)}>
                Delete
              </button>
            </li>
          </ul>
        </Modal>
      )}
    </div>
  );
};

export default forwardRef(Post);
