import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const supabase = createClient()
  await supabase.auth.signOut()
  return NextResponse.redirect(new URL('/auth/sign-in', requestUrl.origin))
}
