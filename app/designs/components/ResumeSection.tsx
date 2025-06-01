"use client"

import { motion } from "motion/react"
import {
  Award,
  BookOpen,
  Calendar,
  Code,
  ExternalLink,
  Github,
  GraduationCap,
  Layers,
  Briefcase,
  Terminal,
  PenToolIcon as Tool,
  Users,
} from "lucide-react"

interface EducationItem {
  institution: string
  location: string
  degree: string
  period: string
}

interface SkillsData {
  languages: string
  frameworks: string
  developerTools: string
  libraries: string
  mlTools: string
}

interface ProjectItem {
  name: string
  tech: string
  link: string
  points: string[]
}

interface AchievementItem {
  title: string
  date: string
  points: string[]
}

interface CocurricularItem {
  role: string
  organization: string
  period: string
  points: string[]
}

interface ResumeSectionProps {
  type: "education" | "skills" | "projects" | "achievements" | "cocurriculars"
  data: EducationItem[] | SkillsData | ProjectItem[] | AchievementItem[] | CocurricularItem[]
}

export default function ResumeSection({ type, data }: ResumeSectionProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  // Education section with timeline design
  if (type === "education") {
    const educationData = data as EducationItem[]
    return (
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-purple-400 before:via-pink-500 before:to-purple-800 md:pl-12"
      >
        {educationData.map((edu, index) => (
          <motion.div key={index} variants={item} className="relative mb-12 last:mb-0">
            <div className="absolute -left-8 top-3 h-6 w-6 rounded-full bg-white border-2 border-purple-500 z-10 flex items-center justify-center md:-left-12">
              <GraduationCap className="h-3 w-3 text-purple-600" />
            </div>
            <div className="relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500 transform hover:-translate-y-1">
              <div className="absolute -right-2 -top-2 bg-purple-100 rounded-full p-2">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 pr-8">{edu.institution}</h3>
              <p className="text-gray-600 mt-1 flex items-center">
                <BookOpen className="inline-block mr-2 h-4 w-4 text-purple-500" />
                {edu.location}
              </p>
              <p className="text-lg font-medium mt-3 text-gray-700">{edu.degree}</p>
              <div className="mt-2 inline-block bg-purple-50 px-3 py-1 rounded-full text-purple-700 text-sm font-medium">
                {edu.period}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    )
  }

  // Skills section with visual tags and progress indicators
  if (type === "skills") {
    const skillsData = data as SkillsData

    // Helper function to create skill tags
    const createSkillTags = (skills: string) => {
      return skills.split(", ").map((skill, idx) => (
        <motion.span
          key={idx}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: idx * 0.05 }}
          className="inline-block bg-teal-50 text-teal-700 rounded-full px-3 py-1 text-sm font-medium m-1"
        >
          {skill}
        </motion.span>
      ))
    }

    return (
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="bg-gradient-to-br from-teal-50 to-white rounded-xl p-6 shadow-lg border border-teal-100"
      >
        <div className="grid grid-cols-1 gap-8">
          <motion.div variants={item} className="space-y-4">
            <div className="flex items-center">
              <Code className="h-6 w-6 text-teal-600 mr-2" />
              <h3 className="text-xl font-bold text-gray-800">Languages</h3>
            </div>
            <div className="flex flex-wrap">{createSkillTags(skillsData.languages)}</div>
          </motion.div>

          <motion.div variants={item} className="space-y-4">
            <div className="flex items-center">
              <Layers className="h-6 w-6 text-teal-600 mr-2" />
              <h3 className="text-xl font-bold text-gray-800">Frameworks</h3>
            </div>
            <div className="flex flex-wrap">{createSkillTags(skillsData.frameworks)}</div>
          </motion.div>

          <motion.div variants={item} className="space-y-4">
            <div className="flex items-center">
              <Tool className="h-6 w-6 text-teal-600 mr-2" />
              <h3 className="text-xl font-bold text-gray-800">Developer Tools</h3>
            </div>
            <div className="flex flex-wrap">{createSkillTags(skillsData.developerTools)}</div>
          </motion.div>

          <motion.div variants={item} className="space-y-4">
            <div className="flex items-center">
              <Terminal className="h-6 w-6 text-teal-600 mr-2" />
              <h3 className="text-xl font-bold text-gray-800">Libraries</h3>
            </div>
            <div className="flex flex-wrap">{createSkillTags(skillsData.libraries)}</div>
          </motion.div>

          <motion.div variants={item} className="space-y-4">
            <div className="flex items-center">
              <Layers className="h-6 w-6 text-teal-600 mr-2" />
              <h3 className="text-xl font-bold text-gray-800">ML & Data Tools</h3>
            </div>
            <div className="flex flex-wrap">{createSkillTags(skillsData.mlTools)}</div>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  // Projects section with card design highlighting tech stack
  if (type === "projects") {
    const projectsData = data as ProjectItem[]
    return (
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 gap-8"
      >
        {projectsData.map((project, index) => (
          <motion.div
            key={index}
            variants={item}
            className="bg-gradient-to-br from-blue-50 to-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 transform hover:-translate-y-1"
          >
            <div className="bg-blue-600 h-2"></div>
            <div className="p-6">
              <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                  <Code className="h-5 w-5 text-blue-600 mr-2" />
                  {project.name}
                </h3>
                <a href="#" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                  <Github className="h-4 w-4 mr-1" />
                  <span className="underline">{project.link}</span>
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>

              <div className="mb-4">
                {project.tech.split(", ").map((tech, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs font-medium mr-2 mb-2"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <ul className="space-y-3">
                {project.points.map((point, idx) => (
                  <li key={idx} className="text-gray-600 flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>
    )
  }

  // Achievements section with badge-style design
  if (type === "achievements") {
    const achievementsData = data as AchievementItem[]
    return (
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="space-y-8"
      >
        {achievementsData.map((achievement, index) => (
          <motion.div
            key={index}
            variants={item}
            className="relative bg-gradient-to-br from-amber-50 to-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-amber-500 transform hover:-translate-y-1"
          >
            <div className="absolute -right-3 -top-3 bg-amber-500 rounded-full p-3 shadow-lg">
              <Award className="h-6 w-6 text-white" />
            </div>

            <div className="pr-8">
              <h3 className="text-2xl font-bold text-gray-800">{achievement.title}</h3>
              <div className="mt-2 mb-4 inline-block bg-amber-100 px-3 py-1 rounded-full text-amber-800 text-sm font-medium">
                {achievement.date}
              </div>

              <ul className="space-y-3 mt-4 border-t border-amber-100 pt-4">
                {achievement.points.map((point, idx) => (
                  <li key={idx} className="text-gray-600 flex items-start">
                    <span className="text-amber-500 mr-2 mt-1">★</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>
    )
  }

  // Cocurriculars section with organization-focused design
  if (type === "cocurriculars") {
    const cocurricularsData = data as CocurricularItem[]
    return (
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="space-y-8"
      >
        {cocurricularsData.map((cocurricular, index) => (
          <motion.div
            key={index}
            variants={item}
            className="bg-gradient-to-br from-green-50 to-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="bg-green-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-6 w-6 mr-3" />
                  <h3 className="text-2xl font-bold">{cocurricular.role}</h3>
                </div>
                <span className="bg-green-700 px-3 py-1 rounded-full text-xs font-medium">{cocurricular.period}</span>
              </div>
              <p className="mt-1 text-green-100">{cocurricular.organization}</p>
            </div>

            <div className="p-6">
              <ul className="space-y-3">
                {cocurricular.points.map((point, idx) => (
                  <li key={idx} className="text-gray-600 flex items-start">
                    <Briefcase className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>
    )
  }

  return null
}
