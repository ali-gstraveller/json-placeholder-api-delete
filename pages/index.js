import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import { useState } from 'react';
import axios from 'axios';


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {

  const [postId, setPostId] = useState('');
    const [message, setMessage] = useState('');

    const handleDelete = async () => {
      try {
          const response = await axios.delete(`/api/deletePost?postId=${postId}`);

          if (response.status === 200) {
              setMessage(response.data.message);
          } else {
              setMessage(response.data.message || 'Failed to delete the post');
          }
      } catch (error) {
        console.log("error=>",error);
          setMessage(
              error.response?.data?.message || 'An error occurred. Please try again.'
          );
      }
  };


  return (
    <div style={{ padding: '20px' }}>
    <h1>Delete a Post</h1>
    <input
        type="text"
        placeholder="Enter Post ID"
        value={postId}
        onChange={(e) => setPostId(e.target.value)}
        style={{ marginRight: '10px', padding: '5px' }}
    />
    <button onClick={handleDelete} style={{ padding: '5px 10px' }}>
        Delete Post
    </button>
    {message && <p>{message}</p>}
</div>
  );
}
