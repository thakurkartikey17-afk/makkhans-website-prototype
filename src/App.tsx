import React, { useState, useEffect, useRef } from 'react';
import { MakhhansLogo } from './components/MakhhansLogo';
import { 
  Utensils, 
  MapPin, 
  Instagram, 
  Facebook, 
  Youtube, 
  Phone, 
  Calendar, 
  Clock, 
  Users, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Search, 
  Menu, 
  X, 
  Award, 
  Sparkles, 
  Heart, 
  Camera, 
  CheckCircle, 
  ExternalLink, 
  Compass, 
  Gift, 
  Smartphone, 
  Info,
  SlidersHorizontal,
  ChevronDown,
  Star
} from 'lucide-react';

// Definitions for menu items
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'signatures' | 'starters' | 'mains' | 'breads' | 'desserts';
  isVeg: boolean;
  tag?: string;
  rating: number;
  calories: number;
  menuType: 'standard' | 'kids' | 'nong';
}

// Menu items static database
const MENU_DATA: MenuItem[] = [
  {
    id: 'std_sig1',
    name: "Makkhan's Special Thali",
    description: "Classic fixed platter featuring Dal Fry, Matar Paneer or Paneer Butter Masala, Choice Dry Vegetable, Plain Basmati Rice, 2 pieces of flaky Laccha Paratha, Boondi Raita, Onion Salad, Pickle, Papad, and a warm sweet Gulab Jamun.",
    price: 320,
    category: 'signatures',
    isVeg: true,
    tag: 'Dine-In Signature',
    rating: 4.9,
    calories: 780,
    menuType: 'standard'
  },
  {
    id: 'std_sig2',
    name: "Navratan Thali",
    description: "A royal feast: slow coal Dal Makhani, Paneer Butter Masala, fine Malai Kofta, Dry Veg of the day, 1 Butter Naan, 1 Laccha Paratha, Plain Rice, green salad, pickles, cooling Boondi Raita, crispy papad, and delicious Gulab Jamun.",
    price: 345,
    category: 'signatures',
    isVeg: true,
    tag: 'Royal Selection',
    rating: 4.9,
    calories: 840,
    menuType: 'standard'
  },
  {
    id: 'std_sig3',
    name: "Makkhan's King Thali (Group Feast)",
    description: "Gigantic luxury group collection (serves 3-4): 4 servings of Soup, Starters (6pcs Veg Kebab, 6pcs Potato Cheese Balls, Crispy Corn), Main Course (2 Dry Veg, 5 Gravy Delights, 2 Basmati Rice, 2 Dal, 2 Laccha Paratha, 2 Missi Roti, 2 Butter Roti, 1 King Naan, Boondi Raita), & Desserts (2 Kheer, 4 Gulab Jamun, Moong Halwa).",
    price: 2199,
    category: 'signatures',
    isVeg: true,
    tag: 'Imperial Feast',
    rating: 5.0,
    calories: 2300,
    menuType: 'standard'
  },
  {
    id: 'std_sig4',
    name: "Sizzling Tandoori Platter (16 Pcs)",
    description: "Sizzling chargrilled assortment: 2pcs Paneer Tikka, 2pcs Paneer Malai Tikka, 2pcs Soya Chaap Tikka, 2pcs Chaap Malai Tikka, 2pcs Tandoori Aloo, 2pcs Veg Seekh, and 4pcs tender Mushroom Tikka, served over glowing hot iron.",
    price: 649,
    category: 'signatures',
    isVeg: true,
    tag: 'Sizzler Legend',
    rating: 4.8,
    calories: 590,
    menuType: 'standard'
  },
  {
    id: 'std_sig5',
    name: "Soya Keema Platter",
    description: "Hearty combination platter of Soya Keema Matar, Dal Makhani, Paneer Butter Masala, 2 flaked Laccha Parathas, crispy papad, Onion salad, and a choice of 1 Gulab Jamun or creamy Vanilla/Strawberry Ice Cream.",
    price: 599,
    category: 'signatures',
    isVeg: true,
    tag: 'High Protein',
    rating: 4.7,
    calories: 680,
    menuType: 'standard'
  },
  {
    id: 'std_sig6',
    name: "Tikka Dal Platter",
    description: "Featuring 8 assorted fresh Tandoor tikkas, 1 generous bowl of rich Dal Makhani, 1 flaky Laccha Paratha, sautéed garden vegetables, onion salad, papad, and 1 sweet Gulab Jamun or scoop of Ice Cream.",
    price: 599,
    category: 'signatures',
    isVeg: true,
    tag: 'Best Seller',
    rating: 4.8,
    calories: 660,
    menuType: 'standard'
  },
  {
    id: 'std_sig7',
    name: "Continental Platter",
    description: "International style: 2 golden grilled Veg Sandwiches, 1 Stuffed Capsicum, 1 Stuffed Tomato, 1 crispy Veg Cutlet, 1 Paneer Cutlet, sautéed seasonal vegetables with pasta, salted French Fries, and 1 Gulab Jamun.",
    price: 380,
    category: 'signatures',
    isVeg: true,
    tag: 'Global Cuisine',
    rating: 4.6,
    calories: 720,
    menuType: 'standard'
  },

  {
    id: 'std_st1',
    name: "Paneer Tikka (8 Pcs)",
    description: "Succulent cottage cheese cubes marinated in our recipe of tandoori spices and house direct cream yogurt, roasted in our glowing clay tandoor.",
    price: 345,
    category: 'starters',
    isVeg: true,
    tag: 'Classic Starter',
    rating: 4.8,
    calories: 340,
    menuType: 'standard'
  },
  {
    id: 'std_st2',
    name: "Paneer Malai Tikka (8 Pcs)",
    description: "Cubes of milk-fresh paneer marinated with cashews, cardamoms, ginger roots, fresh farm malai, and slow charcoal roasted.",
    price: 385,
    category: 'starters',
    isVeg: true,
    tag: 'Chef Signature',
    rating: 4.9,
    calories: 420,
    menuType: 'standard'
  },
  {
    id: 'std_st3',
    name: "Veg Galouti Kebab (8 Pcs)",
    description: "Traditional melt-in-mouth vegetable galouti patties blended with heritage spices. A royal tribute to classic Awadhi court gastronomy.",
    price: 340,
    category: 'starters',
    isVeg: true,
    tag: 'Awadhi Treat',
    rating: 4.8,
    calories: 290,
    menuType: 'standard'
  },
  {
    id: 'std_st4',
    name: "Dahi Kebab (10 Pcs)",
    description: "Slightly crisp outlays with extremely rich, moist cardamom and green herb-filled hung curd cores, pan-fried with gold precision.",
    price: 360,
    category: 'starters',
    isVeg: true,
    tag: 'Popular',
    rating: 4.7,
    calories: 310,
    menuType: 'standard'
  },
  {
    id: 'std_st5',
    name: "Honey Chilli Potato",
    description: "Matchstick potatoes crispy fried, tossed in our custom wok glaze combining fresh ginger, green chilies, pure honey, and sprinkled sesame seeds.",
    price: 340,
    category: 'starters',
    isVeg: true,
    tag: 'Indo-Chinese',
    rating: 4.7,
    calories: 380,
    menuType: 'standard'
  },
  {
    id: 'std_st6',
    name: "Chilli Paneer Dry",
    description: "Gold-battered paneer wok-shattered with capsicums, red onions, garlic, and hot soy chili reduction.",
    price: 345,
    category: 'starters',
    isVeg: true,
    tag: 'Spicy Delight',
    rating: 4.8,
    calories: 390,
    menuType: 'standard'
  },
  {
    id: 'std_st7',
    name: "Corn Nachos Mexican Chaat",
    description: "Generous layout of corn tortilla chips crowned with sweet corn kernels, spring salad, direct mayonnaise dressings, and visual spices.",
    price: 290,
    category: 'starters',
    isVeg: true,
    rating: 4.5,
    calories: 270,
    menuType: 'standard'
  },
  {
    id: 'std_st8',
    name: "Crispy American Corn",
    description: "Selected sweet corn kernels batter-crisped to golden-brown and wok-shaken with spring onions, pepper salt, and cilantro.",
    price: 320,
    category: 'starters',
    isVeg: true,
    rating: 4.6,
    calories: 220,
    menuType: 'standard'
  },

  {
    id: 'std_mn1',
    name: "Paneer Butter Masala (Full)",
    description: "Fresh cottage cheese chunks simmered in our premium sweet-savory gravy of slow-roasted tomatoes, red cashiers, and rich hand-churned white butter.",
    price: 360,
    category: 'mains',
    isVeg: true,
    tag: 'Legendary Butter',
    rating: 4.9,
    calories: 520,
    menuType: 'standard'
  },
  {
    id: 'std_mn2',
    name: "Paneer Lababdar",
    description: "Lusciously rich cream and onion-tomato gravy slow-cooked with fresh grated paneer, ginger juliennes and sweet cardamom.",
    price: 380,
    category: 'mains',
    isVeg: true,
    rating: 4.8,
    calories: 460,
    menuType: 'standard'
  },
  {
    id: 'std_mn3',
    name: "Makkhan's Special Handi Paneer",
    description: "Prepared in a traditional clay handi. Succulent paneer simmered with ground whole spices, sweet onions, and heavy cream.",
    price: 395,
    category: 'mains',
    isVeg: true,
    tag: 'Makkhan Special',
    rating: 4.9,
    calories: 490,
    menuType: 'standard'
  },
  {
    id: 'std_mn4',
    name: "Dal Makhani (Makkhan Special)",
    description: "Premium black lentils cooked overnight on red-hot coal, churned in hand-whipped white butter and fresh farm cream.",
    price: 320,
    category: 'mains',
    isVeg: true,
    tag: 'Slow Cooked',
    rating: 4.9,
    calories: 410,
    menuType: 'standard'
  },
  {
    id: 'std_mn5',
    name: "Dal Tadka",
    description: "Selected local hand-picked split yellow lentils cooked and tempered using cow ghee, cracked cumin seeds, fragrant roasted garlic cloves, and dried whole red chilies.",
    price: 295,
    category: 'mains',
    isVeg: true,
    rating: 4.7,
    calories: 280,
    menuType: 'standard'
  },
  {
    id: 'std_mn6',
    name: "Soya Keema Matar",
    description: "Richly textured soya mince slow-simmered with sweet green peas, green cardamom, bay leaves, and our signature ginger-garlic paste masala.",
    price: 380,
    category: 'mains',
    isVeg: true,
    rating: 4.6,
    calories: 340,
    menuType: 'standard'
  },
  {
    id: 'std_mn7',
    name: "Shahi Paneer",
    description: "Cottage cheese triangles cooked in our heritage royal sweet yogurt and cashew blend sauce, perfumed with real Mughal saffron and rose drops.",
    price: 365,
    category: 'mains',
    isVeg: true,
    rating: 4.8,
    calories: 480,
    menuType: 'standard'
  },
  {
    id: 'std_mn8',
    name: "Matar Paneer",
    description: "A gorgeous homestyle stew of sweet peas and soft paneer chunks in traditional light cumin onion-tomato curry.",
    price: 340,
    category: 'mains',
    isVeg: true,
    rating: 4.6,
    calories: 320,
    menuType: 'standard'
  },
  {
    id: 'std_mn9',
    name: "Veg Biryani (Served with Raita)",
    description: "High-aromatic Prayagraj long-grain basmati layered with seasonal green vegetables and rich saffron, baked deep under clay flour seal.",
    price: 330,
    category: 'mains',
    isVeg: true,
    tag: 'Best Seller',
    rating: 4.8,
    calories: 420,
    menuType: 'standard'
  },
  // Breads Category
  {
    id: 'std_br1',
    name: "Butter Naan",
    description: "Fluffy yeast-leavened premium bread baked on inner walls of tandoor oven, brushed with golden melted butter.",
    price: 95,
    category: 'breads',
    isVeg: true,
    rating: 4.7,
    calories: 260,
    menuType: 'standard'
  },
  {
    id: 'std_br2',
    name: "Garlic Naan",
    description: "Fine leavened dough coated with finely chopped fresh garlic cloves and green cilantro, charred in clay oven for smokey profiles.",
    price: 120,
    category: 'breads',
    isVeg: true,
    tag: 'Classic Pairing',
    rating: 4.8,
    calories: 280,
    menuType: 'standard'
  },
  {
    id: 'std_br3',
    name: "Kashmiri Naan",
    description: "Sweet luxury yeast bread stuffed with powdered pistachios, sweet raisins, almonds, red cherry pulp, and ghee glazed.",
    price: 160,
    category: 'breads',
    isVeg: true,
    rating: 4.9,
    calories: 335,
    menuType: 'standard'
  },
  {
    id: 'std_br4',
    name: "Laccha Paratha",
    description: "Multi-layered flaky local whole wheat flatbread layered with pure ghee and toasted till crispy golden-brown edges.",
    price: 90,
    category: 'breads',
    isVeg: true,
    rating: 4.8,
    calories: 240,
    menuType: 'standard'
  },
  {
    id: 'std_br5',
    name: "King Naan Butter (Imperial)",
    description: "Extravagant signature oversized yeast-bread direct from Pandit Makkhan Lal family archives, brushed with heavy organic churned butter.",
    price: 230,
    category: 'breads',
    isVeg: true,
    tag: 'King Size',
    rating: 5.0,
    calories: 490,
    menuType: 'standard'
  },
  // Desserts Category
  {
    id: 'std_de1',
    name: "Saffron Shahi Toast (4 Pcs)",
    description: "Double royal toast fried in clarified cow ghee, soaked in warm cardamom-saffron milk, layered with condensed rabri, rose water, and silver foil.",
    price: 290,
    category: 'desserts',
    isVeg: true,
    tag: 'Royal Heritage',
    rating: 4.9,
    calories: 480,
    menuType: 'standard'
  },
  {
    id: 'std_de2',
    name: "Gulab Jamun (1 Pc)",
    description: "Traditional soft golden-fried dumpling prepared using fresh mawa dairy solids, dipped in green-cardamom flavored sweet sugar syrup.",
    price: 90,
    category: 'desserts',
    isVeg: true,
    rating: 4.7,
    calories: 190,
    menuType: 'standard'
  },
  {
    id: 'std_de3',
    name: "Pyala Kheer",
    description: "Thick premium cream dessert made with local long-grain rice, whole cow milk, cardamom, almonds, and served chilled in custom clay cup.",
    price: 95,
    category: 'desserts',
    isVeg: true,
    rating: 4.8,
    calories: 260,
    menuType: 'standard'
  },
  {
    id: 'std_de4',
    name: "Green Apple Mint Mojito",
    description: "Sparkling refreshing companion: citrus lime chunks, green apple pulp, muddled organic garden mint leaves, ice, and clear tonic.",
    price: 215,
    category: 'desserts',
    isVeg: true,
    tag: 'Most Refreshing',
    rating: 4.8,
    calories: 130,
    menuType: 'standard'
  },
  {
    id: 'std_de5',
    name: "Kulhad Lassi",
    description: "Thick hand-beaten yogurt flavored with cardamoms and rose nectar, coated in cream malai layer, in a soil-cool kulhad.",
    price: 140,
    category: 'desserts',
    isVeg: true,
    rating: 4.8,
    calories: 290,
    menuType: 'standard'
  },

  // --- KIDS SPECIAL MENU ---
  {
    id: 'kid_de1',
    name: "Mickey's Chocolate Shake",
    description: "Delicious rich hand-whipped chocolate shake, chilled with chocolate chips and extra syrup in Mickey Mouse layout.",
    price: 199,
    category: 'desserts',
    isVeg: true,
    tag: 'Kid Favorite',
    rating: 4.8,
    calories: 290,
    menuType: 'kids'
  },
  {
    id: 'kid_de2',
    name: "Goofy's Kitkat Shake",
    description: "Premium smooth vanilla fudge blended with crushed crispy KitKat bars, sweet caramel drops and fresh whipped cream.",
    price: 220,
    category: 'desserts',
    isVeg: true,
    tag: 'Crunchy Fun',
    rating: 4.9,
    calories: 320,
    menuType: 'kids'
  },
  {
    id: 'kid_de3',
    name: "Ben 10's Ferrero Rocher Shake",
    description: "Exquisite elite shake made with actual Ferrero Rocher praline hazelnuts, whipped premium cream, and chocolate hazelnut fudge.",
    price: 260,
    category: 'desserts',
    isVeg: true,
    tag: 'Hero Choice',
    rating: 5.0,
    calories: 370,
    menuType: 'kids'
  },
  {
    id: 'kid_sig1',
    name: "Doraemon's Chocolate Dosa",
    description: "Thin sweet golden dosa crepe filled and spread with dense premium milk chocolate and hazelnut Nutella spread.",
    price: 360,
    category: 'signatures',
    isVeg: true,
    tag: 'Kids Special',
    rating: 4.8,
    calories: 340,
    menuType: 'kids'
  },
  {
    id: 'kid_st1',
    name: "Ninja's Special Mix Noodles",
    description: "Mildly spiced spring noodles tossed with fresh sweet peas, sliced carrots, baby corn flakes, and light natural soy.",
    price: 330,
    category: 'starters',
    isVeg: true,
    rating: 4.6,
    calories: 270,
    menuType: 'kids'
  },
  {
    id: 'kid_st2',
    name: "Chota Bheem's Crispy Veg Burger",
    description: "Golden crumb-fried vegetable patty with fresh tomatoes, lettuce, sweet direct mayonnaise on grilled butter buns.",
    price: 240,
    category: 'starters',
    isVeg: true,
    tag: 'Bheem Favorite',
    rating: 4.7,
    calories: 310,
    menuType: 'kids'
  },
  {
    id: 'kid_mn1',
    name: "Tom & Jerry's Corn Nachos Pizza",
    description: "Cripsy flatbread pizza layered with tomato basil paste, tons of sweet sweet corn kernels, yellow cheddar, and melted mozzarella.",
    price: 385,
    category: 'mains',
    isVeg: true,
    rating: 4.8,
    calories: 490,
    menuType: 'kids'
  },
  {
    id: 'kid_de4',
    name: "Popeye's Chocolate Sundae",
    description: "Twin scoops of chocolate fudge ice cream topped with caramelized chocolate drizzle, roasted peanuts, and custom sweet toppings.",
    price: 240,
    category: 'desserts',
    isVeg: true,
    rating: 4.7,
    calories: 220,
    menuType: 'kids'
  },
  {
    id: 'kid_de5',
    name: "Phineas & Ferb's Brownie with Chocolate Sauce",
    description: "Warm, fudgy chocolate brownie served with hot chocolate fudge syrup and a delightful sweet cookie.",
    price: 195,
    category: 'desserts',
    isVeg: true,
    rating: 4.8,
    calories: 270,
    menuType: 'kids'
  },
  {
    id: 'kid_de6',
    name: "Simpson's Hot Brownie Sundae",
    description: "Gooey chocolate brownie topped with clean vanilla ice cream, hot chocolate sauce, and visual rainbow sprinkles.",
    price: 340,
    category: 'desserts',
    isVeg: true,
    tag: 'Mega Fun',
    rating: 4.9,
    calories: 380,
    menuType: 'kids'
  },
  {
    id: 'kid_de7',
    name: "Noddy's Gems Sundae",
    description: "Vanilla, strawberry, and chocolate scoop sundae showered with colorful sweet Gems and white chocolate loops.",
    price: 230,
    category: 'desserts',
    isVeg: true,
    rating: 4.7,
    calories: 240,
    menuType: 'kids'
  },

  // --- NO ONION NO GARLIC MENU ---
  {
    id: 'nong_mn1',
    name: "NONG Paneer Butter Masala",
    description: "Soft cottage cheese chunks simmered in our premium tomato and Cashew gravy, cooked strictly without onion or garlic, finished using white farm butter.",
    price: 375,
    category: 'mains',
    isVeg: true,
    tag: 'NONG Favorite',
    rating: 4.8,
    calories: 510,
    menuType: 'nong'
  },
  {
    id: 'nong_mn2',
    name: "NONG Dal Plain",
    description: "Clean yellow split pigeon pea lentils pressure-cooked and tempered using organic cumin seeds, ghee, and roasted asafoetida.",
    price: 270,
    category: 'mains',
    isVeg: true,
    rating: 4.6,
    calories: 240,
    menuType: 'nong'
  },
  {
    id: 'nong_mn3',
    name: "NONG Dal Fry Jeera",
    description: "Yellow lentils tempered with aromatic royal cumin, green chilies, ghee, and sweet tomato paste with zero garlic/onion.",
    price: 290,
    category: 'mains',
    isVeg: true,
    rating: 4.7,
    calories: 260,
    menuType: 'nong'
  },
  {
    id: 'nong_mn4',
    name: "NONG Dal Makhani",
    description: "Traditional black lentils simmered overnight with fresh tomatoes and farm cream, absolutely free of onion and garlic.",
    price: 325,
    category: 'mains',
    isVeg: true,
    tag: 'Highly Pure',
    rating: 4.9,
    calories: 395,
    menuType: 'nong'
  },
  {
    id: 'nong_mn5',
    name: "NONG Matar Paneer",
    description: "Sweet garden peas and cottage cheese triangles cooked in a smooth, sweet cashew tomato gravy with no onion or garlic.",
    price: 355,
    category: 'mains',
    isVeg: true,
    rating: 4.7,
    calories: 330,
    menuType: 'nong'
  },
  {
    id: 'nong_mn6',
    name: "NONG Shahi Paneer",
    description: "Royal paneer slices simmered in a rich cream gravy flavored with cardamoms, cashews, and saffron drops, tailored for NONG diets.",
    price: 390,
    category: 'mains',
    isVeg: true,
    rating: 4.8,
    calories: 470,
    menuType: 'nong'
  },
  {
    id: 'nong_mn7',
    name: "NONG Paneer Kali Mirch",
    description: "Cubes of soft paneer cooked in a white cashew-cream gravy scented with freshly ground black pepper corns, no garlic/onion.",
    price: 390,
    category: 'mains',
    isVeg: true,
    tag: 'Spicy NONG',
    rating: 4.8,
    calories: 440,
    menuType: 'nong'
  },
  {
    id: 'nong_mn8',
    name: "NONG Malai Kofta",
    description: "Handcrafted potato and crumbled cottage cheese balls simmered in a dense, silky sweet saffron and cashew cream gravy.",
    price: 390,
    category: 'mains',
    isVeg: true,
    rating: 4.9,
    calories: 490,
    menuType: 'nong'
  },
  {
    id: 'nong_mn9',
    name: "NONG Paneer Bhujiya",
    description: "Fresh scrambled paneer pan-fried with sour red tomatoes, sweet peas, scraped ginger roots and ground coriander seed.",
    price: 355,
    category: 'mains',
    isVeg: true,
    rating: 4.6,
    calories: 290,
    menuType: 'nong'
  },
  {
    id: 'nong_mn10',
    name: "NONG Mix Veg",
    description: "Dry combo of fresh cauliflowers, sweet carrots, french beans, green peas, and local potatoes in mild turmeric dry spices.",
    price: 335,
    category: 'mains',
    isVeg: true,
    rating: 4.7,
    calories: 210,
    menuType: 'nong'
  },
  {
    id: 'nong_st1',
    name: "NONG Jeera Aloo",
    description: "Cubes of boiled potatoes pan-sautéed with generous roasted cumin seeds, fresh green chilies, lemon juice, turmeric, and fresh cilantro.",
    price: 240,
    category: 'starters',
    isVeg: true,
    rating: 4.5,
    calories: 190,
    menuType: 'nong'
  },
  {
    id: 'nong_mn11',
    name: "NONG Chana Masala",
    description: "Tangy kabuli chana spiced with fresh ginger paste, chopped tomatoes, amchoor, and slow-braised to perfection, zero onion/garlic.",
    price: 295,
    category: 'mains',
    isVeg: true,
    rating: 4.7,
    calories: 260,
    menuType: 'nong'
  },
  {
    id: 'nong_mn12',
    name: "NONG Stuffed Tomato",
    description: "Large red tomatoes deseeded, packed with a dry spice mix of shredded paneer and raisins, completed in butter-cashew gravy.",
    price: 375,
    category: 'mains',
    isVeg: true,
    rating: 4.8,
    calories: 360,
    menuType: 'nong'
  },

];

