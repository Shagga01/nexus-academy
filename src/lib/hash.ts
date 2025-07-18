// src/lib/hash.ts
import bcrypt from 'bcryptjs'

const SALT_ROUNDS = 12

/**
 * Hashes a password using bcrypt.
 * @param password - Raw user password
 * @returns Hashed password
 */
export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS)
}

/**
 * Compares a raw password to a hashed password.
 * @param password - Raw user password
 * @param hashed - Stored hashed password
 * @returns Boolean match result
 */
export const verifyPassword = async (
  password: string,
  hashed: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashed)
}