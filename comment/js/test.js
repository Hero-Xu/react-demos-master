var CommentBox = React.createClass({
	getInitialState: function(){
		return{data:[
						{author: "Wangxu", text: "I`m a good man."},
						{author: "Yanglin", text: "I`m a good women."}
					]
			  };
	},
	handleBeSubmit: function(comment){
		var beforeComment = this.state.data;
		var nowComment = beforeComment.concat([comment]);
		this.setState({data: nowComment});
	},
	render: function(){
		return (
			<div id="commentBox">
				<h1>留言板</h1>
				<CommentList data={this.state.data}/>
				<CommentForm beSubmit={this.handleBeSubmit}/>
			</div>
		);
	}
});

var CommentList = React.createClass({
	render: function(){
		return (
			<Comment data={this.props.data}/>
		);
	}
});
var CommentForm = React.createClass({
	handleSubmit: function(e){
		e.preventDefault();
		var author = this.refs.author.value;
		// alert(author);
		var text = this.refs.text.value;
		if (!author || !text) {
			return;
		};
		this.props.beSubmit({author: author, text: text});
		this.refs.author.value="";
		this.refs.text.value="";
		return;
	},
	render: function(){
		return(
			<form className="commentForm" onSubmit={this.handleSubmit}>
				<input type="text" placeholder="Your name is ..." ref="author"/>
				<input type="text" placeholder="Say something..." ref="text"/>
				<input type="submit" value="提交" />
			</form>
		);
	}
});
var Comment = React.createClass({
	render: function(){
		return(
			<div className="comments">
				{this.props.data.map(function(comment){
					return(
						<div className="comment">
							<h2>谁说的：{comment.author}</h2>
							<p><em>{comment.author}说：</em> {comment.text}</p>
						</div>
					);
				})}
			</div>
		);

	}
});
ReactDOM.render(
	<CommentBox/>,
	document.getElementById('content')
);