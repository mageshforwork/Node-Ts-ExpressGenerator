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
  Super_Admin: {
    Base: '/super-admin',
    Get: '/all',
    Login: '/login',
    GetOne: '/view/:id',
    Register: '/register',
    Update: '/update/:id',
    Logout: '/logout',
    Delete: '/delete/:id',
  },
  Admins: {
    Base: '/admins',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id'
  },
} as const;
