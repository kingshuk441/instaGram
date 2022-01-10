import React, { Component } from 'react';
import axios from "axios";
import Post from '../Post/Post';
import "./Feeds.css";

class Feeds extends Component {
    state = { 
        posts:[],
        captionInput:""
     }

     // create a ref
     fileInput = React.createRef();

    componentDidMount(){
        let uid = this.props.user["_id"];
        axios.get(`/api/post/feeds/${uid}`).then( obj=>{
            let posts = obj.data.myFollowingPosts;
            let sortedPosts = posts.sort( (a,b)=>{
                return new Date(b.createdOn) - new Date(a.createdOn) ;
            })
            this.setState({
                posts:sortedPosts,
                captionInput:""
            })
        });
    }

    onUploadPostHandler = () =>{
        let fileObject = this.fileInput.current.files[0];
        console.log(fileObject);

        //form data
        let formData = new FormData();

        formData.append(`post` , fileObject);
        formData.append(`uid` , this.props.user["_id"]);
        formData.append(`caption` , this.state.captionInput);

        axios.post("/api/post" , formData).then( obj =>{
            if(obj.data.postCreated){
                //successfully created a post
                this.componentDidMount();
                
            }
        });
    }

    onCaptionChangeHandler = (value) =>{
        this.setState({
            captionInput:value
        })
    }

    render() { 
        return (
            <div className="feeds">
                <div className="new-post">
                    <div className="create-new-post">CREATE NEW POST</div>
                    <div className="upload-post">
                        <input type="file" id="post-image" ref = {this.fileInput}/>
                        <input type="text" id="caption" placeholder="Add caption" value={this.state.captionInput} onChange={ (e) => {this.onCaptionChangeHandler(e.target.value)}}/>
                        <button className="upload-btn" onClick={this.onUploadPostHandler}>POST</button>
                    </div>
                </div>
                {
                this.state.posts.length ? 
                <div className="feed-body">
                    {
                        this.state.posts.map( post =>{
                            return <Post post={post} user={this.props.user} key={post["_id"]} UserClickedHandler = {this.props.UserClickedHandler} />
                        })
                    }
                </div>
                : <div className="feed-body">SORRY! No posts to show!</div>
             }
            </div>
        );
    }
}
 
export default Feeds;