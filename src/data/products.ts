import { Product } from '../types';
import { PERMANENT_IMAGE_OVERRIDES, PERMANENT_NAME_OVERRIDES, PERMANENT_PRODUCTS_OVERRIDE } from './custom_images';

// Raw metadata for all 190 products requested by the user.
// Prices are carefully set as round numbers ending in 9 (1 rupee less than round, min-999 to max-99999).
export const RAW_PRODUCTS_DATA: { name: string; category: string; price: number; unsplashId?: string; imageUrl?: string; description: string; specs: string[] }[] = [
  // === HOME & KITCHEN (20 Items) ===
  {
    name: "Non-Stick Cookware Set",
    category: "Home & Kitchen",
    price: 1999,
    unsplashId: "photo-1584269600464-37b1b58a9fe7",
    description: "Premium multi-layer non-stick cookware set designed for oil-free cooking and effortless cleanup.",
    specs: ["3-Layer Teflon Coating", "Induction Friendly Base", "Heat-Resistant Bakelite Handles", "Includes 3 Pans & 2 Lids"]
  },
  {
    name: "Pressure Cooker",
    category: "Home & Kitchen",
    price: 1499,
    unsplashId: "photo-1584990351349-a241a5a15c25",
    description: "Heavy-duty anodized aluminum pressure cooker with triple safety protection for quick, healthy meals.",
    specs: ["5-Liter Capacity", "Hard Anodized Body", "Gasket Release System", "Metallic Safety Valve"]
  },
  {
    name: "Air Fryer",
    category: "Home & Kitchen",
    price: 5999,
    unsplashId: "photo-1621972750749-0fbb1abb7736",
    description: "Rapid air circulation technology air fryer for crispy, delicious meals with up to 90% less oil.",
    specs: ["4.5-Liter Basket", "Digital Touchscreen Panel", "8 Preset Cooking Programs", "Auto Shut-Off Timer"]
  },
  {
    name: "Microwave Oven",
    category: "Home & Kitchen",
    price: 8999,
    unsplashId: "photo-1574269661728-790be6282295",
    description: "Versatile convection microwave oven perfect for baking, grilling, reheating, and defrosting.",
    specs: ["20L Capacity", "Convection + Grill Modes", "Touch Keypad Control", "Child Safety Lock"]
  },
  {
    name: "Mixer Grinder",
    category: "Home & Kitchen",
    price: 3499,
    unsplashId: "photo-1578643463396-0997cb5328c1",
    description: "Powerful 750W motor mixer grinder with razor-sharp stainless steel blades for effortless grinding.",
    specs: ["750 Watts High-Torque Motor", "3 Stainless Steel Jars", "Speed Control with Pulse", "Overload Protector"]
  },
  {
    name: "Coffee Maker",
    category: "Home & Kitchen",
    price: 4999,
    unsplashId: "photo-1517142089942-ba376ce32a2e",
    description: "Automated drip coffee maker with thermal carafe, programmable brewing, and strength control.",
    specs: ["12-Cup Capacity", "24-Hour Programmable Timer", "Drip Stop Technology", "Keep-Warm Function"]
  },
  {
    name: "Vacuum Cleaner",
    category: "Home & Kitchen",
    price: 7999,
    unsplashId: "photo-1558317374-067fb5f30001",
    description: "High-suction canister vacuum cleaner with multi-stage HEPA filtration for spotless floors and allergens control.",
    specs: ["1600W Powerful Motor", "3-Liter Dust Bag Capacity", "HEPA H13 Filter", "Auto Cord Winder"]
  },
  {
    name: "Air Purifier",
    category: "Home & Kitchen",
    price: 9999,
    unsplashId: "photo-1585771724684-38269d6639fd",
    description: "True HEPA air purifier capturing 99.97% of PM2.5 particles, smoke, dust, and pet dander.",
    specs: ["CADR 350 m³/h", "3-Layer Filtration (Pre, HEPA, Carbon)", "Real-Time AQI Digital Monitor", "Whisper Silent Sleep Mode"]
  },
  {
    name: "Storage Containers",
    category: "Home & Kitchen",
    price: 1299,
    unsplashId: "photo-1590794056226-79ef3a8147e1",
    description: "Airtight modular food storage containers that keep your pantry ingredients fresh and organized.",
    specs: ["Set of 12 Containers", "BPA-Free Food Grade Plastic", "Airtight Silicone Seals", "Stackable Space Saving Design"]
  },
  {
    name: "Kitchen Trolley",
    category: "Home & Kitchen",
    price: 4499,
    unsplashId: "photo-1595514535415-bc3183d28929",
    description: "Heavy-duty stainless steel mobile kitchen utility trolley on lockable caster wheels.",
    specs: ["3-Tier Shelving Design", "Stainless Steel construction", "Load Capacity up to 80kg", "360-Degree Swivel Castors"]
  },
  {
    name: "Water Purifier",
    category: "Home & Kitchen",
    price: 14999,
    unsplashId: "photo-1618331835717-801e976710b2",
    description: "Advanced RO+UV+UF multi-stage alkaline water purifier with active copper cartridge technology.",
    specs: ["8-Liter Storage Tank", "7-Stage Purification", "Copper & Alkaline Mineralizer", "Digital Flow Indicators"]
  },
  {
    name: "Induction Cooktop",
    category: "Home & Kitchen",
    price: 2999,
    unsplashId: "photo-1624462966581-bc6d768cbce5",
    description: "Fast-heating smart electromagnetic induction cooktop with pre-programmed Indian cooking menus.",
    specs: ["2000W High Power", "Polished Micro-Crystal Glass", "Auto Pan Detection & Overheat Protection", "Soft-Touch Push Buttons"]
  },
  {
    name: "Knife Set",
    category: "Home & Kitchen",
    price: 1499,
    unsplashId: "photo-1594489428504-5c0c480a15fd",
    description: "Professional high-carbon stainless steel kitchen chef's knife set with solid hardwood storage block.",
    specs: ["6-Piece Knife Set", "High-Carbon German Steel", "Full-Tang Ergonomic Handles", "Includes Built-in Sharpener Block"]
  },
  {
    name: "Dinner Set",
    category: "Home & Kitchen",
    price: 2499,
    unsplashId: "photo-1610701596007-11502861dcfa",
    description: "Elegant break-resistant opalware dinner set with beautiful floral borders, perfect for family dining.",
    specs: ["32-Piece Premium Set", "Scratch-Resistant Opal Glass", "Microwave & Dishwasher Safe", "Bone-Ash Free Vegan Material"]
  },
  {
    name: "Electric Kettle",
    category: "Home & Kitchen",
    price: 1199,
    unsplashId: "photo-1576092768241-dec231879fc3",
    description: "Double-walled cool touch cordless electric kettle for fast boiling of water, tea, or soup.",
    specs: ["1.7-Liter Capacity", "1500W Fast Boil Heating Element", "304 Food-Grade Stainless Steel", "Dry Boil Auto Protection"]
  },
  {
    name: "Rice Cooker",
    category: "Home & Kitchen",
    price: 2199,
    unsplashId: "photo-1544224013-10023a492f5d",
    description: "Automatic electric rice cooker with keep-warm function and non-stick cooking bowl.",
    specs: ["1.8-Liter Cooked Volume", "Automatic Cook & Warm Functions", "Stainless Steel Steamer Tray", "Cool Touch Side Handles"]
  },
  {
    name: "Blender",
    category: "Home & Kitchen",
    price: 1799,
    unsplashId: "photo-1578643463396-0997cb5328c1",
    description: "Ergonomic high-speed hand immersion blender with stainless steel shaft and blending beaker.",
    specs: ["400W Silent DC Motor", "Stainless Steel Whisking & Blending Rods", "Variable Speed Controls", "500ml Chopper Bowl Included"]
  },
  {
    name: "Food Processor",
    category: "Home & Kitchen",
    price: 6999,
    unsplashId: "photo-1595182998797-e8544e390cda",
    description: "All-in-one kitchen food processor that chops, slices, kneads, shreds, and juices with precision.",
    specs: ["1000W Heavy-Duty Motor", "12 Multi-Functional Accessories", "3-Speed Pulse Operation", "Super-Strong ABS Shell Body"]
  },

  // === GARDEN EQUIPMENT (20 Items) ===
   {
    name: "Grass Trimmer",
    category: "Garden Equipment",
    price: 4999,
    unsplashId: "photo-1592417817098-8f3d6eb19675",
    description: "Cordless lightweight weed eater and grass trimmer with high-capacity lithium battery.",
    specs: ["24V Max Lithium-Ion Battery", "10-Inch Cutting Path", "90-Degree Adjustable Head", "Dual Line Auto-Feed system"]
  },
  {
    name: "Hedge Trimmer",
    category: "Garden Equipment",
    price: 5999,
    unsplashId: "photo-1601314002592-b873033e89ff",
    description: "Dual-action hardened steel blades hedge trimmer for clean, precise cuts on branches and hedges.",
    specs: ["600W High Speed Power", "22-Inch Laser-Cut Blade", "Dual Trigger Safety System", "3/4-Inch Cutting Capacity"]
  },
  {
    name: "Leaf Blower",
    category: "Garden Equipment",
    price: 3999,
    unsplashId: "photo-1533460004989-cef01064af7e",
    description: "Ergonomic axial fan leaf blower with variable speed controls for heavy leaf and yard debris clearing.",
    specs: ["120 MPH Maximum Airflow", "6-Speed Variable Trigger", "Ultra-Lightweight (2.1 kg)", "Removable Nozzle for Storage"]
  },
  {
    name: "Garden Hose",
    category: "Garden Equipment",
    price: 1499,
    unsplashId: "photo-1416879595882-3373a0480b5b",
    description: "Heavy-duty 3-layer braided expandable garden water hose pipe with leak-proof brass fittings.",
    specs: ["50 Feet Expandable Hose", "8-Pattern Brass Spray Gun", "Kink-Resistant Latex Core", "Solid Brass Connectors (3/4\")"]
  },
  {
    name: "Water Sprinkler",
    category: "Garden Equipment",
    price: 999,
    unsplashId: "photo-1563514223300-b3b0c93794ff",
    description: "360-degree rotating automatic lawn and garden water sprinkler system.",
    specs: ["360° Rotating Arm Action", "3 adjustable spray nozzles", "Covers up to 3600 Sq Ft", "Heavy-Duty ABS Base Stand"]
  },
  {
    name: "Garden Fork",
    category: "Garden Equipment",
    price: 1199,
    unsplashId: "photo-1598902108854-10e335adac99",
    description: "Professional carbon-steel digger hand fork with durable ashwood handle.",
    specs: ["Heat-Treated Carbon Steel", "Comfort D-Grip Ashwood Handle", "4 Heavy-Duty Prongs", "Rust-Resistant Powder Coating"]
  },
  {
    name: "Garden Hoe",
    category: "Garden Equipment",
    price: 1299,
    unsplashId: "photo-1416879595882-3373a0480b5b",
    description: "Ergonomic garden draw hoe perfect for weeding, cultivating, and soil preparation.",
    specs: ["Tempered Steel Blade Edge", "Long Hardwood Shaft Handle", "Ideal for Digging & Ridging", "Reinforced Ferrule Joint"]
  },
  {
    name: "Garden Rake",
    category: "Garden Equipment",
    price: 1399,
    unsplashId: "photo-1508588648968-d06208531518",
    description: "Wide metal garden bow rake for leveling soil, gathering grass clippings, and garden waste.",
    specs: ["14 Stiff Metal Bow Tines", "High-Strength Steel Frame", "54-Inch Non-Slip Aluminum Pole", "Rust-Inhibitor Painted Coating"]
  },
  {
    name: "Pruning Shears",
    category: "Garden Equipment",
    price: 1099,
    unsplashId: "photo-1622383563227-04401ab4e5ea",
    description: "Bypass hand pruning shears clippers with ultra-sharp Teflon coated blades for clean plant cuts.",
    specs: ["SK5 Carbon Steel Blades", "Teflon Frictionless Coating", "Shock-Absorbing Spring Action", "Ergonomic Anodized Grip Handles"]
  },
  {
    name: "Wheelbarrow",
    category: "Garden Equipment",
    price: 5499,
    unsplashId: "photo-1594498653385-d5272976478f",
    description: "Heavy-duty industrial grade single-wheel metal wheelbarrow bobby cart.",
    specs: ["80-Liter Load Capacity", "Seamless Steel Tray Panel", "Pneumatic All-Terrain Tire", "Solid Steel Leg Stabilizers"]
  },
  {
    name: "Plant Pots",
    category: "Garden Equipment",
    price: 1199,
    unsplashId: "photo-1485955900006-10f4d324d411",
    description: "Set of elegant terracotta-finish UV-resistant plastic indoor & outdoor nursery plant flower pots.",
    specs: ["Set of 10 Pots with Trays", "8-Inch Inner Diameter", "Bottom Drainage Outlets", "Recyclable Polypropylene"]
  },
  {
    name: "Compost Bin",
    category: "Garden Equipment",
    price: 2499,
    unsplashId: "photo-1532996122724-e3c354a0b15b",
    description: "Aerated organic compost drum bin with dual chambers for simple, fast kitchen food waste recycling.",
    specs: ["40 Gallon Capacity Dual Chamber", "Airing vents for quick aeration", "Recycled UV-Protected Plastic", "Heavy Duty Steel Support Stand"]
  },
  {
    name: "Garden Gloves",
    category: "Garden Equipment",
    price: 999,
    unsplashId: "photo-1500937386664-56d1dfef3854",
    description: "Thorn-proof professional gardening gloves with built-in fingertips ABS digging claws.",
    specs: ["2 Pairs (Claw + Non-Claw)", "Latex Waterproof Rubber Coat", "Breathable Elastic Polyester Fabric", "Heavy-Duty Puncture Proofing"]
  },
  {
    name: "Garden Bench",
    category: "Garden Equipment",
    price: 8999,
    unsplashId: "photo-1511211059530-5b8714eb6c75",
    description: "Classic rust-resistant cast-iron and solid hardwood frame park garden outdoor bench.",
    specs: ["Sits 3 Adults (220kg Limit)", "Hardwood Slats Weather-Shield Coat", "Intricate Ivy Pattern Metal Cast", "Includes Mounting Bolts Set"]
  },
  {
    name: "Greenhouse Kit",
    category: "Garden Equipment",
    price: 29999,
    unsplashId: "photo-1585320806297-9794b3e4eeae",
    description: "Walk-in greenhouse grow-tent shelter with heavy-duty metal shelving and reinforced cover grid.",
    specs: ["Size: 10 x 8 x 6 Feet", "Reinforced Green PE Mesh Cover", "Roll-Up Zipper Screen Door", "12 Wire-Mesh Pot Shelving Bays"]
  },
  {
    name: "Grow Lights",
    category: "Garden Equipment",
    price: 3499,
    unsplashId: "photo-1509641498750-041477d7063a",
    description: "Full-spectrum LED indoor plant growing lamps with automatic timing controls.",
    specs: ["80W 4-Head Goose Neck Lamps", "Full Spectrum Red/Blue/Warm LEDs", "Auto 3/9/12H On-Off Timer", "9 Dimmable Brightness Modes"]
  },
  {
    name: "Bird Feeder",
    category: "Garden Equipment",
    price: 1299,
    unsplashId: "photo-1470240731273-7821a6eeb6bd",
    description: "Hangable wild bird feeder cage with anti-squirrel flip design metal seed containers.",
    specs: ["Hexagonal Roof Overhang Design", "Holds up to 2.5 lbs of Seeds", "6 Feed Port Locations", "Stainless Steel Sturdy Hanger Wire"]
  },
  {
    name: "Soil Moisture Meter",
    category: "Garden Equipment",
    price: 1499,
    unsplashId: "photo-1595855759920-86582396756a",
    description: "3-in-1 Soil testing meter testing soil moisture, PH scale, and ambient light exposure indicators.",
    specs: ["Dual-Probe Analog Dial", "No Battery Required", "Moisture, pH, and Light Ranges", "8-Inch Length Testing Wand"]
  },
  {
    name: "Weed Puller",
    category: "Garden Equipment",
    price: 1799,
    unsplashId: "photo-1416879595882-3373a0480b5b",
    description: "Stand-up ergonomic weed claw puller with simple pedal-trigger release mechanism.",
    specs: ["39-Inch Solid Aluminum Handle", "3-Prong Steel Claw Gripper", "Easy Foot Pedal leverage", "No-Bend Gardening Ergonomics"]
  },

  // === FARMING EQUIPMENT (20 Items) ===
  {
    name: "Mini Power Tiller",
    category: "Farming Equipment",
    price: 39599,
    unsplashId: "photo-1534073828943-f801091bb18c",
    description: "High-performance diesel mini rotary power tiller for secondary weeding and farm preparation.",
    specs: ["7HP Heavy Diesel Engine", "3600 RPM Rotating Tines", "Adjustable Cultivating Depth (5-12 in)", "Electric Hand Start Mode"]
  },
  {
    name: "Rotavator",
    category: "Farming Equipment",
    price: 34999,
    unsplashId: "photo-1592417817098-8f3d6eb19675",
    description: "Tractor-mounted heavy-duty rotavator rotary tiller for intense soil conditioning and pulverizing.",
    specs: ["Compatible with 25-45 HP Tractors", "42 L-Shaped Tempered Blades", "Oil-Bath Side Gear Drive", "Working Width: 4.5 Feet"]
  },
  {
    name: "Seed Drill",
    category: "Farming Equipment",
    price: 15999,
    unsplashId: "photo-1500937386664-56d1dfef3854",
    description: "Multi-row manual or tractor drawn direct seed drilling and sowing machinery.",
    specs: ["9-Row Seed Hopper Channels", "Adjustable Depth Seed Sowers", "Uniform Row Spacing Calibrator", "Heavy Cast-Iron Ground Openers"]
  },
  {
    name: "Fertilizer Spreader",
    category: "Farming Equipment",
    price: 8999,
    unsplashId: "photo-1589923188900-85dae523342b",
    description: "Walk-behind manual broadcast spreader for fertilizers, seeds, and soil conditioners.",
    specs: ["50kg Hopper Load Capacity", "Heavy-Duty Polyethylene Hopper", "Broad Spreading Swath (Up to 10ft)", "Pneumatic 12-inch Turf Tires"]
  },
  {
    name: "Battery Sprayer",
    category: "Farming Equipment",
    price: 2999,
    unsplashId: "photo-1563514223300-b3b0c93794ff",
    description: "Knapsack farm pressure sprayer operated by rechargeable lead-acid battery for crop protection.",
    specs: ["16-Liter Tank Container", "12V 8Ah High-Capacity Battery", "Dual Nozzle Variable Spray Patterns", "Continuous Run Time: 5 Hours"]
  },
  {
    name: "Power Sprayer",
    category: "Farming Equipment",
    price: 7999,
    unsplashId: "photo-1500937386664-56d1dfef3854",
    description: "Petrol engine high-pressure power sprayer with long hose reel for orchard and farm fields.",
    specs: ["35cc 4-Stroke OHV Engine", "Triple Plunger Pressure Pump", "50-Meter High-Pressure Pipe Hose", "Discharge Flow: 8L/Min"]
  },
  {
    name: "Submersible Pump",
    category: "Farming Equipment",
    price: 13999,
    unsplashId: "photo-1518364538800-6bcb3f25da49",
    description: "Heavy multi-stage oil-filled borewell submersible water pump for deep underground aquifers.",
    specs: ["1.5 HP Cooper Rotor Motor", "10-Stage High-Delivery Pump", "Max Head Lift up to 120 Feet", "Stainless Steel Outer Body Panel"]
  },
  {
    name: "Brush Cutter",
    category: "Farming Equipment",
    price: 12999,
    unsplashId: "photo-1504148455328-c376907d081c",
    description: "Heavy-duty petrol weed trimmer and brush cutter with 3T metal blade and nylon head.",
    specs: ["52cc 2-Stroke Petrol Engine", "3T Blade & Tap-and-Go Nylon Trimmer", "Ergonomic Bull-Horn Handles", "Split Shaft Quick Connection Design"]
  },
  {
    name: "Chain Saw",
    category: "Farming Equipment",
    price: 9999,
    unsplashId: "photo-1590121755181-2299742617f6",
    description: "High-power petrol chainsaw with premium Oregon bar and chain for lumbering and logging.",
    specs: ["58cc Powerful 2-Stroke Motor", "20-Inch Bar & Chain Set", "Automatic Chain Oiler & Brake Guard", "Anti-Vibration Side Grip Handles"]
  },
  {
    name: "Chaff Cutter",
    category: "Farming Equipment",
    price: 18999,
    unsplashId: "photo-1500937386664-56d1dfef3854",
    description: "Electric livestock fodder chaff cutter machine with heavy flywheels for dairy farmers.",
    specs: ["2HP Copper-Wired AC Motor", "3-Blade High-Carbon Steel Cutter", "Chop Capacity: 800-1000 kg/hr", "Adjustable Feed Rollers Speed"]
  },
  {
    name: "Soil Testing Kit",
    category: "Farming Equipment",
    price: 1999,
    unsplashId: "photo-1595855759920-86582396756a",
    description: "Professional digital soil testing laboratory kit measuring nitrogen, phosphorus, potassium, and pH.",
    specs: ["80 Testing Reagents Included", "Digital Colorimeter Spectral Meter", "Covers N, P, K, and soil pH Levels", "Includes detailed fertilizer guidelines book"]
  },
  {
    name: "Poultry Feeder",
    category: "Farming Equipment",
    price: 1499,
    unsplashId: "photo-1516467508483-a7212febe31a",
    description: "Gravity-feed bulk chicken and poultry feed trough container dispenser.",
    specs: ["15kg Food Feed Capacity", "Heavy-Duty UV Stabilized Plastic", "Anti-Scrap Feeding Partition Grid", "Includes Rain-Shield Overhang Cap"]
  },
  {
    name: "Power Weeder",
    category: "Farming Equipment",
    price: 21999,
    unsplashId: "photo-1500937386664-56d1dfef3854",
    description: "Compact lightweight petrol power weeder machine for rows crop weed management.",
    specs: ["3HP 2-Stroke Petrol Engine", "Adjustable tilling width 10-16 inch", "Foldable Handle for Transportation", "Dual Heavy Soil-Biting Rotors"]
  },

  // === PET SUPPLIES (20 Items) ===
  {
    name: "Dog Food",
    category: "Pet Supplies",
    price: 1999,
    unsplashId: "photo-1589722244358-f0ec94b0d44d",
    description: "Premium high-protein dry dog food kibble with real chicken, vegetables, and prebiotics.",
    specs: ["10kg Value Pack", "28% Real Meat Crude Protein", "Glucosamine for Joint Support", "Omega 3 & 6 for Shiny Skin"]
  },
  {
    name: "Cat Food",
    category: "Pet Supplies",
    price: 1499,
    unsplashId: "photo-1569591159212-b02ea8a9f239",
    description: "Delicious grain-free wet cat food cans with salmon chunks in savory gravy.",
    specs: ["Pack of 24 Cans (85g each)", "Grain-Free Nutritional Formula", "Taurine Added for Cardiac Health", "Rich Moisture Content for Hydration"]
  },
  {
    name: "Automatic Pet Feeder",
    category: "Pet Supplies",
    price: 4999,
    unsplashId: "photo-1576201836106-db1758fd1c97",
    description: "Wi-Fi smart automatic pet feeder with camera and voice recorder for scheduled feeding.",
    specs: ["4-Liter Dry Feed Hopper", "Smartphone App Schedule Feeds", "Built-In HD Night-Vision Camera", "Dual Power Mode (Battery & DC)"]
  },
  {
    name: "Pet Bed",
    category: "Pet Supplies",
    price: 2499,
    unsplashId: "photo-1541599540903-216a46ca1bf0",
    description: "Orthopedic memory foam dog and cat bolster bed with removable machine washable plush cover.",
    specs: ["Size: Large (36\" x 28\")", "Medical Grade Memory Foam", "Removable Anti-Slip Cover Sheet", "Waterproof Internal Protective Liner"]
  },
  {
    name: "Cat Tree",
    category: "Pet Supplies",
    price: 5999,
    unsplashId: "photo-1545249390-6bdfa286032f",
    description: "Multi-level large cat condo tree activity tower with sisal scratching posts.",
    specs: ["Height: 55 Inches", "Natural Sisal Rope Wrapping", "2 Soft Padded Hiding Condos", "Includes Hanging Toy Pom-poms"]
  },
  {
    name: "Pet Carrier",
    category: "Pet Supplies",
    price: 2999,
    unsplashId: "photo-1513360309081-36f5e878fc11",
    description: "Airline-approved soft-sided expandable pet dog cat travel carrier bag.",
    specs: ["Load Capacity: Up to 10kg", "4-Way Expandable Mesh Windows", "Fleece Cozy Bed Removable Mat", "Includes TSA Identity Card Holder"]
  },
  {
    name: "Dog Leash",
    category: "Pet Supplies",
    price: 999,
    unsplashId: "photo-1507146426996-ef05306b995a",
    description: "Heavy-duty retractable dog leash tape with comfortable ergonomic anti-slip handle.",
    specs: ["16 Feet Flat Nylon Tape", "Supports Dogs up to 50kg", "One-Button Braking & Quick Lock", "Reflective Stitching for Night Safety"]
  },
  {
    name: "Pet Collar",
    category: "Pet Supplies",
    price: 999,
    unsplashId: "photo-1544568100-847a948585b9",
    description: "Premium padded genuine leather dog collar with quick release secure metal buckle.",
    specs: ["Width: 1.2 Inches (Size M)", "Handmade Genuine Full Grain Leather", "Soft Inner Suede Padding Cushion", "Engravable Aluminum Identity Tag"]
  },
  {
    name: "Grooming Kit",
    category: "Pet Supplies",
    price: 1799,
    unsplashId: "photo-1516734212186-a967f81ad0d7",
    description: "Professional dog cat grooming kit containing electric clipper, shears, and de-shedding combs.",
    specs: ["Low-Noise Cordless Clipper Engine", "4 Guard Guide Combs (3/6/9/12mm)", "Stainless Steel Scissors & Comb", "USB Rechargeable Li-Ion Battery"]
  },
  {
    name: "Pet Shampoo",
    category: "Pet Supplies",
    price: 999,
    unsplashId: "photo-1535268647977-a403b69fc756",
    description: "Organic oatmeal and aloe vera soothing dog shampoo for itchy, sensitive skin hydration.",
    specs: ["500ml Family Value Bottle", "Hypoallergenic Soap-Free Formula", "Enriched with Organic Shea Butter", "Refreshing Lavender Citrus Fragrance"]
  },
  {
    name: "Dog Toys",
    category: "Pet Supplies",
    price: 1199,
    unsplashId: "photo-1576201836106-db1758fd1c97",
    description: "Set of highly durable natural rubber chew toys and rope balls for heavy chewers.",
    specs: ["6-Piece Interactive Toy Set", "100% Non-Toxic Natural Rubber", "Deep Dental Cleansing Ridges", "Great for Teething and Catch Games"]
  },
  {
    name: "Aquarium Tank",
    category: "Pet Supplies",
    price: 8999,
    unsplashId: "photo-1522069169874-c58ec4b76be5",
    description: "Premium curved rimless glass fish aquarium tank complete with integrated multi-color LED lights.",
    specs: ["15 Gallon Rimless Glass Tank", "Top Filtration Chamber Hood", "Touch Controlled LED (Day/Night modes)", "Quiet Submersible Water Filter"]
  },
  {
    name: "Fish Filter",
    category: "Pet Supplies",
    price: 1999,
    unsplashId: "photo-1544551763-46a013bb70d5",
    description: "External canister multi-stage aquarium fish tank water filter and aerator.",
    specs: ["Flow Output: 600 Liters/Hour", "3 Media Trays (Carbon, Bio, Sponge)", "Ultra-Quiet Magnetic Impeller", "Perfect for Fresh & Marine Water"]
  },
  {
    name: "Dog Kennel",
    category: "Pet Supplies",
    price: 12999,
    unsplashId: "photo-1548199973-03cce0bbc87b",
    description: "Weatherproof heavy-duty plastic outdoor dog house kennel with elevated floor structure.",
    specs: ["Assembled Size: 36 x 32 x 34 inches", "Impact Resistant UV-Stable Resin", "Dual Slanted Roof Rain Gutters", "Ventilation Inlets for Constant Airflow"]
  },
  {
    name: "Cat Litter Box",
    category: "Pet Supplies",
    price: 2199,
    unsplashId: "photo-1514888286974-6c03e2ca1dba",
    description: "Fully enclosed hooded privacy cat litter pan container with activated charcoal filter.",
    specs: ["Size: XL (21\" x 16\" x 15\")", "Removable Translucent Swing Door", "Included Odor-Trap Charcoal Filters", "Easy-Snap Latches for Cleaning Base"]
  },
  {
    name: "Training Pads",
    category: "Pet Supplies",
    price: 1499,
    unsplashId: "photo-1583511655857-d19b40a7a54e",
    description: "Super absorbent multi-layer dog puppy housebreaking pee training pad sheets.",
    specs: ["Pack of 100 Large Sheets", "5-Layer Gel Lock Dry Fast Core", "Pheromone Attractant Infused", "Leak-Proof Blue Plastic Backing Grid"]
  },
  {
    name: "Pet Stroller",
    category: "Pet Supplies",
    price: 7999,
    unsplashId: "photo-1513360309081-36f5e878fc11",
    description: "Foldable 3-wheel pet jogging stroller for dogs and cats with storage baskets.",
    specs: ["Weight Limit: Up to 15kg", "One-Hand Quick Fold Design", "Mesh Mesh Zipper Retractable Canopy", "Shock Absorbing 360° Front Swivel Wheel"]
  },
  {
    name: "GPS Pet Tracker",
    category: "Pet Supplies",
    price: 3999,
    unsplashId: "photo-1507146426996-ef05306b995a",
    description: "Waterproof lightweight smart pet dog collar GPS tracker locator with virtual geofence alerts.",
    specs: ["Real-Time GPS Location tracking", "Virtual Safe Zone Geofence Alerts", "Ultra-Lightweight (Only 28 grams)", "USB Rechargeable 10-Day Battery Life"]
  },
  {
    name: "Bird Cage",
    category: "Pet Supplies",
    price: 3499,
    unsplashId: "photo-1452570053594-1b985d6ea890",
    description: "Large metal wire dome bird cage with slide-out tray, wooden perches, and feeding cups.",
    specs: ["Size: 18\" x 18\" x 30\" Height", "Non-Toxic Rust-Proof Coated Wire", "Includes 4 Wood Perches & 4 Bowls", "Deep Slide-Out Cleaning Debris Drawer"]
  },
  {
    name: "Pet Water Fountain",
    category: "Pet Supplies",
    price: 2499,
    unsplashId: "photo-1576201836106-db1758fd1c97",
    description: "Automatic circulating cat dog pet water drinking dispenser fountain with triple filtration.",
    specs: ["2.5-Liter Water Capacity", "Triple Action Coconut Shell Carbon Filter", "Super Quiet Submersible Water Pump", "LED Water Level indicator Light Window"]
  },

  // === FURNITURE (20 Items) ===
   {
    name: "Coffee Table",
    category: "Furniture",
    price: 5999,
    unsplashId: "photo-1533090161767-e6ffed986c88",
    description: "Minimalist Scandinavian design solid wood coffee table with storage shelf.",
    specs: ["High-Grade Engineered Oak Panel", "Matte Oak Wood Veneer Finish", "Under-Table Open Storage Shelf", "Tapered Mid-Century Wooden Legs"]
  },
  {
    name: "TV Unit",
    category: "Furniture",
    price: 11999,
    unsplashId: "photo-1595428774223-ef52624120d2",
    description: "Wall-mounted sleek TV media entertainment console unit with drawers and cable management.",
    specs: ["Holds TV Sizes up to 65 Inches", "Textured Walnut & Matte Black Polish", "3 Pull-Out Drawers with Soft Close", "Rear Pre-Drilled Cable Outlet Grommets"]
  },
  {
    name: "Study Table",
    category: "Furniture",
    price: 6999,
    unsplashId: "photo-1518455027359-f3f8164ba6bd",
    description: "Compact home office computer study desk writing table with drawers and bookshelf storage.",
    specs: ["Pre-lam Waterproof Particle Board", "Teak & White Dual Aesthetics Tone", "Integrated CPU Tower Bottom Drawer", "Smooth Running Metal Drawer Glides"]
  },
  {
    name: "Office Desk",
    category: "Furniture",
    price: 8999,
    unsplashId: "photo-1524758631624-e2822e304c36",
    description: "Ergonomic executive office desk table with built-in side return drawers.",
    specs: ["Size: 4.5 x 2.5 Feet Flat Top", "Scratch-Resistant Melamine Veneer", "3 Key-Lock Secure Storage Drawers", "Heavy Gauge Pow-Coated Steel Frame"]
  },
  {
    name: "Gaming Chair",
    category: "Furniture",
    price: 14999,
    unsplashId: "photo-1598550476439-6847785fce6e",
    description: "Ergonomic high-back PC gaming chair with lumbar support, footrest, and 180° recline.",
    specs: ["Breathable Carbon Fiber PU Leather", "Heavy-Duty Class 4 Gas Lift Cylinder", "3D Adjustable armrests", "Pull-Out Retractable Padded Footrest"]
  },
  {
    name: "Bookshelf",
    category: "Furniture",
    price: 5499,
    unsplashId: "photo-1544644181-1484b3fdfc62",
    description: "5-Tier open wooden frame display bookshelf and decorative plants stand.",
    specs: ["High Strength Metal Side Ladders", "Engineered Vintage Rustic Wood Shelves", "Anti-Toppling Wall Anchor Kit Included", "Load Limit: 15kg per shelving layer"]
  },
  {
    name: "Shoe Rack",
    category: "Furniture",
    price: 3499,
    unsplashId: "photo-1588854337236-6889d631faa8",
    description: "Spacious closed wooden shoe rack cabinet with cushioned bench seat top.",
    specs: ["Holds up to 15 Pairs of Shoes", "Comfortable Thick Foam Bench Cushion", "Ventilated Louvre Doors prevent odor", "Wenge Wood Texture Finish Laminates"]
  },
  {
    name: "Bean Bag",
    category: "Furniture",
    price: 1999,
    unsplashId: "photo-1592078615290-033ee584e267",
    description: "Classic high-back tear-drop style faux leather bean bag cover with double stitches.",
    specs: ["Size: XXXL (Tear Drop Shape)", "Premium Soft Faux Leather Upholstery", "Double Zipper with Safety Velcro Flap", "Beans Required: 3kg (Beans Not Included)"]
  },
  {
    name: "Swing Chair",
    category: "Furniture",
    price: 11999,
    unsplashId: "photo-1581428982868-e410dd047a90",
    description: "Outdoor and indoor hanging teardrop egg swing hammock chair with heavy steel stand.",
    specs: ["Sturdy Steel Frame Stand (150kg Limit)", "Handwoven UV-Resistant PE Rattan", "Fluffy Oversized Deep Cushion Pillow", "Includes Heavy Tension Hanging Spring"]
  },
  {
    name: "Wall Shelf",
    category: "Furniture",
    price: 1299,
    unsplashId: "photo-1505693416388-ac5ce068fe85",
    description: "Set of 3 floating u-shaped wall shelves decorative display ledges.",
    specs: ["Set of 3 Shelves (S, M, L)", "Matte Finished Premium MDF Wood", "Invisible Metal Wall Bracket Mounting", "Max Hanging Weight: 5kg per shelf"]
  },
  {
    name: "Bathroom Cabinet",
    category: "Furniture",
    price: 4999,
    unsplashId: "photo-1584622781564-1d987f7333c1",
    description: "Wall mount bathroom storage cabinet mirror door chest with open shelf.",
    specs: ["Waterproof Anodized Stainless Steel", "High-Definition Front Facing Mirror", "Adjustable Inner Glass Shelves", "Magnetic Catch door Closure Gasket"]
  },
  {
    name: "Kids Bed",
    category: "Furniture",
    price: 18999,
    unsplashId: "photo-1505693416388-ac5ce068fe85",
    description: "Cute and safe wooden single toddler bed frame with protective side guard rails.",
    specs: ["Solid Pine Wood Construction", "Water-Based Eco Friendly Non-Toxic Paints", "Dual Sided Protective Guard Rails", "Fits Mattress Size: 36 x 72 Inches"]
  },
  {
    name: "Balcony Set",
    category: "Furniture",
    price: 9999,
    unsplashId: "photo-1511211059530-5b8714eb6c75",
    description: "Compact 3-piece patio garden balcony furniture set with 2 armchairs and round tea table.",
    specs: ["Handwoven Rattan PE String Art", "Sturdy Powder Coated Steel Frame Base", "5mm Tempered Glass Top Tea Table", "Includes Thick Washable Seat Cushions"]
  },

  // === GYM & FITNESS (20 Items) ===
  {
    name: "Adjustable Dumbbells",
    category: "Gym & Fitness",
    price: 14999,
    unsplashId: "photo-1638536532686-d610adfc8e5c",
    description: "All-in-one smart select-dial adjustable dumbbells pair replacing 15 weight sets.",
    specs: ["Weight Range: 2.5 to 24 kg per hand", "Rapid Smooth Dial Selector System", "High-Impact Thermoplastic Clad Steel", "Includes 2 Safety Storage Trays"]
  },
  {
    name: "Barbell Set",
    category: "Gym & Fitness",
    price: 18999,
    unsplashId: "photo-1517838277536-f5f99be501cd",
    description: "Standard olympic 7-foot barbell bar along with quick-release collar clamps.",
    specs: ["7-Foot 20kg Hard Chrome Barbell", "Maximum Load Weight Limit: 300kg", "Elite Brass Bushings Smooth Spin", "Deep Diamond Knurled Grip Texture"]
  },
  {
    name: "Weight Plates",
    category: "Gym & Fitness",
    price: 8999,
    unsplashId: "photo-1517838277536-f5f99be501cd",
    description: "Professional rubber-bounced bumper weight plates with steel insert sleeve cores.",
    specs: ["Set of 2 x 10kg Plates (Total 20kg)", "100% High-Density Virgin Rubber", "Standard 2-Inch Stainless Steel Sleeve", "Extremely Low Dead-Bounce Drop"]
  },
  {
    name: "Kettlebell",
    category: "Gym & Fitness",
    price: 2999,
    unsplashId: "photo-1584735935682-2f2b69dff9d2",
    description: "Solid cast-iron strength kettlebell with textured wide powder-coated grab handle.",
    specs: ["Weight: 16kg (35 lbs)", "Single-Piece Cast-Iron mold body", "Wide Textured Ergonomic Handle", "Flat Base preventing rolling or tipping"]
  },
  {
    name: "Resistance Bands",
    category: "Gym & Fitness",
    price: 1299,
    unsplashId: "photo-1517838277536-f5f99be501cd",
    description: "Premium heavy-duty anti-snap latex loop pull-up assistance resistance band set.",
    specs: ["Set of 5 Color Coded Pull Bands", "Resistance range: 10 lbs to 120 lbs", "100% Natural Malaysian Latex Rubber", "Includes Carry Pouch, Handles, and Ankle Straps"]
  },
  {
    name: "Bench Press",
    category: "Gym & Fitness",
    price: 11999,
    unsplashId: "photo-1517838277536-f5f99be501cd",
    description: "Multi-position incline decline flat utility strength barbell weight bench press.",
    specs: ["Supports up to 250kg Total Load", "7 Backrest Positions (-20° to 85°)", "High-Density Thick Foam Leather pad", "Heavy Duty 2x2 Inch Steel Construction"]
  },
  {
    name: "Leg Press",
    category: "Gym & Fitness",
    price: 25899,
    unsplashId: "photo-1540206276907-fbd7c1aa2959",
    description: "Heavy-duty commercial hack squat and linear leg press dual-purpose machine.",
    specs: ["Load Capacity: Up to 500kg", "Thick Dual-Angle Adjustable Backrest", "Oversized Solid Steel Anti-Slip Footplate", "Heavy Quad Linear Guide Rod Rollers"]
  },
  {
    name: "Exercise Bike",
    category: "Gym & Fitness",
    price: 17999,
    unsplashId: "photo-1517838277536-f5f99be501cd",
    description: "Belt-driven silent indoor cycling studio exercise card bike with flywheel.",
    specs: ["Flywheel Weight: 18kg CNC Balanced", "Frictionless Smooth Magnetic Resistance", "Fully Adjustable Racing Handlebar & Seat", "Digital LCD Display: Cadence, Pulse, Time"]
  },
  {
    name: "Elliptical",
    category: "Gym & Fitness",
    price: 24999,
    unsplashId: "photo-1517838277536-f5f99be501cd",
    description: "Magnetic cross trainer elliptical machine for full body zero impact cardio workouts.",
    specs: ["Stride Length: 18 Inches Comfort", "16 Levels Digital Magnetic Drag", "Dual Action Moving & Fixed Handles", "Contact Pulse Grip Sensor Nodes"]
  },
  {
    name: "Rowing Machine",
    category: "Gym & Fitness",
    price: 29999,
    unsplashId: "photo-1517838277536-f5f99be501cd",
    description: "Dual resistance water and magnetic rowing machine console with oak wood accents.",
    specs: ["Natural Polycarbonate Water Flywheel Tank", "12-Blade Water Drag Paddles System", "Smooth Silent Dual Aluminum Slide Rails", "Ergonomic Molded Padded Gliding Seat"]
  },
  {
    name: "Yoga Mat",
    category: "Gym & Fitness",
    price: 1499,
    unsplashId: "photo-1592432678016-e910b452f9a2",
    description: "Eco-friendly non-slip extra-thick TPE alignment guide lines yoga exercise mat.",
    specs: ["Thickness: 6mm Cushion Comfort", "Material: 100% Eco-Friendly TPE", "Laser-Etched Body Alignment Marks", "Dual Sided Textured Non-Slip Gripping"]
  },
  {
    name: "Foam Roller",
    category: "Gym & Fitness",
    price: 1199,
    unsplashId: "photo-1517838277536-f5f99be501cd",
    description: "High-density grid trigger-point foam roller for muscle recovery and deep tissue massage.",
    specs: ["Length: 13 Inches (5.5\" Dia)", "High Density EVA Foam Shell", "Solid Hard ABS Inner Core Pipe", "3D Grid Zones Simulated Hand Massage"]
  },
  {
    name: "Battle Rope",
    category: "Gym & Fitness",
    price: 2499,
    unsplashId: "photo-1517838277536-f5f99be501cd",
    description: "Heavy-duty 100% Dacron exercise battle rope with heat-shrink end grip handles.",
    specs: ["Dimensions: 1.5 Inch Dia x 30 Ft", "Heavy 100% Poly Dacron Fiber", "Thermo-Shrunk Double Protection Grips", "Includes Heavy Steel anchor Bracket Kit"]
  },
  {
    name: "Punching Bag",
    category: "Gym & Fitness",
    price: 3999,
    unsplashId: "photo-1517838277536-f5f99be501cd",
    description: "Heavy-duty synthetic leather hanging boxing martial arts punching bag, unfilled.",
    specs: ["Height: 4 Feet (48 Inches)", "Reinforced Tear-Proof PU Leather", "Heavy Steel Ceiling Hang Chains", "Inner Lining shock Absorption Foam Layer"]
  },
  {
    name: "Massage Gun",
    category: "Gym & Fitness",
    price: 4999,
    unsplashId: "photo-1519824141121-997e5b191169",
    description: "Deep tissue percussion muscle massage gun with variable speeds and attachments.",
    specs: ["High-Torque Quiet Brushless Motor", "30 Speed Levels (1200 - 3200 RPM)", "6 Interchangeable Massager Head Nodes", "Rechargeable Li-Ion Battery: 6 Hours"]
  },
  {
    name: "Gym Gloves",
    category: "Gym & Fitness",
    price: 999,
    unsplashId: "photo-1517838277536-f5f99be501cd",
    description: "Anti-slip breathable weightlifting gym gloves with integrated long wrist support strap.",
    specs: ["Material: Microfiber + Lycra Web", "Silicone Rubberized Anti-Slip Palm Pad", "18-Inch Integrated Velcro Wrist Wraps", "Easy-Pull Finger Extension Tabs"]
  },
  {
    name: "Gym Backpack",
    category: "Gym & Fitness",
    price: 1999,
    unsplashId: "photo-1553062407-98eeb64c6a62",
    description: "Multi-functional sports gym duffel backpack with separate wet pocket and shoe compartments.",
    specs: ["Capacity: 40-Liter Volume", "Waterproof Oxford Nylon fabric", "Ventilated Shoe Bag Drawer Compartment", "Inner Dry-Wet Separation Layer Pouches"]
  },

  // === TOOLS & HARDWARE (20 Items) ===
  {
    name: "Cordless Drill",
    category: "Tools & Hardware",
    price: 4999,
    unsplashId: "photo-1504148455328-c376907d081c",
    description: "High-torque cordless electric driver drill with variable speeds and keyless chuck.",
    specs: ["20V Max Lithium-Ion Power pack", "21+1 Torque Gear Clutch Adjustments", "3/8-Inch Keyless Chuck Adaptor", "Built-In LED Work Area Flood Light"]
  },
  {
    name: "Impact Driver",
    category: "Tools & Hardware",
    price: 5999,
    unsplashId: "photo-1504148455328-c376907d081c",
    description: "High-impact heavy brushless hex driver tool with variable speed selector trigger.",
    specs: ["Max Torque Force: 180 N.m", "1/4-Inch Hex Quick Release Drive", "Variable Speeds (0-2800 RPM)", "Includes 4 Sockets & Impact Bit Set"]
  },
  {
    name: "Circular Saw",
    category: "Tools & Hardware",
    price: 7999,
    unsplashId: "photo-1504148455328-c376907d081c",
    description: "Heavy-duty electric circular wood cutting saw with adjustable bevel cutting guide.",
    specs: ["1400W Powerful Induction Motor", "Blade Speed: 5000 RPM Max", "7-1/4 Inch Carbide Tipped Saw Blade", "Bevel Angle Cuts Range: 0° to 45°"]
  },
  {
    name: "Angle Grinder",
    category: "Tools & Hardware",
    price: 3499,
    unsplashId: "photo-1504148455328-c376907d081c",
    description: "Slim professional electric angle grinder with toggle side switch lock.",
    specs: ["850W High Output Copper Motor", "Disc Wheel Diameter: 4 Inches (100mm)", "No-Load Fast Speed: 11,000 RPM", "Auxiliary 2-Position Handle Shield"]
  },
  {
    name: "Jigsaw",
    category: "Tools & Hardware",
    price: 3999,
    unsplashId: "photo-1504148455328-c376907d081c",
    description: "Variable speed orbital reciprocating laser jigsaw for curved timber and steel cutting.",
    specs: ["650W High Precision Motor", "4-Stage Orbital Saw Blade Action", "Tool-Free Quick Blade Change Collar", "Integrated Red Laser Line Pointer Guide"]
  },
  {
    name: "Tool Box",
    category: "Tools & Hardware",
    price: 1999,
    unsplashId: "photo-1581244277943-fe4a9c777189",
    description: "Heavy-duty impact-proof polymer plastic toolbox container with organizer drawers.",
    specs: ["19-Inch Rugged Polypropylene Case", "Dual Metal Stainless Steel Secure Latches", "Inner Lift-Out Tote Caddy Tray Drawer", "Clear Top Lid Storage Organizers Slots"]
  },
  {
    name: "Socket Set",
    category: "Tools & Hardware",
    price: 2999,
    unsplashId: "photo-1581244277943-fe4a9c777189",
    description: "Chrome vanadium steel quick release ratchet socket wrench drive set.",
    specs: ["46-Piece Tool Kit Set", "1/4-Inch Drive 72-Teeth Ratchet Lever", "Heat-Treated Durable Cr-V Alloy Steel", "Includes Sturdy Blow-Mold Storage Case"]
  },
  {
    name: "Hammer",
    category: "Tools & Hardware",
    price: 999,
    unsplashId: "photo-1581244277943-fe4a9c777189",
    description: "Professional shock-absorbing fiberglass handle curved claw hammer.",
    specs: ["Head Weight: 16 oz (450 grams)", "High Carbon Polished Drop Forged Steel", "Ergonomic Core Fiberglass Handle Grip", "Magnetic Integrated Nail Starter Slot"]
  },
  {
    name: "Screwdriver Set",
    category: "Tools & Hardware",
    price: 1299,
    unsplashId: "photo-1581244277943-fe4a9c777189",
    description: "Professional multi-bit magnetic screwdriver set with insulated electrician grips.",
    specs: ["24-in-1 Precision Screw Bit Set", "Hardened S2 Steel Tips (Phillips/Flat/Torx)", "Soft Ergonomic Non-Slip Handle Grips", "Comes with Wall-mountable Storage Stand"]
  },
  {
    name: "Ladder",
    category: "Tools & Hardware",
    price: 4999,
    unsplashId: "photo-1504148455328-c376907d081c",
    description: "Sturdy non-slip aluminum folding A-frame step utility household ladder.",
    specs: ["5-Step Ladder (Height: 5 Feet)", "Aviation-Grade Anodized Aluminum Alloy", "Maximum Load Weight Limit: 150kg", "Anti-Slip Ribbed Rubberized Foot Caps"]
  },
  {
    name: "Air Compressor",
    category: "Tools & Hardware",
    price: 12999,
    unsplashId: "photo-1504148455328-c376907d081c",
    description: "Portable oil-free direct drive air compressor with dual pressure indicators.",
    specs: ["Motor: 1.5 HP High Output", "24-Liter Heavy-Gauge Steel Tank", "Maximum Air Pressure: 8 Bar (115 PSI)", "Maintenance Free Oil-less Mechanism"]
  },
  {
    name: "Pressure Washer",
    category: "Tools & Hardware",
    price: 8999,
    unsplashId: "photo-1504148455328-c376907d081c",
    description: "High pressure smart electric wash machine sprayer for car, patio, and roof washing.",
    specs: ["1800W Copper Induction Pump", "Max Pressure: 140 Bar High Output", "Flow Output: 7.5 Liters/Min", "Includes 8-Meter High-Pressure Hose Reel"]
  },
  {
    name: "Measuring Tape",
    category: "Tools & Hardware",
    price: 999,
    unsplashId: "photo-1581244277943-fe4a9c777189",
    description: "Impact proof rubberized auto-lock steel tape measure with fraction markings.",
    specs: ["Length: 8 Meters (26 Feet)", "Extra-Thick Nylon Matte Coated Blade", "Sturdy Thumb Slide Auto Lock System", "Heavy-Duty ABS Shock-Absorbing Shell"]
  },
  {
    name: "Laser Level",
    category: "Tools & Hardware",
    price: 3499,
    unsplashId: "photo-1504148455328-c376907d081c",
    description: "Self-leveling 360-degree cross line laser level green beam layout tool.",
    specs: ["Class II Bright Green Laser Line", "Auto Self-Leveling Angle Range: ±4°", "Operating Range: up to 100 Feet", "Includes Magnetic L-Mounting Bracket"]
  },
  {
    name: "Bench Vice",
    category: "Tools & Hardware",
    price: 2499,
    unsplashId: "photo-1504148455328-c376907d081c",
    description: "Heavy-duty cast steel bench vice with 360-degree swivel base rotation.",
    specs: ["Jaw Width: 5 Inches (125mm)", "Made of High-Tensile Nodular Cast Iron", "Swivels 360-Degrees with Dual Locks", "Integrated Steel Anvil Pounding Face"]
  },
  {
    name: "Wrench Set",
    category: "Tools & Hardware",
    price: 1999,
    unsplashId: "photo-1581244277943-fe4a9c777189",
    description: "Double open end chrome-plated spanner steel wrench set.",
    specs: ["12-Piece Spanner Wrench Set (6-32mm)", "Forged Chrome Vanadium Steel", "15-Degree Offset Box End Design", "Comes in Canvas Roll-up Hanging Organizer Bag"]
  },
  {
    name: "Pliers Set",
    category: "Tools & Hardware",
    price: 1499,
    unsplashId: "photo-1581244277943-fe4a9c777189",
    description: "Heavy-duty electrician's hand pliers set including combination, long-nose, and side cutter.",
    specs: ["3-Piece Professional Pliers Set", "High-Carbon Drop-Forged Steel", "Insulated Comfort TPR Grab Grips", "Laser-Hardened Cutting Edges"]
  },
  {
    name: "Chainsaw",
    category: "Tools & Hardware",
    price: 9999,
    unsplashId: "photo-1590121755181-2299742617f6",
    description: "Petrol powered chain cutting saw for landscaping, logging, and heavy wood work.",
    specs: ["Engine size: 52cc 2-Stroke Petrol", "Bar Length: 18 Inches Steel Plate", "Dual Safety Hand Guard Chain Brake", "Automatic Chain Lubing Oil Pump"]
  },
  {
    name: "Welding Machine",
    category: "Tools & Hardware",
    price: 11999,
    unsplashId: "photo-1581092160607-ee22621dd758",
    description: "Smart IGBT inverter stick ARC welding machine with digital LCD amp display.",
    specs: ["Current Range: 20-200 Amps DC", "IGBT Power Inverter Core Technology", "Hot Start & Anti-Stick safety guards", "Extremely Lightweight & Portable Body"]
  },

  // === OFFICE SUPPLIES (20 Items) ===
  {
    name: "Office Chair",
    category: "Office Supplies",
    price: 8999,
    unsplashId: "photo-1505797149-43b0069ec26b",
    description: "Ergonomic mesh high-back computer office task chair with 3D lumbar support.",
    specs: ["Breathable Mesh Back panel", "Adjustable Neck Pillow Headrest", "Sync-Tilt Multi Locking Mechanism", "Nylon Twin Caster Glide Wheels"]
  },
  {
    name: "Office Table",
    category: "Office Supplies",
    price: 11999,
    unsplashId: "photo-1518455027359-f3f8164ba6bd",
    description: "Premium large executive wooden office table writing desk with wire drawers.",
    specs: ["Size: 5 x 3 Feet Wide Desk Top", "Thick Engineered Oak Finished Panel", "Dual Integrated Power Cable Ports", "Reinforced Trestle Wooden Side Supports"]
  },
  {
    name: "Printer",
    category: "Office Supplies",
    price: 14999,
    unsplashId: "photo-1612815154858-60aa4c59eaa6",
    description: "High-speed wireless Wi-Fi all-in-one monochrome laser printer and scanner.",
    specs: ["Print Speed: Up to 30 PPM (B/W)", "Automatic Duplex Double Sided Print", "Built-in Wi-Fi, Ethernet, and USB", "Flatbed Scanner with 1200 DPI resolution"]
  },
  {
    name: "Paper Shredder",
    category: "Office Supplies",
    price: 5999,
    unsplashId: "photo-1612815154858-60aa4c59eaa6",
    description: "High-security cross-cut paper shredder with pullout waste basket box.",
    specs: ["Shred Capacity: 12 Sheets Paper", "Cross-Cut Shred size: 4 x 40mm (P-4)", "Continuous Running Time: 15 Mins", "6 Gallon Pull-Out Waste Basket"]
  },
  {
    name: "Whiteboard",
    category: "Office Supplies",
    price: 1999,
    unsplashId: "photo-1531403009284-440f080d1e12",
    description: "Magnetic dry-erase whiteboard with scratch-resistant surface and aluminum borders.",
    specs: ["Size: 4 x 3 Feet Panel Board", "Triple-Coated Scratch-Proof Surface", "Integrated Marker Tray Shelf Frame", "Heavy-Duty Wall Mounting brackets Set"]
  },
  {
    name: "Projector",
    category: "Office Supplies",
    price: 24999,
    unsplashId: "photo-1535016120720-40c646be5580",
    description: "Full HD 1080P smart office business projector with high lumen brightness LEDs.",
    specs: ["Resolution: native 1920x1080P", "Luminance: 4500 Lumens ANSI Lamp", "Smart OS with Pre-Installed Apps", "HDMI, USB, VGA, and Audio Output Ports"]
  },
  {
    name: "Filing Cabinet",
    category: "Office Supplies",
    price: 7999,
    unsplashId: "photo-1595515243261-38295c2f354c",
    description: "Sturdy 3-drawer steel mobile filing cabinet with key lock.",
    specs: ["Heavy-Gauge Cold-Rolled Steel Sheet", "Fully Locking Drawers with 2 Keys", "Fits Legal and A4 Hanging Files", "Heavy Duty Anti-Topple Caster Wheels"]
  },
  {
    name: "Monitor Stand",
    category: "Office Supplies",
    price: 2499,
    unsplashId: "photo-1527443224154-c4a3942d3acf",
    description: "Premium dual gas-spring articulating monitor arm desktop mount stand.",
    specs: ["Fits Monitors size: 13 to 32 Inches", "Holds Weight: up to 9kg per arm Unit", "VESA Standard Mount Compatible", "Full 360-Degree Arm Pivot Tilt Rotation"]
  },
  {
    name: "Desk Lamp",
    category: "Office Supplies",
    price: 1499,
    unsplashId: "photo-1507473885765-e6ed057f782c",
    description: "Smart eye-caring LED study desk lamp with wireless smartphone charging base.",
    specs: ["10W Dimmable Eye-Safe LED Panel", "5 Light Temperature Modes (Warm/Cool)", "Integrated QI Wireless Charging Plate", "Touch Sensitive Dashboard Controls"]
  },
  {
    name: "Paper Reams",
    category: "Office Supplies",
    price: 999,
    unsplashId: "photo-1612815154858-60aa4c59eaa6",
    description: "High-brightness copier and printer multipurpose paper sheets reams.",
    specs: ["Value Box: 5 Reams of A4 Paper", "75 GSM Premium Acid-Free Material", "98% Color Brightness Whiteness Index", "Jam-free High Speed Printing Runs"]
  },
  {
    name: "Stapler",
    category: "Office Supplies",
    price: 999,
    unsplashId: "photo-1612815154858-60aa4c59eaa6",
    description: "Classic desk stapler with full rubberized non-slip bottom base, including staples.",
    specs: ["Metal solid construction body", "Staple Capacity: 25 Sheets of Paper", "Includes 5000 Premium staples Pins", "Dual Anvil: Staple & Pin Modes"]
  },
  {
    name: "Label Printer",
    category: "Office Supplies",
    price: 4999,
    unsplashId: "photo-1612815154858-60aa4c59eaa6",
    description: "High-speed thermal barcode and address label printer, inkless.",
    specs: ["Thermal Print Method (No Ink Needed)", "Max Label Width: 4-Inches", "Printing speed: 150mm/Sec", "Compatible with Vercel, FedEx, Amazon shipping"]
  },
  {
    name: "Calculator",
    category: "Office Supplies",
    price: 1299,
    unsplashId: "photo-1574607383476-f517f220d1c0",
    description: "Scientific matrix engineering programmable calculator with multi-line LCD panel.",
    specs: ["417 Integrated Computing Functions", "Dual Power Sources (Solar & Battery)", "High Definition 4-Line Dot Matrix Display", "Heavy Duty Snap-on Slide Case Included"]
  },
  {
    name: "Document Scanner",
    category: "Office Supplies",
    price: 11999,
    unsplashId: "photo-1612815154858-60aa4c59eaa6",
    description: "Automatic document feeder fast duplex sheet-fed scanner.",
    specs: ["20-Sheet Auto Document Feeder (ADF)", "Scans speed: 25 Pages Per Minute", "Double-Sided One-Pass Scanner Mode", "Direct PDF and JPEG Digitization"]
  },
  {
    name: "Laptop Stand",
    category: "Office Supplies",
    price: 1999,
    unsplashId: "photo-1527443224154-c4a3942d3acf",
    description: "Ergonomic foldable aluminum laptop riser stand with cooling vents.",
    specs: ["Premium CNC Aviation Grade Aluminum", "6 Adjustable Heights Tilt Angels", "Anti-Slip Silicone Protective Pads", "Hollow Core Panel Ventilation Cooling"]
  },
  {
    name: "Keyboard",
    category: "Office Supplies",
    price: 2499,
    unsplashId: "photo-1587829741301-dc798b83add3",
    description: "Multi-device wireless Bluetooth membrane keyboard with smartphone cradle notch.",
    specs: ["Connects up to 3 Devices Simultaneously", "Responsive Silent Scissor Key Caps", "Integrated Phone/Tablet Holder bar", "Battery Life: 12 Months (2x AAA)"]
  },
  {
    name: "Mouse",
    category: "Office Supplies",
    price: 1499,
    unsplashId: "photo-1615663245857-ac93bb7c39e7",
    description: "Sleek silent wireless optical computer mouse with adjustable DPI sensor.",
    specs: ["2.4GHz Cordless Nano USB Dongle", "Silent Click buttons (90% Noise Red)", "Adjustable DPI Sensitivity (800-1600)", "Ergonomic Ambidextrous Shell Layout"]
  },
  {
    name: "Conference Speaker",
    category: "Office Supplies",
    price: 7999,
    unsplashId: "photo-1543269865-cbf427effbad",
    description: "Smart USB speakerphone with 360-degree voice pickup microphones.",
    specs: ["4-Microphone Array System (3m range)", "Smart Acoustic Echo Cancellation AI", "Plug-and-Play USB-C & Bluetooth", "High Definition 3W Dynamic Speaker Output"]
  },
  {
    name: "Visitor Chair",
    category: "Office Supplies",
    price: 4999,
    unsplashId: "photo-1505797149-43b0069ec26b",
    description: "Heavy-duty steel frame visitor guest chair with mesh back and padded armrests.",
    specs: ["Sturdy S-Shaped Cantilever Steel Frame", "Anti-Sinking Thick Cushioned Seat padding", "Breathable Mesh Ergonomic Curved Back", "Floor-Safe Protective Sled Foot Grippers"]
  },
  {
    name: "Book Rack",
    category: "Office Supplies",
    price: 3999,
    unsplashId: "photo-1544644181-1484b3fdfc62",
    description: "Desktop expandable wooden book rack with document organizing trays.",
    specs: ["Expandable Shelf Width (13\" to 24\")", "Solid Sustainable Eco-Bamboo Wood", "2 Sliding Drawers for Stationary Knickknacks", "Elegant Polish Smooth Rounded Edges"]
  },

  // === LIGHTING (15 Items) ===
  {
    name: "LED Bulb",
    category: "Lighting",
    price: 999,
    unsplashId: "photo-1513506003901-1e6a229e2d15",
    description: "Pack of 6 energy saving high brightness cool daylight B22 LED bulbs.",
    specs: ["9-Watt Bulbs (Pack of 6)", "B22 Brass Pin Base Bayonets", "Luminous Flux: 900 Lumens per bulb", "Lifespan: 25,000 Running Hours"]
  },
  {
    name: "Smart Bulb",
    category: "Lighting",
    price: 1499,
    unsplashId: "photo-1513506003901-1e6a229e2d15",
    description: "Wi-Fi smart LED color changing RGB bulb compatible with smart home voice devices.",
    specs: ["12W RGB + Warm/Cool White LED", "16 Million Colors Palette Spectrum", "No Hub Required (Direct 2.4G Wi-Fi)", "App & Voice Control Sync Schedules"]
  },
  {
    name: "Ceiling Light",
    category: "Lighting",
    price: 2999,
    unsplashId: "photo-1513506003901-1e6a229e2d15",
    description: "Flush mount modern circular LED ceiling light panel with three-color temperatures.",
    specs: ["24 Watts High Power Output", "Ultra-Slim 0.8-Inch Profile Height", "3-Color Switch: Cool, Warm, Natural", "IP44 Waterproof Moisture Guard Shell"]
  },
  {
    name: "Pendant Light",
    category: "Lighting",
    price: 3999,
    unsplashId: "photo-1513506003901-1e6a229e2d15",
    description: "Vintage industrial style hanging cage glass pendant light lamp holder, set of 3.",
    specs: ["Pack of 3 Hanging Lamps", "Adjustable 4.5-Foot Nylon Cord", "Standard E27 Socket Holders", "Matte Black Powder Paint Finish Steel"]
  },
  {
    name: "Wall Light",
    category: "Lighting",
    price: 1999,
    unsplashId: "photo-1513506003901-1e6a229e2d15",
    description: "Elegant up-and-down aluminum waterproof exterior/interior decorative wall light.",
    specs: ["10W COB LED Up/Down Projection", "Anodized rust-free Aluminum Case", "IP65 Weatherproof Rain Tight Gasket", "Warm White 3000K Calming Glow"]
  },
  {
    name: "Flood Light",
    category: "Lighting",
    price: 4999,
    unsplashId: "photo-1513506003901-1e6a229e2d15",
    description: "High-power industrial grade outdoor LED flood light with cooling fin grid.",
    specs: ["100W High Luminous Output LEDs", "Luminance: 10,000 LM Spotlights", "IP66 Heavy Waterproof Shell Shield", "Die-Cast Aluminum Heat Sink Fins"]
  },
  {
    name: "Garden Light",
    category: "Lighting",
    price: 2499,
    unsplashId: "photo-1513506003901-1e6a229e2d15",
    description: "Set of solar-powered outdoor garden path metal stakes lighting spikes.",
    specs: ["Set of 6 Path Stakes Spikes", "Premium Stainless Steel & ABS", "Auto Dawn-Dusk Ambient Sensor", "6-8 Hours Battery Run on Full Solar Charge"]
  },
  {
    name: "Solar Light",
    category: "Lighting",
    price: 1999,
    unsplashId: "photo-1513506003901-1e6a229e2d15",
    description: "Outdoor solar motion sensor security wall light with extra bright LEDs.",
    specs: ["100 Bright LED Multi-Directional Panels", "120-Degree PIR Motion Sensor (5m)", "Large 2200mAh Solar Lithium Battery", "3 Intelligent Security Glow Modes"]
  },
  {
    name: "Table Lamp",
    category: "Lighting",
    price: 2499,
    unsplashId: "photo-1507473885765-e6ed057f782c",
    description: "Handcrafted ceramic bedside table lamp with premium fabric drum shade.",
    specs: ["Height: 18 Inches Elegant Silhouette", "Glazed Textured Ivory White Ceramic Base", "Beige Premium TC Fabric Drum Shade", "Includes 3W Warm LED Bulb Free"]
  },
  {
    name: "Floor Lamp",
    category: "Lighting",
    price: 4999,
    unsplashId: "photo-1513506003901-1e6a229e2d15",
    description: "Modern minimalist metal arch floor lamp with heavy marble base and foot switch.",
    specs: ["Height: 72 Inches Arch Canopy", "Weighted Solid Nero Marble Base Stand", "Brushed Brass Nickel Finish Frame", "Convenient Foot Step On-Off Cable Switch"]
  },
  {
    name: "LED Strip",
    category: "Lighting",
    price: 1199,
    unsplashId: "photo-1513506003901-1e6a229e2d15",
    description: "Flexible smart RGB LED strip tape lights with remote controls.",
    specs: ["Length: 16.4 Feet (5 Meters Roll)", "Smart App & 44-Key IR Remote Control", "3M Self-Adhesive Heavy Sticky Tape", "Music Sync Built-in Audio Sensor Node"]
  },
  {
    name: "Emergency Light",
    category: "Lighting",
    price: 1299,
    unsplashId: "photo-1513506003901-1e6a229e2d15",
    description: "Rechargeable automatic emergency wall tube light with carry handle.",
    specs: ["60 Bright SMD LED Light Tube", "Rechargeable Lithium Battery: 8 Hours run", "Auto-On Feature during Power Outages", "Slide Switch: Bright & Super-Bright Modes"]
  },
  {
    name: "Chandelier",
    category: "Lighting",
    price: 24999,
    unsplashId: "photo-1513506003901-1e6a229e2d15",
    description: "Luxury multi-tier crystal ceiling chandelier with gold-finish brass chains.",
    specs: ["8-Light Premium Tiered Pendant Chandelier", "Hand-Cut Premium K9 Faceted Crystals", "Polished Electroplated Gold Brass Frame", "Perfect for Foyer, Dining, and Grand Living Room"]
  },
  {
    name: "Track Light",
    category: "Lighting",
    price: 3499,
    unsplashId: "photo-1513506003901-1e6a229e2d15",
    description: "Adjustable 4-way direction LED ceiling spotlight track light fixture.",
    specs: ["4 Directional Swivel Spotlight Heads", "Includes 1-Meter Solid Aluminum Rail", "Warm White 12W COB Lights (Total 4)", "Excellent Heat Dissipation Iron Casing"]
  },
  {
    name: "Night Lamp",
    category: "Lighting",
    price: 999,
    unsplashId: "photo-1513506003901-1e6a229e2d15",
    description: "Plug-in smart dusk-to-dawn LED sensor night light lamps pack.",
    specs: ["Pack of 4 Plug-In Mini Lights", "Smart Photocell Dusk-to-Dawn Sensor", "Super Low Power Consumption (0.5W)", "Soft Calming warm White Glow"]
  },

  // === BATHROOM (15 Items) ===
  {
    name: "Shower Panel",
    category: "Bathroom",
    price: 18999,
    unsplashId: "photo-1552321554-5fefe8c9ef14",
    description: "Full stainless-steel luxury overhead waterfall body-jets shower panel tower.",
    specs: ["Grade 304 Polished Stainless Steel", "4 Jet Functions: Rainfall, Waterfall, Jets, Wand", "8 High-Pressure Adjustable Body Massage Jets", "Digital Temperature Screen Indicator (Hydro-powered)"]
  },
  {
    name: "Bathroom Mirror",
    category: "Bathroom",
    price: 4999,
    unsplashId: "photo-1513519245088-0e12902e5a38",
    description: "Smart wall-mount backlit anti-fog touch control LED bathroom mirror.",
    specs: ["Size: 24 x 32 Inches Rectangle", "Touch Button Dimmer with Color memory", "Built-In Automated Anti-Fog Demister Pad", "Explosion-Proof HD Copper-Free Silver Glass"]
  },
  {
    name: "Vanity Cabinet",
    category: "Bathroom",
    price: 15999,
    unsplashId: "photo-1584622650111-993a426fbf0a",
    description: "Wall-hung waterproof wooden bathroom basin vanity cabinet combo, excluding sink.",
    specs: ["Multi-Layer Solid Wood Waterproof Cabinet", "Glossy White Scratch-Resistant Enamels", "2 Hydraulic Drawers with Soft Close Slides", "Spacious Internal Pipe Clearance Cutouts"]
  },
  {
    name: "Wash Basin",
    category: "Bathroom",
    price: 6999,
    unsplashId: "photo-1584622650111-993a426fbf0a",
    description: "Elegant countertop vessel artistic oval ceramic wash basin sink.",
    specs: ["High-Gloss Ceramic Scratch-Resistant Clay", "Above Countertop Vessel Installation", "Stain-Resistant Non-Porous Easy Clean GLaze", "Standard 1.75-Inch Pop-Up Drain Hole"]
  },
  {
    name: "Faucet",
    category: "Bathroom",
    price: 2999,
    unsplashId: "photo-1584622650111-993a426fbf0a",
    description: "Sleek brass single-lever hot & cold water mixer bathroom tap faucet.",
    specs: ["Solid Lead-Free Brass Body Core", "Multi-Layer Mirror Electroplated Chrome", "Drip-Free Ceramic Disc Cartridge Value", "Honeycomb Aerator for Soft Bubble Flow"]
  },
  {
    name: "Shower Head",
    category: "Bathroom",
    price: 1999,
    unsplashId: "photo-1552321554-5fefe8c9ef14",
    description: "High pressure luxury rainfall overhead shower head with brass swivel arm.",
    specs: ["8-Inch Square Overhead Shower Base", "Rub-Clean Anti-Clog Silicon Nozzles", "Heavy Solid Brass Swivel Ball Connector", "Teflon Sealing Tape & Washers Included"]
  },
  {
    name: "Towel Rack",
    category: "Bathroom",
    price: 1499,
    unsplashId: "photo-1584622650111-993a426fbf0a",
    description: "Multi-functional wall mounted folding bath towel hanger holder shelf.",
    specs: ["Grade 304 Rust-Free Stainless Steel", "24-Inch Shelf with 4 Slide Utility Hooks", "90-Degree Folding space Saver design", "Included Screw Anchors for Solid Wall Setup"]
  },
  {
    name: "Soap Dispenser",
    category: "Bathroom",
    price: 999,
    unsplashId: "photo-1584622650111-993a426fbf0a",
    description: "Smart hands-free automatic infrared liquid foam soap dispenser.",
    specs: ["Capacity: 400ml Translucent Tank", "Sensitive 0.2-Sec Infrared Sensor Trigger", "3 Foam Volume Control Adjustments", "Battery Run (4x AA) or USB Charging Port"]
  },
  {
    name: "Toilet Seat",
    category: "Bathroom",
    price: 3999,
    unsplashId: "photo-1584622650111-993a426fbf0a",
    description: "Slow-close elongated white heavy duty toilet seat lid with quick release.",
    specs: ["Fits Most Standard Elongated Commodes", "Soft-Close Mechanisms prevent slamming", "Sturdy Polypropylene Scratch-Proof Resin", "Easy Quick-Release Buttons for Washing Hinges"]
  },
  {
    name: "Water Heater",
    category: "Bathroom",
    price: 9999,
    unsplashId: "photo-1584622650111-993a426fbf0a",
    description: "Energy-efficient glass-lined tank storage geyser water heater.",
    specs: ["15-Liter Storage Tank Capacity", "Heavy Cooper Glass-Lined Heating Element", "Adjustable Thermostat control Dial Panel", "Triple Safety Safety Valve Protection"]
  },
  {
    name: "Exhaust Fan",
    category: "Bathroom",
    price: 1999,
    unsplashId: "photo-1584622650111-993a426fbf0a",
    description: "High speed silent ventilation axial exhaust fan with shutters.",
    specs: ["Sweep Size: 6 Inches (150mm)", "Rotor Speed: 2400 RPM High Delivery", "Automated Back-Draft Shutter Louvre Gates", "Low-Power consumption 22W copper motor"]
  },
  {
    name: "Laundry Basket",
    category: "Bathroom",
    price: 1299,
    unsplashId: "photo-1584622650111-993a426fbf0a",
    description: "Large capacity breathable woven hamper laundry basket with handles.",
    specs: ["Capacity: 75 Liters Large Volume", "Removable Eco-friendly Washable Inner Bag", "Water-Resistant Natural Bamboo Woven Base", "Heavy-Duty Dual Braided Carrying Handles"]
  },
  {
    name: "Bathroom Shelf",
    category: "Bathroom",
    price: 1499,
    unsplashId: "photo-1584622650111-993a426fbf0a",
    description: "Self-adhesive aluminum triangle corner organizer bathroom storage shelf, set of 2.",
    specs: ["Set of 2 Corner Floating Shelves", "Aviation-Grade Rust-Proof Sand-blast Alum", "Drill-Free heavy adhesive Mounting hooks", "Bottom Hollow Drainage Slot Gaps Design"]
  },
  {
    name: "Toothbrush Holder",
    category: "Bathroom",
    price: 999,
    unsplashId: "photo-1584622650111-993a426fbf0a",
    description: "UV-sanitizer solar powered automatic toothbrush holder and toothpaste squeezer.",
    specs: ["Holds 4 Toothbrushes (Manual & Electric)", "Auto UV-C light sanitization sterilizer", "Integrated Gravity Squeezing Dispenser", "USB and Solar Panel Dual Recharge battery"]
  },
  {
    name: "Floor Mat",
    category: "Bathroom",
    price: 999,
    unsplashId: "photo-1584622650111-993a426fbf0a",
    description: "Super absorbent quick-dry diatomaceous earth bath floor shower mat.",
    specs: ["Size: 24 x 16 Inches Oval", "Natural Eco Diatomaceous Mud Board", "Absorbs water instantly within 10 seconds", "Rubber Textured Solid Anti-Slip Backing Grid"]
  }
];

