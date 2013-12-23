/** @jsx React.DOM */

var ChatItem = React.createClass({
	render: function() {
		return (
			<li>{this.props.message}</li>
		);
	}
});

var ChatList = React.createClass({
	render: function() {
		var messages = [];

		this.props.messages.forEach(function( message, i ) {
			messages.push(<ChatItem key={i} message={message} />);
		}.bind(this));

		return (
			<div id="chat-list">
				<ul>{messages}</ul>
			</div>
		);
	}
});

var ChatApp = React.createClass({
	getInitialState: function() {
		return {messages: [], text: ''};
	},
	inputSubmit: function() {
		var message = this.refs.userTextInput.getDOMNode().value;
		var newMessages = this.state.messages.concat([{'message': message}]);
		this.setState({messages: newMessages, text: ''});
	},
	handleInput: function( event ) {
		if (event.nativeEvent.keyCode == 13) {
			return this.inputSubmit();
		}
		this.setState({text: this.refs.userTextInput.getDOMNode().value});
	},
	render: function() {
		return (
			<div>
				<ChatList messages={this.state.messages} />
				<div>
					<input 
						id="text-input" 
						value={this.state.text}
						ref="userTextInput"
						placeholder="Type in message..."
						onChange={this.handleInput}
					/>
					<button onClick={this.inputSubmit}>Send</button>
				</div>
			</div>
		);
	}
});

React.renderComponent(
	<ChatApp/>,
	document.getElementById('chat-area')
);