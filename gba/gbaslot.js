/*
*   This file is part of Sim2Editor-JSCore
*   Copyright (C) 2020-2021 SuperSaiyajinStackZ, Universal-Team
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

import { Checksum_Calc } from '../shared/checksum.js';
import { SAVUtils_Read, SAVUtils_ReadBits, SAVUtils_Write, SAVUtils_WriteBits, SAVUtils_ReadString, SAVUtils_WriteString, SAVData } from '../shared/savutils.js';

/* Import Core "sub" classes. */
import { S2Editor_GBACast } from './gbacast.js';
import { S2Editor_GBAEpisode } from './gbaepisode.js';
import { S2Editor_GBAHouse } from './gbahouse.js';
import { S2Editor_GBAItem } from './gbaitem.js';
import { S2Editor_GBASocialMove } from './gbasocialmove.js';

/* Valid Episode Values. */
const EPVals = [
	0x0, 0x1, 0x3, 0x7, // Tutorial + Season 1.
	0x6, 0xA, 0x8, 0xF, // Season 2.
	0xD, 0x5, 0x16, 0x15 // Season 3.
];

export class S2Editor_GBASlot {
	constructor(Slot) {
		this.Offs = (Slot * 0x1000);
		this.Slot = Slot;
	};

	/*
		The House Item Amount seems to affect some stuff and move things around for 0x6 per Item.
		So, we get the Item Count of the House from the 0xD6'th Byte from the GBASlot.

		DefaultOffs: The Default Offset, for things without an Item in your house.
	*/
	Offset(DefaultOffs) {
		return this.Offs + DefaultOffs + (SAVUtils_Read("uint8_t", (this.Offs + 0xD6)) * 0x6);
	};

	/* Get and Set Time. */
	Time(V) {
		if (V) SAVUtils_Write("uint16_t", this.Offs + 0x2, V);
		else return SAVUtils_Read("uint16_t", this.Offs + 0x2); // Hour + Minute.
	};

	/* Get and Set Simoleons. */
	Simoleons(V) {
		if (V) SAVUtils_Write("uint32_t", this.Offs + 0x5, (Math.min(999999, V) << 8));
		else return SAVUtils_Read("uint32_t", this.Offs + 0x5) >> 8;
	};

	/* Get and Set Ratings. */
	Ratings(V) {
		if (V) SAVUtils_Write("uint16_t", this.Offs + 0xA, Math.min(9999, V));
		else return SAVUtils_Read("uint16_t", this.Offs + 0xA);
	};

	/* Get and Set Name. */
	Name(V) {
		if (V) SAVUtils_WriteString(this.Offs + 0xD, 0x8, V);
		else return SAVUtils_ReadString(this.Offs + 0xD, 0x8);
	};

	/* Get and Set Hairstyle. */
	Hairstyle(V) {
		if (V) {
			if (V > 7) return;
			SAVUtils_WriteBits(this.Offs + 0x1D, false, (V * 2) + (this.Shirtcolor3() > 15 ? 0x1 : 0x0));

		} else {
			return SAVUtils_ReadBits(this.Offs + 0x1D, false) / 2;
		}
	};

	/* Get and Set third Shirtcolor (Long Sleeves). */
	Shirtcolor3(V) {
		if (V) {
			SAVUtils_WriteBits(this.Offs + 0x1D, true, ((V > 15) ? V - 16 : V));
			SAVUtils_WriteBits(this.Offs + 0x1D, false, (this.Hairstyle() * 2) + (V > 15 ? 0x1 : 0x0)); // Refresh Hairstyle as well.

		} else {
			return ((SAVUtils_ReadBits(this.Offs + 0x1D, false) % 2 == 1) ? 16 : 0) + SAVUtils_ReadBits(this.Offs + 0x1D, true);
		}
	};

	/* Get and Set Tan / Skin color. */
	Tan(V) {
		if (V) {
			if (V > 7) return;
			SAVUtils_WriteBits(this.Offs + 0x1E, false, (V * 2) + (this.Shirtcolor2() > 15 ? 0x1 : 0x0));

		} else {
			return SAVUtils_ReadBits(this.Offs + 0x1E, false) / 2;
		}
	};

	/* Get and Set second Shirtcolor (Short Sleeves). */
	Shirtcolor2(V) {
		if (V) {
			SAVUtils_WriteBits(this.Offs + 0x1E, true, ((V > 15) ? V - 16 : V));
			SAVUtils_WriteBits(this.Offs + 0x1E, false, (this.Tan() * 2) + (V > 15 ? 0x1 : 0x0)); // Refresh Skin / TAN as well.

		} else {
			return ((SAVUtils_ReadBits(this.Offs + 0x1E, false) % 2 == 1) ? 16 : 0) + SAVUtils_ReadBits(this.Offs + 0x1E, true);
		}
	};

