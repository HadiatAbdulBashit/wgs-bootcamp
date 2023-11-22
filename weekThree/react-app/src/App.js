import "./App.css";

const identitas = (nama, pekerjaan) => {
  return (
    <>
      <h1>Hai nama saya {nama}</h1>
      <h2>Pekerjaan saya {pekerjaan}</h2>
    </>
  )
}

function App() {
  return (
    <>
      <h1>{new Date().toLocaleTimeString()}</h1>
      {identitas('Hadiat', 'Tidur')}
      {identitas('Abdul', 'Makan')}
    </>
  )
}

export default App;
