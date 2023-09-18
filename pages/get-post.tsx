import {useEffect} from "react";
import axios from "axios";

export default function GetPost() {

    useEffect(() => {
        // document.cookie = `user_id=6500d391ba83ebc13d48cea9`;
        // document.cookie = `user_name=John Doe`;


        axios.get(`http://localhost:3000/api/posts?by=all&group=test&page=1`)
            .then(r => console.log(r.data))

        // axios.get(`http://localhost:3000/api/posts?by=category&group=test&category=Test Category&page=1`)
        //     .then(r => console.log(r.data))
        //
        // axios.get(`http://localhost:3000/api/posts?by=one&postId=6507d319472333e5f0a5bb58`)
        //     .then(r => console.log(r.data))

    })

    return (
        <div>
            <h1>Get Post</h1>
        </div>
    )
}

