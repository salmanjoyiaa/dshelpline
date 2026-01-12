// Quick test to see if all imports resolve
try {
  console.log('Testing imports...');
  
  // Test theme provider
  const themeModule = require('./components/theme-provider.tsx');
  console.log('✓ theme-provider loaded:', !!themeModule.ThemeProvider);
  
  // Test pagination
  const paginationModule = require('./components/dashboard/pagination-controls.tsx');
  console.log('✓ pagination-controls loaded:', !!paginationModule.PaginationControls);
  
  // Test requests table
  const tableModule = require('./components/dashboard/new-requests-table.tsx');
  console.log('✓ new-requests-table loaded:', !!tableModule.RequestsTable);
  
  console.log('All imports successful!');
} catch (err) {
  console.error('Import error:', err.message);
  process.exit(1);
}
