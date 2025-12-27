import React, { useState, useRef, useEffect } from 'react';
import { Type, Video, Upload, Camera, Info, StopCircle, Play, Trash2, Check, X, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { db, storage } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const FeedbackForm = () => {
  const [activeTab, setActiveTab] = useState<'written' | 'video'>('written');
  const [formData, setFormData] = useState({
    fullName: '',
    role: '',
    testimonial: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Recording State
  const [isRecordingMode, setIsRecordingMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsRecordingMode(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access camera. Please ensure permissions are granted.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const startRecording = () => {
    if (!videoRef.current?.srcObject) return;
    
    const stream = videoRef.current.srcObject as MediaStream;
    const mediaRecorder = new MediaRecorder(stream);
    
    mediaRecorderRef.current = mediaRecorder;
    chunksRef.current = [];

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setRecordedVideo(url);
      setVideoBlob(blob);
      stopCamera();
    };

    mediaRecorder.start();
    setIsRecording(true);
    
    // Start Timer
    setRecordingTime(0);
    timerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const resetRecording = () => {
    setRecordedVideo(null);
    setVideoBlob(null);
    startCamera();
  };

  const cancelRecording = () => {
    stopCamera();
    setIsRecordingMode(false);
    setRecordedVideo(null);
    setVideoBlob(null);
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      let videoUrl = '';

      // 1. Upload Video if exists
      if (activeTab === 'video' && videoBlob) {
        const filename = `testimonials/${Date.now()}_${Math.random().toString(36).substring(7)}.webm`;
        const storageRef = ref(storage, filename);
        const snapshot = await uploadBytes(storageRef, videoBlob);
        videoUrl = await getDownloadURL(snapshot.ref);
      }

      // 2. Save Metadata to Firestore
      await addDoc(collection(db, 'feedbacks'), {
        fullName: formData.fullName,
        role: formData.role,
        type: activeTab,
        testimonial: activeTab === 'written' ? formData.testimonial : null,
        videoUrl: videoUrl || null,
        createdAt: serverTimestamp(),
        status: 'pending'
      });

      setSubmitStatus('success');
      setFormData({ fullName: '', role: '', testimonial: '' });
      setRecordedVideo(null);
      setVideoBlob(null);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center max-w-lg backdrop-blur-sm"
        >
          <div className="w-20 h-20 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-brand-orange/20">
            <Check size={40} className="text-brand-orange" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Thank You!</h2>
          <p className="text-gray-400 mb-8">
            Your feedback has been submitted successfully. We appreciate you taking the time to share your experience.
          </p>
          <button 
            onClick={() => setSubmitStatus('idle')}
            className="text-brand-orange hover:text-white font-medium transition-colors"
          >
            Submit another response
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/5 p-1 rounded-lg flex gap-1">
            <button
              onClick={() => setActiveTab('written')}
              className={`flex items-center gap-2 px-6 py-2 rounded-md transition-all duration-300 ${
                activeTab === 'written'
                  ? 'bg-brand-orange text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Type size={18} />
              <span className="font-medium">WRITTEN</span>
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`flex items-center gap-2 px-6 py-2 rounded-md transition-all duration-300 ${
                activeTab === 'video'
                  ? 'bg-brand-orange text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Video size={18} />
              <span className="font-medium">VIDEO</span>
            </button>
          </div>
        </div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Jane Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-orange transition-colors"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Role / Company
                </label>
                <input
                  type="text"
                  placeholder="CEO, Apex Dental"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-orange transition-colors"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                />
              </div>
            </div>

            {activeTab === 'written' ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-2"
              >
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Testimonial
                </label>
                <textarea
                  rows={6}
                  placeholder="Tell us about the impact of the automation..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-orange transition-colors resize-none"
                  value={formData.testimonial}
                  onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-2 border-dashed border-white/10 rounded-xl overflow-hidden bg-black/20 relative"
              >
                {!isRecordingMode ? (
                  recordedVideo ? (
                    <div className="p-8">
                      <div className="w-full aspect-video bg-black rounded-lg overflow-hidden mb-4 relative group">
                        <video src={recordedVideo} className="w-full h-full object-contain bg-black" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            type="button" 
                            onClick={() => setIsRecordingMode(true)} 
                            className="p-4 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all transform hover:scale-110"
                          >
                            <Play size={32} fill="currentColor" />
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-center gap-6">
                        <button 
                          type="button" 
                          onClick={() => { setRecordedVideo(null); setVideoBlob(null); }} 
                          className="text-sm text-red-400 hover:text-red-300 flex items-center gap-2 transition-colors"
                        >
                          <Trash2 size={16} /> Remove Video
                        </button>
                        <button 
                          type="button" 
                          onClick={() => { setRecordedVideo(null); startCamera(); }} 
                          className="text-sm text-gray-400 hover:text-white flex items-center gap-2 transition-colors"
                        >
                          <Camera size={16} /> Re-record
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-12 text-center hover:border-brand-orange/50 transition-colors group cursor-pointer">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-orange/10 transition-colors">
                          <Upload className="text-gray-400 group-hover:text-brand-orange" size={32} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-1">Upload Video Recording</h3>
                          <p className="text-sm text-gray-500">MP4, MOV or WEBM. Max 50MB.</p>
                        </div>
                        
                        <div className="flex items-center gap-3 w-full max-w-[200px] my-2">
                          <div className="h-px bg-white/10 flex-1"></div>
                          <span className="text-xs font-bold text-gray-500">OR</span>
                          <div className="h-px bg-white/10 flex-1"></div>
                        </div>

                        <button
                          type="button"
                          onClick={startCamera}
                          className="flex items-center gap-2 text-brand-orange hover:text-brand-orange-light font-semibold transition-colors"
                        >
                          <Camera size={20} />
                          LAUNCH RECORDER
                        </button>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="relative w-full aspect-video bg-black flex flex-col items-center justify-center">
                    {recordedVideo ? (
                      <div className="w-full h-full relative">
                        <video 
                          src={recordedVideo} 
                          controls 
                          className="w-full h-full object-contain" 
                        />
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 z-10 pointer-events-none">
                          <div className="pointer-events-auto flex gap-4">
                            <button
                              type="button"
                              onClick={resetRecording}
                              className="flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors font-medium"
                            >
                              <Trash2 size={18} />
                              Retake
                            </button>
                            <button
                              type="button"
                              onClick={() => setIsRecordingMode(false)}
                              className="flex items-center gap-2 px-6 py-2 bg-brand-orange rounded-full text-white hover:bg-brand-orange-light transition-colors font-medium shadow-lg shadow-brand-orange/20"
                            >
                              <Check size={18} />
                              Use Video
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <video 
                          ref={videoRef} 
                          autoPlay 
                          muted 
                          playsInline 
                          className="w-full h-full object-cover transform scale-x-[-1]" 
                        />
                        
                        {/* Overlay Controls */}
                        <div className="absolute top-4 right-4 z-10">
                           <button
                            type="button"
                            onClick={cancelRecording}
                            className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
                          >
                            <X size={20} />
                          </button>
                        </div>

                        <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-4 z-10">
                          <div className="bg-black/60 backdrop-blur-sm px-4 py-1 rounded-full text-white font-mono text-sm border border-white/10">
                            {formatTime(recordingTime)}
                          </div>
                          
                          {!isRecording ? (
                            <button
                              type="button"
                              onClick={startRecording}
                              className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
                            >
                              <div className="w-12 h-12 rounded-full bg-red-500"></div>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={stopRecording}
                              className="w-16 h-16 rounded-full border-4 border-white/50 flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
                            >
                              <div className="w-8 h-8 rounded-md bg-red-500 animate-pulse"></div>
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || (activeTab === 'video' && !videoBlob) || (activeTab === 'written' && !formData.testimonial)}
              className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-gray-200 transition-colors mt-8 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  SUBMITTING...
                </>
              ) : (
                'SUBMIT EXPERIENCE'
              )}
            </button>
          </form>
        </motion.div>

        {/* Pro Tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 border border-brand-orange/30 bg-brand-orange/5 rounded-xl p-6 flex gap-4"
        >
          <div className="w-1 bg-brand-orange rounded-full shrink-0"></div>
          <div>
            <h4 className="text-brand-orange font-bold text-sm mb-1">PRO TIP</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Video testimonials are 12x more likely to be featured on the main architecture page. Focus on the ROI and time saved!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeedbackForm;
