const http = require('http');

function postRequest(path, data) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
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
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, body });
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
    http.get(`http://localhost:5000${path}`, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, body });
        }
      });
    }).on('error', reject);
  });
}

async function runTests() {
  console.log('====================================================');
  console.log('🧪 TESTING HUGGING FACE AI & NON-REPEATING DAY PLANS');
  console.log('====================================================\n');

  let passedAll = true;

  // 1. Check Hugging Face status API
  console.log('1. Testing Hugging Face Status endpoint (/api/ai/huggingface/status)...');
  try {
    const statusRes = await getRequest('/api/ai/huggingface/status');
    if (statusRes.status === 200 && statusRes.data.success) {
      console.log(`   ✔ Status OK: Provider = ${statusRes.data.provider}, Default Model = ${statusRes.data.defaultModel}`);
    } else {
      console.log('   ❌ Status check failed:', statusRes);
      passedAll = false;
    }
  } catch (err) {
    console.log('   ❌ Error requesting status:', err.message);
    passedAll = false;
  }

  // 2. Test Hugging Face Chat endpoint
  console.log('\n2. Testing Hugging Face Chat endpoint (/api/ai/huggingface/chat)...');
  try {
    const chatRes = await postRequest('/api/ai/huggingface/chat', {
      message: 'What local food should I try in Hyderabad?',
      tripContext: { destinationName: 'Hyderabad', destinationId: 'hyderabad' }
    });
    if (chatRes.status === 200 && chatRes.data.success && chatRes.data.reply) {
      console.log('   ✔ Chat response received successfully:');
      console.log(`     "${chatRes.data.reply.slice(0, 100)}..."`);
    } else {
      console.log('   ❌ Chat endpoint failed:', chatRes);
      passedAll = false;
    }
  } catch (err) {
    console.log('   ❌ Error requesting chat:', err.message);
    passedAll = false;
  }

  // 3. Test Multi-Day Generation & Distinctness across days
  const destinationsToTest = [
    { id: 'hyderabad', name: 'Hyderabad', days: 3 },
    { id: 'paris', name: 'Paris', days: 3 },
    { id: 'goa', name: 'Goa', days: 4 }
  ];

  for (const testDest of destinationsToTest) {
    console.log(`\n3. Testing Day-by-Day Variation for ${testDest.name} (${testDest.days} Days)...`);
    try {
      const genRes = await postRequest('/api/trips/generate-trip', {
        destinationId: testDest.id,
        destinationName: testDest.name,
        daysCount: testDest.days,
        numberOfDays: testDest.days,
        travelStyle: 'Standard',
        interests: ['History', 'Food', 'Culture']
      });

      const trip = genRes.data.trip || genRes.data.data || genRes.data;
      if ((genRes.status !== 200 && genRes.status !== 201) || !trip || !trip.days) {
        console.log(`   ❌ Failed to generate trip for ${testDest.name}`, genRes.status, genRes.data);
        passedAll = false;
        continue;
      }

      const days = trip.days;
      console.log(`   Trip generated with ${days.length} days.`);

      // Collect all activities per day
      const activitiesByDay = [];
      const allActivityTitles = new Set();
      let hasDuplicatesAcrossDays = false;

      days.forEach(day => {
        const titles = day.activities.map(a => a.title || a.name);
        activitiesByDay.push({
          dayNumber: day.dayNumber,
          themeTitle: day.themeTitle,
          focusArea: day.focusArea,
          activities: titles
        });

        titles.forEach(title => {
          if (allActivityTitles.has(title)) {
            hasDuplicatesAcrossDays = true;
            console.log(`   ⚠️ Duplicate detected across days: "${title}" in Day ${day.dayNumber}`);
          }
          allActivityTitles.add(title);
        });
      });

      // Log day themes and activities
      activitiesByDay.forEach(d => {
        console.log(`   📅 Day ${d.dayNumber} [${d.themeTitle || 'Unique Day'}] (Focus: ${d.focusArea || 'Highlights'}):`);
        d.activities.forEach((act, idx) => {
          console.log(`      - Slot ${idx + 1}: ${act}`);
        });
      });

      if (!hasDuplicatesAcrossDays) {
        console.log(`   ✔ SUCCESS: All ${allActivityTitles.size} activities across Day 1, Day 2, Day 3 are 100% UNIQUE and non-repeating!`);
      } else {
        console.log('   ❌ FAILED: Found repeated activities across days.');
        passedAll = false;
      }

      // Check that Day 1 is not equal to Day 2
      const day1Acts = JSON.stringify(activitiesByDay[0].activities);
      const day2Acts = JSON.stringify(activitiesByDay[1].activities);
      if (day1Acts !== day2Acts) {
        console.log('   ✔ Day 1 activities !== Day 2 activities (Plans change every day)');
      } else {
        console.log('   ❌ Day 1 and Day 2 are identical!');
        passedAll = false;
      }

    } catch (err) {
      console.log(`   ❌ Error during ${testDest.name} test:`, err.message);
      passedAll = false;
    }
  }

  // 4. Test Hugging Face Itinerary Generation endpoint
  console.log('\n4. Testing Hugging Face Full Itinerary Generation (/api/ai/huggingface/generate-itinerary)...');
  try {
    const hfRes = await postRequest('/api/ai/huggingface/generate-itinerary', {
      destinationId: 'dubai',
      destinationName: 'Dubai',
      daysCount: 3,
      numberOfDays: 3,
      travelStyle: 'Comfort',
      interests: ['Sightseeing', 'Shopping', 'Adventure']
    });

    const hfTrip = hfRes.data.trip || hfRes.data.data || hfRes.data;
    if (hfRes.status === 200 && hfTrip && hfTrip.days && hfTrip.days.length === 3) {
      console.log('   ✔ Successfully generated 3-day itinerary with Hugging Face AI pipeline:');
      hfTrip.days.forEach(d => {
        console.log(`     Day ${d.dayNumber} Theme: "${d.themeTitle}" -> Activities: ${d.activities.length}`);
      });
    } else {
      console.log('   ❌ Hugging Face itinerary generation failed:', hfRes);
      passedAll = false;
    }
  } catch (err) {
    console.log('   ❌ Error requesting HF itinerary:', err.message);
    passedAll = false;
  }

  console.log('\n====================================================');
  if (passedAll) {
    console.log('🎉 ALL HUGGING FACE & DISTINCT DAY-PLAN TESTS PASSED! 100%');
  } else {
    console.log('❌ SOME TESTS FAILED. PLEASE REVIEW LOGS.');
    process.exit(1);
  }
  console.log('====================================================');
}

runTests();
