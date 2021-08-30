/*
*   This file is part of Sim2Editor-CPPCore
*   Copyright (C) 2020-2021 Sim2Team
*
*   This program is free software: you can redistribute it and/or modify
*   it under the terms of the GNU General Public License as published by
*   the Free Software Foundation, either version 3 of the License, or
*   (at your option) any later version.
*
*   This program is distributed in the hope that it will be useful,
*   but WITHOUT ANY WARRANTY; without even the implied warranty of
*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*   GNU General Public License for more details.
*
*   You should have received a copy of the GNU General Public License
*   along with this program.  If not, see <http://www.gnu.org/licenses/>.
*
*   Additional Terms 7.b and 7.c of GPLv3 apply to this file:
*       * Requiring preservation of specified reasonable legal notices or
*         author attributions in that material or in the Appropriate Legal
*         Notices displayed by works containing it.
*       * Prohibiting misrepresentation of the origin of that material,
*         or requiring that modified versions of such material be marked in
*         reasonable ways as different from the original version.
*/

#include "Strings.hpp"

namespace S2Editor {
	const std::vector<std::string> Strings::GBAItemNames_EN = {
		"??? (Crash)",
		"Asteroid",
		"Balloons",
		"Crystal",
		"Cat Clock",
		"Chug Chug Cola Poster",
		"Bigfoot Print",
		"Friendly Fish Tank",
		"Hearts",
		"Intimidating Flame",
		"Intimidating Suit of Armor (Green)",
		"Intimidating Suit of Armor (Blue)",
		"Intimidating Suit of Armor (Orange)",
		"Intimidating Suit of Armor (Pink)",
		"Intimidating Suit of Armor (Red)",
		"Glowing Green Lamp",
		"Lava Lamp",
		"Black and White Lamp",
		"Mystery Hanging",
		"Romantic Fountain",
		"Romantic Giant Teddy Bear (Green)",
		"Romantic Giant Teddy Bear (Blue)",
		"Romantic Giant Teddy Bear (Orange)",
		"Romantic Giant Teddy Bear (Pink)",
		"Romantic Giant Teddy Bear (Red)",
		"Sarcophagus",
		"Real Shark Jaws",
		"Stuffed Penguin",
		"UFO model",
		"Yeti Doll",
		"???",
		"???",
		"Stereo (Green)",
		"Stereo (Blue)",
		"Stereo (Orange)",
		"Stereo (Pink)",
		"Stereo (Red)",
		"???",
		"Television",
		"Shabby Bed (Green)",
		"Shabby Bed (Blue)",
		"Shabby Bed (Orange)",
		"Shabby Bed (Pink)",
		"Shabby Bed (Red)",
		"Luxury Bed (Green)",
		"Luxury Bed (Blue)",
		"Luxury Bed (Orange)",
		"Luxury Bed (Pink)",
		"Luxury Bed (Red)",
		"Shabby Chair (Green)",
		"Shabby Chair (Blue)",
		"Shabby Chair (Orange)",
		"Shabby Chair (Pink)",
		"Shabby Chair (Red)",
		"Luxury Chair (Green)",
		"Luxury Chair (Blue)",
		"Luxury Chair (Orange)",
		"Luxury Chair (Pink)",
		"Luxury Chair (Red)",
		"Rib Cage Chair",
		"Shabby Couch (Green)",
		"Shabby Couch (Blue)",
		"Shabby Couch (Orange)",
		"Shabby Couch (Pink)",
		"Shabby Couch (Red)",
		"Luxury Couch (Green)",
		"Luxury Couch (Blue)",
		"Luxury Couch (Orange)",
		"Luxury Couch (Pink)",
		"Luxury Couch (Red)",
		"Kitchen Counter (Green)",
		"Kitchen Counter (Blue)",
		"Kitchen Counter (Orange)",
		"Kitchen Counter (Pink)",
		"Kitchen Counter (Red)",
		"??? (Crash)",
		"Treasure Chest",
		"Mailbox", // Contains the same functionality, as the Mailbox outside your House.
		"Luxury Refrigerator (Green)",
		"Luxury Refrigerator (Blue)",
		"Luxury Refrigerator (Orange)",
		"Luxury Refrigerator (Pink)",
		"Luxury Refrigerator (Red)",
		"Mini Refrigerator (Green)",
		"Mini Refrigerator (Blue)",
		"Mini Refrigerator (Orange)",
		"Mini Refrigerator (Pink)",
		"Mini Refrigerator (Red)",
		"Shabby Shower (Green)",
		"Shabby Shower (Blue)",
		"Shabby Shower (Orange)",
		"Shabby Shower (Pink)",
		"Shabby Shower (Red)",
		"Luxury Shower (Green)",
		"Luxury Shower (Blue)",
		"Luxury Shower (Orange)",
		"Luxury Shower (Pink)",
		"Luxury Shower (Red)",
		"Bathroom Sink",
		"Kitchen Sink (Green)",
		"Kitchen Sink (Blue)",
		"Kitchen Sink (Orange)",
		"Kitchen Sink (Pink)",
		"Kitchen Sink (Red)",
		"Standard Stove (Green)",
		"Standard Stove (Blue)",
		"Standard Stove (Orange)",
		"Standard Stove (Pink)",
		"Standard Stove (Red)",
		"Basic Toilet",
		"Alien Disguise Device",
		"???",
		"???",
		"???",
		"???",
		"???",
		"???",
		"Golden Chair",
		"???",
		"???",
		"Cake",
		"Gold Medal",
		"Egyptian Funerary Urn",
		"Hematite Misty Waters",
		"Chaz Dastard Insignia",
		"???",
		"Milk Crate",
		"Robot's Arm and Torso",
		"Robot's Left Arm",
		"Robot's Left Leg",
		"Robot's Leg and Torso",
		"Robot's Head",
		"Dangerous Parfume",
		"???",
		"???",
		"Pizza Box",
		"Jar of Plutonium",
		"???",
		"Robot Head",
		"Scrap Iron",
		"Telescope",
		"???",
		"Treasure Chest",
		"Video Camera",
		"Arrest Warrant",
		"Misty's BlueBerry",
		"Bug Spray",
		"Artificial Bouquet",
		"Bottle of Water",
		"Briefcase",
		"Cactus Fruit",
		"Cactus Spine",
		"Camera",
		"Bike Parts",
		"Dam Drain Plug",
		"Desert Beetle",
		"Dinosaur Leg Bone",
		"Dinosaur Rib Bone",
		"Dinosaur Skull Bone",
		"Dinosaur Spine Bone",
		"Dinosaur Tail Bone",
		"Heavy Work Gloves",
		"Green Cloth",
		"Bottle of Green Goo",
		"Robotic Hand",
		"Invitation",
		"Jar of Color",
		"Jump Ramp",
		"Bottle of Expired Makeup",
		"Bag of Manure",
		"Sheet of Parchment",
		"Unfinished Map",
		"Map of Canyonero Grande",
		"Megalodon Jawbone",
		"Microfiche",
		"Chaz Dastard DVDs",
		"Chocolates",
		"Box of Cockroaches",
		"Comic Books",
		"Dead Fish",
		"Funny Shirt",
		"Gold Ring",
		"Heart-shaped Pillow",
		"Mix CD",
		"Moldy Pie",
		"Pizza",
		"Red Roses",
		"Rotten Eggs",
		"Teddy Bear",
		"Wilted Flowers",
		"Movie Script",
		"Note",
		"Letter",
		"Paddleball",
		"???",
		"Penguin Invoice",
		"Petition",
		"Photo Album",
		"Pinwheel",
		"Note",
		"Pillows",
		"Ray Gun",
		"Pile of Receipts",
		"Rubber Waders",
		"Sancho's Note",
		"Packet of Seeds",
		"Shark",
		"Moisturizing Skin Cream",
		"Smoke Bomb",
		"Radiation Squeegee",
		"SPF 27000 Sunblock",
		"Thorium",
		"Vacuum Tube",
		"Cheeze Pizza",
		"Chicken Soup",
		"Hamburger",
		"Hotdog",
		"Turkey Leg",
		"Iced Tea",
		"Cherry Soda",
		"Root Beer",
		"Skill Book: Confidence",
		"Skill Book: Mechanical",
		"Skill Book: Strength",
		"Skill Book: Personality",
		"Skill Book: Hotness",
		"Skill Book: Intellect",
		"??? (Crash)",
		"??? (Crash)",
		"??? (Crash)",
		"Empty",
		"??? (Crash)",
		"??? (Crash)",
		"??? (Crash)",
		"??? (Crash)",
		"??? (Crash)",
		"??? (Crash)",
		"??? (Crash)",
		"??? (Crash)",
		"??? (Crash)",
		"??? (Crash)",
		"??? (Crash)",
		"??? (Crash)",
		"??? (Crash)",
		"??? (Crash)",
		"??? (Crash)",
		"??? (Crash)",
		"??? (Crash)",
		"??? (Crash)",
		"??? (Crash)",
		"??? (Crash)",
		"??? (Crash)",
		"??? (Crash)",
		"??? (Crash)",
		"??? (Crash)",
		"??? (Crash)"
	};
};