jsxvar CommentBox = React.createClass({
	loadCommentsFromServer: function(){
		$.ajax({
		    url: this.props.url,
		    dataType: 'json',
		    cache: false,
		    success: function(data) {
		    // alert(this.state.data); 	
		      this.setState({data: data});
		    }.bind(this),
		    error: function(xhr, status, err) {
		      console.error(this.props.url, status, err.toString());
		    }.bind(this)
	    });
	},
	handleCommentSubmit: function(comment){
		// alert(comment);
		var comments = this.state.data;
		// alert(comments);
		// comment.id = Date.now();
	    var newComments = comments.concat([comment]);
	    // alert(newComments);
	    this.setState({data: newComments});
	    // alert(this.state.data);
		// $.ajax({
	 //      url: this.props.url,
	 //      dataType: 'json',
	 //      type: 'POST',
	 //      data: comment,
	 //      success: function(data) {
	 //        this.setState({data: comment});
	 //      }.bind(this),
	 //      error: function(xhr, status, err) {
	 //        console.error(this.props.url, status, err.toString());
	 //      }.bind(this)
	 //    });
	},
	getInitialState: function(){
		return {
			data: []
		};
	},
	componentDidMount: function() {
	   this.loadCommentsFromServer();
	   setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	},
	render: function(){
		return (
			<div className="commentBox">
				<h1>Comments</h1>
				<CommentList data={this.state.data} />
				<CommentForm onCommentSubmit={this.handleCommentSubmit} />
			</div>
		);
	}
});

var CommentList = React.createClass({

	render: function(){
		var commentNodes = this.props.data.map(function(comment){
			return (
				<Comment author={comment.author}>{comment.text}</Comment>
			);
		});
		return (
			<div className="commentList">
				{commentNodes}
			</div>
		);
	}
});

var CommentForm = React.createClass({
	handleSubmit: function(e){
		e.preventDefault();
		var author = this.refs.author.value.trim();
		var text = this.refs.text.value.trim();
		if (!author || !text) {
			return;
		};
		// alert(author);
		this.props.onCommentSubmit({author: author, text: text});
		this.refs.author.value = "";
		this.refs.text.value = "";
		return;
	},
	render: function(){
		return (
			<form className="commentForm" onSubmit={this.handleSubmit}>
				<input type="text" placeholder="Your name is..." ref="author" />
				<input type="text" placeholder="Say something..."ref="text" />
				<input type="submit" value="Post" />
			</form>
		);
	}
});

var Comment = React.createClass({
	rawMarkup: function(){
		var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
		return {__html: rawMarkup};
	},
	render: function(){
		return (
			<div className="comment">
				<h2>
					{this.props.author}
				</h2>
				<span dangerouslySetInnerHTML={this.rawMarkup()} />
			</div>
		);
	}
});

ReactDOM.render(
	<CommentBox url="comment.json" pollInterval={2000} />,
	document.getElementById('content')
);