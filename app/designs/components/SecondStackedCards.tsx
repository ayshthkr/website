import { useInView, motion } from "motion/react";
import { useRef, useEffect, useState } from "react";
import HeroSection from "./HeroSection";
import ResumeSection from "./ResumeSection";

export default function SecondStackedCards() {
  const headerRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const [headerPositions, setHeaderPositions] = useState<
    { top: number; bottom: number }[]
  >(Array(5).fill({ top: 0, bottom: 0 }));
  const divRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(divRef);

  const scrollToContent = () => {
    headerRefs.current[0]?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const updateHeights = () => {
      // Get all valid header refs
      const validRefs = headerRefs.current.filter((ref) => ref !== null);

      // Calculate cumulative positions
      let topPosition = 0;
      let bottomPosition = 0;

      const newPositions = validRefs.map((ref, index) => {
        const height = ref?.offsetHeight || 0;

        // First element starts at 0
        if (index === 0) {
          return { top: 0, bottom: 0 };
        }

        // For other elements, add previous position plus height plus gap
        topPosition += (validRefs[index - 1]?.offsetHeight || 0) + 2;
        bottomPosition += (validRefs[index - 1]?.offsetHeight || 0) + 2;

        return { top: topPosition, bottom: bottomPosition };
      });

      // console.log(newPositions);

      setHeaderPositions(newPositions);
    };

    // Initialize refs array if needed
    if (headerRefs.current.length !== 5) {
      headerRefs.current = Array(5).fill(null);
    }

    updateHeights();
    window.addEventListener("resize", updateHeights);

    return () => {
      window.removeEventListener("resize", updateHeights);
    };
  }, []);

  return (
    <>
      <HeroSection scrollToContent={scrollToContent} />
      <div className="w-full h-full mt-10 px-40" ref={divRef}>
        <motion.p
          id="ID001"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold mb-8  z-50 border-t-2  border-black/25 py-6 px-4 backdrop-blur-none bg-white shadow-lg rounded-lg"
          ref={(el) => {
            headerRefs.current[0] = el;
          }}
          style={
            isInView
              ? {
                  position: "sticky",
                  top: `${headerPositions[0]?.top}px`,
                }
              : {}
          }
        >
          ID001 - Education
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-12 px-16"
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ResumeSection type="education" data={resumeData.education} />
        </motion.div>

        <motion.p
          id="ID002"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold mb-8  z-40 border-t-2  border-black/25 py-6 px-4 backdrop-blur-none bg-white shadow-lg rounded-lg"
          ref={(el) => {
            headerRefs.current[1] = el;
          }}
          style={
            isInView
              ? {
                  position: "sticky",
                  top: `${headerPositions[1]?.top}px`,
                }
              : {}
          }
        >
          ID002 - Technical skills
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 px-16"
        >
          <ResumeSection type="skills" data={resumeData.skills} />
        </motion.div>

        <motion.p
          id="ID003"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold mb-8  z-30 border-t-2  border-black/25 py-6 px-4 backdrop-blur-none bg-white shadow-lg rounded-lg"
          ref={(el) => {
            headerRefs.current[2] = el;
          }}
          style={
            isInView
              ? {
                  position: "sticky",
                  top: `${headerPositions[2]?.top}px`,
                }
              : {}
          }
        >
          ID003 - Projects
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 px-16"
        >
          <ResumeSection type="projects" data={resumeData.projects} />
        </motion.div>

        <motion.p
          id="ID004"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold mb-8  z-20 border-t-2  border-black/25 py-6 px-4 backdrop-blur-none bg-white shadow-lg rounded-lg"
          ref={(el) => {
            headerRefs.current[3] = el;
          }}
          style={
            isInView
              ? {
                  position: "sticky",
                  top: `${headerPositions[3]?.top}px`,
                }
              : {}
          }
        >
          ID004 - Achievements
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 px-16"
        >
          <ResumeSection type="achievements" data={resumeData.achievements} />
        </motion.div>

        <motion.p
          id="ID005"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold mb-8  z-10 border-t-2  border-black/25 py-6 px-4 backdrop-blur-none bg-white shadow-lg rounded-lg"
          ref={(el) => {
            headerRefs.current[4] = el;
          }}
          style={
            isInView
              ? {
                  position: "sticky",
                  top: `${headerPositions[4]?.top}px`,
                }
              : {}
          }
        >
          ID005 - Cocurriculars
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 px-16"
        >
          <ResumeSection type="cocurriculars" data={resumeData.cocurriculars} />
        </motion.div>
      </div>
      <div className="h-[200vh]"></div>
    </>
  );
}

