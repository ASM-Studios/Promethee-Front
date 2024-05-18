import {ToastContainer} from "react-toastify";
import {Box} from "@mui/material";
// @ts-ignore
import background from '../assets/dogs.png';

const NotFound = () => {
    return (
        <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
            <ToastContainer />
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '100%',
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                zIndex: 0
            }} />
            <Box sx={{ height: '100%', width: '100%', position: 'relative' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Box sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '20px', border: '2px solid white', textAlign: 'center', transform: 'scale(1.1)' }}>
                        <h1 style={{ color: 'white' }}>Nuh HUH</h1>
                        <h2 style={{ color: 'white' }}>404 not found</h2>
                    </Box>
                </Box>
            </Box>
        </div>
    );
}

export default NotFound;
