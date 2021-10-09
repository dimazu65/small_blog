import styles from "./EditPostForm.module.css"
import mainStyles from "../../../App.module.css"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Component } from "react";
export class EditPostForm extends Component {
  state = {
    postTitle: this.props.selectedPost.title,
    postDesc: this.props.selectedPost.description,
  };
  onChangeTitle = (e) => {
    this.setState({
      postTitle: e.target.value,
    });
  };
  onChangeDesc = (e) => {
    this.setState({
      postDesc: e.target.value,
    });
  };

  savePost = (e) => {
    e.preventDefault();
    const post = {
      id: this.props.selectedPost.id,  
      title: this.state.postTitle,
      description: this.state.postDesc,
      liked: this.props.selectedPost.liked
    }
    this.props.editBlogPost(post);
    this.props.triggerHideEditForm();
  };

  handleEscape = (e) => {
    if (e.key === "Escape") this.props.triggerHideEditForm();
  };

  componentDidMount() {
    
    window.addEventListener("keyup", this.handleEscape);
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleEscape);
  }

  render() {
    const triggerHideEditForm = this.props.triggerHideEditForm;
    return (
      <>
        <form action="" className={styles.editPostForm} onSubmit={this.savePost}>
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
              value={this.state.postTitle}
              onChange={this.onChangeTitle}
              required
            />
          </div>
          <div>
            <textarea
              className={styles.editFormInput}
              name="pstDesc"
              placeholder="Description"
              value={this.state.postDesc}
              onChange={this.onChangeDesc}
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
}