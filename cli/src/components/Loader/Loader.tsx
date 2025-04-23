import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {Container} from "@mui/material";

const Loader = () => {
	return (
		<Container maxWidth="lg">
			<Box sx={{ display: 'flex' }}>
				<CircularProgress />
			</Box>
		</Container>
	);
};
export default Loader;
