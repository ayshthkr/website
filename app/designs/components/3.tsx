import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function StackedCards() {
  // Example of custom blocks you could pass
  const customBlocks = [
    {
      id: 1,
      title: 'Welcome',
      content: (
        <div className="p-8 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
          <h1 className="text-5xl font-bold mb-6">My Portfolio</h1>
          <p className="text-2xl mb-8">Full-stack developer focused on React & TypeScript</p>
          <div className="flex gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700">
              View Projects
            </button>
            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-full hover:bg-blue-50">
              Contact Me
            </button>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: 'About Me',
      content: (
        <div className="p-8">
          <h2 className="text-4xl font-bold mb-6">About Me</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <p className="text-lg mb-4">
                I&apos;m a passionate developer with over 5 years of experience building web applications.
                I specialize in React, TypeScript, and modern front-end development.
              </p>
              <p className="text-lg">
                When I&apos;m not coding, you can find me hiking, reading, or experimenting with new technologies.
              </p>
            </div>
            <div className="flex-1 bg-gray-100 p-6 rounded-lg">
              <h3 className="font-bold text-xl mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Node.js', 'GraphQL', 'Tailwind CSS'].map(skill => (
                  <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: 'Projects',
      content: (
        <div className="p-8">
          <h2 className="text-4xl font-bold mb-8">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'E-commerce Platform',
                desc: 'A full-featured online store with React, Node.js and MongoDB',
                tags: ['React', 'Node.js', 'MongoDB']
              },
              {
                title: 'Task Management App',
                desc: 'Productivity tool with drag-and-drop interface and collaborative features',
                tags: ['TypeScript', 'Redux', 'Firebase']
              }
            ].map(project => (
              <div key={project.title} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="bg-gray-100 px-2 py-1 rounded text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: 'Services',
      content: (
        <div className="p-8">
          <h2 className="text-4xl font-bold mb-8">Services</h2>
          <div className="space-y-6">
            {[
              {
                title: 'Web Development',
                desc: 'Custom websites and web applications tailored to your business needs'
              },
              {
                title: 'UI/UX Design',
                desc: 'User-friendly interfaces with modern design principles'
              },
              {
                title: 'Mobile App Development',
                desc: 'Native and cross-platform mobile applications'
              }
            ].map(service => (
              <div key={service.title} className="flex gap-4 items-start">
                <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <p className="text-gray-600">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: 'Contact',
      content: (
        <div className="p-8">
          <h2 className="text-4xl font-bold mb-6">Get In Touch</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <p className="text-lg mb-6">
                Interested in working together? Fill out the form or reach out through social media.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>example@email.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+1 (123) 456-7890</span>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Name</label>
                  <input type="text" className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input type="email" className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Message</label>
                  <textarea className="w-full p-2 border border-gray-300 rounded h-32"></textarea>
                </div>
                <button className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      )
    },
  ];

  return (
    <div className="app">
      {/* Use the component with custom blocks */}
      <ScrollingBlocks blocks={customBlocks} />

      {/* Alternatively, use it with default blocks */}
      {/* <ScrollingBlocks /> */}
    </div>
  );
};

interface BlockContent {
  id: number;
  title: string;
  content: React.ReactNode;
}

interface ScrollingBlocksProps {
  blocks: BlockContent[];
}

const ScrollingBlocks: React.FC<ScrollingBlocksProps> = ({ blocks = [] }) => {
  const [activeBlockIndex, setActiveBlockIndex] = useState(0);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isAtBottom, setIsAtBottom] = useState(false);

  // Default blocks if none provided
  const defaultBlocks: BlockContent[] = [
    {
      id: 1,
      title: 'Introduction',
      content: (
        <div className="p-8">
          <h2 className="text-4xl font-bold mb-6">Welcome to Our Platform</h2>
          <p className="text-xl mb-4">This is a customizable scrolling block component.</p>
          <p className="text-lg">You can add any content you want in each block.</p>
        </div>
      )
    },
    {
      id: 2,
      title: 'Features',
      content: (
        <div className="p-8">
          <h2 className="text-4xl font-bold mb-6">Amazing Features</h2>
          <ul className="text-xl space-y-3">
            <li>✓ Smooth scrolling navigation</li>
            <li>✓ Dynamic content blocks</li>
            <li>✓ Animated transitions</li>
            <li>✓ Responsive design</li>
          </ul>
        </div>
      )
    },
    {
      id: 3,
      title: 'Benefits',
      content: (
        <div className="p-8">
          <h2 className="text-4xl font-bold mb-6">Why Choose Us</h2>
          <p className="text-xl mb-4">We provide the best user experience with our advanced scrolling system.</p>
          <div className="flex flex-col gap-4">
            <div className="p-4 bg-gray-100 rounded-lg">
              <h3 className="font-bold text-xl">Immersive Experience</h3>
              <p>Engage your users with smooth scrolling animations</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <h3 className="font-bold text-xl">Easy Navigation</h3>
              <p>Users can quickly navigate between sections</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: 'Testimonials',
      content: (
        <div className="p-8">
          <h2 className="text-4xl font-bold mb-6">What Our Users Say</h2>
          <div className="space-y-6">
            <blockquote className="italic border-l-4 border-gray-300 pl-4 py-2">
              &quot;This scrolling component changed how I build websites. It&apos;s incredible!&quot;
              <footer className="text-gray-600 mt-2">— Alex Johnson</footer>
            </blockquote>
            <blockquote className="italic border-l-4 border-gray-300 pl-4 py-2">
              &quot;The animations are so smooth. My visitors love navigating my site now.&quot;
              <footer className="text-gray-600 mt-2">— Sarah Miller</footer>
            </blockquote>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: 'Contact Us',
      content: (
        <div className="p-8">
          <h2 className="text-4xl font-bold mb-6">Get In Touch</h2>
          <p className="text-xl mb-6">We&apos;d love to hear from you and help with your project.</p>
          <div className="bg-gray-100 p-6 rounded-lg">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Your Name</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Your Email</label>
                <input type="email" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea className="w-full p-2 border border-gray-300 rounded h-24"></textarea>
              </div>
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Send Message
              </button>
            </div>
          </div>
        </div>
      )
    },
  ];

  // Use provided blocks or defaults
  const contentBlocks = blocks.length > 0 ? blocks : defaultBlocks;

  useEffect(() => {
    const checkIsAtBottom = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      return (scrollTop + windowHeight) >= docHeight - 20;
    };

    const handleScroll = () => {
      // Check if at bottom
      setIsAtBottom(checkIsAtBottom());

      // Find which block is most visible
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      let newActiveIndex = 0;

      // Find currently visible block
      for (let i = 0; i < blockRefs.current.length; i++) {
        const element = blockRefs.current[i];
        if (!element) continue;

        const { top, bottom } = element.getBoundingClientRect();
        const elementTop = top + window.scrollY;
        const elementBottom = bottom + window.scrollY;

        if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
          newActiveIndex = i;
          break;
        }
      }

      setActiveBlockIndex(newActiveIndex);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToBlock = (index: number) => {
    blockRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
  };

  // Helper to determine UI state based on scroll position
  const getUIState = () => {
    if (isAtBottom) return 'bottom';
    if (activeBlockIndex === 0) return 'initial';
    return 'middle';
  };

  const uiState = getUIState();

  // Animation variants
  const navItemVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 10, transition: { duration: 0.2 } }
  };

  const blockVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="relative">
      {/* Main content blocks */}
      {contentBlocks.map((block, index) => (
        <motion.div
          key={block.id}
          ref={el => { blockRefs.current[index] = el; }}
          className="min-h-screen flex flex-col justify-center items-center border border-gray-300"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={blockVariants}
        >
          <div className="w-full max-w-4xl mx-auto">
            {block.content}
          </div>
        </motion.div>
      ))}

      {/* Initial state - all blocks at bottom */}
      <AnimatePresence>
        {uiState === 'initial' && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-lg"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {contentBlocks.map((block, index) => (
              <motion.div
                key={`initial-${block.id}`}
                className="px-4 py-3 border-b border-gray-200 last:border-b-0 cursor-pointer hover:bg-gray-50"
                onClick={() => scrollToBlock(index)}
                variants={navItemVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ delay: index * 0.05 }}
              >
                <div className="text-center font-medium">{block.title}</div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Middle state - some blocks at top, some at bottom */}
      <AnimatePresence>
        {uiState === 'middle' && (
          <>
            {/* Top navigation for previous blocks */}
            <motion.div
              className="fixed top-0 left-0 right-0 bg-white border-b border-gray-300 shadow-lg z-10"
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              exit={{ y: -100 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {contentBlocks.slice(0, activeBlockIndex).map((block, index) => (
                <motion.div
                  key={`top-${block.id}`}
                  className="px-4 py-3 border-b border-gray-200 last:border-b-0 cursor-pointer hover:bg-gray-50"
                  onClick={() => scrollToBlock(index)}
                  variants={navItemVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="text-center font-medium">{block.title}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Bottom navigation for future blocks */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-lg z-10"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {contentBlocks.slice(activeBlockIndex + 1).map((block, index) => (
                <motion.div
                  key={`bottom-${block.id}`}
                  className="px-4 py-3 border-b border-gray-200 last:border-b-0 cursor-pointer hover:bg-gray-50"
                  onClick={() => scrollToBlock(activeBlockIndex + 1 + index)}
                  variants={navItemVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="text-center font-medium">{block.title}</div>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom state - all blocks at top */}
      <AnimatePresence>
        {uiState === 'bottom' && (
          <motion.div
            className="fixed top-0 left-0 right-0 bg-white border-b border-gray-300 shadow-lg z-10"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {contentBlocks.slice(0, contentBlocks.length - 1).map((block, index) => (
              <motion.div
                key={`bottom-state-${block.id}`}
                className="px-4 py-3 border-b border-gray-200 last:border-b-0 cursor-pointer hover:bg-gray-50"
                onClick={() => scrollToBlock(index)}
                variants={navItemVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ delay: index * 0.05 }}
              >
                <div className="text-center font-medium">{block.title}</div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
