import styles from "./BlogCard.module.css"
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
        <div className={styles.post}>
          <div className={styles.postContent}>
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
         <div className={styles.postControl}>

         <button className={styles.editBtn} onClick={showEditForm}> 
               <EditIcon/> 
         </button>
         <button className={styles.deleteBtn} onClick={deletePost}> 
               <DeleteForeverIcon/> 
         </button>
         </div>
        </div>   
    );
   
};