import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Suggestion = {
  field: string
  value: string
  explanation: string
}

type AISuggestionsProps = {
  formData: {
    fullName: string
    email: string
    phone: string
    summary: string
  }
  sections: {
    id: string
    title: string
    content: string[]
  }[]
  resumeType: string
  onApplySuggestion: (field: string, value: string) => void
}

const generateSuggestionsForTemplate = (
  resumeType: string,
  formData: AISuggestionsProps["formData"],
  sections: AISuggestionsProps["sections"],
): Suggestion[] => {
  switch (resumeType) {
    case "student-resume":
      return [
        {
          field: "summary",
          value:
            "Ambitious computer science student at XYZ University with a strong foundation in programming and a passion for innovative technologies. Seeking an internship opportunity to apply classroom knowledge to real-world projects and gain hands-on experience in software development. Proven ability to learn quickly and work effectively in team environments.",
          explanation:
            "This summary highlights your status as a student while emphasizing your enthusiasm, readiness for practical experience, and key soft skills.",
        },
        {
          field: "experience.0",
          value:
            "Software Development Intern | TechStart Inc. | Summer 2023\n• Collaborated with a team of 5 to develop a mobile app for campus event management using React Native and Firebase\n• Implemented user authentication and real-time database updates, improving app responsiveness by 30%\n• Participated in daily stand-ups and bi-weekly code reviews, enhancing team communication and code quality",
          explanation:
            "This experience entry provides specific details about your internship, including technologies used, quantifiable achievements, and demonstration of teamwork.",
        },
        {
          field: "skills.0",
          value:
            "Technical Skills:\n• Programming Languages: Java, Python, JavaScript, C++\n• Web Technologies: HTML5, CSS3, React.js\n• Tools & Platforms: Git, GitHub, Firebase, AWS (basic)\n• Databases: MySQL, MongoDB\n• Soft Skills: Problem-solving, Teamwork, Time Management, Adaptability",
          explanation:
            "This comprehensive list of skills showcases both your technical abilities and important soft skills, making you a well-rounded candidate for internships or entry-level positions.",
        },
      ]
    case "software-engineer":
      return [
        {
          field: "summary",
          value:
            "Innovative software engineer with 5+ years of experience in full-stack development, specializing in scalable web applications and cloud-native solutions. Proven track record of leading teams to deliver high-performance, user-centric products that drive business growth. Adept at translating complex requirements into elegant, efficient code.",
          explanation:
            "This summary emphasizes your experience level, technical expertise, leadership skills, and ability to deliver business value through technology.",
        },
        {
          field: "experience.0",
          value:
            "Senior Software Engineer | InnovateTech Solutions | 2020 - Present\n• Led the redesign and migration of a monolithic e-commerce platform to a microservices architecture, resulting in a 40% increase in user engagement and a 25% reduction in infrastructure costs\n• Implemented CI/CD pipelines using Jenkins and Docker, reducing deployment time by 70% and improving overall system reliability\n• Mentored junior developers and conducted bi-weekly knowledge sharing sessions, fostering a culture of continuous learning and improving team productivity by 20%\n• Optimized database queries and implemented caching strategies, leading to a 50% improvement in application response time",
          explanation:
            "This detailed experience entry showcases your technical leadership, ability to drive significant improvements, and quantifiable achievements in a senior role.",
        },
        {
          field: "skills.0",
          value:
            "Technical Expertise:\n• Languages & Frameworks: Java, Python, JavaScript, TypeScript, React, Node.js, Spring Boot\n• Cloud & DevOps: AWS (EC2, S3, Lambda), Docker, Kubernetes, Jenkins, Terraform\n• Databases: PostgreSQL, MongoDB, Redis\n• Tools & Methodologies: Git, Jira, Agile/Scrum, TDD, Microservices Architecture\n• Soft Skills: Team Leadership, Project Management, Technical Writing, Client Communication",
          explanation:
            "This comprehensive skill set demonstrates your full-stack capabilities, DevOps expertise, and the soft skills necessary for senior engineering roles.",
        },
      ]
    case "marketing-specialist":
      return [
        {
          field: "summary",
          value:
            "Results-driven marketing specialist with 6 years of experience in digital marketing and brand strategy. Proven track record of developing and executing successful multi-channel campaigns that drive engagement, increase ROI, and enhance brand visibility. Skilled in data analysis, content creation, and marketing automation tools.",
          explanation:
            "This summary highlights your experience, emphasizes your ability to deliver measurable results, and showcases your diverse skill set in digital marketing.",
        },
        {
          field: "experience.0",
          value:
            "Senior Marketing Specialist | GlobalBrand Co. | 2020 - Present\n• Spearheaded a comprehensive digital marketing strategy that increased customer acquisition by 35% and improved brand awareness by 50% within 12 months\n• Managed a $500K annual marketing budget, optimizing spend across channels to achieve a 20% increase in ROI\n• Developed and implemented an influencer marketing program, resulting in a 75% increase in social media engagement and a 25% boost in website traffic\n• Utilized marketing automation tools to create personalized email campaigns, improving open rates by 40% and conversion rates by 25%\n• Conducted A/B testing on landing pages and ad creatives, leading to a 30% improvement in click-through rates",
          explanation:
            "This experience entry provides specific metrics and achievements, demonstrating your impact across various aspects of digital marketing.",
        },
        {
          field: "skills.0",
          value:
            "Marketing Expertise:\n• Digital Marketing: SEO, SEM, Content Marketing, Social Media Marketing, Email Marketing\n• Analytics & Tools: Google Analytics, Google Ads, Facebook Ads Manager, HubSpot, Mailchimp, Hootsuite\n• Content Creation: Adobe Creative Suite, Canva, Video Editing\n• Data Analysis: Excel, PowerBI, SQL (basic)\n• Soft Skills: Strategic Planning, Project Management, Client Relationship Management, Cross-functional Collaboration",
          explanation:
            "This comprehensive skill set showcases your proficiency in various digital marketing disciplines, tools, and the soft skills necessary for success in marketing roles.",
        },
      ]
    case "data-scientist":
      return [
        {
          field: "summary",
          value:
            "Innovative data scientist with 4+ years of experience leveraging advanced analytics and machine learning techniques to drive data-informed business decisions. Proven expertise in developing predictive models, conducting statistical analyses, and translating complex data into actionable insights. Adept at collaborating with cross-functional teams to solve challenging business problems.",
          explanation:
            "This summary emphasizes your technical expertise, ability to derive business value from data, and collaborative skills essential for data science roles.",
        },
        {
          field: "experience.0",
          value:
            "Senior Data Scientist | DataDriven Corp. | 2021 - Present\n• Developed and implemented a machine learning model to predict customer churn, resulting in a 25% increase in customer retention and $2M annual revenue savings\n• Led a team of 3 data scientists in creating a recommendation engine that improved cross-sell opportunities by 40% and increased average order value by 15%\n• Designed and maintained a real-time dashboard using PowerBI for C-level executives, providing insights that guided strategic decision-making and resulted in a 10% increase in operational efficiency\n• Collaborated with the marketing team to optimize campaign targeting using clustering algorithms, leading to a 30% improvement in campaign ROI\n• Implemented NLP techniques to analyze customer feedback, identifying key areas for product improvement and contributing to a 20% increase in customer satisfaction scores",
          explanation:
            "This experience entry showcases your ability to apply data science techniques to solve real business problems, work with different teams, and deliver quantifiable results.",
        },
        {
          field: "skills.0",
          value:
            "Technical Expertise:\n• Programming Languages: Python, R, SQL\n• Machine Learning: Scikit-learn, TensorFlow, PyTorch, XGBoost\n• Big Data Technologies: Hadoop, Spark, Hive\n• Data Visualization: Tableau, PowerBI, Matplotlib, Seaborn\n• Cloud Platforms: AWS (SageMaker, EMR), Google Cloud Platform\n• Statistical Analysis: Hypothesis Testing, Regression Analysis, Time Series Analysis\n• Soft Skills: Problem-solving, Communication, Project Management, Team Leadership",
          explanation:
            "This comprehensive skill set demonstrates your proficiency in core data science technologies, big data tools, and the soft skills necessary for senior data science roles.",
        },
      ]
    case "ux-designer":
      return [
        {
          field: "summary",
          value:
            "Creative and user-focused UX designer with 4+ years of experience crafting intuitive digital experiences for web and mobile platforms. Skilled in user research, wireframing, prototyping, and usability testing. Passionate about creating accessible and inclusive designs that delight users and drive business objectives.",
          explanation:
            "This summary highlights your creative skills, technical expertise, and focus on user-centered design principles, emphasizing the business impact of good UX.",
        },
        {
          field: "experience.0",
          value:
            "Senior UX Designer | InnovateUX Agency | 2020 - Present\n• Led the redesign of a major e-commerce platform's checkout process, resulting in a 40% reduction in cart abandonment and a 25% increase in conversion rates\n• Conducted user research and created personas for a healthcare app, leading to the development of features that increased user engagement by 60%\n• Implemented a design system that improved design consistency across products and reduced design-to-development time by 30%\n• Facilitated design thinking workshops for clients, resulting in innovative solutions and a 50% increase in client satisfaction scores\n• Mentored junior designers and introduced a peer review process, enhancing team collaboration and improving overall design quality",
          explanation:
            "This experience entry demonstrates your ability to lead UX projects, conduct user research, implement design systems, and quantify the impact of your work on business metrics.",
        },
        {
          field: "skills.0",
          value:
            "UX Design Expertise:\n• Design Tools: Figma, Sketch, Adobe XD, InVision\n• Prototyping: Axure RP, Principle, Framer\n• User Research: Usability Testing, A/B Testing, Heuristic Evaluation, User Interviews\n• Information Architecture: Site Mapping, User Flows, Card Sorting\n• Visual Design: Typography, Color Theory, Iconography\n• Coding (basic): HTML, CSS, JavaScript\n• Soft Skills: Empathy, Communication, Presentation, Team Collaboration",
          explanation:
            "This comprehensive skill set showcases your proficiency in UX design tools, methodologies, and the soft skills necessary for creating user-centered designs and collaborating effectively with teams.",
        },
      ]
    case "project-manager":
      return [
        {
          field: "summary",
          value:
            "Dynamic project manager with 8+ years of experience leading cross-functional teams in delivering complex IT and business transformation projects. Adept at risk management, stakeholder communication, and Agile methodologies. Proven track record of completing projects on time and within budget while exceeding client expectations.",
          explanation:
            "This summary emphasizes your extensive experience, leadership skills, and ability to manage complex projects successfully.",
        },
        {
          field: "experience.0",
          value:
            "Senior Project Manager | GlobalTech Solutions | 2018 - Present\n• Successfully delivered a $5M enterprise software implementation project for a Fortune 500 client, completing it 10% under budget and 2 weeks ahead of schedule\n• Led a team of 20+ developers, designers, and QA specialists in an Agile environment, improving team velocity by 30% through process optimizations and effective sprint planning\n• Implemented a risk management framework that reduced project delays by 40% and improved stakeholder satisfaction scores from 7.5 to 9.2 out of 10\n• Managed the migration of legacy systems to cloud-based solutions for 3 major clients, resulting in a 25% reduction in operational costs and improved system reliability\n• Developed and maintained project dashboards using PowerBI, providing real-time insights to stakeholders and improving decision-making efficiency",
          explanation:
            "This detailed experience entry showcases your ability to manage large-scale projects, lead teams effectively, implement process improvements, and deliver tangible results for clients.",
        },
        {
          field: "skills.0",
          value:
            "Project Management Expertise:\n• Methodologies: Agile (Scrum, Kanban), Waterfall, Hybrid\n• Tools: JIRA, Microsoft Project, Trello, Asana, Confluence\n• Certifications: PMP, PRINCE2, Scrum Master\n• Technical Knowledge: Software Development Lifecycle, Cloud Migration, IT Infrastructure\n• Financial Management: Budgeting, Cost Control, ROI Analysis\n• Soft Skills: Leadership, Negotiation, Conflict Resolution, Strategic Thinking, Stakeholder Management",
          explanation:
            "This comprehensive skill set demonstrates your proficiency in various project management methodologies, tools, and the soft skills necessary for successfully leading complex projects and teams.",
        },
      ]
    default:
      return [
        {
          field: "summary",
          value:
            "Experienced professional with a proven track record of success in [Your Industry]. Skilled in [Key Skill 1], [Key Skill 2], and [Key Skill 3], with a focus on delivering results and driving innovation. Adept at [Key Strength 1] and [Key Strength 2], consistently exceeding performance targets and contributing to organizational growth.",
          explanation: "This generic summary can be customized to fit your specific industry and key skills.",
        },
        {
          field: "experience.0",
          value:
            "[Your Job Title] | [Company Name] | [Start Date] - [End Date]\n• Spearheaded a major project that resulted in [Specific Achievement], leading to [Positive Outcome] for the company\n• Implemented [Strategy or Tool], resulting in [Quantifiable Result] improvement in [Relevant Metric]\n• Collaborated with cross-functional teams to [Accomplish Task], which contributed to [Business Impact]\n• Recognized for [Achievement or Skill], receiving [Award or Recognition] for outstanding performance",
          explanation:
            "This experience entry provides a framework for highlighting significant achievements with measurable results, demonstrating your impact in previous roles.",
        },
        {
          field: "skills.0",
          value:
            "Core Competencies:\n• [Skill Category 1]: [Skill 1], [Skill 2], [Skill 3]\n• [Skill Category 2]: [Skill 4], [Skill 5], [Skill 6]\n• [Skill Category 3]: [Skill 7], [Skill 8], [Skill 9]\n• Tools & Technologies: [Tool 1], [Tool 2], [Tool 3]\n• Soft Skills: [Soft Skill 1], [Soft Skill 2], [Soft Skill 3], [Soft Skill 4]",
          explanation:
            "This skill set template allows you to showcase a comprehensive range of abilities relevant to your field.",
        },
      ]
  }
}

export function AISuggestions({ formData, sections, resumeType, onApplySuggestion }: AISuggestionsProps) {
  const [suggestions, setSuggestions] = React.useState<Suggestion[]>([])

  React.useEffect(() => {
    const generatedSuggestions = generateSuggestionsForTemplate(resumeType, formData, sections)
    setSuggestions(generatedSuggestions)
  }, [formData, sections, resumeType])

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          AI Suggestions for{" "}
          {resumeType
            .replace("-", " ")
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}{" "}
          Resume
        </CardTitle>
      </CardHeader>
      <CardContent>
        {suggestions.map((suggestion, index) => (
          <div key={index} className="mb-4 p-4 border rounded">
            <h3 className="font-semibold mb-2">Suggestion for {suggestion.field}:</h3>
            <p className="mb-2">{suggestion.value}</p>
            <p className="text-sm text-muted-foreground mb-2">{suggestion.explanation}</p>
            <Button onClick={() => onApplySuggestion(suggestion.field, suggestion.value)}>Apply Suggestion</Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

