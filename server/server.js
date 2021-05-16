const express = require('express')
const cors =  require('cors')
const bodyParser = require('body-parser')
const SpotifyWebApi = require('spotify-web-api-node')

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.post('/login',(req,res)=>{
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri : 'http://localhost:3000',
        clientId : '9881005611c1496693f9d25e2ee38294',
        clientSecret : '74f11ab0ed5447e28f0ea601ee8f9c1b'
    })
    spotifyApi.authorizationCodeGrant(code).then(data=>{
        res.json({
            accessToken : data.body.access_token,
            refreshToken : data.body.refresh_token,
            expiresIn : data.body.expires_in
        })
    }).catch(()=>res.sendStatus(400))
})
app.post('/refresh',(req,res)=>{
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
        redirectUri : 'http://localhost:3000',
        clientId : '9881005611c1496693f9d25e2ee38294',
        clientSecret : '74f11ab0ed5447e28f0ea601ee8f9c1b',
        refreshToken
    })
    spotifyApi.refreshAccessToken().then(
        (data)=> {
            res.json({
                accessToken : data.body.access_token,
                expiresIn : data.body.expires_in
            })
        }
    ).catch(()=>res.sendStatus(400))
})

app.listen(5000,()=>{console.log("App started")})