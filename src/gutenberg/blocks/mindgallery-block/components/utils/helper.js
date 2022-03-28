/*jshint esversion: 9 */

/**
 * External dependencies
 */
import pick from 'lodash/pick';
import get from 'lodash/get';

export function overlayToClass( ratio ) {
	return ( ratio === 0 || ratio === 50 ) ?
		null :
		'has-background-overlay-' + ( 10 * Math.round( ratio / 10 ) );
}

export const pickRelevantMediaFiles = ( image ) => {
	
	/*let srcset = '';
	const sizes = Object.values(image.sizes);
	sizes.map((size)=>{
		srcset += size.url + ' '+size.width+'w,'
	});*/
	//console.log(getMedia(image.id));
	const imageProps = pick( image, [ 'alt', 'id', 'link', 'caption' ] );

	imageProps.url = get( image, [ 'sizes', 'large', 'url' ] ) || get( image, [ 'media_details', 'sizes', 'large', 'source_url' ] ) || image.url;
	//imageProps.srcset = srcset;*/

	return imageProps;
};

export const prepareSrceSetAndSizes = ( image ) => {

	let srcset = '';

	console.log( 'helper.js - image raw all data');
	console.log( image );

	for (const [size, size_object] of Object.entries( image.media_details.sizes )) {
		console.log(`${size}: ${size_object}`);
		srcset += size_object.source_url + ' ' + size_object.width +'w, ';
	  }
	  
	
	/*for (let size in image.media_details.sizes ) {
		if (Object.prototype.hasOwnProperty.call(obj, size)) {
			srcset += size.source_url + ' ' + size.width +'w, ';
		}
	}*/

	return { sizes: '100vw', srcset: srcset };
};

export const ALLOWED_MEDIA_TYPES = [ 'image' ];


