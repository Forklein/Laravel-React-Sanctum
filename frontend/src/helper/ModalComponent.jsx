import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from '../axios';
import { Button, Modal, TextField, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../contexts/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';

const ModalComponent = (props) => {
    const { setUser } = useAuth();

    const { cta, title, user } = props;

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    ModalComponent.propTypes = {
        cta: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        user: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            email: PropTypes.string,
        }),
    };

    // State to manage modal visibility
    const [showModal, setShowModal] = useState(false);

    // Local states to manage user input
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Function to handle modal close
    const handleClose = () => setShowModal(false);

    // Function to handle save
    const handleSave = async () => {
        setLoading(true);

        const body = {
            name: name,
            email: email,
            password: password,
        };
        try {
            const resp = await axios.put(`/user/${user.id}/edit`, body);
            if (resp.status === 200) {
                await delay(2000);
                setUser(resp.data.user);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        } finally {
            handleClose();
        }
    };

    return (
        <>
            {loading && <div className="modalLayer"></div>}
            <Button
                sx={{ marginTop: 2 }}
                variant="contained"
                color="primary"
                onClick={() => setShowModal(true)}
            >
                {cta}
            </Button>

            <Modal
                open={showModal}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    {loading && (
                        <>
                            <CircularProgress
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    zIndex: 1000,
                                }}
                                disableShrink
                            />
                        </>
                    )}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography id="modal-title" variant="h6" component="h2">
                            {title}
                        </Typography>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <TextField
                        fullWidth
                        label="Name"
                        variant="outlined"
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={handleClose} color="secondary">
                            Close
                        </Button>
                        <Button onClick={handleSave} variant="contained" color="primary" sx={{ ml: 2 }}>
                            Save Changes
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default ModalComponent;
