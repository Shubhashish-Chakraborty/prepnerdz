import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";

dayjs.extend(relativeTime);

interface Resource {
  id: string;
  title: string;
  type: string;
  fileUrl: string;
  createdAt: string;
  subject?: {
    semester?: {
      semNumber: number;
      branch?: {
        name: string;
      };
    };
  };
}

export default function RecentlyAddedResources({ limit = 10 }: { limit?: number }) {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/resources/recent?limit=${limit}&subject=${subject}`)
      .then((res) => setResources(res.data))
      .catch(() => setResources([]))
      .finally(() => setLoading(false));
  }, [limit, subject]);

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 animate-pulse">Recently Added Resources</h2>
        <div className="mb-4 flex flex-col md:flex-row gap-2 md:gap-4 items-center">
          <input
            type="text"
            placeholder="Filter by subject/category..."
            value={subject}
            onChange={e => setSubject(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 w-full md:w-1/3"
          />
        </div>
        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : resources.length === 0 ? (
          <div className="text-gray-500">No recent resources found.</div>
        ) : (
          <div className="space-y-4">
            {resources.map((resource) => (
              <div key={resource.id} className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{resource.title}</h3>
                  <p className="text-sm text-gray-600">
                    {resource.subject?.semester?.branch?.name || "General"} • Semester {resource.subject?.semester?.semNumber}
                  </p>
                  <span className="text-xs text-gray-500 mr-2">{resource.type.replace(/_/g, " ")}</span>
                  <span className="text-xs text-gray-500">
                    {dayjs(resource.createdAt).fromNow()}
                  </span>
                  {dayjs().diff(dayjs(resource.createdAt), 'day') <= 3 && (
                    <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold animate-bounce">New</span>
                  )}
                </div>
                <Link href={resource.fileUrl} target="_blank" rel="noopener noreferrer" className="mt-2 md:mt-0 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium">View</Link>
              </div>
            ))}
          </div>
        )}
        <div className="mt-6 text-center">
          <Link href="/resources/recent" className="inline-block px-6 py-2 bg-yellow-500 text-white rounded font-semibold hover:bg-yellow-600 transition">View All</Link>
        </div>
      </div>
    </section>
  );
}
