import { FileText, Upload, Download, Eye, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Document } from "../data/mockData";

interface DocumentSharingProps {
  documents: Document[];
  onUpload?: (files: File[]) => void;
  onDelete?: (id: string) => void;
}

export default function DocumentSharing({ 
  documents,
  onUpload,
  onDelete 
}: DocumentSharingProps) {
  const categories = Array.from(new Set(documents.map(d => d.category)));

  return (
    <div className="space-y-4">
      {/* Upload Section */}
      <Card className="p-6 border-dashed">
        <div className="text-center">
          <Upload className="h-8 w-8 mx-auto mb-3 text-slate-400" />
          <h3 className="font-semibold mb-2">Upload Documents</h3>
          <p className="text-sm text-slate-600 mb-4">
            Share medical records, photos, or other case-related files
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Upload className="h-4 w-4 mr-2" />
            Choose Files
          </Button>
        </div>
      </Card>

      {/* Documents by Category */}
      <div className="space-y-6">
        {categories.map((category) => {
          const categoryDocs = documents.filter(d => d.category === category);
          
          return (
            <div key={category}>
              <h3 className="font-semibold mb-3 text-slate-700">{category}</h3>
              <div className="space-y-2">
                {categoryDocs.map((doc) => (
                  <Card key={doc.id} className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{doc.name}</h4>
                        <p className="text-xs text-slate-500">
                          {doc.size} • Uploaded by {doc.uploadedBy} • {doc.uploadedAt}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                        {doc.uploadedBy === "You" && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-red-600 hover:text-red-700"
                            onClick={() => onDelete?.(doc.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {documents.length === 0 && (
        <Card className="p-8 text-center">
          <FileText className="h-12 w-12 mx-auto mb-3 text-slate-300" />
          <p className="text-slate-500">No documents uploaded yet</p>
        </Card>
      )}
    </div>
  );
}
