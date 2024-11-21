// pages/api/deletePost.js
import axios from 'axios';

export default async function handler(req, res) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { postId } = req.query;

    if (!postId) {
        return res.status(400).json({ message: 'Post ID is required' });
    }

    try {
        const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);

        if (response.status === 200) {
            return res.status(200).json({ message: 'Post deleted successfully' });
        } else {
            return res.status(response.status).json({ message: 'Failed to delete the post' });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.response?.data || error.message,
        });
    }
}
