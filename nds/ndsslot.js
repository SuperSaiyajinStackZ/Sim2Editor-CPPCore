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
import { SAVUtils_Read, SAVUtils_Write, SAVUtils_WriteString, SAVUtils_ReadString, SAVData } from '../shared/savutils.js';

export class S2Editor_NDSSlot {
	constructor(Slot) { this.Offs = (Slot * 0x1000); };

	/* Get and Set Simoleons. */
	Simoleons(V) {
		if (V) SAVUtils_Write("uint32_t", this.Offs + 0x2C, Math.min(999999, V));
		else return SAVUtils_Read("uint32_t", this.Offs + 0x2C);
	};

	/* Get and Set Name. */
	Name(V) {
		if (V) SAVUtils_WriteString(this.Offs + 0x30, 0x7, V);
		else return SAVUtils_ReadString(this.Offs + 0x30, 0x7);
	};

	/* Get and Set Nuclear Fuelrods. */
	Fuelrods(V) {
		if (V) SAVUtils_Write("uint8_t", this.Offs + 0xBC, Math.min(250, V));
		else return SAVUtils_Read("uint8_t", this.Offs + 0xBC);
	};

	/* Get and Set License Plates. */
	Plates(V) {
		if (V) SAVUtils_Write("uint8_t", this.Offs + 0xBD, Math.min(250, V));
		else return SAVUtils_Read("uint8_t", this.Offs + 0xBD);
	};

	/* Get and Set Strange Gourds. */
	Gourds(V) {
		if (V) SAVUtils_Write("uint8_t", this.Offs + 0xBE, Math.min(250, V));
		else return SAVUtils_Read("uint8_t", this.Offs + 0xBE);
	};

	/* Get and Set Alien Spaceship Parts. */
	Spaceship(V) {
		if (V) SAVUtils_Write("uint8_t", this.Offs + 0xBF, Math.min(250, V));
		else return SAVUtils_Read("uint8_t", this.Offs + 0xBF);
	};

	/* Get and Set Creativity Skill Points. */
	Creativity(V) {
		if (V) SAVUtils_Write("uint8_t", this.Offs + 0xDF, Math.min(10, V));
		else return SAVUtils_Read("uint8_t", this.Offs + 0xDF);
	};

	/* Get and Set Business Skill Points. */
	Business(V) {
		if (V) SAVUtils_Write("uint8_t", this.Offs + 0xE0, Math.min(10, V));
		else return SAVUtils_Read("uint8_t", this.Offs + 0xE0);
	};

	/* Get and Set Body Skill Points. */
	Body(V) {
		if (V) SAVUtils_Write("uint8_t", this.Offs + 0xE1, Math.min(10, V));
		else return SAVUtils_Read("uint8_t", this.Offs + 0xE1);
	};

	/* Get and Set Charisma Skill Points. */
	Charisma(V) {
		if (V) SAVUtils_Write("uint8_t", this.Offs + 0xE2, Math.min(10, V));
		else return SAVUtils_Read("uint8_t", this.Offs + 0xE2);
	};

	/* Get and Set Mechanical Skill Points. */
	Mechanical(V) {
		if (V) SAVUtils_Write("uint8_t", this.Offs + 0xE3, Math.min(10, V));
		else return SAVUtils_Read("uint8_t", this.Offs + 0xE3);
	};

	/*
		Fix the Checksum of the current Slot, if invalid.

		Returns false if Slot > 4 or already valid, true if got fixed.
	*/
	FixChecksum() {
		if (this.Slot > 4) return false;
		const CurCHKS = SAVUtils_Read("uint16_t", this.Offs + 0x28);

		let SkipOffs = new Uint16Array(0x2);
		SkipOffs[0] = (this.Offs + 0x12) / 2; SkipOffs[1] = (this.Offs + 0x28) / 2;
		const Calced = Checksum_Calc(SAVData, ((this.Offs + 0x10) / 2), ((this.Offs + 0x1000) / 2), SkipOffs);

		/* If the calced result is NOT the current checksum. */
		if (Calced != CurCHKS) {
			SAVUtils_Write("uint16_t", this.Offs + 0x28, Calced);
			return true;
		}

		return false;
	};
};