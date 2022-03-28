/*jshint esversion: 9 */

import * as element from '@wordpress/element';
import { PanelBody, PanelRow, Placeholder, Spinner, BaseControl, Button  } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import React from 'react';

const { Component, Fragment, render } = element;



class App extends Component {

	constructor () {

		super( ...arguments );

		this.changeOptions = this.changeOptions.bind( this );

		this.state = {
			isAPILoaded: false,
			isAPISaving: false,
			mindgallery_react_mode : false,
		};
	}

	componentDidMount () {

		wp.api.loadPromise.then( () => {

			this.settings = new wp.api.models.Settings();

			if ( false === this.state.isAPILoaded ) {

				this.settings.fetch().then( ( response ) => {
          console.log(response)
					this.setState( {
						mindgallery_react_mode: response.mindgallery_react_mode,
						isAPILoaded: true,
					} );
				} );
			}
		} );
	}

	changeOptions ( option, value ) {
		console.log( 'option is '+option );
		console.log( 'value is '+value );
		this.setState( { isAPISaving: true } );

		const model = new wp.api.models.Settings( {
			[option]: value,
		} );

		console.log( model );

		model.save().then( ( response) => {

			this.setState( {
				[option]: response[option],
				isAPISaving: false,
			} );
		} );
	}

	render () {

    const textDomain = 'wm_mindgallery';

		if ( !this.state.isAPILoaded ) {
			return (
				<Placeholder>
					<Spinner />
				</Placeholder>
			);
		}

		return (
			<Fragment>
				<div className="wmsubscribe-header">
					<div className="wmsubscribe-container">
						<div className="wmsubscribe-logo">
							<h1>{__( 'Guttenberg friendly options' )}</h1>
						</div>
					</div>
				</div>

				<div className="wmsubscribe-main">
					<PanelBody title={__( 'Settings' )}>
						<PanelRow>
							<BaseControl
								label={__( 'Use new Frontend', textDomain )}
								help={
									__( 'Check if new React frontend is allowed.', textDomain )
								}
								id="wms-options-privacy-api"
								className="wmsubscribe-text-field"
							>
								<input
									type="checkbox"
									checked={this.state.mindgallery_react_mode}
									placeholder={__( 'Use New Design', textDomain )}
									disabled={this.state.isAPISaving}
									onChange={( e ) =>
										this.setState( { mindgallery_react_mode: e.target.checked } )
									}
								/>
							</BaseControl>
							<div className="wmsubscribe-text-field-button-group">
								<Button
									className={'button button-primary'}
									disabled={this.state.isAPISaving}
									onClick={() =>
										this.changeOptions(
											'mindgallery_react_mode',
											this.state.mindgallery_react_mode
										)
									}
								>
									{__( 'Save', textDomain )}
								</Button>
							</div>
						</PanelRow>
					</PanelBody>
				</div>
			</Fragment>
		);
	}
}

document.addEventListener( 'DOMContentLoaded', () => {
	render( <App/>, document.getElementById( 'mindgallery-options-wrapper' ) );
} );

console.log( 'JEDEEMEEEEEEEEEEE' );
