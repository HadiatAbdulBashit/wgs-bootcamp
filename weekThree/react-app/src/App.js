import { faker } from '@faker-js/faker';
import "./App.css";

const randomName = faker.person.fullName();
const randomAvatar = faker.image.avatar();
const randomTime = faker.date.recent().toLocaleTimeString();
const randomComment = faker.lorem.paragraph();

const data = {
  name: randomName,
  avatar: randomAvatar,
  time: randomTime,
  comment: randomComment
}

function App() {
  return (
    <div className="ui container comments">
      <div className="comment">
        <a href="/" className="avatar">
          <img src={data.avatar} alt="avatar" />
        </a>
        <div className="content">
          <a href="/" className="author">
            {data.name}
          </a>
          <div className="metadata">
            <span className="date">{data.time}</span>
          </div>
          <div className="text">{data.comment}</div>
        </div>
      </div>
    </div>
  )
}

export default App;
