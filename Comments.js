import React, { Component } from "react";
import { list } from "./apiComment";
import DefaultComment from "../images/wave.jpg";
import { Link } from "react-router-dom";

class Comments extends Component {
    constructor() {
        super()
        this.state = {
            Comments: []
        };
    }

    componentDidMount() {
        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({Comments: data});
            }
        
        });
    }

    renderComments = Comments => {
        return (
            <div className="row">
                {Comments.map((Comment, i) => {
                    const CommenterId = Comment.CommentedBy 
                    ? `/user/${Comment.CommentedBy._id}`
                     : "";
                    const CommenterName = Comment.CommentedBy
                     ? Comment.CommentedBy.name
                      : " Unknown";

                    return (
                        <div className="card col-md-4" key={i}>
                 
                        <div className="card-body">
                            <img src={`${process.env.REACT_APP_API_URL}/Comment/photo/${Comment._id}`} alt={Comment.title}
                            onError={i => i.target.src = `${DefaultComment}`}
                            className="img-thunbnail mb-3"
                            style={{ height: "200px", width: "100%" }}
                            
                            />
    
                             <h5 className="card-title">{Comment.title}</h5>
    
                             <p className="card-text">{Comment.body.substring(0, 100)}</p>
                           <br/>
                             <p className="font-italic mark">Commented by 
                             <Link to={`${CommenterId}`}>{CommenterName}{" "}</Link>
                             on {new Date(Comment.created).toDateString()}
                             </p>

                            
                      <Link to={`/Comment/${Comment._id}`} class="btn btn-raised btn-primary btn-sm">Read more</Link>
                    </div>
                  </div>
                    );
            })}
                
                </div>
    
        );
    };

    render() {
        const {Comments} = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">
                {!Comments.length ? "Loading..." : "Recent Comments"}</h2>

                {this.renderComments(Comments)}
            </div>
        );
    }
}

export default Comments;

              
