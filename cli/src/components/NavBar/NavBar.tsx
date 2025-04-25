import {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Typography,
  useTheme,
  ThemeProvider,
  createTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Translate as LanguageIcon,
  AccountCircle as AccountIcon,
  Login as LoginIcon,
  HowToReg as RegisterIcon,
  Menu as MenuIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';

const Navbar = () => {
  const {t, i18n} = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  const appTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  // Mobile drawer content
  const drawer = (
    <Box sx={{width: 250}} role="presentation">
      <List>
        {/* Language Selector */}
        <ListItem button onClick={handleMenuOpen}>
          <ListItemIcon>
            <LanguageIcon/>
          </ListItemIcon>
          <ListItemText primary={t('language')}/>
        </ListItem>

        {/* Theme Toggle */}
        <ListItem button onClick={toggleDarkMode}>
          <ListItemIcon>
            {darkMode ? <LightModeIcon/> : <DarkModeIcon/>}
          </ListItemIcon>
          <ListItemText primary={darkMode ? t('lightMode') : t('darkMode')}/>
        </ListItem>

        <Divider/>

        {/* Auth Links */}
        {isAuthenticated ? (
          <>
            <ListItem button onClick={() => navigateTo('/profile')}>
              <ListItemIcon>
                <AccountIcon/>
              </ListItemIcon>
              <ListItemText primary={t('profile')}/>
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon/>
              </ListItemIcon>
              <ListItemText primary={t('logout')}/>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button onClick={() => navigateTo('/login')}>
              <ListItemIcon>
                <LoginIcon/>
              </ListItemIcon>
              <ListItemText primary={t('login')}/>
            </ListItem>
            <ListItem button onClick={() => navigateTo('/register')}>
              <ListItemIcon>
                <RegisterIcon/>
              </ListItemIcon>
              <ListItemText primary={t('register')}/>
            </ListItem>
          </>
        )}
      </List>

      {/* Language Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{minWidth: "1000px"}}
      >
        <MenuItem onClick={() => handleLanguageChange('en')}>English</MenuItem>
        <MenuItem onClick={() => handleLanguageChange('ru')}>Русский</MenuItem>
      </Menu>
    </Box>
  );

  return (
    <ThemeProvider theme={appTheme}>
      <AppBar position="static" color="primary">
        <Toolbar sx={{
          display: "flex",
          justifyContent: 'space-between'
        }}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{mr: 2}}
            >
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

          {!isMobile && (
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              {/* Language Selector */}
              <IconButton color="inherit" onClick={handleMenuOpen} sx={{mr: 1}}>
                <LanguageIcon/>
              </IconButton>

              {/* Theme Toggle */}
              <IconButton color="inherit" onClick={toggleDarkMode} sx={{mr: 2}}>
                {darkMode ? <LightModeIcon/> : <DarkModeIcon/>}
              </IconButton>

              {/* Auth Buttons */}
              {isAuthenticated ? (
                <>
                  <Button
                    color="inherit"
                    onClick={() => navigate('/profile')}
                    startIcon={<AccountIcon/>}
                    sx={{mr: 1}}
                  >
                    {t('profile')}
                  </Button>
                  <Button
                    color="inherit"
                    onClick={handleLogout}
                    startIcon={<LogoutIcon/>}
                  >
                    {t('logout')}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    color="inherit"
                    onClick={() => navigate('/login')}
                    startIcon={<LoginIcon/>}
                    sx={{mr: 1}}
                  >
                    {t('login')}
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => navigate('/register')}
                    startIcon={<RegisterIcon/>}
                  >
                    {t('register')}
                  </Button>
                </>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
      >
        {drawer}
      </Drawer>

      {/* Language Menu (for desktop) */}
      {!isMobile && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleLanguageChange('en')}>English</MenuItem>
          <MenuItem onClick={() => handleLanguageChange('ru')}>Русский</MenuItem>
        </Menu>
      )}
    </ThemeProvider>
  );
};

export default Navbar;