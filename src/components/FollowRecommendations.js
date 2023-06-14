import axios from "axios";
import './FollowRecommendations.css'
import { useEffect, useState } from "react";

const FollowRecommendations = (props) => { 
    const [recommendations, setrecommendations] = useState([]);



    const getRecommendations = () => {
        axios.post('https://akademia108/api/social-app/follows/recommendations')
        .then((res)=> {
            setrecommendations(res.data)
        })
        .catch((error) => {
            console.error(error);
        });
    };

    useEffect(()=>{
        getRecommendations()
    }, [props.posts])

    const follow = (id) => {
        axios.post('https://akademia108/api/social-app/follows/follow', {
            leader_id: id
        })
        .then(() => {
            props.getLatestPosts();
        })
        .catch((error) => {
            console.error(error);
        });
    };

    return <div className="followRecommendations">
        {recommendations.map(recommendation=> {
            return (
                <div className="followRecommendation" key={recommendation.id}>
                    <img src={recommendation.avatar.url} alt={recommendation.username} />
                    <h3>{recommendation.username}</h3>
                    <button className="btn" onClick={()=>follow(recommendation.id)}>Follow</button>
                </div>
            )
        })}
    </div>
};


export default FollowRecommendations;