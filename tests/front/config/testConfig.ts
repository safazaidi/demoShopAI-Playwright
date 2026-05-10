/**
 * Test Configuration
 * Stores application URL and login credentials
 */

export const testConfig = {
  // Application URL
  baseUrl: 'https://demowebshop.tricentis.com/',
  
  // Login credentials
  credentials: {
    userEmail: 'testersoftware123@gmail.com',
    userFirsname: 'tester',
    userLastName: 'software',
    password: 'AZErtyuiop789+@',
  },
  
  // Optional: Additional user accounts for testing
  users: {
    admin: {
      username: 'admin@example.com',
      password: 'admin-password',
    },
    user: {
      username: 'user@example.com',
      password: 'user-password',
    },
  },

  // Optional: Page timeouts
  timeout: 30000,
};

export default testConfig;