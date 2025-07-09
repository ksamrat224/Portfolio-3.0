
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download, ChevronDown, ChevronUp, MapPin, Mail, Phone, Calendar } from 'lucide-react';

const Resume = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [expandedSections, setExpandedSections] = useState<string[]>(['skills']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const skills = [
    { category: 'Frontend', items: ['React', 'TypeScript','React Native'], level: 90 },
    { category: 'Backend', items: ['Node.js', 'PHP'], level: 85 },
    { category: 'Database', items: [ 'PostgreSQL', 'MySQL', 'Redis'], level: 80 },
    { category: 'Design', items: ['Figma'], level: 70 },
  ];

  const experience = [
   
    {
      title: 'Junior Full Stack Intern',
      company: 'Rato Guras Technology',
      location: 'Kanepokhari, Morang',
      period: '2025 April-Present',
      description: 'Focused on frontend development using React and React Native and backend development using Laravel. Gained experience in agile development methodologies.',
      achievements: [
        'Developed reusable component libraries',
        'Implemented responsive design principles',
        'Contributed to the development of a mobile application using React Native',
      ]
    }
  ];

  const education = [
    {
      degree: 'Bachelor of Science in Computer Science and Information Technology',
      school: 'Tribhuvan University',
      period: '2022 - 2026',
      gpa: '3.3/4.0',
      relevant: ['Data Structures & Algorithms','Design and Analysis of Algorithms','Software Engineering', 'Database Systems', 'Web Development']
    }
  ];

  const certifications = [
    'Full Stack Web Development Bootcamp',
    
  ];

  const handleDownload = () => {
    // will link later on
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'samrat-resume.pdf';
    link.click();
  };

  return (
    <section id="resume" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Resume</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              My professional journey and technical expertise
            </p>
            <button
              onClick={handleDownload}
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download size={20} />
              <span>Download PDF</span>
            </button>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Personal Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="bg-gray-50 rounded-lg p-8 mb-8"
            >
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Samrat Karki</h3>
                <p className="text-xl text-blue-600 mb-4">Junior Full Stack Developer</p>
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <Mail size={16} className="text-gray-600" />
                  <span className="text-gray-700">samratkarki225@gmail.com</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Phone size={16} className="text-gray-600" />
                  <span className="text-gray-700">(+977) 9863751850</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <MapPin size={16} className="text-gray-600" />
                  <span className="text-gray-700">Biratnagar , Morang</span>
                </div>
              </div>
            </motion.div>

            {/* Skills Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg mb-8"
            >
              <button
                onClick={() => toggleSection('skills')}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-2xl font-bold text-gray-900">Technical Skills</h3>
                {expandedSections.includes('skills') ? <ChevronUp /> : <ChevronDown />}
              </button>
              {expandedSections.includes('skills') && (
                <div className="px-8 pb-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    {skills.map((skillGroup, index) => (
                      <div key={skillGroup.category}>
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold text-gray-900">{skillGroup.category}</h4>
                          <span className="text-sm text-gray-600">{skillGroup.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${skillGroup.level}%` } : {}}
                            transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                            className="bg-blue-700 h-2 rounded-full"
                          />
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {skillGroup.items.map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Experience Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg mb-8"
            >
              <button
                onClick={() => toggleSection('experience')}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-2xl font-bold text-gray-900">Work Experience</h3>
                {expandedSections.includes('experience') ? <ChevronUp /> : <ChevronDown />}
              </button>
              {expandedSections.includes('experience') && (
                <div className="px-8 pb-8">
                  <div className="space-y-8">
                    {experience.map((job, index) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                          <h4 className="text-xl font-bold text-gray-900">{job.title}</h4>
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Calendar size={16} />
                            <span>{job.period}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600 mb-3">
                          <span className="font-semibold">{job.company}</span>
                          <span>•</span>
                          <div className="flex items-center space-x-1">
                            <MapPin size={14} />
                            <span>{job.location}</span>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-4">{job.description}</p>
                        <ul className="space-y-2">
                          {job.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start">
                              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                              <span className="text-gray-600">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Education Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg mb-8"
            >
              <button
                onClick={() => toggleSection('education')}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-2xl font-bold text-gray-900">Education</h3>
                {expandedSections.includes('education') ? <ChevronUp /> : <ChevronDown />}
              </button>
              {expandedSections.includes('education') && (
                <div className="px-8 pb-8">
                  {education.map((edu, index) => (
                    <div key={index} className="border-l-4 border-green-500 pl-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                        <h4 className="text-xl font-bold text-gray-900">{edu.degree}</h4>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Calendar size={16} />
                          <span>{edu.period}</span>
                        </div>
                      </div>
                      <p className="text-lg text-gray-700 mb-2">{edu.school}</p>
                      <p className="text-gray-600 mb-3">GPA: {edu.gpa}</p>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Relevant Coursework:</h5>
                        <div className="flex flex-wrap gap-2">
                          {edu.relevant.map((course) => (
                            <span
                              key={course}
                              className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Certifications Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg"
            >
              <button
                onClick={() => toggleSection('certifications')}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-2xl font-bold text-gray-900">Certifications</h3>
                {expandedSections.includes('certifications') ? <ChevronUp /> : <ChevronDown />}
              </button>
              {expandedSections.includes('certifications') && (
                <div className="px-8 pb-8">
                  <div className="grid md:grid-cols-2 gap-4">
                    {certifications.map((cert, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="w-3 h-3 bg-yellow-500 rounded-full flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
