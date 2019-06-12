import React, { Component } from "react";
import { singleComment, remove } from './apiComment';
import DefaultComment from "../images/wave.jpg";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";


class SingleComment extends Component {
    state = {
        Comment: "",
        redirectToHome: false
    };

    componentDidMount = () => {
        const CommentId = this.props.match.params.CommentId;
        singleComment(CommentId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ Comment: data });
            }
        });

    };

     deleteComment = () => {
        const CommentId = this.props.match.params.CommentId;
        const token = isAuthenticated().token;

         remove(CommentId, token).then(data => {
             if(data.error) {
                 console.log(data.error);
             } else {
                 this.setState({ redirectToHome: true });
             }
         });
     };

     deleteConfirmed = () => {
        let answer = window.confirm("Are you sure you want to delete your Comment?");
        if (answer) {
            this.deleteComment();
        }
    
    };

    renderComment = (Comment) => {
        const CommenterId = Comment.CommentedBy ? `/user/${Comment.CommentedBy._id}` : "";
        const CommenterName = Comment.CommentedBy ? Comment.CommentedBy.name : " Unknown ";

        return (
     
            <div className="card-body">
                <img src={`${process.env.REACT_APP_API_URL}/Comment/photo/${Comment._id}`} alt={Comment.title}
                onError={i => (i.target.src = `${DefaultComment}`)}
                className="img-thunbnail mb-3"
                style={{ 
                    height: "300px", 
                    width: '100%', 
                    objectFit: 'cover' }}
                
                />


                 <p className="card-text">{Comment.body}</p>
               <br/>
                 <p className="font-italic mark">Commented by 
                 <Link to={`${CommenterId}`}>{CommenterName}</Link>
                 on {new Date(Comment.created).toDateString()}
                 </p>

                 <div className="d-inline-block">
                 <Link to={`/`} class="btn btn-raised btn-primary btn-sm mr-5">Back to Comments</Link>

                 {isAuthenticated().user && isAuthenticated().user._id === Comment.CommentedBy._id &&

                 <>

                      <Link to={`/Comment/edit/${Comment._id}`} class="btn btn-raised btn-warning btn-sm mr-5">Update Comment</Link>
                      <button onClick={this.deleteConfirmed} className="btn btn-raised btn-danger">Delete Comment</button>

                      </>


                
                }





                 </div>
           
        </div>
        );

    }


    render() {

        if (this.state.redirectToHome) {
            return <Redirect to={`/`}/>;
         }

        const { Comment } = this.state;
        return (
            <div className="container">
                
                <h2 className="display-2 mt-5 mb-5">{Comment.title}</h2>

                {!Comment ? (
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                ) : (
                    this.renderComment(Comment)
                )}
                

            </div>
        );
    }
}

export default SingleComment;