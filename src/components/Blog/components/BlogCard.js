import "./BlogCard.css"
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export const BlogCard = ({
        title,
        description,
        liked,
        likePost,
        deletePost,
        triggerShowEditForm,
        handleSelectPost,
    }) => {
  
    const heartFill = liked ? 'crimson' : 'black'
    
    const showEditForm = () => {
        handleSelectPost()
        triggerShowEditForm()
    }
    return (
        <div className="post">
          <div className="postContent">
                 <h2>{title}</h2>
            <p>
            {description}
            </p>
            <div>
                <button onClick = {likePost}>
                <FavoriteIcon style={{ fill:heartFill}}/>
                </button>
            </div>
         </div>
         <div className="postControl">

         <button className="editBtn" onClick={showEditForm}> 
               <EditIcon/> 
         </button>
         <button className="deleteBtn" onClick={deletePost}> 
               <DeleteForeverIcon/> 
         </button>
         </div>
        </div>   
    );
   
};