import AdditionalData from '@civ-clone/core-data-object/AdditionalData';
import Mass from '../Mass';
import Spaceship from '@civ-clone/core-spaceship/Spaceship';

export const getAdditionalData = () => [
  new AdditionalData(Spaceship, 'mass', (spaceship: Spaceship) =>
    spaceship.yields().reduce((mass, spaceshipYield) => {
      if (spaceshipYield instanceof Mass) {
        mass.add(spaceshipYield);
      }

      return mass;
    }, new Mass())
  ),
];

export default getAdditionalData;
