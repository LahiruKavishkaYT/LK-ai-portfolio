import React, { useState, useEffect, useMemo } from 'react';
import { Play, Linkedin, Quote, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from './ui/Reveal';
import { db } from '../lib/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

const TESTIMONIALS = [
  {
    id: '1',
    type: 'twitter',
    author: 'Alex Hormozi',
    handle: '@AlexHormozi',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop',
    content: "Just saw the workflow automation Lahiru built. It's not just code, it's printing money. The latency on the voice agent is actually insane. 🤯",
    date: '2d'
  },
  {
    id: '2',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop',
    videoUrl: 'https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_30fps.mp4',
    author: 'Sarah Jenkins',
    role: 'CEO, HealthFlow',
    duration: '0:30'
  },
  {
    id: '3',
    type: 'linkedin',
    author: 'David Park',
    role: 'Founder @ TechScale',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    content: "Working with Lahiru changed our entire operations. We went from 5 support staff to 1 AI agent handling 24/7 triage. The ROI was immediate.",
    date: '1w'
  },
  {
    id: '4',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop',
    videoUrl: 'https://videos.pexels.com/video-files/3130203/3130203-uhd_2560_1440_30fps.mp4',
    author: 'Michael Chen',
    role: 'Director, Apex Dental',
    duration: '0:25'
  },
  {
     id: '5',
     type: 'quote',
     content: "The system paid for itself in 14 days.",
     author: "Confidential Client",
     role: "Fintech"
  }
];

interface SkeletonProps {
  type?: 'text' | 'video';
}

const SkeletonCard: React.FC<SkeletonProps> = ({ type = 'text' }) => {
  if (type === 'video') {
    return (
      <div className="bg-[#0A0A0A] border border-white/5 rounded-xl overflow-hidden aspect-video w-full relative">
         <div className="absolute inset-0 bg-white/5 animate-pulse" />
         <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-14 h-14 rounded-full bg-white/10 animate-pulse shadow-lg" />
         </div>
         <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2 bg-gradient-to-t from-black/50 to-transparent">
            <div className="h-4 w-32 bg-white/10 rounded animate-pulse" />
            <div className="h-3 w-20 bg-white/5 rounded animate-pulse" />
         </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded-xl w-full flex flex-col gap-5 h-auto min-h-[200px]">
      <div className="flex items-center gap-3 animate-pulse">
          <div className="w-10 h-10 rounded-full bg-white/10 shrink-0"></div>
          <div className="flex-1 space-y-2">
              <div className="h-3 w-24 bg-white/10 rounded"></div>
              <div className="h-2 w-16 bg-white/5 rounded"></div>
          </div>
          <div className="w-4 h-4 bg-white/5 rounded ml-auto"></div>
      </div>
      <div className="space-y-3 animate-pulse flex-1 py-2">
          <div className="h-3 w-full bg-white/5 rounded"></div>
          <div className="h-3 w-[95%] bg-white/5 rounded"></div>
          <div className="h-3 w-[90%] bg-white/5 rounded"></div>
          <div className="h-3 w-[40%] bg-white/5 rounded"></div>
      </div>
      <div className="h-2 w-20 bg-white/5 rounded mt-auto animate-pulse"></div>
    </div>
  );
};

const TwitterCard = ({ item }: any) => (
  <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded-xl hover:border-white/10 transition-colors flex flex-col justify-between w-full h-auto">
    <div>
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3">
          <img src={item.avatar} alt={item.author} className="w-10 h-10 rounded-full object-cover block" />
          <div>
            <h4 className="font-bold text-white text-sm">{item.author}</h4>
            <p className="text-brand-text/60 text-xs">{item.handle}</p>
          </div>
        </div>
        <X size={16} className="text-white" fill="currentColor" />
      </div>
      <p className="text-brand-text text-sm leading-relaxed mb-4">{item.content}</p>
    </div>
    <div className="text-xs text-brand-text/40">{item.date} ago</div>
  </div>
);

const LinkedinCard = ({ item }: any) => (
  <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded-xl hover:border-white/10 transition-colors flex flex-col justify-between w-full h-auto">
    <div>
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3">
          <img src={item.avatar} alt={item.author} className="w-10 h-10 rounded-full object-cover block" />
          <div>
            <h4 className="font-bold text-white text-sm">{item.author}</h4>
            <p className="text-brand-text/60 text-xs">{item.role}</p>
          </div>
        </div>
        <Linkedin size={16} className="text-[#0A66C2]" fill="currentColor" />
      </div>
      <p className="text-brand-text text-sm leading-relaxed mb-4 line-clamp-4">{item.content}</p>
    </div>
    <div className="text-xs text-brand-text/40">Posted on LinkedIn</div>
  </div>
);

const VideoCard = ({ item, onClick }: { item: any, onClick: () => void }) => (
  <div 
    onClick={onClick}
    className="group relative bg-[#0A0A0A] border border-white/5 rounded-xl overflow-hidden aspect-video hover:border-brand-orange/30 transition-all cursor-pointer w-full h-auto"
    role="button"
    aria-label={`Play video testimonial from ${item.author}`}
  >
    <img src={item.thumbnail} alt={`Feedback from ${item.author}`} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 block" />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 group-hover:bg-brand-orange group-hover:border-brand-orange transition-all duration-300 shadow-xl">
        <Play size={20} fill="white" className="ml-1 text-white" />
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
        <div className="flex justify-between items-end">
            <div>
                <p className="font-bold text-white text-sm">{item.author}</p>
                <p className="text-xs text-brand-text/80">{item.role}</p>
            </div>
            <span className="text-[10px] font-mono bg-black/50 px-2 py-1 rounded border border-white/10 text-white/70">{item.duration}</span>
        </div>
    </div>
  </div>
);

const QuoteCard = ({ item }: any) => (
  <div className="bg-[#111] border border-white/5 p-8 rounded-xl flex flex-col justify-center items-center text-center min-h-[200px] hover:border-brand-orange/20 transition-all w-full h-auto">
    <Quote size={32} className="text-brand-orange mb-4 opacity-50" />
    <p className="text-white font-serif italic text-lg mb-4">"{item.content}"</p>
    <div>
        <p className="text-brand-text/50 text-xs uppercase tracking-widest font-bold">{item.author}</p>
        <p className="text-brand-text/30 text-[10px] uppercase tracking-widest">{item.role}</p>
    </div>
  </div>
);

const Feedback: React.FC = () => {
    const [activeVideo, setActiveVideo] = useState<string | null>(null);
    const [columnCount, setColumnCount] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [feedbacks, setFeedbacks] = useState<any[]>(TESTIMONIALS);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const q = query(collection(db, 'feedbacks'), orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);
                
                const newFeedbacks = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        type: data.type === 'written' ? 'quote' : 'video',
                        author: data.fullName,
                        role: data.role,
                        content: data.testimonial,
                        videoUrl: data.videoUrl,
                        thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop', // Default thumbnail
                        duration: 'User Story',
                        date: 'New'
                    };
                });

                setFeedbacks([...TESTIMONIALS, ...newFeedbacks]);
            } catch (error) {
                console.error("Error fetching feedbacks:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFeedbacks();
    }, []);

    useEffect(() => {
        const calculateColumns = () => {
            if (window.innerWidth >= 1024) return 3; 
            if (window.innerWidth >= 768) return 2;  
            return 1; 
        };
        
        const handleResize = () => {
            setColumnCount(calculateColumns());
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (activeVideo) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [activeVideo]);

    const columns = useMemo(() => {
        const cols = Array.from({ length: columnCount }, () => [] as any[]);
        feedbacks.forEach((item, index) => {
            cols[index % columnCount].push(item);
        });
        return cols;
    }, [columnCount, feedbacks]);

    const skeletonColumns = useMemo(() => {
        const skeletonItems = Array.from({ length: 6 }).map((_, i) => ({ 
            id: `skeleton-${i}`,
            type: (i === 1 || i === 3) ? 'video' : 'text' as 'text' | 'video'
        }));
        
        const cols = Array.from({ length: columnCount }, () => [] as typeof skeletonItems);
        skeletonItems.forEach((item, index) => {
            cols[index % columnCount].push(item);
        });
        return cols;
    }, [columnCount]);

    return (
        <section id="feedback" className="py-24 px-6 max-w-6xl mx-auto" aria-labelledby="feedback-heading">
             <Reveal width="100%">
                <div className="text-center mb-16">
                    <h2 id="feedback-heading" className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
                    <p className="text-brand-text font-light max-w-2xl mx-auto">Unfiltered feedback from the builders and enterprises I work with.</p>
                </div>
            </Reveal>

            <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 items-start">
                {isLoading ? (
                    skeletonColumns.map((colItems, colIndex) => (
                        <div key={`skel-col-${colIndex}`} className="flex-1 w-full flex flex-col gap-4 md:gap-6 lg:gap-8 min-w-0">
                            {colItems.map((item) => (
                                <SkeletonCard key={item.id} type={item.type} />
                            ))}
                        </div>
                    ))
                ) : (
                    columns.map((colItems, colIndex) => (
                        <div key={`col-${colIndex}`} className="flex-1 w-full flex flex-col gap-4 md:gap-6 lg:gap-8 min-w-0">
                            {colItems.map((item) => (
                                <Reveal key={item.id} width="100%" delay={0.1}>
                                    <div className="w-full">
                                        {item.type === 'twitter' && <TwitterCard item={item} />}
                                        {item.type === 'linkedin' && <LinkedinCard item={item} />}
                                        {item.type === 'quote' && <QuoteCard item={item} />}
                                        {item.type === 'video' && (
                                            <VideoCard 
                                                item={item} 
                                                onClick={() => setActiveVideo(item.videoUrl)} 
                                            />
                                        )}
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    ))
                )}
            </div>

            <AnimatePresence>
                {activeVideo && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
                        onClick={() => setActiveVideo(null)}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                onClick={() => setActiveVideo(null)}
                                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-white/20 text-white rounded-full transition-colors"
                                aria-label="Close video"
                            >
                                <X size={24} />
                            </button>
                            <div className="aspect-video">
                                <video 
                                    src={activeVideo} 
                                    controls 
                                    autoPlay 
                                    className="w-full h-full"
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
export default Feedback;