import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Container } from "@mui/material";

const Loader = () => {
	return (
		<Container
			maxWidth="lg"
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
			}}
		>
			<Box>
				<CircularProgress />
			</Box>
		</Container>
	);
};

export default Loader;