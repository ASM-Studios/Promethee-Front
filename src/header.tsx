import { Box, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HomeIcon from '@mui/icons-material/Home';

const Header = () => {
    const allow = [
        '/game', //TODO: Revert to '/game'
    ]

    return (
        allow.includes(window.location.pathname) && (
            <Box sx={{ position: 'fixed', top: 0, width: '100%', zIndex: 10 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            🔥 Prométhée
                        </Typography>
                        <IconButton color="inherit" onClick={() => {
                            window.location.href = '/rules';
                        }}>
                            <HelpOutlineIcon />
                        </IconButton>
                        <IconButton color="inherit" onClick={() => {
                            window.location.href = '/';
                        }}>
                            <HomeIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Box>
        )
    );
};

export default Header;
