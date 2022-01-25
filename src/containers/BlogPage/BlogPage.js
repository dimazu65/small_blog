import axios from "axios";
import { postsUrl } from "../../components/sharedData/commonFunctions"
import styles from "./BlogPage.module.css";
import { AddPostForm } from "./components/AddPostForm";
import { BlogCard } from "./components/BlogCard";
import CircularProgress from '@mui/material/CircularProgress';
import { EditPostForm } from "./components/EditPostForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookReader } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, useCallback} from "react";

let source; 


export const BlogPage = (props) => {
 
    const [showAddForm, setShowAddForm] = useState(false) 
    const [showEditForm, setShowEditForm] = useState(false)  
    const [blogArr, setBlogArr] = useState([])
    const [isPending, setIsPending] = useState(false)
    const [selectedPost, setSelectedPost]=useState({})
  

  // Created simple database on mockapi.io
  // Will update to Firebase later
  const getPosts = useCallback(
    () => {
      
       source = axios.CancelToken.source();
       axios
         .get(postsUrl, {cancelToken: source.token})
         .then((response) => {
             setBlogArr(response.data)
             setIsPending (false)
         })
         .catch((err) => {
           console.log(err);
         });
    },
    [],
  )  
  useEffect(()=>{
    const willBrake= ()=>{
      if (source) {source.cancel('Axios "GET" was cancelled')};
    }
   
    getPosts()
    return ()=>willBrake()   
  }, [getPosts])

  
  const likePost = (blogPost) =>
  {
    const temp = { ...blogPost };
    temp.liked = !temp.liked;

    axios
      .put(
        `${postsUrl}${blogPost.id}`,
        temp
      )
      .then((response) => {
        getPosts();
        console.log("Changed", response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  const editBlogPost = (updatedBlogPost) =>
  {
    setIsPending( true)
    axios
      .put(`${postsUrl}${updatedBlogPost.id}`, updatedBlogPost)
      .then((response) => {
       
          getPosts();
          console.log("Changed", response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    setIsPending(false)
  }

  const deletePost = (blogPost) =>
  {
    if (window.confirm(`Remove ${blogPost.title} ?`)) {
      axios
        .delete(
          `${postsUrl}${blogPost.id}`
        )
        .then((response) => {
          getPosts();
          console.log("Post erased", response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // добавляю запись в массив после AddPostForm
  const addNewBlogPost = (blogPost) =>
  {
    axios
      .post(postsUrl, blogPost)
      .then((response) => {
        getPosts();
        console.log("Post created", response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const triggerShowEditForm = () =>
  {      
   setShowEditForm (true)

  };
  const triggerHideEditForm = () => 
  {
    
      setShowEditForm(false)
    
  };

  const triggerShowAddForm = () => 
  {
   
      setShowAddForm (true)
  };

  const triggerHideAddForm = () =>
  {
      setShowAddForm(false)
  };

  useEffect(()=>{
    const handleEscape = (e) => {
      if (e.key === "Escape") setShowEditForm(false);
    };
    
    window.addEventListener("keyup", handleEscape)
    return () => window.removeEventListener("keyup", handleEscape)
  }, [props])

  

  const handleSelectPost = (blogPost) => 
  {
    
       setSelectedPost(blogPost)
  }

  

    const blogPosts = blogArr.map((item) => {
      return (
        <BlogCard
          key={item.id}
          title={item.title}
          description={item.description}
          liked={item.liked}
          likePost={() => likePost(item)}
          deletePost={() => deletePost(item)}
          triggerShowEditForm={triggerShowEditForm}
          handleSelectPost = {() => handleSelectPost(item)}
        />
      );
    });

    if (blogArr.length === 0) return <h1>Loading data...</h1>;

    const postsOpacity = isPending ? 0.5 : 1
    return (
      <div className={styles.blogPage}>
        {showAddForm && (
          <AddPostForm
            blogArr={blogArr}
            addNewBlogPost={addNewBlogPost}
            triggerHideAddForm={triggerHideAddForm}
          />
        )}
        {showEditForm && (
          <EditPostForm
            triggerHideEditForm={triggerHideEditForm}
            selectedPost={selectedPost}
            editBlogPost={editBlogPost}
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
              onClick={triggerShowAddForm}
            >
              New post
            </button>
          </div>

          <div className={styles.posts} style={{ opacity: postsOpacity }}>
            {blogPosts}
          </div>
          {isPending && <CircularProgress className="preloader" />}
        </>
      </div>
    );
  }

