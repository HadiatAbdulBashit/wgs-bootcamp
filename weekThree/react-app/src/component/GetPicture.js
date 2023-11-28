import { Component } from "react";
import axios from "axios";

class GetPicture extends Component {
    constructor(props) {
        super(props);

        this.textInput = null;

        this.setTextInputRef = element => {
            this.textInput = element;
        };

        this.focusTextInput = () => {
            if (this.textInput) this.textInput.focus();
        };
    }

    componentDidMount() {
        this.focusTextInput();
    }

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
                            ref={this.setTextInputRef}
                        />
                    </div>
                    <input type="submit" value="Search" class="ui button" onClick={this.focusTextInput} />
                </form>
                <div className="mansonry">
                    {this.state.images.map((image) => (
                        <a href={image.urls.full} target='_blank' key={image.id}>
                            <img src={image.urls.thumb} alt={image.description} className='rounded-lg mb-4' />
                        </a>
                    ))}
                </div>
            </div>
        );
    }
}

export default GetPicture;