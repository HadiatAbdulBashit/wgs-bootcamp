function VideoThumbnail({ videos, setSelectedVideo }) {
    return (
        <div className="ui items segment">
            {videos.slice(1).map((video) => (
                <div key={video.id.videoId} className='item'>
                    <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} className="ui small image" onClick={setSelectedVideo(video)} />
                    <div className="content">
                        <h4 onClick={setSelectedVideo(video)} >{video.snippet.title}</h4>
                        <p>By: {video.snippet.channelTitle || 'Unknow'}</p>
                        <a href={`https://www.youtube.com/embed/${video.id.videoId}`}>See on Youtube</a>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default VideoThumbnail;