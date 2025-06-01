"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Timeline,
  TimelineContent,
  TimelineDot,
  TimelineHeading,
  TimelineItem,
  TimelineLine,
} from "@/components/ui/timeline";
import {
  ArrowUpRight,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Send,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";

export default function TabsComponent() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    alert("Use the multiple contact methods provided you lazy");
  };

  return (
    <div
      className="w-full max-w-5xl mx-auto min-h-[75vh] flex items-center justify-center"
      id="tabsComponent"
    >
      <Tabs
        defaultValue="tab-1"
        orientation="vertical"
        className="flex w-full gap-2 md:gap-24"
      >
        <TabsList className="flex-col rounded-none border-l border-border bg-transparent p-0">
          <TabsTrigger
            value="tab-1"
            className="relative w-full justify-start rounded-none after:absolute after:inset-y-0 after:start-0 after:w-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
          >
            Education
          </TabsTrigger>
          <TabsTrigger
            value="tab-2"
            className="relative w-full justify-start rounded-none after:absolute after:inset-y-0 after:start-0 after:w-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
          >
            Projects
          </TabsTrigger>
          <TabsTrigger
            value="tab-3"
            className="relative w-full justify-start rounded-none after:absolute after:inset-y-0 after:start-0 after:w-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
          >
            Contact me
          </TabsTrigger>
        </TabsList>
        <div className="grow rounded-lg border border-border text-start text-sm">
          <TabsContent value="tab-1">
            <Timeline>
              <TimelineItem status="done">
                <TimelineHeading>
                  Netaji Subhas University of Technology
                </TimelineHeading>
                <TimelineDot status="current" />
                <TimelineLine done />
                <TimelineContent>(2023 - 2027)</TimelineContent>
              </TimelineItem>
              <TimelineItem status="done">
                <TimelineHeading>
                  DAV Public School, Sreshtha Vihar
                </TimelineHeading>
                <TimelineDot status="done" />
                <TimelineLine done />
                <TimelineContent>(2021 - 2023)</TimelineContent>
              </TimelineItem>
              <TimelineItem status="done">
                <TimelineHeading>
                  Holy Angels Sr. Sec. School, Sahibabad
                </TimelineHeading>
                <TimelineDot status="done" />
                <TimelineContent>(2009 - 2021)</TimelineContent>
              </TimelineItem>
            </Timeline>
          </TabsContent>
          <TabsContent value="tab-2">
            <div className="flex justify-center items-center p-4">
              <div className="w-full max-w-7xl">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {projects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="tab-3">
            <div className="grid md:grid-cols-2 gap-6 p-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10 transition-all duration-300 hover:border-primary focus:border-primary"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 9988 776655"
                      className="pl-10 transition-all duration-300 hover:border-primary focus:border-primary"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-primary/75">
                  <Send className="mr-2 h-4 w-4" /> Send Message
                </Button>
              </form>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">Connect with me</h3>
                <div className="grid grid-cols-3 gap-4">
                  <SocialIcon
                    href="https://linkedin.com/in/ayshthkr"
                    icon={<Linkedin  />}
                    label="LinkedIn"
                  />
                  <SocialIcon
                    href="https://ayshthkr.vercel.app"
                    icon={<Globe />}
                    label="Website"
                  />
                  <SocialIcon
                    href="https://github.com/ayshthkr"
                    icon={<Github />}
                    label="GitHub"
                  />
                  <SocialIcon
                    href="https://instagram.com/ayshthkr"
                    icon={<Instagram />}
                    label="Instagram"
                  />
                  <SocialIcon
                    href="https://twitter.com/ayshthkr"
                    icon={<Twitter />}
                    label="Twitter"
                  />
                  <SocialIcon
                    href="https://bsky.app/profile/ayshthkr.bsky.social"
                    icon={<Send />}
                    label="Bluesky"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

function SocialIcon({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      prefetch={false}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-100 hover:bg-primary/80 hover:text-white transition-all duration-300 transform hover:scale-105"
    >
      {icon}
      <span className="mt-2 text-[11px] md:text-sm">{label}</span>
    </Link>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const heights = ["h-[100px]", "h-[125px]", "h-[150px]"];
  const height = heights[index % heights.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={project.link} passHref>
        <motion.div
          className={`relative ${height} ${project.color} rounded-lg p-3 overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl`}
          whileHover="hover"
        >
          <h2 className="text-sm font-semibold mb-1 truncate">
            {project.title}
          </h2>
          <p className="text-xs text-gray-600 line-clamp-2">
            {project.description}
          </p>
          <ArrowUpRight className="absolute bottom-2 right-2 w-4 h-4 opacity-0 transition-opacity duration-300" />
          <motion.div
            className="absolute bottom-0 left-0 w-full h-0.5 bg-black"
            initial={{ scaleX: 0 }}
            variants={{
              hover: { scaleX: 1, transition: { duration: 0.3 } },
            }}
          />
          <HoverAnimation index={index} />
        </motion.div>
      </Link>
    </motion.div>
  );
}

function HoverAnimation({ index }: { index: number }) {
  const animations = [
    // Ripple effect
    <motion.div
      key="ripple"
      className="absolute inset-0 bg-white rounded-full"
      initial={{ scale: 0, opacity: 0 }}
      variants={{
        hover: {
          scale: 1.5,
          opacity: 0,
          transition: { duration: 0.5, repeat: Number.POSITIVE_INFINITY },
        },
      }}
    />,
    // Rotating border
    <motion.div
      key="rotating-border"
      className="absolute inset-0 border border-black rounded-lg"
      initial={{ rotate: 0 }}
      variants={{
        hover: {
          rotate: 360,
          transition: {
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          },
        },
      }}
    />,
    // Pulsating background
    <motion.div
      key="pulsating-bg"
      className="absolute inset-0 bg-black"
      initial={{ opacity: 0 }}
      variants={{
        hover: {
          opacity: [0, 0.05, 0],
          transition: { duration: 1, repeat: Number.POSITIVE_INFINITY },
        },
      }}
    />,
    // Corner dots
    <motion.div
      key="corner-dots"
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      variants={{
        hover: { opacity: 1 },
      }}
    >
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-black rounded-full"
          style={{
            top: i < 2 ? 0 : "auto",
            bottom: i >= 2 ? 0 : "auto",
            left: i % 2 === 0 ? 0 : "auto",
            right: i % 2 !== 0 ? 0 : "auto",
          }}
          initial={{ scale: 0 }}
          variants={{
            hover: { scale: 1, transition: { duration: 0.3 } },
          }}
        />
      ))}
    </motion.div>,
    // Sliding underline
    <motion.div
      key="sliding-underline"
      className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
      initial={{ scaleX: 0 }}
      variants={{
        hover: { scaleX: 1, transition: { duration: 0.3 } },
      }}
    />,
    // Radial gradient
    <motion.div
      key="radial-gradient"
      className="absolute inset-0 bg-gradient-radial from-transparent to-black rounded-lg"
      initial={{ opacity: 0 }}
      variants={{
        hover: { opacity: 0.1, transition: { duration: 0.3 } },
      }}
    />,
    // Bouncing dots
    <motion.div
      key="bouncing-dots"
      className="absolute bottom-1 right-1 flex space-x-0.5"
      initial={{ opacity: 0 }}
      variants={{
        hover: { opacity: 1 },
      }}
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1 h-1 bg-black rounded-full"
          variants={{
            hover: {
              y: [0, -3, 0],
              transition: {
                duration: 0.5,
                delay: i * 0.1,
                repeat: Number.POSITIVE_INFINITY,
              },
            },
          }}
        />
      ))}
    </motion.div>,
    // Expanding circle
    <motion.div
      key="expanding-circle"
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0 }}
      variants={{
        hover: { opacity: 1 },
      }}
    >
      <motion.div
        className="w-4 h-4 bg-black rounded-full"
        initial={{ scale: 0 }}
        variants={{
          hover: {
            scale: 2,
            opacity: 0,
            transition: { duration: 0.5, repeat: Number.POSITIVE_INFINITY },
          },
        }}
      />
    </motion.div>,
  ];

  return animations[index % animations.length];
}

const projects = [
  {
    id: 1,
    title: "E-commerce",
    description: "Online shopping",
    link: "/projects/ecommerce",
    color: "bg-blue-100",
  },
  {
    id: 2,
    title: "Weather App",
    description: "Forecasts",
    link: "/projects/weather",
    color: "bg-green-100",
  },
  {
    id: 3,
    title: "Task Manager",
    description: "Stay organized",
    link: "/projects/task-manager",
    color: "bg-yellow-100",
  },
  {
    id: 4,
    title: "Social Dashboard",
    description: "Analytics",
    link: "/projects/social-dashboard",
    color: "bg-purple-100",
  },
  {
    id: 5,
    title: "Fitness Tracker",
    description: "Health monitor",
    link: "/projects/fitness",
    color: "bg-red-100",
  },
  {
    id: 6,
    title: "Recipe Finder",
    description: "Culinary delights",
    link: "/projects/recipes",
    color: "bg-orange-100",
  },
];
