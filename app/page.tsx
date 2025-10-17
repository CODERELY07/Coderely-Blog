"use client";
import React, { useState } from "react";
import {
  Book,
  Calendar,
  Clock,
  ChevronRight,
  Code2,
  Database,
  Lock,
  User,
  ArrowLeft,
  Check,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// --- Types ---
type Section = {
  title: string;
  content?: string;
  code?: string;
  items?: string[];
};

type TutorialContent = {
  title: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
  sections: Section[];
};

type Tutorial = {
  id: number;
  title: string;
  description: string;
  category: string;
  readTime: string;
  date: string;
  difficulty: string;
  tags: string[];
};

// --- Data ---
export const tutorials: Tutorial[] = [
  {
    id: 1,
    title: "How to Setup Next.js and Supabase",
    description:
      "A complete step-by-step guide to setting up Next.js with Supabase, including authentication, database configuration, and RLS policies",
    category: "Setup Guide",
    readTime: "15 min read",
    date: "Oct 17, 2025",
    difficulty: "Beginner",
    tags: ["Next.js", "Supabase", "Setup", "Database"],
  },
  {
    id: 2,
    title: "Authentication in Google using Supabase",
    description:
      "Learn how to implement secure Google authentication in your Next.js application using Supabase Auth",
    category: "Authentication",
    readTime: "12 min read",
    date: "Oct 17, 2025",
    difficulty: "Intermediate",
    tags: ["Next.js", "Supabase", "OAuth", "Authentication"],
  },
];

// --- Map type fix: key type widened from numeric literals to `number` ---
export const tutorialContentMap: Record<number, TutorialContent> = {
  1: {
    title: "How to Setup Next.js and Supabase",
    description:
      "A complete step-by-step guide to setting up Next.js with Supabase from scratch",
    author: "Your Name",
    date: "October 17, 2025",
    readTime: "15 min read",
    sections: [
      {
        title: "1. Create Supabase Account",
        content:
          "First, visit https://supabase.com/ and sign in using GitHub. Follow the sign-in process and fill in the necessary inputs to create your account.",
      },
      // (keep all other sections unchanged)
    ],
  },
  2: {
    title: "Authentication in Google using Supabase",
    description:
      "A comprehensive guide to implementing Google OAuth authentication in your Next.js application with Supabase",
    author: "Your Name",
    date: "October 17, 2025",
    readTime: "12 min read",
    sections: [
      {
        title: "Introduction",
        content:
          "In this tutorial, we'll walk through setting up Google authentication in a Next.js application using Supabase. This authentication method provides a secure and seamless login experience for your users.",
      },
      // (keep all other sections unchanged)
    ],
  },
};
export default function TutorialBlog() {
  const [view, setView] = useState('home');
  const [selectedTutorial, setSelectedTutorial] = useState(1);
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
        // --- Home Page ---
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

          {/* Featured Tutorials */}
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
        // --- Tutorial Page ---
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Button 
            variant="ghost" 
            className="mb-8 hover:bg-indigo-50"
            onClick={() => setView('home')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

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

            <div className="prose prose-lg max-w-none">
              {tutorialContent.sections.map((section, idx) => (
                <div key={idx} className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-slate-900">{section.title}</h2>
                  
                  {section.content && (
                    <p className="text-slate-700 leading-relaxed mb-4">{section.content}</p>
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
