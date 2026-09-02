import React, { useState, useRef, useEffect } from 'react';
import { X, Camera, Upload, RefreshCw, Check, AlertCircle, FlipHorizontal } from 'lucide-react';

export default function CameraModal({ isOpen, onClose, onImageCaptured }) {
  const [activeTab, setActiveTab] = useState('camera'); // 'camera' | 'upload'
  const [facingMode, setFacingMode] = useState('user'); // 'user' (front) | 'environment' (rear)
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const streamRef = useRef(null);

  // Start Camera Stream
  const startCamera = async () => {
    setCameraError(null);
    setIsStreaming(false);

    // Stop existing stream if any
    stopCamera();

    try {
      const constraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsStreaming(true);
      }
    } catch (err) {
      console.error('Camera Access Error:', err);
      setCameraError('Unable to access camera. Please check camera permissions or upload an image file from your device.');
      setIsStreaming(false);
    }
  };

  // Stop Camera Stream
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsStreaming(false);
  };

  useEffect(() => {
    if (isOpen && activeTab === 'camera' && !capturedImage) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen, activeTab, facingMode, capturedImage]);

  if (!isOpen) return null;

  // Snap Photo from Video Stream
  const handleSnapPhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Flip horizontally if front camera for natural selfie look
      if (facingMode === 'user') {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/png');
      setCapturedImage(dataUrl);
      stopCamera();
    }
  };

  // Handle File Upload from Device Gallery / File Picker
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCapturedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Toggle Camera Front / Rear
  const toggleFacingMode = () => {
    setFacingMode(prev => (prev === 'user' ? 'environment' : 'user'));
  };

  // Reset Captured Image & Restart Camera
  const handleRetake = () => {
    setCapturedImage(null);
    if (activeTab === 'camera') {
      startCamera();
    }
  };

  // Confirm Selection
  const handleConfirm = () => {
    if (capturedImage) {
      onImageCaptured(capturedImage);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl bg-brand-surface dark:bg-brand-surface light:bg-white border border-brand-border dark:border-white/10 light:border-slate-200 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-brand-violet/20 text-brand-violet">
              <Camera size={20} />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest text-brand-cyan uppercase">DEVICE IMAGE CAPTURE</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Upload or Take Photo</h3>
            </div>
          </div>
          <button
            onClick={() => { stopCamera(); onClose(); }}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Switcher (Live Camera vs File Upload) */}
        {!capturedImage && (
          <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-slate-900/60 light:bg-slate-100 border border-white/5">
            <button
              type="button"
              onClick={() => setActiveTab('camera')}
              className={`py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 ${
                activeTab === 'camera'
                  ? 'bg-brand-violet text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Camera size={15} />
              <span>Live Camera</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 ${
                activeTab === 'upload'
                  ? 'bg-brand-cyan text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Upload size={15} />
              <span>Device Upload</span>
            </button>
          </div>
        )}

        {/* LIVE CAMERA TAB */}
        {activeTab === 'camera' && !capturedImage && (
          <div className="space-y-4">
            <div className="relative aspect-video rounded-2xl bg-black overflow-hidden border border-white/10 flex items-center justify-center">
              
              {/* Video Element */}
              <video
                ref={videoRef}
                playsInline
                muted
                className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
              />

              {/* Hidden Canvas for Snap Capture */}
              <canvas ref={canvasRef} className="hidden" />

              {/* Camera Loading / Error Overlay */}
              {cameraError && (
                <div className="absolute inset-0 p-6 bg-slate-950/90 flex flex-col items-center justify-center text-center space-y-3 text-rose-300">
                  <AlertCircle size={32} className="text-rose-400" />
                  <p className="text-xs">{cameraError}</p>
                  <button
                    onClick={() => setActiveTab('upload')}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-bold hover:bg-slate-700"
                  >
                    Switch to File Upload
                  </button>
                </div>
              )}

              {/* Front/Rear Camera Flip Button for Mobile */}
              {isStreaming && (
                <button
                  onClick={toggleFacingMode}
                  className="absolute top-3 right-3 p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80 transition border border-white/20"
                  title="Switch Front/Rear Camera"
                >
                  <FlipHorizontal size={18} />
                </button>
              )}

            </div>

            {/* Snap Button */}
            {isStreaming && (
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleSnapPhoto}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-brand-violet to-brand-cyan text-white text-xs font-black shadow-xl hover:opacity-95 transition flex items-center space-x-2 transform active:scale-95"
                >
                  <Camera size={18} />
                  <span>Snap Photo</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* DEVICE UPLOAD TAB */}
        {activeTab === 'upload' && !capturedImage && (
          <div className="space-y-4">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="p-8 border-2 border-dashed border-white/20 hover:border-brand-violet rounded-2xl bg-slate-900/40 light:bg-slate-50 text-center space-y-3 cursor-pointer transition"
            >
              <div className="w-12 h-12 rounded-full bg-brand-violet/20 text-brand-violet mx-auto flex items-center justify-center">
                <Upload size={24} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Click to upload photo from your device</h4>
                <p className="text-xs text-slate-400 mt-1">Supports PNG, JPG, JPEG, WEBP or Mobile Camera Gallery</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>
        )}

        {/* PREVIEW & CONFIRMATION SECTION */}
        {capturedImage && (
          <div className="space-y-4 animate-fadeIn">
            <span className="text-[10px] font-bold uppercase text-slate-400">PHOTO PREVIEW</span>
            <div className="relative aspect-square max-w-xs mx-auto rounded-2xl overflow-hidden border-2 border-brand-violet shadow-2xl">
              <img src={capturedImage} alt="Captured preview" className="w-full h-full object-cover" />
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={handleRetake}
                className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center justify-center space-x-1.5"
              >
                <RefreshCw size={15} />
                <span>Retake / Choose Another</span>
              </button>

              <button
                type="button"
                onClick={handleConfirm}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-brand-violet to-brand-cyan text-white text-xs font-black shadow-lg transition flex items-center justify-center space-x-1.5"
              >
                <Check size={16} />
                <span>Use This Photo</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
