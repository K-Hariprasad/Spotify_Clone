import React from 'react'

function ShowTracks({searchResult, playTrack}) {
    const handlePlay = (item) => {
        console.log(item)
        playTrack(item)
    }
    return (
        <div className="container" style={{display:'flex', flexWrap:'wrap',justifyContent:'space-around',boxShadow:'0 8px 16px 0 rgba(0,0,0,0.2)'}}>
            {searchResult.map((item,key)=>(
                <div className="card m-4" style={{width: "18rem",boxShadow:'0 8px 16px 0 rgba(0,0,0,0.2)'}}>
                <img className="card-img-top" src={item.imageUrl} alt="Card image cap"/>
                <div className="card-body" style={{display:'flex'}}>
                  <div style={{flexGrow:'8'}}>
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.artist}</p>
                  </div>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexGrow:'2',color:'green'}}>
                    <span onClick={()=>handlePlay(item)} className="material-icons" style={{cursor:'pointer'}}>
                      play_circle
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
    )
}

export default ShowTracks