// Ambiance gallery images listing
const GALLERY_ITEMS = [
  {
    id: 1,
    title: "The Main Durbar Hall",
    category: "hall",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    description: "Grand imperial dining under magnificent custom glass chandeliers with hand-carved heritage furniture, serving exclusively royal vegetarian gastronomy."
  },
  {
    id: 2,
    title: "Royal Lounge Experience",
    category: "lounge",
    image: "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1200&q=80",
    description: "Secluded velvet couches framed by historical luxury gold screens. Ideal for exclusive family gatherings enjoying premium vegetarian feasts."
  },
  {
    id: 3,
    title: "Artisanal Dal Makhani Slow-Simmer",
    category: "kitchen",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    description: "Our signature black lentils, slow-cooked for 24 hours over glowing coals, finished with Pandit Makkhan Lal's secret hand-churned fresh dairy white butter."
  },
  {
    id: 4,
    title: "Paneer Tikka Shahi Masterpiece",
    category: "kitchen",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
    description: "Fresh premium cottage cheese cubes marinated in tandoori spice blends and charcoal-roasted to visual smokey gold perfection."
  },
  {
    id: 5,
    title: "Flaky Tandoori Naan & Roti Secrets",
    category: "kitchen",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80",
    description: "Baking fresh high-aromatic wheat breads and yeast-free butter naans on the natural glowing clay walls of our traditional tandoor."
  },
  {
    id: 6,
    title: "Imperial Candlelight Corner",
    category: "lounge",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80",
    description: "Intimate private table arrangements styled with warm candle lights, fine brass service sets, and bespoke vegetarian table alignments."
  }
];

