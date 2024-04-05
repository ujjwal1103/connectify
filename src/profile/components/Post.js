import { forwardRef, memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, setPost } from "../../redux/services/postSlice";
import { deleteThisPost } from "../services/postServices";
import SinglePost from "../../common/SinglePost";
import { isMobile } from "react-device-detect";
import {
  BookMark,
  BookMarkFill,
  Chat,
  OutlineMenuFold,
} from "../../icons";
import Modal from "../../shared/Modal";
import { getCurrentUserId } from "../../utils/getCurrentUserId";
import { useNavigate } from "react-router-dom";
import { LikeButton } from "../../home/post/components/PostActions";

const Post = ({ post }, ref) => {
  const [showPost, setShowPost] = useState(false);
  const [menuOption, setMenuOption] = useState(false);
  const [isLiked, setIsLiked] = useState(post?.isLiked);
  const [isBookMarked, setIsBookMarked] = useState(false);
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const navigate = useNavigate();

  const deleteCurrentPost = async (postId) => {
    try {
      const res = await deleteThisPost(postId);
      if (res) dispatch(deletePost(postId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetPost = () => {
    showCurrentPost();
    dispatch(setPost(post));
  };

  const showCurrentPost = () => {
    if (isMobile) {
      navigate(`/p/${post._id}`);
    } else {
      setShowPost((prev) => !prev);
    }
  };

  return (
    <div
      ref={ref && ref}
      className="relative group w-full h-[270px] flex items-center rounded shadow-xl justify-center"
    >
      <ImageComponent
        src={post.imageUrl[0]}
        alt=""
        loaderClassName={`flex justify-center items-center bg-zinc-900 animate-pulse md:w-96 w-full h-full rounded `}
        className="object-cover w-full h-full rounded group-hover:opacity-80"
        onClick={handleSetPost}
      />

      {getCurrentUserId() === post.user._id && (
        <div className="absolute w-12 h-12  right-0 top-0 rounded-b flex justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300">
          <div className="flex  justify-center items-center w-full ">
            <button onClick={() => setMenuOption(true)}>
              <OutlineMenuFold size={24} color="white" />
            </button>
          </div>
        </div>
      )}
      <div className="absolute w-full h-24 bg-gradient-to-b from-transparent to-neutral-950 bottom-0 rounded-b flex items-end opacity-0 group-hover:opacity-100 transition duration-300">
        <div className="flex gap-5 justify-center w-full py-3">
        <LikeButton
          isLiked={isLiked}
          id={post?._id}
          onLikeClick={(like)=>setIsLiked(like)}
          postUserId={post.user._id}
        />
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
          <ul className="lg:w-96 p-2 rounded-xl bg-zinc-950 flex  flex-col gap-2">
            {
              <li className="p-2 w-full font-bold bg-red-300 rounded-xl border-2 border-red-950 text-red-950">
                <button onClick={() => deleteCurrentPost(post._id)}>
                  Delete
                </button>
              </li>
            }
          </ul>
        </Modal>
      )}
    </div>
  );
};

export default forwardRef(Post);

export const ImageComponent = memo(
  ({ src, alt, className, loaderClassName, onClick, style = {} }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
      const image = new Image();
      image.onload = () => {
        setImageLoaded(true);
      };
      image.src = src;
    }, [src]);
    return (
      <>
        <div
          className={loaderClassName}
          style={{ ...style, display: imageLoaded ? "none" : "flex" }}
        ></div>

        <img
          src={src}
          alt={alt}
          className={className}
          onClick={onClick}
          loading="lazy"
          style={{ ...style, display: imageLoaded ? "inline" : "none" }}
        />
      </>
    );
  }
);
