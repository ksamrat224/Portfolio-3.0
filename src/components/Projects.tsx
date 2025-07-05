
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Link, X, Filter } from 'lucide-react';
import GitHubCalendar from 'react-github-calendar';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with React, Node.js, and MongoDB',
      category: 'full-stack',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80',
      github: 'https://github.com/johndoe/ecommerce',
      demo: 'https://ecommerce-demo.com',
      features: [
        'User authentication and authorization',
        'Shopping cart and checkout system',
        'Payment integration with Stripe',
        'Admin dashboard for inventory management',
        'Responsive design for all devices'
      ]
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates',
      category: 'frontend',
      technologies: ['React', 'TypeScript', 'Socket.io', 'Tailwind CSS'],
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=800&q=80',
      github: 'https://github.com/johndoe/task-manager',
      demo: 'https://task-manager-demo.com',
      features: [
        'Real-time collaboration',
        'Drag and drop interface',
        'Team management',
        'Progress tracking',
        'Dark mode support'
      ]
    },
    {
      id: 3,
      title: 'Weather Analytics Dashboard',
      description: 'Data visualization dashboard for weather analytics',
      category: 'data-viz',
      technologies: ['React', 'D3.js', 'Python', 'FastAPI'],
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=800&q=80',
      github: 'https://github.com/johndoe/weather-dashboard',
      demo: 'https://weather-dashboard-demo.com',
      features: [
        'Interactive charts and graphs',
        'Historical data analysis',
        'Weather forecasting',
        'Export functionality',
        'Mobile responsive design'
      ]
    },
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'full-stack', label: 'Full Stack' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'data-viz', label: 'Data Visualization' },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">My Projects</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Here are some of my recent projects that showcase my skills and experience
            </p>

            {/* Filter buttons */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setFilter(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filter === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Filter size={16} className="inline mr-2" />
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="aspect-video bg-gray-200 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github size={16} />
                        </a>
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Link size={16} />
                        </a>
                      </div>
                      <button className="text-blue-600 text-sm font-medium hover:text-blue-800">
                        View Details →
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* GitHub Contributions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="bg-gray-50 rounded-lg p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">GitHub Contributions</h3>
            <div className="flex justify-center">
              <GitHubCalendar
                username="ksamrat224"
                colorScheme="light"
                fontSize={12}
                blockSize={12}
                hideColorLegend={false}
                hideMonthLabels={false}
                hideTotalCount={false}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-3xl font-bold text-gray-900">{selectedProject.title}</h3>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <div className="aspect-video bg-gray-200 rounded-lg mb-6 overflow-hidden">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <p className="text-gray-600 mb-6 text-lg">{selectedProject.description}</p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedProject.technologies.map((tech: string) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h4>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="flex justify-center space-x-4 mt-8">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <Github size={20} />
                    <span>View Code</span>
                  </a>
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Link size={20} />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
