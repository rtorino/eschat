/** @jsx React.DOM */
'use strict';

define( function( require ) {

	var React = require( 'react' );
	var _     = require( 'underscore' );

	return React.createClass( {
		'getInitialState' : function () {
			this.props.item.on( 'change', function ( model ) {
				this.setState( {
					'item' : _.clone( model.attributes )
				} );
			} );

			return { 'item' : _.clone( this.props.item.attributes ) };
		},

		'render' : function () {
			return <li>{this.state.item.text}</li>;
		}

	} );

} );