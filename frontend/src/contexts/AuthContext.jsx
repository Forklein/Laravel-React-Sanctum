import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes
import axios from '../axios';

const AuthContext = createContext({
    user: null,
    setUser: () => { },
    csrfToken: () => { },
});

export const AuthProvider = ({ children }) => {
    const [user, _setUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    );

    const setUser = (user) => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
        _setUser(user);
    };

    const csrfToken = async () => {
        try {
            await axios.get('http://localhost:8000/sanctum/csrf-cookie');
            return true;
        } catch (error) {
            console.error('CSRF token error:', error);
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, csrfToken }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired, // Aggiungi la validazione dei prop
};

export const useAuth = () => {
    return useContext(AuthContext);
};
