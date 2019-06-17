import React, { Component } from "react";
import { singlePost, remove } from './apiPost';
import DefaultPost from "../images/wave.jpg";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import Comment from "./Comment";


class SinglePost extends Component {
    state = {
        post: "",
        redirectToHome: false,
        redirectToSignin: false,
        comments: []
    };

    componentDidMount = () => {
        const postId = this.props.match.params.postId;
        singlePost(postId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ 
                    post: data,
                comments: data.comments
             });
            }
        });

    };

    updateComments = comments => {
        this.setState({ comments });
    };

     deletePost = () => {
        const postId = this.props.match.params.postId;
        const token = isAuthenticated().token;

         remove(postId, token).then(data => {
             if(data.error) {
                 console.log(data.error);
             } else {
                 this.setState({ redirectToHome: true });
             }
         });
     };

     deleteConfirmed = () => {
        let answer = window.confirm("Are you sure you want to delete your post?");
        if (answer) {
            this.deletePost();
        }
    
    };

    renderPost = (post) => {
        const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
        const posterName = post.postedBy ? post.postedBy.name : " Unknown ";

        return (
     
            <div className="card-body">
                <img src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`} alt={post.title}
                onError={i => (i.target.src = `${DefaultPost}`)}
                className="img-thunbnail mb-3"
                style={{ 
                    height: "300px", 
                    width: '100%', 
                    objectFit: 'cover' }}
                
                />


                 <p className="card-text">{post.body}</p>
               <br/>
                 <p className="font-italic mark">Posted by 
                 <Link to={`${posterId}`}>{posterName}</Link>
                 on {new Date(post.created).toDateString()}
                 </p>

                 <div className="d-inline-block">
                 <Link to={`/`} class="btn btn-raised btn-primary btn-sm mr-5">Back to posts</Link>

                 {isAuthenticated().user && isAuthenticated().user._id === post.postedBy._id &&

                 <>

                      <Link to={`/post/edit/${post._id}`} class="btn btn-raised btn-warning btn-sm mr-5">Update post</Link>
                      <button onClick={this.deleteConfirmed} className="btn btn-raised btn-danger">Delete Post</button>

                      </>


                
        }





                 </div>
           
        </div>
        );

    }


    render() {
        const { post, redirectToHome, redirectToSignin, comments } = this.state;


        if (redirectToHome) {
            return <Redirect to={`/`} />;
         } else if (redirectToSignin) {
             return <Redirect to={`/signin`} />;
         }

        return (
            <div className="container">
                
                <h2 className="display-2 mt-5 mb-5">{post.title}</h2>

                {!post ? (
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                ) : (
                    this.renderPost(post)
                )}

                <Comment postId={post._id} comments={comments.reverse()} updateComments={this.updateComments}/>


                

            </div>
        );
    }
    }

export default SinglePost;