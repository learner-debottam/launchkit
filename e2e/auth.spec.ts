import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000')
  })

  test('should allow user to sign in with email/password', async ({ page }) => {
    // Navigate to sign in page
    await page.getByRole('link', { name: 'Sign In' }).click()
    await expect(page).toHaveURL(/\/sign-in/)

    // Fill out and submit form
    await page.getByLabel('Email').fill('test@example.com')
    await page.getByLabel('Password').fill('password123')
    await page.getByRole('button', { name: 'Sign In' }).click()

    // Verify successful redirect to dashboard
    await expect(page).toHaveURL(/\/dashboard/)
    await expect(page.getByText('test@example.com')).toBeVisible()
  })

  test('should redirect unauthenticated users to sign in', async ({ page }) => {
    // Try to access protected route
    await page.goto('http://localhost:3000/dashboard')
    
    // Verify redirect to sign in
    await expect(page).toHaveURL(/\/sign-in/)
  })

  test('should allow user to sign out', async ({ page }) => {
    // Sign in first
    await page.goto('http://localhost:3000/sign-in')
    await page.getByLabel('Email').fill('test@example.com')
    await page.getByLabel('Password').fill('password123')
    await page.getByRole('button', { name: 'Sign In' }).click()

    // Sign out
    await page.getByRole('button', { name: 'Sign Out' }).click()
    
    // Verify redirect to sign in
    await expect(page).toHaveURL(/\/sign-in/)
  })
})
