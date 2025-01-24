export const exampleTemplates = {
  Personal: [
    {
      id: "student-resume",
      title: "Student Resume",
      description: "Perfect for recent graduates or students seeking internships",
      preview: "/placeholder.svg?height=400&width=300",
      content: {
        formData: {
          fullName: "Alex Johnson",
          email: "alex.johnson@email.com",
          phone: "(555) 123-4567",
          summary:
            "Motivated computer science student at XYZ University with a passion for software development and a strong foundation in programming languages such as Java and Python. Seeking an internship opportunity to apply and expand my skills in a professional setting.",
        },
        sections: [
          {
            id: "education",
            title: "Education",
            content: [
              "Bachelor of Science in Computer Science, XYZ University, Expected Graduation: May 2024",
              "Relevant Coursework: Data Structures, Algorithms, Database Systems, Web Development",
              "GPA: 3.8/4.0",
            ],
          },
          {
            id: "experience",
            title: "Experience",
            content: [
              "Software Development Intern, Tech Solutions Inc., Summer 2023",
              "• Assisted in developing and testing new features for a mobile application using React Native",
              "• Collaborated with senior developers to improve code quality and efficiency",
              "• Participated in daily stand-up meetings and bi-weekly code reviews",
              "Teaching Assistant, XYZ University Computer Science Department, Fall 2022",
              "• Assisted professor in teaching introductory programming course to 50+ students",
              "• Held weekly office hours to provide one-on-one support to students",
            ],
          },
          {
            id: "projects",
            title: "Projects",
            content: [
              "Personal Budget Tracker (GitHub)",
              "• Developed a web application using React and Node.js to help users manage personal finances",
              "• Implemented user authentication and data visualization features",
              "Machine Learning Image Classifier",
              "• Created a convolutional neural network to classify images using TensorFlow and Keras",
              "• Achieved 92% accuracy on a test dataset of 10,000 images",
            ],
          },
          {
            id: "skills",
            title: "Skills",
            content: [
              "Programming Languages: Java, Python, JavaScript, HTML/CSS",
              "Frameworks & Tools: React, Node.js, Git, Docker",
              "Databases: MySQL, MongoDB",
              "Soft Skills: Problem-solving, Teamwork, Communication",
            ],
          },
        ],
      },
    },
    {
      id: "career-change",
      title: "Career Change",
      description: "Highlight transferable skills for a career transition",
      preview: "/placeholder.svg?height=400&width=300",
      content: {
        formData: {
          fullName: "Sam Taylor",
          email: "sam.taylor@email.com",
          phone: "(555) 987-6543",
          summary:
            "Experienced marketing professional transitioning to a career in UX/UI design. Combining strong communication skills, creativity, and a user-centered approach to create intuitive and visually appealing digital experiences. Seeking opportunities to apply my diverse background to solve complex design challenges.",
        },
        sections: [
          {
            id: "experience",
            title: "Relevant Experience",
            content: [
              "UX/UI Design Intern, DesignHub Agency, 2023-Present",
              "• Assisted in the redesign of a mobile banking app, improving user satisfaction scores by 25%",
              "• Conducted user research and created personas for various client projects",
              "• Collaborated with development teams to ensure design implementation accuracy",
              "Marketing Manager, Brand Innovators Co., 2018-2023",
              "• Led rebranding initiatives, including website redesign and user experience improvements",
              "• Managed social media campaigns, increasing engagement rates by 40%",
              "• Analyzed user data to optimize marketing strategies and improve conversion rates",
            ],
          },
          {
            id: "education",
            title: "Education and Certifications",
            content: [
              "UX/UI Design Bootcamp, Design Academy, 2023",
              "• Completed 500+ hours of hands-on UX/UI design training",
              "Google UX Design Professional Certificate, 2023",
              "Bachelor of Arts in Marketing, State University, 2014-2018",
            ],
          },
          {
            id: "skills",
            title: "Skills",
            content: [
              "UX/UI Design: User Research, Wireframing, Prototyping, Usability Testing",
              "Design Tools: Figma, Adobe XD, Sketch, InVision",
              "Marketing: Digital Marketing, Content Strategy, Analytics",
              "Transferable Skills: Project Management, Client Relations, Data Analysis",
            ],
          },
          {
            id: "projects",
            title: "Design Projects",
            content: [
              "E-commerce Website Redesign",
              "• Conducted user research and created a new information architecture to improve navigation",
              "• Designed responsive mockups and interactive prototypes using Figma",
              "Nonprofit Organization App",
              "• Volunteered to design a mobile app for a local nonprofit to manage donations and events",
              "• Created user flows, wireframes, and high-fidelity prototypes",
            ],
          },
        ],
      },
    },
    {
      id: "fresh-graduate",
      title: "Fresh Graduate",
      description: "Emphasize academic achievements and internships for entry-level positions",
      preview: "/placeholder.svg?height=400&width=300",
      content: {
        formData: {
          fullName: "Jordan Lee",
          email: "jordan.lee@email.com",
          phone: "(555) 234-5678",
          summary:
            "Recent graduate with a degree in Business Administration, specializing in Finance. Eager to apply strong analytical and problem-solving skills in a challenging entry-level finance position. Committed to continuous learning and professional growth in the financial services industry.",
        },
        sections: [
          {
            id: "education",
            title: "Education",
            content: [
              "Bachelor of Science in Business Administration, Finance Major, University of Finance, 2023",
              "• GPA: 3.7/4.0",
              "• Relevant Coursework: Financial Management, Investment Analysis, Corporate Finance, Financial Modeling",
              "• Honors: Dean's List (All Semesters), Beta Gamma Sigma Honor Society Member",
            ],
          },
          {
            id: "experience",
            title: "Internships and Work Experience",
            content: [
              "Financial Analyst Intern, Global Investments Inc., Summer 2022",
              "• Assisted in the preparation of financial reports and presentations for client meetings",
              "• Conducted market research and contributed to the development of investment strategies",
              "• Shadowed senior analysts in client meetings and portfolio reviews",
              "Student Finance Association, University Treasurer, 2021-2023",
              "• Managed a budget of $10,000 for club activities and events",
              "• Organized finance workshops and networking events with industry professionals",
            ],
          },
          {
            id: "projects",
            title: "Academic Projects",
            content: [
              "Portfolio Management Simulation",
              "• Led a team of 4 in a semester-long investment simulation, achieving a 12% return",
              "• Developed and implemented various investment strategies based on market analysis",
              "Financial Statement Analysis Project",
              "• Conducted in-depth analysis of Apple Inc.'s financial statements over a 5-year period",
              "• Presented findings and recommendations to a panel of professors and industry experts",
            ],
          },
          {
            id: "skills",
            title: "Skills",
            content: [
              "Technical Skills: Financial Modeling, Microsoft Excel (Advanced), Bloomberg Terminal, Python (Basic)",
              "Analytical Skills: Data Analysis, Financial Statement Analysis, Risk Assessment",
              "Soft Skills: Problem-solving, Teamwork, Presentation Skills, Attention to Detail",
            ],
          },
        ],
      },
    },
  ],
  Professional: [
    {
      id: "software-engineer",
      title: "Software Engineer",
      description: "Showcase your technical skills and project experience",
      preview: "/placeholder.svg?height=400&width=300",
      content: {
        formData: {
          fullName: "Taylor Rodriguez",
          email: "taylor.rodriguez@email.com",
          phone: "(555) 246-8135",
          summary:
            "Experienced software engineer with 5+ years of expertise in full-stack development. Passionate about creating scalable and efficient solutions using cutting-edge technologies. Strong problem-solving skills and a track record of delivering high-quality projects on time. Adept at leading teams and mentoring junior developers.",
        },
        sections: [
          {
            id: "experience",
            title: "Professional Experience",
            content: [
              "Senior Software Engineer, Tech Innovations Inc., 2020-Present",
              "• Led development of a microservices-based e-commerce platform, improving scalability by 200%",
              "• Implemented CI/CD pipelines using Jenkins and Docker, reducing deployment time by 70%",
              "• Mentored junior developers and conducted code reviews, improving team productivity by 25%",
              "• Optimized database queries, resulting in a 40% improvement in application performance",
              "Software Engineer, DataSoft Solutions, 2018-2020",
              "• Developed and maintained RESTful APIs for mobile and web applications",
              "• Collaborated with UX/UI designers to implement responsive front-end designs",
              "• Participated in Agile development processes, including daily stand-ups and sprint planning",
            ],
          },
          {
            id: "projects",
            title: "Key Projects",
            content: [
              "AI-Powered Chatbot",
              "• Developed a customer service chatbot using natural language processing techniques",
              "• Integrated the chatbot with existing CRM systems, reducing customer response time by 50%",
              "Real-time Analytics Dashboard",
              "• Created a real-time data visualization dashboard using React and D3.js",
              "• Implemented WebSocket connections to display live updates from various data sources",
            ],
          },
          {
            id: "skills",
            title: "Technical Skills",
            content: [
              "Languages: Java, Python, JavaScript, TypeScript",
              "Frameworks: Spring Boot, React, Node.js, Express",
              "Databases: PostgreSQL, MongoDB, Redis",
              "Tools: Docker, Kubernetes, Jenkins, Git",
              "Cloud Platforms: AWS, Google Cloud Platform",
              "Methodologies: Agile, Scrum, Test-Driven Development",
            ],
          },
          {
            id: "education",
            title: "Education",
            content: [
              "Master of Science in Computer Science, Tech University, 2016-2018",
              "Bachelor of Science in Software Engineering, State University, 2012-2016",
            ],
          },
        ],
      },
    },
    {
      id: "marketing-specialist",
      title: "Marketing Specialist",
      description: "Highlight your campaign successes and strategic planning",
      preview: "/placeholder.svg?height=400&width=300",
      content: {
        formData: {
          fullName: "Morgan Chen",
          email: "morgan.chen@email.com",
          phone: "(555) 369-2580",
          summary:
            "Results-driven marketing specialist with 6 years of experience in digital marketing and brand strategy. Proven track record of developing and executing successful marketing campaigns that drive engagement and increase ROI. Skilled in data analysis and marketing automation tools.",
        },
        sections: [
          {
            id: "experience",
            title: "Professional Experience",
            content: [
              "Senior Marketing Specialist, Global Brands Co., 2020-Present",
              "• Developed and executed multi-channel marketing campaigns, resulting in a 35% increase in customer acquisition",
              "• Implemented marketing automation strategies, improving lead nurturing efficiency by 50%",
              "• Managed a team of 3 content creators, increasing blog traffic by 75% and social media engagement by 60%",
              "• Collaborated with product teams to create compelling content for product launches",
              "Marketing Coordinator, StartUp Innovations, 2017-2020",
              "• Managed social media presence, growing followers by 200% and increasing engagement rates by 75%",
              "• Conducted market research to identify new opportunities and optimize marketing strategies",
              "• Assisted in the development of brand guidelines and marketing materials",
            ],
          },
          {
            id: "skills",
            title: "Skills",
            content: [
              "Digital Marketing: SEO, SEM, Content Marketing, Email Marketing, Social Media Marketing",
              "Analytics: Google Analytics, Adobe Analytics, Data Studio",
              "Tools: HubSpot, Salesforce, Hootsuite, Mailchimp, Canva",
              "Soft Skills: Strategic Planning, Project Management, Cross-functional Collaboration",
            ],
          },
          {
            id: "achievements",
            title: "Key Achievements",
            content: [
              "Led a rebranding campaign that increased brand awareness by 40% and website traffic by 55%",
              "Developed a customer loyalty program that improved customer retention rates by 25%",
              "Received 'Marketer of the Year' award at Global Brands Co. in 2022",
            ],
          },
          {
            id: "education",
            title: "Education",
            content: [
              "Bachelor of Business Administration in Marketing, University of Business, 2013-2017",
              "Digital Marketing Certification, Google Digital Garage, 2019",
              "Content Marketing Certification, HubSpot Academy, 2021",
            ],
          },
        ],
      },
    },
    {
      id: "data-scientist",
      title: "Data Scientist",
      description: "Emphasize your analytical skills and impactful projects",
      preview: "/placeholder.svg?height=400&width=300",
      content: {
        formData: {
          fullName: "Alex Patel",
          email: "alex.patel@email.com",
          phone: "(555) 789-0123",
          summary:
            "Innovative data scientist with 4+ years of experience in applying advanced analytics and machine learning techniques to solve complex business problems. Proven track record of developing predictive models and translating data insights into actionable strategies. Skilled in collaborating with cross-functional teams to drive data-informed decision-making.",
        },
        sections: [
          {
            id: "experience",
            title: "Professional Experience",
            content: [
              "Senior Data Scientist, TechCorp Analytics, 2021-Present",
              "• Developed a machine learning model to predict customer churn, resulting in a 20% increase in retention rates",
              "• Led a team of 3 data scientists in creating a recommendation engine that improved cross-sell opportunities by 35%",
              "• Implemented natural language processing techniques to analyze customer feedback, identifying key areas for product improvement",
              "• Collaborated with the marketing team to optimize campaign targeting, leading to a 25% increase in conversion rates",
              "Data Scientist, FinTech Innovations, 2019-2021",
              "• Built and deployed fraud detection models, reducing fraudulent transactions by 40%",
              "• Conducted time series analysis to forecast market trends, supporting strategic decision-making",
              "• Developed interactive dashboards using Tableau to visualize key performance indicators for executives",
            ],
          },
          {
            id: "skills",
            title: "Technical Skills",
            content: [
              "Programming Languages: Python, R, SQL",
              "Machine Learning: Scikit-learn, TensorFlow, PyTorch, XGBoost",
              "Big Data Technologies: Hadoop, Spark, Hive",
              "Data Visualization: Tableau, PowerBI, Matplotlib, Seaborn",
              "Cloud Platforms: AWS (SageMaker, EMR), Google Cloud Platform",
              "Statistical Analysis: Hypothesis Testing, Regression Analysis, Time Series Analysis",
            ],
          },
          {
            id: "projects",
            title: "Key Projects",
            content: [
              "Predictive Maintenance Model for Manufacturing Equipment",
              "• Developed an IoT-based predictive maintenance model that reduced equipment downtime by 30%",
              "• Implemented real-time anomaly detection using streaming data analytics",
              "Customer Segmentation and Personalization Engine",
              "• Created a clustering algorithm to segment customers based on behavior and preferences",
              "• Resulted in a 15% increase in customer engagement and a 10% boost in sales",
            ],
          },
          {
            id: "education",
            title: "Education",
            content: [
              "Master of Science in Data Science, Tech Institute, 2017-2019",
              "Bachelor of Science in Statistics, State University, 2013-2017",
              "Certifications: AWS Certified Machine Learning – Specialty, Databricks Certified Associate Developer for Apache Spark",
            ],
          },
        ],
      },
    },
  ],
  Creative: [
    {
      id: "minimalist",
      title: "Minimalist",
      description: "Clean and simple design focusing on essential information",
      preview: "/placeholder.svg?height=400&width=300",
    },
    {
      id: "infographic",
      title: "Infographic",
      description: "Visual representation of your skills and experience",
      preview: "/placeholder.svg?height=400&width=300",
    },
    {
      id: "timeline",
      title: "Timeline",
      description: "Chronological display of your career progression",
      preview: "/placeholder.svg?height=400&width=300",
    },
  ],
}

export const designTemplates = [
  { value: "default", label: "Default", primaryColor: "#000000", secondaryColor: "#ffffff" },
  { value: "modern", label: "Modern", primaryColor: "#2c3e50", secondaryColor: "#ecf0f1" },
  { value: "creative-vertical", label: "Creative Vertical", primaryColor: "#e74c3c", secondaryColor: "#ffffff" },
  { value: "creative-horizontal", label: "Creative Horizontal", primaryColor: "#3498db", secondaryColor: "#ffffff" },
  { value: "minimalist", label: "Minimalist", primaryColor: "#34495e", secondaryColor: "#bdc3c7" },
  { value: "infographic", label: "Infographic", primaryColor: "#27ae60", secondaryColor: "#f1c40f" },
  { value: "timeline", label: "Timeline", primaryColor: "#8e44ad", secondaryColor: "#ecf0f1" },
]

