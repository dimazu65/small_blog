import "./AddPostForm.css"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Component } from "react";
export class AddPostForm extends Component {
  state = {
    postTitle: "",
    postDesc: "",
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
  createPost = (e) => {
    e.preventDefault();
    const post = {
      title: this.state.postTitle,
      description: this.state.postDesc,
      liked: false,
    };

    this.props.addNewBlogPost(post);
    this.props.triggerHideAddForm();
  };
  render() {
    const triggerHideAddForm = this.props.triggerHideAddForm;
    return (
      <>
        <form action="" className="addPostForm" onSubmit={this.createPost}>
          <h2>New post</h2>
          <button className="hideBtn" onClick={triggerHideAddForm}>
            <HighlightOffIcon />
          </button>
          <div>
            <input
              className="addFormInput"
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
              className="addFormInput"
              name="pstDesc"
              placeholder="Description"
              value={this.state.postDesc}
              onChange={this.onChangeDesc}
              required
            />
          </div>
          <div>
            <button className="blackBtn" type="submit">
              Add post
            </button>
          </div>
        </form>
        <div onClick={triggerHideAddForm} className="overlay"></div>
      </>
    );
  }
}