import "./AddPostForm.css"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
export const AddPostForm = ({triggerHideAddForm}) => {
  return (
      <>
        <form action="" className="addPostForm">
             <h2>New post</h2>
             <button className="hideBtn" onClick={triggerHideAddForm}>
                 <HighlightOffIcon />
             </button>
             <div>
                <input className="addFormInput" type="text" name = "pstTitle" placeholder="Title"/>
             </div>
             <div>
                 <textarea className="addFormInput" name="pstDesc" placeholder="Description"></textarea>
              </div>
             <div>
                 <button onClick={triggerHideAddForm} className="blackBtn" type="button">Add post</button>
             </div>
            </form>
            <div onClick={triggerHideAddForm} className="overlay"></div>
            </>
            )
            
}