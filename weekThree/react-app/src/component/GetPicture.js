import { Component } from "react";
import axios from "axios";

class GetPicture extends Component {
    state = {
        images: [],
        searchTerm: '',
    };

    onSearchSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.get(`https://api.unsplash.com/search/photos`, {
            params: {
                query: this.state.searchTerm,
            },
            headers: {
                Authorization: 'Client-ID 2b98c1afb0aed3b3d94a1866bdc3ac013d21a0c86d236a0fee32355c331c0296'
            },
        });
        this.setState({ images: response.data.results });
    };

    render() {
        return (
            <div>
                <form onSubmit={this.onSearchSubmit} class="ui form">
                        <div class="field">
                            <label>Search Picture</label>
                            <input 
                            type="text" 
                            placeholder="Search..."
                            value={this.state.searchTerm}
                            onChange={(e) => this.setState({ searchTerm: e.target.value })}
                            />
                        </div>
                        <input type="submit" value="Search" class="ui button" />
                </form>
                <ul>
                    {this.state.images.map((image) => (
                        <li key={image.id}>
                            <a href={image.urls.full} target=''>
                                <img src={image.urls.thumb} alt={image.description} />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default GetPicture;