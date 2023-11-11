"use client";

import Edit from "./Edit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getPost } from "@/app/lib/getPost";
import { getBlogPosts } from "@/firebase";
import { setPosts } from "@/app/redux/slices/posts";

export default function Page() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state: any) => state.posts);
  useEffect(() => {
    if (posts?.length === 0) {
      getBlogPosts("quixy").then((data) => dispatch(setPosts(data)));
    }
  }, [posts]);

  return <>{posts && <Edit posts={posts.posts} />}</>;
}
