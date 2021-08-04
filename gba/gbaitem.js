/*
*   This file is part of Sim2Editor-JSCore
*   Copyright (C) 2020-2021 SuperSaiyajinStackZ
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

import { SAVUtils_Read, SAVUtils_Write } from '../shared/savutils.js';

export class S2Editor_GBAItem {
	constructor(Offs) { this.Offs = Offs; };

	/* Get and Set Item Count. */
	Count(V) {
		if (V) SAVUtils_Write("uint8_t", this.Offs, Math.min(6, V));
		else return SAVUtils_Read("uint8_t", this.Offs);
	};

	/* Get and Set Item ID. */
	ID(Index, V) {
		if (V) {
			SAVUtils_Write("uint8_t", this.Offs + 1 + (Math.min(5, Index) * 0x3), V);

			/* Update Item Count. */
			let Amount = 0;
			for (let Idx = 0; Idx < 6; Idx++) {
				if (this.ID(Idx) != 0xE6) Amount++; // If not 0xE6 (Empty Item), increase count.
			}

			if (this.Count() != Amount) this.Count(Amount);

		} else {
			return SAVUtils_Read("uint8_t", this.Offs + 1 + (Math.min(5, Index) * 0x3));
		}
	};
};