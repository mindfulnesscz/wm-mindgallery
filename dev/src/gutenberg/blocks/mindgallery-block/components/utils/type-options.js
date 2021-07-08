/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Link options.
 */
const typeOptions = [
	{ value: 'lightbox', label: __( 'Light Box' ) },
	{ value: 'standard', label: __( 'Standard' ) },
	{ value: 'background', label: __( 'Background' ) },
];

export default typeOptions;