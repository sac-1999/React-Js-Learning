import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;

  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postid
    );
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST
  );
  const addPost = () => {};
  const deletePost = (postid) => {
    console.log(`delet post called for : ${postid}`);
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postid,
      },
    });
  };
  return (
    <PostList.Provider
      value={{ postList: postList, addPost: addPost, deletePost: deletePost }}
    >
      {children}
    </PostList.Provider>
  );
};

const DEFAULT_POST_LIST = [
  {
    id: "1",
    title: "going to mumbai",
    body: "Hii friends I am going to mumbai for my vacations!!!!!",
    reactions: 10,
    userId: "8",
    tags: ["vacation", "mumbai", "travel"],
  },

  {
    id: "2",
    title: "pass ho gye bro",
    body: "kaaie paas ho gye ",
    reactions: 20,
    userId: "10",
    tags: ["vacation", "college", "graduation"],
  },
];
export default PostListProvider;
