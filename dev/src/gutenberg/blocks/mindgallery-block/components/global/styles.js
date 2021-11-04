/**
 * WordPress dependencies
 */
const { getColorClassName } = wp.blockEditor;

/**
 * Background Classes
 */
function GlobalStyles( attributes ) {

	const captionColorClass = getColorClassName( 'color', attributes.captionColor );

	const styles = {
		color: captionColorClass ? undefined : attributes.customCaptionColor,
	};

	return styles;
}

export default GlobalStyles;