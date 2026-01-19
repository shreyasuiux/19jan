import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Search,
  Filter,
  Award,
  Star,
  Trophy,
  Medal,
  Crown,
  Sparkles
} from 'lucide-react';
import { Footer } from './Footer';
import { Nav } from './Nav';

// Animated particle background component
const ParticleField = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-30">
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Mesh gradient background
const MeshGradient = () => {
  return (
    <div className="absolute inset-0 opacity-40">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-violet-900/20" />
      <div className="absolute inset-0 bg-gradient-to-tl from-fuchsia-900/10 via-transparent to-purple-900/10" />
      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 30% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

// Dummy data for Wall of Fame members
const fameMembersData = [
  { id: 1, name: 'Rajesh Kumar', designation: 'Chief Technology Officer', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
  { id: 2, name: 'Priya Sharma', designation: 'VP of Engineering', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' },
  { id: 3, name: 'Amit Patel', designation: 'Senior Architect', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop' },
  { id: 4, name: 'Neha Gupta', designation: 'Lead Developer', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop' },
  { id: 5, name: 'Vikram Singh', designation: 'Chief Technology Officer', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },
  { id: 6, name: 'Ananya Reddy', designation: 'VP of Engineering', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop' },
  { id: 7, name: 'Sanjay Mehta', designation: 'Senior Architect', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop' },
  { id: 8, name: 'Kavya Iyer', designation: 'Lead Developer', image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop' },
  { id: 9, name: 'Arjun Nair', designation: 'Chief Technology Officer', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop' },
  { id: 10, name: 'Divya Krishnan', designation: 'VP of Engineering', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop' },
  { id: 11, name: 'Rohan Desai', designation: 'Senior Architect', image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=400&fit=crop' },
  { id: 12, name: 'Shreya Joshi', designation: 'Lead Developer', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop' },
  { id: 13, name: 'Karthik Rao', designation: 'Chief Technology Officer', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop' },
  { id: 14, name: 'Isha Verma', designation: 'VP of Engineering', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop' },
  { id: 15, name: 'Aditya Kapoor', designation: 'Senior Architect', image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop' },
  { id: 16, name: 'Meera Chopra', designation: 'Lead Developer', image: 'https://images.unsplash.com/photo-1491349174775-aaafddd81942?w=400&h=400&fit=crop' },
  { id: 17, name: 'Nikhil Bose', designation: 'Chief Technology Officer', image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop' },
  { id: 18, name: 'Pooja Agarwal', designation: 'VP of Engineering', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop' },
  { id: 19, name: 'Abhishek Pandey', designation: 'Senior Architect', image: 'https://images.unsplash.com/photo-1507081323647-4d250478b919?w=400&h=400&fit=crop' },
  { id: 20, name: 'Riya Malhotra', designation: 'Lead Developer', image: 'https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=400&h=400&fit=crop' },
];

const WallOfFamePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState('All');

  // Get unique designations for filter
  const designations = useMemo(() => {
    const unique = Array.from(new Set(fameMembersData.map(member => member.designation)));
    return ['All', ...unique];
  }, []);

  // Filter members based on search and designation
  const filteredMembers = useMemo(() => {
    return fameMembersData.filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDesignation = selectedDesignation === 'All' || member.designation === selectedDesignation;
      return matchesSearch && matchesDesignation;
    });
  }, [searchQuery, selectedDesignation]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0118] via-[#1a0b2e] to-[#0a0118] text-white">
      {/* Unified Header - Nav component includes both desktop and mobile */}
      <Nav />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 md:pt-28 md:pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
        <MeshGradient />
        <ParticleField />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Small Badge */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-8 md:mb-10"
            >
              <div className="px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/5 backdrop-blur-sm">
                <span className="text-[11px] md:text-xs font-medium tracking-[0.2em] text-purple-300 uppercase">
                  CELEBRATING EXCELLENCE
                </span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-['Montserrat:SemiBold',sans-serif] text-[40px] md:text-[72px] lg:text-[84px] leading-[1.05] mb-6 md:mb-8 tracking-tight px-4"
            >
              <span className="block">
                <span className="text-white">Wall of </span>
                <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-500 bg-clip-text text-transparent">
                  fame
                </span>
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base md:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto mb-10 md:mb-12 px-4 leading-relaxed"
            >
              Honoring our exceptional leaders and innovators who drive excellence and shape the future.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-10 md:mb-12"
            >
              
            </motion.div>
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 text-sm md:text-base bg-white/5 border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/40 transition-colors"
                />
              </div>

              {/* Designation Filter */}
              <div className="relative w-full md:w-64">
                <Filter className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400 pointer-events-none" />
                <select
                  value={selectedDesignation}
                  onChange={(e) => setSelectedDesignation(e.target.value)}
                  className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 text-sm md:text-base bg-white/5 border border-purple-500/20 rounded-xl text-white appearance-none cursor-pointer focus:outline-none focus:border-purple-500/40 transition-colors"
                >
                  {designations.map((designation) => (
                    <option key={designation} value={designation} className="bg-[#1a0b2e] text-white">
                      {designation}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-3 md:mt-4 text-center text-gray-400 text-xs md:text-sm">
              Showing {filteredMembers.length} of {fameMembersData.length} members
            </div>
          </motion.div>
        </div>
      </section>

      {/* Members Grid Section */}
      <section className="relative py-12 md:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {filteredMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative"
              >
                <div className="relative bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10 rounded-xl md:rounded-2xl border border-purple-500/20 p-4 md:p-6 hover:border-purple-500/40 transition-all duration-300 overflow-hidden">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-fuchsia-500/0 group-hover:from-purple-500/10 group-hover:to-fuchsia-500/10 transition-all duration-500 rounded-xl md:rounded-2xl" />
                  
                  {/* Sparkle Icon */}
                  <div className="absolute top-3 right-3 md:top-4 md:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
                  </div>

                  {/* Member Image */}
                  <div className="relative z-10 mb-3 md:mb-4">
                    <div className="relative w-full aspect-square rounded-lg md:rounded-xl overflow-hidden bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>
                    
                    {/* Award Badge */}
                    <div className="absolute -bottom-2 md:-bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-fuchsia-500 p-1.5 md:p-2 rounded-full shadow-lg shadow-purple-500/50">
                      <Award className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                  </div>

                  {/* Member Info */}
                  <div className="relative z-10 text-center mt-4 md:mt-6">
                    <h3 className="text-base md:text-lg lg:text-xl font-semibold text-white mb-1 md:mb-2">
                      {member.name}
                    </h3>
                    <p className="text-xs md:text-sm text-purple-300">
                      {member.designation}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredMembers.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 md:py-16"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-purple-500/10 mb-3 md:mb-4">
                <Search className="w-6 h-6 md:w-8 md:h-8 text-purple-400" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2">No members found</h3>
              <p className="text-sm md:text-base text-gray-400">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WallOfFamePage;