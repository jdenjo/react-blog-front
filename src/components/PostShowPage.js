import React, { Component } from 'react'
import { Post } from './requests';
import PostDetails from './PostDetails';


export class PostShowPage extends Component {

 constructor(props) {
   super(props)
   this.state = {
     post: null,
     isLoading: true,
   };
 }

 componentDidMount() {


   Post.one(this.props.match.params.id).then((post) => {
     this.setState({
       post: post,
       isLoading: false,
     });
   });
 }

 render() {

   //deconstruct the post from the state
   const { post } = this.state;

   if (!this.state.isLoading && this.state.post) {

     return (
       <main>
         {/* This will use a component and copied object post from state as prop to display */}
         <PostDetails {...post} />
         <button onClick={() => this.deletePost()}>
           Delete Question
        </button>

         <button onClick={() => this.props.history.push(`/posts/${post.id}/edit`) }> 
           Update question
        </button>

       </main>
     )
   }
   if (this.state.isLoading) {
     return <div>Loading ..</div>
   }

 }

 deletePost(params) {
  Post.delete(this.state.post.id).then(data => {

      this.props.history.push(`/posts`);
    });

 }
}
export default PostShowPage
