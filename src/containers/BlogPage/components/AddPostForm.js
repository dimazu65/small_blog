import styles from "./AddPostForm.module.css"
import mainStyles from "../../../App.module.css"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useEffect, useState } from "react";
export const AddPostForm = (props) => {

  const [postTitle, setPostTitle] =useState('')
  const [postDesc, setPostDesc] =useState('')
    
  const onChangeTitle = (e) => {
    setPostTitle(e.target.value)
  };
  const onChangeDesc = (e) => {
    setPostDesc(e.target.value)
  };
  const createPost = (e) => {
    e.preventDefault();
    const post = {
      title: postTitle,
      description: postDesc,
      liked: false,
    };

    props.addNewBlogPost(post);
    props.triggerHideAddForm();
  };

  useEffect(()=>{
    const handleEscape = (e) => {
      if (e.key === "Escape") props.triggerHideAddForm();
    };
    window.addEventListener("keyup", handleEscape);
    return () => window.removeEventListener("keyup", handleEscape)
  }, [props])

    const triggerHideAddForm = props.triggerHideAddForm;
    return (
      <>
        <form action="" className={styles.addPostForm} onSubmit={createPost}>
          <h2>New post</h2>
          <button className={styles.hideBtn} onClick={triggerHideAddForm}>
            <HighlightOffIcon />
          </button>
          <div>
            <input
              className={styles.addFormInput}
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
              className={styles.addFormInput}
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
              Add post
            </button>
          </div>
        </form>
        <div onClick={triggerHideAddForm} className={styles.overlay}></div>
      </>
    );
  }
