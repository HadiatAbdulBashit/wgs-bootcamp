import { faker } from '@faker-js/faker';
import React from 'react';
import "./App.css";

let dataComments = []

for (let index = 0; index < 10; index++) {
  const randomName = faker.person.fullName();
  const randomAvatar = faker.image.avatar();
  const randomTime = faker.date.recent().toLocaleTimeString();
  const randomComment = faker.lorem.paragraph();
  dataComments.push({ name: randomName, avatar: randomAvatar, time: randomTime, comment: randomComment, like: 0 })
}

// console.log(data);  

// function App() {
//   return (
//     <div className="ui container comments">
//       <div className="comment">
//         <a href="/" className="avatar">
//           <img src={data.avatar} alt="avatar" />
//         </a>
//         <div className="content">
//           <a href="/" className="author">
//             {data.name}
//           </a>
//           <div className="metadata">
//             <span className="date">{data.time}</span>
//           </div>
//           <div className="text">{data.comment}</div>
//         </div>
//       </div>
//     </div>
//   )
// }

class CommentContainer extends React.Component {
  state = {
    like: this.props.like,
  };

  handleLikeChange = () => {
    this.setState(prevState => {
      return {
        like: prevState.like + 1
      };
    });
    // console.log(this.state.like);
  }

  render() {
    return (
      <div className="ui container comments">
        <div className="comment">
          <a href="/" className="avatar">
            <img src={this.props.avatar} alt="avatar" />
          </a>
          <div className="content">
            <a href="/" className="author">
              {this.props.name}
            </a>
            <div className="metadata">
              <span className="date">{this.props.time}</span>
              <span>| Liked: {this.state.like}</span>
            </div>
            <div className="text">{this.props.comment}</div>
            <button onClick={this.handleLikeChange}>Like</button>
          </div>
        </div>
      </div>
    )
  }
}

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    }
    // console.log(this.props.data);
  }

  render() {
    return this.props.data.map((dataComment, index, like) => (
      <div className="commentContainer" key={index}>
        <CommentContainer
          avatar={dataComment.avatar}
          name={dataComment.name}
          time={dataComment.time}
          comment={dataComment.comment}
          like={dataComment.like}
        />
      </div>
    ));
  }
}

function App () {
  // console.log(dataComments);
  return <Comment data={dataComments} />
}

export default App;
