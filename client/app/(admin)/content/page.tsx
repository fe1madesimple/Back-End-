"use client";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import {
  BookOpen,
  HelpCircle,
  Scale,
  BarChart2,
  Plus,
  Edit2,
  Trash2,
  X,
  Download,
  FileText,
  ChevronDown,
  ChevronRight,
  Search,
  Video,
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertCircle,
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Star,
  Users,
  Play,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import Pagination from "@/components/ui/Pagination";
import { usePagination } from "@/lib/usePagination";
import {
  subjects,
  modules,
  lessons,
  mcqs,
  caseBriefs,
  contentStats,
  practiceLibraryQuestions,
  lessonQuestions,
  subjectModuleTree,
} from "@/lib/dummy-data";
import CustomSelect from "@/components/ui/CustomSelect";
import styles from "./content.module.css";

const formatDuration = (secs: number | null) => {
  if (!secs) return "—";
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

type ToastType = {
  message: string;
  type: "success" | "danger" | "warning" | "info";
};

type ModalMode = "add" | "edit" | "view";
type PracticeQuestion = (typeof practiceLibraryQuestions)[number];
type PracticeExamType = PracticeQuestion["examType"];
type PracticeMonth = PracticeQuestion["month"];
type LessonQuestion = (typeof lessonQuestions)[number];

export default function ContentPage() {
  const [contentTab, setContentTab] = useState<
    | "subjects"
    | "modules"
    | "lessons"
    | "mcqs"
    | "practiceLibrary"
    | "lessonQuestions"
    | "caselaw"
    | "analytics"
  >("subjects");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<ToastType | null>(null);

  const [practiceQuestions, setPracticeQuestions] = useState<
    PracticeQuestion[]
  >(practiceLibraryQuestions);
  const [lessonQuestionBank, setLessonQuestionBank] =
    useState<LessonQuestion[]>(lessonQuestions);

  const [practiceSubjectFilter, setPracticeSubjectFilter] = useState("All");
  const [practiceYearFilter, setPracticeYearFilter] = useState("All");
  const [practiceTypeFilter, setPracticeTypeFilter] = useState<
    "All" | PracticeExamType
  >("All");

  const [lessonSubjectFilter, setLessonSubjectFilter] = useState("All");
  const [lessonSearch, setLessonSearch] = useState("");

  const [practiceModal, setPracticeModal] = useState<{
    mode: "add" | "edit";
    item: PracticeQuestion | null;
  } | null>(null);
  const [lessonQuestionModal, setLessonQuestionModal] = useState<{
    mode: "add" | "edit";
    item: LessonQuestion | null;
  } | null>(null);

  const [practiceForm, setPracticeForm] = useState<{
    subject: string;
    year: number;
    month: PracticeMonth;
    examType: PracticeExamType;
    description: string;
    text: string;
    attempts: number;
    avgScore: number;
  }>({
    subject: subjects[0]?.name ?? "Tort Law",
    year: 2024,
    month: "March",
    examType: "Essay",
    description: "",
    text: "",
    attempts: 0,
    avgScore: 0,
  });

  const [lessonQuestionForm, setLessonQuestionForm] = useState<{
    subject: string;
    lessonTitle: string;
    text: string;
    lessonId: string;
    moduleNumber: number;
    attempts: number;
    avgScore: number;
  }>({
    subject: subjects[0]?.name ?? "Company Law",
    lessonTitle: "",
    text: "",
    lessonId: "",
    moduleNumber: 1,
    attempts: 0,
    avgScore: 0,
  });

  // Subjects & Lessons state
  const [expandedSubject, setExpandedSubject] = useState<string | null>("s1");
  const [expandedModule, setExpandedModule] = useState<string | null>("m1");
  const [subjectModal, setSubjectModal] = useState<{
    mode: ModalMode;
    item: (typeof subjects)[0] | null;
  } | null>(null);
  const [moduleModal, setModuleModal] = useState<{
    mode: ModalMode;
    item: (typeof modules)[0] | null;
    subjectId: string;
  } | null>(null);
  const [lessonModal, setLessonModal] = useState<{
    mode: ModalMode;
    item: (typeof lessons)[0] | null;
    moduleId: string;
  } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    type: string;
    name: string;
    id: string;
  } | null>(null);

  // MCQ state
  const [mcqSubjectFilter, setMcqSubjectFilter] = useState("All");
  const [mcqDifficultyFilter, setMcqDifficultyFilter] = useState("All");
  const [mcqModal, setMcqModal] = useState<{
    mode: ModalMode;
    item: (typeof mcqs)[0] | null;
    lessonId?: string;
  } | null>(null);
  const [mcqPage, setMcqPage] = useState(1);
  const MCQ_PER_PAGE = 8;

  // Case Law state
  const [caseSearch, setCaseSearch] = useState("");
  const [caseJurisdiction, setCaseJurisdiction] = useState("All");
  const [caseSubjectFilter, setCaseSubjectFilter] = useState("All");
  const [caseModal, setCaseModal] = useState<{
    mode: ModalMode;
    item: (typeof caseBriefs)[0] | null;
  } | null>(null);
  const [casePage, setCasePage] = useState(1);
  const CASES_PER_PAGE = 8;

  const showToast = (message: string, type: ToastType["type"] = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const truncate = (value: string, max: number) =>
    value.length > max ? `${value.slice(0, max - 3)}...` : value;

  const scoreClass = (score: number) =>
    score >= 65
      ? styles.scoreGreen
      : score >= 50
        ? styles.scoreAmber
        : styles.scoreRed;

  const subjectColorByName = useMemo(
    () =>
      Object.fromEntries(subjects.map((s) => [s.name, s.color])) as Record<
        string,
        string
      >,
    [],
  );

  const practiceYears = useMemo(
    () =>
      Array.from(new Set(practiceQuestions.map((q) => q.year))).sort(
        (a, b) => b - a,
      ),
    [practiceQuestions],
  );

  const filteredPracticeQuestions = useMemo(
    () =>
      practiceQuestions.filter((q) => {
        const subjectMatch =
          practiceSubjectFilter === "All" ||
          q.subject === practiceSubjectFilter;
        const yearMatch =
          practiceYearFilter === "All" || q.year === Number(practiceYearFilter);
        const typeMatch =
          practiceTypeFilter === "All" || q.examType === practiceTypeFilter;
        return subjectMatch && yearMatch && typeMatch;
      }),
    [
      practiceQuestions,
      practiceSubjectFilter,
      practiceYearFilter,
      practiceTypeFilter,
    ],
  );

  const {
    page: practicePage,
    setPage: setPracticePage,
    paginated: paginatedPractice,
    total: practiceTotal,
    reset: resetPracticePage,
  } = usePagination(filteredPracticeQuestions, 15);

  useEffect(() => {
    resetPracticePage();
  }, [
    practiceSubjectFilter,
    practiceYearFilter,
    practiceTypeFilter,
    resetPracticePage,
  ]);

  const filteredLessonQuestions = useMemo(
    () =>
      lessonQuestionBank.filter((q) => {
        const subjectMatch =
          lessonSubjectFilter === "All" || q.subject === lessonSubjectFilter;
        const searchMatch =
          lessonSearch.trim() === "" ||
          q.lessonTitle.toLowerCase().includes(lessonSearch.toLowerCase());
        return subjectMatch && searchMatch;
      }),
    [lessonQuestionBank, lessonSubjectFilter, lessonSearch],
  );

  const {
    page: lessonQuestionPage,
    setPage: setLessonQuestionPage,
    paginated: paginatedLessonQuestions,
    total: lessonQuestionTotal,
    reset: resetLessonQuestionPage,
  } = usePagination(filteredLessonQuestions, 15);

  useEffect(() => {
    resetLessonQuestionPage();
  }, [lessonSubjectFilter, lessonSearch, resetLessonQuestionPage]);

  const openPracticeModal = (mode: "add" | "edit", item?: PracticeQuestion) => {
    if (mode === "edit" && item) {
      setPracticeForm({
        subject: item.subject,
        year: item.year,
        month: item.month,
        examType: item.examType,
        description: item.description,
        text: item.text,
        attempts: item.attempts,
        avgScore: item.avgScore,
      });
      setPracticeModal({ mode, item });
      return;
    }

    setPracticeForm({
      subject: subjects[0]?.name ?? "Tort Law",
      year: new Date().getFullYear(),
      month: "March",
      examType: "Essay",
      description: "",
      text: "",
      attempts: 0,
      avgScore: 0,
    });
    setPracticeModal({ mode: "add", item: null });
  };

  const savePracticeQuestion = () => {
    if (!practiceForm.text.trim() || !practiceForm.description.trim()) return;

    if (practiceModal?.mode === "edit" && practiceModal.item) {
      setPracticeQuestions((prev) =>
        prev.map((q) =>
          q.id === practiceModal.item!.id
            ? {
                ...q,
                subject: practiceForm.subject,
                year: Number(practiceForm.year),
                month: practiceForm.month,
                examType: practiceForm.examType,
                description: practiceForm.description,
                text: practiceForm.text,
                attempts: Number(practiceForm.attempts),
                avgScore: Number(practiceForm.avgScore),
              }
            : q,
        ),
      );
      setPracticeModal(null);
      showToast("✓ Question updated", "success");
      return;
    }

    const maxId = practiceQuestions.reduce((max, q) => {
      const idNumber = Number(q.id.replace("plq", ""));
      return Number.isNaN(idNumber) ? max : Math.max(max, idNumber);
    }, 0);

    const nextQuestion: PracticeQuestion = {
      id: `plq${maxId + 1}`,
      subject: practiceForm.subject,
      year: Number(practiceForm.year),
      month: practiceForm.month,
      examType: practiceForm.examType,
      description: practiceForm.description,
      text: practiceForm.text,
      attempts: Number(practiceForm.attempts),
      avgScore: Number(practiceForm.avgScore),
    };

    setPracticeQuestions((prev) => [nextQuestion, ...prev]);
    setPracticeModal(null);
    showToast("✓ Question added to Practice Library", "success");
  };

  const deletePracticeQuestion = (id: string) => {
    if (!window.confirm("Delete this question?")) return;
    setPracticeQuestions((prev) => prev.filter((q) => q.id !== id));
    showToast("✓ Question deleted", "danger");
  };

  const openLessonQuestionModal = (
    mode: "add" | "edit",
    item?: LessonQuestion,
  ) => {
    if (mode === "edit" && item) {
      setLessonQuestionForm({
        subject: item.subject,
        lessonTitle: item.lessonTitle,
        text: item.text,
        lessonId: item.lessonId,
        moduleNumber: item.moduleNumber,
        attempts: item.attempts,
        avgScore: item.avgScore,
      });
      setLessonQuestionModal({ mode, item });
      return;
    }

    setLessonQuestionForm({
      subject: subjects[0]?.name ?? "Company Law",
      lessonTitle: "",
      text: "",
      lessonId: "",
      moduleNumber: 1,
      attempts: 0,
      avgScore: 0,
    });
    setLessonQuestionModal({ mode: "add", item: null });
  };

  const saveLessonQuestion = () => {
    if (
      !lessonQuestionForm.text.trim() ||
      !lessonQuestionForm.lessonTitle.trim()
    )
      return;

    if (lessonQuestionModal?.mode === "edit" && lessonQuestionModal.item) {
      setLessonQuestionBank((prev) =>
        prev.map((q) =>
          q.id === lessonQuestionModal.item!.id
            ? {
                ...q,
                subject: lessonQuestionForm.subject,
                lessonTitle: lessonQuestionForm.lessonTitle,
                text: lessonQuestionForm.text,
                lessonId: lessonQuestionForm.lessonId,
                moduleNumber: Number(lessonQuestionForm.moduleNumber),
                attempts: Number(lessonQuestionForm.attempts),
                avgScore: Number(lessonQuestionForm.avgScore),
              }
            : q,
        ),
      );
      setLessonQuestionModal(null);
      showToast("✓ Lesson question updated", "success");
      return;
    }

    const maxId = lessonQuestionBank.reduce((max, q) => {
      const idNumber = Number(q.id.replace("lq", ""));
      return Number.isNaN(idNumber) ? max : Math.max(max, idNumber);
    }, 0);

    const nextQuestion: LessonQuestion = {
      id: `lq${maxId + 1}`,
      subject: lessonQuestionForm.subject,
      lessonTitle: lessonQuestionForm.lessonTitle,
      text: lessonQuestionForm.text,
      lessonId: lessonQuestionForm.lessonId || `lesson-${Date.now()}`,
      moduleNumber: Number(lessonQuestionForm.moduleNumber),
      attempts: Number(lessonQuestionForm.attempts),
      avgScore: Number(lessonQuestionForm.avgScore),
    };

    setLessonQuestionBank((prev) => [nextQuestion, ...prev]);
    setLessonQuestionModal(null);
    showToast("✓ Lesson question added", "success");
  };

  const deleteLessonQuestion = (id: string) => {
    if (!window.confirm("Delete this lesson question?")) return;
    setLessonQuestionBank((prev) => prev.filter((q) => q.id !== id));
    showToast("✓ Lesson question deleted", "danger");
  };

  const handleExport = (format: string) =>
    showToast(`✓ Exporting as ${format}...`, "info");

  // Lesson rich text editor
  const lessonEditor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Write lesson content here..." }),
    ],
    content: "",
    immediatelyRender: false,
  });

  const transcriptEditor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Paste or write video transcript here...",
      }),
    ],
    content: "",
    immediatelyRender: false,
  });

  const caseEditor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Write the full case summary..." }),
    ],
    content: "",
    immediatelyRender: false,
  });

  // Filtered MCQs
  const filteredMCQs = mcqs.filter((q) => {
    const matchSearch =
      search === "" || q.text.toLowerCase().includes(search.toLowerCase());
    const matchDiff =
      mcqDifficultyFilter === "All" || q.difficulty === mcqDifficultyFilter;
    const matchSubject =
      mcqSubjectFilter === "All" || q.subjectId === mcqSubjectFilter;
    return matchSearch && matchDiff && matchSubject;
  });
  const mcqTotalPages = Math.ceil(filteredMCQs.length / MCQ_PER_PAGE);
  const paginatedMCQs = filteredMCQs.slice(
    (mcqPage - 1) * MCQ_PER_PAGE,
    mcqPage * MCQ_PER_PAGE,
  );

  // Filtered Cases
  const filteredCases = caseBriefs.filter((c) => {
    const matchSearch =
      caseSearch === "" ||
      c.caseName.toLowerCase().includes(caseSearch.toLowerCase()) ||
      c.citation.toLowerCase().includes(caseSearch.toLowerCase()) ||
      c.legalPrinciple?.toLowerCase().includes(caseSearch.toLowerCase());
    const matchJuris =
      caseJurisdiction === "All" || c.jurisdiction === caseJurisdiction;
    const matchSubject =
      caseSubjectFilter === "All" || c.subjects.includes(caseSubjectFilter);
    return matchSearch && matchJuris && matchSubject;
  });
  const caseTotalPages = Math.ceil(filteredCases.length / CASES_PER_PAGE);
  const paginatedCases = filteredCases.slice(
    (casePage - 1) * CASES_PER_PAGE,
    casePage * CASES_PER_PAGE,
  );

  const difficultyVariant = (d: string): "success" | "warning" | "danger" =>
    d === "Easy" ? "success" : d === "Medium" ? "warning" : "danger";

  const passRateColor = (rate: number) =>
    rate >= 80 ? "var(--green)" : rate >= 60 ? "var(--amber)" : "var(--red)";

  // ─── RENDER ────────────────────────────────────────────────────

  return (
    <div className={styles.page}>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Content Management</h1>
          <p className={styles.subtitle}>
            Manage all subjects, lessons, MCQs and case law on the platform
          </p>
        </div>
        <div className={styles.headerActions}>
          <button
            className={styles.exportBtn}
            onClick={() => handleExport("PDF")}
          >
            <FileText size={14} /> Export PDF
          </button>
          <button
            className={styles.exportBtn}
            onClick={() => handleExport("Excel")}
          >
            <Download size={14} /> Export Excel
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className={styles.statsGrid}>
        {[
          {
            icon: BookOpen,
            color: "#E6027D",
            label: "Subjects",
            value: contentStats.totalSubjects,
            sub: `${contentStats.publishedSubjects} published`,
          },
          {
            icon: BookOpen,
            color: "#FDC300",
            label: "Lessons",
            value: contentStats.totalLessons,
            sub: `${contentStats.publishedLessons} published`,
          },
          {
            icon: HelpCircle,
            color: "#5F3EB5",
            label: "MCQ Questions",
            value: contentStats.totalMCQs,
            sub: `Avg pass rate ${contentStats.avgMCQPassRate}%`,
          },
          {
            icon: Scale,
            color: "#B38513",
            label: "Case Briefs",
            value: contentStats.totalCaseBriefs,
            sub: `${contentStats.frequentlyTestedCases} frequently tested`,
          },
          {
            icon: Video,
            color: "#961C81",
            label: "Video Lessons",
            value: contentStats.totalVideoContent,
            sub: `${Math.round(contentStats.totalVideoSeconds / 3600)}h total`,
          },
          {
            icon: TrendingUp,
            color: "#009DDD",
            label: "Storage Used",
            value: `${contentStats.estimatedStorageGB}GB`,
            sub: "Cloudinary media",
          },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className={styles.statCard}>
              <div
                className={styles.statIconWrap}
                style={{ background: s.color + "20" }}
              >
                <Icon size={18} color={s.color} />
              </div>
              <div>
                <div className={styles.statLabel}>{s.label}</div>
                <div className={styles.statValue} style={{ color: s.color }}>
                  {s.value}
                </div>
                <div className={styles.statSub}>{s.sub}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className={styles.tabBar}>
        {[
          { key: "subjects", label: "Subjects & Lessons", icon: BookOpen },
          { key: "mcqs", label: "MCQ Bank", icon: HelpCircle },
          { key: "practiceLibrary", label: "Practice Library", icon: FileText },
          { key: "lessonQuestions", label: "Lesson Questions", icon: BookOpen },
          { key: "caselaw", label: "Case Law", icon: Scale },
          { key: "analytics", label: "Analytics", icon: BarChart2 },
        ].map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.key}
              className={`${styles.tab} ${contentTab === t.key ? styles.tabActive : ""}`}
              onClick={() => setContentTab(t.key as typeof contentTab)}
            >
              <Icon size={15} />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* ═══ SUBJECTS & LESSONS TAB ═══ */}
      {contentTab === "subjects" && (
        <div className={styles.card}>
          <div className={styles.cardTopBar}>
            <div className={styles.cardTopLeft}>
              <h3 className={styles.cardTitle}>Subjects & Modules</h3>
              <p className={styles.cardSub}>
                Manage the full content hierarchy
              </p>
            </div>
            <button
              className={styles.addBtn}
              onClick={() => setSubjectModal({ mode: "add", item: null })}
            >
              <Plus size={14} /> Add Subject
            </button>
          </div>

          <div className={styles.subjectList}>
            {subjects.map((subject) => {
              const subModules = modules.filter(
                (m) => m.subjectId === subject.id,
              );
              const isExpanded = expandedSubject === subject.id;
              return (
                <div key={subject.id} className={styles.subjectItem}>
                  {/* Subject row */}
                  <div
                    className={styles.subjectRow}
                    onClick={() =>
                      setExpandedSubject(isExpanded ? null : subject.id)
                    }
                  >
                    <div className={styles.subjectLeft}>
                      <div className={styles.subjectChevron}>
                        {isExpanded ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )}
                      </div>
                      <div
                        className={styles.subjectColor}
                        style={{ background: subject.color }}
                      />
                      <div>
                        <div className={styles.subjectName}>{subject.name}</div>
                        <div className={styles.subjectMeta}>
                          {subject.moduleCount} modules · {subject.lessonCount}{" "}
                          lessons · {subject.mcqCount} MCQs
                        </div>
                      </div>
                    </div>
                    <div
                      className={styles.subjectRight}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Badge
                        label={subject.isPublished ? "Published" : "Draft"}
                        variant={subject.isPublished ? "success" : "default"}
                      />
                      <button
                        className={styles.iconActionBtn}
                        onClick={() =>
                          setSubjectModal({ mode: "edit", item: subject })
                        }
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        className={styles.iconActionBtn}
                        onClick={() =>
                          setDeleteConfirm({
                            type: "Subject",
                            name: subject.name,
                            id: subject.id,
                          })
                        }
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Modules */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className={styles.moduleList}>
                          {subModules.map((mod) => {
                            const modLessons = lessons.filter(
                              (l) => l.moduleId === mod.id,
                            );
                            const isModExpanded = expandedModule === mod.id;
                            return (
                              <div key={mod.id} className={styles.moduleItem}>
                                {/* Module row */}
                                <div
                                  className={styles.moduleRow}
                                  onClick={() =>
                                    setExpandedModule(
                                      isModExpanded ? null : mod.id,
                                    )
                                  }
                                >
                                  <div className={styles.moduleLeft}>
                                    <div className={styles.moduleChevron}>
                                      {isModExpanded ? (
                                        <ChevronDown size={14} />
                                      ) : (
                                        <ChevronRight size={14} />
                                      )}
                                    </div>
                                    <div>
                                      <div className={styles.moduleName}>
                                        {mod.name}
                                      </div>
                                      <div className={styles.moduleMeta}>
                                        {mod.lessonCount} lessons ·{" "}
                                        {mod.mcqCount} MCQs
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className={styles.moduleRight}
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <Badge
                                      label={
                                        mod.isPublished ? "Published" : "Draft"
                                      }
                                      variant={
                                        mod.isPublished ? "success" : "default"
                                      }
                                    />
                                    <button
                                      className={styles.iconActionBtn}
                                      onClick={() =>
                                        setModuleModal({
                                          mode: "edit",
                                          item: mod,
                                          subjectId: subject.id,
                                        })
                                      }
                                    >
                                      <Edit2 size={12} />
                                    </button>
                                    <button
                                      className={styles.iconActionBtn}
                                      onClick={() =>
                                        setDeleteConfirm({
                                          type: "Module",
                                          name: mod.name,
                                          id: mod.id,
                                        })
                                      }
                                    >
                                      <Trash2 size={12} />
                                    </button>
                                    <button
                                      className={styles.addSmallBtn}
                                      onClick={() =>
                                        setLessonModal({
                                          mode: "add",
                                          item: null,
                                          moduleId: mod.id,
                                        })
                                      }
                                    >
                                      <Plus size={12} /> Lesson
                                    </button>
                                  </div>
                                </div>

                                {/* Lessons */}
                                <AnimatePresence>
                                  {isModExpanded && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      exit={{ opacity: 0, height: 0 }}
                                      transition={{ duration: 0.18 }}
                                      style={{ overflow: "hidden" }}
                                    >
                                      <div className={styles.lessonList}>
                                        {modLessons.length === 0 && (
                                          <div className={styles.emptyLessons}>
                                            No lessons yet — add the first
                                            lesson
                                          </div>
                                        )}
                                        {modLessons.map((lesson) => (
                                          <div
                                            key={lesson.id}
                                            className={styles.lessonRow}
                                            onClick={() =>
                                              setLessonModal({
                                                mode: "view",
                                                item: lesson,
                                                moduleId: mod.id,
                                              })
                                            }
                                          >
                                            <div className={styles.lessonLeft}>
                                              <div
                                                className={
                                                  styles.lessonOrderBadge
                                                }
                                              >
                                                {lesson.order}
                                              </div>
                                              <div>
                                                <div
                                                  className={styles.lessonTitle}
                                                >
                                                  {lesson.title}
                                                </div>
                                                <div
                                                  className={styles.lessonMeta}
                                                >
                                                  {lesson.videoUrl ? (
                                                    <>
                                                      <Video size={11} />{" "}
                                                      {formatDuration(
                                                        lesson.videoDuration,
                                                      )}
                                                    </>
                                                  ) : (
                                                    <span
                                                      style={{
                                                        color: "var(--red)",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 4,
                                                      }}
                                                    >
                                                      <XCircle size={11} /> No
                                                      video
                                                    </span>
                                                  )}
                                                  {" · "}
                                                  {lesson.avgCompletionRate >
                                                    0 && (
                                                    <>
                                                      <TrendingUp size={11} />{" "}
                                                      {lesson.avgCompletionRate}
                                                      % completion
                                                    </>
                                                  )}
                                                  {" · "}
                                                  {lesson.totalViews > 0 && (
                                                    <>
                                                      <Users size={11} />{" "}
                                                      {lesson.totalViews} views
                                                    </>
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                            <div
                                              className={styles.lessonRight}
                                              onClick={(e) =>
                                                e.stopPropagation()
                                              }
                                            >
                                              <Badge
                                                label={
                                                  lesson.isPublished
                                                    ? "Published"
                                                    : "Draft"
                                                }
                                                variant={
                                                  lesson.isPublished
                                                    ? "success"
                                                    : "default"
                                                }
                                              />
                                              <button
                                                className={styles.iconActionBtn}
                                                onClick={() =>
                                                  setLessonModal({
                                                    mode: "edit",
                                                    item: lesson,
                                                    moduleId: mod.id,
                                                  })
                                                }
                                              >
                                                <Edit2 size={12} />
                                              </button>
                                              <button
                                                className={styles.iconActionBtn}
                                                onClick={() =>
                                                  setDeleteConfirm({
                                                    type: "Lesson",
                                                    name: lesson.title,
                                                    id: lesson.id,
                                                  })
                                                }
                                              >
                                                <Trash2 size={12} />
                                              </button>
                                            </div>
                                          </div>
                                        ))}
                                        <button
                                          className={styles.addLessonInline}
                                          onClick={() =>
                                            setLessonModal({
                                              mode: "add",
                                              item: null,
                                              moduleId: mod.id,
                                            })
                                          }
                                        >
                                          <Plus size={13} /> Add lesson to{" "}
                                          {mod.name}
                                        </button>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                          <button
                            className={styles.addModuleInline}
                            onClick={() =>
                              setModuleModal({
                                mode: "add",
                                item: null,
                                subjectId: subject.id,
                              })
                            }
                          >
                            <Plus size={13} /> Add module to {subject.name}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ═══ MCQ BANK TAB ═══ */}
      {contentTab === "mcqs" && (
        <div className={styles.card}>
          <div className={styles.cardTopBar}>
            <div className={styles.cardTopLeft}>
              <h3 className={styles.cardTitle}>MCQ Question Bank</h3>
              <p className={styles.cardSub}>
                {filteredMCQs.length} questions · Avg pass rate{" "}
                {contentStats.avgMCQPassRate}%
              </p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                className={styles.exportBtn}
                onClick={() => handleExport("Excel")}
              >
                <Download size={13} /> Export
              </button>
              <button
                className={styles.addBtn}
                onClick={() => setMcqModal({ mode: "add", item: null })}
              >
                <Plus size={14} /> Add MCQ
              </button>
            </div>
          </div>

          {/* MCQ Filters */}
          <div className={styles.filterRow}>
            <div className={styles.searchWrap}>
              <Search size={14} className={styles.searchIcon} />
              <input
                className={styles.searchInput}
                placeholder="Search questions..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setMcqPage(1);
                }}
              />
            </div>
            <select
              className={styles.selectInput}
              value={mcqSubjectFilter}
              onChange={(e) => {
                setMcqSubjectFilter(e.target.value);
                setMcqPage(1);
              }}
            >
              <option value="All">All Subjects</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            <select
              className={styles.selectInput}
              value={mcqDifficultyFilter}
              onChange={(e) => {
                setMcqDifficultyFilter(e.target.value);
                setMcqPage(1);
              }}
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* MCQ Table */}
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  {[
                    "Question",
                    "Lesson",
                    "Difficulty",
                    "Attempts",
                    "Pass Rate",
                    "Avg Time",
                    "Exam Year",
                    "Actions",
                  ].map((h) => (
                    <th key={h} className={styles.th}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedMCQs.map((q) => (
                  <tr
                    key={q.id}
                    className={styles.tr}
                    onClick={() => setMcqModal({ mode: "view", item: q })}
                    style={{ cursor: "pointer" }}
                  >
                    <td className={styles.td}>
                      <div className={styles.qText}>{q.text}</div>
                      <div className={styles.qMeta}>
                        {subjects.find((s) => s.id === q.subjectId)?.name} ·
                        Module{" "}
                        {modules.find((m) => m.id === q.moduleId)?.order ?? "-"}
                      </div>
                    </td>
                    <td className={styles.td}>
                      <span className={styles.qMeta}>
                        {truncate(
                          lessons.find((l) => l.id === q.lessonId)?.title ??
                            "Unknown lesson",
                          28,
                        )}
                      </span>
                    </td>
                    <td className={styles.td}>
                      <Badge
                        label={q.difficulty}
                        variant={difficultyVariant(q.difficulty)}
                      />
                    </td>
                    <td className={styles.td}>
                      <span className={styles.numText}>{q.totalAttempts}</span>
                    </td>
                    <td className={styles.td}>
                      <div className={styles.passRateWrap}>
                        <span
                          style={{
                            color: passRateColor(q.passRate),
                            fontWeight: 600,
                            fontSize: 14,
                          }}
                        >
                          {q.passRate}%
                        </span>
                        <div className={styles.passRateBar}>
                          <div
                            className={styles.passRateFill}
                            style={{
                              width: `${q.passRate}%`,
                              background: passRateColor(q.passRate),
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className={styles.td}>
                      <span className={styles.numText}>{q.avgTimeSecs}s</span>
                    </td>
                    <td className={styles.td}>
                      <span className={styles.numText}>{q.examYear}</span>
                    </td>
                    <td
                      className={styles.td}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className={styles.rowActions}>
                        <button
                          className={styles.iconActionBtn}
                          onClick={() => setMcqModal({ mode: "edit", item: q })}
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          className={styles.iconActionBtnDanger}
                          onClick={() =>
                            setDeleteConfirm({
                              type: "MCQ",
                              name: q.text.slice(0, 40) + "...",
                              id: q.id,
                            })
                          }
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MCQ Pagination */}
          <div className={styles.paginationRow}>
            <span className={styles.paginationInfo}>
              Showing {(mcqPage - 1) * MCQ_PER_PAGE + 1}–
              {Math.min(mcqPage * MCQ_PER_PAGE, filteredMCQs.length)} of{" "}
              {filteredMCQs.length}
            </span>
            <div className={styles.pagination}>
              <button
                className={styles.pageBtn}
                onClick={() => setMcqPage((p) => Math.max(1, p - 1))}
                disabled={mcqPage === 1}
              >
                ← Prev
              </button>
              {Array.from({ length: Math.min(mcqTotalPages, 7) }, (_, i) => (
                <button
                  key={i}
                  className={`${styles.pageBtn} ${mcqPage === i + 1 ? styles.pageBtnActive : ""}`}
                  onClick={() => setMcqPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className={styles.pageBtn}
                onClick={() =>
                  setMcqPage((p) => Math.min(mcqTotalPages, p + 1))
                }
                disabled={mcqPage === mcqTotalPages}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ PRACTICE LIBRARY TAB ═══ */}
      {contentTab === "practiceLibrary" && (
        <div className={styles.card}>
          <div className={styles.cardTopBar}>
            <div className={styles.cardTopLeft}>
              <h3 className={styles.cardTitle}>Practice Library</h3>
              <p className={styles.cardSub}>
                Real FE-1 past exam questions — {practiceQuestions.length}{" "}
                questions
              </p>
            </div>
            <button
              className={styles.addBtn}
              onClick={() => openPracticeModal("add")}
            >
              <Plus size={14} /> Add Question
            </button>
          </div>

          <div className={styles.filterRow}>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {["All", ...subjects.map((s) => s.name)].map((subjectName) => {
                const active = practiceSubjectFilter === subjectName;
                return (
                  <button
                    key={subjectName}
                    className={`${styles.pageBtn} ${active ? styles.pageBtnActive : ""}`}
                    onClick={() => setPracticeSubjectFilter(subjectName)}
                  >
                    {subjectName}
                  </button>
                );
              })}
            </div>
            <div style={{ minWidth: 120 }}>
              <CustomSelect
                options={[
                  { value: "All", label: "All years" },
                  ...practiceYears.map((year) => ({
                    value: String(year),
                    label: String(year),
                  })),
                ]}
                value={practiceYearFilter}
                onChange={setPracticeYearFilter}
                placeholder="All years"
              />
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {(["All", "Essay", "Problem"] as const).map((examType) => {
                const active = practiceTypeFilter === examType;
                return (
                  <button
                    key={examType}
                    className={`${styles.pageBtn} ${active ? styles.pageBtnActive : ""}`}
                    onClick={() => setPracticeTypeFilter(examType)}
                  >
                    {examType}
                  </button>
                );
              })}
            </div>
          </div>

          <div className={styles.statsRow3}>
            <div className={styles.statCard}>
              <div>
                <div className={styles.statLabel}>Total Questions</div>
                <div className={styles.statValue}>
                  {practiceQuestions.length}
                </div>
              </div>
            </div>
            <div className={styles.statCard}>
              <div>
                <div className={styles.statLabel}>Total Attempts</div>
                <div className={styles.statValue}>
                  {practiceQuestions.reduce((sum, q) => sum + q.attempts, 0)}
                </div>
              </div>
            </div>
            <div className={styles.statCard}>
              <div>
                <div className={styles.statLabel}>Avg Score</div>
                <div className={styles.statValue}>
                  {Math.round(
                    practiceQuestions.reduce((sum, q) => sum + q.avgScore, 0) /
                      Math.max(1, practiceQuestions.length),
                  )}
                  %
                </div>
              </div>
            </div>
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.questionsTable}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Question Preview</th>
                  <th>Subject</th>
                  <th>Year</th>
                  <th>Type</th>
                  <th>Attempts</th>
                  <th>Avg Score</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedPractice.map((q, index) => (
                  <tr
                    key={q.id}
                    onClick={() => openPracticeModal("edit", q)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{(practicePage - 1) * 15 + index + 1}</td>
                    <td>
                      <div className={styles.questionPreview}>
                        {truncate(q.description, 80)}
                      </div>
                      <div className={styles.questionMeta}>
                        {q.month} {q.year}
                      </div>
                    </td>
                    <td>
                      <span
                        className={styles.subjectPillSmall}
                        style={{
                          color:
                            subjectColorByName[q.subject] ??
                            "var(--text-secondary)",
                          borderColor:
                            subjectColorByName[q.subject] ??
                            "var(--border-default)",
                          background: `${subjectColorByName[q.subject] ?? "#999"}1A`,
                        }}
                      >
                        {q.subject}
                      </span>
                    </td>
                    <td>{q.year}</td>
                    <td>
                      <span
                        className={
                          q.examType === "Essay"
                            ? styles.typeBadgeEssay
                            : styles.typeBadgeProblem
                        }
                      >
                        {q.examType}
                      </span>
                    </td>
                    <td>
                      <span
                        className={styles.numText}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        <Play size={12} /> {q.attempts}
                      </span>
                    </td>
                    <td>
                      <span className={scoreClass(q.avgScore)}>
                        {q.avgScore}%
                      </span>
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <div className={styles.actionCell}>
                        <button
                          className={styles.editBtn}
                          onClick={() => openPracticeModal("edit", q)}
                        >
                          <Edit2 size={12} /> Edit
                        </button>
                        <button
                          className={styles.deleteBtn}
                          onClick={() => deletePracticeQuestion(q.id)}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            page={practicePage}
            total={practiceTotal}
            perPage={15}
            onChange={setPracticePage}
          />
        </div>
      )}

      {/* ═══ LESSON QUESTIONS TAB ═══ */}
      {contentTab === "lessonQuestions" && (
        <div className={styles.card}>
          <div className={styles.cardTopBar}>
            <div className={styles.cardTopLeft}>
              <h3 className={styles.cardTitle}>Lesson Questions</h3>
              <p className={styles.cardSub}>
                Company-generated essay questions tied to lessons —{" "}
                {lessonQuestionBank.length} questions
              </p>
            </div>
            <button
              className={styles.addBtn}
              onClick={() => openLessonQuestionModal("add")}
            >
              <Plus size={14} /> Add Question
            </button>
          </div>

          <div className={styles.filterRow}>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {["All", ...subjects.map((s) => s.name)].map((subjectName) => {
                const active = lessonSubjectFilter === subjectName;
                return (
                  <button
                    key={subjectName}
                    className={`${styles.pageBtn} ${active ? styles.pageBtnActive : ""}`}
                    onClick={() => setLessonSubjectFilter(subjectName)}
                  >
                    {subjectName}
                  </button>
                );
              })}
            </div>
            <div className={styles.searchWrap}>
              <Search size={14} className={styles.searchIcon} />
              <input
                className={styles.searchInput}
                placeholder="Search by lesson title..."
                value={lessonSearch}
                onChange={(e) => setLessonSearch(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.questionsTable}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Question Text</th>
                  <th>Subject</th>
                  <th>Lesson</th>
                  <th>Attempts</th>
                  <th>Avg Score</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedLessonQuestions.map((q, index) => (
                  <tr
                    key={q.id}
                    onClick={() => openLessonQuestionModal("edit", q)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{(lessonQuestionPage - 1) * 15 + index + 1}</td>
                    <td>
                      <div className={styles.questionPreview}>
                        {truncate(q.text, 90)}
                      </div>
                      <div className={styles.questionMeta}>{q.lessonTitle}</div>
                    </td>
                    <td>
                      <span
                        className={styles.subjectPillSmall}
                        style={{
                          color:
                            subjectColorByName[q.subject] ??
                            "var(--text-secondary)",
                          borderColor:
                            subjectColorByName[q.subject] ??
                            "var(--border-default)",
                          background: `${subjectColorByName[q.subject] ?? "#999"}1A`,
                        }}
                      >
                        {q.subject}
                      </span>
                    </td>
                    <td>
                      <span className={styles.questionMeta}>
                        {truncate(q.lessonTitle, 30)}
                      </span>
                    </td>
                    <td>{q.attempts}</td>
                    <td>
                      <span className={scoreClass(q.avgScore)}>
                        {q.avgScore}%
                      </span>
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <div className={styles.actionCell}>
                        <button
                          className={styles.editBtn}
                          onClick={() => openLessonQuestionModal("edit", q)}
                        >
                          <Edit2 size={12} /> Edit
                        </button>
                        <button
                          className={styles.deleteBtn}
                          onClick={() => deleteLessonQuestion(q.id)}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            page={lessonQuestionPage}
            total={lessonQuestionTotal}
            perPage={15}
            onChange={setLessonQuestionPage}
          />
        </div>
      )}

      {/* ═══ CASE LAW TAB ═══ */}
      {contentTab === "caselaw" && (
        <div className={styles.card}>
          <div className={styles.cardTopBar}>
            <div className={styles.cardTopLeft}>
              <h3 className={styles.cardTitle}>Case Law Library</h3>
              <p className={styles.cardSub}>
                {filteredCases.length} cases ·{" "}
                {caseBriefs.filter((c) => c.isFrequentlyTested).length}{" "}
                frequently tested
              </p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                className={styles.exportBtn}
                onClick={() => handleExport("Excel")}
              >
                <Download size={13} /> Export
              </button>
              <button
                className={styles.addBtn}
                onClick={() => setCaseModal({ mode: "add", item: null })}
              >
                <Plus size={14} /> Add Case
              </button>
            </div>
          </div>

          {/* Case filters */}
          <div className={styles.filterRow}>
            <div className={styles.searchWrap}>
              <Search size={14} className={styles.searchIcon} />
              <input
                className={styles.searchInput}
                placeholder="Search cases, citations, principles..."
                value={caseSearch}
                onChange={(e) => {
                  setCaseSearch(e.target.value);
                  setCasePage(1);
                }}
              />
            </div>
            <select
              className={styles.selectInput}
              value={caseSubjectFilter}
              onChange={(e) => {
                setCaseSubjectFilter(e.target.value);
                setCasePage(1);
              }}
            >
              <option value="All">All Subjects</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
            <select
              className={styles.selectInput}
              value={caseJurisdiction}
              onChange={(e) => {
                setCaseJurisdiction(e.target.value);
                setCasePage(1);
              }}
            >
              <option value="All">All Jurisdictions</option>
              <option value="IRELAND">Ireland</option>
              <option value="UNITED_KINGDOM">UK</option>
              <option value="ENGLAND_AND_WALES">England & Wales</option>
              <option value="EUROPEAN_UNION">EU</option>
              <option value="UNITED_STATES">US</option>
            </select>
          </div>

          {/* Cases grid */}
          <div className={styles.casesGrid}>
            {paginatedCases.map((c) => (
              <div
                key={c.id}
                className={styles.caseCard}
                onClick={() => setCaseModal({ mode: "view", item: c })}
              >
                <div className={styles.caseCardTop}>
                  <div className={styles.caseNameWrap}>
                    <div className={styles.caseName}>{c.caseName}</div>
                    <div className={styles.caseCitation}>
                      {c.citation} · {c.year}
                    </div>
                  </div>
                  {c.isFrequentlyTested && (
                    <div className={styles.freqTestedBadge}>
                      <Star size={11} /> Tested
                    </div>
                  )}
                </div>
                <div className={styles.casePrinciple}>{c.legalPrinciple}</div>
                <div className={styles.caseFooter}>
                  <div className={styles.caseTags}>
                    {c.subjects.map((s) => (
                      <span key={s} className={styles.caseTag}>
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className={styles.caseSaved}>
                    <Users size={11} /> {c.savedCount}
                  </div>
                </div>
                <div
                  className={styles.caseActions}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className={styles.iconActionBtn}
                    onClick={() => setCaseModal({ mode: "edit", item: c })}
                  >
                    <Edit2 size={12} />
                  </button>
                  <button
                    className={styles.iconActionBtnDanger}
                    onClick={() =>
                      setDeleteConfirm({
                        type: "Case",
                        name: c.caseName,
                        id: c.id,
                      })
                    }
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cases pagination */}
          <div className={styles.paginationRow}>
            <span className={styles.paginationInfo}>
              Showing {(casePage - 1) * CASES_PER_PAGE + 1}–
              {Math.min(casePage * CASES_PER_PAGE, filteredCases.length)} of{" "}
              {filteredCases.length} cases
            </span>
            <div className={styles.pagination}>
              <button
                className={styles.pageBtn}
                onClick={() => setCasePage((p) => Math.max(1, p - 1))}
                disabled={casePage === 1}
              >
                ← Prev
              </button>
              {Array.from({ length: Math.min(caseTotalPages, 7) }, (_, i) => (
                <button
                  key={i}
                  className={`${styles.pageBtn} ${casePage === i + 1 ? styles.pageBtnActive : ""}`}
                  onClick={() => setCasePage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className={styles.pageBtn}
                onClick={() =>
                  setCasePage((p) => Math.min(caseTotalPages, p + 1))
                }
                disabled={casePage === caseTotalPages}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ ANALYTICS TAB ═══ */}
      {contentTab === "analytics" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Performance overview */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle} style={{ marginBottom: 16 }}>
              Content Performance Overview
            </h3>
            <div className={styles.analyticsGrid}>
              {[
                {
                  label: "Avg Lesson Completion",
                  value: `${contentStats.avgLessonCompletionRate}%`,
                  color: "var(--green)",
                  icon: TrendingUp,
                  sub: "Across all published lessons",
                },
                {
                  label: "Avg MCQ Pass Rate",
                  value: `${contentStats.avgMCQPassRate}%`,
                  color: "var(--blue-bright)",
                  icon: CheckCircle,
                  sub: "Across all questions",
                },
                {
                  label: "Most Attempted Lesson",
                  value: contentStats.mostAttemptedLesson,
                  color: "var(--amber)",
                  icon: Users,
                  sub: "201 total views",
                },
                {
                  label: "Hardest MCQ",
                  value: "Specific intent...",
                  color: "var(--red)",
                  icon: AlertCircle,
                  sub: "54% pass rate",
                },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className={styles.analyticsCard}>
                    <div
                      className={styles.analyticsIconWrap}
                      style={{ background: s.color + "20" }}
                    >
                      <Icon size={16} color={s.color} />
                    </div>
                    <div className={styles.analyticsLabel}>{s.label}</div>
                    <div
                      className={styles.analyticsValue}
                      style={{ color: s.color }}
                    >
                      {s.value}
                    </div>
                    <div className={styles.analyticsSub}>{s.sub}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lesson performance table */}
          <div className={styles.card}>
            <div className={styles.cardTopBar}>
              <div>
                <h3 className={styles.cardTitle}>Lesson Performance</h3>
                <p className={styles.cardSub}>
                  Completion rates and engagement per lesson
                </p>
              </div>
              <button
                className={styles.exportBtn}
                onClick={() => handleExport("Excel")}
              >
                <Download size={13} /> Export
              </button>
            </div>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {[
                      "Lesson",
                      "Module",
                      "Views",
                      "Completion Rate",
                      "Video Duration",
                      "Status",
                    ].map((h) => (
                      <th key={h} className={styles.th}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {lessons.map((l) => {
                    const mod = modules.find((m) => m.id === l.moduleId);
                    return (
                      <tr key={l.id} className={styles.tr}>
                        <td className={styles.td}>
                          <span className={styles.lessonTitleCell}>
                            {l.title}
                          </span>
                        </td>
                        <td className={styles.td}>
                          <span className={styles.qMeta}>{mod?.name}</span>
                        </td>
                        <td className={styles.td}>
                          <span className={styles.numText}>{l.totalViews}</span>
                        </td>
                        <td className={styles.td}>
                          <div className={styles.passRateWrap}>
                            <span
                              style={{
                                color: passRateColor(l.avgCompletionRate),
                                fontWeight: 600,
                                fontSize: 13,
                              }}
                            >
                              {l.avgCompletionRate}%
                            </span>
                            <div className={styles.passRateBar}>
                              <div
                                className={styles.passRateFill}
                                style={{
                                  width: `${l.avgCompletionRate}%`,
                                  background: passRateColor(
                                    l.avgCompletionRate,
                                  ),
                                }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className={styles.td}>
                          <span className={styles.numText}>
                            {formatDuration(l.videoDuration)}
                          </span>
                        </td>
                        <td className={styles.td}>
                          <Badge
                            label={l.isPublished ? "Published" : "Draft"}
                            variant={l.isPublished ? "success" : "default"}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* MCQ performance per subject */}
          <div className={styles.card}>
            <div className={styles.cardTopBar}>
              <div>
                <h3 className={styles.cardTitle}>
                  MCQ Performance by Difficulty
                </h3>
                <p className={styles.cardSub}>
                  Pass rates and average time grouped by difficulty
                </p>
              </div>
            </div>
            <div className={styles.difficultyBreakdown}>
              {["Easy", "Medium", "Hard"].map((diff) => {
                const diffMCQs = mcqs.filter((q) => q.difficulty === diff);
                const avgPass = Math.round(
                  diffMCQs.reduce((sum, q) => sum + q.passRate, 0) /
                    (diffMCQs.length || 1),
                );
                const avgTime = Math.round(
                  diffMCQs.reduce((sum, q) => sum + q.avgTimeSecs, 0) /
                    (diffMCQs.length || 1),
                );
                const totalAttempts = diffMCQs.reduce(
                  (sum, q) => sum + q.totalAttempts,
                  0,
                );
                return (
                  <div key={diff} className={styles.diffCard}>
                    <Badge label={diff} variant={difficultyVariant(diff)} />
                    <div className={styles.diffStat}>
                      <span className={styles.diffStatLabel}>Questions</span>
                      <span className={styles.diffStatValue}>
                        {diffMCQs.length}
                      </span>
                    </div>
                    <div className={styles.diffStat}>
                      <span className={styles.diffStatLabel}>
                        Avg Pass Rate
                      </span>
                      <span
                        className={styles.diffStatValue}
                        style={{ color: passRateColor(avgPass) }}
                      >
                        {avgPass}%
                      </span>
                    </div>
                    <div className={styles.diffStat}>
                      <span className={styles.diffStatLabel}>Avg Time</span>
                      <span className={styles.diffStatValue}>{avgTime}s</span>
                    </div>
                    <div className={styles.diffStat}>
                      <span className={styles.diffStatLabel}>
                        Total Attempts
                      </span>
                      <span className={styles.diffStatValue}>
                        {totalAttempts}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ═══ LESSON MODAL ═══ */}
      <AnimatePresence>
        {lessonModal && (
          <>
            <motion.div
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.7)",
                zIndex: 500,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLessonModal(null)}
            />
            <motion.div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                x: "-50%",
                y: "-50%",
                width: "720px",
                maxWidth: "calc(100vw - 32px)",
                maxHeight: "calc(100vh - 48px)",
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-focus)",
                borderRadius: 14,
                zIndex: 501,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.22 }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "18px 24px",
                  borderBottom: "1px solid var(--border-default)",
                  flexShrink: 0,
                }}
              >
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  {lessonModal.mode === "add"
                    ? "Add New Lesson"
                    : lessonModal.mode === "edit"
                      ? "Edit Lesson"
                      : "View Lesson"}
                </h3>
                <button
                  onClick={() => setLessonModal(null)}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: "var(--bg-hover)",
                    border: "1px solid var(--border-default)",
                    color: "var(--text-secondary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <X size={14} />
                </button>
              </div>

              <div style={{ overflowY: "auto", flex: 1, padding: 24 }}>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 20 }}
                >
                  {/* Title */}
                  <div className={styles.formField}>
                    <label className={styles.fieldLabel}>Lesson Title *</label>
                    <input
                      className={styles.fieldInput}
                      defaultValue={lessonModal.item?.title ?? ""}
                      placeholder="Enter lesson title..."
                    />
                  </div>

                  {/* Video URL + Duration */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 16,
                    }}
                  >
                    <div className={styles.formField}>
                      <label className={styles.fieldLabel}>
                        Video URL (Cloudinary)
                      </label>
                      <input
                        className={styles.fieldInput}
                        defaultValue={lessonModal.item?.videoUrl ?? ""}
                        placeholder="https://res.cloudinary.com/..."
                      />
                    </div>
                    <div className={styles.formField}>
                      <label className={styles.fieldLabel}>
                        Video Duration (seconds)
                      </label>
                      <input
                        className={styles.fieldInput}
                        type="number"
                        defaultValue={lessonModal.item?.videoDuration ?? ""}
                        placeholder="e.g. 1820"
                      />
                    </div>
                  </div>

                  {/* Order + Published */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 16,
                    }}
                  >
                    <div className={styles.formField}>
                      <label className={styles.fieldLabel}>
                        Display Order *
                      </label>
                      <input
                        className={styles.fieldInput}
                        type="number"
                        defaultValue={lessonModal.item?.order ?? ""}
                        placeholder="1"
                      />
                    </div>
                    <div className={styles.formField}>
                      <label className={styles.fieldLabel}>Status</label>
                      <select
                        className={styles.fieldSelect}
                        defaultValue={
                          lessonModal.item?.isPublished ? "published" : "draft"
                        }
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                      </select>
                    </div>
                  </div>

                  {/* Lesson Content — Rich Text Editor */}
                  <div className={styles.formField}>
                    <label className={styles.fieldLabel}>
                      Lesson Content *
                    </label>
                    <div className={styles.richEditorWrap}>
                      <div className={styles.richEditorToolbar}>
                        <button
                          type="button"
                          className={styles.toolbarBtn}
                          onClick={() =>
                            lessonEditor?.chain().focus().toggleBold().run()
                          }
                        >
                          <Bold size={14} />
                        </button>
                        <button
                          type="button"
                          className={styles.toolbarBtn}
                          onClick={() =>
                            lessonEditor?.chain().focus().toggleItalic().run()
                          }
                        >
                          <Italic size={14} />
                        </button>
                        <button
                          type="button"
                          className={styles.toolbarBtn}
                          onClick={() =>
                            lessonEditor
                              ?.chain()
                              .focus()
                              .toggleBulletList()
                              .run()
                          }
                        >
                          <List size={14} />
                        </button>
                        <button
                          type="button"
                          className={styles.toolbarBtn}
                          onClick={() =>
                            lessonEditor
                              ?.chain()
                              .focus()
                              .toggleOrderedList()
                              .run()
                          }
                        >
                          <ListOrdered size={14} />
                        </button>
                        <button
                          type="button"
                          className={styles.toolbarBtn}
                          onClick={() =>
                            lessonEditor
                              ?.chain()
                              .focus()
                              .toggleHeading({ level: 2 })
                              .run()
                          }
                        >
                          <Heading2 size={14} />
                        </button>
                      </div>
                      <div className={styles.richEditorContent}>
                        <EditorContent editor={lessonEditor} />
                      </div>
                    </div>
                  </div>

                  {/* Transcript — Rich Text Editor */}
                  <div className={styles.formField}>
                    <label className={styles.fieldLabel}>
                      Video Transcript
                    </label>
                    <p className={styles.fieldHint}>
                      This transcript renders exactly as formatted — use
                      headings and lists for timestamps and sections.
                    </p>
                    <div className={styles.richEditorWrap}>
                      <div className={styles.richEditorToolbar}>
                        <button
                          type="button"
                          className={styles.toolbarBtn}
                          onClick={() =>
                            transcriptEditor?.chain().focus().toggleBold().run()
                          }
                        >
                          <Bold size={14} />
                        </button>
                        <button
                          type="button"
                          className={styles.toolbarBtn}
                          onClick={() =>
                            transcriptEditor
                              ?.chain()
                              .focus()
                              .toggleItalic()
                              .run()
                          }
                        >
                          <Italic size={14} />
                        </button>
                        <button
                          type="button"
                          className={styles.toolbarBtn}
                          onClick={() =>
                            transcriptEditor
                              ?.chain()
                              .focus()
                              .toggleBulletList()
                              .run()
                          }
                        >
                          <List size={14} />
                        </button>
                        <button
                          type="button"
                          className={styles.toolbarBtn}
                          onClick={() =>
                            transcriptEditor
                              ?.chain()
                              .focus()
                              .toggleOrderedList()
                              .run()
                          }
                        >
                          <ListOrdered size={14} />
                        </button>
                        <button
                          type="button"
                          className={styles.toolbarBtn}
                          onClick={() =>
                            transcriptEditor
                              ?.chain()
                              .focus()
                              .toggleHeading({ level: 2 })
                              .run()
                          }
                        >
                          <Heading2 size={14} />
                        </button>
                      </div>
                      <div
                        className={styles.richEditorContent}
                        style={{ minHeight: 200 }}
                      >
                        <EditorContent editor={transcriptEditor} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {lessonModal.mode !== "view" && (
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    padding: "16px 24px",
                    borderTop: "1px solid var(--border-default)",
                    flexShrink: 0,
                  }}
                >
                  <button
                    onClick={() => {
                      showToast(
                        `✓ Lesson ${lessonModal.mode === "add" ? "created" : "updated"} successfully`,
                        "success",
                      );
                      setLessonModal(null);
                    }}
                    style={{
                      background: "var(--blue-primary)",
                      color: "white",
                      border: "none",
                      borderRadius: 8,
                      padding: "10px 24px",
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {lessonModal.mode === "add"
                      ? "Create Lesson"
                      : "Save Changes"}
                  </button>
                  <button
                    onClick={() => setLessonModal(null)}
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-default)",
                      borderRadius: 8,
                      padding: "10px 20px",
                      fontSize: 14,
                      color: "var(--text-secondary)",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ═══ MCQ MODAL ═══ */}
      <AnimatePresence>
        {mcqModal && (
          <>
            <motion.div
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.7)",
                zIndex: 500,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMcqModal(null)}
            />
            <motion.div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                x: "-50%",
                y: "-50%",
                width: "600px",
                maxWidth: "calc(100vw - 32px)",
                maxHeight: "calc(100vh - 48px)",
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-focus)",
                borderRadius: 14,
                zIndex: 501,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.22 }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "18px 24px",
                  borderBottom: "1px solid var(--border-default)",
                  flexShrink: 0,
                }}
              >
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  {mcqModal.mode === "add"
                    ? "Add MCQ Question"
                    : mcqModal.mode === "edit"
                      ? "Edit MCQ"
                      : "MCQ Details"}
                </h3>
                <button
                  onClick={() => setMcqModal(null)}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: "var(--bg-hover)",
                    border: "1px solid var(--border-default)",
                    color: "var(--text-secondary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <X size={14} />
                </button>
              </div>
              <div
                style={{
                  overflowY: "auto",
                  flex: 1,
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                }}
              >
                {/* Stats if viewing */}
                {mcqModal.mode === "view" && mcqModal.item && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: 10,
                    }}
                  >
                    {[
                      {
                        label: "Total Attempts",
                        value: mcqModal.item.totalAttempts,
                        color: "var(--blue-bright)",
                      },
                      {
                        label: "Pass Rate",
                        value: `${mcqModal.item.passRate}%`,
                        color: passRateColor(mcqModal.item.passRate),
                      },
                      {
                        label: "Avg Time",
                        value: `${mcqModal.item.avgTimeSecs}s`,
                        color: "var(--amber)",
                      },
                      {
                        label: "Exam Year",
                        value: mcqModal.item.examYear,
                        color: "var(--text-primary)",
                      },
                    ].map((s, i) => (
                      <div
                        key={i}
                        style={{
                          background: "var(--bg-card)",
                          border: "1px solid var(--border-default)",
                          borderRadius: 8,
                          padding: "10px 14px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: 11,
                            color: "var(--text-muted)",
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                            marginBottom: 4,
                          }}
                        >
                          {s.label}
                        </div>
                        <div
                          style={{
                            fontSize: 18,
                            fontWeight: 700,
                            color: s.color,
                          }}
                        >
                          {s.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className={styles.formField}>
                  <label className={styles.fieldLabel}>Question Text *</label>
                  <textarea
                    className={styles.fieldTextarea}
                    rows={3}
                    defaultValue={mcqModal.item?.text ?? ""}
                    placeholder="Enter the question..."
                  />
                </div>

                <div className={styles.formField}>
                  <label className={styles.fieldLabel}>Answer Options *</label>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 8 }}
                  >
                    {(mcqModal.item?.options ?? ["", "", "", ""]).map(
                      (opt, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <span
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: "50%",
                              background: "var(--bg-card)",
                              border: "1px solid var(--border-default)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 11,
                              fontWeight: 600,
                              color: "var(--text-muted)",
                              flexShrink: 0,
                            }}
                          >
                            {String.fromCharCode(65 + i)}
                          </span>
                          <input
                            className={styles.fieldInput}
                            defaultValue={opt}
                            placeholder={`Option ${String.fromCharCode(65 + i)}`}
                            style={{ flex: 1 }}
                          />
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                  }}
                >
                  <div className={styles.formField}>
                    <label className={styles.fieldLabel}>
                      Correct Answer *
                    </label>
                    <input
                      className={styles.fieldInput}
                      defaultValue={mcqModal.item?.correctAnswer ?? ""}
                      placeholder="Must match one of the options exactly"
                    />
                  </div>
                  <div className={styles.formField}>
                    <label className={styles.fieldLabel}>Difficulty *</label>
                    <select
                      className={styles.fieldSelect}
                      defaultValue={mcqModal.item?.difficulty ?? "Medium"}
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                  }}
                >
                  <div className={styles.formField}>
                    <label className={styles.fieldLabel}>Exam Year</label>
                    <input
                      className={styles.fieldInput}
                      type="number"
                      defaultValue={mcqModal.item?.examYear ?? ""}
                      placeholder="e.g. 2024"
                    />
                  </div>
                  {mcqModal.mode === "add" ? (
                    <div className={styles.formField}>
                      <label className={styles.fieldLabel}>Subject</label>
                      <select
                        className={styles.fieldSelect}
                        defaultValue={subjects[0]?.id ?? ""}
                      >
                        {subjects.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div className={styles.formField}>
                      <label className={styles.fieldLabel}>Subject</label>
                      <input
                        className={styles.fieldInput}
                        value={
                          subjects.find(
                            (s) => s.id === mcqModal.item?.subjectId,
                          )?.name ?? "Unknown subject"
                        }
                        readOnly
                      />
                    </div>
                  )}
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                  }}
                >
                  {mcqModal.mode === "add" ? (
                    <>
                      <div className={styles.formField}>
                        <label className={styles.fieldLabel}>Module</label>
                        <select
                          className={styles.fieldSelect}
                          defaultValue={modules[0]?.id ?? ""}
                        >
                          {modules.map((m) => (
                            <option key={m.id} value={m.id}>
                              {m.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className={styles.formField}>
                        <label className={styles.fieldLabel}>Lesson</label>
                        <select
                          className={styles.fieldSelect}
                          defaultValue={lessons[0]?.id ?? ""}
                        >
                          {lessons.map((l) => (
                            <option key={l.id} value={l.id}>
                              {l.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={styles.formField}>
                        <label className={styles.fieldLabel}>Module</label>
                        <input
                          className={styles.fieldInput}
                          value={
                            modules.find(
                              (m) => m.id === mcqModal.item?.moduleId,
                            )?.name ?? "Unknown module"
                          }
                          readOnly
                        />
                      </div>
                      <div className={styles.formField}>
                        <label className={styles.fieldLabel}>Lesson</label>
                        <input
                          className={styles.fieldInput}
                          value={
                            lessons.find(
                              (l) => l.id === mcqModal.item?.lessonId,
                            )?.title ?? "Unknown lesson"
                          }
                          readOnly
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {mcqModal.mode !== "view" && (
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    padding: "16px 24px",
                    borderTop: "1px solid var(--border-default)",
                    flexShrink: 0,
                  }}
                >
                  <button
                    onClick={() => {
                      showToast(
                        `✓ MCQ ${mcqModal.mode === "add" ? "created" : "updated"} successfully`,
                        "success",
                      );
                      setMcqModal(null);
                    }}
                    style={{
                      background: "var(--blue-primary)",
                      color: "white",
                      border: "none",
                      borderRadius: 8,
                      padding: "10px 24px",
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {mcqModal.mode === "add"
                      ? "Create Question"
                      : "Save Changes"}
                  </button>
                  <button
                    onClick={() => setMcqModal(null)}
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-default)",
                      borderRadius: 8,
                      padding: "10px 20px",
                      fontSize: 14,
                      color: "var(--text-secondary)",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ═══ PRACTICE LIBRARY MODAL ═══ */}
      <AnimatePresence>
        {practiceModal && (
          <>
            <motion.div
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.7)",
                zIndex: 500,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPracticeModal(null)}
            />
            <motion.div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                x: "-50%",
                y: "-50%",
                width: "740px",
                maxWidth: "calc(100vw - 32px)",
                maxHeight: "calc(100vh - 48px)",
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-focus)",
                borderRadius: 14,
                zIndex: 501,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.22 }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "18px 24px",
                  borderBottom: "1px solid var(--border-default)",
                  flexShrink: 0,
                }}
              >
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  {practiceModal.mode === "add"
                    ? "Add Practice Library Question"
                    : "Edit Practice Library Question"}
                </h3>
                <button
                  onClick={() => setPracticeModal(null)}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: "var(--bg-hover)",
                    border: "1px solid var(--border-default)",
                    color: "var(--text-secondary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <X size={14} />
                </button>
              </div>

              <div
                style={{
                  overflowY: "auto",
                  flex: 1,
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr 1fr",
                    gap: 12,
                  }}
                >
                  <div className={styles.formField}>
                    <label className={styles.fieldLabel}>Subject</label>
                    <CustomSelect
                      options={subjects.map((subject) => ({
                        value: subject.name,
                        label: subject.name,
                        color: subject.color,
                      }))}
                      value={practiceForm.subject}
                      onChange={(value) =>
                        setPracticeForm((prev) => ({ ...prev, subject: value }))
                      }
                      placeholder="Select subject"
                    />
                  </div>
                  <div className={styles.formField}>
                    <label className={styles.fieldLabel}>Year</label>
                    <input
                      className={styles.fieldInput}
                      type="number"
                      value={practiceForm.year}
                      onChange={(e) =>
                        setPracticeForm((prev) => ({
                          ...prev,
                          year:
                            Number(e.target.value) || new Date().getFullYear(),
                        }))
                      }
                    />
                  </div>
                  <div className={styles.formField}>
                    <label className={styles.fieldLabel}>Month</label>
                    <CustomSelect
                      options={[
                        { value: "March", label: "March" },
                        { value: "October", label: "October" },
                      ]}
                      value={practiceForm.month}
                      onChange={(value) =>
                        setPracticeForm((prev) => ({
                          ...prev,
                          month: value as PracticeMonth,
                        }))
                      }
                      placeholder="Select month"
                    />
                  </div>
                  <div className={styles.formField}>
                    <label className={styles.fieldLabel}>Exam Type</label>
                    <CustomSelect
                      options={[
                        { value: "Essay", label: "Essay" },
                        { value: "Problem", label: "Problem" },
                      ]}
                      value={practiceForm.examType}
                      onChange={(value) =>
                        setPracticeForm((prev) => ({
                          ...prev,
                          examType: value as PracticeExamType,
                        }))
                      }
                      placeholder="Select type"
                    />
                  </div>
                </div>

                <div className={styles.formField}>
                  <label className={styles.fieldLabel}>Question Text</label>
                  <textarea
                    className={styles.fieldTextarea}
                    rows={8}
                    value={practiceForm.text}
                    onChange={(e) =>
                      setPracticeForm((prev) => ({
                        ...prev,
                        text: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className={styles.formField}>
                  <label className={styles.fieldLabel}>Description</label>
                  <textarea
                    className={styles.fieldTextarea}
                    rows={2}
                    value={practiceForm.description}
                    onChange={(e) =>
                      setPracticeForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 10,
                  padding: "16px 24px",
                  borderTop: "1px solid var(--border-default)",
                  flexShrink: 0,
                }}
              >
                <button
                  onClick={savePracticeQuestion}
                  style={{
                    background: "var(--blue-primary)",
                    color: "white",
                    border: "none",
                    borderRadius: 8,
                    padding: "10px 24px",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {practiceModal.mode === "add"
                    ? "Add Question"
                    : "Save Changes"}
                </button>
                <button
                  onClick={() => setPracticeModal(null)}
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-default)",
                    borderRadius: 8,
                    padding: "10px 20px",
                    fontSize: 14,
                    color: "var(--text-secondary)",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ═══ LESSON QUESTION MODAL ═══ */}
      <AnimatePresence>
        {lessonQuestionModal && (
          <>
            <motion.div
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.7)",
                zIndex: 500,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLessonQuestionModal(null)}
            />
            <motion.div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                x: "-50%",
                y: "-50%",
                width: "700px",
                maxWidth: "calc(100vw - 32px)",
                maxHeight: "calc(100vh - 48px)",
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-focus)",
                borderRadius: 14,
                zIndex: 501,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.22 }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "18px 24px",
                  borderBottom: "1px solid var(--border-default)",
                  flexShrink: 0,
                }}
              >
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  {lessonQuestionModal.mode === "add"
                    ? "Add Lesson Question"
                    : "Edit Lesson Question"}
                </h3>
                <button
                  onClick={() => setLessonQuestionModal(null)}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: "var(--bg-hover)",
                    border: "1px solid var(--border-default)",
                    color: "var(--text-secondary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <X size={14} />
                </button>
              </div>

              <div
                style={{
                  overflowY: "auto",
                  flex: 1,
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                  }}
                >
                  <div className={styles.formField}>
                    <label className={styles.fieldLabel}>Subject</label>
                    <CustomSelect
                      options={subjects.map((subject) => ({
                        value: subject.name,
                        label: subject.name,
                        color: subject.color,
                      }))}
                      value={lessonQuestionForm.subject}
                      onChange={(value) => {
                        setLessonQuestionForm((prev) => ({
                          ...prev,
                          subject: value,
                          // Reset lesson selection when subject changes
                          lessonId: "",
                          lessonTitle: "",
                          moduleNumber: 1,
                        }));
                      }}
                      placeholder="Select subject"
                    />
                  </div>
                  <div className={styles.formField}>
                    <label className={styles.fieldLabel}>Lesson Title</label>
                    <CustomSelect
                      options={(() => {
                        // Find all lessons for the selected subject
                        const subjectObj = subjects.find(
                          (s) => s.name === lessonQuestionForm.subject,
                        );
                        if (!subjectObj) return [];
                        // Get all modules for this subject
                        const subjectModules = modules.filter(
                          (m) => m.subjectId === subjectObj.id,
                        );
                        // Get all lessons for these modules
                        const lessonsForSubject = lessons.filter((l) =>
                          subjectModules.some((m) => m.id === l.moduleId),
                        );
                        return lessonsForSubject.map((lesson) => ({
                          value: lesson.id,
                          label: lesson.title,
                          meta: `Module ${modules.find((m) => m.id === lesson.moduleId)?.order ?? ""}`,
                        }));
                      })()}
                      value={lessonQuestionForm.lessonId}
                      onChange={(value) => {
                        // When lesson changes, update lessonId, lessonTitle, and moduleNumber
                        const lesson = lessons.find((l) => l.id === value);
                        setLessonQuestionForm((prev) => ({
                          ...prev,
                          lessonId: value,
                          lessonTitle: lesson?.title || "",
                          moduleNumber: lesson
                            ? (modules.find((m) => m.id === lesson.moduleId)
                                ?.order ?? 1)
                            : 1,
                        }));
                      }}
                      placeholder="Select lesson"
                      label="Lesson Title"
                    />
                  </div>
                </div>

                <div className={styles.formField}>
                  <label className={styles.fieldLabel}>Question Text</label>
                  <textarea
                    className={styles.fieldTextarea}
                    rows={8}
                    value={lessonQuestionForm.text}
                    onChange={(e) =>
                      setLessonQuestionForm((prev) => ({
                        ...prev,
                        text: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 10,
                  padding: "16px 24px",
                  borderTop: "1px solid var(--border-default)",
                  flexShrink: 0,
                }}
              >
                <button
                  onClick={saveLessonQuestion}
                  style={{
                    background: "var(--blue-primary)",
                    color: "white",
                    border: "none",
                    borderRadius: 8,
                    padding: "10px 24px",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {lessonQuestionModal.mode === "add"
                    ? "Add Question"
                    : "Save Changes"}
                </button>
                <button
                  onClick={() => setLessonQuestionModal(null)}
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-default)",
                    borderRadius: 8,
                    padding: "10px 20px",
                    fontSize: 14,
                    color: "var(--text-secondary)",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ═══ CASE LAW MODAL ═══ */}
      <AnimatePresence>
        {caseModal && (
          <>
            <motion.div
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.7)",
                zIndex: 500,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCaseModal(null)}
            />
            <motion.div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                x: "-50%",
                y: "-50%",
                width: "680px",
                maxWidth: "calc(100vw - 32px)",
                maxHeight: "calc(100vh - 48px)",
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-focus)",
                borderRadius: 14,
                zIndex: 501,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.22 }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "18px 24px",
                  borderBottom: "1px solid var(--border-default)",
                  flexShrink: 0,
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: 17,
                      fontWeight: 600,
                      color: "var(--text-primary)",
                    }}
                  >
                    {caseModal.mode === "add"
                      ? "Add Case Brief"
                      : caseModal.mode === "edit"
                        ? "Edit Case Brief"
                        : caseModal.item?.caseName}
                  </h3>
                  {caseModal.mode === "view" && caseModal.item && (
                    <div
                      style={{
                        fontSize: 13,
                        color: "var(--text-muted)",
                        marginTop: 2,
                      }}
                    >
                      {caseModal.item.citation} · {caseModal.item.court} ·{" "}
                      {caseModal.item.year}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setCaseModal(null)}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: "var(--bg-hover)",
                    border: "1px solid var(--border-default)",
                    color: "var(--text-secondary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <X size={14} />
                </button>
              </div>

              <div
                style={{
                  overflowY: "auto",
                  flex: 1,
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                }}
              >
                {caseModal.mode === "view" && caseModal.item ? (
                  <>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        gap: 12,
                      }}
                    >
                      {[
                        {
                          label: "Jurisdiction",
                          value: caseModal.item.jurisdiction.replace(/_/g, " "),
                        },
                        { label: "Court", value: caseModal.item.court },
                        {
                          label: "Saved By",
                          value: `${caseModal.item.savedCount} students`,
                        },
                      ].map((r, i) => (
                        <div
                          key={i}
                          style={{
                            background: "var(--bg-card)",
                            border: "1px solid var(--border-default)",
                            borderRadius: 8,
                            padding: "10px 14px",
                          }}
                        >
                          <div
                            style={{
                              fontSize: 11,
                              color: "var(--text-muted)",
                              textTransform: "uppercase",
                              letterSpacing: "0.06em",
                              marginBottom: 4,
                            }}
                          >
                            {r.label}
                          </div>
                          <div
                            style={{
                              fontSize: 14,
                              fontWeight: 500,
                              color: "var(--text-primary)",
                            }}
                          >
                            {r.value}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 500,
                          color: "var(--text-muted)",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          marginBottom: 8,
                        }}
                      >
                        Legal Principle
                      </div>
                      <div
                        style={{
                          fontSize: 15,
                          color: "var(--text-primary)",
                          lineHeight: 1.7,
                        }}
                      >
                        {caseModal.item.legalPrinciple}
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 500,
                          color: "var(--text-muted)",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          marginBottom: 8,
                        }}
                      >
                        Subjects & Topics
                      </div>
                      <div
                        style={{ display: "flex", flexWrap: "wrap", gap: 6 }}
                      >
                        {[
                          ...caseModal.item.subjects,
                          ...caseModal.item.topics,
                        ].map((t) => (
                          <span key={t} className={styles.caseTag}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    {caseModal.item.isFrequentlyTested && (
                      <div
                        style={{
                          background: "var(--amber-bg)",
                          border: "1px solid var(--amber)",
                          borderRadius: 8,
                          padding: "10px 16px",
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          fontSize: 13,
                          color: "var(--amber)",
                        }}
                      >
                        <Star size={14} /> This case is flagged as frequently
                        tested in FE-1 exams
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 16,
                      }}
                    >
                      <div className={styles.formField}>
                        <label className={styles.fieldLabel}>Case Name *</label>
                        <input
                          className={styles.fieldInput}
                          defaultValue={caseModal.item?.caseName ?? ""}
                          placeholder="e.g. Donoghue v Stevenson"
                        />
                      </div>
                      <div className={styles.formField}>
                        <label className={styles.fieldLabel}>Citation *</label>
                        <input
                          className={styles.fieldInput}
                          defaultValue={caseModal.item?.citation ?? ""}
                          placeholder="e.g. [1932] AC 562"
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        gap: 16,
                      }}
                    >
                      <div className={styles.formField}>
                        <label className={styles.fieldLabel}>Year *</label>
                        <input
                          className={styles.fieldInput}
                          type="number"
                          defaultValue={caseModal.item?.year ?? ""}
                          placeholder="e.g. 1932"
                        />
                      </div>
                      <div className={styles.formField}>
                        <label className={styles.fieldLabel}>Court *</label>
                        <input
                          className={styles.fieldInput}
                          defaultValue={caseModal.item?.court ?? ""}
                          placeholder="e.g. House of Lords"
                        />
                      </div>
                      <div className={styles.formField}>
                        <label className={styles.fieldLabel}>
                          Jurisdiction *
                        </label>
                        <select
                          className={styles.fieldSelect}
                          defaultValue={
                            caseModal.item?.jurisdiction ?? "IRELAND"
                          }
                        >
                          <option value="IRELAND">Ireland</option>
                          <option value="UNITED_KINGDOM">United Kingdom</option>
                          <option value="ENGLAND_AND_WALES">
                            England & Wales
                          </option>
                          <option value="EUROPEAN_UNION">European Union</option>
                          <option value="UNITED_STATES">United States</option>
                          <option value="OTHER">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className={styles.formField}>
                      <label className={styles.fieldLabel}>
                        Legal Principle *
                      </label>
                      <textarea
                        className={styles.fieldTextarea}
                        rows={3}
                        defaultValue={caseModal.item?.legalPrinciple ?? ""}
                        placeholder="The core legal principle this case established..."
                      />
                    </div>
                    <div className={styles.formField}>
                      <label className={styles.fieldLabel}>Full Summary</label>
                      <p className={styles.fieldHint}>
                        This renders exactly as formatted in the student app —
                        use rich formatting for clarity.
                      </p>
                      <div className={styles.richEditorWrap}>
                        <div className={styles.richEditorToolbar}>
                          <button
                            type="button"
                            className={styles.toolbarBtn}
                            onClick={() =>
                              caseEditor?.chain().focus().toggleBold().run()
                            }
                          >
                            <Bold size={14} />
                          </button>
                          <button
                            type="button"
                            className={styles.toolbarBtn}
                            onClick={() =>
                              caseEditor?.chain().focus().toggleItalic().run()
                            }
                          >
                            <Italic size={14} />
                          </button>
                          <button
                            type="button"
                            className={styles.toolbarBtn}
                            onClick={() =>
                              caseEditor
                                ?.chain()
                                .focus()
                                .toggleBulletList()
                                .run()
                            }
                          >
                            <List size={14} />
                          </button>
                          <button
                            type="button"
                            className={styles.toolbarBtn}
                            onClick={() =>
                              caseEditor
                                ?.chain()
                                .focus()
                                .toggleOrderedList()
                                .run()
                            }
                          >
                            <ListOrdered size={14} />
                          </button>
                          <button
                            type="button"
                            className={styles.toolbarBtn}
                            onClick={() =>
                              caseEditor
                                ?.chain()
                                .focus()
                                .toggleHeading({ level: 2 })
                                .run()
                            }
                          >
                            <Heading2 size={14} />
                          </button>
                        </div>
                        <div className={styles.richEditorContent}>
                          <EditorContent editor={caseEditor} />
                        </div>
                      </div>
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <input
                        type="checkbox"
                        id="freqTested"
                        defaultChecked={
                          caseModal.item?.isFrequentlyTested ?? false
                        }
                        style={{ width: 16, height: 16, cursor: "pointer" }}
                      />
                      <label
                        htmlFor="freqTested"
                        style={{
                          fontSize: 14,
                          color: "var(--text-secondary)",
                          cursor: "pointer",
                        }}
                      >
                        Mark as frequently tested in FE-1 exams
                      </label>
                    </div>
                  </>
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 10,
                  padding: "16px 24px",
                  borderTop: "1px solid var(--border-default)",
                  flexShrink: 0,
                }}
              >
                {caseModal.mode !== "view" && (
                  <button
                    onClick={() => {
                      showToast(
                        `✓ Case brief ${caseModal.mode === "add" ? "created" : "updated"} successfully`,
                        "success",
                      );
                      setCaseModal(null);
                    }}
                    style={{
                      background: "var(--blue-primary)",
                      color: "white",
                      border: "none",
                      borderRadius: 8,
                      padding: "10px 24px",
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {caseModal.mode === "add"
                      ? "Create Case Brief"
                      : "Save Changes"}
                  </button>
                )}
                {caseModal.mode === "view" && (
                  <button
                    onClick={() =>
                      setCaseModal({ mode: "edit", item: caseModal.item })
                    }
                    style={{
                      background: "var(--blue-muted)",
                      border: "1px solid var(--blue-primary)",
                      color: "var(--blue-bright)",
                      borderRadius: 8,
                      padding: "10px 24px",
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Edit Case Brief
                  </button>
                )}
                <button
                  onClick={() => setCaseModal(null)}
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-default)",
                    borderRadius: 8,
                    padding: "10px 20px",
                    fontSize: 14,
                    color: "var(--text-secondary)",
                    cursor: "pointer",
                  }}
                >
                  {caseModal.mode === "view" ? "Close" : "Cancel"}
                </button>
                {caseModal.mode !== "add" && caseModal.item && (
                  <button
                    onClick={() => {
                      showToast("✓ Case data exported", "info");
                      handleExport("PDF");
                    }}
                    style={{
                      background: "transparent",
                      border: "1px solid var(--border-default)",
                      borderRadius: 8,
                      padding: "10px 16px",
                      fontSize: 13,
                      color: "var(--text-secondary)",
                      cursor: "pointer",
                      marginLeft: "auto",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <Download size={13} /> Export
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ═══ MODULE MODAL ═══ */}
      <AnimatePresence>
        {moduleModal && (
          <>
            <motion.div
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.7)",
                zIndex: 500,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModuleModal(null)}
            />
            <motion.div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                x: "-50%",
                y: "-50%",
                width: "560px",
                maxWidth: "calc(100vw - 32px)",
                maxHeight: "calc(100vh - 48px)",
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-focus)",
                borderRadius: 14,
                zIndex: 501,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.22 }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "18px 24px",
                  borderBottom: "1px solid var(--border-default)",
                  flexShrink: 0,
                }}
              >
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  {moduleModal.mode === "add"
                    ? "Add New Module"
                    : "Edit Module"}
                </h3>
                <button
                  onClick={() => setModuleModal(null)}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: "var(--bg-hover)",
                    border: "1px solid var(--border-default)",
                    color: "var(--text-secondary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <X size={14} />
                </button>
              </div>
              <div
                style={{
                  overflowY: "auto",
                  flex: 1,
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <div className={styles.formField}>
                  <label className={styles.fieldLabel}>Module Name *</label>
                  <input
                    className={styles.fieldInput}
                    defaultValue={moduleModal.item?.name ?? ""}
                    placeholder="e.g. Foundations of Criminal Law"
                  />
                </div>
                <div className={styles.formField}>
                  <label className={styles.fieldLabel}>Description</label>
                  <textarea
                    className={styles.fieldTextarea}
                    rows={3}
                    defaultValue={moduleModal.item?.description ?? ""}
                    placeholder="Brief overview of this module..."
                  />
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                  }}
                >
                  <div className={styles.formField}>
                    <label className={styles.fieldLabel}>Display Order *</label>
                    <input
                      className={styles.fieldInput}
                      type="number"
                      defaultValue={moduleModal.item?.order ?? ""}
                      placeholder="1"
                    />
                  </div>
                  <div className={styles.formField}>
                    <label className={styles.fieldLabel}>Status</label>
                    <select
                      className={styles.fieldSelect}
                      defaultValue={
                        moduleModal.item?.isPublished ? "published" : "draft"
                      }
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  padding: "16px 24px",
                  borderTop: "1px solid var(--border-default)",
                  flexShrink: 0,
                }}
              >
                <button
                  onClick={() => {
                    showToast(
                      `✓ Module ${moduleModal.mode === "add" ? "created" : "updated"} successfully`,
                      "success",
                    );
                    setModuleModal(null);
                  }}
                  style={{
                    background: "var(--blue-primary)",
                    color: "white",
                    border: "none",
                    borderRadius: 8,
                    padding: "10px 24px",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {moduleModal.mode === "add"
                    ? "Create Module"
                    : "Save Changes"}
                </button>
                <button
                  onClick={() => setModuleModal(null)}
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-default)",
                    borderRadius: 8,
                    padding: "10px 20px",
                    fontSize: 14,
                    color: "var(--text-secondary)",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ═══ SUBJECT MODAL ═══ */}
      <AnimatePresence>
        {subjectModal && (
          <>
            <motion.div
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.7)",
                zIndex: 500,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSubjectModal(null)}
            />
            <motion.div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                x: "-50%",
                y: "-50%",
                width: "520px",
                maxWidth: "calc(100vw - 32px)",
                maxHeight: "calc(100vh - 48px)",
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-focus)",
                borderRadius: 14,
                zIndex: 501,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.22 }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "18px 24px",
                  borderBottom: "1px solid var(--border-default)",
                  flexShrink: 0,
                }}
              >
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  {subjectModal.mode === "add"
                    ? "Add New Subject"
                    : "Edit Subject"}
                </h3>
                <button
                  onClick={() => setSubjectModal(null)}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: "var(--bg-hover)",
                    border: "1px solid var(--border-default)",
                    color: "var(--text-secondary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <X size={14} />
                </button>
              </div>
              <div
                style={{
                  overflowY: "auto",
                  flex: 1,
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <div className={styles.formField}>
                  <label className={styles.fieldLabel}>Subject Name *</label>
                  <input
                    className={styles.fieldInput}
                    defaultValue={subjectModal.item?.name ?? ""}
                    placeholder="e.g. Criminal Law"
                  />
                </div>
                <div className={styles.formField}>
                  <label className={styles.fieldLabel}>Description</label>
                  <textarea
                    className={styles.fieldTextarea}
                    rows={3}
                    defaultValue={subjectModal.item?.description ?? ""}
                    placeholder="Brief description of this subject..."
                  />
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                  }}
                >
                  <div className={styles.formField}>
                    <label className={styles.fieldLabel}>Subject Color</label>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <input
                        type="color"
                        defaultValue={subjectModal.item?.color ?? "#E6027D"}
                        style={{
                          width: 40,
                          height: 36,
                          border: "none",
                          borderRadius: 6,
                          cursor: "pointer",
                          background: "transparent",
                        }}
                      />
                      <input
                        className={styles.fieldInput}
                        defaultValue={subjectModal.item?.color ?? "#E6027D"}
                        placeholder="#E6027D"
                        style={{ flex: 1 }}
                      />
                    </div>
                  </div>
                  <div className={styles.formField}>
                    <label className={styles.fieldLabel}>Display Order</label>
                    <input
                      className={styles.fieldInput}
                      type="number"
                      defaultValue={subjectModal.item?.order ?? ""}
                      placeholder="1"
                    />
                  </div>
                </div>
                <div className={styles.formField}>
                  <label className={styles.fieldLabel}>Status</label>
                  <select
                    className={styles.fieldSelect}
                    defaultValue={
                      subjectModal.item?.isPublished ? "published" : "draft"
                    }
                  >
                    <option value="published">
                      Published — visible to students
                    </option>
                    <option value="draft">Draft — hidden from students</option>
                  </select>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  padding: "16px 24px",
                  borderTop: "1px solid var(--border-default)",
                  flexShrink: 0,
                }}
              >
                <button
                  onClick={() => {
                    showToast(
                      `✓ Subject ${subjectModal.mode === "add" ? "created" : "updated"} successfully`,
                      "success",
                    );
                    setSubjectModal(null);
                  }}
                  style={{
                    background: "var(--blue-primary)",
                    color: "white",
                    border: "none",
                    borderRadius: 8,
                    padding: "10px 24px",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {subjectModal.mode === "add"
                    ? "Create Subject"
                    : "Save Changes"}
                </button>
                <button
                  onClick={() => setSubjectModal(null)}
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-default)",
                    borderRadius: 8,
                    padding: "10px 20px",
                    fontSize: 14,
                    color: "var(--text-secondary)",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ═══ DELETE CONFIRM ═══ */}
      <AnimatePresence>
        {deleteConfirm && (
          <>
            <motion.div
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.7)",
                zIndex: 600,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirm(null)}
            />
            <motion.div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                x: "-50%",
                y: "-50%",
                width: 380,
                maxWidth: "calc(100vw - 32px)",
                background: "var(--bg-elevated)",
                border: "1px solid var(--red)",
                borderRadius: 14,
                zIndex: 601,
                overflow: "hidden",
                boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div style={{ padding: 24 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "var(--red-bg)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  <Trash2 size={20} color="var(--red)" />
                </div>
                <div
                  style={{
                    fontSize: 17,
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    marginBottom: 8,
                  }}
                >
                  Delete {deleteConfirm.type}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                    marginBottom: 20,
                  }}
                >
                  Are you sure you want to permanently delete{" "}
                  <strong style={{ color: "var(--text-primary)" }}>
                    {deleteConfirm.name}
                  </strong>
                  ? This action cannot be undone.
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    onClick={() => {
                      showToast(`✓ ${deleteConfirm.type} deleted`, "danger");
                      setDeleteConfirm(null);
                    }}
                    style={{
                      flex: 1,
                      background: "var(--red)",
                      color: "white",
                      border: "none",
                      borderRadius: 8,
                      padding: "10px",
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Delete Permanently
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-default)",
                      borderRadius: 8,
                      padding: "10px 16px",
                      fontSize: 14,
                      color: "var(--text-secondary)",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div
            style={{
              position: "fixed",
              bottom: 24,
              right: 24,
              zIndex: 700,
              background: "var(--bg-elevated)",
              border: `1px solid ${toast.type === "success" ? "var(--green)" : toast.type === "danger" ? "var(--red)" : toast.type === "warning" ? "var(--amber)" : "var(--blue-bright)"}`,
              borderRadius: 10,
              padding: "12px 20px",
              fontSize: 14,
              color: "var(--text-primary)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
              minWidth: 260,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
