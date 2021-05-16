import React, { useState, useEffect } from 'react'
import axios from 'axios'
function UseAuth(code) {
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiesIn] = useState()

    useEffect(() => {
        axios.post('http://localhost:5000/login', {
            code
        }).then(res => {
            setAccessToken(res.data.accessToken)
            setRefreshToken(res.data.refreshToken)
            setExpiesIn(res.data.expiresIn)
            window.history.pushState({}, null, '/')
        }
        ).catch(() => {
            window.location = '/'
        })
    }, [code])

    useEffect(() => {
        if (!refreshToken || !expiresIn) return
        const interval = setInterval(()=>{
            axios.post('http://localhost:5000/refresh', {
                refreshToken
            }).then(res => {
                setAccessToken(res.data.accessToken)
                setExpiesIn(res.data.expiresIn)
            }
            ).catch(() => {
                window.location = '/'
            })}, (expiresIn - 60) * 1000)
        return () => clearInterval(interval)
    }, [refreshToken, expiresIn])

    return accessToken
}

export default UseAuth
