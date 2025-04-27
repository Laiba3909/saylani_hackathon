"use client"
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
export default function Home() {

  const [viewTab, setviewTab] = useState('personal');

  return (
    <div className="min-h-screen bg-white">
    
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Modern Task Management <br />
              <span className="text-blue-600">Made Simple</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            WorkFlow Pro is an easy and powerful task manager for everyone — whether it&apos;s for office work or personal tasks.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <Link
                href="/Signup"
                className="bg-blue-600 text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Start Free Trial
              </Link>
              <Link
                href="/features"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-md text-lg font-medium hover:border-blue-600 hover:text-blue-600 transition-colors"
              >
                See Features
              </Link>
            </div>
          </div>
          <div className="mt-16 rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&h=900&q=80"
              alt="WorkFlow Pro dashboard"
              className="w-full h-auto"
              width={500}
              height={500}
            />
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 mb-12">TRUSTED BY COMPANIES WORLDWIDE</p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center justify-items-center">
            {[
              'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png',
              'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png',
              'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png',
              '/meta.png',
              '/goole.png',
              '/shopify.png',
            ].map((logo, index) => (
              <Image
                key={index}
                src={logo}
                alt="Company logo"
                className="h-12 object-contain opacity-70 hover:opacity-100 transition-opacity"
                width={100}
                height={100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Powerful features for modern workplaces</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From employee management to office operations, WorkFlow Pro has the tools you need.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: (
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                ),
                title: 'Employee Management',
                description: 'Track employee data, attendance, and performance in one centralized platform.',
              },
              {
                icon: (
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                ),
                title: 'Task Automation',
                description: 'Automate routine office tasks and workflows to save time and reduce errors.',
              },
              {
                icon: (
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                ),
                title: 'Analytics Dashboard',
                description: 'Get real-time insights into your office operations and employee productivity.',
              },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Built for everyone
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        WorkFlow Pro adapts to your needs — whether you&apos;re managing tasks, personal projects, or running your own business.
      </p>
    </div>

    <div className="mb-12 ">
      <div className="flex justify-center border-b border-gray-200">
        {['personal', 'freelance', 'startup', 'creative'].map((tab) => (
          <button
            key={tab}
            onClick={() => setviewTab(tab)}
            className={`px-2 md:px-6 py-3 font-medium text-sm md:text-base capitalize ${viewTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4 capitalize">
          {viewTab === 'personal' ? 'Personal Projects' :
           viewTab === 'freelance' ? 'Freelancers' :
           viewTab === 'startup' ? 'Startups' :
           viewTab === 'creative' ? 'Creative Minds' :
           viewTab}
        </h3>
        <p className="text-gray-600 mb-3">
          {{
            personal: 'Organize your daily tasks, plan events, and stay ahead with smart reminders and efficient workflows.',
            freelance: 'Manage client work, invoices, projects, and communications in one place — built for freelancers who juggle it all.',
            startup: 'Perfect for young startups to track projects, manage teams, and grow operations from day one.',
            creative: 'Capture ideas, manage portfolios, and collaborate on creative projects with ease.',
          }[viewTab]}
        </p>
        <Link
          href="#"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          Learn more about {viewTab === 'personal' ? 'Personal Projects' : viewTab} features
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="rounded-xl overflow-hidden shadow-xl">
        <Image
          src={
            {
              personal: '/personal.png',
              freelance: '/freelance.avif',
              startup: '/startup.webp',
              creative: '/creative.avif',
            }[viewTab] || 'https://defaultimage.com/default.jpg'
          }
          alt={`WorkFlow Pro for ${viewTab}`}
          className="w-full h-auto"
          width={300}
          height={300}
        />
      </div>
    </div>
  </div>
</section>


<section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trusted by people from all walks of life</h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        See how Task Manager is helping individuals manage their tasks effectively across various aspects of life.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {[
        {
          quote: "&quot;Task Manager has made it easy for me to keep track of my personal goals and tasks, improving my productivity by 30%.&quot",
          name: "&quot;Sarah Johnson&quot",
          title: "&quot;Student&quot",
          image: "&quot;https://randomuser.me/api/portraits/women/44.jpg&quot",
        },
        {
          quote: "&quot;As a freelancer, I can now manage multiple projects at once, with reminders and deadlines that keep me on track.&quot",
          name: "&quot;Michael Chen&quot;",
          title:" &quot;Freelancer, Designer&quot;",
          image: "&quot;https://randomuser.me/api/portraits/men/32.jpg&quot",
        },
        {
          quote: "&quot;Task Manager helped me organize my daily routine as a busy parent, making it easier to juggle work and family responsibilities.&quot;",
          name: "&quot;Emma Rodriguez&quot;",
          title: "&quot;Parent, Full-time Worker&quot;",
          image: "&quot;https://randomuser.me/api/portraits/women/63.jpg&quot",
        },
        {
          quote: "&quot;It&apos;s not just for work! Task Manager has been amazing for organizing everything from fitness goals to family events.&quot",
          name: "&quot;John Doe&quot",
          title: "&quot;Health Enthusiast&quot",
          image: "&quot;https://randomuser.me/api/portraits/men/24.jpg&quot",
        },
        {
          quote:" &quot;Managing my personal finances and career goals became much simpler with Task Manager. Highly recommended!&quot",
          name: "&quot;Linda Scott&quot",
          title: "&quot;Young Professional&quot",
          image:" &quot;https://randomuser.me/api/portraits/women/12.jpg&quot",
        },
        {
          quote:" &quot;I can now manage my studies, part-time job, and social life with ease, thanks to Task Manager.&quot",
          name: "&quot;Jake Williams&quot",
          title: "&quot;College Student&quot",
          image: "&quot;https://randomuser.me/api/portraits/men/45.jpg&quot",
        }
      ].map((testimonial, index) => (
        <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
          <div className="mb-6">
            <svg className="w-8 h-8 text-blue-600 opacity-50" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
          <p className="text-gray-700 mb-6 italic">&quot;{testimonial.quote}&quot;</p>
          <div className="flex items-center">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              className="w-12 h-12 rounded-full mr-4 object-cover"
              width={200}
              height={200}
            />
            <div>
              <p className="font-semibold text-gray-900">{testimonial.name}</p>
              <p className="text-sm text-gray-600">{testimonial.title}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your office operations?</h2>
          <p className="text-xl mb-10 opacity-90">
            Join thousands of companies using WorkFlow Pro to streamline their employee management and office workflows.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/Signup"
              className="bg-white text-blue-600 px-8 py-4 rounded-md text-lg font-medium hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
            >
              Start 30-Day Free Trial
            </Link>
            <Link
              href="/demo"
              className="border-2 border-white text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Request Demo
            </Link>
          </div>
        </div>
      </section>
 </div>
         
  );
}


