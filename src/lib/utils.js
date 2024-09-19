import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const provincesOptions = [
  "Any",
  "Limpopo",
  "Gauteng",
  "Mpumalanga",
  "North West",
  "Western Cape",
  "Northern Cape",
  "Eastern Cape",
  "KwaZulu-Natal",
  "Free State",
];

export const citiesOptions = {
  Limpopo: [
    "Any",
    "Polokwane",
    "Tzaneen",
    "Mokopane",
    "Thohoyandou",
    "Louis Trichardt",
    "Phalaborwa",
    "Lebowakgomo",
    "Burgersfort",
    "Modimolle",
    "Giyani",
  ],
  Gauteng: [
    "Any",
    "Johannesburg",
    "Pretoria",
    "Soweto",
    "Kempton Park",
    "Centurion",
    "Randburg",
    "Midrand",
    "Vereeniging",
    "Boksburg",
    "Benoni",
  ],
  Mpumalanga: [
    "Any",
    "Nelspruit",
    "Witbank",
    "Middelburg",
    "Secunda",
    "Ermelo",
    "Standerton",
    "Lydenburg",
    "Delmas",
    "Barberton",
    "Komatipoort",
  ],
  "North West": [
    "Any",
    "Rustenburg",
    "Mahikeng",
    "Potchefstroom",
    "Klerksdorp",
    "Brits",
    "Orkney",
    "Mabopane",
    "Stilfontein",
    "Hartbeespoort",
    "Vryburg",
  ],
  "Western Cape": [
    "Any",
    "Cape Town",
    "Stellenbosch",
    "George",
    "Paarl",
    "Worcester",
    "Mossel Bay",
    "Oudtshoorn",
    "Knysna",
    "Beaufort West",
    "Saldanha",
  ],
  "Northern Cape": [
    "Any",
    "Kimberley",
    "Upington",
    "Springbok",
    "De Aar",
    "Kuruman",
    "Kathu",
    "Warrenton",
    "Prieska",
    "Colesberg",
    "Postmasburg",
  ],
  "Eastern Cape": [
    "Any",
    "Port Elizabeth",
    "East London",
    "Uitenhage",
    "Grahamstown",
    "Mthatha",
    "Queenstown",
    "King William's Town",
    "Cradock",
    "Port Alfred",
    "Aliwal North",
  ],
  "KwaZulu-Natal": [
    "Any",
    "Durban",
    "Pietermaritzburg",
    "Newcastle",
    "Richards Bay",
    "Ladysmith",
    "Empangeni",
    "Kokstad",
    "Ulundi",
    "Vryheid",
    "Estcourt",
  ],
  "Free State": [
    "Any",
    "Bloemfontein",
    "Welkom",
    "Botshabelo",
    "Virginia",
    "Kroonstad",
    "Sasolburg",
    "Parys",
    "Bethlehem",
    "Phuthaditjhaba",
    "Harrismith",
  ],
};

export const priceOptions = [
  "100000",
  "150000",
  "200000",
  "250000",
  "300000",
  "350000",
  "400000",
  "450000",
  "500000",
  "600000",
  "700000",
  "800000",
  "900000",

  "1000000",
  "2000000",
  "3000000",
  "4000000",
  "5000000",
  "6000000",
  "7000000",
  "8000000",
  "9000000",
  "10000000",
  "Any",
];

