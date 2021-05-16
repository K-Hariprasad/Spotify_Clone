import React,{useState,useEffect} from 'react'
import useAuth from './useAuth'
import SpotifyWebApi from 'spotify-web-api-node'
import ShowTracks from './ShowTracks'
import Player from './Player'

const spotifyApi = new SpotifyWebApi({
    clientId : '9881005611c1496693f9d25e2ee38294'
})

function Home({code}) {
    const accessToken = useAuth(code)
    const [search, setSearch] = useState()
    const [searchResult, setSearchResult] = useState([])
    const [track, setTrack] = useState()

    useEffect(()=> {
        if(!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    },[accessToken])

    useEffect(()=> {
        if(!accessToken) return
        spotifyApi.searchTracks('tamil')
           .then(res=>
            {
                setSearchResult(res.body.tracks.items.map(item=>{
                    const smallestImg = item.album.images.reduce(
                        (accumulator, image)=>{
                            if(image.height>accumulator.height) return image
                            return accumulator
                        }, item.album.images[0]
                    )
                    return {
                        artist : item.artists[0].name,
                        title: item.name,
                        uri : item.uri,
                        imageUrl : smallestImg.url
                    }
                }))
            })
    },[accessToken])

    const handleChange=(e)=>{
        setSearch(e.target.value)
    }
    const searchTrack=()=>{
        if(!search) return setSearchResult([])
        if(!accessToken) return
        spotifyApi.searchTracks(search).then(res=>
            {
                setSearchResult(res.body.tracks.items.map(item=>{
                    const smallestImg = item.album.images.reduce(
                        (accumulator, image)=>{
                            if(image.height>accumulator.height) return image
                            return accumulator
                        }, item.album.images[0]
                    )
                    return {
                        artist : item.artists[0].name,
                        title: item.name,
                        uri : item.uri,
                        imageUrl : smallestImg.url
                    }
                }))
            })
    }
    const playTrack = (track) => {
        setTrack(track.uri)
    }
    return (
        <div className="container" style={{top:0}}>
            <div style={{display:'flex'}} className="pt-3">
                <input className="form-control" onChange={handleChange}></input> 
                <button className="btn btn-success" onClick={searchTrack}>Search</button>
            </div>
            {searchResult.length>0&&<ShowTracks searchResult={searchResult} playTrack={playTrack}/>}
            <div style={{position:'sticky',bottom:0}}>
                {accessToken&&<Player accessToken={accessToken} trackUri={track}/>}
            </div>
        </div>

    )
}

export default Home
