import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../_actions/user_actions';
import Auth from '../../../hoc/auth'

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [Name, setName] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }
  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value)
  }
  const onSubmitHandler = (event) => {
    event.preventDefault()

    if (Password !== ConfirmPassword) {
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
    }

    let body = {
      email: Email,
      password: Password,
      name: Name
    }

    dispatch(registerUser(body))
    .then(response => {
      if(response.payload.success) {
        navigate('/login') // 페이지 이동
      } else {
        alert('회원가입에 실패하였습니다.')
      }
    })
  }

  return (
    <div>
      <form>
        <div className='registerForm'>
          <input id='r_emailBox' type="email" placeholder='Email' value={Email} onChange={onEmailHandler}/>
          <input id='r_nameBox' type="text" placeholder='Name' value={Name} onChange={onNameHandler}/>
          <input id='r_passwordBox' type="password" placeholder='Password' value={Password} onChange={onPasswordHandler}/>
          <input id='r_confirmBox' type="password" placeholder='Confirm Password' value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
        </div>
        <br/>
        <div className='registerBtnForm'>
          <span id='registerSubmitBtn' onClick={onSubmitHandler}>회원가입</span>
          <span id='registerBackBtn' onClick={()=>navigate('/')}>뒤로가기</span>
        </div>
      </form>
    </div>
  )
}


export default Auth(RegisterPage, false)
