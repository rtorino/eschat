/** @jsx React.DOM */
'use strict';

define( function( require ) {

	var React   = require( 'React' );
	var RssItem = require( 'jsx!components/RssItem' );

	return React.createClass( {

		'getInitialState' : function () {
			var updateState = function () {
				this.setState( {
					items : _clone( this.props.items.models )
				} );
			};

			this.props.items.on( 'reset', updateState, this );
			this.props.items.on( 'add', updateState, this );
			this.props.items.on( 'remove', updateState, this );

			return { items : _.clone( this.props.items.models ) };
		},

		'render' : function () {
			var items = _.map( this.state.items, function ( item ) {
				return <RssItem item={item} />;
			} );

			return <ul>{items}</ul>;
		}

	} );

} );