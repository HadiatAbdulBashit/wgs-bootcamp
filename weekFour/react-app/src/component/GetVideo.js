import { useState } from "react";
import axios from "axios";
import Video from "./Video";
import VideoThumbnail from "./VideoThumbnail";

function GetVideo() {
    const [query, setQuery] = useState('');
    const [videos, setVideos] = useState([]);

    const searchYouTube = async () => {
        try {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    part: 'snippet',
                    maxResults: 5,
                    q: query,
                    key: 'AIzaSyDWzLBOPdSMmJxgPbq9yLtzqTG8IzFg93c',
                },
            });

            setVideos(response.data.items);
        } catch (error) {
            console.error('Error fetching data from YouTube:', error);
        }
    };
    console.log(videos);

    return (
        <div style={{ display: 'grid', gap: '10px' }}>
            <h1>YouTube Video Search</h1>
            <div className="ui fluid action input">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search videos..."
                />
                <button onClick={searchYouTube} className="ui button">Search</button>
            </div>
            <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: '2fr 1fr' }}>
                {
                    videos.length > 0 && (
                        <>
                            {/* Video pertama dengan ukuran besar */}
                            <div>
                                <div class="ui segments">
                                    <div class="ui segment">
                                        <iframe
                                            title={videos[0].snippet.title}
                                            width="100%"
                                            height='400px'
                                            src={`https://www.youtube.com/embed/${videos[0].id.videoId}`}
                                            frameBorder="0"
                                            allowFullScreen
                                            name="iframe_video1"
                                        ></iframe>
                                    </div>
                                    <div class="ui segment">
                                        <h2>{videos[0].snippet.title}</h2>
                                        <p>{videos[0].snippet.description}</p>
                                        <p>By: {videos[0].snippet.channelTitle}</p>
                                    </div>
                                </div>
                            </div>
                            {/* Video lainnya dengan ukuran kecil di sebelah kanan */}
                            <div>
                                <div className="ui items segment">
                                    {videos.slice(1).map((video) => (
                                        <a href={`https://www.youtube.com/embed/${video.id.videoId}`} target="iframe_video1" key={video.id.videoId} className='item'>
                                            <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} className="ui small image" />
                                            <div className="content">
                                                <h3>{video.snippet.title}</h3>
                                                <p>By: {videos[0].snippet.channelTitle}</p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </>
                    )
                }
            </div>

        </div>
    );
}

export default GetVideo;