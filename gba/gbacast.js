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

import { SAVUtils_Read, SAVUtils_Write } from '../shared/savutils.js';

export class S2Editor_GBACast {
	constructor(Offs, Cast) {
		this.Offs = Offs;
		this.Cast = Cast;
	};

	/* Get Cast Index. */
	Index() { return this.Cast; };

	/* Get and Set Friendly Conversation level. */
	Friendly(V) {
		if (V) SAVUtils_Write("uint8_t", this.Offs, Math.min(3, V));
		else return SAVUtils_Read("uint8_t", this.Offs);
	};

	/* Get and Set Romance Conversation level. */
	Romance(V) {
		if (V) SAVUtils_Write("uint8_t", this.Offs + 0x1, Math.min(3, V));
		else return SAVUtils_Read("uint8_t", this.Offs + 0x1);
	};

	/* Get and Set Intimidate Conversation level. */
	Intimidate(V) {
		if (V) SAVUtils_Write("uint8_t", this.Offs + 0x2, Math.min(3, V));
		else return SAVUtils_Read("uint8_t", this.Offs + 0x2);
	};

	/*
		Get and Set the Picture.

		0:  Neutral.
		1:  Friendly.
		2:  Angry.
		3:  Love.
		4+: Invalid.
	*/
	Picture(V) {
		if (V) SAVUtils_Write("uint8_t", this.Offs + 0x3, Math.min(4, V));
		else return SAVUtils_Read("uint8_t", this.Offs + 0x3);
	};

	/* Get and Set Mystery Unlock state. */
	Mystery(V) {
		if (V) SAVUtils_Write("uint8_t", this.Offs + 0x8, Math.min(1, V));
		else return SAVUtils_Read("uint8_t", this.Offs + 0x8);
	};
};