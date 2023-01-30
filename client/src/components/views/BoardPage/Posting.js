import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Auth from '../../../hoc/auth'
import { registerPost } from '../../../_actions/post_actions';
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';

function Posting() { // 게시글 작성
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const onTitleChange = (event) => {
        setTitle(event.currentTarget.value)
    }
    const onContentChange = (event) => {
        setContent(event.currentTarget.value)
    }

    const name = localStorage.getItem('userName')
    const onSubmitHandler = (event) => {
      event.preventDefault()
      
      let body = {
        userKey: uuidv4(), 
        // unique한 키를 생성해주는 함수 -> unique한 key가 아니면 저장 하나만 됨
        // mongo db에 indexes에 unique key가 여러개 지정되어 오류 발생했었음
        title: title,
        content: content,
        name: name
      }
      // 게시물 내용 저장
      dispatch(registerPost(body))
      .then(response => {
        if(response.payload.success) {
          navigate('/board') // 페이지 이동
          alert('글이 등록되었습니다!')
        } else {
          alert('글 등록에 실패하였습니다.')
        }
      setTitle("")
      setContent("")
    })
    .catch(error => {
      console.log(error)
      alert('An error occurred while saving the post. Please try again later.')
    })}
    
    const onBack = () => {
    navigate('/board')}
    
    return (
        <>
          <form className='postingForm'>
            <p id='registerCancelBtn' onClick={onBack}>취소</p>
            <br/>
            <div>
              { name }
              <br/>
              <input id='titleBox' onChange={onTitleChange} type='text' placeholder='제목' name='title' value={title}></input>
              <br/>
              <textarea id='contentBox' onChange={onContentChange} type='text' placeholder='내용을 입력하세요' value={content}></textarea>
              <br/>
            </div>
            <p id='registerPostBtn' onClick={onSubmitHandler}>등록</p>
          </form>
        </>
  )
}

export default Auth(Posting, true)
