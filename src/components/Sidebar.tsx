// import React from 'react';
// import { Brain, Upload, Pill, History, Menu } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useUIStore } from '../store/uiStore';

// const sidebarItems = [
//   { icon: Upload, label: 'Upload EEG', path: '/upload' },
//   { icon: Brain, label: 'View Digital Twin', path: '/digital-twin' },
//   { icon: Pill, label: 'Simulate Drug', path: '/simulate' },
//   { icon: History, label: 'View History', path: '/history' },
// ];

// export function Sidebar() {
//   const { isSidebarExpanded, setIsSidebarExpanded } = useUIStore();

//   return (
//     <motion.div
//       className={`fixed left-0 top-0 h-screen glass-panel m-4 flex flex-col items-center py-8 gap-8 transition-all duration-300 ${
//         isSidebarExpanded ? 'w-64' : 'w-20'
//       }`}
//       layout
//     >
//       <button
//         onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
//         className="w-8 h-8 text-white/50 hover:text-white cursor-pointer transition-colors"
//       >
//         <Menu />
//       </button>
//       <div className="flex flex-col gap-6 mt-8 w-full px-4">
//         {sidebarItems.map((item) => (
//           <motion.button
//             key={item.label}
//             className={`flex items-center gap-4 neon-button ${
//               isSidebarExpanded ? 'justify-start w-full' : 'justify-center w-12 h-12'
//             }`}
//             title={item.label}
//             layout
//           >
//             <item.icon className="w-6 h-6" />
//             <AnimatePresence>
//               {isSidebarExpanded && (
//                 <motion.span
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="whitespace-nowrap"
//                 >
//                   {item.label}
//                 </motion.span>
//               )}
//             </AnimatePresence>
//           </motion.button>
//         ))}
//       </div>
//     </motion.div>
//   );
// }
import React from 'react';
import { Brain, Upload, Pill, History, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '../store/uiStore';

const sidebarItems = [
  { icon: Upload, label: 'Upload EEG', path: 'upload' },
  { icon: Brain, label: 'View Digital Twin', path: 'digital-twin' },
  { icon: Pill, label: 'Simulate Drug', path: 'simulate' },
  { icon: History, label: 'View History', path: 'history' },
];

export function Sidebar({ onPageChange }: { onPageChange: (page: string) => void }) {
  const { isSidebarExpanded, setIsSidebarExpanded } = useUIStore();

  return (
    <motion.div
      className={`fixed left-0 top-0 h-screen glass-panel m-4 flex flex-col items-center py-8 gap-8 transition-all duration-300 ${
        isSidebarExpanded ? 'w-64' : 'w-20'
      }`}
      layout
    >
      <button
        onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
        className="w-8 h-8 text-white/50 hover:text-white cursor-pointer transition-colors"
      >
        <Menu />
      </button>
      <div className="flex flex-col gap-6 mt-8 w-full px-4">
        {sidebarItems.map((item) => (
          <motion.button
            key={item.label}
            onClick={() => onPageChange(item.path)} // Call onPageChange with the item's path
            className={`flex items-center gap-4 neon-button ${
              isSidebarExpanded ? 'justify-start w-full' : 'justify-center w-12 h-12'
            }`}
            title={item.label}
            layout
          >
            <item.icon className="w-6 h-6" />
            <AnimatePresence>
              {isSidebarExpanded && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}