'use client';

import { AxiosError } from "axios";
import { Home } from "@repo/ui/icons/Home";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster, toast } from 'react-hot-toast';

type Payload = Record<string, string | number>; // or define stricter interface if known


export default function DashboardLanding() {
    const router = useRouter();
    const [username, setUsername] = useState<string | null>(null);

    // Form states
    const [courseName, setCourseName] = useState('');
    const [branchName, setBranchName] = useState('');
    const [courseId, setCourseId] = useState('');
    const [semesterNum, setSemesterNum] = useState('');
    const [branchId, setBranchId] = useState('');
    const [subjectName, setSubjectName] = useState('');
    const [subjectCode, setSubjectCode] = useState('');
    const [semesterId, setSemesterId] = useState('');
    const [resource, setResource] = useState({
        subjectId: '',
        uploadedById: '',
        type: '',
        title: '',
        year: '',
        month: '',
        description: '',
        fileUrl: '',
        fileSize: 0,
        fileType: '',
    });

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user/session`, {
                    withCredentials: true,
                });
                const data = response.data;
                if (data.message?.isAuthenticated && data.message?.user?.role === 'ADMIN') {
                    setUsername(data.message.user.username);
                } else {
                    router.push("/");
                }
            } catch {
                router.push("/");
            }
        };
        fetchSession();
    }, [router]);

    const handleLogout = async () => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user/logout`, {}, { withCredentials: true });
            router.push("/");
        } catch (error) {
            console.log(error);
            toast.error("Logout failed!");
        }
    };

    // const submitData = async (path: string, data: any) => {
    //     try {
    //         await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${path}`, data, {
    //             withCredentials: true,
    //         });
    //         toast.success("Submitted successfully!");
    //     } catch (error: any) {
    //         toast.error(error?.response?.data?.message || "Submission failed!");
    //     }
    // };

    const submitData = async (path: string, data: Payload) => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${path}`, data, {
                withCredentials: true,
            });
            toast.success("Submitted successfully!");
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            toast.error(err?.response?.data?.message || "Submission failed!");
        }
    };

    return (
        <div className="bg-mainBgColor text-white min-h-screen overflow-hidden">
            <Toaster position="top-center" />

            <div className="flex justify-center items-center space-x-25 mt-10">
                <div onClick={() => router.push("/")} className="bg-white p-2 rounded-xl cursor-pointer hover:scale-110 transition-all duration-500">
                    <Home />
                </div>
                <div className="text-center font-extrabold text-xl md:text-4xl">
                    Welcome <span className="text-blue-500 underline">{username}</span>!
                </div>
                <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl text-white font-semibold">
                    Logout
                </button>
            </div>

            <div className="mt-20 flex flex-col items-center space-y-10">
                {/* Add Course */}
                <Section title="Add Course">
                    <input type="text" value={courseName} onChange={e => setCourseName(e.target.value)} placeholder="Course Name" className="input" />
                    <SubmitBtn onClick={() => submitData("api/v1/course/add", { courseName: courseName })} />
                </Section>

                {/* Add Branch */}
                <Section title="Add Branch">
                    <input type="text" value={branchName} onChange={e => setBranchName(e.target.value)} placeholder="Branch Name" className="input" />
                    <input type="text" value={courseId} onChange={e => setCourseId(e.target.value)} placeholder="Course ID" className="input" />
                    <SubmitBtn onClick={() => submitData("api/v1/branch/add", { branchName: branchName, courseId })} />
                </Section>

                {/* Add Semester */}
                <Section title="Add Semester">
                    <input type="text" value={semesterNum} onChange={e => setSemesterNum(e.target.value)} placeholder="Semester Number" className="input" />
                    <input type="text" value={branchId} onChange={e => setBranchId(e.target.value)} placeholder="Branch ID" className="input" />
                    <SubmitBtn onClick={() => submitData("api/v1/semester/add", { semNumber: parseInt(semesterNum), branchId })} />
                </Section>

                {/* Add Subject */}
                <Section title="Add Subject">
                    <input type="text" value={subjectName} onChange={e => setSubjectName(e.target.value)} placeholder="Subject Name" className="input" />
                    <input type="text" value={subjectCode} onChange={e => setSubjectCode(e.target.value)} placeholder="Subject Code" className="input" />
                    <input type="text" value={semesterId} onChange={e => setSemesterId(e.target.value)} placeholder="Semester ID" className="input" />
                    <SubmitBtn onClick={() => submitData("api/v1/subject/add", {
                        subjectName: subjectName,
                        subjectCode: subjectCode,
                        semesterId,
                    })} />
                </Section>

                {/* Add Resources */}
                <Section title="Add Resources">
                    <input type="text" placeholder="Subject ID" className="input" value={resource.subjectId} onChange={e => setResource({ ...resource, subjectId: e.target.value })} />
                    <input type="text" placeholder="Uploaded by ID" className="input" value={resource.uploadedById} onChange={e => setResource({ ...resource, uploadedById: e.target.value })} />
                    <select className="input" value={resource.type} onChange={e => setResource({ ...resource, type: e.target.value })}>
                        <option value="">Select Type</option>
                        <option value="SHIVANI_BOOKS">SHIVANI_BOOKS</option>
                        <option value="MID_SEM_PAPER">MID_SEM_PAPER</option>
                        <option value="END_SEM_PAPER">END_SEM_PAPER</option>
                        <option value="IMP_QUESTION">IMP_QUESTION</option>
                        <option value="IMP_TOPIC">IMP_TOPIC</option>
                        <option value="NOTES">NOTES</option>
                        <option value="LAB_MANUAL">LAB_MANUAL</option>
                        <option value="SYLLABUS">SYLLABUS</option>
                    </select>
                    <input type="text" placeholder="Title" className="input" value={resource.title} onChange={e => setResource({ ...resource, title: e.target.value })} />
                    <input type="text" placeholder="Year" className="input" value={resource.year} onChange={e => setResource({ ...resource, year: e.target.value })} />
                    <input type="text" placeholder="Month" className="input" value={resource.month} onChange={e => setResource({ ...resource, month: e.target.value })} />
                    <input type="text" placeholder="Description" className="input" value={resource.description} onChange={e => setResource({ ...resource, description: e.target.value })} />
                    <input type="text" placeholder="File URL" className="input" value={resource.fileUrl} onChange={e => setResource({ ...resource, fileUrl: e.target.value })} />
                    <input type="number" placeholder="File Size (in KB)" className="input" value={resource.fileSize} onChange={e => setResource({ ...resource, fileSize: parseInt(e.target.value) })} />
                    <input type="text" placeholder="File Type" className="input" value={resource.fileType} onChange={e => setResource({ ...resource, fileType: e.target.value })} />
                    <SubmitBtn onClick={() => submitData("api/v1/resource/add", resource)} />
                </Section>
            </div>
        </div>
    );
}

// === Reusable Components ===
const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="text-center">
        <div className="text-3xl font-bold text-amber-300 mb-4">{title}</div>
        <div className="flex flex-col items-center space-y-3">{children}</div>
    </div>
);

const SubmitBtn = ({ onClick }: { onClick: () => void }) => (
    <button onClick={onClick} className="bg-cyan-300 cursor-pointer hover:bg-cyan-500 px-4 py-2 rounded-xl text-black font-bold transition-all duration-300">
        Submit
    </button>
);
