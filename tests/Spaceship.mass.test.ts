import AdditionalDataRegistry from '@civ-clone/core-data-object/AdditionalDataRegistry';
import Civilization from '@civ-clone/core-civilization/Civilization';
import Effect from '@civ-clone/core-rule/Effect';
import Mass from '../Mass';
import Part from '@civ-clone/core-spaceship/Part';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import Spaceship from '@civ-clone/core-spaceship/Spaceship';
import Yield from '@civ-clone/core-spaceship/Rules/Yield';
import { expect } from 'chai';
import mass from '../AdditionalData/mass';
import reconstituteData from '@civ-clone/core-data-object/lib/reconstituteData';
import { setUpCity } from '@civ-clone/civ1-city/tests/lib/setUpCity';

describe('Spaceship.mass', () => {
  it('should expose a mass key for a Spaceship when transferring', async () => {
    const ruleRegistry = new RuleRegistry(),
      city = await setUpCity({
        ruleRegistry,
      }),
      spaceship = new Spaceship(city.player(), ruleRegistry),
      additionalDataRegistry = new AdditionalDataRegistry();

    city.player().setCivilization(new Civilization());

    ruleRegistry.register(new Yield(new Effect(() => new Mass(20))));

    additionalDataRegistry.register(...mass());

    spaceship.add(new Part(city, ruleRegistry));

    const object = reconstituteData(
      spaceship.toPlainObject(undefined, additionalDataRegistry)
    );

    expect(object.mass.value).eq(20);

    spaceship.add(new Part(city, ruleRegistry));
    spaceship.add(new Part(city, ruleRegistry));

    const updatedObject = reconstituteData(
      spaceship.toPlainObject(undefined, additionalDataRegistry)
    );

    expect(updatedObject.mass.value).eq(60);
  });
});
