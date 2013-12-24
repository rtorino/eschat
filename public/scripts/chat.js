/** @jsx React.DOM */
'use strict';

define( function ( require ) {

	var React = require( 'React' );

	var ChatList = require( 'jsx!components/ChatList' );

	var ChatApp = React.createClass({
		mixins: [React.addons.LinkedStateMixin],
		getInitialState: function() {
			return {messages: [], text: ''};
		},
		inputSubmit: function() {
			var message = this.refs.userTextInput.getDOMNode().value;
			var newMessages = this.state.messages.concat([{'message': message}]);
			this.setState({messages: newMessages, text: ''});
		},
		handleInput: function( event ) {
			if (event.keyCode == 13) {
				return this.inputSubmit();
			}
		},
		render: function() {
			return (
				<div>
					<ChatList messages={this.state.messages} />
					<div id="chatterBox">
						<input 
							id="text-input" 
							valueLink={this.linkState('text')}
							ref="userTextInput"
							placeholder="Type in message..."
							onKeyDown={this.handleInput}
						/>
					</div>
				</div>
			);
		}
	});

	React.renderComponent(
		<ChatApp/>,
		document.getElementById('eschat-roomView')
	);

} );