import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {
    AppBar,
    Box,
    Button,
    createTheme,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    TextField,
    ThemeProvider,
    Toolbar,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import {
    AccountCircle as AccountIcon,
    Brightness4 as DarkModeIcon,
    Brightness7 as LightModeIcon,
    Help as HelpIcon,
    HowToReg as RegisterIcon,
    Login as LoginIcon,
    Logout as LogoutIcon,
    Menu as MenuIcon,
    Translate as LanguageIcon
} from '@mui/icons-material';
import {Dropbox} from "dropbox";

const Navbar = () => {
    const {t, i18n} = useTranslation();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [ticketDialogOpen, setTicketDialogOpen] = useState(false);
    const [summary, setSummary] = useState('');
    const [priority, setPriority] = useState('Average');

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, [navigate]);

    const handleLanguageChange = (lang: string) => {
        i18n.changeLanguage(lang);
        setAnchorEl(null);
        setMobileOpen(false);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login');
        setMobileOpen(false);
    };

    const navigateTo = (path: string) => {
        navigate(path);
        setMobileOpen(false);
    };


    const handleSubmitTicket = async () => {
        const user = "Current User";
        const currentPath = window.location.href;
        const template = "Some Template";

        const jsonData = {
            "Reported by": user,
            "Template": template,
            "Link": currentPath,
            "Priority": priority,
            "Summary": summary,
        };

        try {
            const dbx = new Dropbox({
                accessToken: import.meta.env.VITE_DROPBOX_ACCESS_TOKEN, // Используйте переменные окружения
                fetch: window.fetch.bind(window) // Явное указание fetch
            });

            const filePath = `/UploadedFiles/ticket_${Date.now()}.json`;

            try {
                await dbx.filesCreateFolderV2({ path: '/UploadedFiles' });
            } catch (folderError) {
                if (!folderError?.error?.error?.path?.error?.['.tag'] === 'conflict') {
                    console.error('Folder creation error:', folderError);
                }
            }

            // Загружаем файл
            const response = await dbx.filesUpload({
                path: filePath,
                contents: JSON.stringify(jsonData, null, 2),
                mode: { '.tag': 'add' },
                autorename: true,
                mute: false
            });

            console.log('File uploaded:', response.result);
            alert('Support ticket uploaded to Dropbox!');
        } catch (error) {
            console.error('Dropbox upload error:', error);
            alert(`Failed to upload ticket: ${error.message}`);
        } finally {
            setTicketDialogOpen(false);
            setSummary('');
            setPriority('Average');
        }
    };


    const appTheme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
        },
    });

    const drawer = (
        <Box sx={{width: 250}} role="presentation">
            <List>
                <ListItem button onClick={handleMenuOpen}>
                    <ListItemIcon><LanguageIcon/></ListItemIcon>
                    <ListItemText primary={t('language')}/>
                </ListItem>
                <ListItem button onClick={toggleDarkMode}>
                    <ListItemIcon>{darkMode ? <LightModeIcon/> : <DarkModeIcon/>}</ListItemIcon>
                    <ListItemText primary={darkMode ? t('lightMode') : t('darkMode')}/>
                </ListItem>
                <Divider/>
                {isAuthenticated ? (
                    <>
                        <ListItem button onClick={() => navigateTo('/profile')}>
                            <ListItemIcon><AccountIcon/></ListItemIcon>
                            <ListItemText primary={t('profile')}/>
                        </ListItem>
                        <ListItem button onClick={handleLogout}>
                            <ListItemIcon><LogoutIcon/></ListItemIcon>
                            <ListItemText primary={t('logout')}/>
                        </ListItem>
                    </>
                ) : (
                    <>
                        <ListItem button onClick={() => navigateTo('/login')}>
                            <ListItemIcon><LoginIcon/></ListItemIcon>
                            <ListItemText primary={t('login')}/>
                        </ListItem>
                        <ListItem button onClick={() => navigateTo('/register')}>
                            <ListItemIcon><RegisterIcon/></ListItemIcon>
                            <ListItemText primary={t('register')}/>
                        </ListItem>
                    </>
                )}
            </List>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={() => handleLanguageChange('en')}>English</MenuItem>
                <MenuItem onClick={() => handleLanguageChange('ru')}>Русский</MenuItem>
            </Menu>
        </Box>
    );

    return (
        <ThemeProvider theme={appTheme}>
            <AppBar position="static" color="primary">
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                    {isMobile && (
                        <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{mr: 2}}>
                            <MenuIcon/>
                        </IconButton>
                    )}

                    <Typography
                        variant="h6"
                        component="div"
                        sx={{cursor: 'pointer'}}
                        onClick={() => navigate('/')}
                    >
                        {t('appName')}
                    </Typography>

                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Tooltip title={t('createSupportTicket') || 'Create support ticket'}>
                            <IconButton color="inherit" onClick={() => setTicketDialogOpen(true)}>
                                <HelpIcon/>
                            </IconButton>
                        </Tooltip>

                        {!isMobile && (
                            <>
                                <IconButton color="inherit" onClick={handleMenuOpen}>
                                    <LanguageIcon/>
                                </IconButton>
                                <IconButton color="inherit" onClick={toggleDarkMode}>
                                    {darkMode ? <LightModeIcon/> : <DarkModeIcon/>}
                                </IconButton>
                                {isAuthenticated ? (
                                    <>
                                        <Button color="inherit" onClick={() => navigate('/profile')}
                                                startIcon={<AccountIcon/>}>
                                            {t('profile')}
                                        </Button>
                                        <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon/>}>
                                            {t('logout')}
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button color="inherit" onClick={() => navigate('/login')}
                                                startIcon={<LoginIcon/>}>
                                            {t('login')}
                                        </Button>
                                        <Button color="inherit" onClick={() => navigate('/register')}
                                                startIcon={<RegisterIcon/>}>
                                            {t('register')}
                                        </Button>
                                    </>
                                )}
                            </>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
                {drawer}
            </Drawer>

            <Dialog open={ticketDialogOpen} onClose={() => setTicketDialogOpen(false)}>
                <DialogTitle>{t('createSupportTicket') || 'Create Support Ticket'}</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label={t('summary') || 'Summary'}
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        select
                        label={t('priority') || 'Priority'}
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        margin="normal"
                        SelectProps={{native: true}}
                    >
                        <option value="High">High</option>
                        <option value="Average">Average</option>
                        <option value="Low">Low</option>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setTicketDialogOpen(false)}>
                        {t('cancel') || 'Cancel'}
                    </Button>
                    <Button onClick={handleSubmitTicket} variant="contained" color="primary">
                        {t('submit') || 'Submit'}
                    </Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
};

export default Navbar;
