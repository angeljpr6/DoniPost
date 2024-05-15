import React, { Component } from "react";
import Post from "./Post";
import axios from "axios";
import PostCard from "./PostCard";

class Posts extends Component {
    state = {
        posts: {},
        status: null
    };



    /*cambiarContenido = () => {
        var { posts } = this.state;
        posts[0].contenido = "si claro"
        this.setState({
            posts: posts
        })
    */





    render() {
        
        
        return (
            <div>
                <h1>POSTS</h1>
                <PostCard />
                {this.state.status === "success" &&
                    <div>

                        {this.state.posts.map((post) => {
                            return (
                                <h1>{post.text}</h1>
                            )
                        })}
                        {/*
                        this.state.posts.map((post, i) => {
                            return (
                                <div>
                                    <p><button onClick={this.cambiarContenido}>Cambiar</button></p>
                                    <Post key={i} post={post}/>
                                </div>

                            )
                        })
                    */}

                    </div>
                }

            </div>
        )
    }
}

export default Posts;
