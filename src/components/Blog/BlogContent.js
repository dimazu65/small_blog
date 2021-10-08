import { Component } from "react"
import { posts } from "../sharedData/dataFile"
import "./BlogContent.css"
import { AddPostForm } from "./components/AddPostForm";
import { BlogCard } from "./components/BlogCard"
export class BlogContent extends Component {
  state = {
    showAddForm: false,
    blogArr: JSON.parse(localStorage.getItem("blogPosts")) || posts,
  };

  likePost = (pos) => {
    const temp = [...this.state.blogArr];
    temp[pos].liked = !temp[pos].liked;

    this.setState({
      blogArr: temp,
    });
    localStorage.setItem("blogPosts", JSON.stringify(temp));
  };

  deletePost = (pos) => {
    if (window.confirm(`Remove ${this.state.blogArr[pos].title} ?`)) {
      this.setState((state) => {
        const temp = [...this.state.blogArr];
        temp.splice(pos, 1);
        localStorage.setItem("blogPosts", JSON.stringify(temp));
        return {
          blogArr: temp,
        };
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

    this.triggerHideAddForm();
  };

  componentDidMount() {
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
          deletePost={() => this.deletePost(pos)}
        />
      );
    });
    return (
      <div className="blogPage">
        {this.state.showAddForm ? (
          <AddPostForm
            blogArr={this.state.blogArr}
            addNewBlogPost={this.addNewBlogPost}
          />
        ) : null}
        <>
          <h1>Simple Blog</h1>
          <div className="addNewBtn">
            <button className="blackBtn" onClick={this.triggerShowAddForm}>
              New post
            </button>
          </div>
          <div className="posts">{blogPosts}</div>
        </>
      </div>
    );
  }
};