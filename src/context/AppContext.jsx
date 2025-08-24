import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const AppContext = createContext();

export const AppProvider = ({children}) => {

    const navigate = useNavigate()

    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);
    const [input, setInput] = useState("");

    const fetchBlogs = async (req, res) => {
        try {
            const {data} = await axios.get('/api/blog/all');
            data.success ? setBlogs(data.blogs) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Authentication Functions
    const signup = async (userData) => {
        try {
            setIsLoading(true);
            const { data } = await axios.post('/api/auth/signup', userData);
            
            if (data.success) {
                const { token, user } = data.data;
                setToken(token);
                setUser(user);
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                toast.success(data.message);
                return { success: true };
            } else {
                toast.error(data.message);
                return { success: false, message: data.message };
            }
        } catch (error) {
            const message = error.response?.data?.message || 'Signup failed';
            toast.error(message);
            return { success: false, message };
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (credentials) => {
        try {
            setIsLoading(true);
            const { data } = await axios.post('/api/auth/login', credentials);
            
            if (data.success) {
                const { token, user } = data.data;
                setToken(token);
                setUser(user);
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                toast.success(data.message);
                return { success: true };
            } else {
                toast.error(data.message);
                return { success: false, message: data.message };
            }
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed';
            toast.error(message);
            return { success: false, message };
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            await axios.post('/api/auth/logout');
            setToken(null);
            setUser(null);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            delete axios.defaults.headers.common['Authorization'];
            toast.success('Logged out successfully');
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
            // Even if API call fails, clear local data
            setToken(null);
            setUser(null);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            delete axios.defaults.headers.common['Authorization'];
            navigate('/');
        }
    };

    const getProfile = async () => {
        try {
            const { data } = await axios.get('/api/auth/profile');
            if (data.success) {
                setUser(data.data.user);
                return { success: true, user: data.data.user };
            }
        } catch (error) {
            console.error('Get profile error:', error);
            // If token is invalid, clear auth data
            if (error.response?.status === 401) {
                logout();
            }
            return { success: false };
        }
    };

    const updateProfile = async (profileData) => {
        try {
            const { data } = await axios.put('/api/auth/profile', profileData);
            if (data.success) {
                setUser(data.data.user);
                localStorage.setItem('user', JSON.stringify(data.data.user));
                toast.success(data.message);
                return { success: true, user: data.data.user };
            } else {
                toast.error(data.message);
                return { success: false, message: data.message };
            }
        } catch (error) {
            const message = error.response?.data?.message || 'Profile update failed';
            toast.error(message);
            return { success: false, message };
        }
    };

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const storedToken = localStorage.getItem('token');
                const storedUser = localStorage.getItem('user');
                
                if (storedToken && storedUser) {
                    setToken(storedToken);
                    setUser(JSON.parse(storedUser));
                    axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
                    
                    // Verify token is still valid
                    const profileResult = await getProfile();
                    if (!profileResult.success) {
                        // Token is invalid, clear auth data
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        setToken(null);
                        setUser(null);
                        delete axios.defaults.headers.common['Authorization'];
                    }
                }
            } catch (error) {
                console.error('Auth initialization error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlogs();
        initializeAuth();
    }, [])

    const value = {
        // Existing
        axios, 
        navigate, 
        blogs, 
        setBlogs, 
        input, 
        setInput,
        
        // Authentication
        token, 
        setToken,
        user,
        setUser,
        isLoading,
        signup,
        login,
        logout,
        getProfile,
        updateProfile,
        
        // Helper functions
        isAuthenticated: !!token,
        isAdmin: user?.role === 'admin'
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}