export const listings = [
  {
    cover_img:
      "https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?cs=srgb&dl=pexels-falling4utah-1080696.jpg&fm=jpg&w=1280&h=1920",
    id: 1,
    title: "Modern Townhouse",
    description: "Stylish 3-bedroom townhouse with rooftop terrace.",
    city: "Seattle",
    province: "WA",
    price: 750000,
    type: "Townhouse",

    bedrooms: 3,
    bathrooms: 2,
    garage: true,
    swimmingPool: false,
    garden: false,

    amenities: {
      view: "City view",
      security: "Gated community",
      parking: "Attached garage",
      extras: ["Balcony", "Walk-in closet"],
    },
  },
  // 2
  {
    cover_img:
      "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?cs=srgb&dl=pexels-houzlook-3797991.jpg&fm=jpg&w=1280&h=960",
    id: 2,
    title: "Luxury Apartment",
    description: "Spacious 2-bedroom apartment in a high-rise building.",
    city: "New York City",
    province: "NY",
    price: 1200000,
    type: "Apartment",

    bedrooms: 2,
    bathrooms: 2,
    garage: false,
    swimmingPool: true,
    garden: false,

    amenities: {
      view: "Skyline view",
      security: "Doorman",
      parking: "Valet parking",
      extras: ["Fitness center", "Concierge service"],
    },
  },
  // 3
  {
    cover_img:
      "https://images.pexels.com/photos/4906249/pexels-photo-4906249.jpeg?cs=srgb&dl=pexels-orlovamaria-4906249.jpg&fm=jpg&w=1280&h=1920",
    id: 3,
    title: "Cozy House",
    description: "Charming 2-bedroom house with a fenced backyard.",
    city: "Denver",
    province: "CO",
    price: 450000,
    type: "House",

    bedrooms: 2,
    bathrooms: 1,
    garage: true,
    swimmingPool: false,
    garden: true,

    amenities: {
      view: "Mountain view",
      security: "Alarm system",
      parking: "Driveway",
      extras: ["Patio", "Firepit"],
    },
  },
  // 4
  {
    cover_img:
      "https://images.pexels.com/photos/20442908/pexels-photo-20442908.jpeg?cs=srgb&dl=pexels-sarah-o-shea-98049248-20442908.jpg&fm=jpg&w=1280&h=1707",
    id: 4,
    title: "Contemporary Duplex",
    description: "Modern duplex with separate entrances for each unit.",
    city: "San Francisco",
    province: "CA",
    price: 1800000,
    type: "Duplex",

    bedrooms: 4,
    bathrooms: 3,
    garage: true,
    swimmingPool: false,
    garden: false,

    amenities: {
      view: "City view",
      security: "Keyless entry",
      parking: "Garage",
      extras: ["Roof deck", "Smart home features"],
    },
  },
  // 5
  {
    cover_img:
      "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?cs=srgb&dl=pexels-thgusstavo-2102587.jpg&fm=jpg&w=1280&h=1706",
    id: 5,
    title: "Historic Brownstone",
    description: "4-story brownstone with original architectural details.",
    city: "Boston",
    province: "MA",
    price: 2500000,
    type: "Brownstone",

    bedrooms: 5,
    bathrooms: 4,
    garage: false,
    swimmingPool: false,
    garden: true,

    amenities: {
      view: "Park view",
      security: "Video surveillance",
      parking: "Street parking",
      extras: ["Fireplace", "Crown molding"],
    },
  },
  // 6
  {
    cover_img:
      "https://images.pexels.com/photos/533157/pexels-photo-533157.jpeg?cs=srgb&dl=pexels-pixabay-533157.jpg&fm=jpg&w=1280&h=1920",
    id: 6,
    title: "Beachfront Condo",
    description: "1-bedroom condo with ocean views and resort amenities.",
    city: "Miami",
    province: "FL",
    price: 650000,
    type: "Condo",

    bedrooms: 1,
    bathrooms: 1,
    garage: false,
    swimmingPool: true,
    garden: false,

    amenities: {
      view: "Ocean view",
      security: "Guarded entrance",
      parking: "Assigned parking",
      extras: ["Beach access", "Fitness center"],
    },
  },
  // 7
  {
    cover_img:
      "https://images.pexels.com/photos/6073452/pexels-photo-6073452.jpeg?cs=srgb&dl=pexels-eva-bronzini-6073452.jpg&fm=jpg&w=1280&h=1920",
    id: 8,
    title: "Urban Loft",
    description: "Open-concept loft in a converted warehouse.",
    city: "Los Angeles",
    province: "CA",
    price: 900000,
    type: "Loft",

    bedrooms: 1,
    bathrooms: 1,
    garage: false,
    swimmingPool: false,
    garden: false,

    amenities: {
      view: "City skyline",
      security: "Secure entry",
      parking: "Street parking",
      extras: ["Exposed brick", "High ceilings"],
    },
  },
  {
    cover_img:
      "https://images.pexels.com/photos/7245104/pexels-photo-7245104.jpeg?cs=srgb&dl=pexels-olgalioncat-7245104.jpg&fm=jpg&w=1280&h=1931",
    id: 9,
    title: "Mountain Retreat",
    description: "Rustic 5-bedroom cabin nestled in the Rockies.",
    city: "Aspen",
    province: "CO",
    price: 3000000,
    type: "Cabin",

    bedrooms: 5,
    bathrooms: 4,
    garage: true,
    swimmingPool: false,
    garden: true,

    amenities: {
      view: "Mountain view",
      security: "Remote location",
      parking: "Driveway",
      extras: ["Hot tub", "Fireplace"],
    },
  },
  {
    cover_img:
      "https://images.pexels.com/photos/6850296/pexels-photo-6850296.jpeg?cs=srgb&dl=pexels-matt-barnard-21952098-6850296.jpg&fm=jpg&w=1280&h=1952",
    id: 10,
    title: "Waterfront Villa",
    description: "6-bedroom villa with private beach access and infinity pool.",
    city: "Honolulu",
    province: "HI",
    price: 6500000,
    type: "Villa",

    bedrooms: 6,
    bathrooms: 5,
    garage: true,
    swimmingPool: true,
    garden: false,

    amenities: {
      view: "Oceanfront",
      security: "Gated community",
      parking: "Garage",
      extras: ["Spa", "Outdoor kitchen"],
    },
  },
];

export const formattedNumber = (value) =>
  parseFloat(value).toLocaleString().replace(/,/g, " ");

export const greeting = () => {
  const now = new Date();
  const hour = now.getHours();

  if (hour < 12) {
    return "Good Morning,";
  } else if (hour < 17) {
    return "Good Afternoon, ";
  } else {
    return "Good Evening, ";
  }
};
