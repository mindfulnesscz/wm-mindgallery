/*jshint esversion: 9 */

const { withSelect } = wp.data;
const { compose } = wp.compose;
const { Component } = wp.element;

export default class MindImage extends Component {
	constructor() {
		super( ...arguments );

	}    

	render(){

		console.log('MindImage - save image data');

		const { image } = this.props;

		console.log ( image );


		return (
			<image 
				className	= {'orbit-image'}
				src			= { image.url }
				alt			= { image.alt } 
				data-id		= { image.id }
				i_w			= { image.i_w } 
				i_h			= { image.i_h }
				description	= { image.description }
				title		= { image.title }
				srcset		= { image.srcset }
				sizes		= { image.sizes }
			>
	
			</image>
		)
	}


};
