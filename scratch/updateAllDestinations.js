const fs = require('fs');
const path = require('path');
const { EXPANDED } = require('./completeExpandedDatasets');

const GLOBAL_EXPANDED = {
  vizag: [
    {
      id: 'vizag-kailasagiri',
      name: 'Kailasagiri Hilltop Park & Cable Car',
      category: 'Sightseeing',
      rating: 4.8,
      price: 150,
      location: 'Hill Top Road',
      description: 'Elevated hilltop garden with monumental Shiva-Parvati statues, ropeway cable car, and 360-degree panoramic ocean views.',
      tags: ['Nature', 'Photography', 'Adventure'],
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      openingHours: '06:00 - 19:30',
      bestTimeToVisit: 'Morning & Evening'
    },
    {
      id: 'vizag-sub-museum',
      name: 'INS Kursura Submarine Beach Museum',
      category: 'History',
      rating: 4.8,
      price: 70,
      location: 'RK Beach Road',
      description: 'Real decommissioned Soviet-built submarine preserved on the sands, offering guided walkthroughs inside.',
      tags: ['History', 'Culture'],
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
      openingHours: '14:00 - 20:30',
      bestTimeToVisit: 'Afternoon'
    },
    {
      id: 'vizag-rk-beach',
      name: 'Ramakrishna (RK) Beach & Sunset Promenade',
      category: 'Beach',
      rating: 4.7,
      price: 0,
      location: 'Beach Road, Visakhapatnam',
      description: 'Vibrant sea-facing promenade popular for golden sunsets, refreshing coastal breezes, and street snacks.',
      tags: ['Beaches', 'Photography', 'Food'],
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      openingHours: '24 Hours',
      bestTimeToVisit: 'Sunrise & Sunset'
    },
    {
      id: 'vizag-borra-caves',
      name: 'Borra Caves & Million-Year Stalactites Excursion',
      category: 'Adventure',
      rating: 4.8,
      price: 110,
      location: 'Ananthagiri Hills, Araku',
      description: 'Deepest karstic limestone caves in India featuring million-year-old speleothems lit with kaleidoscopic multi-colored lights.',
      tags: ['Adventure', 'Nature', 'Geology'],
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      openingHours: '10:00 - 17:00',
      bestTimeToVisit: 'Day Tour'
    },
    {
      id: 'vizag-araku-valley',
      name: 'Araku Valley Coffee Plantations & Tribal Heritage',
      category: 'Nature',
      rating: 4.9,
      price: 80,
      location: 'Eastern Ghats, Araku',
      description: 'Verdant hill station enveloped in organic arabica coffee estates, Chaparai cascading waters, and indigenous tribal crafts.',
      tags: ['Nature', 'Culture', 'Coffee'],
      image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
      openingHours: '09:00 - 17:30',
      bestTimeToVisit: 'Morning'
    },
    {
      id: 'vizag-tu-142',
      name: 'TU 142 Aircraft Naval Museum',
      category: 'History',
      rating: 4.7,
      price: 70,
      location: 'Opposite Kursura Submarine, Beach Road',
      description: 'Decommissioned Tupolev long-range anti-submarine reconnaissance plane converted into an interactive aviation exhibit.',
      tags: ['History', 'Aviation', 'Family'],
      image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80',
      openingHours: '14:00 - 20:30',
      bestTimeToVisit: 'Evening'
    },
    {
      id: 'vizag-rushikonda',
      name: 'Rushikonda Beach Water Sports & Kayaking',
      category: 'Beach',
      rating: 4.7,
      price: 250,
      location: 'Bheemili Road',
      description: 'Blue Flag-certified beach renowned for golden sands, safe swimming waters, speedboats, and sea kayaking.',
      tags: ['Beach', 'Adventure', 'Watersports'],
      image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80',
      openingHours: '06:00 - 18:30',
      bestTimeToVisit: 'Morning & Late Afternoon'
    },
    {
      id: 'vizag-ross-hill',
      name: 'Ross Hill Interfaith Triple Summit View',
      category: 'Culture',
      rating: 4.6,
      price: 0,
      location: 'Port Area',
      description: 'Three adjacent hills harboring a Catholic Church, a historic Dargah, and a Venkateswara temple overlooking the harbour.',
      tags: ['Culture', 'Panoramic', 'History'],
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
      openingHours: '06:00 - 19:00',
      bestTimeToVisit: 'Late Afternoon'
    },
    {
      id: 'vizag-yarada',
      name: 'Yarada Beach Golden Sands & Coconut Bay',
      category: 'Beach',
      rating: 4.8,
      price: 30,
      location: 'Yarada, Dolphin Hill',
      description: 'Secluded paradise beach bounded by hills on three sides and emerald waves on the fourth, lined with coconut palms.',
      tags: ['Beach', 'Nature', 'Relaxed'],
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      openingHours: '07:00 - 18:00',
      bestTimeToVisit: 'Morning'
    },
    {
      id: 'vizag-dolphins-nose',
      name: 'Dolphin\'s Nose Lighthouse Cliff Lookout',
      category: 'Sightseeing',
      rating: 4.6,
      price: 20,
      location: 'Naval Base Area, Dolphin Hill',
      description: 'Rocky promontory 358m above sea level resembling a dolphin\'s snout with a 150-year-old light beam reaching 64km out to sea.',
      tags: ['Sightseeing', 'Ocean View', 'History'],
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      openingHours: '15:00 - 17:00',
      bestTimeToVisit: 'Afternoon'
    },
    {
      id: 'vizag-zoo',
      name: 'Indira Gandhi Zoological Park Bay Vista',
      category: 'Nature',
      rating: 4.5,
      price: 60,
      location: 'Yendada',
      description: '625-acre natural reserve nestled in Kambalakonda Wildlife Sanctuary overlooking the Bay of Bengal.',
      tags: ['Nature', 'Wildlife', 'Family'],
      image: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=800&q=80',
      openingHours: '09:00 - 17:00',
      bestTimeToVisit: 'Morning'
    },
    {
      id: 'vizag-andhra-food',
      name: 'Authentic Andhra Spicy Seafood Thali & Bamboo Chicken',
      category: 'Food',
      rating: 4.9,
      price: 450,
      location: 'Dwaraka Nagar / Siripuram',
      description: 'Fiery Andhra coastal dining featuring royyala vepudu (spicy prawn fry), vanjaram fish fry, and aromatic gongura rice.',
      tags: ['Food', 'Spicy', 'Seafood'],
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
      openingHours: '12:00 - 23:00',
      bestTimeToVisit: 'Lunch & Dinner'
    },
    {
      id: 'vizag-tenneti',
      name: 'Tenneti Park Sea-Facing Green Amphitheater',
      category: 'Nature',
      rating: 4.6,
      price: 0,
      location: 'Jodugullapalem',
      description: 'Lush park on coastal cliffs with stone amphitheaters looking straight onto the shoreline and grounded cargo ships.',
      tags: ['Nature', 'Sunset', 'Relaxed'],
      image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
      openingHours: '06:00 - 21:00',
      bestTimeToVisit: 'Sunset'
    },
    {
      id: 'vizag-street-food',
      name: 'Submarine Roadside Night Street Food Bites',
      category: 'Food',
      rating: 4.7,
      price: 150,
      location: 'Beach Road Footpath',
      description: 'Popular evening street food stalls serving hot muri mixture (spiced puffed rice), egg bondas, and steamed sweet corn.',
      tags: ['Food', 'Street Eats', 'Evening'],
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      openingHours: '16:30 - 22:30',
      bestTimeToVisit: 'Evening'
    },
    {
      id: 'vizag-simhachalam',
      name: 'Simhachalam Varaha Lakshmi Narasimha Temple',
      category: 'Culture',
      rating: 4.8,
      price: 0,
      location: 'Simhachalam Hill Range',
      description: 'Ancient 11th-century hill shrine built in Kalinga architecture adorned with 500 intricately carved stone pillars.',
      tags: ['Culture', 'History', 'Spiritual'],
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
      openingHours: '07:00 - 16:00, 18:00 - 21:00',
      bestTimeToVisit: 'Morning'
    },
    {
      id: 'vizag-aquarium',
      name: 'Matsyadarshini Marine Life Aquarium',
      category: 'Sightseeing',
      rating: 4.5,
      price: 50,
      location: 'RK Beach',
      description: 'Municipal aquarium housing exotic sea creatures, lionfish, stonefish, and marine turtles facing the coast.',
      tags: ['Sightseeing', 'Marine', 'Family'],
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
      openingHours: '09:00 - 20:00',
      bestTimeToVisit: 'Afternoon'
    }
  ],

  switzerland: [
    {
      id: 'ch-jungfraujoch',
      name: 'Jungfraujoch - Top of Europe Glacier Ice Palace',
      category: 'Adventure',
      rating: 4.9,
      price: 16000,
      location: 'Bernese Alps',
      description: 'Europe\'s highest railway station at 3,454m surrounded by the Great Aletsch Glacier and crystalline Ice Palace tunnels.',
      tags: ['Adventure', 'Snow', 'Iconic'],
      image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
      openingHours: '08:00 - 16:30',
      bestTimeToVisit: 'Morning'
    },
    {
      id: 'ch-zurich-altstadt',
      name: 'Zurich Altstadt (Old Town) & Lake Zurich Promenade',
      category: 'Sightseeing',
      rating: 4.8,
      price: 0,
      location: 'Zurich Central',
      description: 'Medieval cobblestone lanes, Grossmünster twin towers, Lindenhof hill viewpoint, and breezy lakeside strolls.',
      tags: ['Sightseeing', 'History', 'Culture'],
      image: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&w=800&q=80',
      openingHours: '24 Hours',
      bestTimeToVisit: 'Afternoon'
    },
    {
      id: 'ch-matterhorn',
      name: 'Matterhorn Glacier Paradise & Zermatt Village',
      category: 'Nature',
      rating: 4.9,
      price: 9500,
      location: 'Zermatt, Valais',
      description: 'World-famous pyramid-shaped alpine horn, car-free Swiss village, and 360-degree viewing platform above the clouds.',
      tags: ['Nature', 'Mountains', 'Photography'],
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      openingHours: '08:30 - 16:30',
      bestTimeToVisit: 'Morning'
    },
    {
      id: 'ch-lucerne-bridge',
      name: 'Lucerne Chapel Bridge & Lion Monument',
      category: 'History',
      rating: 4.7,
      price: 0,
      location: 'Lucerne Central',
      description: '14th-century covered wooden footbridge with interior historical triangular paintings, water tower, and dying lion rock relief.',
      tags: ['History', 'Architecture', 'Iconic'],
      image: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=800&q=80',
      openingHours: '24 Hours',
      bestTimeToVisit: 'Morning'
    },
    {
      id: 'ch-geneva-chillon',
      name: 'Chillon Castle & Montreux Lake Geneva Riviera',
      category: 'History',
      rating: 4.8,
      price: 1400,
      location: 'Veytaux, Montreux',
      description: 'Island castle fortress on Lake Geneva immortalized by Lord Byron, with underground Gothic vaults and alpine vistas.',
      tags: ['History', 'Castles', 'Lakes'],
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
      openingHours: '09:30 - 18:00',
      bestTimeToVisit: 'Afternoon'
    },
    {
      id: 'ch-pilatus',
      name: 'Mount Pilatus Cogwheel Railway & Dragon Ride',
      category: 'Adventure',
      rating: 4.8,
      price: 7200,
      location: 'Alpnachstad / Kriens',
      description: 'Ride the world\'s steepest cogwheel railway (48% gradient) to Pilatus Kulm summit overlooking 73 alpine peaks and Lake Lucerne.',
      tags: ['Adventure', 'Mountains', 'Scenic Train'],
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      openingHours: '08:30 - 17:30',
      bestTimeToVisit: 'Morning'
    },
    {
      id: 'ch-harder-kulm',
      name: 'Interlaken Harder Kulm Two Lakes Panorama Bridge',
      category: 'Sightseeing',
      rating: 4.8,
      price: 3800,
      location: 'Interlaken, Bernese Oberland',
      description: 'Funicular ride up to the Two Lakes Bridge cantilevered glass viewpoint gazing over Lake Brienz, Lake Thun, Eiger, and Jungfrau.',
      tags: ['Sightseeing', 'Panoramic', 'Sunset'],
      image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
      openingHours: '09:10 - 21:40',
      bestTimeToVisit: 'Sunset & Dinner'
    },
    {
      id: 'ch-rhine-falls',
      name: 'Rhine Falls Central Rock Boat Ride',
      category: 'Nature',
      rating: 4.7,
      price: 900,
      location: 'Neuhausen am Rheinfall',
      description: 'Europe\'s most powerful waterfall with thundering turquoise rapids and yellow tour boats steering directly into the spray.',
      tags: ['Nature', 'Waterfalls', 'Adventure'],
      image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
      openingHours: '09:00 - 18:00',
      bestTimeToVisit: 'Late Morning'
    },
    {
      id: 'ch-fondue-chalet',
      name: 'Authentic Swiss Cheese Fondue & Raclette Chalet',
      category: 'Food',
      rating: 4.9,
      price: 3200,
      location: 'Traditional Alpine Chalet',
      description: 'Melted Gruyère and Emmental simmered with white wine and garlic in a communal caquelon, served with crusty bread and rösti.',
      tags: ['Food', 'Iconic', 'Traditional'],
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      openingHours: '12:00 - 22:30',
      bestTimeToVisit: 'Dinner'
    },
    {
      id: 'ch-bern-clock',
      name: 'Bern UNESCO Medieval Altstadt & Zytglogge Clock',
      category: 'Culture',
      rating: 4.7,
      price: 0,
      location: 'Kramgasse, Bern',
      description: 'Swiss capital\'s sandstone arcade street featuring the 13th-century astronomical clock tower with moving mechanical figures.',
      tags: ['Culture', 'History', 'UNESCO'],
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
      openingHours: '24 Hours',
      bestTimeToVisit: 'Afternoon'
    },
    {
      id: 'ch-grindelwald-first',
      name: 'Grindelwald First Cliff Walk by Tissot',
      category: 'Adventure',
      rating: 4.8,
      price: 3500,
      location: 'Grindelwald',
      description: 'Thrilling metal catwalk suspended 2,168m high along vertical rock walls leading to a 45-meter observation platform over the void.',
      tags: ['Adventure', 'Heights', 'Views'],
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      openingHours: '09:00 - 17:00',
      bestTimeToVisit: 'Morning'
    },
    {
      id: 'ch-st-moritz',
      name: 'St. Moritz Alpine Lake Stroll & Luxury Quarter',
      category: 'Nature',
      rating: 4.7,
      price: 0,
      location: 'Engadin Valley',
      description: 'Glittering frozen/sapphire lake framed by dramatic Engadin peaks, mineral spring spas, and high-end chocolate salons.',
      tags: ['Nature', 'Luxury', 'Walks'],
      image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
      openingHours: '24 Hours',
      bestTimeToVisit: 'Afternoon'
    },
    {
      id: 'ch-lindt-chocolate',
      name: 'Lindt Home of Chocolate Giant Fountain Kilchberg',
      category: 'Food',
      rating: 4.8,
      price: 1500,
      location: 'Schokoladenplatz 1, Kilchberg',
      description: 'Spectacular museum featuring a 9-meter real liquid chocolate fountain, interactive tasting rooms, and master chocolatier courses.',
      tags: ['Food', 'Chocolate', 'Family'],
      image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=800&q=80',
      openingHours: '10:00 - 18:00',
      bestTimeToVisit: 'Morning'
    },
    {
      id: 'ch-lauterbrunnen',
      name: 'Lauterbrunnen Valley of 72 Waterfalls & Staubbach',
      category: 'Nature',
      rating: 4.9,
      price: 0,
      location: 'Lauterbrunnen Valley',
      description: 'J.R.R. Tolkien\'s real-life inspiration for Rivendell, flanked by soaring sheer cliffs and the 300m Staubbach plunge waterfall.',
      tags: ['Nature', 'Waterfalls', 'Photography'],
      image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
      openingHours: '24 Hours',
      bestTimeToVisit: 'Morning Light'
    },
    {
      id: 'ch-glacier-express',
      name: 'Glacier Express Scenic Alpine Rail Experience',
      category: 'Sightseeing',
      rating: 4.9,
      price: 12000,
      location: 'Zermatt to St. Moritz Route',
      description: 'The world\'s slowest express train passing over 291 stone bridges, through 91 tunnels, and across the 2,033m Oberalp Pass.',
      tags: ['Sightseeing', 'Scenic Train', 'Iconic'],
      image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80',
      openingHours: 'Scheduled Departures',
      bestTimeToVisit: 'Full Day'
    },
    {
      id: 'ch-aletsch-glacier',
      name: 'Aletsch Glacier UNESCO Nature Ridge Trail',
      category: 'Nature',
      rating: 4.8,
      price: 2500,
      location: 'Bettmeralp / Fiescheralp',
      description: 'Largest glacier in the Alps spanning 23km with 11 billion tons of ice, viewed from panoramic ridge cable car lookouts.',
      tags: ['Nature', 'Glacier', 'UNESCO'],
      image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
      openingHours: '08:30 - 16:30',
      bestTimeToVisit: 'Morning'
    }
  ],

  "new-zealand": [
    {
      id: 'nz-milford',
      name: 'Milford Sound Fiordland Boat Cruise & Mitre Peak',
      category: 'Nature',
      rating: 4.9,
      price: 9000,
      location: 'Fiordland National Park',
      description: 'Glacial fiord framed by vertical 1,600m rock peaks, cascading Stirling waterfalls, fur seal colonies, and dolphins.',
      tags: ['Nature', 'Cruise', 'Iconic'],
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      openingHours: '09:00 - 16:00',
      bestTimeToVisit: 'Morning Cruise'
    },
    {
      id: 'nz-hobbiton',
      name: 'Hobbiton Movie Set Tour Matamata',
      category: 'Culture',
      rating: 4.9,
      price: 5500,
      location: 'Matamata, Waikato',
      description: '12-acre permanent Shire film set featuring 44 hobbit holes, Party Tree, and refreshing cider at Green Dragon Inn.',
      tags: ['Culture', 'Cinema', 'Must-Visit'],
      image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
      openingHours: '09:00 - 17:30',
      bestTimeToVisit: 'Morning'
    },
    {
      id: 'nz-rotorua',
      name: 'Rotorua Te Puia Geysers & Maori Cultural Village',
      category: 'Culture',
      rating: 4.8,
      price: 4200,
      location: 'Rotorua',
      description: 'Pohutu Geyser erupting up to 30m high, steaming mineral pools, kiwi bird sanctuary, and traditional Maori Haka dance.',
      tags: ['Culture', 'Geothermal', 'Maori'],
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
      openingHours: '09:00 - 17:00',
      bestTimeToVisit: 'Morning'
    },
    {
      id: 'nz-queenstown-luge',
      name: 'Queenstown Skyline Gondola & Gravity Luge',
      category: 'Adventure',
      rating: 4.8,
      price: 3600,
      location: 'Brecon St, Queenstown',
      description: 'Ride steep cable gondola 450m above Lake Wakatipu then race wheeled luge carts down curving mountain tracks.',
      tags: ['Adventure', 'Panoramic', 'Fun'],
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      openingHours: '09:30 - 20:00',
      bestTimeToVisit: 'Afternoon'
    },
    {
      id: 'nz-waitomo',
      name: 'Waitomo Glowworm Caves Underground Boat Ride',
      category: 'Adventure',
      rating: 4.8,
      price: 3800,
      location: 'Waitomo Caves Rd, Otorohanga',
      description: 'Silent subterranean boat glide beneath thousands of bioluminescent Arachnocampa luminosa glowworms on limestone ceilings.',
      tags: ['Adventure', 'Nature', 'Caves'],
      image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
      openingHours: '09:00 - 17:00',
      bestTimeToVisit: 'Morning'
    },
    {
      id: 'nz-hooker-valley',
      name: 'Mount Cook / Aoraki Hooker Valley Alpine Track',
      category: 'Nature',
      rating: 4.9,
      price: 0,
      location: 'Aoraki/Mount Cook National Park',
      description: '10km flat scenic track crossing three swing bridges over roaring glacier rivers to Hooker Lake icebergs and peak views.',
      tags: ['Nature', 'Trek', 'Glacier'],
      image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
      openingHours: '24 Hours',
      bestTimeToVisit: 'Morning'
    },
    {
      id: 'nz-sky-tower',
      name: 'Auckland Sky Tower 360 Observation Deck',
      category: 'Sightseeing',
      rating: 4.6,
      price: 2100,
      location: 'Victoria & Federal St, Auckland',
      description: '328-meter southern hemisphere tower with glass floor viewing panels, revolving Orbit 360 dining, and harbor views.',
      tags: ['Sightseeing', 'Panoramic', 'City Views'],
      image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
      openingHours: '09:30 - 20:00',
      bestTimeToVisit: 'Sunset'
    },
    {
      id: 'nz-waiheke',
      name: 'Waiheke Island Vineyards & Olive Oil Tasting',
      category: 'Food',
      rating: 4.8,
      price: 4500,
      location: 'Waiheke Island, Hauraki Gulf',
      description: 'Ferry ride from Auckland to Mediterranean micro-climate island celebrated for Syrah wines, coastal bays, and dining.',
      tags: ['Food', 'Wine', 'Island'],
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
      openingHours: '10:00 - 18:00',
      bestTimeToVisit: 'Afternoon'
    },
    {
      id: 'nz-fergburger',
      name: 'Authentic Fergburger Gourmet Burger Queenstown',
      category: 'Food',
      rating: 4.9,
      price: 1100,
      location: '42 Shotover St, Queenstown',
      description: 'World-famous burger institution crafting prime New Zealand beef burgers, slow-roasted pork belly, and sweet brioche buns.',
      tags: ['Food', 'Iconic', 'Culinary'],
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      openingHours: '08:00 - 02:00',
      bestTimeToVisit: 'Late Lunch & Dinner'
    },
    {
      id: 'nz-wanaka-tree',
      name: 'Lake Wanaka & \'That Wanaka Tree\' Photography',
      category: 'Nature',
      rating: 4.8,
      price: 0,
      location: 'Wanaka Lakefront',
      description: 'Lone willow growing directly inside the glacial waters of Lake Wanaka against Mount Aspiring southern alps.',
      tags: ['Nature', 'Photography', 'Sunset'],
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      openingHours: '24 Hours',
      bestTimeToVisit: 'Sunrise & Sunset'
    },
    {
      id: 'nz-cathedral-cove',
      name: 'Coromandel Cathedral Cove & Hot Water Beach',
      category: 'Beach',
      rating: 4.8,
      price: 0,
      location: 'Hahei, Coromandel Peninsula',
      description: 'Naturally carved cathedral limestone archway opening to white sandy beaches, plus dig-your-own natural hot thermal spa pools.',
      tags: ['Beach', 'Nature', 'Coastal'],
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      openingHours: '24 Hours',
      bestTimeToVisit: 'Low Tide'
    },
    {
      id: 'nz-kaikoura',
      name: 'Kaikoura Giant Sperm Whale Ocean Catamaran',
      category: 'Nature',
      rating: 4.8,
      price: 8500,
      location: 'Whaleway Station Rd, Kaikoura',
      description: 'Deep ocean canyon catamaran cruise viewing giant resident sperm whales, dusky dolphins, and albatrosses against snow peaks.',
      tags: ['Nature', 'Wildlife', 'Ocean'],
      image: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=800&q=80',
      openingHours: '07:15 - 15:30',
      bestTimeToVisit: 'Morning'
    },
    {
      id: 'nz-tongariro',
      name: 'Tongariro Alpine Crossing Emerald Lakes Trek',
      category: 'Adventure',
      rating: 4.9,
      price: 1500,
      location: 'Tongariro National Park',
      description: 'World\'s top-rated 19.4km volcanic day hike past steaming vents, volcanic Red Crater, and vivid turquoise Emerald Lakes.',
      tags: ['Adventure', 'Volcano', 'Trek'],
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      openingHours: 'Full Day Hike',
      bestTimeToVisit: 'Early Dawn'
    },
    {
      id: 'nz-bay-islands',
      name: 'Bay of Islands Hole in the Rock Dolphin Cruise',
      category: 'Beach',
      rating: 4.7,
      price: 6500,
      location: 'Paihia Wharf',
      description: 'High-speed catamaran cruise exploring 144 subtropical islands, navigating through the Piercy Island oceanic sea tunnel.',
      tags: ['Beach', 'Boating', 'Dolphins'],
      image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80',
      openingHours: '09:00 - 16:30',
      bestTimeToVisit: 'Morning'
    },
    {
      id: 'nz-christchurch-botanic',
      name: 'Christchurch Botanic Gardens & Avon River Punting',
      category: 'Nature',
      rating: 4.7,
      price: 1800,
      location: 'Rolleston Ave, Christchurch',
      description: 'Traditional Edwardian punting boat tour on the willow-fringed River Avon through 21 hectares of heritage English flower gardens.',
      tags: ['Nature', 'Boating', 'Relaxed'],
      image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
      openingHours: '07:00 - 18:30',
      bestTimeToVisit: 'Afternoon'
    },
    {
      id: 'nz-franz-josef',
      name: 'Franz Josef Glacier Heli-Hike & Ice Caves',
      category: 'Adventure',
      rating: 4.9,
      price: 25000,
      location: 'Westland Tai Poutini National Park',
      description: 'Scenic helicopter flight onto pristine blue glacier ice followed by crampon trek through sculpted ice pinnacles.',
      tags: ['Adventure', 'Glacier', 'Helicopter'],
      image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
      openingHours: '08:30 - 15:00',
      bestTimeToVisit: 'Morning Flight'
    }
  ]
};

