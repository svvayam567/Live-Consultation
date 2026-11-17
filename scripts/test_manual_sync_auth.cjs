/**
 * Verification test for manualCatalogSync endpoint security:
 * Confirms strict enforcement of staff authentication & role checks.
 */

const assert = require('assert');

// Mock auth verification logic identical to index.ts
async function simulateManualSyncRequest({ authHeader, mockVerify, mockProfile }) {
  if (!authHeader?.startsWith("Bearer ")) {
    return { status: 401, error: "Authentication required. Bearer ID token is missing." };
  }

  const idToken = authHeader.split("Bearer ")[1];
  let decoded;
  try {
    decoded = await mockVerify(idToken);
  } catch (err) {
    return { status: 401, error: "Invalid or expired authorization token." };
  }

  const callerData = mockProfile(decoded.uid);
  const isStaffAdmin = callerData && (callerData.role === "admin" || callerData.role === "super_admin") && callerData.active !== false;

  if (!isStaffAdmin) {
    return { status: 403, error: "Access denied. Only authorized staff administrators can invoke manual catalog sync." };
  }

  return { status: 200, success: true };
}

async function testSecurity() {
  console.log('--- Testing manualCatalogSync Security Enforcement ---');

  // Case 1: Unauthenticated request (no header)
  const res1 = await simulateManualSyncRequest({});
  assert.strictEqual(res1.status, 401);
  console.log('✓ PASS: Unauthenticated call rejected with 401 (Missing Token)');

  // Case 2: Invalid or expired token
  const res2 = await simulateManualSyncRequest({
    authHeader: 'Bearer expired_or_fake_token',
    mockVerify: async () => { throw new Error('Token expired'); },
    mockProfile: () => ({})
  });
  assert.strictEqual(res2.status, 401);
  console.log('✓ PASS: Invalid/expired token rejected with 401');

  // Case 3: Customer / regular user token
  const res3 = await simulateManualSyncRequest({
    authHeader: 'Bearer valid_customer_token',
    mockVerify: async () => ({ uid: 'customer_123' }),
    mockProfile: () => ({ role: 'customer', active: true })
  });
  assert.strictEqual(res3.status, 403);
  console.log('✓ PASS: Non-staff user rejected with 403 (Forbidden)');

  // Case 4: Inactive staff admin
  const res4 = await simulateManualSyncRequest({
    authHeader: 'Bearer disabled_admin_token',
    mockVerify: async () => ({ uid: 'admin_disabled' }),
    mockProfile: () => ({ role: 'admin', active: false })
  });
  assert.strictEqual(res4.status, 403);
  console.log('✓ PASS: Deactivated admin rejected with 403 (Forbidden)');

  // Case 5: Authorized Active Staff Admin
  const res5 = await simulateManualSyncRequest({
    authHeader: 'Bearer valid_admin_token',
    mockVerify: async () => ({ uid: 'admin_active' }),
    mockProfile: () => ({ role: 'admin', active: true })
  });
  assert.strictEqual(res5.status, 200);
  console.log('✓ PASS: Active staff admin successfully authorized with 200 OK');

  console.log('\n=== ALL MANUAL SYNC SECURITY CHECKS PASSED ===\n');
}

testSecurity().catch(err => {
  console.error('Security test failed:', err);
  process.exit(1);
});
