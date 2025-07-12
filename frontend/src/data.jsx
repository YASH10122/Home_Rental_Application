import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import {
  FaSkiing,
  FaPumpSoap,
  FaShower,
  FaFireExtinguisher,
  FaUmbrellaBeach,
  FaKey,
} from "react-icons/fa";
import { FaHouseUser, FaPeopleRoof, FaKitchenSet } from "react-icons/fa6";
import {
  BiSolidWasher,
  BiSolidDryer,
  BiSolidFirstAid,
  BiWifi,
  BiSolidFridge,
  BiWorld,
} from "react-icons/bi";
import { BsSnow, BsFillDoorOpenFill, BsPersonWorkspace } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla, MdMicrowave, MdBalcony, MdYard, MdPets } from "react-icons/md";
import {
  PiBathtubFill,
  PiCoatHangerFill,
  PiTelevisionFill,
} from "react-icons/pi";
import { TbIroning3 } from "react-icons/tb";
import {
  GiHeatHaze,
  GiCctvCamera,
  GiBarbecue,
  GiToaster,
  GiCampfire,
} from "react-icons/gi";
import { AiFillCar } from "react-icons/ai";

export const categories = [
  {
    label: "All",
    icon: <BiWorld />,
  },
  {
    img: "assets/beach_cat.jpg",
    label: "Beachs",
    icon: <TbBeach />,
    description: "This property is close to the beach!",
  },
  // {
  //   img: "assets/windmill_cat.webp",
  //   label: "Windmills",
  //   icon: <GiWindmill />,
  //   description: "This property is has windmills!",
  // },
  // {
  //   img: "assets/modern_cat.webp",
  //   label: "Iconic cities",
  //   icon: <MdOutlineVilla />,
  //   description: "This property is modern!",
  // },
  {
    img: "assets/countryside_cat.webp",
    label: "Mountain",
    icon: <TbMountain />,
    description: "This property is in the countryside!",
  },
  {
    img: "assets/pool_cat.jpg",
    label: "Swimming Pools",
    icon: <TbPool />,
    description: "This is property has a beautiful pool!",
  },
  {
    img: "assets/island_cat.webp",
    label: "Islands",
    icon: <GiIsland />,
    description: "This property is on an island!",
  },
  // {
  //   img: "assets/lake_cat.webp",
  //   label: "Lakefront",
  //   icon: <GiBoatFishing />,
  //   description: "This property is near a lake!",
  // },
  // {
  //   img: "assets/skiing_cat.jpg",
  //   label: "Ski-in/out",
  //   icon: <FaSkiing />,
  //   description: "This property has skiing activies!",
  // },
  // {
  //   img: "assets/castle_cat.webp",
  //   label: "Castles",
  //   icon: <GiCastle />,
  //   description: "This property is an ancient castle!",
  // },
  {
    img: "assets/cave_cat.jpg",
    label: "Caves",
    icon: <GiCaveEntrance />,
    description: "This property is in a spooky cave!",
  },
  // {
  //   img: "assets/camping_cat.jpg",
  //   label: "Camping",
  //   icon: <GiForestCamp />,
  //   description: "This property offers camping activities!",
  // },
  {
    img: "assets/arctic_cat.webp",
    label: "Ice",
    icon: <BsSnow />,
    description: "This property is in arctic environment!",
  },
  {
    img: "assets/desert_cat.webp",
    label: "Desert",
    icon: <GiCactus />,
    description: "This property is in the desert!",
  },
  // {
  //   img: "assets/barn_cat.jpg",
  //   label: "Barns",
  //   icon: <GiBarn />,
  //   description: "This property is in a barn!",
  // },
  // {
  //   img: "assets/lux_cat.jpg",
  //   label: "Luxury",
  //   icon: <IoDiamond />,
  //   description: "This property is brand new and luxurious!",
  // },
];

export const types = [
  {
    name: "An entire place",
    description: "Guests have the whole place to themselves",
    icon: <FaHouseUser />,
  },
  {
    name: "Room(s)",
    description:
      "Guests have their own room in a house, plus access to shared places",
    icon: <BsFillDoorOpenFill />,
  },
  {
    name: "A Shared Room",
    description:
      "Guests sleep in a room or common area that maybe shared with you or others",
    icon: <FaPeopleRoof />,
  },
];

export const facilities = [
  {
    name: "Bath tub",
    icon: <PiBathtubFill />,
  },
  
  {
    name: "shower",
    icon: <FaShower />,
  },

  {
    name: "TV",
    icon: <PiTelevisionFill />,
  },
  
  {
    name: "AC",
    icon: <BsSnow />,
  },
 
  {
    name: "cameras",
    icon: <GiCctvCamera />,
  },
  {
    name: "Fire sefty",
    icon: <FaFireExtinguisher />,
  },
  {
    name: "First Aid",
    icon: <BiSolidFirstAid />,
  },
  {
    name: "Wifi",
    icon: <BiWifi />,
  },
  
  {
    name: "Refrigerator",
    icon: <BiSolidFridge />,
  },
  
  
  
  
  
 
  {
    name: "Garden",
    icon: <MdYard />,
  },
  {
    name: "parking",
    icon: <AiFillCar />,
  },
  {
    name: "Safty",
    icon: <FaKey />
  },
  
];