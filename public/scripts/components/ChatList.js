/** @jsx React.DOM */
'use strict';

define( function( require ) {

	var React = require( 'React' );

	var ChatItem = require( 'jsx!components/ChatItem' );

	var ChatList = React.createClass({
		componentDidUpdate: function() {
			document.getElementById('chatList').scrollTop = 999999;
		},
		render: function() {
			var messages = [];

			this.props.messages.forEach(function( message, i ) {
				messages.push(<ChatItem key={i} message={message} />);
			}.bind(this));

			return (
				<div id="chatList">
					<ul>{messages}</ul>
				</div>
			);
		}
	} );

	return ChatList;
} );