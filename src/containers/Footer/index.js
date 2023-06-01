import { Grid } from 'semantic-ui-react';

/**
 * Componente que muestra el Footer
 */
const Footer = () => {
	return (
		<Grid centered>
			<Grid.Column width={4}>
				{'Copyright © '}
				{new Date().getFullYear()}
			</Grid.Column>
		</Grid>
	);
};

export default Footer;
