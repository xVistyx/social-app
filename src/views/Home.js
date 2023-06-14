import './Home.css';

import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../components/Post.js";
import FollowRecommendations from '../components/FollowRecommendations';
import AddPost from '../components/AddPost';


const Home = (props) => {
    const [posts, setPosts] = useState([])

    const getLatestPosts = () => {
        axios.post("https://akademia108.pl/api/social-app/post/latest")
            .then((req) => {
                setPosts(req.data)
            })
            .catch((error) => {
                console.error(error);
            });

    }




    const getNextPosts = () => {
        axios
            .post("https://akademia108.pl/api/social-app/post/older-than", {
                date: posts[posts.length - 1].created_at,
            })
            .then((req) => {
                setPosts(posts.concat(req.data));
            })
            .catch((error) => {
                console.error(error);
            })
    };

    const getPrevPosts = () => {
        axios
            .post("https://akademia108.pl/api/social-app/post/newer-than", {
                date: posts[0].created_at,
            })
            .then((req) => {
                setPosts(posts.concat(req.posts));
            })
            .catch((error) => {
                console.error(error);
            });

    }

    useEffect(() => {
        getLatestPosts();
    }, [props.user]);

    return (
        <div className="home">
            {props.user && <AddPost getPrevPosts={getPrevPosts} />}
            {props.user && <FollowRecommendations user={props.user} getLatestPosts={getLatestPosts} posts={posts.posts} />}
            <div className="postList">
                {posts.map(post => {
                    return <Post post={post} key={post.id} user={props.user} setPosts={setPosts} getLatestPosts={getLatestPosts} />
                })}
                <button className='btn loadMore' onClick={getNextPosts}>Load more</button>
            </div>
        </div>


    )
};


export default Home;