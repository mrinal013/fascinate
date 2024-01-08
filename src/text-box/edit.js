/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	RichText,
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
} from '@wordpress/block-editor';

import { PanelBody, RangeControl } from '@wordpress/components';

import classNames from 'classnames';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param  attributes.attributes
 * @param  attributes
 * @param  setAttributes
 *
 * @param  attributes.setAttributes
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const { text, textAlignment, shadow, shadowOpacity } = attributes;

	const onChangeText = ( newText ) => {
		setAttributes( { text: newText } );
	};

	const onChangeAlignment = ( newAlignment ) => {
		setAttributes( { textAlignment: newAlignment } );
	};

	const toggleShadow = () => {
		setAttributes( { shadow: ! shadow } );
	};

	const onChangeShadowOpacity = ( newShadowOpacity ) => {
		setAttributes( { shadowOpacity: newShadowOpacity } );
	};

	const classes = classNames( `text-box-align-${ textAlignment }`, {
		'has-shadow': shadow,
		[ `shadow-opacity-${ shadowOpacity }` ]: shadow && shadowOpacity,
	} );
	return (
		<>
			<InspectorControls group="styles">
				{ shadow && (
					<PanelBody title={ __( 'Shadow Setting', 'fascinate' ) }>
						<RangeControl
							label={ __( 'Shadow Opacity', 'fascinate' ) }
							onChange={ onChangeShadowOpacity }
							value={ shadowOpacity }
							min={ 10 }
							max={ 40 }
							step={ 10 }
						/>
					</PanelBody>
				) }
			</InspectorControls>
			<BlockControls
				controls={ [
					{
						icon: 'admin-page',
						title: __( 'Shadow', 'fascinated' ),
						onClick: toggleShadow,
					},
				] }
			>
				<AlignmentToolbar
					onChange={ onChangeAlignment }
					value={ textAlignment }
				/>
			</BlockControls>
			<RichText
				{ ...useBlockProps( {
					className: classes,
				} ) }
				onChange={ onChangeText }
				value={ text }
				placeholder={ __( 'Your Text', 'fascinate' ) }
				tagName="p"
				allowedFormats={ [] }
			/>
		</>
	);
}
