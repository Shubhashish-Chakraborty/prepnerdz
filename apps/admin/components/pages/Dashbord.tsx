'use client';

import { AxiosError } from "axios";
import { Home } from "@repo/ui/icons/Home";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster, toast } from 'react-hot-toast';

type Payload = Record<string, string | number>;
type Option = {
    id: string;
    name: string;
} & {
    [key: string]: string | number | boolean | null | undefined;
};
// type Option = { id: string; name: string;[key: string]: any };

export default function DashboardLanding() {
    const router = useRouter();
    const [username, setUsername] = useState<string | null>(null);

    // Data states
    const [courses, setCourses] = useState<Option[]>([]);
    const [branches, setBranches] = useState<Option[]>([]);
    const [semesters, setSemesters] = useState<Option[]>([]);
    const [subjects, setSubjects] = useState<Option[]>([]);

    // Form states
    const [courseName, setCourseName] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [branchName, setBranchName] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('');
    const [semesterNum, setSemesterNum] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('');
    const [subjectName, setSubjectName] = useState('');
    const [subjectCode, setSubjectCode] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [superadmin, setSuperAdmin] = useState(false);


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
                    setResource(prev => ({ ...prev, uploadedById: data.message.user.id }));
                    fetchInitialData();
                } else {
                    router.push("/");
                }
            } catch {
                router.push("/");
            }
        };
        fetchSession();
    }, [router]);

    // Check for Shubhashish for superadmin access
    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user/session`, {
                    withCredentials: true,
                });
                const data = response.data;
                if (data.message.user.id === "cmcxr2inw0000js04os2u8mjm") {
                    setSuperAdmin(true);
                }
            } catch {
                router.push("/");
            }
        };
        fetchSession();
    }, [])
    

    const fetchInitialData = async () => {
        try {
            const [coursesRes] = await Promise.all([
                axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/db/data/courses`, { withCredentials: true })
            ]);
            setCourses(coursesRes.data);
        } catch (error) {
            console.error("Failed to fetch initial data:", error);
        }
    };

    const fetchBranches = async (courseId: string) => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/db/data/branches/${courseId}`, { withCredentials: true });
            setBranches(res.data);
            setSelectedCourse(courseId);
            setSelectedBranch('');
            setSemesters([]);
            setSelectedSemester('');
            setSubjects([]);
            setSelectedSubject('');
        } catch (error) {
            console.error("Failed to fetch branches:", error);
        }
    };

    const fetchSemesters = async (branchId: string) => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/db/data/semesters/${branchId}`, { withCredentials: true });
            setSemesters(res.data);
            setSelectedBranch(branchId);
            setSelectedSemester('');
            setSubjects([]);
            setSelectedSubject('');
        } catch (error) {
            console.error("Failed to fetch semesters:", error);
        }
    };

    const fetchSubjects = async (semesterId: string) => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/db/data/subjects/${semesterId}`, { withCredentials: true });
            setSubjects(res.data);
            setSelectedSemester(semesterId);
            setSelectedSubject('');
        } catch (error) {
            console.error("Failed to fetch subjects:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user/logout`, {}, { withCredentials: true });
            router.push("/");
        } catch (error) {
            console.log(error);
            toast.error("Logout failed!");
        }
    };

    const submitData = async (path: string, data: Payload) => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${path}`, data, {
                withCredentials: true,
            });
            toast.success("Submitted successfully!");
            // Refresh relevant data after submission
            if (path.includes('course')) fetchInitialData();
            if (path.includes('branch') && selectedCourse) fetchBranches(selectedCourse);
            if (path.includes('semester') && selectedBranch) fetchSemesters(selectedBranch);
            if (path.includes('subject') && selectedSemester) fetchSubjects(selectedSemester);
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            toast.error(err?.response?.data?.message || "Submission failed!");
        }
    };

    return (
        <div className="bg-mainBgColor text-white min-h-screen overflow-hidden">
            <Toaster position="top-center" />

            <div className="flex flex-col justify-center items-center space-y-4 mt-10">
                <div onClick={() => router.push("/")} className="bg-white p-2 rounded-xl cursor-pointer hover:scale-110 transition-all duration-500">
                    <Home />
                </div>
                <div className="text-center font-extrabold text-xl md:text-4xl">
                    Hello admin <span className="text-blue-500 underline">{username}</span>!
                </div>
                <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl text-white font-semibold">
                    Logout
                </button>
                {superadmin && (
                    <button onClick={() => router.push("/superadmin")} className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-xl text-white font-semibold">
                        Super Admin Dashboard
                    </button>
                )}
            </div>

            <div className="mt-20 flex flex-col items-center space-y-10 px-4">
                {/* Add Course */}
                <Section title="Add Course">
                    <input
                        type="text"
                        value={courseName}
                        onChange={e => setCourseName(e.target.value)}
                        placeholder="Course Name"
                        className="input"
                    />
                    <SubmitBtn onClick={() => submitData("api/v1/course/add", { courseName })} />
                </Section>

                {/* Add Branch */}
                <Section title="Add Branch">
                    <select
                        value={selectedCourse}
                        onChange={(e) => fetchBranches(e.target.value)}
                        className="input"
                        disabled={courses.length === 0}
                    >
                        <option value="">Select Course</option>
                        {courses.map(course => (
                            <option key={course.id} value={course.id}>
                                {course.courseName}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        value={branchName}
                        onChange={e => setBranchName(e.target.value)}
                        placeholder="Branch Name"
                        className="input"
                    />
                    <SubmitBtn
                        onClick={() => submitData("api/v1/branch/add", {
                            branchName,
                            courseId: selectedCourse
                        })}
                        disabled={!selectedCourse}
                    />
                </Section>

                {/* Add Semester */}
                <Section title="Add Semester">
                    <select
                        value={selectedBranch}
                        onChange={(e) => fetchSemesters(e.target.value)}
                        className="input"
                        disabled={branches.length === 0}
                    >
                        <option value="">Select Branch</option>
                        {branches.map(branch => (
                            <option key={branch.id} value={branch.id}>
                                {branch.branchName}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        value={semesterNum}
                        onChange={e => setSemesterNum(e.target.value)}
                        placeholder="Semester Number"
                        className="input"
                        min="1"
                    />
                    <SubmitBtn
                        onClick={() => submitData("api/v1/semester/add", {
                            semNumber: parseInt(semesterNum),
                            branchId: selectedBranch
                        })}
                        disabled={!selectedBranch || !semesterNum}
                    />
                </Section>

                {/* Add Subject */}
                <Section title="Add Subject">
                    <select
                        value={selectedSemester}
                        onChange={(e) => fetchSubjects(e.target.value)}
                        className="input"
                        disabled={semesters.length === 0}
                    >
                        <option value="">Select Semester</option>
                        {semesters.map(semester => (
                            <option key={semester.id} value={semester.id}>
                                Sem {semester.semNumber}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        value={subjectName}
                        onChange={e => setSubjectName(e.target.value)}
                        placeholder="Subject Name"
                        className="input"
                    />
                    <input
                        type="text"
                        value={subjectCode}
                        onChange={e => setSubjectCode(e.target.value)}
                        placeholder="Subject Code"
                        className="input"
                    />
                    <SubmitBtn
                        onClick={() => submitData("api/v1/subject/add", {
                            subjectName,
                            subjectCode,
                            semesterId: selectedSemester,
                        })}
                        disabled={!selectedSemester}
                    />
                </Section>

                {/* Add Resources */}
                <Section title="Add Resources">
                    <select
                        value={selectedSubject}
                        onChange={(e) => {
                            setSelectedSubject(e.target.value);
                            setResource(prev => ({ ...prev, subjectId: e.target.value }));
                        }}
                        className="input"
                        disabled={subjects.length === 0}
                    >
                        <option value="">Select Subject</option>
                        {subjects.map(subject => (
                            <option key={subject.id} value={subject.id}>
                                {subject.subjectName} ({subject.subjectCode})
                            </option>
                        ))}
                    </select>
                    <select
                        className="input"
                        value={resource.type}
                        onChange={e => setResource({ ...resource, type: e.target.value })}
                    >
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
                    <input
                        type="text"
                        placeholder="Title"
                        className="input"
                        value={resource.title}
                        onChange={e => setResource({ ...resource, title: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Year"
                        className="input"
                        value={resource.year}
                        onChange={e => setResource({ ...resource, year: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Month"
                        className="input"
                        value={resource.month}
                        onChange={e => setResource({ ...resource, month: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        className="input"
                        value={resource.description}
                        onChange={e => setResource({ ...resource, description: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="File URL"
                        className="input"
                        value={resource.fileUrl}
                        onChange={e => setResource({ ...resource, fileUrl: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="File Size (in KB)"
                        className="input"
                        value={resource.fileSize}
                        onChange={e => setResource({ ...resource, fileSize: parseInt(e.target.value) })}
                    />
                    <input
                        type="text"
                        placeholder="File Type"
                        className="input"
                        value={resource.fileType}
                        onChange={e => setResource({ ...resource, fileType: e.target.value })}
                    />
                    <SubmitBtn
                        onClick={() => submitData("api/v1/resource/add", resource)}
                        disabled={!selectedSubject}
                    />
                </Section>
            </div>
        </div>
    );
}

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="text-center w-full max-w-md">
        <div className="text-3xl font-bold text-amber-300 mb-4">{title}</div>
        <div className="flex flex-col items-center space-y-3 w-full">{children}</div>
    </div>
);

const SubmitBtn = ({ onClick, disabled = false }: { onClick: () => void, disabled?: boolean }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`bg-cyan-300 cursor-pointer hover:bg-cyan-500 px-4 py-2 rounded-xl text-black font-bold transition-all duration-300 w-full ${disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
    >
        Submit
    </button>
);

// Add this to your global CSS or Tailwind config:
// .input {
//   @apply w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500;
// }