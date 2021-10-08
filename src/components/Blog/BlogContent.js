import axios from "axios";
import { Component } from "react"
import { posts } from "../sharedData/dataFile"
import "./BlogContent.css"
import { AddPostForm } from "./components/AddPostForm";
import { BlogCard } from "./components/BlogCard"
export class BlogContent extends Component {
  state = {
    showAddForm: false,
    blogArr: [],
    isPending: false
  };
  getPosts = () => {
    this.setState({
       isPending:true
    })
    // Created simple database on mockapi.io
    // Will update to Firebase later
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
        isPending:false
     })  
  };

  likePost = (pos) => {
    const temp = [...this.state.blogArr];
    temp[pos].liked = !temp[pos].liked;

    this.setState({
      blogArr: temp,
    });
    localStorage.setItem("blogPosts", JSON.stringify(temp));
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

  // добавляю запись в массив после AddPostForm
  addNewBlogPost = (blogPost) => {
    this.setState((state) => {
      const temp = [...state.blogArr];
      temp.push(blogPost);
      localStorage.setItem("blogPosts", JSON.stringify(temp));
      return {
        blogArr: temp,
      };
    });
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
          likePost={() => this.likePost(pos)}
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
          {
            this.state.isPending && <h2>Updating...</h2>
          }
          <div className="posts">{blogPosts}</div>
        </>
      </div>
    );
  }
};