/**
 * Express router paths go here.
 */


export default {
  Base: '/api',
  Users: {
    Base: '/users',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id'
  },
  Super_Auth: {
    Base: '/super-auth',
    // Get: '/all',
    Login: '/login',
    GetOne: '/view/:id',
    // Register: '/register',
    Update: '/update/:id',
    Logout: '/logout',
    // Delete: '/delete/:id',
  },
  Auth: {
    Base: '/admin',
    Get: '/all',
    Login: '/login',
    GetOne: '/view/:id',
    Register: '/register',
    Update: '/update/:id',
    Logout: '/logout',
    Delete: '/delete/:id',
  }
} as const;
