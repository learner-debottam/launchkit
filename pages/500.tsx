import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Custom500: NextPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <Head>
        <title>500 - Internal Server Error</title>
        <meta name="description" content="Internal server error occurred" />
      </Head>

      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex justify-center">
          <svg
            className="h-16 w-16 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          500 – Internal Server Error
        </h1>
        <p className="mt-4 text-gray-600">
          Something went wrong on our side. Please try again later.
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go to homepage
          </button>
          <button
            onClick={() => router.reload()}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Custom500;
