const fs = require('fs');
const path = require('path');

// Update server/services/destinationService.js and client/src/services/destinationService.js
// to add rich places to vizag, switzerland, new-zealand, sydney while preserving existing IDs

function updateServiceFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if already updated
  if (content.includes('vizag-tenneti')) {
    console.log(`Already updated: ${filePath}`);
    return;
  }

  // 1. Vizag additions
  const vizagMorePlaces = `      {
        id: 'vizag-tenneti',
        name: 'Tenneti Park Sea-Facing Green Amphitheater',
        category: 'Nature',
        rating: 4.6,
        price: 0,
        location: 'Jodugullapalem',
        description: 'Lush coastal park with stone amphitheaters looking straight onto the shoreline.',
        tags: ['Nature', 'Sunset', 'Relaxed']
      },
      {
        id: 'vizag-andhra-food',
        name: 'Authentic Andhra Spicy Seafood Thali',
        category: 'Food',
        rating: 4.9,
        price: 450,
        location: 'Siripuram',
        description: 'Fiery Andhra coastal dining featuring spicy prawn fry, vanjaram fish, and gongura rice.',
        tags: ['Food', 'Spicy', 'Seafood']
      },
      {
        id: 'vizag-simhachalam',
        name: 'Simhachalam Varaha Narasimha Hill Temple',
        category: 'Culture',
        rating: 4.8,
        price: 0,
        location: 'Simhachalam Hill Range',
        description: 'Ancient 11th-century hill shrine built in Kalinga architecture adorned with 500 carved pillars.',
        tags: ['Culture', 'History', 'Spiritual']
      },
      {
        id: 'vizag-dolphins-nose',
        name: 'Dolphin\\'s Nose Lighthouse Cliff Lookout',
        category: 'Sightseeing',
        rating: 4.6,
        price: 20,
        location: 'Dolphin Hill',
        description: 'Rocky promontory 358m above sea level with a historic light beam reaching 64km out to sea.',
        tags: ['Sightseeing', 'Ocean View', 'History']
      },
      {
        id: 'vizag-yarada-bay',
        name: 'Yarada Beach Golden Sands & Coconut Palm Bay',
        category: 'Beach',
        rating: 4.8,
        price: 30,
        location: 'Yarada',
        description: 'Secluded beach flanked by green hills on three sides and rolling emerald waves.',
        tags: ['Beach', 'Nature', 'Relaxed']
      },
      {
        id: 'vizag-tu-142',
        name: 'TU 142 Aircraft Naval Museum',
        category: 'History',
        rating: 4.7,
        price: 70,
        location: 'Beach Road',
        description: 'Decommissioned Tupolev long-range anti-submarine reconnaissance plane converted into museum.',
        tags: ['History', 'Aviation', 'Family']
      },
      {
        id: 'vizag-street-bites',
        name: 'Submarine Roadside Night Street Food Bites',
        category: 'Food',
        rating: 4.7,
        price: 150,
        location: 'Beach Road Footpath',
        description: 'Evening street food stalls serving hot muri mixture, egg bondas, and steamed sweet corn.',
        tags: ['Food', 'Street Eats', 'Evening']
      },
      {
        id: 'vizag-aquarium',
        name: 'Matsyadarshini Marine Life Aquarium',
        category: 'Sightseeing',
        rating: 4.5,
        price: 50,
        location: 'RK Beach',
        description: 'Aquarium housing exotic sea creatures, lionfish, stonefish, and marine turtles facing the coast.',
        tags: ['Sightseeing', 'Marine', 'Family']
      }`;

  // Insert before the closing bracket of vizag places
  // The vizag places array ends before "foods:" in vizag
  content = content.replace(/(id:\s*'vizag-araku'[\s\S]*?tags:\s*\[.*?\]\s*\}\s*)\n(\s*\]\s*,\s*foods:)/, `$1,\n${vizagMorePlaces}\n$2`);

  // 2. Switzerland additions
  const swissMorePlaces = `      {
        id: 'swiss-fondue-chalet',
        name: 'Authentic Swiss Cheese Fondue & Raclette Chalet',
        category: 'Food',
        rating: 4.9,
        price: 3200,
        location: 'Traditional Alpine Chalet',
        description: 'Melted Gruyere and Emmental simmered with white wine, served with crusty bread and rosti.',
        tags: ['Food', 'Iconic', 'Traditional']
      },
      {
        id: 'swiss-rhine-falls',
        name: 'Rhine Falls Central Rock Boat Ride',
        category: 'Nature',
        rating: 4.7,
        price: 900,
        location: 'Neuhausen am Rheinfall',
        description: 'Europe\\'s most powerful waterfall with thundering turquoise rapids and tour boats.',
        tags: ['Nature', 'Waterfalls', 'Adventure']
      },
      {
        id: 'swiss-harder-kulm',
        name: 'Interlaken Harder Kulm Two Lakes Panorama Bridge',
        category: 'Sightseeing',
        rating: 4.8,
        price: 3800,
        location: 'Interlaken',
        description: 'Funicular ride up to the Two Lakes Bridge gazing over Lake Brienz, Lake Thun, and Jungfrau.',
        tags: ['Sightseeing', 'Panoramic', 'Sunset']
      },
      {
        id: 'swiss-bern-clock',
        name: 'Bern UNESCO Medieval Altstadt & Zytglogge Clock',
        category: 'Culture',
        rating: 4.7,
        price: 0,
        location: 'Kramgasse, Bern',
        description: 'Swiss capital\\'s sandstone arcade street featuring the 13th-century astronomical clock tower.',
        tags: ['Culture', 'History', 'UNESCO']
      },
      {
        id: 'swiss-grindelwald',
        name: 'Grindelwald First Cliff Walk by Tissot',
        category: 'Adventure',
        rating: 4.8,
        price: 3500,
        location: 'Grindelwald',
        description: 'Thrilling metal catwalk suspended 2,168m high along vertical rock walls over the void.',
        tags: ['Adventure', 'Heights', 'Views']
      },
      {
        id: 'swiss-lindt',
        name: 'Lindt Home of Chocolate Giant Fountain Kilchberg',
        category: 'Food',
        rating: 4.8,
        price: 1500,
        location: 'Kilchberg, Zurich',
        description: 'Spectacular museum featuring a 9-meter real liquid chocolate fountain and tasting rooms.',
        tags: ['Food', 'Chocolate', 'Family']
      },
      {
        id: 'swiss-lauterbrunnen',
        name: 'Lauterbrunnen Valley of 72 Waterfalls & Staubbach',
        category: 'Nature',
        rating: 4.9,
        price: 0,
        location: 'Lauterbrunnen Valley',
        description: 'Rivendell inspiration flanked by soaring sheer cliffs and the 300m Staubbach plunge waterfall.',
        tags: ['Nature', 'Waterfalls', 'Photography']
      },
      {
        id: 'swiss-glacier-express',
        name: 'Glacier Express Scenic Alpine Rail Experience',
        category: 'Sightseeing',
        rating: 4.9,
        price: 12000,
        location: 'Zermatt to St. Moritz Route',
        description: 'World\\'s slowest express train passing over 291 stone bridges and through 91 tunnels.',
        tags: ['Sightseeing', 'Scenic Train', 'Iconic']
      }`;

  content = content.replace(/(id:\s*'swiss-interlaken-lake'[\s\S]*?tags:\s*\[.*?\]\s*\}\s*)\n(\s*\]\s*,\s*foods:)/, `$1,\n${swissMorePlaces}\n$2`);

  // 3. New Zealand additions
  const nzMorePlaces = `      {
        id: 'nz-queenstown-luge',
        name: 'Queenstown Skyline Gondola & Gravity Luge',
        category: 'Adventure',
        rating: 4.8,
        price: 3600,
        location: 'Queenstown',
        description: 'Ride steep cable gondola 450m above Lake Wakatipu then race wheeled luge carts down mountain tracks.',
        tags: ['Adventure', 'Panoramic', 'Fun']
      },
      {
        id: 'nz-waitomo',
        name: 'Waitomo Glowworm Caves Underground Boat Ride',
        category: 'Adventure',
        rating: 4.8,
        price: 3800,
        location: 'Waitomo Caves',
        description: 'Silent subterranean boat glide beneath thousands of bioluminescent glowworms on limestone ceilings.',
        tags: ['Adventure', 'Nature', 'Caves']
      },
      {
        id: 'nz-hooker-valley',
        name: 'Mount Cook / Aoraki Hooker Valley Alpine Track',
        category: 'Nature',
        rating: 4.9,
        price: 0,
        location: 'Mount Cook National Park',
        description: 'Flat scenic track crossing three swing bridges over glacier rivers to Hooker Lake icebergs.',
        tags: ['Nature', 'Trek', 'Glacier']
      },
      {
        id: 'nz-sky-tower',
        name: 'Auckland Sky Tower 360 Observation Deck',
        category: 'Sightseeing',
        rating: 4.6,
        price: 2100,
        location: 'Auckland Central',
        description: '328-meter tower with glass floor viewing panels, revolving dining, and harbor views.',
        tags: ['Sightseeing', 'Panoramic', 'City Views']
      },
      {
        id: 'nz-fergburger',
        name: 'Authentic Fergburger Gourmet Burger Queenstown',
        category: 'Food',
        rating: 4.9,
        price: 1100,
        location: 'Shotover St, Queenstown',
        description: 'World-famous burger institution crafting prime New Zealand beef burgers and brioche buns.',
        tags: ['Food', 'Iconic', 'Culinary']
      },
      {
        id: 'nz-wanaka',
        name: 'Lake Wanaka & That Wanaka Tree Photography',
        category: 'Nature',
        rating: 4.8,
        price: 0,
        location: 'Wanaka Lakefront',
        description: 'Lone willow growing directly inside the glacial waters of Lake Wanaka against southern alps.',
        tags: ['Nature', 'Photography', 'Sunset']
      },
      {
        id: 'nz-cathedral-cove',
        name: 'Coromandel Cathedral Cove & Hot Water Beach',
        category: 'Beach',
        rating: 4.8,
        price: 0,
        location: 'Coromandel Peninsula',
        description: 'Naturally carved cathedral limestone archway opening to white sandy beaches and thermal spa pools.',
        tags: ['Beach', 'Nature', 'Coastal']
      },
      {
        id: 'nz-waiheke',
        name: 'Waiheke Island Vineyards & Olive Oil Tasting',
        category: 'Food',
        rating: 4.8,
        price: 4500,
        location: 'Hauraki Gulf',
        description: 'Ferry ride from Auckland to Mediterranean micro-climate island celebrated for Syrah wines and dining.',
        tags: ['Food', 'Wine', 'Island']
      }`;

  content = content.replace(/(id:\s*'nz-franz-josef'[\s\S]*?tags:\s*\[.*?\]\s*\}\s*)\n(\s*\]\s*,\s*foods:)/, `$1,\n${nzMorePlaces}\n$2`);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✔ Successfully updated: ${filePath}`);
}

updateServiceFile(path.join(__dirname, '..', 'server', 'services', 'destinationService.js'));
updateServiceFile(path.join(__dirname, '..', 'client', 'src', 'services', 'destinationService.js'));
