function Navbar() {
  return (
    <div className="ui large top fixed menu transition visible" style={{ display: 'flex !important'}}>
    <div className="ui container">
      <a href="#" className="item">Home</a>
      <a href="#" className="item">Work</a>
      <a href="#" className="item">Company</a>
      <a href="#" className="active item">Comment</a>
      <div className="right menu">
        <div className="item">
          <a href="#" className="ui button">Log in</a>
        </div>
        <div className="item">
          <a href="#" className="ui primary button">Sign Up</a>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Navbar;
