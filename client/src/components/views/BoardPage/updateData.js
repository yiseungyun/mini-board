import axios from 'axios';
import React from 'react';

class PostComponent extends React.Component {
    state = {
        posts: []
    };

    componentDidMount() {
        axios.get('/api/posts')
            .then(res => {
                this.setState({ posts: res.data });
            })
            .catch(err => {
                console.log(err);
            });
    }

    onDeleteHandler = (userKey) => { // 해당 post의 id를 확인해 mongo db에 저장된 userKey와 일치하면 삭제
        axios.delete(`/api/posts/${userKey}`)
        .then(res => {
        if (res.data.success) {
            // 삭제 버튼 눌렀을 때 버튼 id와 같은 userKey를 가진 데이터를 mongoDB에서 삭제함
            this.setState(prevState => ({
            posts: prevState.posts.filter(post => post.userKey !== userKey)
            }));
        } else {
            console.log(res.data.err);
        }
        })
        .catch(err => { console.log(err); });
    }

    render() {
        return (
            <div>
                <p className='boardName1'>게시판</p>
                {this.state.posts.map(post => (
                    <div className='postList' key={post.userKey}>
                        {post.title}<br/>{post.content}<br/>{post.name}
                        <p className='deleteBtn' id={post.userKey} onClick={() => this.onDeleteHandler(post.userKey)}>삭제</p>
                    </div>
                ))}
            </div>
        );
    }
}

export default PostComponent