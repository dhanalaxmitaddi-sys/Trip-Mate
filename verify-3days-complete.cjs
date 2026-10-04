const http = require('http');

function postRequest(path, payload) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(payload);
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
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
    req.write(postData);
    req.end();
  });
}

function getRequest(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
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
    req.end();
  });
}

function getClientPage(path = '/') {
  return new Promise((resolve) => {
    http.get(`http://localhost:5173${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', (err) => {
      resolve({ status: 500, error: err.message, body: '' });
    });
  });
}

async function runVerification() {
  console.log('================================================================');
  console.log('TRIPMATE 3-DAY ITINERARY END-TO-END VERIFICATION');
  console.log('================================================================\n');

  let allPassed = true;

  // TEST 1: Test backend generate-trip API (/api/trips/generate-trip) with 3 days
  console.log('--- TEST 1: POST /api/trips/generate-trip with numberOfDays = 3 ---');
  const res1 = await postRequest('/api/trips/generate-trip', {
    destinationId: 'goa',
    destinationName: 'Goa',
    numberOfDays: 3,
    budget: 35000,
    travelers: 2
  });

  if (res1.status !== 200 && res1.status !== 201) {
    console.error(`❌ FAILED: status ${res1.status}`, res1.body || res1.raw);
    allPassed = false;
  } else {
    const trip = res1.body.trip || res1.body.data;
    const days = trip.days;
    const dayNumbers = days.map(d => d.dayNumber);

    console.log('selected numberOfDays:', trip.numberOfDays || trip.daysCount);
    console.log('generated itinerary length:', days.length);
    console.log('generated day numbers:', dayNumbers);

    if (days.length === 3 && dayNumbers.join(',') === '1,2,3') {
      console.log('✔ PASSED: Exactly 3 days generated: Day 1, Day 2, Day 3\n');
    } else {
      console.error(`❌ FAILED: Expected 3 days [1, 2, 3], got length ${days.length} [${dayNumbers.join(', ')}]\n`);
      allPassed = false;
    }
  }

  // TEST 2: Test root /api/generate-trip with numberOfDays = 5
  console.log('--- TEST 2: POST /api/generate-trip with numberOfDays = 5 ---');
  const res2 = await postRequest('/api/generate-trip', {
    destinationId: 'dubai',
    destinationName: 'Dubai',
    numberOfDays: 5,
    budget: 60000,
    travelers: 2
  });

  if (res2.status !== 200 && res2.status !== 201) {
    console.error(`❌ FAILED: status ${res2.status}`, res2.body || res2.raw);
    allPassed = false;
  } else {
    const trip = res2.body.trip || res2.body.data;
    const days = trip.days;
    const dayNumbers = days.map(d => d.dayNumber);

    console.log('selected numberOfDays:', trip.numberOfDays || trip.daysCount);
    console.log('generated itinerary length:', days.length);
    console.log('generated day numbers:', dayNumbers);

    if (days.length === 5 && dayNumbers.join(',') === '1,2,3,4,5') {
      console.log('✔ PASSED: Exactly 5 days generated: Day 1, Day 2, Day 3, Day 4, Day 5\n');
    } else {
      console.error(`❌ FAILED: Expected 5 days [1, 2, 3, 4, 5], got length ${days.length}\n`);
      allPassed = false;
    }
  }

  // TEST 3: Test standard POST /api/trips with numberOfDays = 3
  console.log('--- TEST 3: POST /api/trips with numberOfDays = 3 ---');
  const res3 = await postRequest('/api/trips', {
    destinationId: 'paris',
    destinationName: 'Paris',
    numberOfDays: 3,
    budget: 85000,
    travelers: 2
  });

  let createdTripId;
  if (res3.status !== 200 && res3.status !== 201) {
    console.error(`❌ FAILED: status ${res3.status}`, res3.body || res3.raw);
    allPassed = false;
  } else {
    const trip = res3.body.trip || res3.body.data;
    createdTripId = trip._id || trip.id;
    const days = trip.days;
    const dayNumbers = days.map(d => d.dayNumber);

    console.log('selected numberOfDays:', trip.numberOfDays || trip.daysCount);
    console.log('generated itinerary length:', days.length);
    console.log('generated day numbers:', dayNumbers);

    if (days.length === 3 && dayNumbers.join(',') === '1,2,3') {
      console.log('✔ PASSED: Exactly 3 days generated for Paris: Day 1, Day 2, Day 3\n');
    } else {
      console.error(`❌ FAILED: Expected 3 days, got ${days.length}\n`);
      allPassed = false;
    }
  }

  // TEST 4: Test /api/trips/:id/generate dynamically updating days
  if (createdTripId) {
    console.log('--- TEST 4: POST /api/trips/:id/generate with numberOfDays = 1, then 3, then 5 ---');
    
    // 1 Day
    const res4_1 = await postRequest(`/api/trips/${createdTripId}/generate`, { numberOfDays: 1 });
    const trip1 = res4_1.body.trip || res4_1.body.data;
    console.log('1 Day test: length =', trip1.days.length, 'days =', trip1.days.map(d => `Day ${d.dayNumber}`).join(', '));
    if (trip1.days.length !== 1 || trip1.days[0].dayNumber !== 1) {
      console.error('❌ FAILED: 1 day test failed');
      allPassed = false;
    } else {
      console.log('✔ PASSED: Exactly Day 1 only');
    }

    // 3 Days
    const res4_3 = await postRequest(`/api/trips/${createdTripId}/generate`, { numberOfDays: 3 });
    const trip3 = res4_3.body.trip || res4_3.body.data;
    console.log('3 Days test: length =', trip3.days.length, 'days =', trip3.days.map(d => `Day ${d.dayNumber}`).join(', '));
    if (trip3.days.length !== 3 || trip3.days.map(d => d.dayNumber).join(',') !== '1,2,3') {
      console.error('❌ FAILED: 3 days test failed');
      allPassed = false;
    } else {
      console.log('✔ PASSED: Exactly Day 1, Day 2, Day 3');
    }

    // 5 Days
    const res4_5 = await postRequest(`/api/trips/${createdTripId}/generate`, { numberOfDays: 5 });
    const trip5 = res4_5.body.trip || res4_5.body.data;
    console.log('5 Days test: length =', trip5.days.length, 'days =', trip5.days.map(d => `Day ${d.dayNumber}`).join(', '));
    if (trip5.days.length !== 5 || trip5.days.map(d => d.dayNumber).join(',') !== '1,2,3,4,5') {
      console.error('❌ FAILED: 5 days test failed');
      allPassed = false;
    } else {
      console.log('✔ PASSED: Exactly Day 1, Day 2, Day 3, Day 4, Day 5\n');
    }
  }

  // TEST 5: Verify Client Vite Dev Server is Serving UI
  console.log('--- TEST 5: Verifying Client App UI is Serving ---');
  const clientRes = await getClientPage('/');
  console.log('clientRes status:', clientRes.status, 'error:', clientRes.error, 'body starts:', clientRes.body ? clientRes.body.slice(0, 50) : '');
  if (clientRes.status === 200) {
    console.log('✔ PASSED: Client Vite server is up and serving index.html on port 5173\n');
  } else {
    console.error('❌ FAILED: Client server not serving correctly on 5173\n');
    allPassed = false;
  }

  // Summary
  console.log('================================================================');
  if (allPassed) {
    console.log('🎉 ALL TESTS PASSED! 3-DAY AND 5-DAY ITINERARY GENERATION WORKS.');
    console.log('Day 1, Day 2, Day 3 are strictly generated and displayed.');
    console.log('================================================================');
    process.exit(0);
  } else {
    console.error('❌ SOME TESTS FAILED.');
    console.log('================================================================');
    process.exit(1);
  }
}

runVerification().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});
