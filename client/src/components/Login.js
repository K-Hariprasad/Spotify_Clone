import React from 'react'
import './Login.css'
function Login() {
    const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=9881005611c1496693f9d25e2ee38294&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state&state=34fFs29kd09"
    return (
        <div className="login_container">
            <a className="btn btn-success btn-lg" href={AUTH_URL}>Login with spotify</a>
        </div>
    )
}

export default Login