// Merge EXPANDED and GLOBAL_EXPANDED
const ALL_DESTINATIONS_DATA = { ...EXPANDED, ...GLOBAL_EXPANDED };

// 1. Update server/data/destinations.js
const serverDestsPath = path.join(__dirname, '..', 'server', 'data', 'destinations.js');
let serverDests = require(serverDestsPath);

serverDests = serverDests.map(d => {
  if (ALL_DESTINATIONS_DATA[d.id]) {
    return {
      ...d,
      places: ALL_DESTINATIONS_DATA[d.id]
    };
  }
  return d;
});

const serverExportStr = '// Complete Supported Destinations for TripMate Frontend\n' +
  '// Domestic: Hyderabad, Bengaluru, Goa, Delhi, Mumbai, Jaipur, Chennai, Kerala, Manali\n' +
  '// International: Dubai, Paris, Singapore, Bangkok, Bali, London, Tokyo, New York, Rome, Kuala Lumpur\n\n' +
  'const destinations = ' + JSON.stringify(serverDests, null, 2) + ';\n\nmodule.exports = destinations;\n';

fs.writeFileSync(serverDestsPath, serverExportStr, 'utf8');
console.log('✔ Updated server/data/destinations.js with comprehensive places!');

// 2. Update client/src/data/destinations.js
const clientDestsPath = path.join(__dirname, '..', 'client', 'src', 'data', 'destinations.js');
const clientExportStr = '// Complete Supported Destinations for TripMate Frontend\n' +
  '// Domestic: Hyderabad, Bengaluru, Goa, Delhi, Mumbai, Jaipur, Chennai, Kerala, Manali\n' +
  '// International: Dubai, Paris, Singapore, Bangkok, Bali, London, Tokyo, New York, Rome, Kuala Lumpur\n\n' +
  'export const destinations = ' + JSON.stringify(serverDests, null, 2) + ';\n\nexport default destinations;\n';

fs.writeFileSync(clientDestsPath, clientExportStr, 'utf8');
console.log('✔ Updated client/src/data/destinations.js with comprehensive places!');

// 3. Update server/services/destinationService.js GLOBAL_KNOWLEDGE_BASE
const serverDestServicePath = path.join(__dirname, '..', 'server', 'services', 'destinationService.js');
let serverDestServiceCode = fs.readFileSync(serverDestServicePath, 'utf8');

// Also update client/src/services/destinationService.js GLOBAL_KNOWLEDGE_BASE
const clientDestServicePath = path.join(__dirname, '..', 'client', 'src', 'services', 'destinationService.js');
let clientDestServiceCode = fs.readFileSync(clientDestServicePath, 'utf8');

console.log('Script execution complete!');
