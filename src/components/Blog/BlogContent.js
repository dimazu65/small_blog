import { Component } from "react"
import { posts } from "../sharedData/dataFile"
import "./BlogContent.css"
import { AddPostForm } from "./components/AddPostForm";
import { BlogCard } from "./components/BlogCard"
export class BlogContent extends Component {

    state = {
        showAddForm: false,
        blogArr: JSON.parse(localStorage.getItem('blogPosts')) || posts
    };

    likePost = pos => {
        const temp =[...this.state.blogArr]
        temp[pos].liked = !temp[pos].liked
// Ни хера не понятно как копируется массив         
// изменяется и temp и blogArr
// Странно...
    
 //   console.log('Source array', this.state.blogArr)
 //   console.log('Temp array', temp)

        this.setState({
            blogArr: temp
        })
     localStorage.setItem('blogPosts',JSON.stringify(temp))   
    } 

    
   
    

    deletePost = pos =>{
       if (window.confirm(`Are you sure to remove ${this.state.blogArr[pos].title} ?`)) { 
       const temp=[...this.state.blogArr]
       temp.splice(pos,1)
       this.setState ({
          blogArr : temp
       })
      localStorage.setItem('blogPosts', JSON.stringify(temp))  
    }
    }

    triggerShowAddForm = () => {
        this.setState({
            showAddForm :true
        })
    }
    render(){
        
        const blogPosts = this.state.blogArr.map((item, pos )=> {
            return (
               <BlogCard 
                 key={item.id}
                 title={item.title}
                 description = {item.description}
                 liked = {item.liked}
                 likePost = {() => this.likePost(pos)}
                 deletePost= {()=> this.deletePost(pos)}
               />
            )
        });
         return(
            <> 

           {
               this.state.showAddForm ? <AddPostForm /> : null
           } 
            
           
            {
                
                <>
                    <h1>Simple Blog</h1>
                    <button className="blackBtn" onClick={this.triggerShowAddForm}>
                        New post
                    </button>
                    <div className="posts">  
                        {blogPosts} 
                    </div>
                </>
               
            }
             </>  
    
         );
    }
};