	/* Get and Set Haircolor. */
	Haircolor(V) {
		if (V) SAVUtils_WriteBits(this.Offs + 0x1F, false, V);
		else return SAVUtils_ReadBits(this.Offs + 0x1F, false);
	};

	/* Get the Hatcolor. NOTE: Is also shoe color. */
	Hatcolor(V) {
		if (V) SAVUtils_WriteBits(this.Offs + 0x1F, true, V);
		else return SAVUtils_ReadBits(this.Offs + 0x1F, true);
	};

	/* Get and Set Shirt Type. */
	Shirt(V) {
		if (V) {
			if (V > 7) return;
			SAVUtils_WriteBits(this.Offs + 0x20, false, (V * 2) + (this.Shirtcolor1() > 15 ? 0x1 : 0x0));

		} else {
			return SAVUtils_ReadBits(this.Offs + 0x20, false) / 2;
		}
	};

	/* Get and Set first Shirtcolor (Body). */
	Shirtcolor1(V) {
		if (V) {
			SAVUtils_WriteBits(this.Offs + 0x20, true, ((V > 15) ? V - 16 : V));
			SAVUtils_WriteBits(this.Offs + 0x20, false, (this.Shirt() * 2) + (V > 15 ? 0x1 : 0x0)); // Refresh Shirt Type as well.

		} else {
			return ((SAVUtils_ReadBits(this.Offs + 0x20, false) % 2 == 1) ? 16 : 0) + SAVUtils_ReadBits(this.Offs + 0x20, true);
		}
	};

	/* Get and Set Pants. */
	Pants(V) {
		if (V) {
			if (V > 7) return;
			SAVUtils_WriteBits(this.Offs + 0x21, false, (V * 2) + (this.Pantscolor() > 15 ? 0x1 : 0x0));

		} else {
			return SAVUtils_ReadBits(this.Offs + 0x21, false) / 2;
		}
	};

	/* Get and Set Pantscolor. */
	Pantscolor(V) {
		if (V) {
			SAVUtils_WriteBits(this.Offs + 0x21, true, ((V > 15) ? V - 16 : V));
			SAVUtils_WriteBits(this.Offs + 0x21, false, (this.Pants() * 2) + (V > 15 ? 0x1 : 0x0)); // Refresh Pants as well.

		} else {
			return ((SAVUtils_ReadBits(this.Offs + 0x21, false) % 2 == 1) ? 16 : 0) + SAVUtils_ReadBits(this.Offs + 0x21, true);
		}
	};

	/* Get and Set the Confidence Skill Points. */
	Confidence(V) {
		if (V) SAVUtils_Write("uint8_t", this.Offs + 0x22, Math.min(5, V));
		else return SAVUtils_Read("uint8_t", this.Offs + 0x22);
	};

	/* Get and Set the Mechanical Skill Points. */
	Mechanical(V) {
		if (V) SAVUtils_Write("uint8_t", this.Offs + 0x23, Math.min(5, V));
		else return SAVUtils_Read("uint8_t", this.Offs + 0x23);
	};

	/* Get and Set the Strength Skill Points. */
	Strength(V) {
		if (V) SAVUtils_Write("uint8_t", this.Offs + 0x24, Math.min(5, V));
		else return SAVUtils_Read("uint8_t", this.Offs + 0x24);
	};

	/* Get and Set the Personality Skill Points. */
	Personality(V) {
		if (V) SAVUtils_Write("uint8_t", this.Offs + 0x25, Math.min(5, V));
		else return SAVUtils_Read("uint8_t", this.Offs + 0x25);
	};

	/* Get and Set the Hotness Skill Points. */
	Hotness(V) {
		if (V) SAVUtils_Write("uint8_t", this.Offs + 0x26, Math.min(5, V));
		else return SAVUtils_Read("uint8_t", this.Offs + 0x26);
	};

	/* Get and Set the Intellect Skill Points. */
	Intellect(V) {
		if (V) SAVUtils_Write("uint8_t", this.Offs + 0x27, Math.min(5, V));
		else return SAVUtils_Read("uint8_t", this.Offs + 0x27);
	};

	/* Get and Set the Sanity. */
	Sanity(V) {
		if (V) SAVUtils_Write("uint8_t", this.Offs + 0x32, Math.min(100, V));
		else return SAVUtils_Read("uint8_t", this.Offs + 0x32);
	};

	/* Get and Set the Aspiration. */
	Aspiration(V) {
		if (V) SAVUtils_Write("uint8_t", this.Offs + 0x4B, Math.min(2, V));
		else return SAVUtils_Read("uint8_t", this.Offs + 0x4B);
	};

	/* Return some Item Groups of 6 Items each group. */
	Pawnshop() { return new S2Editor_GBAItem(this.Offs + 0x4C); };
	Saloon() { return new S2Editor_GBAItem(this.Offs + 0x5F); };
	Skills() { return new S2Editor_GBAItem(this.Offs + 0x72); };
	Mailbox() { return new S2Editor_GBAItem(this.Offs + 0x98); };
	Inventory() { return new S2Editor_GBAItem(this.Offs + 0xAB); };

