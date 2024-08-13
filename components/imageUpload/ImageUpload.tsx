'use client';

import React, { useState, useEffect } from 'react';
import { CloudUpload, Check } from 'lucide-react';
import { Card } from '../ui/card';
import { toast } from 'sonner';
import { saveImageToPublic } from '@/app/actions';

interface ImageUploadProps {
  onClientUploadComplete?: (res: { url: string }[]) => void;
  onUploadError?: (e: Error) => void;
  maxFiles?: number; // Nova propriedade para definir a quantidade máxima de arquivos
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onClientUploadComplete,
  onUploadError,
  maxFiles = 5, // Valor padrão de 5 arquivos
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      if (filesArray.length + selectedFiles.length <= maxFiles) {
        setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
      } else {
        toast.error(`Você pode selecionar no máximo ${maxFiles} arquivos.`);
      }
    }
  };

  const handleUpload = async () => {
    setLoading(true);
    setUploadProgress(0);

    try {
      const uploadedFiles: { url: string }[] = [];
      const totalFiles = selectedFiles.length;

      const fileEntries = Array.from(selectedFiles.entries());

      for (const [index, file] of fileEntries) {
        const formData = new FormData();
        formData.append('image', file);

        const response = await saveImageToPublic(formData);
        if (response) {
          uploadedFiles.push({ url: response });
          setUploadProgress(((index + 1) / totalFiles) * 100);
        } else {
          throw new Error(`Falha ao carregar imagem ${file.name}.`);
        }
      }
      setSelectedFiles([]);
      if (onClientUploadComplete) {
        onClientUploadComplete(uploadedFiles);
      }
    } catch (error) {
      console.error(error);
      toast.error('Erro ao carregar imagens.');
      if (onUploadError) {
        onUploadError(error as Error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (uploadProgress === 100) {
      const timer = setTimeout(() => setUploadProgress(0), 2000);
      return () => clearTimeout(timer);
    }
  }, [uploadProgress]);

  return (
    <Card className="p-4 flex flex-col items-center justify-center border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition duration-300 h-full">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="file-upload"
        multiple
        onChange={handleFileChange}
      />
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center space-y-2 w-full h-full"
      >
        <CloudUpload className="w-8 h-8 text-gray-400" />
        {selectedFiles.length > 0 ? (
          <>
            {selectedFiles.length > 2 ? (
              <p className="text-center text-gray-600">
                {selectedFiles.length} imagens selecionadas
              </p>
            ) : (
              <span className="text-sm text-gray-500">ou arraste e solte</span>
            )}
            <div className="relative mt-4 w-full flex justify-center">
              <button
                onClick={handleUpload}
                disabled={loading}
                className={`relative inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none transition-all duration-500 ${
                  loading ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'
                }`}
                style={{
                  background: `linear-gradient(to right, #38a169 ${uploadProgress}%, #4299e1 ${uploadProgress}%)`,
                }}
              >
                {loading ? (
                  uploadProgress === 100 ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    `Carregando ${Math.round(uploadProgress)}%`
                  )
                ) : (
                  `Carregar ${selectedFiles.length} imagen${selectedFiles.length > 1 ? 's' : ''}`
                )}
              </button>
            </div>
          </>
        ) : (
          <>
            <span className="text-sm text-sky-700 font-bold">
              Selecionar imagens
            </span>
            <span className="text-sm text-gray-500">ou arraste e solte</span>
          </>
        )}
      </label>
    </Card>
  );
};

export default ImageUpload;
