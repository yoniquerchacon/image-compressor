'use client';

import React, { useState, useCallback } from 'react';
import imageCompression from 'browser-image-compression';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface CompressedImage {
  id: string;
  originalFile: File;
  originalSize: number;
  originalPreview: string;
  compressedFile: File | null;
  compressedSize: number | null;
  compressedPreview: string | null;
  compressionRatio: number | null;
  isCompressing: boolean;
  error: string | null;
}

type QualityLevel = 'low' | 'medium' | 'high';

const qualitySettings = {
  low: { maxSizeMB: 0.2, maxWidthOrHeight: 1920, quality: 0.6 },
  medium: { maxSizeMB: 0.5, maxWidthOrHeight: 1920, quality: 0.8 },
  high: { maxSizeMB: 1, maxWidthOrHeight: 2560, quality: 0.9 },
};

export default function ImageCompressor() {
  const [images, setImages] = useState<CompressedImage[]>([]);
  const [qualityLevel, setQualityLevel] = useState<QualityLevel>('medium');
  const [dragActive, setDragActive] = useState(false);
  const [isCompressingAll, setIsCompressingAll] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter(file => 
      file.type.startsWith('image/') && 
      ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)
    );

    if (imageFiles.length === 0) {
      alert('Por favor, sube archivos de imagen válidos (JPG, PNG, WebP)');
      return;
    }

    const newImages: CompressedImage[] = imageFiles.map(file => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      originalFile: file,
      originalSize: file.size,
      originalPreview: URL.createObjectURL(file),
      compressedFile: null,
      compressedSize: null,
      compressedPreview: null,
      compressionRatio: null,
      isCompressing: false,
      error: null,
    }));

    setImages(prev => [...prev, ...newImages]);
  };

  const compressImage = async (imageId: string) => {
    setImages(prev => prev.map(img => 
      img.id === imageId ? { ...img, isCompressing: true, error: null } : img
    ));

    try {
      const image = images.find(img => img.id === imageId);
      if (!image) return;

      const options = qualitySettings[qualityLevel];
      
      const compressedFile = await imageCompression(image.originalFile, {
        ...options,
        useWebWorker: true,
      });

      const compressedPreview = URL.createObjectURL(compressedFile);
      const compressionRatio = ((image.originalSize - compressedFile.size) / image.originalSize) * 100;

      setImages(prev => prev.map(img =>
        img.id === imageId
          ? {
              ...img,
              compressedFile,
              compressedSize: compressedFile.size,
              compressedPreview,
              compressionRatio,
              isCompressing: false,
            }
          : img
      ));
    } catch (error) {
      console.error('Error compressing image:', error);
      setImages(prev => prev.map(img =>
        img.id === imageId
          ? {
              ...img,
              isCompressing: false,
              error: 'Error al comprimir la imagen',
            }
          : img
      ));
    }
  };

  const compressAllImages = async () => {
    setIsCompressingAll(true);
    
    for (const image of images) {
      if (!image.compressedFile && !image.isCompressing) {
        await compressImage(image.id);
      }
    }
    
    setIsCompressingAll(false);
  };

  const downloadImage = (image: CompressedImage) => {
    if (!image.compressedFile) return;
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(image.compressedFile);
    link.download = `compressed-${image.originalFile.name}`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const downloadAllAsZip = async () => {
    const compressedImages = images.filter(img => img.compressedFile);
    
    if (compressedImages.length === 0) {
      alert('No hay imágenes comprimidas para descargar');
      return;
    }

    const zip = new JSZip();
    
    for (const image of compressedImages) {
      if (image.compressedFile) {
        zip.file(`compressed-${image.originalFile.name}`, image.compressedFile);
      }
    }

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    saveAs(zipBlob, 'imagenes-comprimidas.zip');
  };

  const removeImage = (imageId: string) => {
    setImages(prev => {
      const image = prev.find(img => img.id === imageId);
      if (image) {
        URL.revokeObjectURL(image.originalPreview);
        if (image.compressedPreview) {
          URL.revokeObjectURL(image.compressedPreview);
        }
      }
      return prev.filter(img => img.id !== imageId);
    });
  };

  const clearAll = () => {
    images.forEach(image => {
      URL.revokeObjectURL(image.originalPreview);
      if (image.compressedPreview) {
        URL.revokeObjectURL(image.compressedPreview);
      }
    });
    setImages([]);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-8">
        {images.length === 0 ? (
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-3 border-dashed rounded-xl p-12 text-center transition-all ${
              dragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <svg
              className="mx-auto h-16 w-16 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <div className="mb-4">
              <label htmlFor="file-upload" className="cursor-pointer">
                <span className="text-blue-600 hover:text-blue-500 font-semibold text-lg">
                  Selecciona imágenes
                </span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  multiple
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>
              <p className="text-gray-600 mt-2">o arrastra y suelta aquí</p>
            </div>
            <p className="text-sm text-gray-500">
              JPG, PNG, WebP (máx. 10MB por imagen)
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Puedes seleccionar múltiples imágenes a la vez
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {images.length} {images.length === 1 ? 'imagen' : 'imágenes'} cargada{images.length > 1 ? 's' : ''}
              </h3>
              <div className="flex gap-3">
                <label htmlFor="add-more" className="cursor-pointer">
                  <span className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium text-sm transition-colors">
                    + Agregar más
                  </span>
                  <input
                    id="add-more"
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    multiple
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>
                <button
                  onClick={clearAll}
                  className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium text-sm transition-colors"
                >
                  Limpiar todo
                </button>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Nivel de compresión:
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['low', 'medium', 'high'] as QualityLevel[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => setQualityLevel(level)}
                    className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                      qualityLevel === level
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {level === 'low' && '🔥 Alta (menor calidad)'}
                    {level === 'medium' && '⚡ Media (recomendado)'}
                    {level === 'high' && '✨ Baja (mejor calidad)'}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {qualityLevel === 'low' && 'Máxima compresión, calidad aceptable para web'}
                {qualityLevel === 'medium' && 'Balance perfecto entre tamaño y calidad'}
                {qualityLevel === 'high' && 'Mínima compresión, máxima calidad'}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={compressAllImages}
                disabled={isCompressingAll}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCompressingAll ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Comprimiendo...
                  </span>
                ) : (
                  `Comprimir todas (${images.filter(img => !img.compressedFile).length})`
                )}
              </button>
              {images.some(img => img.compressedFile) && (
                <button
                  onClick={downloadAllAsZip}
                  className="px-6 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl"
                >
                  📦 Descargar ZIP
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {images.map((image) => (
            <div
              key={image.id}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 truncate">
                    {image.originalFile.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Original: {formatFileSize(image.originalSize)}
                  </p>
                </div>
                <button
                  onClick={() => removeImage(image.id)}
                  className="text-gray-400 hover:text-red-600 transition-colors ml-2"
                  aria-label="Eliminar"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500 mb-2">Original</p>
                  <img
                    src={image.originalPreview}
                    alt="Original"
                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-2">Comprimida</p>
                  {image.compressedPreview ? (
                    <img
                      src={image.compressedPreview}
                      alt="Comprimida"
                      className="w-full h-32 object-cover rounded-lg border border-gray-200"
                    />
                  ) : (
                    <div className="w-full h-32 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">Sin comprimir</span>
                    </div>
                  )}
                </div>
              </div>

              {image.error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">{image.error}</p>
                </div>
              )}

              {image.compressedFile && image.compressionRatio !== null && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-green-800">
                      Reducido: {image.compressionRatio.toFixed(1)}%
                    </span>
                    <span className="text-sm text-green-700">
                      {formatFileSize(image.compressedSize!)}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                {!image.compressedFile && !image.isCompressing && (
                  <button
                    onClick={() => compressImage(image.id)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                  >
                    Comprimir
                  </button>
                )}
                {image.isCompressing && (
                  <button
                    disabled
                    className="flex-1 bg-gray-300 text-gray-600 font-medium py-2 px-4 rounded-lg text-sm cursor-not-allowed"
                  >
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Comprimiendo...
                    </span>
                  </button>
                )}
                {image.compressedFile && (
                  <button
                    onClick={() => downloadImage(image)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                  >
                    Descargar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
