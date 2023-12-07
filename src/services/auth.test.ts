import { Auth } from './auth.js';
import { compare, hash } from 'bcrypt';

import jwt from 'jsonwebtoken';
import { TokenPayload } from '../types/token.payload.js';

jest.mock('bcrypt'); // Todas las funciones mockeadas devuelven undefined

describe('Given Auth abstract class', () => {
  describe('When se use its methods', () => {
    test('Then hash should ...', () => {
      // Arrange
      (hash as jest.Mock).mockReturnValue('test');
      const mockValue = '';
      // Act
      const result = Auth.hash(mockValue);
      // Assert
      expect(hash).toHaveBeenCalled();
      expect(result).toBe('test');
    });

    test('Then compare should ...', () => {
      (compare as jest.Mock).mockReturnValue(true);
      const mockValue = '';
      const result = Auth.comparison(mockValue, mockValue);
      expect(compare).toHaveBeenCalled();
      expect(result).toBe(true);
    });
    test('Then signJWT should return a signed JWT', () => {
      jwt.sign = jest.fn().mockReturnValue('test');
      const result = Auth.signJWT({} as TokenPayload);
      expect(jwt.sign).toHaveBeenCalled();
      expect(result).toBe('test');
    });

    test('Then verifyAndGetPayload should return the payload', () => {
      jwt.verify = jest.fn().mockReturnValue({});
      const result = Auth.verifyAndGetPayload('');
      expect(jwt.verify).toHaveBeenCalled();
      expect(result).toStrictEqual({});
    });
  });
  describe('When we use its methods with errors', () => {
    // Como testear errores síncronos
    test('Then verifyAndGetPayload should throw an error', () => {
      jwt.verify = jest.fn().mockReturnValue('');
      expect(() => Auth.verifyAndGetPayload('')).toThrow();
      expect(jwt.verify).toHaveBeenCalled();
    });
  });
});
