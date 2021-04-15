/*
*   This file is part of Sim2Editor-CPPCore
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

#ifndef _SIM2EDITOR_CPP_CORE_NDS_SLOT_HPP
#define _SIM2EDITOR_CPP_CORE_NDS_SLOT_HPP

#include "CoreCommon.hpp"

namespace S2Editor {
	class NDSSlot {
	public:
		NDSSlot(const uint8_t Slot) : Slot(Slot), Offs(Slot * 0x1000) { };

		/* Main things. */
		uint32_t Simoleons() const;
		void Simoleons(const uint32_t V);
		std::string Name() const;
		void Name(const std::string &V);

		/* Collectables. */
		uint8_t Fuelrods() const;
		void Fuelrods(const uint8_t V);
		uint8_t Plates() const;
		void Plates(const uint8_t V);
		uint8_t Gourds() const;
		void Gourds(const uint8_t V);
		uint8_t Spaceship() const;
		void Spaceship(const uint8_t V);

		/* Skill Points. */
		uint8_t Creativity() const;
		void Creativity(const uint8_t V);
		uint8_t Business() const;
		void Business(const uint8_t V);
		uint8_t Body() const;
		void Body(const uint8_t V);
		uint8_t Charisma() const;
		void Charisma(const uint8_t V);
		uint8_t Mechanical() const;
		void Mechanical(const uint8_t V);

		bool FixChecksum();
	private:
		uint8_t Slot = 0;
		uint32_t Offs = 0;
	};
};

#endif