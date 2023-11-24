import { faker } from '@faker-js/faker';
import React from 'react';
import "./App.css";

let dataComments = []

for (let index = 0; index < 10; index++) {
  const randomName = faker.person.fullName();
  const randomAvatar = faker.image.avatar();
  const randomTime = faker.date.recent().toLocaleTimeString();
  const randomDate = faker.date.recent().toLocaleDateString();
  const randomComment = faker.lorem.paragraph();
  const randomLiked = Math.floor(Math.random() * 9101);
  dataComments.push({ name: randomName, avatar: randomAvatar, time: randomTime, date: randomDate, comment: randomComment, liked: randomLiked })
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
    like: false,
    liked: this.props.liked
  };

  handleLikeChange = () => {
    if (this.state.like) {
      this.setState({
        like: !this.state.like,
        liked: this.state.liked-1
      });
    } else {
      this.setState({
        like: !this.state.like,
        liked: this.state.liked+1
      });
    }
  }

  render() {
    return (
      <div className='content'>
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
                <span className="date">
                  {this.props.date}
                </span>
              </div>
              <div className="text">{this.props.comment}</div>
              <div class="ui labeled button" tabindex="0">
                <div class={"ui button " + (this.state.like ? 'red' : '')} onClick={this.handleLikeChange}>
                  <i class={"heart " + (this.state.like ? '' : 'outline') + " icon"}></i> Like
                </div>
                <div class={(this.state.like ? 'ui basic red left pointing label' : "ui basic label")}>
                  {this.state.liked}
                </div>
              </div>
            </div>
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
  }

  render() {
    return this.props.data.map((dataComment, index, like) => (
      <div className="ui card" style={{ width: '100%' }} key={index}>
        <CommentContainer
          avatar={dataComment.avatar}
          name={dataComment.name}
          time={dataComment.time}
          date={dataComment.date}
          comment={dataComment.comment}
          liked={dataComment.liked}
        />
      </div>
    ));
  }
}

function App() {
  return (
    <div className='ui container'>
      <Comment data={dataComments} />
    </div>
  )
}

export default App;
