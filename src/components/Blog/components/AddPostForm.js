import "./AddPostForm.css"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Component } from "react";
export class AddPostForm extends Component {
    state ={
        postTitle:'',
        postDesc: '',
    }
 onChangeTitle = (e) => {
   this.setState({
       postTitle: e.target.value
   }) 
 }
 onChangeDesc = (e) => {
    this.setState({
        postDesc: e.target.value
    }) 
  }
  createPost = () => {
      const post ={
        id: this.props.blogArr.length + 1,
        title: this.state.postTitle,
        description: this.state.postDesc,
        liked : false
      }
      
      this.props.addNewBlogPost(post)
  }
 render() {
    const triggerHideAddForm = this.props.triggerHideAddForm 
    return (
        <>
          <form action="" className="addPostForm">
               <h2>New post</h2>
               <button className="hideBtn" onClick={triggerHideAddForm}>
                   <HighlightOffIcon />
               </button>
               <div>
                  <input 
                    className="addFormInput" 
                    type="text" 
                    name = "pstTitle" 
                    placeholder="Title"
                    value = {this.state.postTitle}
                    onChange={this.onChangeTitle}
                  />
               </div>
               <div>
                   <textarea 
                     className="addFormInput" 
                     name="pstDesc" 
                     placeholder="Description"
                     value={this.state.postDesc}
                     onChange={this.onChangeDesc}
                   />
                </div>
               <div>
                   <button 
                     onClick={this.createPost} 
                     className="blackBtn" 
                     type="button">
                         Add post
                   </button>
               </div>
              </form>
              <div onClick={triggerHideAddForm} className="overlay"></div>
              </>
              )
 }
            
}