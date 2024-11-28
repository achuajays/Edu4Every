import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRightIcon, 
  BookOpenIcon, 
  UsersIcon, 
  RocketLaunchIcon, 
  AcademicCapIcon, 
  ChatBubbleLeftRightIcon,
  GlobeAltIcon,
  LightBulbIcon,
  NewspaperIcon
} from '@heroicons/react/24/outline';

const LandingPage = () => {
  const navigate = useNavigate();

  const PrimaryButton = ({ text, onClick, className = '', icon: Icon }) => (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center justify-center gap-2 px-6 py-3
        text-white rounded-lg font-semibold 
        transition-all duration-300 ease-in-out 
        transform hover:scale-105 focus:outline-none 
        focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
        ${className}
      `}
    >
      {text}
      {Icon && <Icon className="w-5 h-5 ml-2" />}
    </button>
  );

  const FeatureCard = ({ title, description, icon: Icon }) => (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group">
      <div className="mb-4 p-3 bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
        <Icon className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">
        {title}
      </h3>
      <p className="text-gray-600 text-center">
        {description}
      </p>
    </div>
  );

  const BlogCard = ({ title, excerpt, date, readTime }) => (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col">
      <div className="mb-4 p-3 bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center self-center">
        <NewspaperIcon className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">
        {title}
      </h3>
      <p className="text-gray-600 text-center mb-4 flex-grow">
        {excerpt}
      </p>
      <div className="text-sm text-gray-500 text-center mb-4">
        {date} • {readTime} min read
      </div>
      <PrimaryButton
        text="Read More"
        onClick={() => navigate('/blog/post')}
        className="bg-blue-600 hover:bg-blue-700 self-center mt-auto"
        icon={ArrowRightIcon}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* SEO Optimized Navbar */}
      <nav 
        className="fixed top-0 left-0 w-full bg-white shadow-md z-50"
        aria-label="Main Navigation"
      >
        <div className="container mx-auto px-4 lg:px-6 py-4 flex justify-between items-center max-w-7xl">
          <h1 
            className="text-2xl font-bold text-blue-700 cursor-pointer hover:text-blue-900 transition-colors"
            onClick={() => navigate('/')}
          >
            Edu4Every
          </h1>
          <div className="flex items-center space-x-4">
            <button
              className="px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors font-medium"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
            <PrimaryButton
              text="Sign Up"
              onClick={() => navigate('/signup')}
              className="bg-blue-600 hover:bg-blue-700"
              icon={ArrowRightIcon}
            />
          </div>
        </div>
      </nav>

      {/* Hero Section with Enhanced SEO */}
      <header 
        className="pt-28 pb-20 px-4 lg:px-6 container mx-auto grid md:grid-cols-2 gap-12 items-center max-w-7xl"
        itemScope 
        itemType="http://schema.org/EducationalWebPage"
      >
        <div className="order-2 md:order-1">
          <h1 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
            itemProp="name"
          >
            Transforming Education, Empowering Futures
          </h1>
          <p 
            className="text-lg text-gray-600 mb-10 max-w-xl"
            itemProp="description"
          >
            A comprehensive digital learning ecosystem designed to bridge educational gaps, 
            provide personalized learning paths, and connect learners with global opportunities 
            through innovative technology and expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <PrimaryButton
              text="Get Started"
              onClick={() => navigate('/signup')}
              className="bg-blue-600 hover:bg-blue-700"
              icon={RocketLaunchIcon}
            />
            <PrimaryButton
              text="Learn More"
              onClick={() => navigate('/about')}
              className="bg-gray-600 hover:bg-gray-700"
              icon={BookOpenIcon}
            />
          </div>
        </div>
        <div className="order-1 md:order-2 flex justify-center items-center">
          <img
            src="https://img.freepik.com/premium-photo/virtual-neural-networks-artificial-intelligence-machine-learning-banner-wallpaper-made-with-generative-ai_155027-3423.jpg?w=1380"
            alt="Edu4Every: Personalized Learning Platform"
            className="w-full max-w-lg rounded-xl shadow-2xl"
            itemProp="image"
          />
        </div>
      </header>

      {/* User Paths Section */}
      <section 
        className="bg-white py-20 px-4 lg:px-6"
        aria-labelledby="choose-path-heading"
      >
        <div className="container mx-auto max-w-7xl text-center">
          <h2 
            id="choose-path-heading" 
            className="text-3xl font-bold text-gray-900 mb-6"
          >
            Tailored Learning Paths for Every Ambition
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            Our platform provides specialized resources and guidance for diverse learning needs, 
            ensuring a personalized educational experience that adapts to your unique goals and potential.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Student Learning",
                description: "Comprehensive adaptive curriculum, interactive learning resources, personalized study tools, and progress tracking to maximize academic potential.",
                path: "/auth/student",
                icon: AcademicCapIcon,
                buttonText: "Student Portal",
                buttonColor: "bg-blue-600 hover:bg-blue-700"
              },
              {
                title: "Educator Empowerment",
                description: "Advanced teaching platforms, professional development modules, curriculum management tools, and data-driven insights to enhance educational delivery.",
                path: "/auth/teacher",
                icon: UsersIcon,
                buttonText: "Teacher Portal",
                buttonColor: "bg-green-600 hover:bg-green-700"
              },
              {
                title: "Career Acceleration",
                description: "Skill assessment, industry-aligned training, mentorship programs, job market intelligence, and personalized career development strategies.",
                path: "/auth/career-guidance",
                icon: RocketLaunchIcon,
                buttonText: "Career Guidance",
                buttonColor: "bg-purple-600 hover:bg-purple-700"
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group"
              >
                <div className="mb-4 p-3 bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto shadow-md group-hover:shadow-lg transition-shadow">
                  <item.icon className={`w-10 h-10 text-${item.buttonColor.split('-')[1]}-600`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-6 min-h-[100px]">
                  {item.description}
                </p>
                <PrimaryButton
                  text={item.buttonText}
                  onClick={() => navigate(item.path)}
                  className={item.buttonColor}
                  icon={ArrowRightIcon}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        className="py-20 bg-gray-50 px-4 lg:px-6"
        aria-labelledby="key-features-heading"
      >
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h2 
            id="key-features-heading"
            className="text-3xl font-bold text-gray-900 mb-12"
          >
            Innovative Learning Solutions
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="Adaptive Learning"
              description="Advanced AI-driven personalization that dynamically adjusts learning paths based on individual progress, learning style, and real-time performance metrics."
              icon={LightBulbIcon}
            />
            <FeatureCard
              title="Global Mentorship"
              description="Connect with world-class educators and industry experts through our comprehensive mentorship network, providing nuanced guidance and professional insights."
              icon={GlobeAltIcon}
            />
            <FeatureCard
              title="Holistic Development"
              description="Beyond technical skills, we focus on soft skills, emotional intelligence, and personal growth to prepare learners for comprehensive professional success."
              icon={BookOpenIcon}
            />
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section 
        className="bg-white py-20 px-4 lg:px-6"
        aria-labelledby="blog-heading"
      >
        <div className="container mx-auto max-w-7xl text-center">
          <h2 
            id="blog-heading"
            className="text-3xl font-bold text-gray-900 mb-12"
          >
            Latest Insights
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "The Future of Personalized Learning",
                excerpt: "Explore how AI and adaptive technologies are revolutionizing education and creating more targeted learning experiences.",
                date: "June 15, 2024",
                readTime: 5
              },
              {
                title: "Bridging the Skills Gap in Tech Education",
                excerpt: "Insights into how modern educational platforms are addressing the disconnect between academic training and industry requirements.",
                date: "May 22, 2024",
                readTime: 7
              },
              {
                title: "Emotional Intelligence in Digital Learning",
                excerpt: "Understanding the critical role of soft skills and emotional intelligence in comprehensive educational development.",
                date: "April 10, 2024",
                readTime: 6
              }
            ].map((blog, index) => (
              <BlogCard 
                key={index}
                title={blog.title}
                excerpt={blog.excerpt}
                date={blog.date}
                readTime={blog.readTime}
              />
            ))}
          </div>
          <div className="mt-12">
            <PrimaryButton
              text="View All Blog Posts"
              onClick={() => navigate('/blog')}
              className="bg-gray-700 hover:bg-gray-800"
              icon={ArrowRightIcon}
            />
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section 
        className="bg-gray-50 py-20 px-4 lg:px-6"
        aria-labelledby="about-us-heading"
      >
        <div className="container mx-auto max-w-4xl text-center">
          <h2 
            id="about-us-heading"
            className="text-3xl font-bold text-gray-900 mb-6"
          >
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 mb-10 max-w-3xl mx-auto">
            Edu4Every is pioneering a revolutionary approach to education by leveraging cutting-edge technology 
            and pedagogical insights. We are committed to democratizing learning, breaking down traditional 
            educational barriers, and creating a global ecosystem where knowledge knows no boundaries.
          </p>
          <PrimaryButton
            text="Discover Our Story"
            onClick={() => navigate('/about')}
            className="bg-gray-700 hover:bg-gray-800"
            icon={ChatBubbleLeftRightIcon}
          />
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="bg-gray-900 text-white py-12 px-4 lg:px-6"
        aria-label="Footer"
      >
        <div className="container mx-auto max-w-7xl text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">Edu4Every</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Revolutionizing education through innovative technology, personalized learning, 
              and a commitment to global accessibility and individual potential.
            </p>
          </div>
          <nav className="flex flex-wrap justify-center space-x-4 md:space-x-6 mt-8">
            <a 
              href="/privacy" 
              className="text-gray-300 hover:text-white transition-colors mb-2"
            >
              Privacy Policy
            </a>
            <a 
              href="/terms" 
              className="text-gray-300 hover:text-white transition-colors mb-2"
            >
              Terms of Service
            </a>
            <a 
              href="/contact" 
              className="text-gray-300 hover:text-white transition-colors mb-2"
            >
              Contact Us
            </a>
            <a 
              href="/blog" 
              className="text-gray-300 hover:text-white transition-colors mb-2"
            >
              Blog
            </a>
            <a 
              href="/careers" 
              className="text-gray-300 hover:text-white transition-colors mb-2"
            >
              Careers
            </a>
          </nav>
          <div className="mt-8 text-gray-400">
            © 2024 Edu4Every. All rights reserved. Empowering learning, transforming futures.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;