import React, { useState } from 'react';
import { Menu, X, ChevronRight, Home, ChevronDown, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import svgPaths from '../../imports/svg-bngkqqxd9l';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';
import { getServiceUrl, getProductUrl, getAIUrl, getWhoWeAreUrl } from '@/app/utils/navigationHelper';

/**
 * Mobile Navigation Component
 * PURPOSE: Provide logo, breadcrumbs, and hamburger menu for mobile UX
 * PRESERVES: Brand colors, visual style
 * 
 * ⚠️ DEVELOPER NOTES:
 * - Uses React Router Link and useNavigate for all internal navigation
 * - DO NOT use anchor tags or window.location for internal navigation
 * - All navigation uses proper React Router patterns
 */

interface MobileNavProps {
  currentPage?: string;
  breadcrumbs?: Array<{ label: string; onClick?: () => void }>;
  onLogoClick?: () => void; // ⚠️ DEPRECATED - kept for backward compatibility
  onMenuToggle?: (isOpen: boolean) => void;
  onServiceClick?: (serviceTitle: string) => void; // ⚠️ DEPRECATED - kept for backward compatibility
  onAIClick?: (aiPageTitle: string) => void; // ⚠️ DEPRECATED - kept for backward compatibility
  onProductClick?: (productTitle: string) => void; // ⚠️ DEPRECATED - kept for backward compatibility
  onGrowWithUsClick?: () => void; // ⚠️ DEPRECATED - kept for backward compatibility
  onWhoWeAreItemClick?: (item: string) => void; // ⚠️ DEPRECATED - kept for backward compatibility
  onGetStartedClick?: () => void;
  [key: string]: any; // Allow any additional props from Figma
}

function MobileNavComponent({ 
  currentPage = 'Home', 
  breadcrumbs = [],
  onLogoClick,
  onMenuToggle,
  onServiceClick,
  onAIClick,
  onProductClick,
  onGrowWithUsClick,
  onWhoWeAreItemClick,
  onGetStartedClick,
  ...rest // Capture and ignore any extra props
}: MobileNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    onMenuToggle?.(newState);
  };

  const handleLogoClick = () => {
    setIsMenuOpen(false);
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleMenuItemClick = (callback?: () => void) => {
    setIsMenuOpen(false);
    callback?.();
  };

  // Lock/unlock body scroll when menu opens/closes
  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <div className="mobile-nav-wrapper">
      {/* Mobile Header - Fixed at top, Sticky */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-[1300] bg-black/95 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={handleLogoClick}
          >
            <div className="w-20 h-7">
              <svg className="block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 112 40.6387">
                <g>
                  <path d={svgPaths.p1a137200} fill="white" />
                  <path d={svgPaths.ped4dd00} fill="white" />
                </g>
              </svg>
            </div>
          </div>

          {/* Right Side - Hamburger Menu */}
          <div className="flex items-center gap-2">
            {/* Hamburger Menu Button */}
            <motion.button
              onClick={handleMenuToggle}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors relative z-50"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Breadcrumbs - Only show if not on home page */}
        {breadcrumbs.length > 0 && (
          <div className="px-4 pb-3 flex items-center gap-2 text-xs overflow-x-auto">
            <Home 
              className="w-[10px] h-[10px] text-purple-400 flex-shrink-0 cursor-pointer" 
              onClick={handleLogoClick}
            />
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                <ChevronRight className="w-2.5 h-2.5 text-white/40 flex-shrink-0" />
                <span
                  className={`text-white/80 whitespace-nowrap ${crumb.onClick ? 'cursor-pointer hover:text-white' : ''}`}
                  onClick={crumb.onClick}
                >
                  {crumb.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop with Blur */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden fixed inset-0 z-[1250]"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(88, 28, 135, 0.15) 0%, rgba(0, 0, 0, 0.95) 100%)',
                backdropFilter: 'blur(20px)',
              }}
              onClick={handleMenuToggle}
            >
              {/* Animated mesh gradient */}
              <div className="absolute inset-0 opacity-30">
                <motion.div
                  className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl"
                  style={{
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>
            </motion.div>

            {/* Menu Panel - Premium Glassmorphic Design */}
            <motion.div
              key="menu-panel"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ 
                type: 'spring', 
                damping: 30, 
                stiffness: 300,
                opacity: { duration: 0.3 }
              }}
              className="md:hidden fixed top-0 right-0 bottom-0 w-[90vw] max-w-[420px] z-[1260] overflow-hidden"
            >
              {/* Glassmorphic background with gradient */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(10, 1, 24, 0.98) 0%, rgba(26, 11, 46, 0.98) 50%, rgba(10, 1, 24, 0.98) 100%)',
                  backdropFilter: 'blur(40px)',
                }}
              >
                {/* Animated gradient mesh */}
                <motion.div
                  className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-3xl"
                  style={{
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
                  }}
                  animate={{
                    y: [0, 50, 0],
                    x: [0, -30, 0],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <motion.div
                  className="absolute bottom-1/3 left-0 w-[250px] h-[250px] rounded-full blur-3xl"
                  style={{
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)',
                  }}
                  animate={{
                    y: [0, -40, 0],
                    x: [0, 20, 0],
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>

              {/* Content wrapper with border */}
              <div className="absolute inset-0 border-l border-purple-500/20 shadow-[-20px_0_80px_0_rgba(139,92,246,0.1)]">
                <div className="relative h-full overflow-y-auto">
                  {/* Header Section */}
                  <div className="sticky top-0 z-10 backdrop-blur-md bg-black/40 border-b border-white/10">
                    <div className="flex items-center justify-between p-6">
                      {/* Logo */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                          <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-['Montserrat:Bold',sans-serif] text-[13px] text-white">Menu</p>
                          <p className="font-['Montserrat:Regular',sans-serif] text-[10px] text-white/50">Navigation</p>
                        </div>
                      </motion.div>

                      {/* Close button */}
                      <motion.button
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        transition={{ delay: 0.3 }}
                        onClick={handleMenuToggle}
                        className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300"
                        aria-label="Close menu"
                        whileTap={{ scale: 0.9 }}
                      >
                        <X className="w-5 h-5 text-white" />
                      </motion.button>
                    </div>

                    {/* Decorative line */}
                    <motion.div
                      className="h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                    />
                  </div>

                  {/* Navigation Content */}
                  <div className="p-6 pb-32">
                    {/* Navigation Items */}
                    <motion.nav 
                      className="space-y-1 mb-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <MobileNavItem 
                        label="Home" 
                        onClick={() => {
                          setIsMenuOpen(false);
                          navigate('/');
                          window.scrollTo({ top: 0, behavior: 'auto' });
                        }}
                        icon={<Home className="w-5 h-5" />}
                        index={0}
                      />
                      
                      <MobileNavItem 
                        label="Services" 
                        isExpandable
                        subItems={[
                          'Cloud Practice',
                          'Digital & Product Engineering',
                          'Big Data',
                          'App Modernization',
                          'Security',
                          'Database Management',
                          'ERP & Testing'
                        ]}
                        onItemClick={(item) => {
                          setIsMenuOpen(false);
                          navigate(getServiceUrl(item));
                          window.scrollTo({ top: 0, behavior: 'auto' });
                        }}
                        index={1}
                      />
                      
                      <MobileNavItem 
                        label="AI" 
                        isExpandable
                        subItems={[
                          'BFSI Agents',
                          'Brand Management Agents'
                        ]}
                        onItemClick={(item) => {
                          setIsMenuOpen(false);
                          navigate(getAIUrl(item));
                          window.scrollTo({ top: 0, behavior: 'auto' });
                        }}
                        index={2}
                      />
                      
                      <MobileNavItem 
                        label="Products" 
                        isExpandable
                        subItems={[
                          'Atlas API Manager',
                          'Agent Studio',
                          'Ottohm Video',
                          'ITSM Ticketing',
                          'AI Ops Platform',
                          'Smart Contracts'
                        ]}
                        onItemClick={(item) => {
                          setIsMenuOpen(false);
                          navigate(getProductUrl(item));
                          window.scrollTo({ top: 0, behavior: 'auto' });
                        }}
                        index={3}
                      />
                      
                      <MobileNavItem 
                        label="Case Studies" 
                        onClick={() => {
                          setIsMenuOpen(false);
                          navigate('/case-studies');
                          window.scrollTo({ top: 0, behavior: 'auto' });
                        }}
                        index={4}
                      />
                      
                      <MobileNavItem 
                        label="Company" 
                        isExpandable
                        subItems={[
                          'About Us',
                          'Our Team',
                          'Partners',
                          'Careers',
                          'News & Updates',
                          'Wall of Fame',
                          'Contact Us'
                        ]}
                        onItemClick={(item) => {
                          setIsMenuOpen(false);
                          navigate(getWhoWeAreUrl(item));
                          window.scrollTo({ top: 0, behavior: 'auto' });
                        }}
                        index={5}
                      />
                    </motion.nav>

                    {/* Divider */}
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6"
                    />

                    {/* CTA Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <button 
                        onClick={() => handleMenuItemClick(onGetStartedClick)}
                        className="group relative w-full overflow-hidden rounded-full"
                        style={{
                          background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                        }}
                      >
                        {/* Animated glow */}
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
                          }}
                          animate={{
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        />
                        
                        <div className="relative px-6 py-4 flex items-center justify-center gap-2">
                          <Sparkles className="w-5 h-5 text-white" />
                          <span className="font-['Montserrat:Bold',sans-serif] text-[16px] text-white">
                            Get Started
                          </span>
                          <ChevronRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </button>
                    </motion.div>

                    {/* Footer */}
                    <motion.div 
                      className="mt-8 text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      <p className="text-white/30 text-[11px] font-['Montserrat',sans-serif]">
                        © 2025 ACC. All rights reserved.
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content from going under fixed header */}
      <div className="md:hidden h-[65px]" />
    </div>
  );
}

interface MobileNavItemProps {
  label: string;
  onClick?: () => void;
  isExpandable?: boolean;
  icon?: React.ReactNode;
  subItems?: string[];
  onItemClick?: (item: string) => void;
  index?: number;
}

function MobileNavItem({ label, onClick, isExpandable, icon, subItems = [], onItemClick, index }: MobileNavItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    if (isExpandable) {
      setIsExpanded(!isExpanded);
    } else {
      onClick?.();
    }
  };

  return (
    <div>
      <motion.button
        onClick={handleClick}
        className="w-full flex items-center justify-between py-4 px-5 rounded-xl text-white hover:bg-white/5 active:bg-white/10 transition-all text-left group"
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="flex items-center gap-3">
          {icon && <span className="text-purple-400">{icon}</span>}
          <span className="font-['Montserrat',sans-serif] font-medium text-[15px] group-hover:text-purple-300 transition-colors">
            {label}
          </span>
        </span>
        {isExpandable && (
          <ChevronDown 
            className={`w-4 h-4 text-white/60 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
          />
        )}
      </motion.button>
      
      <AnimatePresence>
        {isExpandable && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pl-8 pr-4 py-2 space-y-1">
              {subItems.map((item, index) => (
                <motion.button
                  key={item}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => onItemClick?.(item)}
                  className="w-full text-left py-3 px-4 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all font-['Montserrat',sans-serif] text-[14px]"
                  whileHover={{ x: 4 }}
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Breadcrumb Component (Standalone)
 * Can be used independently on pages
 */
interface BreadcrumbProps {
  items: Array<{ label: string; onClick?: () => void }>;
  className?: string;
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav className={`flex items-center gap-2 text-sm ${className}`} aria-label="Breadcrumb">
      <Home className="w-[10px] h-[10px] text-purple-400 flex-shrink-0 cursor-pointer" />
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-white/40 flex-shrink-0" />
          <span
            className={`${
              index === items.length - 1 
                ? 'text-white font-medium' 
                : 'text-white/60 hover:text-white cursor-pointer'
            } ${item.onClick ? 'cursor-pointer' : ''}`}
            onClick={item.onClick}
          >
            {item.label}
          </span>
        </div>
      ))}
    </nav>
  );
}

// Export wrapper that filters out Figma's internal props
export function MobileNav(props: MobileNavProps) {
  const { 
    currentPage, 
    breadcrumbs, 
    onLogoClick, 
    onMenuToggle,
    onServiceClick,
    onAIClick,
    onProductClick,
    onGrowWithUsClick,
    onWhoWeAreItemClick,
    onGetStartedClick
  } = props;
  return (
    <MobileNavComponent
      currentPage={currentPage}
      breadcrumbs={breadcrumbs}
      onLogoClick={onLogoClick}
      onMenuToggle={onMenuToggle}
      onServiceClick={onServiceClick}
      onAIClick={onAIClick}
      onProductClick={onProductClick}
      onGrowWithUsClick={onGrowWithUsClick}
      onWhoWeAreItemClick={onWhoWeAreItemClick}
      onGetStartedClick={onGetStartedClick}
    />
  );
}