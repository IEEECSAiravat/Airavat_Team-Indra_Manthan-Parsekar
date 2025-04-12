import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function UploadEEG() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploadStatus('uploading');
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStatus('success');
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/edf': ['.edf'],
      'text/csv': ['.csv'],
      'text/plain': ['.txt'],
    },
  });

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Upload EEG Data</h1>
      
      <div className="max-w-2xl mx-auto">
        <div
          {...getRootProps()}
          className={`glass-panel p-12 text-center cursor-pointer transition-all ${
            isDragActive ? 'border-primary border-2' : ''
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="w-16 h-16 mx-auto mb-4 text-primary" />
          <p className="text-xl mb-2">
            {isDragActive
              ? "Drop your EEG file here"
              : "Drag & drop your EEG file here"}
          </p>
          <p className="text-sm text-white/50">
            Supported formats: .edf, .csv, .txt
          </p>
        </div>

        {uploadStatus !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 glass-panel p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              {uploadStatus === 'success' ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : uploadStatus === 'error' ? (
                <XCircle className="w-6 h-6 text-[rgb(var(--color-warning))]" />
              ) : null}
              <span className="font-semibold">
                {uploadStatus === 'success'
                  ? 'Upload Complete!'
                  : uploadStatus === 'error'
                  ? 'Upload Failed'
                  : 'Uploading...'}
              </span>
            </div>

            <div className="bg-white/10 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: '0%' }}
                animate={{ width: `${uploadProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}