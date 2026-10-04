const http = require('http');
const plannerService = require('./server/services/plannerService');

function makeRequest(method, path, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const postData = body ? JSON.stringify(body) : null;
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...(postData ? { 'Content-Length': Buffer.byteLength(postData) } : {}),
        ...headers
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });

    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

async function runTests() {
  console.log('================================================================');
  console.log('TRIPMATE ITINERARY GENERATION TEST SUITE (1, 3, 5, 7 DAYS)');
  console.log('================================================================\n');

  let passed = true;

  // 1. Direct Planner Service Unit Tests
  console.log('--- 1. Testing plannerService core logic ---');
  
  const testCases = [
    { days: 1, expectedDates: ['2026-10-10'], expectedNights: 0 },
    { days: 3, expectedDates: ['2026-10-10', '2026-10-11', '2026-10-12'], expectedNights: 2 },
    { days: 5, expectedDates: ['2026-10-10', '2026-10-11', '2026-10-12', '2026-10-13', '2026-10-14'], expectedNights: 4 },
    { days: 7, expectedDates: ['2026-10-10', '2026-10-11', '2026-10-12', '2026-10-13', '2026-10-14', '2026-10-15', '2026-10-16'], expectedNights: 6 }
  ];

  for (const tc of testCases) {
    const trip = plannerService.generateTripItinerary({
      destinationId: 'goa',
      destinationName: 'Goa',
      startDate: '2026-10-10',
      daysCount: tc.days,
      budget: 35000,
      travelers: 2
    });

    // Check days count
    if (trip.days.length !== tc.days) {
      console.error(`❌ ${tc.days} Days: Expected ${tc.days} days, got ${trip.days.length}`);
      passed = false;
    } else {
      console.log(`✔ ${tc.days} Days: Exactly ${tc.days} day(s) generated in trip.days (${tc.days === 1 ? 'Day 1 only' : `Day 1 to Day ${tc.days}`})`);
    }

    // Check dates
    const actualDates = trip.days.map(d => d.date);
    const datesMatch = actualDates.every((d, i) => d === tc.expectedDates[i]);
    if (!datesMatch) {
      console.error(`❌ Dates mismatch for ${tc.days} Days:`, actualDates);
      passed = false;
    } else {
      console.log(`✔ ${tc.days} Days: Dates exactly sequential -> ${actualDates.join(', ')}`);
    }

    // Check activities
    const allDaysHaveActivities = trip.days.every(d => Array.isArray(d.activities) && d.activities.length === 4);
    if (!allDaysHaveActivities) {
      console.error(`❌ Some days missing activities in ${tc.days} days`);
      passed = false;
    } else {
      console.log(`✔ ${tc.days} Days: Each day has 4 structured activities (Total: ${trip.days.length * 4} activities)`);
    }

    // Check budget nights
    const budgetStats = plannerService.computeBudget(trip);
    if (budgetStats.nightsCount !== tc.expectedNights) {
      console.error(`❌ ${tc.days} Days: Expected ${tc.expectedNights} nights, got ${budgetStats.nightsCount}`);
      passed = false;
    } else {
      console.log(`✔ ${tc.days} Days: Budget correctly reflects ${budgetStats.nightsCount} hotel nights (Hotel cost: ₹${budgetStats.totals.Hotel.toLocaleString()})`);
    }

    // Check packing list scaling
    const packing = plannerService.generatePackingList(trip);
    const clothingItem = packing.find(p => p.group === 'Clothing' && p.label.includes('Comfortable daily casual outfits'));
    console.log(`✔ ${tc.days} Days: Packing checklist clothing scaled -> "${clothingItem?.label}"`);
  }

  // 2. Integration Tests via HTTP API
  console.log('\n--- 2. Testing HTTP API Endpoints with Demo User ---');

  // Login demo user to get auth token
  const authRes = await makeRequest('POST', '/api/auth/demo-login');
  const token = authRes.body?.data?.token || authRes.body?.token;
  if (!token) {
    console.error('❌ Failed to login demo user:', authRes.status, authRes.body);
    return false;
  }
  const authHeaders = { 'Authorization': `Bearer ${token}` };

  // Test A: Create 1-day trip via POST /api/trips
  console.log('\nTesting 1-Day Trip Creation (POST /api/trips with daysCount: 1)...');
  const trip1Res = await makeRequest('POST', '/api/trips', {
    destinationId: 'manali',
    destinationName: 'Manali',
    startDate: '2026-11-01',
    endDate: '2026-11-01',
    daysCount: 1,
    budget: 20000,
    travelers: 1
  }, authHeaders);

  const trip1 = trip1Res.body?.data;
  if (!trip1 || trip1.days?.length !== 1) {
    console.error('❌ 1-Day API trip failed. Generated days:', trip1?.days?.length);
    passed = false;
  } else {
    console.log('✔ POST /api/trips with 1 Day:');
    console.log(`  - Days count: ${trip1.days.length} (Day 1 only)`);
    console.log(`  - Date: ${trip1.days[0].date}`);
    console.log(`  - End Date: ${trip1.endDate}`);
    console.log(`  - Activities: ${trip1.days[0].activities.length}`);
    console.log(`  - Hotel Nights in budget: ${trip1.budgetStats?.nightsCount || 0} (Hotel cost: ₹${trip1.budgetStats?.totals?.Hotel || 0})`);
  }

  // Test B: Create 3-day trip via POST /api/trips
  console.log('\nTesting 3-Day Trip Creation (POST /api/trips with daysCount: 3)...');
  const trip3Res = await makeRequest('POST', '/api/trips', {
    destinationId: 'jaipur',
    destinationName: 'Jaipur',
    startDate: '2026-11-05',
    endDate: '2026-11-07',
    daysCount: 3,
    budget: 30000,
    travelers: 2
  }, authHeaders);

  const trip3 = trip3Res.body?.data;
  if (!trip3 || trip3.days?.length !== 3) {
    console.error('❌ 3-Day API trip failed. Generated days:', trip3?.days?.length);
    passed = false;
  } else {
    console.log('✔ POST /api/trips with 3 Days:');
    console.log(`  - Days count: ${trip3.days.length} (Day 1, Day 2, Day 3)`);
    console.log(`  - Dates: ${trip3.days.map(d => d.date).join(', ')}`);
    console.log(`  - End Date: ${trip3.endDate}`);
    console.log(`  - Total Activities: ${trip3.days.reduce((acc, d) => acc + d.activities.length, 0)}`);
    console.log(`  - Hotel Nights in budget: ${trip3.budgetStats?.nightsCount} (Hotel cost: ₹${trip3.budgetStats?.totals?.Hotel})`);
  }

  // Test C: Create 5-day trip via POST /api/trips
  console.log('\nTesting 5-Day Trip Creation (POST /api/trips with daysCount: 5)...');
  const trip5Res = await makeRequest('POST', '/api/trips', {
    destinationId: 'kerala',
    destinationName: 'Kerala',
    startDate: '2026-11-10',
    endDate: '2026-11-14',
    daysCount: 5,
    budget: 45000,
    travelers: 2
  }, authHeaders);

  const trip5 = trip5Res.body?.data;
  if (!trip5 || trip5.days?.length !== 5) {
    console.error('❌ 5-Day API trip failed. Generated days:', trip5?.days?.length);
    passed = false;
  } else {
    console.log('✔ POST /api/trips with 5 Days:');
    console.log(`  - Days count: ${trip5.days.length} (Day 1 to Day 5)`);
    console.log(`  - Dates: ${trip5.days.map(d => d.date).join(', ')}`);
    console.log(`  - End Date: ${trip5.endDate}`);
    console.log(`  - Total Activities: ${trip5.days.reduce((acc, d) => acc + d.activities.length, 0)}`);
    console.log(`  - Hotel Nights in budget: ${trip5.budgetStats?.nightsCount} (Hotel cost: ₹${trip5.budgetStats?.totals?.Hotel})`);
  }

  // Test D: Generate / Regenerate itinerary from existing Trip Object: POST /api/trips/:id/generate
  console.log('\nTesting Itinerary Generation from Trip Object (POST /api/trips/:id/generate)...');
  const targetTripId = trip3._id;

  // D1: Switch existing 3-day trip to 1 Day
  console.log(`  Switching Trip ${targetTripId} to 1 Day...`);
  const gen1Res = await makeRequest('POST', `/api/trips/${targetTripId}/generate`, { daysCount: 1 }, authHeaders);
  const updated1 = gen1Res.body?.data;
  if (!updated1 || updated1.days?.length !== 1) {
    console.error('❌ Failed to regenerate trip to 1 day:', updated1?.days?.length);
    passed = false;
  } else {
    console.log(`  ✔ Regenerated to 1 Day: Day count = ${updated1.days.length} (${updated1.days[0].date}), Nights = ${updated1.budgetStats?.nightsCount}`);
  }

  // D2: Switch same trip to 5 Days
  console.log(`  Switching Trip ${targetTripId} to 5 Days...`);
  const gen5Res = await makeRequest('POST', `/api/trips/${targetTripId}/generate`, { daysCount: 5 }, authHeaders);
  const updated5 = gen5Res.body?.data;
  if (!updated5 || updated5.days?.length !== 5) {
    console.error('❌ Failed to regenerate trip to 5 days:', updated5?.days?.length);
    passed = false;
  } else {
    console.log(`  ✔ Regenerated to 5 Days: Day count = ${updated5.days.length} (${updated5.days[0].date} to ${updated5.days[4].date}), Nights = ${updated5.budgetStats?.nightsCount}`);
  }

  // D3: Switch same trip to 3 Days
  console.log(`  Switching Trip ${targetTripId} to 3 Days...`);
  const gen3Res = await makeRequest('POST', `/api/trips/${targetTripId}/generate`, { daysCount: 3 }, authHeaders);
  const updated3 = gen3Res.body?.data;
  if (!updated3 || updated3.days?.length !== 3) {
    console.error('❌ Failed to regenerate trip to 3 days:', updated3?.days?.length);
    passed = false;
  } else {
    console.log(`  ✔ Regenerated to 3 Days: Day count = ${updated3.days.length} (${updated3.days[0].date} to ${updated3.days[2].date}), Nights = ${updated3.budgetStats?.nightsCount}`);
  }

  // Clean up test trips
  await makeRequest('DELETE', `/api/trips/${trip1._id}`, null, authHeaders);
  await makeRequest('DELETE', `/api/trips/${trip3._id}`, null, authHeaders);
  await makeRequest('DELETE', `/api/trips/${trip5._id}`, null, authHeaders);

  console.log('\n================================================================');
  if (passed) {
    console.log('🎉 ALL ITINERARY GENERATION TESTS PASSED PERFECTLY!');
  } else {
    console.error('💥 SOME TESTS FAILED. PLEASE REVIEW LOGS ABOVE.');
  }
  console.log('================================================================\n');

  process.exit(passed ? 0 : 1);
}

runTests().catch(err => {
  console.error('Fatal error running tests:', err);
  process.exit(1);
});
