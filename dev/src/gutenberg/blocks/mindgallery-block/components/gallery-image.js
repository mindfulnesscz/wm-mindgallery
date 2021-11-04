/*jshint esversion: 9 */

/**
 * External Dependencies
 */
 import classnames from 'classnames';
 import * as helper from './utils/helper';
 
 /**
  * WordPress dependencies
  */
 const { __ } = wp.i18n;
 const { Component, Fragment } = wp.element;
 const { compose } = wp.compose;
 const { IconButton, Spinner } = wp.components;
 const { RichText } = wp.blockEditor;
 const { withSelect } = wp.data;
 const { BACKSPACE, DELETE } = wp.keycodes;
 const { isBlobURL } = wp.blob;
 
 /**
  * Gallery Image Component
  */
 class GalleryImage extends Component {
	 constructor() {
		 super( ...arguments );
 
		 this.onImageClick = this.onImageClick.bind( this );
		 this.onSelectCaption = this.onSelectCaption.bind( this );
		 this.onKeyDown = this.onKeyDown.bind( this );
		 this.bindContainer = this.bindContainer.bind( this );
 
		 this.state = {
			 captionSelected: false,
			 captionFocused: false,
		 };
	 }
 
	 bindContainer( ref ) {
		 this.container = ref;
	 }
 
	 onSelectCaption() {
		 if ( ! this.state.captionSelected ) {
			 this.setState( {
				 captionSelected: true,
			 } );
		 }
 
		 if ( ! this.props.isSelected ) {
			 this.props.onSelect();
		 }
	 }
 
	 onImageClick() {
		 if ( ! this.props.isSelected ) {
			 this.props.onSelect();
		 }
 
		 if ( this.state.captionSelected ) {
			 this.setState( {
				 captionSelected: false,
				 captionFocused: false,
			 } );
		 }
	 }
 
	 onKeyDown( event ) {
		 if (
			 this.container === document.activeElement &&
			 this.props.isSelected && [ BACKSPACE, DELETE ].indexOf( event.keyCode ) !== -1
		 ) {
			 event.stopPropagation();
			 event.preventDefault();
			 this.props.onRemove();
		 }
	 }
 
	 componentDidUpdate( prevProps ) {
		 const { isSelected, image, url, i_w, edited } = this.props;
 
		 if ( image && ! edited ) {
 
			 const mind_image_data = helper.prepareSrceSetAndSizes(image);
			 
			 this.props.setAttributes( {
				 i_w			: image.media_details.width,
				 i_h			: image.media_details.height,
				 description	: image.description.raw,
				 title		: image.title.raw,
				 edited		: 'touched',
				 sizes		: mind_image_data.sizes,
				 srcset		: mind_image_data.srcset,
			 } );
		 }
 
 
		 // unselect the caption so when the user selects other image and comeback
		 // the caption is not immediately selected
		 if ( this.state.captionSelected && ! isSelected && prevProps.isSelected ) {
			 this.setState( {
				 captionSelected: false,
				 captionFocused: false,
			 } );
		 }
	 }
 
	 render() {
 
		 const {
			 alt,
			 caption,
			 fontSize,
			 gutter,
			 gutterMobile,
			 id,
			 isSelected,
			 link,
			 linkTo,
			 marginBottom,
			 marginLeft,
			 marginRight,
			 marginTop,
			 onRemove,
			 setAttributes,
			 shadow,
			 supportsCaption,
			 url,
			 srcset,
			 captions,
			 'aria-label': ariaLabel,
		 } = this.props;
 
		 let href;
 
	 
 
		 switch ( linkTo ) {
			 case 'media':
				 href = url;
				 break;
			 case 'attachment':
				 href = link;
				 break;
		 }
 
		 const imgClasses = classnames( 
			 'orbit-image', {
			 'mindgallery-image' : true
		 } );
 
		 // Disable reason: Image itself is not meant to be
		 // interactive, but should direct image selection and unfocus caption fields
		 // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
 
		 const img = (
			 // Disable reason: Image itself is not meant to be interactive, but should
			 // direct image selection and unfocus caption fields.
			 /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
			 <Fragment>
				 <img
					 src={ url }
					 className={ imgClasses }
					 alt={ alt }
					 data-id={ id }
					 onClick={ this.onImageClick }
					 tabIndex="0"
					 onKeyDown={ this.onImageClick }
					 aria-label={ ariaLabel }
				 />
				 { isBlobURL( url ) && <Spinner /> }
			 </Fragment>
			 /* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
		 );
 
		 const className = classnames( {
			 'is-selected': isSelected,
			 'is-transient': url && 0 === url.indexOf( 'blob:' ),
			 [ `has-margin-top-${ gutter }` ] : marginTop && gutter > 0,
			 [ `has-margin-top-mobile-${ gutterMobile }` ] : marginTop && gutterMobile > 0,
			 [ `has-margin-right-${ gutter }` ] : marginRight && gutter > 0,
			 [ `has-margin-right-mobile-${ gutterMobile }` ] : marginRight && gutterMobile > 0,
			 [ `has-margin-bottom-${ gutter }` ] : marginBottom && gutter > 0,
			 [ `has-margin-bottom-mobile-${ gutterMobile }` ] : marginBottom && gutterMobile > 0,
			 [ `has-margin-left-${ gutter }` ] : marginLeft && gutter > 0,
			 [ `has-margin-left-mobile-${ gutterMobile }` ] : marginLeft && gutterMobile > 0,
		 } );
 
		 const captionStyles = {
			 fontSize: fontSize ? fontSize + 'px' : undefined,
		 };
 
		 // Disable reason: Each block can be selected by clicking on it and we should keep the same saved markup
		 /* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events */
		 return (
			 <figure className={ 'blockgallery--figure orbit-figure ' + className } tabIndex="-1" onKeyDown={ this.onKeyDown } ref={ this.bindContainer }>
				 { isSelected &&
					 <div className="components-blockgallery-gallery-item__remove-wrapper">
						 <IconButton
							 icon="no-alt"
							 onClick={ onRemove }
							 className="components-blockgallery-gallery-item__remove-button"
							 label={ __( 'Remove Image' ) }
						 />
					 </div>
				 }
				 { href ? <a href={ href }>{ img }</a> : img }
				 { ( supportsCaption === true ) && ( ! RichText.isEmpty( caption ) || isSelected ) && captions ? (
					 <RichText
						 tagName="figcaption"
						 placeholder={ __( 'Write caption…' ) }
						 className="blockgallery--caption orbit-caption"
						 style={ captionStyles }
						 value={ caption }
						 isSelected={ this.state.captionSelected }
						 onChange={ ( newCaption ) => setAttributes( { caption: newCaption } ) }
						 unstableOnFocus={ this.onSelectCaption }
						 inlineToolbar
					 />
				 ) : null }
			 </figure>
		 );
		 /* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events */
	 }
 }
 
 export default compose( [
	 withSelect( ( select, ownProps ) => {
		 const { getMedia } = select( 'core' );
		 const { id } = ownProps;
 
		 return {
			 image: id ? getMedia( id ) : null,
		 };
	 } ),
 ] )( GalleryImage );
 