// Helper to load products, merging in any user-defined image & name overrides from localStorage
export function getProducts(): Product[] {
  let imageOverrides: Record<string, string> = { ...PERMANENT_IMAGE_OVERRIDES };
  let nameOverrides: Record<string, string> = { ...PERMANENT_NAME_OVERRIDES };
  
  try {
    const imgData = localStorage.getItem("ibhazon_image_overrides");
    if (imgData) {
      imageOverrides = { ...imageOverrides, ...JSON.parse(imgData) };
    }
  } catch (e) {
    console.error("Error loading image overrides from localStorage", e);
  }

  try {
    const nameData = localStorage.getItem("ibhazon_name_overrides");
    if (nameData) {
      nameOverrides = { ...nameOverrides, ...JSON.parse(nameData) };
    }
  } catch (e) {
    console.error("Error loading name overrides from localStorage", e);
  }

  let baseProducts: Product[] = [];

  if (PERMANENT_PRODUCTS_OVERRIDE && Array.isArray(PERMANENT_PRODUCTS_OVERRIDE) && PERMANENT_PRODUCTS_OVERRIDE.length > 0) {
    baseProducts = PERMANENT_PRODUCTS_OVERRIDE.map((p, idx) => {
      const id = p.id || `${(p.category || "").toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}-${idx + 1}`;
      return {
        id,
        name: p.name || "",
        category: p.category || "General",
        price: Number(p.price) || 0,
        rating: p.rating !== undefined ? parseFloat(String(p.rating)) : parseFloat((4.2 + (idx % 8) * 0.1).toFixed(1)),
        reviewsCount: p.reviewsCount !== undefined ? Number(p.reviewsCount) : 15 + (idx % 12) * 23,
        description: p.description || "",
        specs: Array.isArray(p.specs) ? p.specs : [],
        image: p.image || p.imageUrl || "",
        isFeatured: p.isFeatured !== undefined ? !!p.isFeatured : idx % 19 === 0,
        stock: p.stock !== undefined ? Number(p.stock) : 5 + (idx % 15)
      };
    });
  } else {
    baseProducts = RAW_PRODUCTS_DATA.map((p, idx) => {
      const id = `${p.category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}-${idx + 1}`;
      // Use override image if exists, or direct imageUrl if defined, otherwise generate the Unsplash URL
      const image = p.imageUrl || (p.unsplashId ? `https://images.unsplash.com/${p.unsplashId}?auto=format&fit=crop&w=600&h=450&q=80` : '');
      
      return {
        id,
        name: p.name,
        category: p.category,
        price: p.price,
        rating: parseFloat((4.2 + (idx % 8) * 0.1).toFixed(1)), // Ratings 4.2 to 4.9
        reviewsCount: 15 + (idx % 12) * 23,
        description: p.description,
        specs: p.specs,
        image,
        isFeatured: idx % 19 === 0,
        stock: 5 + (idx % 15)
      };
    });
  }

  // Overlay any active sandbox/localStorage edits or custom_images file overrides on top of either base catalog
  return baseProducts.map((p) => {
    const imgOverride = imageOverrides[p.id];
    const nameOverride = nameOverrides[p.id];
    return {
      ...p,
      image: imgOverride || p.image,
      name: nameOverride || p.name
    };
  });
}

