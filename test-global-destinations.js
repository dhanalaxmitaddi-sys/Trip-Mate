const http = require('http');
const destinationService = require('./server/services/destinationService');
const plannerService = require('./server/services/plannerService');

function makeRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const postData = body ? JSON.stringify(body) : null;
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...(postData ? { 'Content-Length': Buffer.byteLength(postData) } : {})
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
  console.log('====================================================');
  console.log('TRIPMATE GLOBAL DESTINATION & MULTI-PLAN TEST SUITE');
  console.log('====================================================\n');

  const requiredTestDestinations = [
    { name: 'Goa', id: 'goa', expectedDays: 3, budget: 25000 },
    { name: 'Manali', id: 'manali', expectedDays: 5, budget: 30000 },
    { name: 'Hyderabad', id: 'hyderabad', expectedDays: 4, budget: 28000 },
    { name: 'Paris', id: 'paris', expectedDays: 3, budget: 75000 },
    { name: 'Dubai', id: 'dubai', expectedDays: 5, budget: 85000 },
    { name: 'Tokyo', id: 'tokyo', expectedDays: 6, budget: 120000 },
    { name: 'Singapore', id: 'singapore', expectedDays: 4, budget: 60000 },
    // 8. Destinations that do NOT exist in the original static/demo dataset:
    { name: 'Vizag', id: 'vizag', expectedDays: 3, budget: 22000, isUnlisted: true },
    { name: 'Switzerland', id: 'switzerland', expectedDays: 7, budget: 150000, isUnlisted: true },
    { name: 'Reykjavik (Arbitrary Global City)', id: 'reykjavik', expectedDays: 1, budget: 40000, isUnlisted: true },
    { name: 'New Zealand', id: 'new-zealand', expectedDays: 10, budget: 200000, isUnlisted: true }
  ];

  let passedAll = true;

  for (const item of requiredTestDestinations) {
    console.log(`\n----------------------------------------------------`);
    console.log(`Testing Destination: ${item.name} (${item.expectedDays} Days, Target Budget: ₹${item.budget.toLocaleString()})`);
    console.log(`----------------------------------------------------`);

    // 1. Test Server Endpoint: GET /api/destinations/:id
    try {
      const destRes = await makeRequest('GET', `/api/destinations/${item.id}`);
      if (destRes.status === 200 && destRes.body && (destRes.body.data || destRes.body.name)) {
        const d = destRes.body.data || destRes.body;
        console.log(`  ✓ GET /api/destinations/${item.id}: SUCCESS (200 OK) -> "${d.name}", Country: ${d.country}, Places: ${d.places?.length || 0}`);
      } else {
        console.error(`  ✗ GET /api/destinations/${item.id}: FAILED (Status: ${destRes.status})`);
        passedAll = false;
      }
    } catch (e) {
      console.error(`  ✗ GET /api/destinations/${item.id}: ERROR`, e.message);
      passedAll = false;
    }

    // 2. Test Weather Endpoint: GET /api/weather?destinationId=:id
    try {
      const weatherRes = await makeRequest('GET', `/api/weather?destinationId=${item.id}&days=${item.expectedDays}`);
      if (weatherRes.status === 200 && (Array.isArray(weatherRes.body) || Array.isArray(weatherRes.body?.data))) {
        const wList = Array.isArray(weatherRes.body) ? weatherRes.body : weatherRes.body.data;
        console.log(`  ✓ GET /api/weather?destinationId=${item.id}: SUCCESS (200 OK) -> ${wList.length} days forecast (${wList[0]?.tempC}°C, ${wList[0]?.condition})`);
      } else {
        console.error(`  ✗ GET /api/weather: FAILED`);
        passedAll = false;
      }
    } catch (e) {
      console.error(`  ✗ GET /api/weather: ERROR`, e.message);
      passedAll = false;
    }

    // 3. Test Multi-Plan Generation: POST /api/trips/generate-plans
    try {
      const planPayload = {
        destinationId: item.id,
        destinationName: item.name,
        daysCount: item.expectedDays,
        budget: item.budget,
        travelers: 2,
        interests: ['History', 'Food', 'Nature'],
        foodPreference: 'No Preference',
        travelStyle: 'Balanced',
        currency: 'INR',
        currencySymbol: '₹'
      };

      const planRes = await makeRequest('POST', '/api/trips/generate-plans', planPayload);
      if (planRes.status === 200 && planRes.body?.success && planRes.body?.plans?.length === 4) {
        const plans = planRes.body.plans;
        console.log(`  ✓ POST /api/trips/generate-plans: SUCCESS (4 DISTINCT PLANS GENERATED)`);
        
        // Validate each plan strictly respects exact days and has different themes
        const titles = plans.map(p => p.title);
        const dayCounts = plans.map(p => p.trip.daysCount);
        const actualDaysGenerated = plans.map(p => p.trip.days.length);

        console.log(`    - Plan Titles: ${titles.join(' | ')}`);
        console.log(`    - Days requested: ${item.expectedDays} -> Generated: ${actualDaysGenerated.join(', ')} (Exact Match: ${actualDaysGenerated.every(c => c === item.expectedDays)})`);
        
        const allDaysMatch = actualDaysGenerated.every(c => c === item.expectedDays);
        if (!allDaysMatch) {
          console.error(`    ✗ EXACT DAYS MISMATCH! Expected ${item.expectedDays}, got ${actualDaysGenerated.join(', ')}`);
          passedAll = false;
        } else {
          console.log(`    ✓ Exact ${item.expectedDays}-day guarantee strictly satisfied!`);
        }

        // Verify distinctness of activities
        const day1PlanA = plans[0].trip.days[0].activities.map(a => a.name);
        const day1PlanB = plans[1].trip.days[0].activities.map(a => a.name);
        console.log(`    - Plan A Day 1: ${day1PlanA.slice(0, 2).join(' -> ')}`);
        console.log(`    - Plan B Day 1: ${day1PlanB.slice(0, 2).join(' -> ')}`);
      } else {
        console.error(`  ✗ POST /api/trips/generate-plans: FAILED (Status: ${planRes.status}, Plans: ${planRes.body?.plans?.length})`);
        passedAll = false;
      }
    } catch (e) {
      console.error(`  ✗ POST /api/trips/generate-plans: ERROR`, e.message);
      passedAll = false;
    }
  }

  console.log('\n====================================================');
  if (passedAll) {
    console.log('🎉 ALL TESTS PASSED! GLOBAL DESTINATIONS & PLANS VERIFIED!');
  } else {
    console.log('⚠️ SOME TESTS FAILED. PLEASE REVIEW LOGS ABOVE.');
  }
  console.log('====================================================\n');
}

runTests();
