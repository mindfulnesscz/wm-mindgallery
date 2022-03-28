/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;

const { withSelect } = wp.data;



/**
 * Gallery Image Component
 */
class GalleryImageOutput extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {

		const {
			alt,
			caption,
			id,
			url,
			srcset,

		} = this.props;

		let title = '';
		let description = '';

		if(this.props.image){
			title = this.props.image.title.raw ;
			description = this.props.image.description.raw;
		}
		
		console.log('IMAAAAGE OUTPUT');
		console.log(title);

		const href = '';

		const imgClasses = classnames( {
			'mindgallery-image' : true
		} );

		/*const img = (
			
			<fragment>
					<img
					src={ url }
					data-id={ id }
					data-link={ 'ahoj' }
					srcset= { srcset }
					title= { title }
					description= { description }
					className={ imgClasses }
					alt={ alt }
					tabIndex={ 0 } />
			</fragment>
		);*/

		//const img = <img src={ url } srcset={ srcset } alt={ alt } data-id={ id } data-link={ 'ahoj' } className={ imgClasses } />;

		// Disable reason: Each block can be selected by clicking on it and we should keep the same saved markup
		/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events */
		return (
			<figure className={ 'blockgallery--figure ' } tabIndex="-1" >
			</figure>
		);
		/* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events */
	}
}



export default withSelect( (select, ownProps ) => {
	const { getMedia } = select( 'core ');

	return {
	  image: getMedia(ownProps)
	}
  })(PostList)
