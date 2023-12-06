import React, { Component } from 'react';

class ShowName extends Component {
    constructor(props) {
      super(props);
      // Inisialisasi state dengan nilai awal kosong untuk menyimpan nilai input pengguna.
      this.state = {value: ''};
  
      // Binding fungsi-fungsi agar dapat diakses dengan benar di dalam metode render.
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    // Fungsi ini dipanggil setiap kali nilai input berubah.
    handleChange(event) {
      // Perbarui state dengan nilai input terbaru.
      this.setState({value: event.target.value});
    }
  
    // Fungsi ini dipanggil saat formulir disubmit.
    handleSubmit(event) {
      // Tampilkan pop-up alert dengan nama yang dimasukkan oleh pengguna.
      alert('Your name: ' + this.state.value);
      // Menghentikan perilaku default formulir agar halaman tidak di-refresh.
      event.preventDefault();
    }
  
    render() {
      return (
        // Formulir dengan input teks dan tombol submit.
        <form onSubmit={this.handleSubmit} className='ui search'>
          <div className="ui icon input">
            {/* Input teks yang nilainya diatur oleh state dan memanggil handleChange saat berubah. */}
            <input type="text" value={this.state.value} onChange={this.handleChange} placeholder='Name...'/>
            <i class="search icon"></i>
          </div>
          {/* Tombol submit untuk mengirim formulir. */}
          <input type="submit" value="Submit" className='ui primary button'/>
        </form>
      );
    }
  }

// Ekspor komponen ShowName agar dapat digunakan di file lain.
export default ShowName;
