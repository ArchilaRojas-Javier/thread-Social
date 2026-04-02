import sumar from '../sumar'

test('suma 2 + 3 y devuelve 5', () => {
  expect(sumar(2, 3)).toBe(5);
});

test('suma números negativos', () => {
  expect(sumar(-1, -2)).toBe(-3);
});