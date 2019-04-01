import React, { Component } from "react";
import PostForm from "./PostForm";
import { Post } from "./requests";

class PostEditPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: [],
      loading: true,
      question: null
    };

    this.updatePost = this.updatePost.bind(this);
  }

  loadPost() {
    Post.one(this.props.match.params.id).then(post => {
      this.setState({
        post: post,
        loading: false
      });
    });
  }

  updatePost(params) {
    const { post } = this.state;

    Post.update(post.id, params).then(data => {
      if (data.errors) {
        this.setState({ errors: data.errors });
      } else {
        this.props.history.push(`/posts/${post.id}`);
      }
    });
  }

  componentDidMount() {
    this.loadPost();
  }

  render() {
    const { errors, loading, post } = this.state;

    if (loading) {
      return (
        <main>
          <h2>Loading...</h2>
        </main>
      );
    }

    return (
      <main>
        <h1>Edit Post</h1>
        <PostForm
          data={post}
          errors={errors}
          onSubmit={this.updatePost}
        />
      </main>
    );
  }
}

export default PostEditPage;
