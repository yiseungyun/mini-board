import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Auth from '../../../hoc/auth'
import '../../../mini-board.css'

function LandingPage() {

    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("userName"))
    // landingpage 들어오자마자 실행
    useEffect(() => {
        axios.get('/api/hello')
        .then(response => console.log(response.data))
    }, [])

    const onClickHandler = () => {
      axios.get('/api/users/logout')
      .then(response => {
        if (response.data.success) {
          localStorage.removeItem("userName")
          setIsLoggedIn(false);
          navigate('/')
        } else {
          alert('로그아웃하는데 실패했습니다.')
        }
      })
    }

    return (
      <div style={{
        justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
      }}>
        <div>
          <div className='topMenu'>
            {isLoggedIn && <span id='boardBtn' onClick={()=>navigate('/Board')}>게시판</span>}          
            {isLoggedIn && <span id='logoutBtn' onClick={onClickHandler}>로그아웃</span>}
          </div>
          <div className='topMenu'>
            {!isLoggedIn && <span id='loginBtn' onClick={()=>navigate('/login')}>로그인</span>}
            {!isLoggedIn && <span id='registerBtn'onClick={()=>navigate('/register')}>회원가입</span>}
          </div>

        </div>
        <h2 className='homepageName'>Mini Board</h2>
      </div>
    )
}

export default Auth(LandingPage, null)
