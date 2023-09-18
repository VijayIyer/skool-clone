import {useEffect} from "react";
import axios from "axios";

export default function GetPost() {

    useEffect(() => {
        // document.cookie = `user_id=6500d391ba83ebc13d48cea9`;
        // document.cookie = `user_name=John Doe`;


        axios.get(`http://localhost:3000/api/posts?by=all&group=650876d2affaed39dc3d6556&page=1`)
            .then(r => console.log(r.data))

        // axios.get(`http://localhost:3000/api/posts?by=category&group=650876d2affaed39dc3d6556&category=Test Category&page=1`)
        //     .then(r => console.log(r.data))
        //
        // axios.get(`http://localhost:3000/api/posts?by=one&postId=6508897baffaed39dc3d6668`)
        //     .then(r => console.log(r.data))

    })

    return (
        <div>
            <h1>Get Post</h1>
        </div>
    )
}

