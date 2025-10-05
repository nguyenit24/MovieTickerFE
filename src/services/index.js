// Centralized services export
import movieService from './movieService';
import userService from './userService';
import roomService from './roomService';
import scheduleService from './scheduleService';
import ticketService from './ticketService';

// Config cho API
const API_CONFIG = {
  BASE_URL: 'http://localhost:8080/api',
  TIMEOUT: 30000, // 30 seconds
  withCredentials: true
};

// Helper functions
const apiHelpers = {
  // Format API response
  formatResponse: (data, status = 200, message = 'Success') => {
    return {
      data,
      status,
      message,
      timestamp: new Date().toISOString()
    };
  },
  
  // Format error response
  formatError: (message = 'Error', status = 500) => {
    return {
      data: null,
      status,
      message,
      timestamp: new Date().toISOString()
    };
  },
  
  // Get headers with auth token
  getAuthHeaders: () => {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    };
  }
};

// Export tất cả services
export {
  movieService,
  userService,
  roomService,
  scheduleService,
  ticketService,
  API_CONFIG,
  apiHelpers
};