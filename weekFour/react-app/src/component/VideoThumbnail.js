function VideoThumbnail({ video }) {
    return (
        <div className="ui card full-width">
            <h2>{video.snippet.title}</h2>
            <p>{video.snippet.description}</p>
            <iframe
                title={video.snippet.title}
                width="100%"
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                frameborder="0"
                allowfullscreen
            ></iframe>
        </div>
    );
}

export default VideoThumbnail;