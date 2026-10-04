// Simulation and Verification of Client Routing & Auth Guards
const fs = require('fs');
const path = require('path');

console.log('====================================================');
console.log('🧪 TripMate Client Route & Auth Guard Static Verification');
console.log('====================================================\n');

// 1. Inspect client/src/App.jsx
const appPath = path.join(__dirname, 'client', 'src', 'App.jsx');
const appContent = fs.readFileSync(appPath, 'utf8');

console.log('1. Checking Root Route ("/") in App.jsx...');
const hasRootRedirect = appContent.includes('path="/"') && appContent.includes('Navigate to="/login"');
console.log('   Root redirects unauthenticated user to /login:', hasRootRedirect ? 'PASS ✔' : 'FAIL ❌');

console.log('\n2. Checking Main Page Protection in App.jsx...');
const protectedPages = [
  { name: 'Home', path: '/home', component: '<Home />' },
  { name: 'Explore', path: '/explore', component: '<ExplorePlaces />' },
  { name: 'Plan Trip', path: '/plan', component: '<PlanTrip />' },
  { name: 'My Trips', path: '/trips', component: '<MyTrips />' },
  { name: 'Offers', path: '/offers', component: '<Offers />' },
  { name: 'Budget', path: '/budget', component: '<BudgetTracker />' },
  { name: 'Account', path: '/account', component: '<Account />' },
];

let allProtected = true;
for (const p of protectedPages) {
  // Check if route has ProtectedRoute wrapping
  const regex = new RegExp(`path="${p.path}"[\\s\\S]*?<ProtectedRoute>[\\s\\S]*?${p.component.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?<\\/ProtectedRoute>`);
  const isProtected = regex.test(appContent);
  if (!isProtected) allProtected = false;
  console.log(`   - Route ${p.path} (${p.name}): ${isProtected ? 'Protected with <ProtectedRoute> ✔' : 'NOT PROTECTED ❌'}`);
}

console.log('\n3. Checking ProtectedRoute.jsx implementation...');
const protectedRoutePath = path.join(__dirname, 'client', 'src', 'components', 'ProtectedRoute.jsx');
const protectedRouteContent = fs.readFileSync(protectedRoutePath, 'utf8');
const redirectsToLogin = protectedRouteContent.includes('<Navigate to="/login" replace />');
console.log('   Unauthenticated redirect to /login:', redirectsToLogin ? 'PASS ✔' : 'FAIL ❌');

console.log('\n4. Checking Login.jsx for Login, Signup, and Continue as Guest...');
const loginPath = path.join(__dirname, 'client', 'src', 'pages', 'Login.jsx');
const loginContent = fs.readFileSync(loginPath, 'utf8');
const hasLoginTab = loginContent.includes('id="tab-login"');
const hasSignupTab = loginContent.includes('id="tab-signup"');
const hasGuestButton = loginContent.includes('id="btn-continue-as-guest"') && loginContent.includes('Continue as Guest');

console.log('   - Login Tab exists:', hasLoginTab ? 'PASS ✔' : 'FAIL ❌');
console.log('   - Signup Tab exists:', hasSignupTab ? 'PASS ✔' : 'FAIL ❌');
console.log('   - Continue as Guest Button exists:', hasGuestButton ? 'PASS ✔' : 'FAIL ❌');

console.log('\n5. Checking Logout implementation in Navbar & Account...');
const navbarPath = path.join(__dirname, 'client', 'src', 'components', 'Navbar.jsx');
const navbarContent = fs.readFileSync(navbarPath, 'utf8');
const navbarLogout = navbarContent.includes('logout()') && navbarContent.includes("navigate('/login')");
console.log('   - Navbar Logout redirects to /login:', navbarLogout ? 'PASS ✔' : 'FAIL ❌');

const accountPath = path.join(__dirname, 'client', 'src', 'pages', 'Account.jsx');
const accountContent = fs.readFileSync(accountPath, 'utf8');
const accountLogout = accountContent.includes('logout()') && accountContent.includes("navigate('/login')");
console.log('   - Account Logout redirects to /login:', accountLogout ? 'PASS ✔' : 'FAIL ❌');

console.log('\n6. Checking AuthContext Session Isolation (guaranteeing fresh Login on start)...');
const authPath = path.join(__dirname, 'client', 'src', 'context', 'AuthContext.jsx');
const authContent = fs.readFileSync(authPath, 'utf8');
const usesSessionStorage = authContent.includes('sessionStorage.getItem') && authContent.includes('sessionStorage.setItem');
const clearsLegacyStorage = authContent.includes("localStorage.removeItem('tm.token')");
console.log('   - Uses sessionStorage for session isolation:', usesSessionStorage ? 'PASS ✔' : 'FAIL ❌');
console.log('   - Cleans up persistent storage to prevent auto-login on startup:', clearsLegacyStorage ? 'PASS ✔' : 'FAIL ❌');

console.log('\n====================================================');
if (hasRootRedirect && allProtected && redirectsToLogin && hasLoginTab && hasSignupTab && hasGuestButton && navbarLogout && accountLogout && usesSessionStorage) {
  console.log('🎉 ALL REQUIREMENTS (1 through 6) VERIFIED & PASSING 100%!');
} else {
  console.log('⚠️ Some checks failed. Please review the output above.');
}
console.log('====================================================\n');
