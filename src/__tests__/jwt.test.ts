import { signToken, verifyToken } from '../utils/jwt';

describe('JWT Helper', () => {
  it('should generate and verify a token correctly', () => {
    const payload = { id: 'user123', role: 'admin' };
    const token = signToken(payload, '1h');

    const decoded = verifyToken(token);
    expect(decoded.id).toBe('user123');
    expect(decoded.role).toBe('admin');
  });
});