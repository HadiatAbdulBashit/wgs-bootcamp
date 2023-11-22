import "./App.css";

function App() {
  return (
    <div className="ui container comments">
      <div className="comment">
        <a href="/" className="avatar">
          <img alt="avatar" />
        </a>
        <div className="content">
          <a href="/" className="author">
            Hadiat
          </a>
          <div className="metadata">
            <span className="date">Today at 8.00AM</span>
          </div>
          <div className="text">test Comment</div>
        </div>
      </div>
    </div>
  )
}

export default App;
