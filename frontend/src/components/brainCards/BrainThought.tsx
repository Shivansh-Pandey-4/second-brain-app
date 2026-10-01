import { Brain, Quote } from "lucide-react";

export default function BrainThoughtCard({ link }: { link?: string }) {
  return (
    <div className="my-5 rounded-xl border bg-gradient-to-br from-purple-50 to-indigo-50 p-4 min-h-85">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 rounded-lg bg-white border shadow-sm">
          <Brain size={28} />
        </div>

        <div>
          <p className="text-sm text-purple-600 font-semibold">BRAIN-THOUGHT</p>

          <p className="text-sm text-gray-500">Personal/Random Links</p>
        </div>
      </div>

      <div className="relative rounded-lg bg-white border p-5 min-h-50">
        <Quote size={24} className="absolute top-3 left-3 text-gray-300" />

        <div className="flex flex-col items-center justify-center py-3">
          <p className="pt-5 text-gray-700 leading-7 italic">Click Here</p>
          <a
            className="hover:underline mt-2 text-blue-600"
            href={link}
            target="_blank"
          >
            Visit The Page
          </a>
        </div>
      </div>
    </div>
  );
}
