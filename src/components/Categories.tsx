"use client";
import { motion } from "framer-motion";
import {
  BookText,
  Brain,
  ClipboardCheck,
  FileText,
  FlaskConical,
  Megaphone,
  Mic,
  Scale,
  Stethoscope,
} from "lucide-react";
import { FaArrowRightLong } from "react-icons/fa6";
import SectionTitle from "./shared/sectionTitle/SectionTitle";
import Link from "next/link";

export default function JobCategories() {
  const categories = [
    {
      icon: <Stethoscope className="w-6 h-6" />,
      title: "Consulting",
      slug: "consulting",
      description: "Get expert advice from certified healthcare professionals.",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Coaching",
      slug: "coaching",
      description:
        "Access professional mentorship for career growth and personal development.",
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Expert Witness",
      slug: "expert-witness",
      description:
        "Obtain expert legal and medical opinions for case evaluations.",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Medical Writing / Content Creation",
      slug: "medical-writing-content-creation",
      description:
        "Receive high-quality medical content crafted by professional writers.",
    },
    {
      icon: <ClipboardCheck className="w-6 h-6" />,
      title: "Résumé Review",
      slug: "resume-review",
      description:
        "Get professional feedback to improve your resume and job applications.",
    },
    {
      icon: <BookText className="w-6 h-6" />,
      title: "Tutoring / Test Prep",
      slug: "tutoring-test-prep",
      description:
        "Prepare for exams with expert-led tutoring sessions and study materials.",
    },
    {
      icon: <FlaskConical className="w-6 h-6" />,
      title: "Product Testing & Reviewing",
      slug: "product-testing-reviewing",
      description:
        "Evaluate and review healthcare and wellness products with expert insights.",
    },
    {
      icon: <Mic className="w-6 h-6" />,
      title: "Mock Interviews",
      slug: "mock-interviews",
      description:
        "Practice and refine your interview skills with professional guidance.",
    },
    {
      icon: <Megaphone className="w-6 h-6" />,
      title: "Brand Ambassadors",
      slug: "brand-ambassadors",
      description:
        "Collaborate with brands to promote healthcare and wellness products.",
    },
  ];

  return (
    <section className="bg-primary/10 section-gap">
      <div className="container">
        <SectionTitle
          miniTitle="Our Categories"
          subtitle=""
          title="Explore Job By Category"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
          {categories.map((category, index) => (
            <motion.div
              initial={{ opacity: 0 }} // Start slightly below
              animate
              whileInView={{ opacity: 1 }} // Animate when in viewport
              viewport={{ once: true, amount: 0.2 }} // Trigger once when 20% visible
              transition={{ duration: 0.7, ease: "easeIn" }}
              key={index}
              className="bg-white p-4 sm:p-6 rounded-lg border border-gray-100 hover:border-primary transition-all duration-300 cursor-pointer group"
            >
              <div className="mb-4">{category.icon}</div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-black mb-2">
                {category.title}
              </h3>
              <p className="text-gray-600 sm:text-lg text-sm leading-relaxed">
                {category.description}
              </p>
              <Link
                href={`/jobs?category=${category.slug}`}
                className="py-2 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <FaArrowRightLong className="text-primary" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
