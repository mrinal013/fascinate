import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const { name, bio, url, alt, id } = attributes;
	return (
		<div
			{ ...useBlockProps.save( {
				className: `wp-block-fascinate-block-team-member`,
			} ) }
		>
			{ url && (
				<img
					src={ url }
					alt={ alt }
					className={ id ? `wp-image-${ id }` : null }
				/>
			) }
			<RichText.Content tagName="h4" value={ name } />
			<RichText.Content tagName="p" value={ bio } />
		</div>
	);
}
