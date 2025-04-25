import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Container } from "@mui/material";

const Loader = () => {
	return (
		<Container
			maxWidth="lg"
			sx={{
				display: 'flex',
				justifyContent: 'center', // Горизонтальное выравнивание
				alignItems: 'center',     // Вертикальное выравнивание
				height: '100vh',          // Высота на весь экран
			}}
		>
			<Box>
				<CircularProgress />
			</Box>
		</Container>
	);
};

export default Loader;