/** @jsx React.DOM */
'use strict';

define( function( require ) {

	var React = require( 'React' );

	var ChatItem = React.createClass( {
		render: function() {
			return (
				<li> {this.props.message} </li>
			);
		}
	} );

	return ChatItem;
} );