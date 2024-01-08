import { useBlockProps, RichText } from '@wordpress/block-editor';
import classNames from 'classnames';
import blockData from './block.json';

const v1 = {
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
		...blockData.attributes,
		text: {
			type: 'string',
			source: 'html',
			selector: 'h4',
		},
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
				tagName="h4"
			/>
		);
	},
};

export default v1;
