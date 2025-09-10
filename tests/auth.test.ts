import { createClient } from '@/lib/supabase/server'
import { NextRequest } from 'next/server'
import { POST as signInHandler } from '@/app/(auth)/sign-in/route'
import { POST as signOutHandler } from '@/app/auth/sign-out/route'

jest.mock('@/lib/supabase/server', () => ({
  createClient: jest.fn(() => ({
    auth: {
      signInWithPassword: jest.fn(),
      signOut: jest.fn(),
      getSession: jest.fn(),
    }
  }))
}))

describe('Auth Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('POST /auth/sign-in', () => {
    it('should return 400 for invalid form data', async () => {
      const req = new NextRequest('http://localhost/auth/sign-in', {
        method: 'POST',
        body: JSON.stringify({ email: 'invalid', password: 'short' })
      })

      const response = await signInHandler(req)
      expect(response.status).toBe(400)
    })

    it('should handle successful sign in', async () => {
      const mockSignIn = jest.fn().mockResolvedValue({ error: null })
      const client = createClient()
      client.auth.signInWithPassword = mockSignIn

      const req = new NextRequest('http://localhost/auth/sign-in', {
        method: 'POST',
        body: JSON.stringify({ email: 'test@example.com', password: 'password123' })
      })

      const response = await signInHandler(req)
      expect(response.status).toBe(200)
      expect(mockSignIn).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      })
    })
  })

  describe('POST /auth/sign-out', () => {
    it('should sign out and redirect', async () => {
      const mockSignOut = jest.fn()
      const client = createClient()
      client.auth.signOut = mockSignOut

      const req = new NextRequest('http://localhost/auth/sign-out', {
        method: 'POST'
      })

      const response = await signOutHandler(req)
      expect(response.status).toBe(302)
      expect(mockSignOut).toHaveBeenCalled()
    })
  })
})
