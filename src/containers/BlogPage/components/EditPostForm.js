import styles from "./EditPostForm.module.css"
import mainStyles from "../../../App.module.css"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useState, useEffect } from "react";
export const EditPostForm = (props)=> {
  
  const [postTitle, setPostTitle] =useState(props.selectedPost.title)
  const [postDesc, setPostDesc] =useState(props.selectedPost.description)
  
  const onChangeTitle = (e) => {
    
    setPostTitle(e.target.value)
  };
  const onChangeDesc = (e) => {
    setPostDesc(e.target.value)
  };

  const savePost = (e) => {
    e.preventDefault();
    const post = {
      id: props.selectedPost.id,  
      title: postTitle,
      description: postDesc,
      liked: props.selectedPost.liked
    }
    props.editBlogPost(post);
    props.triggerHideEditForm();
  };

 
  useEffect(()=>{
    const handleEscape = (e) => {
      if (e.key === "Escape") props.triggerHideEditForm();
    };
    
    window.addEventListener("keyup", handleEscape)
    return () => window.removeEventListener("keyup", handleEscape)
  }, [props])

  const triggerHideEditForm = props.triggerHideEditForm;
    return (
      <>
        <form action="" className={styles.editPostForm} onSubmit={savePost}>
          <h2>Edit post</h2>
          <button className={styles.hideBtn} onClick={triggerHideEditForm}>
            <HighlightOffIcon />
          </button>
          <div>
            <input
              className={styles.editFormInput}
              type="text"
              name="pstTitle"
              placeholder="Title"
              value={postTitle}
              onChange={onChangeTitle}
              required
            />
          </div>
          <div>
            <textarea
              className={styles.editFormInput}
              name="pstDesc"
              placeholder="Description"
              value={postDesc}
              onChange={onChangeDesc}
              rows={8}
              required
            />
          </div>
          <div>
            <button className={mainStyles.blackBtn} type="submit">
              Update post
            </button>
          </div>
        </form>
        <div onClick={triggerHideEditForm} className={styles.overlay}></div>
      </>
    );
  }