const resumeData = {
  education: [
    {
      institution: "Netaji Subhas University of Technology",
      location: "Dwarka, New Delhi",
      degree: "Bachelor of Technology in Computer Science and Engineering",
      period: "2023 - 2027",
    },
    {
      institution: "DAV Public School",
      location: "Sreshtha Vihar, New Delhi",
      degree: "12th Standard(CBSE) - 95.0%",
      period: "2021 - 2023",
    },
    {
      institution: "Holy Angels' Sr. Sec. School",
      location: "Rajendra Nagar, Ghaziabad",
      degree: "10th Standard(ICSE) - 95.8%",
      period: "2009 - 2021",
    },
  ],
  skills: {
    languages: "Javascript, Rust, Golang, SQL, Python, C++/C",
    frameworks: "React, Next.js, Vue, Svelte, Flask, Django",
    developerTools: "Git, Docker, VSCode, Pycharm, Linux",
    libraries:
      "Manim, Pygame, Pyglet, FastAPI, BeautifulSoup, Requests, SQLAlchemy",
    mlTools:
      "Matplotlib, Numpy, scikit-learn, Pytorch, Langchain, Transformers, OpenCV",
  },
  projects: [
    {
      name: "EcoMitra",
      tech: "NextJS, PostgreSQL, Prisma",
      link: "Github",
      points: [
        "Built a dashboard that summarized banking statements and improved insight clarity, used by 50+ users.",
        "Leveraged AI to enhance financial literacy with features including budget tracking, expense categorization, and investment education.",
      ],
    },
    {
      name: "Skin Cancer Detection Using EfficientNet",
      tech: "PyTorch, EfficientNet, OpenCV",
      link: "Github",
      points: [
        "Developed and fine-tuned a deep learning model (EfficientNet-B4) for highly accurate skin cancer (melanoma) detection, achieving 94% accuracy, 96% recall, and a 0.98 AUC on the test set.",
        "Leveraged transfer learning, data augmentation, and Grad-CAM visualization to build a robust and interpretable deep learning model for skin cancer detection.",
      ],
    },
    {
      name: "Email Client",
      tech: "NextJS, React, PostgreSQL",
      link: "Github",
      points: [
        "Developed a robust and responsive frontend interface for a PostgreSQL-based email client, focusing on intuitive user experience and efficient handling of email functionalities.",
        "Architected the backend utilizing a PostgreSQL database hosted on Supabase, integrating a secure authentication system to manage user access and data with enhanced scalability.",
      ],
    },
  ],
  achievements: [
    {
      title: "Innohacks'24 Hackathon Winner",
      date: "March 2024",
      points: [
        "Optimized e-commerce logistics by solving routing problems and enabling polygon-based delivery zones.",
        "Implemented a fair catalog review system using a random classifier to allow only verified buyers to submit reviews.",
      ],
    },
    {
      title: "JEE Mains",
      date: "January 2023",
      points: [
        "Achieved 99.44 Percentile with an All India Rank (AIR) of 6572 among 1.1 million candidates.",
      ],
    },
  ],
  cocurriculars: [
    {
      role: "Web Dev Mentor",
      organization: "Google Developer Student Clubs, NSUT",
      period: "2024 - Present",
      points: [
        "Mentoring a cohort of 30+ students, delivering hands-on sessions and guiding them through real-world full-stack projects.",
        "Contributed significantly to building a Next.js + PostgreSQL CMS for internal society use, helping streamline event and announcement management and reducing manual coordination by≈50%.",
      ],
    },
    {
      role: "Junior Council",
      organization: "Devcomm (International Developers' Community), NSUT",
      period: "2024 - Present",
      points: [
        "Collaborated with 50+ developers across branches to design a gamified DSA practice platform, targeting increased engagement with competitive coding.",
        "Collaborated with a team of 6 to design and develop a high-performance, animated website for Avinya'25 using React and Framer Motion, emphasizing responsive design and smooth UI/UX transitions.",
      ],
    },
  ],
  contact: {
    phone: "+91 9540479733",
    email: "ayshthkr@gmail.com",
    linkedin: "linkedin.com/in/ayshthkr",
    github: "github.com/ayshthkr",
  },
};
