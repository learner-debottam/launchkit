import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import SubscriptionButton from '@/components/subscription-button'

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/sign-in')
  }

  // Check if user has an active subscription
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .single()

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Subscription Status</h3>
          
          {subscription ? (
            <div className="space-y-2">
              <p className="text-green-600 font-medium">Active Subscription</p>
              <p>Current period ends: {new Date(subscription.current_period_end).toLocaleDateString()}</p>
              <p>Status: {subscription.status}</p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600">You don't have an active subscription.</p>
              <SubscriptionButton />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
