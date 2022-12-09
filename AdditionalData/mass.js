"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdditionalData = void 0;
const AdditionalData_1 = require("@civ-clone/core-data-object/AdditionalData");
const Mass_1 = require("../Mass");
const Spaceship_1 = require("@civ-clone/core-spaceship/Spaceship");
const getAdditionalData = () => [
    new AdditionalData_1.default(Spaceship_1.default, 'mass', (spaceship) => spaceship.yields().reduce((mass, spaceshipYield) => {
        if (spaceshipYield instanceof Mass_1.default) {
            mass.add(spaceshipYield);
        }
        return mass;
    }, new Mass_1.default())),
];
exports.getAdditionalData = getAdditionalData;
exports.default = exports.getAdditionalData;
//# sourceMappingURL=mass.js.map