	/* Return House Items. */
	House() { return new S2Editor_GBAHouse(this.Offs); };

	/* Get and Set Empty Chug-Chug Cola Cans Amount. */
	Cans(V) {
		if (V) SAVUtils_Write("uint8_t", this.Offset(0xF6), Math.min(250, V));
		else return SAVUtils_Read("uint8_t", this.Offset(0xF6));
	};

	/* Get and Set Cowbells Amount. */
	Cowbells(V) {
		if (V) SAVUtils_Write("uint8_t", this.Offset(0xF7), Math.min(250, V));
		else return SAVUtils_Read("uint8_t", this.Offset(0xF7));
	};

	/* Get and Set Alien Spaceship Parts Amount. */
	Spaceship(V) {
		if (V) SAVUtils_Write("uint8_t", this.Offset(0xF8), Math.min(250, V));
		else return SAVUtils_Read("uint8_t", this.Offset(0xF8));
	};

	/* Get and Set Nuclear Fuelrods Amount. */
	Fuelrods(V) {
		if (V) SAVUtils_Write("uint8_t", this.Offset(0xF9), Math.min(250, V));
		else return SAVUtils_Read("uint8_t", this.Offset(0xF9));
	};

	/* Get and Set Empty Chug-Chug Cola Cans Sell price. */
	CansPrice(V) {
		if (V) SAVUtils_Write("uint8_t", this.Offset(0xFA), Math.min(255, V));
		else return SAVUtils_Read("uint8_t", this.Offset(0xFA));
	};

	/* Get and Set Cowbells Sell price. */
	CowbellsPrice(V) {
		if (V) SAVUtils_Write("uint8_t", this.Offset(0xFB), Math.min(255, V));
		else return SAVUtils_Read("uint8_t", this.Offset(0xFB));
	};

	/* Get and Set Alien Spaceship Parts Sell price. */
	SpaceshipPrice(V) {
		if (V) SAVUtils_Write("uint8_t", this.Offset(0xFC), Math.min(255, V));
		else return SAVUtils_Read("uint8_t", this.Offset(0xFC));
	};

	/* Get and Set Nuclear Fuelrods Sell price. */
	FuelrodsPrice(V) {
		if (V) SAVUtils_Write("uint8_t", this.Offset(0xFD), Math.min(255, V));
		else return SAVUtils_Read("uint8_t", this.Offset(0xFD));
	};

	/*
		Get and Set the Current Episode.

		V: The value / Episode to set.
		ValidCheck: If checking for official Episodes (valid) or not. It is recommended to have this to TRUE if modifying it.
	*/
	CurrentEpisode(V, ValidCheck) {
		if (V) {
			if (!ValidCheck) { // In case we're not checking for validateness, Set it without checks.
				SAVUtils_Write("uint8_t", this.Offset(0x1A3), V);
				SAVUtils_Write("uint8_t", this.Offs + 0x9, V); // It's better to set that to 0x9 as well for display.
				return;
			}

			for (let Idx = 0; Idx < 12; Idx++) {
				if (V == EPVals[Idx]) {
					SAVUtils_Write("uint8_t", this.Offset(0x1A3), V);
					SAVUtils_Write("uint8_t", this.Offs + 0x9, V); // It's better to set that to 0x9 as well for display.
					break;
				}
			}

		} else { // Return mode.
			for (let Idx = 0; Idx < 12; Idx++) {
				if (SAVUtils_Read("uint8_t", this.Offset(0x1A3)) == EPVals[Idx]) return Idx;
			}

			return 12; // 12 -> "Unofficial Episode". ;P
		}
	};

	/* Get an Episode class. */
	Episode(EP) { return new S2Editor_GBAEpisode(this.Slot, EP, SAVUtils_Read("uint8_t", this.Offs + 0xD6)); };

	/* Get a Cast class. */
	Cast(CST) { return new S2Editor_GBACast(this.Offset(0x466) + (Math.min(25, CST) * 0xA), CST); };

	/* Get a Social Move class. */
	SocialMove(Move) { return new S2Editor_GBASocialMove(this.Offset(0x3EA) + (Math.min(14, Move) * 0x8), Move); };

	/*
		Fix the Checksum of the current Slot, if invalid.

		Returns false if (Slot < 1) or (Slot > 4) or already valid, true if got fixed.
	*/
	FixChecksum() {
		if (this.Slot < 1 || this.Slot > 4) return false;

		const CurCHKS = SAVUtils_Read("uint16_t", this.Offs + 0xFFE);
		const Calced = Checksum_Calc(SAVData, (this.Offs / 2), ((this.Offs + 0xFFE) / 2));

		/* If the calced result is NOT the current checksum. */
		if (Calced != CurCHKS) {
			SAVUtils_Write("uint16_t", this.Offs + 0xFFE, Calced);
			return true;
		}

		return false;
	};
};