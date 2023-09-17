import {useEffect} from "react";
import axios from "axios";

export default function GetPost() {

    useEffect(() => {
        // const user = {user_id: `6500d391ba83ebc13d48cea9`, user_name: `John Doe`};
        // const group_id = `test`
        // const category_id = `Test Category`
        // axios.post(`http://localhost:3000/api/posts/get-post/category/${category_id}/${group_id}/1`, user)
        //     .then(response => console.log(response.data))


        // const user = {user_id: `6500d391ba83ebc13d48cea9`, user_name: `John Doe`};
        // const group_id = `test`
        // axios.post(`http://localhost:3000/api/posts/get-post/all-post/test/1`, user)
        //     .then(response => console.log(response.data)
        //     )


        // const data = {userId: `6500d391ba83ebc13d48cea9`, postId: `6505129e30ab9b2364ce6ba5`};
        // axios.post(`http://localhost:3000/api/posts/get-post/all-post/test/1`, data)
        //     .then(response => console.log(response.data))

        document.cookie = `user_id=6500d391ba83ebc13d48cea9`;
        document.cookie = `user_name=John Doe`;

        // axios.get(`http://localhost:3000/api/posts?by=all&group=test&page=1`)
        //     .then(r => console.log(r.data))

        axios.get(`http://localhost:3000/api/posts?by=category&group=test&category=Test Category&page=1`)
            .then(r => console.log(r.data))
        //
        // axios.get(`http://localhost:3000/api/posts?by=one&post_id=6504f04a30ab9b2364ce67b7`)
        //     .then(r => console.log(r.data))

    })

    return (
        <div>
            <h1>Get Post</h1>
        </div>
    )
}

