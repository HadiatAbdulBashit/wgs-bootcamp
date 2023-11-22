import { faker } from '@faker-js/faker';
import "./App.css";

const randomName = faker.person.fullName();
const randomAvatar = faker.image.avatar();
const randomTime = faker.date.recent().toLocaleTimeString();
const randomComment = faker.lorem.paragraph();
console.log(randomTime);

function App() {
  return (
    <div className="ui container comments">
      <div className="comment">
        <a href="/" className="avatar">
          <img src={randomAvatar} alt="avatar" />
        </a>
        <div className="content">
          <a href="/" className="author">
            {randomName}
          </a>
          <div className="metadata">
            <span className="date">{randomTime}</span>
          </div>
          <div className="text">{randomComment}</div>
        </div>
      </div>
    </div>
  )
}

export default App;