export function saveProductImageOverride(id: string, imageUrl: string): void {
  try {
    const data = localStorage.getItem("ibhazon_image_overrides");
    let overrides: Record<string, string> = {};
    if (data) {
      overrides = JSON.parse(data);
    }
    overrides[id] = imageUrl;
    localStorage.setItem("ibhazon_image_overrides", JSON.stringify(overrides));
  } catch (e) {
    console.error("Error saving image override to localStorage", e);
  }
}

export function saveProductNameOverride(id: string, name: string): void {
  try {
    const data = localStorage.getItem("ibhazon_name_overrides");
    let overrides: Record<string, string> = {};
    if (data) {
      overrides = JSON.parse(data);
    }
    overrides[id] = name;
    localStorage.setItem("ibhazon_name_overrides", JSON.stringify(overrides));
  } catch (e) {
    console.error("Error saving name override to localStorage", e);
  }
}

export function clearProductImageOverrides(): void {
  try {
    localStorage.removeItem("ibhazon_image_overrides");
    localStorage.removeItem("ibhazon_name_overrides");
  } catch (e) {
    console.error("Error clearing image and name overrides", e);
  }
}

export const CATEGORIES = [
  "All Categories",
  "Home & Kitchen",
  "Garden Equipment",
  "Farming Equipment",
  "Pet Supplies",
  "Furniture",
  "Gym & Fitness",
  "Tools & Hardware",
  "Office Supplies",
  "Lighting",
  "Bathroom"
];
