/**
 * Internal dependencies
 */
import linkOptions from './utils/link-options';



/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { withSelect } = wp.data;
const { InspectorControls, withFontSizes } = wp.blockEditor;
const { PanelBody, ToggleControl, SelectControl } = wp.components;

/**
 * Inspector controls
 */
class Inspector extends Component {

	constructor ( props ) {

		super ( ...arguments );

		this.setLinkTo = this.setLinkTo.bind( this );

		this.setTypeTo = this.setTypeTo.bind( this );
	}

	setLinkTo ( value ) {

		this.props.setAttributes( { linkTo: value } );

	}

	setTypeTo ( value ) {

		this.props.setAttributes( { typeTo: value } );

	}

	render() {

		const {
			attributes,
			setAttributes,
			isSelected,
		} = this.props;

		const {
			linkTo,
			controls,

		} = attributes;

		return (
			isSelected && (
				<Fragment>
					<InspectorControls>
						<PanelBody
							title={ __( 'Control Settings' ) }
							initialOpen={ false }
							>
							<ToggleControl
								label={ __( 'Controls' ) }
								checked={ !! controls }
								onChange={ () => setAttributes( {  controls: ! controls } ) }
								help={ this.getCaptionsHelp }
							/>
						</PanelBody>
						<PanelBody
							title={ __( 'Link Settings' ) }
							initialOpen={ false }
							>
							<SelectControl
								label={ __( 'Link To' ) }
								value={ linkTo }
								options={ linkOptions }
								onChange={ this.setLinkTo }
							/>
						</PanelBody>
					</InspectorControls>
				</Fragment>
			)
		)
	}
};

export default compose( [
	withSelect( ( select ) => ( {
		wideControlsEnabled: select( 'core/editor' ).getEditorSettings().alignWide,
	} ) ),
	withFontSizes( 'fontSize' ),
] )( Inspector );
