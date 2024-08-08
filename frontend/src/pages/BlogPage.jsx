import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlog } from "../redux/actions/blogActions";
import { useParams } from "react-router-dom";

const BlogPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const blog = useSelector((state) => state.blog.blog);

  useEffect(() => {
    dispatch(getBlog(id));
  }, [dispatch, id]);

  return (
    <div>
      <h1>{blog?.title}</h1>
      <p>{blog?.content}</p>
    </div>
  );
};

export default BlogPage;
