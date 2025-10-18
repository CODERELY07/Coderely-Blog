'use client'
import React, { useState } from 'react';
import { Book, Calendar, Clock, ChevronRight, Code2, Database, Lock, User, ArrowLeft, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Tutorial {
  id: number;
  title: string;
  description: string;
  category: string;
  readTime: string;
  date: string;
  difficulty: string;
  tags: string[];
}

interface Section {
  title: string;
  content?: string;
  code?: string;
  items?: string[];
   image?: string;
}

interface TutorialContent {
  title: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
  sections: Section[];
}

type ViewType = 'home' | 'tutorial';

export default function TutorialBlog() {
  const [view, setView] = useState<ViewType>('home');
  const [selectedTutorial, setSelectedTutorial] = useState<number>(1);

  const tutorials: Tutorial[] = [
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
      title: "Google Authentication using Supabase and Next.js",
      description: "Complete step-by-step guide to implementing Google OAuth authentication with Supabase in your Next.js application",
      category: "Authentication",
      readTime: "20 min read",
      date: "Oct 17, 2025",
      difficulty: "Intermediate",
      tags: ["Next.js", "Supabase", "OAuth", "Google Auth"]
    }
  ];

  const tutorialContentMap: Record<number, TutorialContent> = {
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
      ))()}
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
      title: "Google Authentication using Supabase and Next.js",
      description: "Complete step-by-step guide to implementing Google OAuth authentication with Supabase in your Next.js application",
      author: "Your Name",
      date: "October 17, 2025",
      readTime: "20 min read",
      sections: [
        {
          title: "Introduction",
          content: "In this comprehensive tutorial, we'll implement Google OAuth authentication in a Next.js application using Supabase. You'll learn how to configure Google Cloud Console, set up Supabase authentication, and create a complete authentication flow.",
           
        },
        {
          title: "Part 1: Google Cloud Console Setup",
          content: "First, navigate to https://console.cloud.google.com/ to set up your Google OAuth credentials.",
          
        },
        {
          title: "Step 1: Create New Project",
          content: "Click on 'Create New Project'",
           image: "/google-auth-img/step-1.png"
        },
        {
          title: "Step 1.2: Create New Project",
          content: "Add your desired project name and click create.",
           image: "/google-auth-img/step-2.png"
        },
        {
          title: "Step 1.3: Create New Project",
          content: "Then select your newly created project from the project dropdown.",
           image: "/google-auth-img/step-3.png"
        },
        {
          title: "Step 2: Navigate to Credentials",
          content: "In the navigation menu, go to 'APIs & Services', then click on 'Credentials'.",
          image: "/google-auth-img/step-4.png"
        },
        {
          title: "Step 3.1: Create OAuth Client ID",
          content: "Click 'Create Credentials' and select 'OAuth Client ID'. ",
          image: "/google-auth-img/step-5.png"
        },
        {
          title: "Step 3.2: Create OAuth Client ID",
          content: "You'll be prompted to configure the consent screen first.'.Click 'Configure Consent Screen' ",
          image: "/google-auth-img/step-6.png"
        },
        {
          title: "Step 4: Configure Consent Screen",
          content: "Put your data and select 'External' as the user type. In step 1, add your desired app name and email. Fill in the required fields in subsequent steps, then create the consent screen.",
          image: "/google-auth-img/step-7.png"
        },
        {
          title: "Step 5.1: Create OAuth Client",
          content: "Now create your OAuth client. ",
          image: "/google-auth-img/step-8.png"
        },
        {
          title: "Step 5.2: Create OAuth Client",
          content: " For Application type, select 'Web application'. Add your desired name. For local development, use http://localhost:3000 as the Authorized JavaScript origins.",
          image: "/google-auth-img/step-9.png"
        },
        {
          title: "Step 6: Get Supabase Callback URL",
          content: "Go to your Supabase dashboard, navigate to Authentication > Providers, find Google and enable it. Scroll down to find the 'Callback URL (for OAuth)' and copy it.",
          image: "/google-auth-img/step-10.png"
        },
        {
          title: "Step 7: Add Redirect URI",
          content: "Paste the Supabase callback URL into 'Authorized redirect URIs' in Google Console, then click Create. Then the client key and secret key will pop up and make sure to copy both the Client ID and Client Secret. "
        },
        {
          title: "Step 8: Configure Supabase Provider",
          content: "Return to Supabase and paste the Client ID and Client Secret into the Google provider settings. ",
            image: "/google-auth-img/step-13.png"
        },
        {
          title: "Step 9: Auth Scopes",
          content: "Add or remove OAuth scopes for data access permissions. Save your changes.",
            image: "/google-auth-img/step-12.png"
        },
        {
          title: "Part 2: Next.js Application Setup",
          content: "Now let's set up the Next.js application with the necessary Supabase configuration."
        },
        {
          title: "Step 9: Install Dependencies",
          code: `npm install @supabase/supabase-js
npm install @supabase/ssr`
        },
        {
          title: "Step 10: Environment Variables",
          content: "Create a .env.local file in your project root. Go to your Supabase dashboard sidebar, click 'Connect' in the top navigation, choose 'App Framework', and copy the environment variables then paste in .env.local",
        },
        {
          title: "Step 11: Create Supabase Client (Browser)",
          content: "Create utils/supabase/client.ts for client-side operations:",
          code: `import { createBrowserClient } from "@supabase/ssr";
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
`
        },
        {
          title: "Step 12: Create Supabase Server Client",
          content: "Create utils/supabase/server.ts for server-side operations:",
          code: `import { createServerClient } from "@supabase/ssr";
    import { cookies } from "next/headers";

    export async function createClient() {
    const cookieStore = await cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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
                // The setAll method was called from a Server Component.
                // This can be ignored if you have middleware refreshing
                // user sessions.
            }
            },
        },
        }
    );
}

`
        },
        {
          title: "Step 13: Create Middleware Helper",
          content: "Create utils/supabase/middleware.ts:",
          code: `import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )
  // refreshing the auth token
  await supabase.auth.getUser()
  return supabaseResponse
}
`
        },

        {
          title: "Step 14: Create Middleware",
          content: "Create middleware.ts:",
          code: `import { type NextRequest } from 'next/server'
import { updateSession } from './utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  // update user's auth session
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

`
        },
        {
          title: "Step 15: Create Auth",
          content: "Create lib/supabase/auth.ts",
          code: `'use server'
import { createClient } from "@/utils/supabase/server"
import { create } from "domain";

export const getClientUserProfile = async () => {
 
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) return null;
  const { user_metadata, app_metadata, email } = data.user;
  return {
    name: user_metadata?.name ?? null,
    email: email,
    username: user_metadata?.user_name ?? null,
    avatar: user_metadata?.avatar_url ?? null,
    provider: app_metadata?.provider ?? null,
  };
};
`
        },
        {
          title: "Step 16: Create Auth Callback",
          content: "Create app/auth/callback/route.ts",
          code: `import { NextResponse } from 'next/server'
// The client you created from the Server-Side Auth instructions
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get('next') ?? '/'
  if (!next.startsWith('/')) {
    // if "next" is not a relative URL, use the default
    next = '/'
  }

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development'
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(` + "` ${origin}${next}`" + `)
      } else if (forwardedHost) {
       ` + 
        " return NextResponse.redirect(`https://${forwardedHost}${next})` " + 
        `
      } else {
        ` + `
        return NextResponse.redirect ( ` + "`${origin}${next}` " + `) 
      }
    }
  }
  
  return NextResponse.redirect(` + "`${origin}/auth/auth-code-error`" + `)
}



`
        },
        {
          title: "Step 17: Create Auth Component",
          content: "Create app/components/Auth/AuthForm.tsx",
          code: `'use client';

import { useState } from 'react';
import { signInWithGoogle } from './action';


const AuthForm = () => {
  return (
    <>
    <div className=''></div>
    <div className="flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-base font-semibold ">
            Log in or sign up
          </h2>
          <div className="w-8"></div>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="space-y-3">
            <button
              onClick={signInWithGoogle}
              className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium py-3 px-4 rounded-lg transition"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AuthForm;

`
        },
        {
          title: "Step 18: Create Auth Action",
          content: "Create app/components/Auth/action.ts:",
          code: `'use server'
import { createClient } from "@/utils/supabase/server"
import { create } from "domain"
import { redirect } from "next/navigation"

const signInWithGoogle = async () => {

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider : 'google',
        options: {
            redirectTo: 'http://localhost:3000/auth/callback',
        },
    })

    console.log(data);

    if (data.url) {
        redirect(data.url)
    }
}

const signOut = async () => {
    const supabase =  await createClient();
    await supabase.auth.signOut();
}
export { signInWithGoogle , signOut};

`
        }
      ]
    }
  };

  const tutorialContent = tutorialContentMap[selectedTutorial];
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Code2 className="w-8 h-8 text-indigo-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                DevTutorials
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors">Home</a>
              <a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors">Tutorials</a>
              <a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors">About</a>
              <Button className="bg-indigo-600 hover:bg-indigo-700">Subscribe</Button>
            </div>
          </div>
        </div>
      </nav>

      {view === 'home' ? (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-indigo-100 text-indigo-700 hover:bg-indigo-100">
              Coding & Development
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-indigo-800 to-blue-900 bg-clip-text text-transparent">
              Master Modern Web Development
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              In-depth tutorials on authentication, databases, and full-stack development
            </p>
          </div>

          {/* Featured Tutorial */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Book className="w-6 h-6 mr-2 text-indigo-600" />
              Latest Tutorials
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {tutorials.map((tutorial) => (
                <Card 
                  key={tutorial.id}
                  className="hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden group cursor-pointer" 
                  onClick={() => {
                    setSelectedTutorial(tutorial.id);
                    setView('tutorial');
                  }}
                >
                  <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500"></div>
                  <CardHeader>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {tutorial.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="text-2xl group-hover:text-indigo-600 transition-colors">
                      {tutorial.title}
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                      {tutorial.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-6">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {tutorial.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {tutorial.readTime}
                      </div>
                      <Badge variant="outline" className="border-amber-300 text-amber-700">
                        {tutorial.difficulty}
                      </Badge>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 group">
                      Read Tutorial
                      <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow border-0 shadow">
              <CardHeader>
                <Lock className="w-10 h-10 text-indigo-600 mb-2" />
                <CardTitle>Authentication</CardTitle>
                <CardDescription>Secure user authentication patterns and best practices</CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover:shadow-lg transition-shadow border-0 shadow">
              <CardHeader>
                <Database className="w-10 h-10 text-purple-600 mb-2" />
                <CardTitle>Databases</CardTitle>
                <CardDescription>Working with modern databases and ORMs</CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover:shadow-lg transition-shadow border-0 shadow">
              <CardHeader>
                <Code2 className="w-10 h-10 text-blue-600 mb-2" />
                <CardTitle>Full Stack</CardTitle>
                <CardDescription>End-to-end application development</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Button 
            variant="ghost" 
            className="mb-8 hover:bg-indigo-50"
            onClick={() => setView('home')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          {/* Article Header */}
          <article className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex flex-wrap gap-2 mb-6">
              {tutorials.find(t => t.id === selectedTutorial)?.tags.map((tag, i) => (
                <Badge key={i} className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-indigo-900 bg-clip-text text-transparent">
              {tutorialContent.title}
            </h1>
            
            <p className="text-xl text-slate-600 mb-8">
              {tutorialContent.description}
            </p>

            <div className="flex items-center gap-4 pb-8 mb-8 border-b">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold">{tutorialContent.author}</p>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <span>{tutorialContent.date}</span>
                  <span>•</span>
                  <span>{tutorialContent.readTime}</span>
                </div>
              </div>
            </div>

            {/* Tutorial Content */}
            <div className="prose prose-lg max-w-none">
              {tutorialContent.sections.map((section, idx) => (
                <div key={idx} className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-slate-900">{section.title}</h2>
                  
                  {section.content && (
                    <p className="text-slate-700 leading-relaxed mb-4">{section.content}</p>
                  )}
                  {section.image && (
                    <div className="my-4">
                      <img
                        src={section.image}
                        alt={section.title}
                        className="rounded-xl shadow-md border border-slate-200 w-full object-contain"
                      />
                    </div>
                  )}
                  {section.items && (
                    <div className="bg-slate-50 rounded-lg p-6 my-6">
                      <ul className="space-y-3">
                        {section.items.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {section.code && (
                    <div className="bg-slate-900 rounded-lg p-6 my-6 overflow-x-auto">
                      <pre className="text-sm text-slate-100">
                        <code>{section.code}</code>
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Next Steps */}
            <div className="mt-12 p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl">
              <h3 className="text-xl font-bold mb-3 text-slate-900">What's Next?</h3>
              <p className="text-slate-700 mb-4">
                Continue building your authentication system with additional features like email verification, 
                password reset, and role-based access control.
              </p>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                View Related Tutorials
              </Button>
            </div>
          </article>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-white mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Code2 className="w-6 h-6" />
                <span className="text-lg font-bold">DevTutorials</span>
              </div>
              <p className="text-slate-400">
                Learn modern web development with comprehensive tutorials.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">All Tutorials</a></li>
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-slate-400 mb-4">Get the latest tutorials delivered to your inbox.</p>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-slate-900">
                Subscribe
              </Button>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>© 2025 DevTutorials. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
