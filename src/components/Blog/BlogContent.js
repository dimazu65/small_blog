import axios from "axios";
import { Component } from "react";
//import { posts } from "../sharedData/dataFile"
import "./BlogContent.css";
import { AddPostForm } from "./components/AddPostForm";
import { BlogCard } from "./components/BlogCard";
export class BlogContent extends Component {
  state = {
    showAddForm: false,
    blogArr: [],
    isPending: false,
  };

  // Created simple database on mockapi.io
  // Will update to Firebase later
  getPosts = () => {
    this.setState({
      isPending: true,
    });

    axios
      .get("https://615fc6a6f7254d001706820b.mockapi.io/posts")
      .then((response) => {
        this.setState({
          blogArr: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({
      isPending: false,
    });
  };

  likePost = (blogPost) => {
    const temp = { ...blogPost };
    temp.liked = !temp.liked;

    axios
      .put(
        `https://615fc6a6f7254d001706820b.mockapi.io/posts/${blogPost.id}`,
        temp
      )
      .then((response) => {
        this.getPosts();
        console.log("Changed", response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deletePost = (blogPost) => {
    if (window.confirm(`Remove ${blogPost.title} ?`)) {
      axios
        .delete(
          `https://615fc6a6f7254d001706820b.mockapi.io/posts/${blogPost.id}`
        )
        .then((response) => {
          this.getPosts();
          console.log("Post erased", response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // добавляю запись в массив после AddPostForm
  addNewBlogPost = (blogPost) => {
    axios
      .post("https://615fc6a6f7254d001706820b.mockapi.io/posts", blogPost)
      .then((response) => {
        this.getPosts();
        console.log("Post created", response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  triggerShowAddForm = () => {
    this.setState({
      showAddForm: true,
    });
  };

  triggerHideAddForm = () => {
    this.setState({
      showAddForm: false,
    });
  };

  handleEscape = (e) => {
    if (e.key === "Escape" && this.state.showAddForm) this.triggerHideAddForm();
  };

  componentDidMount() {
    this.getPosts();
    window.addEventListener("keyup", this.handleEscape);
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleEscape);
  }
  render() {
    const blogPosts = this.state.blogArr.map((item, pos) => {
      return (
        <BlogCard
          key={item.id}
          title={item.title}
          description={item.description}
          liked={item.liked}
          likePost={() => this.likePost(item)}
          deletePost={() => this.deletePost(item)}
        />
      );
    });
    return (
      <div className="blogPage">
        {this.state.showAddForm && (
          <AddPostForm
            blogArr={this.state.blogArr}
            addNewBlogPost={this.addNewBlogPost}
            triggerHideAddForm={this.triggerHideAddForm}
          />
        )}
        <>
          <h1>Simple Blog</h1>
          <div className="addNewBtn">
            <button className="blackBtn" onClick={this.triggerShowAddForm}>
              New post
            </button>
          </div>
          {this.state.isPending && <h2>Updating...</h2>}
          <div className="posts">{blogPosts}</div>
        </>
      </div>
    );
  }
}
