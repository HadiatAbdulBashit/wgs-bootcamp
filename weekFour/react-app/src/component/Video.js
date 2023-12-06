function Video({ video }) {
    return (
        <div className="ui segments">
            <div className="ui segment">
                <iframe
                    title={video.snippet.title}
                    width="100%"
                    height='400px'
                    src={`https://www.youtube.com/embed/${video.id.videoId}`}
                    frameBorder="0"
                    allowFullScreen
                ></iframe>
            </div>
            <div className="ui segment">
                <h2>{video.snippet.title}</h2>
                <p>{video.snippet.description}</p>
                <p>By: {video.snippet.channelTitle}</p>
            </div>
        </div>
    );
}

export default Video;