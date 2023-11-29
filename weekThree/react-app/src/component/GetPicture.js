import { Component } from "react";
import axios from "axios";

class GetPicture extends Component {
    constructor(props) {
        super(props);

        // Inisialisasi variabel ref untuk input teks menggunakan callback ref.
        this.textInput = null;

        this.setTextInputRef = element => {
            // Mengatur variabel ref saat elemen telah dipasang.
            this.textInput = element;
        };

        this.focusTextInput = () => {
            // Fungsi untuk memberi fokus pada input teks.
            if (this.textInput) this.textInput.focus();
        };
    }

    componentDidMount() {
        // Memanggil fungsi untuk memberi fokus pada input teks setelah komponen dipasang.
        this.focusTextInput();
    }

    state = {
        images: [],
        searchTerm: '',
    };

    onSearchSubmit = async (event) => {
        // Menghentikan perilaku default formulir dan melakukan pencarian gambar.
        event.preventDefault();
        const response = await axios.get(`https://api.unsplash.com/search/photos`, {
            params: {
                query: this.state.searchTerm,
            },
            headers: {
                // Menambahkan header Authorization untuk mengakses API Unsplash.
                Authorization: 'Client-ID 2b98c1afb0aed3b3d94a1866bdc3ac013d21a0c86d236a0fee32355c331c0296'
            },
        });
        // Memperbarui state dengan hasil pencarian gambar.
        this.setState({ images: response.data.results });
    };

    render() {
        return (
            <div className="get-picture">
                {/* Formulir untuk melakukan pencarian gambar. */}
                <form onSubmit={this.onSearchSubmit} class="ui form text container">
                    <div class="field">
                        <label >Search Picture</label>
                        {/* Input teks dengan fungsi onChange untuk memperbarui state searchTerm. */}
                        <div class="ui icon input">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={this.state.searchTerm}
                                onChange={(e) => this.setState({ searchTerm: e.target.value })}
                                ref={this.setTextInputRef} // Menggunakan ref untuk fokus pada input.
                            />
                            <i class="inverted circular search link icon"></i>
                        </div>
                    </div>
                    {/* Tombol submit untuk memulai pencarian gambar. */}
                    <input type="submit" value="Search" class="ui button" onClick={this.focusTextInput} />
                </form>
                {/* Menampilkan hasil pencarian gambar dalam bentuk grid. */}
                <div className="mansonry">
                    {this.state.images.map((image) => (
                        <a href={image.urls.full} target='_blank' key={image.id}>
                            <img src={image.urls.thumb} alt={image.description} />
                        </a>
                    ))}
                </div>
            </div>
        );
    }
}

export default GetPicture;
