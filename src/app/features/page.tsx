'use client'
import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

export default function Features() {
  const [activeTab, setActiveTab] = useState('all');

  const features = [
  
    {
      id: 1,
      title: "Pending Tasks",
      description: "View tasks that are yet to be completed and need attention.",
      icon: "⏳",
      category: "pending",
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      id: 2,
      title: "Completed Tasks",
      description: "Track tasks that have been successfully completed.",
      icon: "✅",
      category: "completed",
      color: "bg-green-100 text-green-600"
    },
    {
      id: 3,
      title: "Deleted Tasks",
      description: "View tasks that have been deleted or archived.",
      icon: "🗑️",
      category: "deleted",
      color: "bg-red-100 text-red-600"
    },
    
 
    {
      id: 4,
      title: "Client Profiles",
      description: "Manage and update client details, contacts, and information.",
      icon: "👤",
      category: "client",
      color: "bg-blue-100 text-blue-600"
    },
    {
      id: 5,
      title: "Client Feedback",
      description: "Track and manage feedback provided by clients for improvement.",
      icon: "💬",
      category: "client",
      color: "bg-indigo-100 text-indigo-600"
    }
  ];

  const filteredFeatures = activeTab === 'all' 
    ? features 
    : features.filter(feature => feature.category === activeTab);

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Task Manager | WorkFlow Pro</title>
        <meta name="description" content="Task manager with client and task management features" />
      </Head>

      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            WorkFlow Pro <span className="text-blue-600">Task Manager</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Organize and track your tasks, complete client management, and more.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {['all', 'pending', 'completed', 'deleted', 'client'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-full font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab === 'all' ? 'All Tasks' : 
                 tab === 'pending' ? 'Pending' : 
                 tab === 'completed' ? 'Completed' : 
                 tab === 'deleted' ? 'Deleted' : 'Client Features'}
              </button>
            ))}
          </div>

        
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredFeatures.map((feature) => (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                className="p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 rounded-full ${feature.color} flex items-center justify-center text-2xl mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