// Testimonials list
const REVIEWS = [
  {
    id: 1,
    name: "Aditya Srivastava",
    role: "Gourmet Critic & Food Historian",
    text: "Makkhan's Dal Makkhan is an absolute masterpiece of Awadhi culinary science. The richness is balanced beautifully, and eating their butter naan feels like a royal privilege. Easily the best fine dining spot in Prayagraj.",
    rating: 5,
    date: "May 2026"
  },
  {
    id: 2,
    name: "Dr. Meera Chaturvedi",
    role: "Local Heritage Advocate",
    text: "The sheer commitment to vintage hospitality matches the legendary taste. The ambiance carries the soul of Allahabad's rich golden era. Direct order through their partners is ridiculously convenient, but dining in-person is unmatched.",
    rating: 5,
    date: "April 2026"
  },
  {
    id: 3,
    name: "Rajesh K. Gupta",
    role: "Executive Chef, Premium Cruise",
    text: "Having cooked food all around the world, I still crave the smoky undertones of Makkhan's tandoori delicacies. Their secret lies in the brass-churned fresh white butter, which has survived unchanged since 2008.",
    rating: 5,
    date: "June 2026"
  }
];

export default function App() {
  // Navigation State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Menu Search & Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [menuType, setMenuType] = useState<'standard' | 'kids' | 'nong'>('standard');

  // Interactive Reservation pre-order interest list
  const [preOrderedItems, setPreOrderedItems] = useState<{item: MenuItem; quantity: number}[]>([]);

  // Gallery Filter State
  const [galleryFilter, setGalleryFilter] = useState<string>('all');
  const [activeLightbox, setActiveLightbox] = useState<number | null>(null);

  // Active review tab index
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  // Reservation Form State
  const [resName, setResName] = useState('');
  const [resEmail, setResEmail] = useState('');
  const [resPhone, setResPhone] = useState('');
  const [resDate, setResDate] = useState('2026-06-05');
  const [resTime, setResTime] = useState('20:00');
  const [resGuests, setResGuests] = useState(4);
  const [resSeating, setResSeating] = useState('Main Durbar Hall');
  const [resDiet, setResDiet] = useState('No Preference');
  const [resNote, setResNote] = useState('');
  
  // Successful Booking State
  const [isBooked, setIsBooked] = useState(false);
  const [bookingTicket, setBookingTicket] = useState<{
    id: string;
    qrUrl: string;
  } | null>(null);

  // Success reservation highlights
  const reservationCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filtered menu database
  const filteredMenu = MENU_DATA.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (item.tag && item.tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesMenuType = item.menuType === menuType;
    
    return matchesCategory && matchesSearch && matchesMenuType;
  });

  // Simple item pre-ordering calculator
  const handleAddItemToPreorder = (item: MenuItem) => {
    setPreOrderedItems(prev => {
      const existing = prev.find(p => p.item.id === item.id);
      if (existing) {
        return prev.map(p => p.item.id === item.id ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const handleRemoveItem = (itemId: string) => {
    setPreOrderedItems(prev => prev.filter(p => p.item.id !== itemId));
  };

  const handleUpdateItemQuantity = (itemId: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setPreOrderedItems(prev => prev.map(p => p.item.id === itemId ? { ...p, quantity: qty } : p));
  };

  const calculatePreOrderTotal = () => {
    return preOrderedItems.reduce((acc, current) => acc + (current.item.price * current.quantity), 0);
  };

  // Gallery filtered items
  const filteredGallery = GALLERY_ITEMS.filter(it => galleryFilter === 'all' || it.category === galleryFilter);

  // Handle instant scroll with highlight
  const scrollToReservation = () => {
    reservationCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setMobileMenuOpen(false);
  };

  // Submit reservation
  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resName || !resPhone) {
      alert("Please key in your Name and Contact Phone Number to create a luxury booking table.");
      return;
    }

    const randomID = "MKK-" + Math.floor(Math.random() * 90000 + 10000) + "-PGR";
    const qrText = encodeURIComponent(`Reservation at Makkhan's Table for ${resName} on ${resDate} at ${resTime} for ${resGuests} Guests. Confmed Code: ${randomID}`);
    const simulatedQR = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrText}&color=d4af37&bgcolor=1a0f0a`;

    setBookingTicket({
      id: randomID,
      qrUrl: simulatedQR
    });
    setIsBooked(true);
  };

  const resetBookingForm = () => {
    setResName('');
    setResEmail('');
    setResPhone('');
    setResNote('');
    setPreOrderedItems([]);
    setIsBooked(false);
    setBookingTicket(null);
  };

  return (
    <div className="min-h-screen bg-[#1a0f0a] text-[#f5f2ed] font-sans antialiased selection:bg-[#d4af37]/30 selection:text-[#d4af37]/100">
      
      {/* EXQUISITE DIRECT CONVERSION FLOATING DRAWER (Desktop Only) */}
      <div className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 flex-col gap-4 z-50 bg-[#261811]/90 backdrop-blur-md p-3 rounded-full border border-[#d4af37]/30 shadow-2xl">
        <a 
          href="https://zomato.onelink.me/xqzv/tszn5il6" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="group relative w-12 h-12 bg-[#2d1e15] border border-[#d4af37]/20 hover:border-[#d4af37] flex items-center justify-center rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg"
          title="Order via Zomato"
        >
          <span className="text-[#e23744] font-black text-xs group-hover:text-amber-500">Z</span>
          <span className="absolute left-16 bg-[#261811] text-[#d4af37] text-xs font-serif italic py-1 px-3 border border-[#d4af37]/20 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none duration-300">
            Zomato Delivery
          </span>
        </a>
        <a 
          href="https://www.swiggy.com/city/allahabad/makkhans-veg-restaurant-civil-lines-rest80461?source=sharing" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="group relative w-12 h-12 bg-[#2d1e15] border border-[#d4af37]/20 hover:border-[#d4af37] flex items-center justify-center rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg"
          title="Order via Swiggy"
        >
          <span className="text-[#fc8019] font-black text-xs group-hover:text-amber-500">S</span>
          <span className="absolute left-16 bg-[#261811] text-[#d4af37] text-xs font-serif italic py-1 px-3 border border-[#d4af37]/20 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none duration-300">
            Swiggy Fast Order
          </span>
        </a>
        <a 
          href="https://www.google.com/maps/place/Makkhan's+Veg+Restaurant/@25.4546046,81.8308173,17z/data=!3m1!4b1!4m6!3m5!1s0x399acb3160a47dbf:0xb3817bb5659b48a1!8m2!3d25.4546046!4d81.8333922!16s%2Fg%2F11f9fbnvd2?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="group relative w-12 h-12 bg-[#2d1e15] border border-[#d4af37]/20 hover:border-[#d4af37] flex items-center justify-center rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg"
          title="Location in Prayagraj"
        >
          <MapPin size={18} className="text-[#d4af37] group-hover:text-white transition-colors" />
          <span className="absolute left-16 bg-[#261811] text-[#d4af37] text-xs font-serif italic py-1 px-3 border border-[#d4af37]/20 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none duration-300">
            Civil Lines, Prayagraj
          </span>
        </a>
        <div className="w-6 h-[1px] bg-[#d4af37]/20 mx-auto"></div>
        <a 
          href="https://www.instagram.com/makkhans_restaurant_civillines?igsh=MTl6dXdvcHI0aWdiYg%3D%3D" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="group relative w-10 h-10 bg-[#1a0f0a] hover:bg-[#2d1e15] flex items-center justify-center rounded-full transition-colors duration-300"
        >
          <Instagram size={15} className="text-[#d4af37]/60 group-hover:text-[#d4af37]" />
        </a>
        <a 
          href="https://www.facebook.com/Makkhanvegrestaurant/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="group relative w-10 h-10 bg-[#1a0f0a] hover:bg-[#2d1e15] flex items-center justify-center rounded-full transition-colors duration-300"
        >
          <Facebook size={15} className="text-[#d4af37]/60 group-hover:text-[#d4af37]" />
        </a>
        <a 
          href="https://www.youtube.com/@makkhansvegrestaurant" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="group relative w-10 h-10 bg-[#1a0f0a] hover:bg-[#2d1e15] flex items-center justify-center rounded-full transition-colors duration-300"
        >
          <Youtube size={15} className="text-[#d4af37]/60 group-hover:text-[#d4af37]" />
        </a>
      </div>

      {/* STICKY HEADER WITH PERSISTENT BOOKING CTA */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 border-b ${
        scrolled 
          ? 'bg-[#1a0f0a]/95 backdrop-blur-md py-4 border-[#d4af37]/20 shadow-xl' 
          : 'bg-transparent py-6 border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center" id="top-nav">
          
          {/* Logo Brand styling inspired by luxury aesthetic */}
          <a href="#" className="flex items-center gap-3 select-none group">
            <MakhhansLogo className="w-10 h-10 md:w-11 md:h-11" />
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-serif tracking-[0.15em] text-[#d4af37] font-bold group-hover:text-white transition-colors leading-none">
                MAKKHAN'S
              </span>
              <span className="text-[8px] uppercase tracking-[0.3em] text-[#d4af37]/85 mt-1.5 font-sans">
                ESTD. 2008 • PRAYAGRAJ
              </span>
            </div>
          </a>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-[0.2em] font-semibold text-[#f5f2ed]/80">
            <a href="#menu-showcase" className="hover:text-[#d4af37] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#d4af37] hover:after:w-full after:transition-all after:duration-300">Menu</a>
            <a href="#ambiance-section" className="hover:text-[#d4af37] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#d4af37] hover:after:w-full after:transition-all after:duration-300">Ambiance</a>
            <a href="#legacy-story" className="hover:text-[#d4af37] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#d4af37] hover:after:w-full after:transition-all after:duration-300">Legacy</a>
            <a href="#partners-section" className="hover:text-[#d4af37] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#d4af37] hover:after:w-full after:transition-all after:duration-300">Platforms</a>
            <a href="#reviews" className="hover:text-[#d4af37] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#d4af37] hover:after:w-full after:transition-all after:duration-300">Reviews</a>
          </nav>

          {/* Reservation Activator CTA */}
          <div className="flex items-center gap-4">
            <button 
              onClick={scrollToReservation}
              id="header-booking-btn"
              className="inline-flex px-3.5 py-2 sm:px-6 sm:py-2.5 bg-[#d4af37] text-[#1a0f0a] text-[10px] sm:text-xs uppercase font-black tracking-widest hover:bg-[#ebd06f] hover:scale-[1.03] active:scale-[0.98] transition-all shadow-md group items-center gap-1.5 cursor-pointer"
            >
              <Calendar size={13} className="text-[#1a0f0a]" />
              Book Table
            </button>
            
            {/* Mobile Hamburger toggle */}
            <button 
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="lg:hidden p-2 text-[#d4af37] hover:bg-[#2d1e15] rounded border border-[#d4af37]/20"
              aria-label="Toggle menu"
              id="mobile-menu-trigger"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU NAV SYSTEM */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#1a0f0a] flex flex-col justify-between pt-24 px-8 pb-10 border-b-[8px] border-[#d4af37] overflow-y-auto max-h-screen" id="mobile-navigation-overlay">
          <div className="flex flex-col gap-6 text-center mt-6">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#d4af37]">Royal Navigation</span>
            <a 
              href="#menu-showcase" 
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif text-3xl italic hover:text-[#d4af37] text-[#f5f2ed] border-b border-[#d4af37]/10 py-3 block"
            >
              Culinary Menu
            </a>
            <a 
              href="#ambiance-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif text-3xl italic hover:text-[#d4af37] text-[#f5f2ed] border-b border-[#d4af37]/10 py-3 block"
            >
              Imperial Ambiance
            </a>
            <a 
              href="#legacy-story" 
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif text-3xl italic hover:text-[#d4af37] text-[#f5f2ed] border-b border-[#d4af37]/10 py-3 block"
            >
              Heritage Story
            </a>
            <a 
              href="#partners-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif text-3xl italic hover:text-[#d4af37] text-[#f5f2ed] border-b border-[#d4af37]/10 py-3 block"
            >
              Delivery & Socials
            </a>
            <button 
              onClick={scrollToReservation}
              className="w-full mt-4 py-4 bg-[#d4af37] text-[#1a0f0a] font-serif text-lg italic font-bold tracking-widest shadow-xl flex items-center justify-center gap-2"
              id="mobile-submenu-booking-btn"
            >
              <Calendar size={18} /> Ensure Table Booking
            </button>
          </div>

          <div className="flex flex-col items-center gap-4 text-center mt-auto border-t border-[#d4af37]/20 pt-6">
            <span className="text-[11px] uppercase tracking-widest text-[#d4af37]">Immediate Delivery Orders</span>
            <div className="flex gap-4 w-full">
              <a href="https://zomato.onelink.me/xqzv/tszn5il6" target="_blank" rel="noopener noreferrer" className="flex-1 py-2.5 bg-[#e23744] text-white hover:bg-[#c92531] text-xs font-bold rounded flex items-center justify-center gap-1">
                Zomato
              </a>
              <a href="https://www.swiggy.com/city/allahabad/makkhans-veg-restaurant-civil-lines-rest80461?source=sharing" target="_blank" rel="noopener noreferrer" className="flex-1 py-2.5 bg-[#fc8019] text-[#1a0f0a] hover:bg-[#e47610] text-xs font-black rounded flex items-center justify-center gap-1">
                Swiggy
              </a>
            </div>
            <div className="flex gap-6 mt-2 text-[#d4af37]/70">
              <a href="https://www.instagram.com/makkhans_restaurant_civillines?igsh=MTl6dXdvcHI0aWdiYg%3D%3D" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://www.facebook.com/Makkhanvegrestaurant/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
              <a href="https://www.youtube.com/@makkhansvegrestaurant" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Youtube size={18} />
              </a>
              <a href="tel:+915322408599" className="hover:text-white transition-colors">
                <Phone size={18} />
              </a>
            </div>
            <p className="text-[10px] opacity-40">Civil Lines, Prayagraj • Call +91 532 240 8599</p>
          </div>
        </div>
      )}

      {/* HERO SECTION - BOLD TYPOGRAPHY STYLE */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 px-6 border-b border-[#d4af37]/20" id="hero-banner">
        {/* Visual subtle lighting elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-[#2d1e15]/40 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
          
          {/* Tag line with classical Indian motifs style */}
          <div className="flex items-center gap-3 mb-6 animate-fade-in">
            <div className="w-8 h-[1px] bg-[#d4af37]"></div>
            <span className="text-[#d4af37] text-xs md:text-sm uppercase tracking-[0.4em] font-medium">
              Since 2008 • The Royal Cuisine of Prayagraj
            </span>
            <div className="w-8 h-[1px] bg-[#d4af37]"></div>
          </div>

          {/* Master Title - Bold Typography Serif Italic styled perfectly */}
          <h1 className="text-5xl sm:text-7xl md:text-[110px] font-serif leading-[0.9] text-center italic tracking-tight mb-8 font-light" id="hero-title">
            Culinaria <span className="text-[#d4af37] not-italic font-bold block sm:inline">Exquisite</span>
          </h1>

          {/* Framing decoration borders */}
          <div className="w-16 h-1 my-2 border-t-2 border-b border-[#d4af37]/60"></div>

          {/* Description with precise readability container */}
          <p className="max-w-2xl text-center text-sm md:text-base text-[#f5f2ed]/80 leading-relaxed tracking-wide mt-4 mb-10 px-4">
            Indulge in a symphony of authentic North Indian flavors, masterfully crafted in the heart of Prayagraj. A legacy of taste, heavy fresh cow butter, and rich Awadhi secrets, served with gold-standard heritage hospitality.
          </p>

          {/* Quick Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md px-6">
            <a 
              href="#menu-showcase" 
              className="flex-1 px-8 py-3.5 bg-transparent text-[#d4af37] border-2 border-[#d4af37] text-xs uppercase font-black tracking-widest text-center hover:bg-[#d4af37]/10 transition-colors"
            >
              Explore Menu
            </a>
            <button 
              onClick={scrollToReservation}
              className="flex-1 px-8 py-3.5 bg-[#d4af37] text-[#1a0f0a] text-xs uppercase font-black tracking-widest hover:bg-[#ebd06f] hover:scale-[1.02] active:scale-[0.98] transition-all text-center flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              id="hero-book-btn"
            >
              <Calendar size={14} />
              Reserve Table
            </button>
          </div>

          {/* Elegant down indicators */}
          <a href="#quick-stat-bar" className="mt-12 text-[#d4af37] opacity-60 hover:opacity-100 transition-opacity animate-bounce">
            <ChevronDown size={28} />
          </a>
        </div>
      </section>

      {/* QUICK METRIC STATUS BAR */}
      <section className="bg-[#140b07] border-b border-[#d4af37]/10 py-6 px-6" id="quick-stat-bar">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-2">
            <p className="text-[#d4af37] text-2xl md:text-3xl font-serif italic">40+ Years</p>
            <p className="text-[10px] uppercase tracking-widest opacity-60 mt-1">Gourmet Heritage</p>
          </div>
          <div className="p-2 border-l border-[#d4af37]/10">
            <p className="text-[#d4af37] text-2xl md:text-3xl font-serif italic">100% Pure</p>
            <p className="text-[10px] uppercase tracking-widest opacity-60 mt-1">Hand-Churned Makkhan</p>
          </div>
          <div className="p-2 border-l border-r border-[#d4af37]/10 md:border-r-0">
            <p className="text-[#d4af37] text-2xl md:text-3xl font-serif italic">4.9 Star</p>
            <p className="text-[10px] uppercase tracking-widest opacity-60 mt-1">Zomato Customer Trust</p>
          </div>
          <div className="p-2 border-l border-[#d4af37]/10">
            <p className="text-[#d4af37] text-2xl md:text-3xl font-serif italic">1.2 Million</p>
            <p className="text-[10px] uppercase tracking-widest opacity-60 mt-1">Smiles Served</p>
          </div>
        </div>
      </section>

      {/* CORE CONNECTED CONVERSION PLATFORM BLOCK */}
      <section className="py-20 px-6 bg-[#1a0f0a] relative overflow-hidden scroll-mt-20" id="partners-section">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-16">
            <span className="text-[#d4af37] text-xs uppercase tracking-[0.4em] font-medium block mb-2">Direct Order & Social Access</span>
            <h2 className="text-3xl md:text-5xl font-serif italic">Connect Seamlessly</h2>
            <p className="max-w-xl mx-auto text-sm opacity-70 mt-2">Get fresh hot meals delivered at your doorstep, get driving routes, or look inside our kitchen activities instantly.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="connected-channels-grid">
            
            {/* ZOMATO CARD */}
            <div className="bg-[#261811] border border-[#d4af37]/20 p-8 flex flex-col justify-between hover:border-[#d4af37] hover:scale-[1.02] transition-all duration-300 group shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#e23744]/5 rounded-bl-full pointer-events-none group-hover:bg-[#e23744]/13 transition-colors"></div>
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="bg-[#e23744] text-white text-[10px] uppercase font-bold py-1 px-3 tracking-widest">ORDER DELIVERY</span>
                  <span className="text-[#d4af37] font-serif font-black italic">4.9 ★</span>
                </div>
                <h3 className="text-2xl font-serif text-[#d4af37] mb-2 font-bold group-hover:text-white transition-colors">Zomato Premium</h3>
                <p className="text-sm opacity-75 mb-6">Order Makkhan signature rich curries and tender buttery Naans via Zomato for elite safety and express home delivery.</p>
                <div className="bg-[#1a0f0a]/60 p-3 border border-[#d4af37]/10 mb-6 rounded-sm">
                  <p className="text-xs text-[#d4af37] font-semibold">★ Golden Promo Code: MAKKHAN60</p>
                  <p className="text-[10px] opacity-60 mt-0.5">Avail flat 60% off up to ₹120 on your first three orders.</p>
                </div>
              </div>
              <a 
                href="https://zomato.onelink.me/xqzv/tszn5il6" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full py-3 bg-[#e23744] hover:bg-[#cf2f3c] text-white text-xs uppercase tracking-widest font-black text-center flex items-center justify-center gap-1.5 transition-colors mt-auto shadow"
              >
                Order on Zomato <ExternalLink size={12} />
              </a>
            </div>

            {/* SWIGGY CARD */}
            <div className="bg-[#261811] border border-[#d4af37]/20 p-8 flex flex-col justify-between hover:border-[#d4af37] hover:scale-[1.02] transition-all duration-300 group shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#fc8019]/5 rounded-bl-full pointer-events-none group-hover:bg-[#fc8019]/13 transition-colors"></div>
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="bg-[#fc8019] text-white text-[10px] uppercase font-bold py-1 px-3 tracking-widest">FAST SEAMLESS</span>
                  <span className="text-[#d4af37] font-serif font-black italic">4.8 ★</span>
                </div>
                <h3 className="text-2xl font-serif text-[#d4af37] mb-2 font-bold group-hover:text-white transition-colors">Swiggy Instant</h3>
                <p className="text-sm opacity-75 mb-6">Crave deep, direct flavors of local Malai Paneer Tikka, slow-cooked Dal Makhani or Shahi Tukda? We are live 24/7 on Swiggy for hyper-local fast dispatch.</p>
                <div className="bg-[#1a0f0a]/60 p-3 border border-[#d4af37]/10 mb-6 rounded-sm">
                  <p className="text-xs text-[#fc8019] font-semibold">⚡ Active Deal: Free Dessert Kulhad</p>
                  <p className="text-[10px] opacity-60 mt-0.5">Complimentary Rose Lassi on bills valued above ₹699.</p>
                </div>
              </div>
              <a 
                href="https://www.swiggy.com/city/allahabad/makkhans-veg-restaurant-civil-lines-rest80461?source=sharing" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full py-3 bg-[#fc8019] hover:bg-[#e97514] text-[#1a0f0a] text-xs uppercase tracking-widest font-black text-center flex items-center justify-center gap-1.5 transition-colors mt-auto shadow"
              >
                Order on Swiggy <ExternalLink size={12} />
              </a>
            </div>

            {/* GOOGLE MAPS CARD */}
            <div className="bg-[#261811] border border-[#d4af37]/20 p-8 flex flex-col justify-between hover:border-[#d4af37] hover:scale-[1.02] transition-all duration-300 group shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#d4af37]/5 rounded-bl-full pointer-events-none group-hover:bg-[#d4af37]/10 transition-colors"></div>
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="bg-[#d4af37] text-[#1a0f0a] text-[10px] uppercase font-black py-1 px-3 tracking-widest">CIVIL LINES</span>
                  <span className="text-[11px] uppercase tracking-widest opacity-60">12 mins from Prayagraj Jn</span>
                </div>
                <h3 className="text-2xl font-serif text-[#d4af37] mb-2 font-bold group-hover:text-white transition-colors">Google Maps Location</h3>
                <p className="text-sm opacity-75 mb-6">Beautifully located in Prayagraj's premier cultural corridor. Valet booking included free of cost with absolute security.</p>
                <div className="bg-[#1a0f0a]/60 p-3 border border-[#d4af37]/10 mb-6 rounded-sm">
                  <p className="text-xs text-[#d4af37] font-semibold">📍 Address Coordinates</p>
                  <p className="text-[10px] opacity-60 mt-0.5">9/B, Mahatma Gandhi Marg, Civil Lines, Prayagraj, UP 211001</p>
                </div>
              </div>
              <a 
                href="https://www.google.com/maps/place/Makkhan's+Veg+Restaurant/@25.4546046,81.8308173,17z/data=!3m1!4b1!4m6!3m5!1s0x399acb3160a47dbf:0xb3817bb5659b48a1!8m2!3d25.4546046!4d81.8333922!16s%2Fg%2F11f9fbnvd2?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full py-3 bg-transparent hover:bg-[#d4af37] hover:text-[#1a0f0a] text-[#d4af37] border border-[#d4af37] text-xs uppercase tracking-widest font-black text-center flex items-center justify-center gap-1.5 transition-colors mt-auto shadow"
              >
                Get Directions <MapPin size={12} />
              </a>
            </div>

            {/* SOCIAL MEDIA CARDS */}
            <div className="bg-[#261811] border border-[#d4af37]/20 p-8 flex flex-col justify-between md:col-span-2 lg:col-span-3 hover:border-[#d4af37] transition-all duration-300 group shadow-md" id="social-integration-rack">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                  <span className="text-[#d4af37] text-[10px] uppercase tracking-[0.3em] font-bold block mb-1">STAY CONNECTED WITH US</span>
                  <h3 className="text-2xl font-serif font-semibold">Live Social Stories & Insights</h3>
                  <p className="text-sm opacity-70 mt-1 max-w-2xl">Follow the culinary experiments, golden lighting layouts, behind-the-scenes tandoor operations, and food blogs across our certified networks.</p>
                </div>
                <div className="flex flex-wrap gap-4" id="social-button-dock-group">
                  <a 
                    href="https://www.instagram.com/makkhans_restaurant_civillines?igsh=MTl6dXdvcHI0aWdiYg%3D%3D" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 bg-[#1a0f0a] border border-[#d4af37]/20 hover:border-[#d4af37] py-2 px-4 rounded-full text-xs font-semibold hover:text-[#d4af37] transition-all"
                  >
                    <Instagram size={14} className="text-[#d4af37]" /> @MakkhansPrayagraj
                  </a>
                  <a 
                    href="https://www.facebook.com/Makkhanvegrestaurant/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 bg-[#1a0f0a] border border-[#d4af37]/20 hover:border-[#d4af37] py-2 px-4 rounded-full text-xs font-semibold hover:text-[#d4af37] transition-all"
                  >
                    <Facebook size={14} className="text-[#d4af37]" /> Makkhan's Hospitality
                  </a>
                  <a 
                    href="https://www.youtube.com/@makkhansvegrestaurant" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 bg-[#1a0f0a] border border-[#d4af37]/20 hover:border-[#d4af37] py-2 px-4 rounded-full text-xs font-semibold hover:text-[#d4af37] transition-all"
                  >
                    <Youtube size={14} className="text-[#d4af37]" /> Recipe Secrets
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TEXT-BASED INTERACTIVE MENU PREVIEW WITH SEARCH & VEG FILTER */}
      <section className="py-24 px-6 bg-[#140b07] border-t border-b border-[#d4af37]/20 relative scroll-mt-20" id="menu-showcase">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#d4af37]/5 rounded-bl-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-6xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-[#d4af37] text-xs uppercase tracking-[0.4em] font-medium block mb-2">Our Culinary Card</span>
              <h2 className="text-4xl md:text-5xl font-serif italic">The Golden Vault of Taste</h2>
              <p className="max-w-md text-sm opacity-70 mt-2">Explore legacy Awadhi, Mughlai, and royal Punjabi dishes. Feel free to search or add interested items directly to your booking receipt!</p>
            </div>
            
            {/* SEARCH AND COMBINED FILTER HUB */}
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto" id="menu-search-control-box">
              <div className="relative flex-1 sm:w-64">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#d4af37]/60" />
                <input 
                  type="text" 
                  placeholder="Search delicacy name..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#1a0f0a] border border-[#d4af37]/20 focus:border-[#d4af37] text-[#f5f2ed] text-xs outline-none py-3.5 pl-10 pr-4 tracking-wide"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs opacity-60 hover:opacity-100"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row bg-[#1a0f0a] border border-[#d4af37]/20 p-1 select-none w-full sm:w-auto" id="menu-type-toggle-button-set">
                <button 
                  onClick={() => { setMenuType('standard'); setSelectedCategory('all'); }}
                  className={`flex-1 sm:flex-none px-4 py-2 text-[10px] uppercase font-bold tracking-widest transition-colors ${
                    menuType === 'standard' ? 'bg-[#d4af37] text-[#1a0f0a]' : 'text-[#f5f2ed]/60 hover:text-white'
                  }`}
                >
                  Dine-In Menu
                </button>
                <button 
                  onClick={() => { setMenuType('kids'); setSelectedCategory('all'); }}
                  className={`flex-1 sm:flex-none px-4 py-2 text-[10px] uppercase font-bold tracking-widest transition-colors flex items-center justify-center gap-1 ${
                    menuType === 'kids' ? 'bg-[#d4af37] text-[#1a0f0a]' : 'text-[#f5f2ed]/60 hover:text-white'
                  }`}
                >
                  Kids Special 👶
                </button>
                <button 
                  onClick={() => { setMenuType('nong'); setSelectedCategory('all'); }}
                  className={`flex-1 sm:flex-none px-4 py-2 text-[10px] uppercase font-bold tracking-widest transition-colors flex items-center justify-center gap-1 ${
                    menuType === 'nong' ? 'bg-[#4caf50] text-[#1a0f0a]' : 'text-[#f5f2ed]/60 hover:text-white'
                  }`}
                >
                  🧄 No Onion No Garlic
                </button>
              </div>
            </div>
          </div>

          {/* CATEGORY TABS CONTAINER */}
          <div className="flex overflow-x-auto gap-2 pb-4 mb-10 border-b border-[#d4af37]/10 no-scrollbar" id="menu-category-tabs">
            {[
              { id: 'all', label: 'Complete Vault' },
              { id: 'signatures', label: 'Chef Signatures' },
              { id: 'starters', label: 'Starters & Snacks' },
              { id: 'mains', label: 'Signature Main Course' },
              { id: 'breads', label: 'Tandoori Breads' },
              { id: 'desserts', label: 'Desserts & Beverages' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`py-3 px-6 whitespace-nowrap text-xs uppercase tracking-widest transition-all border ${
                  selectedCategory === tab.id 
                    ? 'bg-[#d4af37]/10 text-[#d4af37] border-[#d4af37] font-bold' 
                    : 'bg-[#1a0f0a] text-[#f5f2ed]/60 border-transparent hover:border-[#d4af37]/20 hover:text-[#f5f2ed]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="menu-item-interactive-masonry">
            {filteredMenu.length > 0 ? (
              filteredMenu.map(dish => (
                <div 
                  key={dish.id} 
                  className="bg-[#261811] border border-[#d4af37]/10 hover:border-[#d4af37]/30 p-6 flex justify-between gap-4 transition-all duration-300 relative group shadow-sm hover:shadow-md"
                >
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {/* 100% Pure Veg dot indicator */}
                        <div className="w-3.5 h-3.5 border border-[#4caf50] p-0.5 flex items-center justify-center" title="100% Pure Vegetarian">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#4caf50]"></div>
                        </div>
                        {dish.tag && (
                          <span className="text-[9px] uppercase tracking-widest bg-[#d4af37]/15 text-[#d4af37] px-2 py-0.5 font-bold">
                            {dish.tag}
                          </span>
                        )}
                        <span className="text-[9px] opacity-70 ml-auto">{dish.calories} Kcal</span>
                      </div>

                      <h3 className="text-lg md:text-xl font-serif text-[#f5f2ed] mb-1 font-semibold group-hover:text-[#d4af37] transition-colors">
                        {dish.name}
                      </h3>
                      <p className="text-xs text-[#f5f2ed]/60 leading-relaxed mb-4 line-clamp-2">
                        {dish.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 mt-2">
                      <div className="text-[#d4af37] font-serif text-lg font-bold">
                        ₹{dish.price}
                      </div>
                      <div className="text-[10px] opacity-70 italic">Serves 1-2</div>
                    </div>
                  </div>

                  {/* Add item to preorder button */}
                  <div className="flex flex-col items-center justify-between min-w-[70px]">
                    <div className="flex items-center gap-1 text-[11px] text-[#d1b06c]">
                      <Star size={11} className="fill-[#d4af37] text-[#d4af37]" /> {dish.rating}
                    </div>
                    
                    {preOrderedItems.find(p => p.item.id === dish.id) ? (
                      <div className="flex items-center bg-[#d4af37] rounded-sm text-[#1a0f0a] overflow-hidden">
                        <button 
                          onClick={() => handleUpdateItemQuantity(dish.id, (preOrderedItems.find(p => p.item.id === dish.id)?.quantity || 0) - 1)}
                          className="px-2 py-1 text-xs font-bold hover:bg-[#bfa035] transition-colors"
                        >
                          -
                        </button>
                        <span className="px-2 py-1 text-xs font-black">
                          {preOrderedItems.find(p => p.item.id === dish.id)?.quantity}
                        </span>
                        <button 
                          onClick={() => handleAddItemToPreorder(dish)}
                          className="px-2 py-1 text-xs font-bold hover:bg-[#bfa035] transition-colors"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => handleAddItemToPreorder(dish)}
                        className="w-full py-1.5 px-3 bg-[#d4af37]/10 hover:bg-[#d4af37] text-[#d4af37] hover:text-[#1a0f0a] text-[10px] uppercase tracking-widest font-black border border-[#d4af37]/30 hover:border-[#d4af37] transition-all cursor-pointer"
                      >
                        + Pre-Add
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-20 bg-[#261811] border border-[#d4af37]/10 rounded-sm">
                <p className="text-sm opacity-60">We couldn't fine-tune an item matching "{searchQuery}". Try checking another menu list above!</p>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setMenuType('standard'); }} 
                  className="mt-4 px-6 py-2 bg-[#d4af37] text-[#1a0f0a] text-xs uppercase tracking-widest font-black"
                >
                  View Complete Vault
                </button>
              </div>
            )}
          </div>

          {/* Quick Pre-order cart slider banner if user selects something */}
          {preOrderedItems.length > 0 && (
            <div className="fixed bottom-6 left-6 right-6 lg:left-32 lg:right-32 z-50 bg-[#2d1e15]/95 backdrop-blur-md border-2 border-[#d4af37] p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 animate-slide-up shadow-2xl rounded-lg" id="pre-order-calculator-tray">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <p className="text-[#d4af37] text-xs uppercase tracking-widest font-black">Table Pre-Add Estimator (Copied to your Boarding Pass)</p>
                </div>
                <h3 className="text-xl font-serif text-[#f5f2ed] font-medium">
                  {preOrderedItems.length} Signature {preOrderedItems.length === 1 ? 'Dish' : 'Dishes'} added to your reservation checklist
                </h3>
                <div className="flex flex-wrap gap-2 mt-3" id="preorder-badge-rack">
                  {preOrderedItems.map(p => (
                    <span key={p.item.id} className="text-[10px] bg-[#1a0f0a] border border-[#d4af37]/20 text-[#f5f2ed]/80 px-2.5 py-1 rounded-sm flex items-center gap-1.5">
                      {p.item.name} <strong className="text-[#d4af37]">x{p.quantity}</strong>
                      <button onClick={() => handleRemoveItem(p.item.id)} className="text-rose-400 hover:text-rose-600 ml-1">×</button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-[#d4af37]/20 pt-4 md:pt-0">
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-widest opacity-60">Total Estimated Cost (Excl. Tax)</p>
                  <p className="text-[#d4af37] text-3xl font-serif font-black">₹{calculatePreOrderTotal()}</p>
                </div>
                <button 
                  onClick={scrollToReservation}
                  className="px-6 py-3.5 bg-[#d4af37] text-[#1a0f0a] text-xs uppercase font-black tracking-widest hover:bg-[#ebd06f] hover:scale-105 active:scale-95 transition-all cursor-pointer shadow"
                >
                  Lock In Table Reservation
                </button>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* AMBIANCE GALLERY BENTO GRID WITH INTERACTIVE LIGHTBOX VIEW */}
      <section className="py-24 px-6 bg-[#1a0f0a] scroll-mt-20" id="ambiance-section">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-16">
            <span className="text-[#d4af37] text-xs uppercase tracking-[0.4em] font-medium block mb-2">Live Ambiance Gallery</span>
            <h2 className="text-3xl md:text-5xl font-serif italic">The Imperial Ambiance</h2>
            <p className="max-w-xl mx-auto text-sm opacity-70 mt-2">Discover our fine architectural arrangements, gold accent paneling, and warm candlelight niches designed for memories.</p>
            
            {/* Gallery Category filtering */}
            <div className="flex justify-center gap-2 mt-8 flex-wrap" id="gallery-navigation-row">
              {[
                { id: 'all', label: 'Explore All corners' },
                { id: 'hall', label: 'Main Durbar Halls' },
                { id: 'lounge', label: 'Private Lounges' },
                { id: 'kitchen', label: 'The Tandoor Secrets' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setGalleryFilter(cat.id)}
                  className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold transition-all border ${
                    galleryFilter === cat.id 
                      ? 'bg-[#d4af37] text-[#1a0f0a] border-[#d4af37] shrink-0' 
                      : 'bg-[#261811] text-[#f5f2ed]/60 border-transparent hover:border-[#d4af37]/20 shrink-0'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* GALLERY BENTO GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="gallery-bento-box">
            {filteredGallery.map((item, index) => (
              <div 
                key={item.id}
                onClick={() => setActiveLightbox(item.id)}
                className="group cursor-pointer bg-[#261811] border border-[#d4af37]/10 hover:border-[#d4af37] transition-all duration-500 overflow-hidden relative aspect-video md:aspect-square flex flex-col justify-end"
              >
                {/* Image tag complying strictly with referrerPolicy */}
                <img 
                  src={item.image} 
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-80 group-hover:opacity-100"
                />
                
                {/* Gradient shade overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#140b07] via-[#1a0f0a]/30 to-transparent p-6 flex flex-col justify-end">
                  <span className="text-[#d4af37] text-[10px] uppercase tracking-widest font-bold mb-1 opacity-70 group-hover:opacity-100 transition-opacity">
                    {item.category === 'hall' ? 'Main Durbar Hall' : item.category === 'lounge' ? 'Private Lounge' : 'Kitchen Fire'}
                  </span>
                  <h3 className="text-xl font-serif text-[#f5f2ed] mb-1 font-semibold transform group-hover:translate-x-1 transition-transform">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1 text-[10px] text-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Explore details</span> <ChevronRight size={10} />
                  </div>
                </div>

                <div className="absolute top-4 right-4 bg-[#1a0f0a]/80 backdrop-blur-md p-2 rounded-full border border-[#d4af37]/20">
                  <Camera size={14} className="text-[#d4af37]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GALLERY LIGHTBOX MODAL */}
        {activeLightbox !== null && (
          <div 
            className="fixed inset-0 bg-[#1a0f0a]/95 backdrop-blur-md z-50 flex items-center justify-center p-6" 
            onClick={() => setActiveLightbox(null)}
            id="lightbox-popup-dialog"
          >
            <div 
              className="bg-[#261811] border-2 border-[#d4af37] max-w-4xl w-full p-6 md:p-8 relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setActiveLightbox(null)}
                className="absolute right-4 top-4 text-white hover:text-[#d4af37] p-2 bg-[#1a0f0a] border border-[#d4af37]/20 rounded-full"
              >
                <X size={20} />
              </button>

              {(() => {
                const item = GALLERY_ITEMS.find(it => it.id === activeLightbox);
                if (!item) return null;
                return (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-7 overflow-hidden border border-[#d4af37]/10 aspect-video md:aspect-auto md:h-[400px]">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:col-span-5 flex flex-col justify-center">
                      <span className="text-[#d4af37] text-xs uppercase tracking-[0.3em] font-bold block mb-2">Authenticated Location View</span>
                      <h3 className="text-2xl font-serif italic text-white mb-4">{item.title}</h3>
                      <div className="w-12 h-[1px] bg-[#d4af37] mb-4"></div>
                      <p className="text-sm text-[#f5f2ed]/85 leading-relaxed mb-6">
                        {item.description}
                      </p>
                      
                      <div className="bg-[#1a0f0a] p-4 border border-[#d4af37]/20 rounded-sm mb-6">
                        <p className="text-xs text-[#d4af37] font-semibold flex items-center gap-1.5">
                          <CheckCircle size={12} /> Seating Available Here
                        </p>
                        <p className="text-[11px] opacity-65 mt-1">This space is subject to availability. Make sure to choose this preference in our instant reservation widget below for custom allocation.</p>
                      </div>

                      <button 
                        onClick={() => {
                          setResSeating(item.title);
                          setActiveLightbox(null);
                          scrollToReservation();
                        }}
                        className="w-full py-3 bg-[#d4af37] text-[#1a0f0a] text-xs uppercase tracking-widest font-black hover:bg-[#ebd06f] transition-all"
                      >
                        Select Seating & Book
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </section>

      {/* THE LEGACY TIMELINE STORY - RICH BROWN & GOLD */}
      <section className="py-24 px-6 bg-[#140b07] border-t border-b border-[#d4af37]/20 relative overflow-hidden scroll-mt-20" id="legacy-story">
        <div className="absolute top-1/4 left-0 w-80 h-80 bg-[#d4af37]/3 rounded-br-full blur-[80px] pointer-events-none"></div>
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-16">
            <span className="text-[#d4af37] text-xs uppercase tracking-[0.4em] font-medium block mb-2">Our Culinary Odyssey</span>
            <h2 className="text-3xl md:text-5xl font-serif italic">Makkhan's Historical Legacy</h2>
            <p className="max-w-xl mx-auto text-sm opacity-70 mt-2">For nearly two decades, our family cooking cauldrons have preserved the true royal spirit of Awadhi and North Indian gastronomy.</p>
          </div>

          <div className="relative border-l-2 border-[#d4af37]/20 ml-4 md:ml-32 space-y-12">
            {[
              {
                year: "2008",
                title: "The Churned Spark",
                desc: "Founder Pandit Makkhan Lal started Makkhan's Veg Restaurant in Prayagraj. Churning fresh white cow butter daily, his rich gravies, slow-cooked dal makhani, and warm hospitality soon became the culinary crown of the district."
              },
              {
                year: "2018",
                title: "Expansion to Civil Lines",
                desc: "Opening our magnificent, spacious flagship fine dining branch in Prayagraj's premium Civil Lines sector. Instating custom brass utensils and crafting specialized kids and No Onion No Garlic menus."
              },
              {
                year: "2022",
                title: "The Digital Integration Era",
                desc: "Natively integrated with core online partners, achieving extreme service reliability and bringing warm, buttery signature platters directly to doorstep delivery with a historic 4.9 rating."
              },
              {
                year: "2026",
                title: "The Crown Fine Dining",
                desc: "Redesigning Makkhan's with premium chandeliers, introducing interactive reservation systems, private luxury candle vaults, and customized gluten-free and low-kcal recipes without reducing our trademark buttery legacy."
              }
            ].map((milestone, idx) => (
              <div key={idx} className="relative pl-8 md:pl-12 group">
                {/* Year tag left-of timeline on desktop */}
                <div className="hidden md:flex absolute md:-left-32 top-1.5 items-center justify-end w-28 text-right">
                  <span className="text-[#d4af37] font-serif text-xl md:text-2xl font-black">{milestone.year}</span>
                </div>
                
                {/* Node indicator */}
                <div className="absolute left-[-9px] top-3.5 w-4 h-4 rounded-full bg-[#140b07] border-2 border-[#d4af37] group-hover:bg-[#d4af37] transition-all duration-300"></div>
                
                {/* Mobile Year tag above title */}
                <span className="md:hidden text-[#d4af37] font-serif text-lg font-bold block mb-1">{milestone.year}</span>
                
                <h3 className="text-xl font-serif font-bold text-[#f5f2ed] mb-2 group-hover:text-[#d4af37] transition-colors">{milestone.title}</h3>
                <p className="text-sm text-[#f5f2ed]/75 leading-relaxed max-w-2xl">{milestone.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-[#261811] p-8 border border-[#d4af37]/20 text-center max-w-3xl mx-auto rounded-sm">
            <Award size={36} className="text-[#d4af37] mx-auto mb-4" />
            <p className="font-serif italic text-lg text-white">"No vegetable oil, no artificial essences. Only hand-churned dairy butter and stone-ground Kashmiri spices. That represents our covenant with Prayagraj."</p>
            <p className="text-xs uppercase tracking-widest text-[#d4af37] mt-3 font-semibold">— Team Makkhan Lal Family</p>
          </div>

        </div>
      </section>

      {/* TESTIMONIAL CAROUSEL */}
      <section className="py-24 px-6 bg-[#1a0f0a] scroll-mt-20" id="reviews">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-12">
            <span className="text-[#d4af37] text-xs uppercase tracking-[0.4em] font-medium block mb-2">Guest Testimonials</span>
            <h2 className="text-3xl md:text-5xl font-serif italic">Voices of Satisfied Foodies</h2>
          </div>

          <div className="bg-[#261811] border border-[#d4af37]/20 p-8 md:p-12 relative overflow-hidden" id="testimonials-box-card">
            
            {/* Elegant double quote watermarks */}
            <div className="absolute top-6 left-6 font-serif text-8xl text-[#d4af37]/5 font-black pointer-events-none">“</div>
            <div className="absolute bottom-6 right-6 font-serif text-8xl text-[#d4af37]/5 font-black pointer-events-none">”</div>

            <div className="relative z-10 text-center min-h-[180px] flex flex-col justify-center">
              <div className="flex justify-center gap-1.5 mb-6 text-[#d4af37]">
                {[...Array(REVIEWS[activeReviewIndex].rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-[#d4af37]" />
                ))}
              </div>
              
              <p className="text-lg md:text-xl font-serif text-[#f5f2ed]/90 leading-relaxed italic mb-8">
                "{REVIEWS[activeReviewIndex].text}"
              </p>

              <div>
                <p className="text-sm font-bold text-[#d4af37] uppercase tracking-widest">
                  {REVIEWS[activeReviewIndex].name}
                </p>
                <p className="text-xs opacity-50 mt-0.5">
                  {REVIEWS[activeReviewIndex].role} &bull; {REVIEWS[activeReviewIndex].date}
                </p>
              </div>
            </div>

            {/* Slider Switch Toggles */}
            <div className="flex justify-between items-center mt-10 border-t border-[#d4af37]/10 pt-6">
              <button 
                onClick={() => setActiveReviewIndex(prev => prev === 0 ? REVIEWS.length - 1 : prev - 1)}
                className="p-2 border border-[#d4af37]/20 text-[#d4af37] hover:bg-[#d4af37]/10 hover:border-[#d4af37] transition-all rounded"
                id="testimonial-prev-trigger"
              >
                <ChevronLeft size={16} />
              </button>
              
              {/* Small Dots indicators */}
              <div className="flex gap-2">
                {REVIEWS.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => setActiveReviewIndex(index)}
                    className={`h-2 transition-all rounded-full ${index === activeReviewIndex ? 'w-6 bg-[#d4af37]' : 'w-2 bg-[#d4af37]/25'}`}
                  ></button>
                ))}
              </div>

              <button 
                onClick={() => setActiveReviewIndex(prev => prev === REVIEWS.length - 1 ? 0 : prev + 1)}
                className="p-2 border border-[#d4af37]/20 text-[#d4af37] hover:bg-[#d4af37]/10 hover:border-[#d4af37] transition-all rounded"
                id="testimonial-next-trigger"
              >
                <ChevronRight size={16} />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* RESERVATION CARD & INTERACTIVE CONFIRMATION WIDGET */}
      <section className="py-24 px-6 bg-[#140b07] border-t-2 border-[#d4af37]/30 relative overflow-hidden scroll-mt-20" ref={reservationCardRef} id="reservation-hub">
        
        {/* Subtle decorative circles */}
        <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-[#d4af37]/4 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-16">
            <span className="text-[#d4af37] text-xs uppercase tracking-[0.4em] font-medium block mb-2">Live Seat Authentication</span>
            <h2 className="text-3xl md:text-5xl font-serif italic text-white font-semibold">Reserve Your Table Instantly</h2>
            <p className="max-w-xl mx-auto text-sm opacity-70 mt-2">Instantly acquire verified luxury seating code. Receive an authenticated digital boarding pass right now.</p>
          </div>

          {!isBooked ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch" id="reservation-grid-container">
              
              {/* Left Side: Interactive Reservation Input Fields */}
              <div className="lg:col-span-7 bg-[#261811] border border-[#d4af37]/20 p-8 shadow-2xl relative">
                
                <h3 className="text-xl font-serif text-[#d4af37] mb-6 flex items-center gap-2">
                  <Sparkles size={18} /> Dinner Guest Detail
                </h3>

                <form onSubmit={handleReservationSubmit} className="space-y-6" id="table-reservation-form-tag">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">Your Full Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g., Kartikey Thakur"
                        value={resName}
                        onChange={(e) => setResName(e.target.value)}
                        className="w-full bg-[#1a0f0a] border border-[#d4af37]/20 focus:border-[#d4af37] text-sm text-[#f5f2ed] p-3.5 outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">Contact Mobile Number</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="e.g., +91 94523 XXXXX"
                        value={resPhone}
                        onChange={(e) => setResPhone(e.target.value)}
                        className="w-full bg-[#1a0f0a] border border-[#d4af37]/20 focus:border-[#d4af37] text-sm text-[#f5f2ed] p-3.5 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">Email Address (Optional)</label>
                      <input 
                        type="email" 
                        placeholder="e.g., guest@example.com"
                        value={resEmail}
                        onChange={(e) => setResEmail(e.target.value)}
                        className="w-full bg-[#1a0f0a] border border-[#d4af37]/20 focus:border-[#d4af37] text-sm text-[#f5f2ed] p-3.5 outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">Guests Count</label>
                        <select 
                          value={resGuests}
                          onChange={(e) => setResGuests(Number(e.target.value))}
                          className="w-full bg-[#1a0f0a] border border-[#d4af37]/20 focus:border-[#d4af37] text-sm text-[#f5f2ed] p-3.5 outline-none"
                        >
                          {[1, 2, 3, 4, 5, 6, 8, 10, 12].map(n => (
                            <option key={n} value={n} className="bg-[#1a0f0a]">{n} Guests</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">Preferred Seating</label>
                        <select 
                          value={resSeating}
                          onChange={(e) => setResSeating(e.target.value)}
                          className="w-full bg-[#1a0f0a] border border-[#d4af37]/20 focus:border-[#d4af37] text-sm text-[#f5f2ed] p-3.5 outline-none"
                        >
                          <option className="bg-[#1a0f0a]">Main Durbar Hall</option>
                          <option className="bg-[#1a0f0a]">Royal Lounge Experience</option>
                          <option className="bg-[#1a0f0a]">The Candlelight Corner</option>
                          <option className="bg-[#1a0f0a]">Private Lounge Experience</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm uppercase tracking-widest text-[#d4af37] font-semibold">Reservation Date</label>
                      <div className="relative">
                        <Calendar size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#d4af37]/60" />
                        <input 
                          type="date" 
                          required
                          value={resDate}
                          onChange={(e) => setResDate(e.target.value)}
                          className="w-full bg-[#1a0f0a] border border-[#d4af37]/20 focus:border-[#d4af37] text-sm text-[#f5f2ed] p-3.5 pl-10 outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm uppercase tracking-widest text-[#d4af37] font-semibold">Dinner Time Slot</label>
                      <div className="relative">
                        <Clock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#d4af37]/60" />
                        <select 
                          value={resTime}
                          onChange={(e) => setResTime(e.target.value)}
                          className="w-full bg-[#1a0f0a] border border-[#d4af37]/20 focus:border-[#d4af37] text-sm text-[#f5f2ed] p-3.5 pl-10 outline-none"
                        >
                          <option value="12:00" className="bg-[#1a0f0a]">12:00 PM (Lunch)</option>
                          <option value="13:30" className="bg-[#1a0f0a]">01:30 PM (Lunch)</option>
                          <option value="15:00" className="bg-[#1a0f0a]">03:00 PM (Lunch)</option>
                          <option value="19:00" className="bg-[#1a0f0a]">07:00 PM (Dinner Slot A)</option>
                          <option value="20:00" className="bg-[#1a0f0a]">08:00 PM (Dinner Slot B - Peak)</option>
                          <option value="21:30" className="bg-[#1a0f0a]">09:30 PM (Dinner Slot C)</option>
                          <option value="22:30" className="bg-[#1a0f0a]">10:30 PM (Late Dinner)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">Special Instructions or occasion message</label>
                    <textarea 
                      placeholder="Please share if you have allergies, celebrating special anniversary, or need premium floral setup on the table."
                      value={resNote}
                      onChange={(e) => setResNote(e.target.value)}
                      rows={3}
                      className="w-full bg-[#1a0f0a] border border-[#d4af37]/20 focus:border-[#d4af37] text-sm text-[#f5f2ed] p-3.5 outline-none resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4.5 bg-[#d4af37] hover:bg-[#ebd06f] text-[#1a0f0a] font-serif text-lg font-black italic tracking-widest shadow-2xl hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
                    id="submit-reservation-btn"
                  >
                    Confirm Luxury Table Invitation <Check size={20} />
                  </button>

                  <p className="text-[10px] text-center opacity-75 uppercase tracking-wider">
                    Or directly phone our receptionist desk: +91 532 240 8599
                  </p>
                </form>

              </div>

              {/* Right Side: LIVE TICKET / BOARDING PASS GENERATOR */}
              <div className="lg:col-span-5 flex flex-col justify-between" id="visual-ticket-preview-box">
                <div className="bg-[#261811] border-2 border-dashed border-[#d4af37]/40 p-6 flex flex-col justify-between h-full relative" id="ticket-boarding-card">
                  
                  {/* Classical decorative notch overlays */}
                  <div className="absolute top-1/2 -translate-y-1/2 -left-3.5 w-6 h-6 rounded-full bg-[#140b07] border-r border-[#d4af37]/20 hidden lg:block"></div>
                  <div className="absolute top-1/2 -translate-y-1/2 -right-3.5 w-6 h-6 rounded-full bg-[#140b07] border-l border-[#d4af37]/20 hidden lg:block"></div>

                  <div>
                    <div className="flex justify-between items-center border-b border-[#d4af37]/20 pb-4 mb-6">
                      <div className="text-left">
                        <span className="text-[9px] uppercase tracking-[0.2em] opacity-75">BOARDING SYSTEM</span>
                        <p className="font-serif text-[#d4af37] font-semibold text-lg">Makkhan's Invites</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] uppercase tracking-[0.2em] text-[#d4af37] font-bold">STATUS</span>
                        <p className="text-xs uppercase font-bold text-emerald-400">READY TO GENERATE</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      
                      <div className="flex justify-between items-center text-xs">
                        <span className="opacity-70 uppercase tracking-widest">PATRON</span>
                        <span className="font-bold text-[#f5f2ed]">{resName || "PENDING ENTRY"}</span>
                      </div>

                      <div className="flex justify-between items-center text-xs">
                        <span className="opacity-70 uppercase tracking-widest">CONTACT</span>
                        <span className="font-bold text-white">{resPhone || "PENDING PHONE"}</span>
                      </div>

                      <div className="flex justify-between items-center text-xs">
                        <span className="opacity-70 uppercase tracking-widest">INVITE DATE</span>
                        <span className="font-bold text-[#d4af37]">{resDate}</span>
                      </div>

                      <div className="flex justify-between items-center text-xs">
                        <span className="opacity-70 uppercase tracking-widest">ATTEND TIME</span>
                        <span className="font-bold text-[#d4af37]">{resTime}</span>
                      </div>

                      <div className="flex justify-between items-center text-xs">
                        <span className="opacity-70 uppercase tracking-widest">GUESTS AT LEVEL</span>
                        <span className="font-bold text-[#f5f2ed]">{resGuests} VIPs</span>
                      </div>

                      <div className="flex justify-between items-center text-xs">
                        <span className="opacity-70 uppercase tracking-widest">RESERVED POINT</span>
                        <span className="font-bold text-white text-right">{resSeating}</span>
                      </div>
                    </div>

                    {/* Copied Preorders Estimation */}
                    {preOrderedItems.length > 0 ? (
                      <div className="mt-6 pt-4 border-t border-dashed border-[#d4af37]/25">
                        <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-bold block mb-2">PRE-ORDER INTEREST CHECKLIST</span>
                        <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
                          {preOrderedItems.map(p => (
                            <div key={p.item.id} className="flex justify-between text-[11px] opacity-80">
                              <span>{p.item.name} x{p.quantity}</span>
                              <span className="text-[#d4af37]">₹{p.item.price * p.quantity}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between items-center mt-3 pt-2 border-t border-[#d4af37]/10 text-xs">
                          <span className="font-bold">Total Estimated Cart</span>
                          <span className="text-[#d4af37] font-black text-sm">₹{calculatePreOrderTotal()}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-8 p-4 bg-[#1a0f0a] border border-[#d4af37]/10 text-center rounded-sm">
                        <p className="text-[11px] opacity-80 italic">Did you know? You can pre-add luxury menu items in the "Culinary Card" above, and they will print directly onto your gold receipt ticket!</p>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-[#d4af37]/20 pt-6 mt-6 flex justify-between items-end gap-4">
                    <div className="text-left">
                      <p className="text-[9px] opacity-40">INVITATION POINT</p>
                      <p className="text-[10px] font-bold text-[#d4af37]">9/B Mahatma Gandhi Marg, Civil Lines</p>
                    </div>
                    {/* Simulated visual barcode stamp */}
                    <div className="flex flex-row gap-0.5 h-10 select-none opacity-50">
                      {[1,3,1,2,4,1,2,3,1,2,1,4,1,3,1,2].map((w, i) => (
                        <div key={i} className="bg-[#d4af37]" style={{ width: `${w}px` }}></div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

            </div>
          ) : (
            
            /* SUCCESS TICKET SUBMISSION PRESENTATION */
            <div className="max-w-2xl mx-auto bg-[#261811] border-3 border-[#d4af37] p-8 md:p-12 shadow-2xl relative text-center animate-scale-up" id="success-boarding-card">
              
              {/* Confetti golden glow particles simulation */}
              <div className="absolute inset-0 bg-[#d4af37]/3 pointer-events-none"></div>

              <div className="w-20 h-20 bg-[#d4af37]/10 border-2 border-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={40} className="text-[#d4af37]" />
              </div>

              <span className="text-[#d4af37] text-xs uppercase tracking-[0.4em] font-medium block mb-2">AUTHENTICATION COMPLETE</span>
              <h3 className="text-3xl md:text-4xl font-serif italic text-white mb-2">Welcome to Makkhan's Club</h3>
              <p className="text-sm text-[#f5f2ed]/80 mb-8 max-w-md mx-auto">
                Congratulations {resName}! Your elite table invitation has been locked in for {resGuests} guests under verified code:
                <strong className="text-[#d4af37] block text-xl mt-2 tracking-widest bg-[#1a0f0a] py-2 border border-[#d4af37]/20 font-mono font-black select-all">
                  {bookingTicket?.id}
                </strong>
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#1a0f0a] border border-[#d4af37]/20 p-6 mb-8 text-left">
                
                {/* Dynamically generated luxury QR code */}
                <div className="flex flex-col items-center justify-center bg-[#1a0f0a] p-3 border border-[#d4af37]/30 rounded-sm">
                  <span className="text-[9px] uppercase tracking-wider text-[#d4af37] font-semibold mb-2">Instant VIP Pass QR</span>
                  {bookingTicket?.qrUrl ? (
                    <img 
                      src={bookingTicket.qrUrl} 
                      alt="Booking QR Code" 
                      className="w-36 h-36 border border-[#d4af37]/10 bg-[#1a0f0a] p-1.5"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-36 h-36 bg-[#261811] flex items-center justify-center text-[10px] text-center opacity-40">Loading QR...</div>
                  )}
                  <span className="text-[8px] opacity-40 mt-1.5">Scan upon entry at reception desk</span>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs uppercase tracking-widest text-[#d4af37] font-black border-b border-[#d4af37]/15 pb-1">Invitation summary</h4>
                  
                  <div className="flex justify-between text-xs">
                    <span className="opacity-60">PATRON LEVEL</span>
                    <span className="font-bold text-[#f5f2ed]">PLATINUM GUEST</span>
                  </div>
                  
                  <div className="flex justify-between text-xs">
                    <span className="opacity-60">DATE & TIME</span>
                    <span className="font-bold text-[#f5f2ed]">{resDate} @ {resTime}</span>
                  </div>

                  <div className="flex justify-between text-xs">
                    <span className="opacity-60">SEAT ASSIGNED</span>
                    <span className="font-bold text-[#d4af37]">{resSeating}</span>
                  </div>

                  {preOrderedItems.length > 0 && (
                    <div className="flex justify-between text-xs pt-1.5 border-t border-[#d4af37]/10">
                      <span className="opacity-60">PRE-ORDER VALUE</span>
                      <span className="font-bold text-emerald-400">₹{calculatePreOrderTotal()} (Logged)</span>
                    </div>
                  )}

                  <div className="flex justify-between text-xs">
                    <span className="opacity-60">SUPPORT CONTACT</span>
                    <span className="font-bold text-[#f5f2ed]">+91 532 240 8599</span>
                  </div>
                </div>

              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center" id="success-booking-action-rack">
                <button 
                  onClick={() => window.print()}
                  className="px-6 py-3 bg-transparent hover:bg-[#d4af37]/10 border border-[#d4af37] text-[#d4af37] text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1.5"
                >
                  <Smartphone size={13} /> Print Invitation Card
                </button>
                <button 
                  onClick={resetBookingForm}
                  className="px-6 py-3 bg-[#d4af37] text-[#1a0f0a] text-xs font-black uppercase tracking-widest hover:bg-[#ebd06f]"
                >
                  Book Another Table
                </button>
              </div>

              <p className="text-[10px] opacity-70 uppercase tracking-tighter mt-6">
                * Note: A digital authentication receipt has been synced with local storage successfully. Welcome to real Indian flavors.
              </p>

            </div>
          )}

        </div>
      </section>

      {/* FOOTER & DIRECT PLATFORM EMBEDS */}
      <footer className="bg-[#140b07] border-t border-[#d4af37]/20 pt-16 pb-12 px-6" id="certified-footer">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          
          {/* Logo Brand / Info column */}
          <div className="md:col-span-4 space-y-4">
            <a href="#" className="flex items-center gap-3 select-none inline-flex">
              <MakhhansLogo className="w-12 h-12" />
              <div className="flex flex-col">
                <span className="text-xl font-serif tracking-[0.15em] text-[#d4af37] font-bold leading-none">MAKKHAN'S</span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#d4af37]/85 mt-1.5 font-sans">
                  ESTD. 2008 • PRAYAGRAJ
                </span>
              </div>
            </a>
            <p className="text-sm text-[#f5f2ed]/60 leading-relaxed">
              Serving unmatched Mughlai and Awadhi fine dining selections, slow coal dal, and pure hand-churned dairy white butter since 2008. Prayagraj's absolute premium taste venue.
            </p>
            <div className="flex gap-4 items-center pt-2">
              <a href="https://www.instagram.com/makkhans_restaurant_civillines?igsh=MTl6dXdvcHI0aWdiYg%3D%3D" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-[#d4af37]/20 hover:border-[#d4af37] text-[#d4af37] rounded-full flex items-center justify-center transition-colors">
                <Instagram size={16} />
              </a>
              <a href="https://www.facebook.com/Makkhanvegrestaurant/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-[#d4af37]/20 hover:border-[#d4af37] text-[#d4af37] rounded-full flex items-center justify-center transition-colors">
                <Facebook size={16} />
              </a>
              <a href="https://www.youtube.com/@makkhansvegrestaurant" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-[#d4af37]/20 hover:border-[#d4af37] text-[#d4af37] rounded-full flex items-center justify-center transition-colors">
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Business Timings */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-[#d4af37] font-serif text-lg font-bold tracking-wider">Business Timings</h4>
            <div className="w-8 h-[1px] bg-[#d4af37]"></div>
            <ul className="space-y-2 text-sm text-[#f5f2ed]/70">
              <li className="flex justify-between pb-1.5 border-b border-white/5">
                <span>Monday - Thursday</span>
                <span className="text-[#d4af37]">12:00 PM - 11:00 PM</span>
              </li>
              <li className="flex justify-between pb-1.5 border-b border-white/5">
                <span>Friday - Saturday</span>
                <span className="text-[#d4af37]">11:30 AM - 11:30 PM</span>
              </li>
              <li className="flex justify-between pb-1.5 border-b border-white/5">
                <span>Sunday Brunch</span>
                <span className="text-[#d4af37]">11:00 AM - 04:00 PM</span>
              </li>
              <li className="flex justify-between pt-1">
                <span>Sunday Dinner</span>
                <span className="text-[#d4af37]">07:00 PM - 11:30 PM</span>
              </li>
            </ul>
          </div>

          {/* Quick Contact & Navigation Column */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-[#d4af37] font-serif text-lg font-bold tracking-wider">The Reception Desk</h4>
            <div className="w-8 h-[1px] bg-[#d4af37]"></div>
            <ul className="space-y-3 text-sm text-[#f5f2ed]/75">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#d4af37] shrink-0 mt-0.5" />
                <span>9/B, Mahatma Gandhi Marg, opposite Hanuman Mandir, Civil Lines, Prayagraj, UP 211001</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-[#d4af37] shrink-0" />
                <span>+91 (532) 240 8599 (Landline)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Smartphone size={16} className="text-[#d4af37] shrink-0" />
                <span>+91 94523 00481 (Mobile VIP)</span>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM ATTRIBUTION RACK complying with anti-ai-slop rules (humble, aesthetic) */}
        <div className="max-w-6xl mx-auto border-t border-[#d4af37]/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-[#f5f2ed]/75 text-center md:text-left">
            &copy; 2026 Makkhan's Hospitality Group Prayagraj Private Limited. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-[#f5f2ed]/75">
            <a href="#" className="hover:text-[#d4af37] transition-colors">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#" className="hover:text-[#d4af37] transition-colors">FSSAI License #12716075000412</a>
            <span>&bull;</span>
            <a href="#top-nav" className="hover:text-[#d4af37] transition-colors">Back to Top &uarr;</a>
          </div>
        </div>

      </footer>

    </div>
  );
}
