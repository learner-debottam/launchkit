import Link from 'next/link'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <div className="flex justify-center">
          <MagnifyingGlassIcon className="h-12 w-12 text-gray-400" />
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          404 – Page Not Found
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Oops! The page you're looking for doesn't exist or may have been moved.
        </p>
        <div className="mt-10">
          <Link
            href="/"
            className="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Return to homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
