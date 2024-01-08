import { useBlockProps, RichText } from '@wordpress/block-editor';
import classNames from 'classnames';
import blockData from './block.json';
import { omit } from 'lodash';

const v2 = {
	supports: {
		html: false,
		color: {
			background: true,
			text: true,
			gradients: true,
		},
		typography: {
			fontSize: true,
		},
		spacing: {
			padding: true,
		},
	},
	attributes: {
		...omit( blockData.attributes, [ 'textAlignment' ] ),
		alignment: {
			type: 'string',
			default: 'left',
		},
	},
	migrate: ( attributes ) => {
		return {
			...omit( attributes, [ 'alignment' ] ),
			textAlignment: attributes.alignment,
		};
	},
	save: ( { attributes } ) => {
		const { text, alignment, shadow, shadowOpacity } = attributes;

		const classes = classNames( `text-box-align-${ alignment }`, {
			'has-shadow': shadow,
			[ `shadow-opacity-${ shadowOpacity }` ]: shadow && shadowOpacity,
		} );

		return (
			<RichText.Content
				{ ...useBlockProps.save( {
					className: classes,
				} ) }
				value={ text }
				tagName="p"
			/>
		);
	},
};

export default v2;
