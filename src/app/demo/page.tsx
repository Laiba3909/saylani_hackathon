'use client';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function DemoPage() {
  return (
    <>
      <Head>
        <title>Demo | WorkFlow Pro</title>
      </Head>

      <section className="py-20 bg-white text-center">
        <h1 className="text-4xl font-bold mb-6">See How WorkFlow Pro Works</h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Add tasks, assign teammates, and track progress in real-time.
        </p>

        <div className="max-w-3xl mx-auto">
          <Image
            src="/overflow.png"
            alt="Workflow Pro in action"
            className="rounded-lg shadow-lg"
            width={800}
            height={100}
          />
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">Want a live walkthrough?</h2>
          <p className="mb-8 text-gray-600">Pick a time and we&apos;ll show you around.</p>
          <Link
            href="mailto:developerlaiba6@gmail.com"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-md hover:bg-blue-700 transition"
          >
            Email Us for a Live Demo
          </Link>
        </div>
      </section>
    </>
  );
}
