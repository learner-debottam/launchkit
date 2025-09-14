import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export async function POST(request: Request) {
  const supabase = createClient()
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    const { email, password } = signInSchema.parse(data)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status ?? 400 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json(
      { error: 'Invalid form data' },
      { status: 400 }
    )
  }
}
