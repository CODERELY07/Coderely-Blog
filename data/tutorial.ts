 export const tutorials = [
    {
      id: 1,
      title: "How to Setup Next.js and Supabase",
      description: "A complete step-by-step guide to setting up Next.js with Supabase, including authentication, database configuration, and RLS policies",
      category: "Setup Guide",
      readTime: "15 min read",
      date: "Oct 17, 2025",
      difficulty: "Beginner",
      tags: ["Next.js", "Supabase", "Setup", "Database"]
    },
    {
      id: 2,
      title: "Authentication in Google using Supabase",
      description: "Learn how to implement secure Google authentication in your Next.js application using Supabase Auth",
      category: "Authentication",
      readTime: "12 min read",
      date: "Oct 17, 2025",
      difficulty: "Intermediate",
      tags: ["Next.js", "Supabase", "OAuth", "Authentication"]
    }
  ];

  export const tutorialContentMap = {
    1: {
      title: "How to Setup Next.js and Supabase",
      description: "A complete step-by-step guide to setting up Next.js with Supabase from scratch",
      author: "Your Name",
      date: "October 17, 2025",
      readTime: "15 min read",
      sections: [
        {
          title: "1. Create Supabase Account",
          content: "First, visit https://supabase.com/ and sign in using GitHub. Follow the sign-in process and fill in the necessary inputs to create your account."
        },
        {
          title: "2. Create New Project",
          content: "After creating your account, click 'New Project' and create your project. Once the project is created, navigate to Project Overview and find the Project API section to get your connection credentials."
        },
        {
          title: "3. Get Your API Credentials",
          content: "You'll need two important values: the Project URL and API Key. These will be used to connect your Next.js application to Supabase."
        },
        {
          title: "4. Setup Environment Variables",
          content: "Create a .env.local file in your project root and add your Supabase credentials:",
          code: `NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY`
        },
        {
          title: "5. Install Next.js",
          content: "Create a new Next.js application with the following commands:",
          code: `npx create-next-app@latest my-app --yes
cd my-app
npm run dev`
        },
        {
          title: "6. Install Supabase Dependencies",
          content: "Install the required Supabase packages:",
          code: `npm install @supabase/supabase-js
npm install @supabase/ssr`
        },
        {
          title: "7. Create Supabase Client (Browser)",
          content: "Create utils/supabase/client.ts for client-side operations:",
          code: `import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}`
        },
        {
          title: "8. Create Supabase Server Client",
          content: "Create utils/supabase/server.ts for server-side operations:",
          code: `import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Ignored for Server Components
          }
        },
      },
    }
  );
}`
        },
        {
          title: "9. Setup Middleware",
          content: "Create middleware.ts in your project root:",
          code: `import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}`
        },
        {
          title: "10. Create Middleware Helper",
          content: "Create utils/supabase/middleware.ts:",
          code: `import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => 
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  await supabase.auth.getUser()
  return supabaseResponse
}`
        },
        {
          title: "11. Create Database Table",
          content: "In your Supabase project, go to Table Editor and click 'New Table'. Create a table named 'listings' with a column 'name' of type text. Click the settings icon, uncheck 'isNullable', and save."
        },
        {
          title: "12. Update Your Page Component",
          content: "Replace the code in app/page.tsx:",
          code: `import { createClient } from '@/utils/supabase/server';

export default async function Home() {
  const supabase = await createClient();
  const { data: listings, error } = await supabase
    .from("listings")
    .select('*');

  if (error) {
    console.log(error)
  }

  return (
    <div>
      {listings?.map(listing => (
        <p key={listing.id}>{listing.name}</p>
      ))}
    </div>
  );
}`
        },
        {
          title: "13. Setup Row Level Security (RLS)",
          content: "If you don't see any output, you need to configure RLS policies. In Supabase Table Editor, find 'Create RLS Policies', click it, then select the template 'Enable read access for all users' and save the policy. Refresh your website to see the output."
        },
        {
          title: "Next Steps",
          content: "Congratulations! You've successfully set up Next.js with Supabase. You can now add more tables, implement authentication, and build your full-stack application."
        }
      ]
    },
    2: {
      title: "Authentication in Google using Supabase",
      description: "A comprehensive guide to implementing Google OAuth authentication in your Next.js application with Supabase",
      author: "Your Name",
      date: "October 17, 2025",
      readTime: "12 min read",
      sections: [
        {
          title: "Introduction",
          content: "In this tutorial, we'll walk through setting up Google authentication in a Next.js application using Supabase. This authentication method provides a secure and seamless login experience for your users."
        },
        {
          title: "Prerequisites",
          items: [
            "Node.js 18+ installed",
            "A Supabase account",
            "A Google Cloud Console account",
            "Basic knowledge of Next.js and React"
          ]
        },
        {
          title: "Step 1: Set Up Supabase Project",
          content: "First, create a new project in Supabase. Navigate to your project dashboard and access the Authentication settings."
        },
        {
          title: "Step 2: Configure Google OAuth",
          content: "In Google Cloud Console, create OAuth 2.0 credentials. You'll need to configure authorized redirect URIs pointing to your Supabase project."
        },
        {
          title: "Step 3: Install Dependencies",
          code: `npm install @supabase/supabase-js @supabase/auth-ui-react @supabase/auth-ui-shared`
        },
        {
          title: "Step 4: Initialize Supabase Client",
          code: `// lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)`
        },
        {
          title: "Step 5: Implement Authentication",
          content: "Create your authentication component with Google sign-in functionality. Handle the OAuth callback and manage user sessions."
        }
      ]
    }
  };