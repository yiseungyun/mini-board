import React from 'react'
import { useNavigate } from 'react-router-dom';
import Auth from '../../../hoc/auth'
import PostComponent from './updateData';

function BoardPage() {
  const navigate = useNavigate()
  const onLandingPage = () => {
    navigate('/')
  }
  const onPosting = () => {
    navigate('/posting')
  }

  return (
    <div> 
      <div className='board1topMenu'>
        <span id='homeBtn' onClick={onLandingPage}>HOME</span>
        <span id='postBtn' onClick={onPosting}>글 쓰기</span>
      </div>
      <br/>
      <PostComponent></PostComponent>
    </div>
  )
}

export default Auth(BoardPage, true) // 로그인한 유저만