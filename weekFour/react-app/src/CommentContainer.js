class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }
    render() {
        return this.props.data.map((dataComment, index) => (
            <div className="commentContainer" key={index}>
                <CommentContainer 
                    avatar
                />
            </div>
        ))
    }
}