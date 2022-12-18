import { getCities, getKelvin } from "../../source/controller/mapper"

describe(getCities, () => {
  test('Test getCities sunshine', () => {
    const cities = '123456,234567,345678';
    const cityList = getCities(cities);
    expect(cityList.length).toBe(3);
  });

});

describe(getKelvin, () => {
  test('Sunshine', () => {
    // Given
    const temperature = 20;
    const unit = 'celsius';

    // When
    const kelvin = getKelvin(temperature, unit);
    
    // Then
    expect(kelvin).toBe(temperature + 273); 
  })
})
