import React, { useEffect, useState } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'

function Player({accessToken, trackUri}) {
    const [play, setPlay] = useState(false)
    useEffect(()=>{
        setPlay(true)
    },
    [trackUri])
    return (
        <div>
            <SpotifyPlayer
                token={accessToken}
                uris={trackUri?[trackUri]:[]}
                showSaveIcon
                callback={state => {
                    if (!state.isPlaying) setPlay(false)
                  }}
                play={play}
            />
        </div>
    )
}

export default Player
