import "./AddPostForm.css"
export const AddPostForm = () => {
  return (
      <>
        <form action="" className="addPostForm">
             <h2>New post</h2>
             <div>
                <input className="addFormInput" type="text" name = "pstTitle" placeholder="Title"/>
             </div>
             <div>
                 <textarea className="addFormInput" name="pstDesc" placeholder="Description"></textarea>
              </div>
             <div>
                 <button className="blackBtn" type="button">Add post</button>
             </div>
            </form>
            <div className="overlay"></div>
            </>
            )
            
}