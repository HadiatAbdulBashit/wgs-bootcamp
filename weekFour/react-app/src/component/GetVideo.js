import { useEffect, useState } from "react";
import axios from "axios";
import Video from "./Video";
import VideoThumbnail from "./VideoThumbnail";

function GetVideo() {
    const [query, setQuery] = useState('');
    const [selectedVideo, setSelectedVideo] = useState({})
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        searchYouTube()
    },[])

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

            setSelectedVideo(response.data.items[0])
            setVideos(response.data.items);
        } catch (error) {
            console.error('Error fetching data from YouTube:', error);
        }
    };

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
            <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: '6fr 3fr' }}>
                {
                    videos.length > 0 && (
                        <>
                            <div>
                                <Video video={selectedVideo} />
                            </div>
                            <div>
                                <VideoThumbnail videos={videos} setSelectedVideo={setSelectedVideo} />
                            </div>
                        </>
                    )
                }
            </div>

        </div>
    );
}

export default GetVideo;