import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../_actions/user_actions';
import Auth from '../../../hoc/auth'

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }
  const onSubmitHandler = (event) => {
    event.preventDefault()

    let body = {
      email: Email,
      password: Password
    }
    dispatch(loginUser(body))
    .then(response => {
      if(response.payload.loginSuccess) {
        navigate('/') // 페이지 이동
        localStorage.setItem("userName", Email)
      } else {
        alert('로그인에 실패하였습니다.')
      }
    })
  }

  return (
    <div style={{
      justifyContent: 'center', height: '100vh'
    }}>
      <form className='loginPageForm'>
        <div className='loginForm'>
          <input id='emailBox' placeholder='Email' type="email" value={Email} onChange={onEmailHandler}/>
          <br/>
          <input id='passwordBox' placeholder='Password' type="password" value={Password} onChange={onPasswordHandler}/>
        </div>
        <div className='btnForm'>
          <span id='loginBtn' onClick={onSubmitHandler}>로그인</span>
          <span id='backBtn' onClick={()=>navigate('/')}>뒤로가기</span>
        </div>
      </form>
    </div>
  )
}

export default Auth(LoginPage, false)