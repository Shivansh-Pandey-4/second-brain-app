import { ExternalLink, FileText } from "lucide-react";

export default function DocumentCard({ link }: { link?: string }) {
  return (
    <div className="my-5 rounded-xl border bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 rounded-lg bg-white border shadow-sm">
          <FileText size={30} />
        </div>

        <div>
          <p className="text-sm text-gray-500">DOCUMENT</p>

          <p className="font-medium">Saved document</p>
        </div>
      </div>

      <div className="rounded-lg bg-white border p-4">
        <div className="flex flex-col items-center justify-center py-6">
          <FileText size={50} className="text-gray-400 mb-3" />

          <p className="text-gray-600 mb-4">Open this document</p>

          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Open Document
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
