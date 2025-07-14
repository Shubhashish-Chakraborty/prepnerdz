import { CloseCircle } from "@/icons/CloseCircle";
import Image from "next/image";
import { useEffect, useRef } from "react";

interface Resource {
  id: string;
  type: string;
  title: string;
  year: string;
  month: string;
  description: string;
  fileUrl: string;
  fileSize: number;
  fileType: string;
  subjectId: string;
  uploadedById: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  subject?: {
    id: string;
    subjectName: string;
    subjectCode: string;
    semesterId: string;
    semester?: {
      id: string;
      semNumber: number;
      branchId: string;
      branch?: {
        id: string;
        branchName: string;
      };
    };
  };
  uploadedBy?: {
    username: string;
  };
}

interface ResourceModalProps {
  open: boolean;
  onClose: () => void;
  resource: Resource | null;
}

export const ResourceModal = ({
  open,
  onClose,
  resource,
}: ResourceModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  const renderFilePreview = () => {
    if (!resource) return null;

    const fileType = resource.fileType.toLowerCase();
    const fileUrl = resource.fileUrl;

    if (fileType.includes("pdf")) {
      return (
        <iframe
          src={fileUrl}
          className="w-full h-[70vh] border rounded-lg"
          title={resource.title}
        />
      );
    } else if (fileType.includes("image")) {
      return (
        <div className="flex justify-center">
          <Image
            src={fileUrl}
            alt={resource.title}
            width={500}
            height={500}
            className="max-h-[70vh] max-w-full object-contain rounded-lg"
          />
        </div>
      );
    } else if (fileType.includes("video")) {
      return (
        <video controls className="w-full max-h-[70vh]">
          <source src={fileUrl} type={resource.fileType} />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return (
        <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
          <p className="text-gray-500">
            Preview not available for this file type.
            <a
              href={fileUrl}
              download
              className="ml-2 text-blue-500 hover:underline"
            >
              Download instead
            </a>
          </p>
        </div>
      );
    }
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto py-4">
          <div className="mx-auto w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[800px] px-4">
            <div
              ref={modalRef}
              className="bg-white p-4 rounded-2xl w-full max-h-[90vh] h-auto md:h-[850px] overflow-y-auto"
            >
              <div className="flex justify-end cursor-pointer sticky top-0 bg-white pb-2">
                <div onClick={onClose} className="p-1">
                  <CloseCircle className="size-6 md:size-10 hover:text-red-500 transition-all duration-300" />
                </div>
              </div>

              {resource ? (
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <h2 className="text-lg font-bold text-center md:text-3xl">
                      {resource.title}
                    </h2>
                    {/* <div className="flex flex-wrap gap-2 mt-2 text-sm text-gray-600">
                                            <span>Type: {resource.type}</span>
                                            <span>•</span>
                                            <span>Year: {resource.year}</span>
                                            <span>•</span>
                                            <span>Month: {resource.month}</span>
                                            {resource.subject?.branch && (
                                                <>
                                                    <span>•</span>
                                                    <span>Branch: {resource.subject.branch.branchName}</span>
                                                </>
                                            )}
                                            {resource.subject && (
                                                <>
                                                    <span>•</span>
                                                    <span>Subject: {resource.subject.subjectName}</span>
                                                </>
                                            )}
                                        </div> */}
                  </div>

                  {/* {resource.description && (
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h3 className="font-semibold mb-2">Description</h3>
                                            <p className="text-gray-700">{resource.description}</p>
                                        </div>
                                    )} */}

                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Preview</h3>
                    {renderFilePreview()}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64">
                  <p className="text-gray-500">No resource selected</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
