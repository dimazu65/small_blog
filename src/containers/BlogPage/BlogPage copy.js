import axios from "axios";
import { Component } from "react";
import { postsUrl } from "../../components/sharedData/commonFunctions"
import styles from "./BlogPage.module.css";
import { AddPostForm } from "./components/AddPostForm";
import { BlogCard } from "./components/BlogCard";
import CircularProgress from '@mui/material/CircularProgress';
import { EditPostForm } from "./components/EditPostForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookReader } from '@fortawesome/free-solid-svg-icons'

let source; 

export class BlogPage extends Component {
  state = {
    showAddForm: false,
    showEditForm : false,
    blogArr: [],
    isPending: false,
    selectedPost:{},
  };

  // Created simple database on mockapi.io
  // Will update to Firebase later
  getPosts () 
   {
    
    source = axios.CancelToken.source();
    axios
      .get(postsUrl, {cancelToken: source.token})
      .then((response) => {
        this.setState({
          blogArr: response.data,
          isPending : false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    
  };
  
  componentDidMount() 
  {
    this.getPosts();
  }

  componentWillUnmount() 
  {
    if (source) {source.cancel('Axios "GET" was cancelled');}
  }

  likePost = (blogPost) =>
  {
    const temp = { ...blogPost };
    temp.liked = !temp.liked;

    axios
      .put(
        `${postsUrl}${blogPost.id}`,
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
  
  editBlogPost = (updatedBlogPost) =>
  {
    this.setState({
      isPending: true,
    });

    axios
      .put(`${postsUrl}${updatedBlogPost.id}`, updatedBlogPost)
      .then((response) => {
       
          this.getPosts();
          console.log("Changed", response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    this.setState({
      isPending: false,
    });
  
  }

  deletePost = (blogPost) =>
  {
    if (window.confirm(`Remove ${blogPost.title} ?`)) {
      axios
        .delete(
          `${postsUrl}${blogPost.id}`
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
  addNewBlogPost = (blogPost) =>
  {
    axios
      .post(postsUrl, blogPost)
      .then((response) => {
        this.getPosts();
        console.log("Post created", response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  triggerShowEditForm = () =>
  {
    this.setState({
      showEditForm: true,
    });
  };
  triggerHideEditForm = () => 
  {
    this.setState({
      showEditForm: false,
    });
  };

  triggerShowAddForm = () => 
  {
    this.setState({
      showAddForm: true,
    });
  };

  triggerHideAddForm = () =>
  {
    this.setState({
      showAddForm: false,
    });
  };

  handleEscape (e)
  {
    if (e.key === "Escape" && this.state.showAddForm) this.triggerHideAddForm();
  };

  handleSelectPost (blogPost) 
  {
    this.setState({
       selectedPost:blogPost
    })
  }

  

  render() 
  {
    const blogPosts = this.state.blogArr.map((item, pos) => {
      return (
        <BlogCard
          key={item.id}
          title={item.title}
          description={item.description}
          liked={item.liked}
          likePost={() => this.likePost(item)}
          deletePost={() => this.deletePost(item)}
          triggerShowEditForm={this.triggerShowEditForm}
          handleSelectPost = {() => this.handleSelectPost(item)}
        />
      );
    });

    if (this.state.blogArr.length === 0) return <h1>Loading data...</h1>;

    const postsOpacity = this.state.isPending ? 0.5 : 1
    return (
      <div className={styles.blogPage}>
        {this.state.showAddForm && (
          <AddPostForm
            blogArr={this.state.blogArr}
            addNewBlogPost={this.addNewBlogPost}
            triggerHideAddForm={this.triggerHideAddForm}
          />
        )}
        {this.state.showEditForm && (
          <EditPostForm
            triggerHideEditForm={this.triggerHideEditForm}
            selectedPost={this.state.selectedPost}
            editBlogPost={this.editBlogPost}
          />
        )}
        <>
          <div>
            <h1>
              <FontAwesomeIcon
                icon={faBookReader}
                size="1x"
                className={styles.icon}
              />
              Small Blog
              <FontAwesomeIcon
                icon={faBookReader}
                size="1x"
                className={styles.icon}
              />
            </h1>
          </div>
          <div className={styles.addNewBtn}>
            <button
              className={styles.blackBtn}
              onClick={this.triggerShowAddForm}
            >
              New post
            </button>
          </div>

          <div className={styles.posts} style={{ opacity: postsOpacity }}>
            {blogPosts}
          </div>
          {this.state.isPending && <CircularProgress className="preloader" />}
        </>
      </div>
    );
  }
}
