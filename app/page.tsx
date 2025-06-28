"use client";
import Image from "next/image";
import Link from "next/link";

const links = {
  Github: "https://github.com/ayshthkr",
  LinkedIn: "https://www.linkedin.com/in/ayshthkr",
  Resume: "/resume.pdf",
  Twitter: "https://x.com/ayshthkr",
  Instagram: "https://www.instagram.com/ayshthkr",
  Figma: "https://www.figma.com/community/file/1512516746727590640/designs",
  Designs: "/designs"
};

export default function Home() {
  return (
    <div className="flex flex-col gap-2 items-center min-h-screen w-full font-satoshi mt-10 selection:bg-red-500 selection:text-white ">
      {/* <DrawerComponent /> */}
      <div className="block md:max-w-[40vw] p-8">
        <p className="text-xl md:text-3xl font-black animate-in slide-in-from-bottom-2 fade-in delay-75 duration-200 ">AYUSH THAKUR</p>
        <p className="text-sm md:text-xl font-medium mt-3">
          3rd Year B.Tech (CSE) student at Netaji Subhas University of
          Technology
        </p>
        <p className="text-sm md:text-base font-normal mt-3">
          Full-stack developer and AI/ML enthusiast, passionate about building
          performant, user-focused web apps. Exploring the edge of GenAI, dev
          tooling, and visual computing.
        </p>
        <p className="text-sm md:text-base font-normal, mt-2">
          Want to get in touch, react out via the links below!
        </p>

        <div className="flex flex-wrap mt-2">
          {Object.entries(links).map(([name, url]) => (
            <Link
              key={name}
              href={url}
              className="underline mx-2 hover:decoration-2 hover:text-red-500 block transition-all text-sm"
              target={name != "Designs" ? "_blank" : undefined}
              rel="noopener noreferrer"
            >
              {name}
            </Link>
          ))}
        </div>
        <div className="mt-4 text-sm mx-2">
          Email:{" "}
          <Link
            href="mailto:ayshthkr@gmail.com"
            className="hover:underline transition-all hover:text-red-500"
          >
            ayshthkr@gmail.com
          </Link>
        </div>
        <div className="mt-6 animate-in slide-in-from-bottom-3 fade-in delay-150 duration-300">
          <p className="text-xl font-extrabold">Projects:</p>
          <div
            className="bg-gray-100 p-2 m-4 rounded-lg hover:scale-[1.02] hoverr:bg-gray-200 transition-all cursor-pointer"
            onClick={() =>
              window.open("https://github.com/ayshthkr/ecomitra", "_blank")
            }
          >
            <p className="text-sm p-4 flex flex-col md:flex-row md:justify-between">
              <span className="font-bold">EcoMitra</span>{" "}
              <span className="font-mono text-[12px]">
                NextJS, PostgreSQL, Prisma
              </span>
            </p>
            <div className=" p-1">
              <p className="text-sm px-4 flex gap-2 flex-1">
                Built a dashboard that summarized banking statements and
                improved insight clarity, used by 50+ users. <br />
                Leveraged AI to enhance financial literacy with features
                including budget tracking, expense categorization, and
                investment education.
              </p>
              <Image
                src={"/ecomitra-screenshot.png"}
                width={1771}
                height={1068}
                className="w-full p-4  object-contain"
                alt="Ecomitra screengrab"
              />
            </div>
          </div>

           <div
            className="bg-gray-100 p-2 m-4 rounded-lg hover:scale-[1.02] hoverr:bg-gray-200 transition-all cursor-pointer"
            onClick={() =>
              window.open("https://github.com/ayshthkr/insights", "_blank")
            }
          >
            <p className="text-sm p-4 flex flex-col md:flex-row md:justify-between">
              <span className="font-bold">Insights</span>{" "}
              <span className="font-mono text-[12px]">
                NextJS, PostgreSQL, Gemini/Exa
              </span>
            </p>
            <div className="p-1">
              <p className="text-sm px-4 flex gap-2 flex-1">
                Developed an AI-powered full-stack search engine with
                dynamic query classification (Gemini 2.5 + Exa for web
                search) and intelligent context refinement.
                <br />
                Improved the user experience with source citations and
                multi-format exports (PDF, Markdown, Word, Text) to
                support smooth, interactive searching.
              </p>
              <Image
                src={"/insights-ui.png"}
                width={1771}
                height={1068}
                className="w-full p-4 object-contain"
                alt="Email Client"
              />
            </div>
          </div>

          <div
            className="bg-gray-100 p-2 m-4 rounded-lg hover:scale-[1.02] hoverr:bg-gray-200 transition-all cursor-pointer"
            onClick={() =>
              window.open(
                "https://github.com/ayshthkr/SkinCancerDetectionUsingCNN",
                "_blank"
              )
            }
          >
            <p className="text-sm p-4 flex flex-col md:flex-row md:justify-between">
              <span className="font-bold">
                Skin Cancer Detection Using EfficientNet
              </span>{" "}
              <span className="font-mono text-[12px]">
                PyTorch, EfficientNet, OpenCV
              </span>
            </p>
            <div className="p-1">
              <p className="text-sm px-4 flex gap-2 flex-1">
                Developed and fine-tuned a deep learning model (EfficientNet-B4)
                for highly accurate skin cancer (melanoma) detection, achieving
                94% accuracy, 96% recall, and a 0.98 AUC on the test set.
                <br />
                Leveraged transfer learning, data augmentation, and Grad-CAM
                visualization to build a robust and interpretable deep learning
                model for skin cancer detection.
              </p>
              <Image
                src={"/skin-cancer-training.png"}
                width={1771}
                height={1068}
                className="w-full p-4 object-contain"
                alt="Skin Cancer Detection Training"
              />
            </div>
          </div>

        </div>
        <div className="mt-8 py-4 animate-in slide-in-from-bottom-3 fade-in delay-150 duration-300">
          <p className="text-xl font-extrabold">Achievements:</p>
          <div className="p-6 space-y-4">
            <p className="text-sm">
              <span className="font-bold">
                Innohacks&apos;24 Winner (March 2024)
              </span>{" "}
              - Built an optimized e-commerce logistics system with
              polygon-based delivery zones and a fair, buyer-verified review
              system.
            </p>
            <p>
              <span className="font-bold">JEE Mains (January 2023)</span> -
              Achieved 99.44 Percentile with an All India Rank (AIR) of 6572
              among 1.1 million candidates.
            </p>
          </div>
        </div>
        <div className="mt-2 pb-6 animate-in slide-in-from-bottom-3 fade-in delay-150 duration-300">
          <p className="text-xl font-extrabold">Co-Curricular Activities:</p>
          <div className="p-6 space-y-4">
            <p className="text-sm">
              <span className="font-bold">
                Web Dev Mentor (Google Developer Student Clubs, NSUT)
              </span>{" "}
              - Mentored 30+ students in full-stack web dev, led hands-on
              sessions, and co-built a Next.js + PostgreSQL CMS that streamlined
              event management and cut manual work by ~50%.
            </p>
            <p className="text-sm">
              <span className="font-bold">Junior Council (Devcomm, NSUT)</span>{" "}
              - Co-developed a gamified DSA platform to boost coding engagement
              and helped build Avinya&apos;25&apos;s animated, responsive website using
              React and Framer Motion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
