// KatyPlan - Main Application Logic
class KatyPlan {
  constructor() {
    this.assignments = [];
    this.schedule = [];
    this.extracurricularMinutesByDate = {};
    this.settings = {
      startDate: new Date(),
      workDays: ['mon', 'tue', 'wed', 'thu', 'fri'],
      workloadLimit: 90,
      difficultyMode: 'simple',
    };
    this.currentSection = 'planner';

    // Career quiz state
    this.quizState = {
      currentQuestion: 0,
      scores: {},
      selectedAnswers: [],
      questions: [
        // 1. Multi-select: Free time activities (indirect mapping)
        {
          id: 1,
          text: "What do you do for fun in your free time? (Select all that apply)",
          type: "multi",
          answers: [
            { text: "Build things or tinker with gadgets", weights: { Technical: 2, Trades: 1 } },
            { text: "Draw, paint, or create something visual", weights: { Creative: 2 } },
            { text: "Help friends with their problems", weights: { Healthcare: 1, SocialImpact: 2, Education: 1 } },
            { text: "Organize events or group activities", weights: { Business: 1, Education: 1 } },
            { text: "Read about new discoveries or research", weights: { Research: 2, Technical: 1 } },
            { text: "Play strategy games or puzzles", weights: { Technical: 1, Business: 1 } },
            { text: "Write stories, poems, or journal", weights: { Creative: 2, Education: 1 } },
            { text: "Volunteer or help in the community", weights: { SocialImpact: 2, Healthcare: 1 } },
            { text: "I'm not sure what I enjoy yet", weights: {} }
          ]
        },
        // 2. Single: Stress response
        {
          id: 2,
          text: "When you feel overwhelmed, what helps most?",
          type: "single",
          answers: [
            { text: "Working through it methodically step-by-step", weights: { Technical: 2, Research: 1 } },
            { text: "Talking it out with someone", weights: { Healthcare: 1, SocialImpact: 1, Education: 1 } },
            { text: "Taking a break to do something creative", weights: { Creative: 2 } },
            { text: "Making a detailed plan to tackle it", weights: { Business: 2, Technical: 1 } },
            { text: "Finding a quiet space to think alone", weights: { Research: 1, Creative: 1 } },
            { text: "I don't have a consistent way of coping", weights: {} }
          ]
        },
        // 3. Single: Ideal vacation
        {
          id: 3,
          text: "Your dream weekend getaway involves:",
          type: "single",
          answers: [
            { text: "Visiting a museum or historic site", weights: { Education: 1, Research: 1 } },
            { text: "Camping or outdoor adventure", weights: { Trades: 1, Healthcare: 1 } },
            { text: "Attending a workshop or class", weights: { Education: 2, Creative: 1 } },
            { text: "Exploring a new city spontaneously", weights: { Business: 1, SocialImpact: 1 } },
            { text: "Staying in to work on a personal project", weights: { Technical: 2, Creative: 1 } },
            { text: "Helping out at a local event", weights: { SocialImpact: 2 } }
          ]
        },
        // 4. Single: Work rhythm
        {
          id: 4,
          text: "You work best when:",
          type: "single",
          answers: [
            { text: "You have clear instructions and routines", weights: { Technical: 1, Trades: 2 } },
            { text: "You can set your own schedule", weights: { Creative: 2, Business: 1 } },
            { text: "You're helping others directly", weights: { Healthcare: 2, SocialImpact: 1, Education: 1 } },
            { text: "You're learning something new", weights: { Research: 2, Education: 1 } },
            { text: "You're part of a team", weights: { Business: 1, SocialImpact: 1 } },
            { text: "You can focus deeply without interruptions", weights: { Technical: 1, Research: 2 } }
          ]
        },
        // 5. Multi-select: Success definition
        {
          id: 5,
          text: "You feel most successful when: (Select all that apply)",
          type: "multi",
          answers: [
            { text: "People thank you for helping them", weights: { Healthcare: 2, SocialImpact: 2, Education: 1 } },
            { text: "You finish a challenging project", weights: { Technical: 2, Creative: 1 } },
            { text: "You teach someone something new", weights: { Education: 2, Healthcare: 1 } },
            { text: "You see your ideas come to life", weights: { Creative: 2, Business: 1 } },
            { text: "You solve a complex problem", weights: { Technical: 2, Research: 1 } },
            { text: "You make a positive difference", weights: { SocialImpact: 2, Healthcare: 1 } },
            { text: "I'm not sure what makes me feel successful", weights: {} }
          ]
        },
        // 6. Single: Money vs enjoyment (rephrased to be less direct)
        {
          id: 6,
          text: "When thinking about your future lifestyle, you prioritize:",
          type: "single",
          answers: [
            { text: "Financial security above all else", weights: { Business: 2, Technical: 1 } },
            { text: "Having enough money while doing something meaningful", weights: { Healthcare: 2, Education: 1, SocialImpact: 1 } },
            { text: "Enjoying your daily work even if it means less money", weights: { Creative: 2, SocialImpact: 1 } },
            { text: "A balance where both money and enjoyment are decent", weights: { Business: 1, Technical: 1, Healthcare: 1 } },
            { text: "I haven't thought much about this yet", weights: {} }
          ]
        },
        // 7. Multi-select: School subjects (actual enjoyment)
        {
          id: 7,
          text: "Which school subjects did you genuinely look forward to? (Select all that apply)",
          type: "multi",
          answers: [
            { text: "Art or music classes", weights: { Creative: 2 } },
            { text: "Math or computer science", weights: { Technical: 2, Research: 1 } },
            { text: "Science labs or experiments", weights: { Research: 2, Healthcare: 1, Technical: 1 } },
            { text: "History or social studies discussions", weights: { Education: 1, SocialImpact: 1, Research: 1 } },
            { text: "English literature or writing", weights: { Creative: 1, Education: 1 } },
            { text: "Physical education or hands-on classes", weights: { Trades: 2, Healthcare: 1 } },
            { text: "I didn't particularly enjoy school subjects", weights: {} }
          ]
        },
        // 8. Single: Future education (indirect)
        {
          id: 8,
          text: "How do you feel about additional training after high school?",
          type: "single",
          answers: [
            { text: "I want to be done with classes as soon as possible", weights: { Trades: 2, Business: 1 } },
            { text: "Some certification or associate degree sounds good", weights: { Technical: 1, Healthcare: 1, Trades: 1 } },
            { text: "A bachelor's degree is probably worth it", weights: { Business: 1, Creative: 1, Education: 1, Technical: 1 } },
            { text: "I'd consider graduate school if needed", weights: { Research: 2, Healthcare: 2, Education: 2 } },
            { text: "I'm not sure what any of that means yet", weights: {} }
          ]
        },
        // 9. Single: Workday fantasy
        {
          id: 9,
          text: "Your ideal Tuesday involves:",
          type: "single",
          answers: [
            { text: "Finishing tasks and checking off a list", weights: { Technical: 1, Business: 1 } },
            { text: "Meeting different people throughout the day", weights: { Healthcare: 2, SocialImpact: 1, Education: 1 } },
            { text: "Deep focus on one major project", weights: { Creative: 2, Technical: 1, Research: 2 } },
            { text: "Helping someone overcome a challenge", weights: { Education: 2, Healthcare: 2, SocialImpact: 1 } },
            { text: "Figuring out why something broke", weights: { Technical: 2, Trades: 2 } },
            { text: "I don't have strong preferences about my day", weights: {} }
          ]
        },
        // 10. Multi-select: Problem approach
        {
          id: 10,
          text: "When something needs fixing, you tend to: (Select all that apply)",
          type: "multi",
          answers: [
            { text: "Take it apart to see how it works", weights: { Technical: 2, Trades: 1 } },
            { text: "Look up research or ask experts", weights: { Research: 2, Education: 1 } },
            { text: "Try creative or unconventional solutions", weights: { Creative: 2, Business: 1 } },
            { text: "Find the most efficient tool for the job", weights: { Trades: 2, Technical: 1 } },
            { text: "Consider how it affects other people", weights: { Healthcare: 1, SocialImpact: 2, Education: 1 } },
            { text: "I usually wait for someone else to handle it", weights: {} }
          ]
        },
        // 11. Single: Recognition style
        {
          id: 11,
          text: "You'd be most proud if people recognized you for:",
          type: "single",
          answers: [
            { text: "Your technical expertise or skill", weights: { Technical: 2, Trades: 2 } },
            { text: "Your creativity or artistic vision", weights: { Creative: 2 } },
            { text: "Your generosity or positive impact", weights: { SocialImpact: 2, Healthcare: 1, Education: 1 } },
            { text: "Your knowledge and wisdom", weights: { Research: 2, Education: 2 } },
            { text: "Your reliability and results", weights: { Business: 2, Technical: 1 } },
            { text: "I don't think much about recognition", weights: {} }
          ]
        },
        // 12. Single: Team vs solo (indirect scenarios)
        {
          id: 12,
          text: "Which situation sounds more appealing?",
          type: "single",
          answers: [
            { text: "Collaborating on a team project with shared goals", weights: { Business: 1, SocialImpact: 1, Education: 1 } },
            { text: "Working independently and owning your outcomes", weights: { Technical: 2, Creative: 1, Research: 1 } },
            { text: "Guiding others while still contributing yourself", weights: { Education: 2, Healthcare: 1, Business: 1 } },
            { text: "Being part of a community with a shared mission", weights: { SocialImpact: 2, Healthcare: 1 } },
            { text: "Both team and solo work appeal to me", weights: {} }
          ]
        },
        // 13. Single: Change tolerance
        {
          id: 13,
          text: "New situations usually make you feel:",
          type: "single",
          answers: [
            { text: "Excited about possibilities", weights: { Creative: 1, Business: 1, SocialImpact: 1 } },
            { text: "Cautious until you understand the rules", weights: { Technical: 2, Research: 1 } },
            { text: "Comfortable because you can adapt", weights: { Healthcare: 2, Education: 1 } },
            { text: "Overwhelmed and prefer familiar routines", weights: { Trades: 2, Technical: 1 } },
            { text: "It really depends on the situation", weights: {} }
          ]
        },
        // 14. Single: Legacy
        {
          id: 14,
          text: "At the end of your career, what would be most satisfying?",
          type: "single",
          answers: [
            { text: "Seeing things you built still in use", weights: { Trades: 2, Technical: 1, Creative: 1 } },
            { text: "Knowing you advanced human knowledge", weights: { Research: 3, Technical: 1 } },
            { text: "Hearing from people whose lives you touched", weights: { Healthcare: 2, SocialImpact: 2, Education: 1 } },
            { text: "Leaving a body of work that inspires others", weights: { Creative: 2, Education: 1 } },
            { text: "Building something that outlasts you", weights: { Business: 2, Creative: 1 } },
            { text: "I'm too young to think about the end of my career", weights: {} }
          ]
        },
        // 15. Single: Core trait
        {
          id: 15,
          text: "People who know you well would most likely describe you as:",
          type: "single",
          answers: [
            { text: "Practical and good with your hands", weights: { Trades: 3, Technical: 1 } },
            { text: "Curious and always asking questions", weights: { Research: 2, Technical: 1, Education: 1 } },
            { text: "Compassionate and a good listener", weights: { Healthcare: 2, SocialImpact: 2, Education: 1 } },
            { text: "Imaginative and full of ideas", weights: { Creative: 3, Business: 1 } },
            { text: "Organized and results-driven", weights: { Business: 2, Technical: 1 } },
            { text: "I'm not sure how others see me", weights: {} }
          ]
        }
      ],
      careerCategories: {
        Creative: {
          name: "Creative & Artistic",
          careers: [
            "Graphic Designer", "Content Creator", "UX Designer", "Writer/Author",
            "Video Editor", "Animator", "Photographer", "Web Designer", "Illustrator"
          ]
        },
        Technical: {
          name: "Technical & Engineering",
          careers: [
            "Software Engineer", "Data Scientist", "Mechanical Engineer", "Electrical Engineer",
            "Civil Engineer", "Biomedical Engineer", "Network Engineer", "Robotics Engineer"
          ]
        },
        Healthcare: {
          name: "Healthcare & Medicine",
          careers: [
            "Registered Nurse", "Doctor",
            "Anesthesiologist", "Neurosurgeon", "Orthopedic Surgeon", "Cardiologist",
            "General Surgeon", "Pediatrician", "Emergency Medicine Physician",
            "Dermatologist", "Psychiatrist", "Family Medicine Physician", "Internal Medicine Physician",
            "Physician Assistant", "Pharmacist", "Dentist", "Radiologist",
            "Physical Therapist", "Occupational Therapist", "Speech Pathologist",
            "Veterinarian", "Dental Hygienist", "Emergency Medical Technician",
            "Medical Researcher", "Healthcare Administrator"
          ]
        },
        Business: {
          name: "Business & Finance",
          careers: [
            "Financial Analyst", "Marketing Manager", "Accountant", "Business Consultant",
            "Project Manager", "Entrepreneur", "Investment Banker", "Supply Chain Manager"
          ]
        },
        Education: {
          name: "Education & Training",
          careers: [
            "Teacher", "School Counselor", "Principal", "Instructional Designer",
            "College Professor", "Special Education Teacher", "Tutor"
          ]
        },
        SocialImpact: {
          name: "Social Impact & Community",
          careers: [
            "Social Worker", "Nonprofit Manager", "Community Organizer",
            "Policy Analyst", "Human Rights Advocate"
          ]
        },
        Research: {
          name: "Research & Analysis",
          careers: [
            "Research Scientist", "Laboratory Technician", "Academic Researcher",
            "Market Research Analyst", "Policy Researcher"
          ]
        },
        Trades: {
          name: "Skilled Trades",
          careers: [
            "Electrician", "Plumber", "Carpenter", "Welder",
            "HVAC Technician", "Auto Mechanic", "Construction Manager"
          ]
        }
      }
    };

    // Career Courses Database
    this.careerCoursesDatabase = {
      fields: {
        "Healthcare": {
          name: "Healthcare & Medicine",
          description: "Careers focused on patient care, medical research, and health administration",
          jobs: [
            "Registered Nurse", "Doctor",
            "Anesthesiologist", "Neurosurgeon", "Orthopedic Surgeon", "Cardiologist",
            "General Surgeon", "Pediatrician", "Emergency Medicine Physician",
            "Dermatologist", "Psychiatrist", "Family Medicine Physician", "Internal Medicine Physician",
            "Physician Assistant", "Pharmacist", "Dentist", "Radiologist",
            "Physical Therapist", "Occupational Therapist", "Speech Pathologist",
            "Veterinarian", "Dental Hygienist", "Emergency Medical Technician",
            "Medical Researcher", "Healthcare Administrator"
          ]
        },
        "Engineering": {
          name: "Engineering & Technology",
          description: "Careers in design, development, and innovation of technology and systems",
          jobs: ["Software Engineer", "Mechanical Engineer", "Electrical Engineer", "Civil Engineer", "Chemical Engineer", "Aerospace Engineer", "Biomedical Engineer", "Data Scientist", "IT Manager", "Systems Analyst", "Network Engineer", "Robotics Engineer", "Environmental Engineer", "Industrial Engineer"]
        },
        "Business": {
          name: "Business & Finance",
          description: "Careers in management, finance, marketing, and entrepreneurship",
          jobs: ["Financial Analyst", "Marketing Manager", "Accountant", "Business Consultant", "Project Manager", "Human Resources Manager", "Entrepreneur", "Stock Broker", "Real Estate Agent", "Supply Chain Manager", "Operations Manager", "Investment Banker", "Management Consultant", "Business Development Manager"]
        },
        "Creative": {
          name: "Creative Arts & Media",
          description: "Careers in visual arts, design, writing, and digital media",
          jobs: ["Graphic Designer", "UX Designer", "Content Creator", "Writer/Author", "Video Editor", "Animator", "Photographer", "Art Director", "Web Designer", "Social Media Manager", "Marketing Specialist", "Illustrator", "Creative Director", "Brand Manager", "Musician", "Actor", "Dancer"]
        },
        "Education": {
          name: "Education & Training",
          description: "Careers in teaching, curriculum development, and academic support",
          jobs: ["Teacher", "School Counselor", "Principal", "Instructional Designer", "College Professor", "Special Education Teacher", "Librarian", "Educational Consultant", "Curriculum Developer", "Corporate Trainer", "Academic Advisor", "Tutor", "School Administrator"]
        },
        "Science": {
          name: "Scientific Research",
          description: "Careers in laboratory research, field studies, and scientific discovery",
          jobs: ["Biologist", "Chemist", "Physicist", "Environmental Scientist", "Geologist", "Astronomer", "Marine Biologist", "Forensic Scientist", "Research Scientist", "Laboratory Technician", "Ecologist", "Neuroscientist", "Geneticist", "Microbiologist"]
        },
        "Law": {
          name: "Law & Government",
          description: "Careers in legal services, public policy, and government administration",
          jobs: ["Lawyer", "Paralegal", "Judge", "Policy Analyst", "Legislative Assistant", "Criminal Investigator", "FBI Agent", "Diplomat", "City Planner", "Government Affairs Director", "Public Relations Manager", "Lobbyist", "Legal Consultant"]
        },
        "Trades": {
          name: "Skilled Trades",
          description: "Careers requiring specialized hands-on skills and technical training",
          jobs: ["Electrician", "Plumber", "Carpenter", "Welder", "HVAC Technician", "Auto Mechanic", "Construction Manager", "Landscape Architect", "Mason", "Heavy Equipment Operator", "Solar Panel Installer", "Wind Turbine Technician", "Civil Engineering Technician"]
        },
        "Social Services": {
          name: "Social Services & Nonprofit",
          description: "Careers focused on community support, social justice, and human services",
          jobs: ["Social Worker", "Nonprofit Manager", "Community Organizer", "Counselor", "Case Manager", "Victim Advocate", "Substance Abuse Counselor", "Mental Health Technician", "Youth Program Coordinator", "Fundraising Manager", "Volunteer Coordinator", "Human Rights Advocate"]
        },
        "Hospitality": {
          name: "Hospitality & Tourism",
          description: "Careers in travel, food service, event planning, and customer experience",
          jobs: ["Hotel Manager", "Restaurant Manager", "Event Planner", "Chef", "Travel Agent", "Tour Guide", "Catering Manager", "Food Service Director", "Hospitality Consultant", "Resort Manager", "Cruise Director", "Concierge", "Sommelier"]
        },
        "Agriculture": {
          name: "Agriculture & Environmental",
          description: "Careers in farming, sustainability, and environmental management",
          jobs: ["Agricultural Scientist", "Veterinarian", "Environmental Engineer", "Conservation Scientist", "Food Scientist", "Agronomist", "Horticulturist", "Wildlife Biologist", "Sustainability Coordinator", "Park Ranger", "Forester", "Soil Scientist", "Animal Nutritionist"]
        }
      },
      
      courses: {
        // ----------------------------
        // SCIENCE
        // ----------------------------
        "Biology 1": { name: "Biology 1", type: "Regular", typicalYear: 9, allowedGrades: [9, 10], prerequisites: [], difficulty: 2, category: "Science", description: "Introduction to cellular biology, genetics, and ecology" },
        "Pre-AP Biology": { name: "Pre-AP Biology", type: "Pre-AP", typicalYear: 9, allowedGrades: [9, 10], prerequisites: [], difficulty: 3, category: "Science", description: "Advanced biology with lab focus" },
        "AP Biology": { name: "AP Biology", type: "AP", typicalYear: 11, allowedGrades: [11, 12], prerequisites: ["Biology 1"], difficulty: 5, category: "Science", description: "College-level biology with lab" },

        "Chemistry 1": { name: "Chemistry 1", type: "Regular", typicalYear: 10, allowedGrades: [10, 11], prerequisites: ["Algebra 1"], difficulty: 3, category: "Science", description: "Introduction to chemical principles" },
        "Pre-AP Chemistry": { name: "Pre-AP Chemistry", type: "Pre-AP", typicalYear: 10, allowedGrades: [10, 11], prerequisites: ["Algebra 1"], difficulty: 4, category: "Science", description: "Advanced chemistry preparation" },
        "AP Chemistry": { name: "AP Chemistry", type: "AP", typicalYear: 11, allowedGrades: [11, 12], prerequisites: ["Chemistry 1", "Algebra 2"], difficulty: 5, category: "Science", description: "College-level chemistry" },

        "Physics 1": { name: "Physics 1", type: "Regular", typicalYear: 11, allowedGrades: [11, 12], prerequisites: ["Algebra 2"], difficulty: 3, category: "Science", description: "Algebra-based physics" },
        "AP Physics 1": { name: "AP Physics 1", type: "AP", typicalYear: 11, allowedGrades: [11, 12], prerequisites: ["Algebra 2"], difficulty: 4, category: "Science", description: "Algebra-based physics (AP)" },
        "AP Physics C": { name: "AP Physics C", type: "AP", typicalYear: 12, allowedGrades: [12], prerequisites: ["Pre-Calculus", "Physics 1"], difficulty: 5, category: "Science", description: "Calculus-based physics" },

        "Anatomy & Physiology": { name: "Anatomy & Physiology", type: "Regular", typicalYear: 11, allowedGrades: [11, 12], prerequisites: ["Biology 1"], difficulty: 3, category: "Science", description: "Human body systems" },
        "AP Environmental Science": { name: "AP Environmental Science", type: "AP", typicalYear: 11, allowedGrades: [11, 12], prerequisites: ["Biology 1", "Chemistry 1"], difficulty: 4, category: "Science", description: "Environmental issues and solutions" },

        // ----------------------------
        // MATH
        // ----------------------------
        "Algebra 1": { name: "Algebra 1", type: "Regular", typicalYear: 9, allowedGrades: [9], prerequisites: [], difficulty: 2, category: "Math", description: "Foundational algebraic concepts" },
        "Geometry": { name: "Geometry", type: "Regular", typicalYear: 10, allowedGrades: [10], prerequisites: ["Algebra 1"], difficulty: 2, category: "Math", description: "Geometric proofs and relationships" },
        "Algebra 2": { name: "Algebra 2", type: "Regular", typicalYear: 11, allowedGrades: [11], prerequisites: ["Geometry"], difficulty: 3, category: "Math", description: "Advanced algebra and functions" },

        "Pre-Calculus": { name: "Pre-Calculus", type: "Regular", typicalYear: 12, allowedGrades: [12], prerequisites: ["Algebra 2"], difficulty: 4, category: "Math", description: "Preparation for calculus" },
        "AP Pre-Calculus": { name: "AP Pre-Calculus", type: "AP", typicalYear: 11, allowedGrades: [11, 12], prerequisites: ["Algebra 2"], difficulty: 4, category: "Math", description: "Advanced pre-calculus (AP)" },

        "Calculus": { name: "Calculus", type: "Regular", typicalYear: 12, allowedGrades: [12], prerequisites: ["Pre-Calculus"], difficulty: 4, category: "Math", description: "Introduction to calculus" },
        "AP Calculus AB": { name: "AP Calculus AB", type: "AP", typicalYear: 12, allowedGrades: [12], prerequisites: ["Pre-Calculus"], difficulty: 5, category: "Math", description: "College calculus (AB)" },
        "AP Calculus BC": { name: "AP Calculus BC", type: "AP", typicalYear: 12, allowedGrades: [12], prerequisites: ["Pre-Calculus"], difficulty: 5, category: "Math", description: "College calculus (BC)" },

        "Statistics": { name: "Statistics", type: "Regular", typicalYear: 11, allowedGrades: [11, 12], prerequisites: ["Algebra 2"], difficulty: 3, category: "Math", description: "Intro statistics (non-AP)" },
        "AP Statistics": { name: "AP Statistics", type: "AP", typicalYear: 11, allowedGrades: [11, 12], prerequisites: ["Algebra 2"], difficulty: 4, category: "Math", description: "Data analysis and probability" },

        // ----------------------------
        // ENGLISH
        // ----------------------------
        "English 1": { name: "English 1", type: "Regular", typicalYear: 9, allowedGrades: [9], prerequisites: [], difficulty: 2, category: "English", description: "Literature and composition fundamentals" },
        "English 2": { name: "English 2", type: "Regular", typicalYear: 10, allowedGrades: [10], prerequisites: ["English 1"], difficulty: 2, category: "English", description: "Advanced literature analysis" },
        "Pre-AP English 2": { name: "Pre-AP English 2", type: "Pre-AP", typicalYear: 10, allowedGrades: [10], prerequisites: ["English 1"], difficulty: 3, category: "English", description: "Pre-AP literature and writing" },
        "AP English Language": { name: "AP English Language", type: "AP", typicalYear: 11, allowedGrades: [11], prerequisites: ["English 2"], difficulty: 4, category: "English", description: "Rhetoric and argumentation" },
        "AP English Literature": { name: "AP English Literature", type: "AP", typicalYear: 12, allowedGrades: [12], prerequisites: ["AP English Language"], difficulty: 5, category: "English", description: "College-level literature analysis" },
        "Creative Writing": { name: "Creative Writing", type: "Elective", typicalYear: 11, allowedGrades: [11, 12], prerequisites: ["English 2"], difficulty: 2, category: "English", description: "Fiction and non-fiction writing" },
        "Journalism": { name: "Journalism", type: "Elective", typicalYear: 11, allowedGrades: [10, 11, 12], prerequisites: ["English 1"], difficulty: 2, category: "English", description: "News writing, reporting, and media" },

        // ----------------------------
        // SOCIAL STUDIES
        // ----------------------------
        "World Geography": { name: "World Geography", type: "Regular", typicalYear: 9, allowedGrades: [9], prerequisites: [], difficulty: 2, category: "Social Studies", description: "Global geography and cultures" },
        "World History": { name: "World History", type: "Regular", typicalYear: 10, allowedGrades: [10], prerequisites: [], difficulty: 2, category: "Social Studies", description: "Historical events and themes" },
        "AP World History": { name: "AP World History", type: "AP", typicalYear: 10, allowedGrades: [10], prerequisites: [], difficulty: 4, category: "Social Studies", description: "College-level world history" },

        "US History": { name: "US History", type: "Regular", typicalYear: 11, allowedGrades: [11], prerequisites: [], difficulty: 2, category: "Social Studies", description: "American history since 1877" },
        "AP US History": { name: "AP US History", type: "AP", typicalYear: 11, allowedGrades: [11], prerequisites: [], difficulty: 5, category: "Social Studies", description: "College-level US history" },

        "US Government": { name: "US Government", type: "Regular", typicalYear: 12, allowedGrades: [12], prerequisites: [], difficulty: 2, category: "Social Studies", description: "American government and politics" },
        "AP US Government": { name: "AP US Government", type: "AP", typicalYear: 12, allowedGrades: [12], prerequisites: [], difficulty: 4, category: "Social Studies", description: "College-level government" },

        "Economics": { name: "Economics", type: "Regular", typicalYear: 12, allowedGrades: [12], prerequisites: [], difficulty: 2, category: "Social Studies", description: "Micro and macro economics" },
        "AP Macroeconomics": { name: "AP Macroeconomics", type: "AP", typicalYear: 12, allowedGrades: [12], prerequisites: [], difficulty: 4, category: "Social Studies", description: "College-level macroeconomics" },
        "AP Microeconomics": { name: "AP Microeconomics", type: "AP", typicalYear: 12, allowedGrades: [12], prerequisites: [], difficulty: 4, category: "Social Studies", description: "College-level microeconomics" },

        "Psychology": { name: "Psychology", type: "Regular", typicalYear: 11, allowedGrades: [11, 12], prerequisites: [], difficulty: 2, category: "Social Studies", description: "Intro psychology (non-AP)" },
        "AP Psychology": { name: "AP Psychology", type: "AP", typicalYear: 11, allowedGrades: [11, 12], prerequisites: [], difficulty: 3, category: "Social Studies", description: "Introduction to psychology (AP)" },

        "AP Human Geography": { name: "AP Human Geography", type: "AP", typicalYear: 9, allowedGrades: [9, 10], prerequisites: [], difficulty: 3, category: "Social Studies", description: "Human geography concepts (AP)" },
        "AP Sociology": { name: "AP Sociology", type: "AP", typicalYear: 12, allowedGrades: [11, 12], prerequisites: [], difficulty: 3, category: "Social Studies", description: "Sociology concepts (AP / advanced)" },

        // NOTE: You referenced "AP Economics" in jobCourses; Katy ISD usually splits it into AP Macro + AP Micro.
        // Keeping this so your UI doesn't break; you can replace AP Economics usages later.
        "AP Economics": { name: "AP Economics", type: "AP", typicalYear: 12, allowedGrades: [12], prerequisites: [], difficulty: 4, category: "Social Studies", description: "Placeholder: choose AP Macro and/or AP Micro" },

        "Debate": { name: "Debate", type: "Elective", typicalYear: 10, allowedGrades: [9, 10, 11, 12], prerequisites: [], difficulty: 3, category: "Social Studies", description: "Argumentation, public speaking, and competition debate" },

        // ----------------------------
        // CTE - HEALTH SCIENCE
        // ----------------------------
        "Principles of Health Science": { name: "Principles of Health Science", type: "CTE", typicalYear: 9, allowedGrades: [9], prerequisites: [], difficulty: 2, category: "Health Science", description: "Introduction to healthcare careers" },
        "Medical Terminology": { name: "Medical Terminology", type: "CTE", typicalYear: 10, allowedGrades: [10, 11, 12], prerequisites: ["Principles of Health Science"], difficulty: 3, category: "Health Science", description: "Medical language and vocabulary" },
        "Health Science Theory": { name: "Health Science Theory", type: "CTE", typicalYear: 11, allowedGrades: [11, 12], prerequisites: ["Medical Terminology"], difficulty: 3, category: "Health Science", description: "Advanced health science concepts" },
        "Health Science Clinical": { name: "Health Science Clinical", type: "CTE", typicalYear: 11, allowedGrades: [11, 12], prerequisites: ["Medical Terminology"], difficulty: 4, category: "Health Science", description: "Hands-on clinical experience" },
        "Practicum in Health Science": { name: "Practicum in Health Science", type: "CTE", typicalYear: 12, allowedGrades: [12], prerequisites: ["Health Science Theory", "Health Science Clinical"], difficulty: 4, category: "Health Science", description: "Professional healthcare practicum" },

        // ----------------------------
        // CTE - ENGINEERING
        // ----------------------------
        "Introduction to Engineering Design": { name: "Introduction to Engineering Design", type: "CTE", typicalYear: 9, allowedGrades: [9, 10], prerequisites: [], difficulty: 2, category: "Engineering", description: "Engineering design process" },
        "Principles of Engineering": { name: "Principles of Engineering", type: "CTE", typicalYear: 10, allowedGrades: [10, 11], prerequisites: ["Algebra 1"], difficulty: 3, category: "Engineering", description: "Core engineering principles" },
        "Digital Electronics": { name: "Digital Electronics", type: "CTE", typicalYear: 11, allowedGrades: [11, 12], prerequisites: ["Geometry"], difficulty: 4, category: "Engineering", description: "Digital circuit design" },
        "Engineering Design and Development": { name: "Engineering Design and Development", type: "CTE", typicalYear: 12, allowedGrades: [12], prerequisites: ["Digital Electronics"], difficulty: 5, category: "Engineering", description: "Capstone engineering project" },

        "Engineering Design": { name: "Engineering Design", type: "CTE", typicalYear: 10, allowedGrades: [9, 10, 11, 12], prerequisites: [], difficulty: 2, category: "Engineering", description: "Design-focused engineering elective (general)" },
        "Practicum in Trades": { name: "Practicum in Trades", type: "CTE", typicalYear: 12, allowedGrades: [12], prerequisites: [], difficulty: 4, category: "Trades", description: "Hands-on practicum experience (CTE)" },

        // ----------------------------
        // CTE - BUSINESS
        // ----------------------------
        "Principles of Business": { name: "Principles of Business", type: "CTE", typicalYear: 9, allowedGrades: [9, 10], prerequisites: [], difficulty: 2, category: "Business", description: "Business fundamentals" },
        "Business Information Management": { name: "Business Information Management", type: "CTE", typicalYear: 10, allowedGrades: [10, 11, 12], prerequisites: ["Principles of Business"], difficulty: 3, category: "Business", description: "Business technology and management" },
        "Business Law": { name: "Business Law", type: "CTE", typicalYear: 11, allowedGrades: [11, 12], prerequisites: ["Principles of Business"], difficulty: 3, category: "Business", description: "Legal aspects of business" },
        "Practicum in Business Management": { name: "Practicum in Business Management", type: "CTE", typicalYear: 12, allowedGrades: [12], prerequisites: ["Business Information Management"], difficulty: 4, category: "Business", description: "Professional business experience" },

        "Marketing": { name: "Marketing", type: "CTE", typicalYear: 11, allowedGrades: [10, 11, 12], prerequisites: ["Principles of Business"], difficulty: 3, category: "Business", description: "Marketing fundamentals and strategy" },

        // ----------------------------
        // CTE - COMPUTER SCIENCE / IT
        // ----------------------------
        "Computer Science 1": { name: "Computer Science 1", type: "CTE", typicalYear: 9, allowedGrades: [9, 10], prerequisites: [], difficulty: 2, category: "Technology", description: "Introduction to programming" },
        "AP Computer Science A": { name: "AP Computer Science A", type: "AP", typicalYear: 10, allowedGrades: [10, 11, 12], prerequisites: ["Computer Science 1"], difficulty: 4, category: "Technology", description: "Java programming (AP)" },
        "AP Computer Science Principles": { name: "AP Computer Science Principles", type: "AP", typicalYear: 10, allowedGrades: [10, 11, 12], prerequisites: [], difficulty: 3, category: "Technology", description: "Computing concepts (AP)" },
        "Cybersecurity": { name: "Cybersecurity", type: "CTE", typicalYear: 11, allowedGrades: [11, 12], prerequisites: ["AP Computer Science A"], difficulty: 4, category: "Technology", description: "Network security principles" },
        "Practicum in Information Technology": { name: "Practicum in Information Technology", type: "CTE", typicalYear: 12, allowedGrades: [12], prerequisites: ["Cybersecurity"], difficulty: 4, category: "Technology", description: "Professional IT experience" },

        "Web Design": { name: "Web Design", type: "CTE", typicalYear: 11, allowedGrades: [10, 11, 12], prerequisites: [], difficulty: 2, category: "Technology", description: "Web design and front-end development basics" },

        // ----------------------------
        // CTE - AGRICULTURE
        // ----------------------------
        "Principles of Agriculture": { name: "Principles of Agriculture", type: "CTE", typicalYear: 9, allowedGrades: [9, 10], prerequisites: [], difficulty: 2, category: "Agriculture", description: "Introduction to agriculture" },
        "Animal Science": { name: "Animal Science", type: "CTE", typicalYear: 10, allowedGrades: [10, 11, 12], prerequisites: ["Biology 1"], difficulty: 3, category: "Agriculture", description: "Livestock and animal care" },
        "Veterinary Medical Applications": { name: "Veterinary Medical Applications", type: "CTE", typicalYear: 11, allowedGrades: [11, 12], prerequisites: ["Animal Science"], difficulty: 4, category: "Agriculture", description: "Veterinary science fundamentals" },
        "Practicum in Agriculture": { name: "Practicum in Agriculture", type: "CTE", typicalYear: 12, allowedGrades: [12], prerequisites: ["Veterinary Medical Applications"], difficulty: 4, category: "Agriculture", description: "Professional agriculture experience" },

        // ----------------------------
        // FINE ARTS
        // ----------------------------
        "Art 1": { name: "Art 1", type: "Elective", typicalYear: 9, allowedGrades: [9, 10, 11, 12], prerequisites: [], difficulty: 1, category: "Fine Arts", description: "Basic art techniques" },
        "AP Studio Art": { name: "AP Studio Art", type: "AP", typicalYear: 12, allowedGrades: [11, 12], prerequisites: ["Art 1"], difficulty: 4, category: "Fine Arts", description: "College art portfolio development" },
        "Band": { name: "Band", type: "Elective", typicalYear: 9, allowedGrades: [9, 10, 11, 12], prerequisites: [], difficulty: 2, category: "Fine Arts", description: "Instrumental music performance" },
        "Choir": { name: "Choir", type: "Elective", typicalYear: 9, allowedGrades: [9, 10, 11, 12], prerequisites: [], difficulty: 2, category: "Fine Arts", description: "Vocal music performance" },
        "Theater Arts": { name: "Theater Arts", type: "Elective", typicalYear: 9, allowedGrades: [9, 10, 11, 12], prerequisites: [], difficulty: 2, category: "Fine Arts", description: "Acting and stage production" },

        "Graphic Design": { name: "Graphic Design", type: "CTE", typicalYear: 10, allowedGrades: [9, 10, 11, 12], prerequisites: [], difficulty: 3, category: "Fine Arts", description: "Digital design principles and tools" },
        "Content Creation": { name: "Content Creation", type: "CTE", typicalYear: 11, allowedGrades: [10, 11, 12], prerequisites: [], difficulty: 3, category: "Fine Arts", description: "Video, social content, and media production" },

        // ----------------------------
        // LANGUAGES
        // ----------------------------
        "Spanish 1": { name: "Spanish 1", type: "Language", typicalYear: 9, allowedGrades: [9, 10, 11, 12], prerequisites: [], difficulty: 2, category: "Language", description: "Introductory Spanish" },
        "Spanish 2": { name: "Spanish 2", type: "Language", typicalYear: 10, allowedGrades: [10, 11, 12], prerequisites: ["Spanish 1"], difficulty: 2, category: "Language", description: "Intermediate Spanish" },
        "Spanish 3": { name: "Spanish 3", type: "Language", typicalYear: 11, allowedGrades: [11, 12], prerequisites: ["Spanish 2"], difficulty: 3, category: "Language", description: "Advanced Spanish" },
        "AP Spanish Language": { name: "AP Spanish Language", type: "AP", typicalYear: 12, allowedGrades: [12], prerequisites: ["Spanish 3"], difficulty: 4, category: "Language", description: "College Spanish (AP)" },

        "French 1": { name: "French 1", type: "Language", typicalYear: 9, allowedGrades: [9, 10, 11, 12], prerequisites: [], difficulty: 2, category: "Language", description: "Introductory French" },
        "French 2": { name: "French 2", type: "Language", typicalYear: 10, allowedGrades: [10, 11, 12], prerequisites: ["French 1"], difficulty: 2, category: "Language", description: "Intermediate French" },
        "French 3": { name: "French 3", type: "Language", typicalYear: 11, allowedGrades: [11, 12], prerequisites: ["French 2"], difficulty: 3, category: "Language", description: "Advanced French" },
        "AP French Language": { name: "AP French Language", type: "AP", typicalYear: 12, allowedGrades: [12], prerequisites: ["French 3"], difficulty: 4, category: "Language", description: "College French (AP)" },

        // ----------------------------
        // PE
        // ----------------------------
        "PE 1": { name: "PE 1", type: "Elective", typicalYear: 9, allowedGrades: [9, 10, 11, 12], prerequisites: [], difficulty: 1, category: "PE", description: "Physical fitness and sports" },
        "Athletics": { name: "Athletics", type: "Elective", typicalYear: 9, allowedGrades: [9, 10, 11, 12], prerequisites: [], difficulty: 3, category: "PE", description: "Competitive sports training" },

        // ----------------------------
        // RESEARCH / CAPSTONE (referenced in jobCourses)
        // ----------------------------
        "Research": { name: "Research", type: "Elective", typicalYear: 11, allowedGrades: [11, 12], prerequisites: [], difficulty: 3, category: "Elective", description: "Independent research skills and projects" },
        "AP Research": { name: "AP Research", type: "AP", typicalYear: 12, allowedGrades: [12], prerequisites: ["AP English Language"], difficulty: 5, category: "Elective", description: "AP Capstone research course (advanced)" },

        // ----------------------------
        // EDUCATION PRACTICUM (referenced in jobCourses)
        // ----------------------------
        "Practicum in Education": { name: "Practicum in Education", type: "CTE", typicalYear: 12, allowedGrades: [12], prerequisites: [], difficulty: 4, category: "Education", description: "Teaching and classroom practicum (CTE)" }
      },
      
      // Job to Course Mappings
      // Job to Course Mappings
jobCourses: {
  // Healthcare Jobs
  "Registered Nurse": {
    required: ["Biology 1", "Chemistry 1", "Anatomy & Physiology", "Medical Terminology", "Principles of Health Science", "Health Science Theory", "Health Science Clinical"],
    recommended: ["AP Biology", "AP Chemistry", "Psychology", "AP Psychology", "Practicum in Health Science"],
    electives: ["Statistics", "AP Statistics", "Practicum in Health Science"]
  },
  "Doctor": {
    required: ["Biology 1", "Pre-AP Biology", "Chemistry 1", "Pre-AP Chemistry", "Physics 1", "Anatomy & Physiology", "AP Biology", "AP Chemistry"],
    recommended: ["AP Physics 1", "AP Calculus AB", "AP Statistics", "AP Psychology", "Medical Terminology"],
    electives: ["AP Spanish Language", "Research", "AP Research", "Practicum in Health Science"]
  },
  "Anesthesiologist": {
    required: ["Biology 1", "Pre-AP Biology", "Chemistry 1", "Pre-AP Chemistry", "Physics 1", "Anatomy & Physiology", "Medical Terminology", "Health Science Theory", "Health Science Clinical"],
    recommended: ["AP Biology", "AP Chemistry", "AP Physics 1", "AP Psychology", "AP Statistics", "AP Calculus AB"],
    electives: ["Practicum in Health Science", "AP Spanish Language"]
  },
  "Neurosurgeon": {
    required: ["Biology 1", "Pre-AP Biology", "Chemistry 1", "Pre-AP Chemistry", "Physics 1", "Anatomy & Physiology", "Medical Terminology", "Health Science Theory", "Health Science Clinical"],
    recommended: ["AP Biology", "AP Chemistry", "AP Physics 1", "AP Statistics", "AP Calculus AB", "AP Psychology"],
    electives: ["Practicum in Health Science", "AP Spanish Language", "AP Research"]
  },
  "Orthopedic Surgeon": {
    required: ["Biology 1", "Pre-AP Biology", "Chemistry 1", "Pre-AP Chemistry", "Physics 1", "Anatomy & Physiology", "Medical Terminology", "Health Science Theory", "Health Science Clinical"],
    recommended: ["AP Biology", "AP Chemistry", "AP Physics 1", "AP Statistics", "AP Calculus AB"],
    electives: ["Athletics", "Practicum in Health Science", "AP Spanish Language"]
  },
  "Cardiologist": {
    required: ["Biology 1", "Pre-AP Biology", "Chemistry 1", "Pre-AP Chemistry", "Physics 1", "Anatomy & Physiology", "Medical Terminology"],
    recommended: ["AP Biology", "AP Chemistry", "AP Physics 1", "AP Statistics", "AP Calculus AB"],
    electives: ["Practicum in Health Science", "AP Spanish Language"]
  },
  "General Surgeon": {
    required: ["Biology 1", "Pre-AP Biology", "Chemistry 1", "Pre-AP Chemistry", "Physics 1", "Anatomy & Physiology", "Medical Terminology"],
    recommended: ["AP Biology", "AP Chemistry", "AP Physics 1", "AP Psychology", "AP Statistics"],
    electives: ["Practicum in Health Science", "AP Spanish Language"]
  },
  "Pediatrician": {
    required: ["Biology 1", "Chemistry 1", "Anatomy & Physiology", "Medical Terminology", "Principles of Health Science"],
    recommended: ["AP Biology", "AP Psychology", "AP Statistics", "Health Science Theory"],
    electives: ["AP Spanish Language", "Health Science Clinical"]
  },
  "Emergency Medicine Physician": {
    required: ["Biology 1", "Chemistry 1", "Physics 1", "Anatomy & Physiology", "Medical Terminology"],
    recommended: ["AP Biology", "AP Chemistry", "AP Physics 1", "AP Psychology", "AP Statistics"],
    electives: ["Health Science Clinical", "Practicum in Health Science"]
  },
  "Dermatologist": {
    required: ["Biology 1", "Chemistry 1", "Anatomy & Physiology", "Medical Terminology"],
    recommended: ["AP Biology", "AP Chemistry", "AP Psychology", "AP Statistics"],
    electives: ["AP Spanish Language", "Health Science Theory"]
  },
  "Psychiatrist": {
    required: ["Biology 1", "Chemistry 1", "Psychology", "AP Psychology", "Medical Terminology"],
    recommended: ["AP Biology", "AP Statistics", "Anatomy & Physiology"],
    electives: ["Spanish 3", "AP Spanish Language"]
  },
  "Family Medicine Physician": {
    required: ["Biology 1", "Chemistry 1", "Anatomy & Physiology", "Medical Terminology", "Principles of Health Science"],
    recommended: ["AP Biology", "AP Chemistry", "AP Psychology", "AP Statistics", "Health Science Theory"],
    electives: ["Health Science Clinical", "AP Spanish Language"]
  },
  "Internal Medicine Physician": {
    required: ["Biology 1", "Chemistry 1", "Anatomy & Physiology", "Medical Terminology"],
    recommended: ["AP Biology", "AP Chemistry", "AP Statistics", "AP Psychology"],
    electives: ["Health Science Theory", "AP Spanish Language"]
  },
  "Physical Therapist": {
    required: ["Biology 1", "Chemistry 1", "Anatomy & Physiology", "Physics 1", "Psychology", "AP Psychology"],
    recommended: ["AP Biology", "AP Physics 1", "Statistics", "AP Statistics", "Medical Terminology"],
    electives: ["Spanish 2", "AP Spanish Language", "Athletics", "Health Science Theory"]
  },
  "Pharmacist": {
    required: ["Biology 1", "Chemistry 1", "Pre-AP Chemistry", "AP Chemistry", "AP Biology", "AP Calculus AB"],
    recommended: ["AP Physics 1", "AP Statistics", "Medical Terminology", "AP Psychology"],
    electives: ["Business Information Management", "AP Spanish Language", "Research"]
  },
  "Dentist": {
    required: ["Biology 1", "Chemistry 1", "AP Biology", "AP Chemistry", "AP Calculus AB", "Anatomy & Physiology"],
    recommended: ["AP Physics 1", "AP Statistics", "Medical Terminology", "AP Psychology"],
    electives: ["AP Spanish Language", "Business Law", "Practicum in Health Science"]
  },
  "Medical Researcher": {
    required: ["Biology 1", "Pre-AP Biology", "Chemistry 1", "Pre-AP Chemistry", "AP Biology", "AP Chemistry", "AP Statistics"],
    recommended: ["AP Physics C", "AP Calculus BC", "AP Psychology", "AP Research"],
    electives: ["AP Spanish Language", "Computer Science 1", "AP Computer Science A"]
  },
  "Physician Assistant": {
    required: ["Biology 1", "Chemistry 1", "Anatomy & Physiology", "Medical Terminology", "AP Biology", "AP Psychology"],
    recommended: ["AP Chemistry", "AP Statistics", "Spanish 3", "Health Science Clinical"],
    electives: ["AP Spanish Language", "Practicum in Health Science", "Research"]
  },
  "Occupational Therapist": {
    required: ["Biology 1", "Psychology", "AP Psychology", "Anatomy & Physiology", "Medical Terminology"],
    recommended: ["AP Biology", "AP Statistics", "Spanish 2", "Health Science Theory"],
    electives: ["AP Spanish Language", "Creative Writing", "Practicum in Health Science"]
  },

  // Engineering & Technology
  "Software Engineer": {
    required: ["Computer Science 1", "AP Computer Science A", "AP Computer Science Principles", "AP Calculus AB", "AP Statistics"],
    recommended: ["AP Physics 1", "AP Physics C", "Cybersecurity", "AP Calculus BC"],
    electives: ["Practicum in Information Technology", "Digital Electronics", "AP Research", "Spanish 2"]
  },
  "Data Scientist": {
    required: ["Computer Science 1", "AP Computer Science A", "AP Statistics", "AP Calculus AB", "AP Calculus BC"],
    recommended: ["AP Physics C", "AP Economics", "AP Psychology", "AP Research"],
    electives: ["Practicum in Information Technology", "Business Information Management", "AP Spanish Language"]
  },
  "Mechanical Engineer": {
    required: ["Calculus", "AP Calculus AB", "Physics 1", "AP Physics 1", "Chemistry 1", "AP Chemistry"],
    recommended: ["AP Physics C", "AP Calculus BC", "Digital Electronics", "Pre-Calculus", "AP Pre-Calculus"],
    electives: ["Introduction to Engineering Design", "Principles of Engineering", "AP Statistics", "Computer Science 1"]
  },
  "Biomedical Engineer": {
    required: ["Biology 1", "AP Biology", "Chemistry 1", "AP Chemistry", "AP Calculus AB", "AP Physics 1"],
    recommended: ["AP Physics C", "AP Calculus BC", "AP Statistics", "Anatomy & Physiology"],
    electives: ["Principles of Engineering", "AP Computer Science A", "AP Research"]
  },
  "Aerospace Engineer": {
    required: ["Physics 1", "AP Physics 1", "AP Physics C", "Calculus", "AP Calculus BC", "Chemistry 1"],
    recommended: ["AP Chemistry", "AP Statistics", "AP Computer Science A", "Digital Electronics"],
    electives: ["Engineering Design and Development", "AP Research", "AP Spanish Language"]
  },
  "IT Manager": {
    required: ["Computer Science 1", "AP Computer Science A", "AP Computer Science Principles", "Business Information Management"],
    recommended: ["Cybersecurity", "AP Statistics", "AP Economics", "Digital Electronics"],
    electives: ["Practicum in Information Technology", "Practicum in Business Management", "AP Spanish Language"]
  },

  // Business
  "Financial Analyst": {
    required: ["AP Calculus AB", "AP Calculus BC", "AP Statistics", "AP Economics", "Business Information Management"],
    recommended: ["AP Macroeconomics", "AP Microeconomics", "Business Law", "AP Psychology"],
    electives: ["Practicum in Business Management", "AP Computer Science A", "AP Spanish Language"]
  },
  "Marketing Manager": {
    required: ["AP Statistics", "AP Psychology", "Business Information Management", "AP Economics"],
    recommended: ["AP English Language", "Graphic Design", "Creative Writing", "Business Law"],
    electives: ["Practicum in Business Management", "AP Studio Art", "AP Spanish Language", "Content Creation"]
  },
  "Accountant": {
    required: ["AP Calculus AB", "AP Statistics", "Business Information Management", "AP Economics", "Business Law"],
    recommended: ["AP Macroeconomics", "AP Microeconomics", "AP Computer Science A", "AP Psychology"],
    electives: ["Practicum in Business Management", "AP Spanish Language", "AP Research"]
  },
  "Entrepreneur": {
    required: ["AP Economics", "Business Information Management", "Business Law", "AP Statistics"],
    recommended: ["AP Calculus AB", "AP Psychology", "AP English Language", "AP Computer Science Principles"],
    electives: ["Practicum in Business Management", "Graphic Design", "AP Spanish Language", "Marketing"]
  },

  // Creative
  "Graphic Designer": {
    required: ["Art 1", "AP Studio Art", "Graphic Design", "Computer Science 1"],
    recommended: ["AP Computer Science Principles", "AP English Literature", "Creative Writing", "Business Information Management"],
    electives: ["AP Spanish Language", "Theater Arts", "Web Design", "Marketing"]
  },
  "UX Designer": {
    required: ["Computer Science 1", "AP Computer Science Principles", "Art 1", "AP Statistics", "AP Psychology"],
    recommended: ["AP Computer Science A", "AP Studio Art", "AP English Language", "Business Information Management"],
    electives: ["Practicum in Information Technology", "Graphic Design", "AP Spanish Language", "AP Research"]
  },
  "Content Creator": {
    required: ["English 1", "English 2", "AP English Language", "Computer Science 1", "AP Computer Science Principles"],
    recommended: ["AP English Literature", "Creative Writing", "Graphic Design", "AP Statistics", "Business Information Management"],
    electives: ["Theater Arts", "AP Studio Art", "AP Spanish Language", "Marketing"]
  },
  "Writer/Author": {
    required: ["English 1", "English 2", "AP English Language", "AP English Literature", "Creative Writing"],
    recommended: ["AP Psychology", "AP Research", "AP Spanish Language", "AP World History"],
    electives: ["Theater Arts", "Journalism", "Graphic Design", "AP Studio Art"]
  },

  // Education
  "Teacher": {
    required: ["AP English Language", "AP Psychology", "AP US History", "AP Government"],
    recommended: ["AP English Literature", "AP Statistics", "AP Spanish Language", "Creative Writing"],
    electives: ["Theater Arts", "AP Research", "Practicum in Education", "AP Human Geography"]
  },
  "School Counselor": {
    required: ["AP Psychology", "AP Statistics", "AP English Language", "AP Government"],
    recommended: ["AP Sociology", "AP Human Geography", "AP Biology", "AP Research"],
    electives: ["Spanish 3", "AP Spanish Language", "Practicum in Education", "Creative Writing"]
  },

  // Trades
  "Electrician": {
    required: ["Algebra 1", "Geometry", "Algebra 2", "Physics 1"],
    recommended: ["AP Physics 1", "AP Calculus AB", "Digital Electronics", "Business Information Management"],
    electives: ["Practicum in Trades", "Engineering Design", "AP Computer Science Principles"]
  },
  "Carpenter": {
    required: ["Algebra 1", "Geometry", "Algebra 2", "Business Information Management"],
    recommended: ["AP Calculus AB", "Physics 1", "AP Physics 1", "Engineering Design"],
    electives: ["Practicum in Trades", "Art 1", "AP Studio Art", "Business Law"]
  },

  // Default fallback for unmatched jobs
  "default": {
    required: ["English 1", "English 2", "Algebra 1", "Geometry", "Algebra 2", "Biology 1", "Chemistry 1", "World History", "US History"],
    recommended: ["AP English Language", "AP Statistics", "AP Psychology", "AP Economics"],
    electives: ["Spanish 2", "AP Spanish Language", "Computer Science 1", "AP Computer Science Principles"]
  }
},

    };

    this.careerCoursesState = {
      selectedPath: null, // 'specific' or 'field'
      selectedJob: null,
      selectedField: null
    };

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initializeAnimations();
    this.setDefaultDate();
    this.createParticleBackground();
    this.addAssignmentRow();
    this.addExtracurricularRow();
    this.updateSettings();
    this.setupNavigation();
    this.setupResourceSearch();
    this.setupCareerQuiz();
    this.setupCareerCourses();
  }

  // ----------------------------
  // Navigation between sections
  // ----------------------------
  setupNavigation() {
    const plannerNav = document.getElementById('plannerNav');
    const resourcesNav = document.getElementById('resourcesNav');
    const careerNav = document.getElementById('careerNav');
    const careerCoursesNav = document.getElementById('careerCoursesNav');

    if (plannerNav) {
      plannerNav.addEventListener('click', () => this.showSection('planner'));
    }
    if (resourcesNav) {
      resourcesNav.addEventListener('click', () => this.showSection('resources'));
    }
    if (careerNav) {
      careerNav.addEventListener('click', () => this.showSection('career'));
    }
    if (careerCoursesNav) {
      careerCoursesNav.addEventListener('click', () => this.showSection('careerCourses'));
    }
  }

  showSection(section) {
    this.currentSection = section;
    const plannerSection = document.getElementById('plannerSection');
    const resourcesSection = document.getElementById('resourcesSection');
    const careerSection = document.getElementById('careerSection');
    const careerCoursesSection = document.getElementById('careerCoursesSection');
    const plannerNav = document.getElementById('plannerNav');
    const resourcesNav = document.getElementById('resourcesNav');
    const careerNav = document.getElementById('careerNav');
    const careerCoursesNav = document.getElementById('careerCoursesNav');

    // Hide all sections
    plannerSection?.classList.add('hidden');
    resourcesSection?.classList.add('hidden');
    careerSection?.classList.add('hidden');
    careerCoursesSection?.classList.add('hidden');
    
    // Remove active class from all nav links
    plannerNav?.classList.remove('active');
    resourcesNav?.classList.remove('active');
    careerNav?.classList.remove('active');
    careerCoursesNav?.classList.remove('active');

    // Show selected section and activate nav
    if (section === 'planner') {
      plannerSection?.classList.remove('hidden');
      plannerNav?.classList.add('active');
    } else if (section === 'resources') {
        resourcesSection?.classList.remove('hidden');
        resourcesNav?.classList.add('active');

        // Force the resources section animations to appear immediately
        resourcesSection?.querySelectorAll('.fade-in-up').forEach(el => el.classList.add('visible'));

        // Show all AP cards by default (empty search = show all)
        this.filterResources('');
      } else if (section === 'career') {
      careerSection?.classList.remove('hidden');
      careerNav?.classList.add('active');
      this.initializeQuiz();
    } else if (section === 'careerCourses') {
      careerCoursesSection?.classList.remove('hidden');
      careerCoursesNav?.classList.add('active');
      this.initializeCareerCourses();
    }
  }

  // ----------------------------
  // Career Courses Functionality
  // ----------------------------
  setupCareerCourses() {
    const jobSearchInput = document.getElementById('jobSearchInput');
    const fieldSelect = document.getElementById('fieldSelect');
    const generateBtn = document.getElementById('generateCareerPlanBtn');
    const specificJobCard = document.getElementById('specificJobCard');
    const fieldJobCard = document.getElementById('fieldJobCard');

    // Enable clicking on cards to select path
    specificJobCard?.addEventListener('click', () => this.selectPath('specific'));
    fieldJobCard?.addEventListener('click', () => this.selectPath('field'));

    // Job search functionality
    jobSearchInput?.addEventListener('input', (e) => this.handleJobSearch(e.target.value));
    jobSearchInput?.addEventListener('focus', (e) => this.handleJobSearch(e.target.value));

    // Field selection
    fieldSelect?.addEventListener('change', (e) => this.selectField(e.target.value));

    // Generate plan button
    generateBtn?.addEventListener('click', () => this.generateCareerPlan());

    // Copy and print buttons
    document.getElementById('copyCareerPlanBtn')?.addEventListener('click', () => this.copyCareerPlan());
    document.getElementById('printCareerPlanBtn')?.addEventListener('click', () => window.print());

    // Populate field dropdown
    this.populateFieldDropdown();
  }

  initializeCareerCourses() {
    // Reset state
    this.careerCoursesState = {
      selectedPath: null,
      selectedJob: null,
      selectedField: null
    };

    // Reset UI
    document.getElementById('specificJobCard')?.classList.remove('selected');
    document.getElementById('fieldJobCard')?.classList.remove('selected');
    document.getElementById('jobSearchInput').value = '';
    document.getElementById('jobSearchInput').disabled = true;
    document.getElementById('fieldSelect').value = '';
    document.getElementById('fieldSelect').disabled = true;
    document.getElementById('generateCareerPlanBtn').disabled = true;
    document.getElementById('careerPlanResults').classList.add('hidden');
    document.getElementById('jobSearchResults').classList.add('hidden');
  }

  selectPath(path) {
    // Reset both cards
    document.getElementById('specificJobCard').classList.remove('selected');
    document.getElementById('fieldJobCard').classList.remove('selected');
    
    // Enable/disable inputs
    const jobInput = document.getElementById('jobSearchInput');
    const fieldSelect = document.getElementById('fieldSelect');
    const jobResults = document.getElementById('jobSearchResults');

    if (path === 'specific') {
      document.getElementById('specificJobCard').classList.add('selected');
      jobInput.disabled = false;
      fieldSelect.disabled = true;
      fieldSelect.value = '';
      this.careerCoursesState.selectedPath = 'specific';
      this.careerCoursesState.selectedField = null;
      jobResults.classList.remove('hidden');
    } else {
      document.getElementById('fieldJobCard').classList.add('selected');
      jobInput.disabled = true;
      jobInput.value = '';
      fieldSelect.disabled = false;
      this.careerCoursesState.selectedPath = 'field';
      this.careerCoursesState.selectedJob = null;
      jobResults.classList.add('hidden');
    }

    this.updateGenerateButton();
  }

  selectField(fieldKey) {
    if (fieldKey) {
      this.careerCoursesState.selectedField = fieldKey;
    } else {
      this.careerCoursesState.selectedField = null;
    }
    this.updateGenerateButton();
  }

  populateFieldDropdown() {
    const fieldSelect = document.getElementById('fieldSelect');
    if (!fieldSelect) return;

    // Clear existing options except first
    fieldSelect.innerHTML = '<option value="">-- Select a Field --</option>';

    // Add fields
    Object.entries(this.careerCoursesDatabase.fields).forEach(([key, field]) => {
      const option = document.createElement('option');
      option.value = key;
      option.textContent = field.name;
      fieldSelect.appendChild(option);
    });
  }

  handleJobSearch(query) {
    const resultsContainer = document.getElementById('jobSearchResults');
    if (!query.trim()) {
      resultsContainer.classList.add('hidden');
      return;
    }

    const normalizedQuery = query.toLowerCase();
    const allJobs = this.getAllJobs();
    
    // Filter jobs that match the query
    const matches = allJobs.filter(job => 
      job.toLowerCase().includes(normalizedQuery)
    ).slice(0, 10); // Limit to 10 results

    this.displayJobSearchResults(matches);
  }

  getAllJobs() {
    const jobs = new Set();
    
    // Add all jobs from fields
    Object.values(this.careerCoursesDatabase.fields).forEach(field => {
      field.jobs.forEach(job => jobs.add(job));
    });

    // Add all jobs from jobCourses mappings
    Object.keys(this.careerCoursesDatabase.jobCourses).forEach(job => {
      if (job !== "default") jobs.add(job);
    });

    return Array.from(jobs).sort();
  }

  displayJobSearchResults(jobs) {
    const resultsContainer = document.getElementById('jobSearchResults');
    if (!jobs.length) {
      resultsContainer.classList.add('hidden');
      return;
    }

    resultsContainer.innerHTML = '';
    resultsContainer.classList.remove('hidden');

    jobs.forEach(job => {
      const div = document.createElement('div');
      div.className = 'job-result p-2 hover:bg-gray-100 cursor-pointer text-sm';
      div.textContent = job;
      div.addEventListener('click', () => this.selectJob(job));
      resultsContainer.appendChild(div);
    });
  }

  selectJob(job) {
    this.careerCoursesState.selectedJob = job;
    document.getElementById('jobSearchInput').value = job;
    document.getElementById('jobSearchResults').classList.add('hidden');
    this.updateGenerateButton();
  }

  updateGenerateButton() {
    const btn = document.getElementById('generateCareerPlanBtn');
    const isReady = (this.careerCoursesState.selectedPath === 'specific' && this.careerCoursesState.selectedJob) ||
                   (this.careerCoursesState.selectedPath === 'field' && this.careerCoursesState.selectedField);
    
    btn.disabled = !isReady;
  }

  generateCareerPlan() {
    const { selectedPath, selectedJob, selectedField } = this.careerCoursesState;
    
    if (selectedPath === 'specific' && selectedJob) {
      this.displayCareerPlanForJob(selectedJob);
    } else if (selectedPath === 'field' && selectedField) {
      this.displayCareerPlanForField(selectedField);
    } else {
      this.showInputError('Please select a job or field to generate your plan.');
    }
  }

  displayCareerPlanForJob(job) {
  const coursePlan = this.getCoursePlanForJob(job);
  this.renderCareerPlanResults(job, coursePlan, null);
}

displayCareerPlanForField(fieldKey) {
  const field = this.careerCoursesDatabase.fields[fieldKey];
  const randomJob = field.jobs[0]; // representative
  const coursePlan = this.getCoursePlanForJob(randomJob);

  const resultsHeader = `${field.name} (Represented by: ${randomJob})`;
  this.renderCareerPlanResults(resultsHeader, coursePlan, null, field.description);
}

  sanitizeImportantCourses(courseList, fieldKey = null) {
  const list = [...new Set((courseList || []).filter(Boolean))];

  // --- 0) Normalize/alias common names so they match your course database ---
  const aliasMap = {
    "AP Government": "AP US Government",
    "AP Gov": "AP US Government",
    "Government": "US Government",

    // If a job uses "AP Economics", keep your placeholder (you already defined it in courses)
    // Or you can swap it to Macro/Micro if you prefer:
    // "AP Economics": "AP Macroeconomics",

    "Speech": "Debate" // you don't have "Speech" defined; Debate exists
  };

  const normalized = list.map(c => aliasMap[c] || c);

  // --- 1) Remove world language courses everywhere (your request) ---
  const withoutLanguages = normalized.filter(c => {
    const s = String(c).toLowerCase();
    return !(
      s.startsWith("spanish") || s.startsWith("ap spanish") ||
      s.startsWith("french")  || s.startsWith("ap french")  ||
      s.startsWith("chinese") || s.startsWith("ap chinese")
    );
  });

  // --- 2) If AP version exists, remove non-AP duplicate version ---
  const has = new Set(withoutLanguages);

  const apPairs = [
    ["Statistics", "AP Statistics"],
    ["Psychology", "AP Psychology"],
    ["Biology 1", "AP Biology"],
    ["Chemistry 1", "AP Chemistry"],
    ["Physics 1", "AP Physics 1"],
    ["Calculus", "AP Calculus AB"]
  ];

  const cleaned = withoutLanguages.filter(c => {
    for (const [nonAP, ap] of apPairs) {
      if (c === nonAP && has.has(ap)) return false;
    }
    return true;
  });

  return cleaned;
}

flattenCoursePlan(coursePlan) {
  // Supports BOTH formats:
  // - new format: { importantCourses: [...] }
  // - old format: { required: [...], recommended: [...], electives: [...] }
  if (coursePlan && Array.isArray(coursePlan.importantCourses)) return coursePlan.importantCourses;
  return [
    ...(coursePlan?.required || []),
    ...(coursePlan?.recommended || []),
    ...(coursePlan?.electives || [])
  ];
}

  getCoursePlanForJob(job) {
  const flatten = (plan) => {
    if (plan && Array.isArray(plan.importantCourses)) return plan.importantCourses;
    return [
      ...(plan?.required || []),
      ...(plan?.recommended || []),
      ...(plan?.electives || [])
    ];
  };

  // 1) Use jobCourses if it exists (keeps your big job list)
  if (this.careerCoursesDatabase?.jobCourses?.[job]) {
    const raw = flatten(this.careerCoursesDatabase.jobCourses[job]);
    return { importantCourses: this.sanitizeImportantCourses(raw) };
  }

  // 2) Otherwise resolve via field
  for (const [fieldKey, field] of Object.entries(this.careerCoursesDatabase.fields || {})) {
    if ((field.jobs || []).includes(job)) {
      const raw = flatten(this.getFieldCoursePlan(fieldKey, job));
      return { importantCourses: this.sanitizeImportantCourses(raw, fieldKey) };
    }
  }

  // 3) Fallback
  return {
    importantCourses: this.sanitizeImportantCourses(
      ["Algebra 2", "Pre-Calculus", "AP English Language", "AP Statistics", "AP Psychology"]
    )
  };
}

getFieldCoursePlan(fieldKey, job) {
  switch (fieldKey) {
    case "Healthcare":
      return { importantCourses: ["Pre-AP Biology", "Pre-AP Chemistry", "AP Biology", "AP Chemistry", "AP Physics 1", "AP Psychology", "AP Statistics", "AP Calculus AB", "Medical Terminology", "Anatomy & Physiology", "Health Science Theory", "Health Science Clinical", "Practicum in Health Science", "AP Research"] };

    case "Engineering":
      return { importantCourses: ["Algebra 2", "Pre-Calculus", "AP Calculus AB", "AP Calculus BC", "AP Physics 1", "AP Physics C", "AP Chemistry", "AP Computer Science A", "AP Statistics", "Introduction to Engineering Design", "Principles of Engineering", "Digital Electronics", "Engineering Design and Development", "AP Research"] };

    case "Business":
      return { importantCourses: ["Principles of Business", "Business Information Management", "Business Law", "Marketing", "AP English Language", "AP Statistics", "AP Macroeconomics", "AP Microeconomics", "AP Computer Science Principles", "AP Research", "Practicum in Business Management"] };

    case "Creative":
      return { importantCourses: ["Graphic Design", "Content Creation", "Journalism", "AP English Language", "AP English Literature", "Creative Writing", "AP Studio Art", "Theater Arts", "Business Information Management", "AP Research"] };

    case "Education":
      return { importantCourses: ["AP English Language", "AP English Literature", "AP Psychology", "AP US History", "AP US Government", "AP Statistics", "AP Research", "Practicum in Education", "Debate", "Speech"] };

    case "Science":
      return { importantCourses: ["Pre-AP Biology", "Pre-AP Chemistry", "AP Biology", "AP Chemistry", "AP Physics 1", "AP Physics C", "AP Calculus AB", "AP Calculus BC", "AP Statistics", "AP Environmental Science", "Research", "AP Research"] };

    default:
      return { importantCourses: [] };
  }
}

  getPlannedGradeNumber(plan, courseName) { const map = { freshman: 9, sophomore: 10, junior: 11, senior: 12 }; for (const [yearKey, yearData] of Object.entries(plan)) { if (yearData.fall.includes(courseName) || yearData.spring.includes(courseName)) return map[yearKey]; } return null; }
  canPlaceCourseInYear(plan, course, courseName, yearNumber) { const allowed = Array.isArray(course.allowedGrades) ? course.allowedGrades : [9, 10, 11, 12]; if (!allowed.includes(yearNumber)) return false; for (const prereq of (course.prerequisites || [])) { const prereqYear = this.getPlannedGradeNumber(plan, prereq); if (prereqYear === null) return false; if (prereqYear >= yearNumber) return false; } return true; }
  buildFourYearPlan(coursePlan) {
    const allCourses = new Map();
    
    // Add all courses to a map for easy lookup
    [...coursePlan.required, ...coursePlan.recommended, ...coursePlan.electives].forEach(courseName => {
      const course = this.careerCoursesDatabase.courses[courseName];
      if (course && !allCourses.has(courseName)) {
        allCourses.set(courseName, course);
      }
    });

    // Sort by prerequisites and typical year
    const sortedCourses = Array.from(allCourses.entries()).sort((a, b) => {
      const aPrereqCount = a[1].prerequisites.filter(p => allCourses.has(p)).length;
      const bPrereqCount = b[1].prerequisites.filter(p => allCourses.has(p)).length;
      
      if (aPrereqCount !== bPrereqCount) return aPrereqCount - bPrereqCount;
      return a[1].typicalYear - b[1].typicalYear;
    });

    // Distribute across 4 years with workload balancing
    const plan = {
      freshman: { fall: [], spring: [], totalCredits: 0 },
      sophomore: { fall: [], spring: [], totalCredits: 0 },
      junior: { fall: [], spring: [], totalCredits: 0 },
      senior: { fall: [], spring: [], totalCredits: 0 }
    };

    const creditSystem = {
      'Regular': 1,
      'Pre-AP': 1.2,
      'AP': 1.5,
      'CTE': 1,
      'Elective': 0.8,
      'Language': 1,
      'PE': 0.5
    };

    // Distribute courses by year
    sortedCourses.forEach(([courseName, course]) => {
      const credits = creditSystem[course.type] || 1;
      const yearOrder = ["freshman", "sophomore", "junior", "senior"];
      const yearToNum = { freshman: 9, sophomore: 10, junior: 11, senior: 12 };

      const startYearNum = Math.min(Math.max(course.typicalYear || 9, 9), 12);
      const startKey = { 9: "freshman", 10: "sophomore", 11: "junior", 12: "senior" }[startYearNum];
      const startIndex = yearOrder.indexOf(startKey);

      let placed = false;
      const tryIndexes = [...yearOrder.keys()].slice(startIndex).concat([...yearOrder.keys()].slice(0, startIndex));

      for (const idx of tryIndexes) {
        const yearKey = yearOrder[idx];
        const yearNum = yearToNum[yearKey];

        if (!this.canPlaceCourseInYear(plan, course, courseName, yearNum)) continue;
        if (plan[yearKey].totalCredits + credits > 4) continue;

        if (plan[yearKey].fall.length <= plan[yearKey].spring.length) plan[yearKey].fall.push(courseName);
        else plan[yearKey].spring.push(courseName);

        plan[yearKey].totalCredits += credits;
        placed = true;
        break;
      }

      if (!placed) {
        // Locked behavior: if it can't legally fit by grade/prereq, it doesn't get forced in.
      }
    });


    return plan;
  }

    renderCareerPlanResults(title, coursePlan, fourYearPlan, fieldDescription = null) {
    const resultsSection = document.getElementById('careerPlanResults');
    const careerInfoDiv = document.getElementById('selectedCareerInfo');
    const fourYearDiv = document.getElementById('fourYearPlan');

    // Show results section
    resultsSection.classList.remove('hidden');

    // Build ONE clean list of important courses
    // Priority: importantCourses (new system) -> fallback: required+recommended (old system)
    const importantCourses = Array.isArray(coursePlan?.importantCourses)
      ? coursePlan.importantCourses
      : [...(coursePlan?.required || []), ...(coursePlan?.recommended || [])];

    // Remove duplicates + empty
    const cleanCourses = [...new Set(importantCourses)].filter(Boolean);

    // Display career info
    careerInfoDiv.innerHTML = `
      <div class="flex justify-between items-start">
        <div>
          <h3 class="text-lg font-semibold text-gray-800">${title}</h3>
          ${fieldDescription ? `<p class="text-sm text-gray-600">${fieldDescription}</p>` : ''}
        </div>
        <div class="text-right">
          <div class="text-2xl font-bold text-blue-500">${cleanCourses.length}</div>
          <div class="text-sm text-gray-600">Important Courses</div>
        </div>
      </div>
    `;

    // Display IMPORTANT COURSES LIST (no 4-year plan)
    const listHTML = cleanCourses.length
      ? `<ul class="border rounded-lg divide-y bg-white overflow-hidden">
          ${cleanCourses.map(c => `<li class="px-4 py-2">${c}</li>`).join('')}
        </ul>`
      : `<div class="bg-yellow-50 text-yellow-800 p-4 rounded-lg">
          No career-specific courses found.
        </div>`;

    fourYearDiv.innerHTML = `
      <div class="bg-white rounded-lg border p-4">
        <h3 class="text-lg font-semibold text-gray-800 mb-3">Important Courses to Take</h3>
        ${listHTML}
        <p class="text-sm text-gray-500 mt-3">
          These are curated for career relevance and rigor (AP / highest-level where available).
        </p>
      </div>
    `;

    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });

    // Animate results (optional)
    if (typeof anime !== 'undefined') {
      anime({
        targets: '#fourYearPlan > div',
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutQuart',
      });
    }
  }

  renderCourseInfo(courseName, yearKey) {
    const course = this.careerCoursesDatabase.courses[courseName];
    if (!course) return '';

    const difficultyClass = {
      1: 'difficulty-easy',
      2: 'difficulty-easy',
      3: 'difficulty-medium',
      4: 'difficulty-hard',
      5: 'difficulty-hard'
    }[course.difficulty] || 'difficulty-medium';

    const prerequisites = course.prerequisites.filter(p => 
      this.careerCoursesDatabase.courses[p]
    );

    const prereqText = prerequisites.length > 0 
      ? `<div class="prerequisite-note">Prereq: ${prerequisites.join(', ')}</div>` 
      : '';

    return `
      <div class="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
        <div>
          <div class="font-medium text-gray-800">${course.name}</div>
          <div class="text-xs text-gray-500">${course.description}</div>
          ${prereqText}
        </div>
        <div class="flex items-center gap-2">
          <span class="difficulty-badge ${difficultyClass}">${course.type}</span>
          <span class="text-xs text-gray-500">${({ freshman: "9th", sophomore: "10th", junior: "11th", senior: "12th" }[yearKey] || "—")}</span>
        </div>
      </div>
    `;
  }

  copyCareerPlan() {
    const title = document.querySelector('#selectedCareerInfo h3')?.textContent || 'Career Plan';
    const planText = this.generateCareerPlanText();
    
    navigator.clipboard.writeText(`${title}\n\n${planText}`).then(() => {
      this.showSuccessMessage('Career plan copied to clipboard!');
    });
  }

  generateCareerPlanText() {
  const fourYearPlan = document.getElementById('fourYearPlan');
  const items = fourYearPlan.querySelectorAll('li');

  let text = 'Important Courses to Take\n\n';

  if (!items.length) {
    text += '(No courses found)';
    return text;
  }

  items.forEach(li => {
    text += `• ${li.textContent.trim()}\n`;
  });

  return text;
}


  // ----------------------------
  // Career Quiz functionality
  // ----------------------------
  setupCareerQuiz() {
    const nextBtn = document.getElementById('nextQuestionBtn');
    const retakeBtn = document.getElementById('retakeQuizBtn');

    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.nextQuestion());
    }
    if (retakeBtn) {
      retakeBtn.addEventListener('click', () => this.initializeQuiz());
    }
  }

  initializeQuiz() {
    this.quizState.currentQuestion = 0;
    this.quizState.scores = {};
    this.quizState.selectedAnswers = [];
    
    Object.keys(this.quizState.careerCategories).forEach(category => {
      this.quizState.scores[category] = 0;
    });

    document.getElementById('resultsContainer')?.classList.add('hidden');
    document.getElementById('questionContainer')?.classList.remove('hidden');
    
    this.displayQuestion();
  }

  displayQuestion() {
    const question = this.quizState.questions[this.quizState.currentQuestion];
    if (!question) {
      this.finishQuiz();
      return;
    }

    document.getElementById('questionText').textContent = question.text;
    
    // Update progress
    const currentNum = this.quizState.currentQuestion + 1;
    const totalNum = this.quizState.questions.length;
    document.getElementById('currentQuestionNum').textContent = currentNum;
    document.getElementById('totalQuestions').textContent = totalNum;
    document.getElementById('questionType').textContent = question.type === 'multi' ? '(Select all that apply)' : '(Choose one)';
    
    const progressPercent = Math.round((currentNum / totalNum) * 100);
    document.getElementById('progressPercent').textContent = `${progressPercent}%`;
    document.getElementById('progressBar').style.width = `${progressPercent}%`;

    // Display answers
    const answersContainer = document.getElementById('answerChoices');
    answersContainer.innerHTML = '';
    this.quizState.selectedAnswers[this.quizState.currentQuestion] = [];

    question.answers.forEach((answer, index) => {
      const btn = document.createElement('button');
      btn.className = question.type === 'multi' 
        ? 'answer-btn multi-select p-4 bg-gray-50 rounded-lg text-left hover:bg-gray-100' 
        : 'answer-btn p-4 bg-gray-50 rounded-lg text-left hover:bg-gray-100';
      btn.textContent = answer.text;
      btn.dataset.index = index;
      
      if (question.type === 'multi') {
        btn.addEventListener('click', () => this.toggleMultiSelect(btn, index));
      } else {
        btn.addEventListener('click', () => this.selectSingleAnswer(btn, index));
      }
      
      answersContainer.appendChild(btn);
    });

    document.getElementById('nextQuestionBtn')?.classList.add('hidden');
  }

  selectSingleAnswer(btnElement, answerIndex) {
    // Clear previous selection
    document.querySelectorAll('.answer-btn').forEach(btn => {
      btn.classList.remove('selected');
    });
    
    // Select new answer
    btnElement.classList.add('selected');
    this.quizState.selectedAnswers[this.quizState.currentQuestion] = answerIndex;
    
    // Enable next button
    document.getElementById('nextQuestionBtn')?.classList.remove('hidden');
  }

  toggleMultiSelect(btnElement, answerIndex) {
    const question = this.quizState.questions[this.quizState.currentQuestion];
    const selected = this.quizState.selectedAnswers[this.quizState.currentQuestion];
    
    if (selected.includes(answerIndex)) {
      // Deselect
      btnElement.classList.remove('selected');
      selected.splice(selected.indexOf(answerIndex), 1);
    } else {
      // Select
      btnElement.classList.add('selected');
      selected.push(answerIndex);
    }
    
    // Show/hide next button based on selection
    const nextBtn = document.getElementById('nextQuestionBtn');
    if (selected.length > 0) {
      nextBtn?.classList.remove('hidden');
    } else {
      nextBtn?.classList.add('hidden');
    }
  }

  nextQuestion() {
    // Apply weights for current question
    const question = this.quizState.questions[this.quizState.currentQuestion];
    const selected = this.quizState.selectedAnswers[this.quizState.currentQuestion];
    
    if (question.type === 'single') {
      const answer = question.answers[selected];
      Object.entries(answer.weights).forEach(([category, weight]) => {
        this.quizState.scores[category] += weight;
      });
    } else if (question.type === 'multi') {
      selected.forEach(index => {
        const answer = question.answers[index];
        Object.entries(answer.weights).forEach(([category, weight]) => {
          this.quizState.scores[category] += weight;
        });
      });
    }

    // Move to next question
    this.quizState.currentQuestion++;
    if (this.quizState.currentQuestion >= this.quizState.questions.length) {
      this.finishQuiz();
    } else {
      this.displayQuestion();
    }
  }

  finishQuiz() {
    document.getElementById('questionContainer')?.classList.add('hidden');
    document.getElementById('resultsContainer')?.classList.remove('hidden');
    
    // Sort categories by score
    const sortedCategories = Object.entries(this.quizState.scores)
      .sort(([,a], [,b]) => b - a)
      .filter(([,score]) => score > 0)
      .slice(0, 3);

    // If no categories scored well, show top 3 anyway
    if (sortedCategories.length === 0) {
      sortedCategories.push(...Object.entries(this.quizState.scores).sort(([,a], [,b]) => b - a).slice(0, 3));
    }

    const resultsContainer = document.getElementById('careerResults');
    resultsContainer.innerHTML = '';

    sortedCategories.forEach(([key, score], index) => {
      const category = this.quizState.careerCategories[key];
      const rank = index === 0 ? 'Best Match' : index === 1 ? 'Great Fit' : 'Good Match';
      
      const card = document.createElement('div');
      card.className = 'career-card bg-white rounded-lg border p-4';
      card.innerHTML = `
        <div class="flex justify-between items-start mb-3">
          <h3 class="font-semibold text-lg text-gray-800">${category.name}</h3>
          <span class="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">${rank}</span>
        </div>
        <p class="text-sm text-gray-600 mb-3">Based on your responses, these careers align with your natural preferences.</p>
        <div class="space-y-2">
          <h4 class="font-medium text-sm text-gray-700">Recommended Careers:</h4>
          <div class="flex flex-wrap gap-2">
            ${category.careers.slice(0, 3).map(career => 
              `<span class="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">${career}</span>`
            ).join('')}
          </div>
        </div>
      `;
      resultsContainer.appendChild(card);
    });

    if (typeof anime !== 'undefined') {
      anime({
        targets: '.career-card',
        translateY: [20, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        duration: 600,
        easing: 'easeOutQuart',
      });
    }
  }

  // ----------------------------
  // Resource Search Functionality
  // ----------------------------
  setupResourceSearch() {
    const searchInput = document.getElementById('resourceSearch');
    const searchBtn = document.getElementById('searchBtn');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => this.filterResources(e.target.value));
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.filterResources(e.target.value);
      });
    }
    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        const query = document.getElementById('resourceSearch')?.value || '';
        this.filterResources(query);
      });
    }

    this.filterResources('');
  }

  filterResources(query) {
    const cards = document.querySelectorAll('.resource-card');
    const noResults = document.getElementById('noResults');
    const grid = document.getElementById('resourcesGrid');
    let hasVisible = false;

    let normalizedQuery = query.toLowerCase().trim();
    if (normalizedQuery.startsWith('ap')) {
      normalizedQuery = normalizedQuery.substring(2).trim();
    }

    cards.forEach(card => {
      const apName = card.dataset.ap?.toLowerCase() || '';
      const isVisible = apName.includes(normalizedQuery) || normalizedQuery === '';
      card.style.display = isVisible ? 'block' : 'none';
      if (isVisible) hasVisible = true;
    });

    if (hasVisible) {
      noResults?.classList.add('hidden');
      grid?.classList.remove('hidden');
    } else {
      noResults?.classList.remove('hidden');
      grid?.classList.add('hidden');
    }
  }

  // ----------------------------
  // Row-based input (Assignments)
  // ----------------------------
  getAssignmentsFromRows() {
    const rowsContainer = document.getElementById('assignmentRows');
    if (!rowsContainer) return [];

    const rows = Array.from(rowsContainer.children);

    return rows
      .map((row) => {
        const className =
          row.querySelector('[data-field="className"]')?.value?.trim() || '';
        const description =
          row.querySelector('[data-field="description"]')?.value?.trim() || '';
        const dueDateStr =
          row.querySelector('[data-field="dueDate"]')?.value || '';
        const notes =
          row.querySelector('[data-field="notes"]')?.value?.trim() || '';

        return { className, description, dueDateStr, notes };
      })
      .filter((a) => a.className || a.description || a.dueDateStr || a.notes);
  }

  validateRowAssignments(rows) {
    const assignments = [];
    const missingInfo = [];

    rows.forEach((row, index) => {
      const className = row.className || 'Class';
      const description = row.description || '';
      const notes = row.notes || '';
      const dueDate = row.dueDateStr ? this.parseLocalDateInput(row.dueDateStr) : null;

      const type = this.determineAssignmentType(description);
      const estimatedMinutes = this.estimateTime(description, type, notes);

      const parsed = {
        id: Date.now() + Math.random(),
        className,
        description: description,
        notes: notes,
        dueDate,
        type,
        estimatedMinutes,
        originalLine: `${className}: ${description}${notes ? ` (${notes})` : ''}`,
      };

      if (!dueDate || isNaN(dueDate.getTime())) {
        missingInfo.push({ ...parsed, index });
      } else {
        assignments.push(parsed);
      }
    });

    return { assignments, missingInfo };
  }

  // ----------------------------
  // Row-based input (Extracurriculars)
  // ----------------------------
  addExtracurricularRow(prefill = {}) {
    const rows = document.getElementById('extracurricularRows');
    if (!rows) return;

    const row = document.createElement('div');
    row.className = 'grid grid-cols-1 md:grid-cols-12 gap-3 bg-gray-50 p-3 rounded-lg';

    row.innerHTML = `
      <div class="md:col-span-4">
        <label class="md:hidden text-xs text-gray-500">Activity</label>
        <input type="text" class="w-full p-2 border border-gray-200 rounded-lg"
               placeholder="HOSA"
               value="${prefill.activity || ''}"
               data-field="activity">
      </div>

      <div class="md:col-span-2">
        <label class="md:hidden text-xs text-gray-500">Date</label>
        <input type="date" class="w-full p-2 border border-gray-200 rounded-lg"
               value="${prefill.dateStr || ''}"
               data-field="date">
      </div>

      <div class="md:col-span-2">
        <label class="md:hidden text-xs text-gray-500">Time</label>
        <input type="text" class="w-full p-2 border border-gray-200 rounded-lg"
               placeholder="60 minutes or 1.5 hours"
               value="${prefill.timeStr || ''}"
               data-field="time">
      </div>

      <div class="md:col-span-3">
        <label class="md:hidden text-xs text-gray-500">Notes (optional)</label>
        <input type="text" class="w-full p-2 border border-gray-200 rounded-lg"
               placeholder="Practice, meeting, game"
               value="${prefill.notes || ''}"
               data-field="notes">
      </div>

      <div class="md:col-span-1 flex md:justify-end items-end">
        <button type="button" class="remove-extra text-red-500 hover:text-red-700 text-sm">Remove</button>
      </div>
    `;

    row.querySelector('.remove-extra')?.addEventListener('click', () => row.remove());
    rows.appendChild(row);
  }

  getExtracurricularsFromRows() {
    const rowsContainer = document.getElementById('extracurricularRows');
    if (!rowsContainer) return [];

    const rows = Array.from(rowsContainer.children);

    return rows
      .map((row) => {
        const activity =
          row.querySelector('[data-field="activity"]')?.value?.trim() || '';
        const dateStr =
          row.querySelector('[data-field="date"]')?.value || '';
        const timeStr =
          row.querySelector('[data-field="time"]')?.value?.trim() || '';
        const notes =
          row.querySelector('[data-field="notes"]')?.value?.trim() || '';

        return { activity, dateStr, timeStr, notes };
      })
      .filter((e) => e.activity || e.dateStr || e.timeStr || e.notes);
  }

  parseExtracurricularMinutes(timeStr) {
    const mins = this.extractExplicitMinutes(String(timeStr || '').toLowerCase());
    if (mins === null) return 0;
    return Math.max(0, Math.round(mins));
  }

  buildExtracurricularMinutesByDate(extracurriculars) {
    const map = {};

    (extracurriculars || []).forEach((e) => {
      if (!e.dateStr) return;
      const d = this.parseLocalDateInput(e.dateStr);
      if (isNaN(d.getTime())) return;

      const mins = this.parseExtracurricularMinutes(e.timeStr);
      if (!mins) return;

      const key = d.toDateString();
      map[key] = (map[key] || 0) + mins;
    });

    return map;
  }

  getExtracurricularMinutesForDay(extracurricularMap, day) {
    if (!extracurricularMap || !day) return 0;
    return extracurricularMap[day.toDateString()] || 0;
  }

  parseChapters(text) {
    if (!text) return null;
    const s = String(text).toLowerCase();

    // "chapters 4-8", "ch 4-8", "ch. 4–8"
    let m = s.match(/\b(?:chapters|chapter|ch)\.?\s*(\d+)\s*[-–]\s*(\d+)\b/);
    if (m) {
      const a = parseInt(m[1], 10);
      const b = parseInt(m[2], 10);
      if (!isNaN(a) && !isNaN(b) && b >= a) return (b - a + 1);
    }

    // "chapter 7", "ch 12"
    m = s.match(/\b(?:chapter|ch)\.?\s*(\d+)\b/);
    if (m) return 1;

    return null;
  }

  
  // ----------------------------
  // Event listeners
  // ----------------------------
  setupEventListeners() {
    document
      .getElementById('generateBtn')
      ?.addEventListener('click', () => this.generatePlan());

    document
      .getElementById('clearBtn')
      ?.addEventListener('click', () => this.clearInput());

    document
      .getElementById('loadExampleBtn')
      ?.addEventListener('click', () => this.loadExample());

    document
      .getElementById('addRowBtn')
      ?.addEventListener('click', () => this.addAssignmentRow());

    document
      .getElementById('addExtracurricularBtn')
      ?.addEventListener('click', () => this.addExtracurricularRow());

    document
      .getElementById('clearExtracurricularsBtn')
      ?.addEventListener('click', () => this.clearExtracurriculars());

    document
      .getElementById('startDate')
      ?.addEventListener('change', (e) => this.updateStartDate(e));

    document
      .getElementById('workloadLimit')
      ?.addEventListener('change', (e) => this.updateWorkloadLimit(e));

    document
      .getElementById('difficultyMode')
      ?.addEventListener('change', (e) => this.updateDifficultyMode(e));

    document.querySelectorAll('.toggle-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => this.toggleWorkDay(e));
    });

    document
      .getElementById('copyPlanBtn')
      ?.addEventListener('click', () => this.copyPlan());

    document
      .getElementById('printPlanBtn')
      ?.addEventListener('click', () => this.printPlan());

    document
      .getElementById('regenerateBtn')
      ?.addEventListener('click', () => this.regeneratePlan());

    document
      .getElementById('howItWorksBtn')
      ?.addEventListener('click', () => this.scrollToHowItWorks());
  }

  // ----------------------------
  // UI animations
  // ----------------------------
  initializeAnimations() {
    if (typeof Typed !== 'undefined') {
      new Typed('#typed-tagline', {
        strings: [
          'Paste your assignments. Get a fair daily plan.',
          'Balanced homework, every day.',
          'No more last-minute cramming.',
          'Plan your future career path.',
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|',
      });
    }

    this.setupScrollAnimations();
  }

  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach((el) => observer.observe(el));
  }

  createParticleBackground() {
    const particles = document.getElementById('particles');
    if (!particles) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    particles.appendChild(canvas);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particleCount = 30;
    const particleArray = [];

    for (let i = 0; i < particleCount; i++) {
      particleArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: Math.random() > 0.5 ? '#4A90E2' : '#7ED321',
      });
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particleArray.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;
        if (p.y > canvas.height) p.y = 0;
        if (p.y < 0) p.y = canvas.height;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      requestAnimationFrame(animateParticles);
    }

    animateParticles();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  setDefaultDate() {
    const startEl = document.getElementById('startDate');
    if (!startEl) return;

    const todayStr = this.formatLocalDateInput(new Date());
    startEl.value = todayStr;
    this.settings.startDate = this.parseLocalDateInput(todayStr);
  }

  // ----------------------------
  // Old text parsing (kept for compatibility)
  // ----------------------------
  parseAssignments(text) {
    const lines = text.trim().split('\n').filter((line) => line.trim());
    const assignments = [];
    const missingInfo = [];

    lines.forEach((line, index) => {
      const parsed = this.parseAssignmentLine(line.trim());
      if (parsed) {
        if (parsed.dueDate) assignments.push(parsed);
        else missingInfo.push({ ...parsed, originalLine: line.trim(), index });
      }
    });

    return { assignments, missingInfo };
  }

  parseAssignmentLine(line) {
    let className = '';
    let description = line;

    if (line.includes(':')) {
      [className, description] = line.split(':', 2).map((s) => s.trim());
    } else {
      className = line.split(' ')[0];
      description = line.substring(className.length).trim();
    }

    const dueDate = this.extractDueDate(description);
    if (dueDate) {
      description = description
        .replace(
          /due\s+\d+\/\d+|\d+\/\d+\s+due|\d{4}-\d{2}-\d{2}|(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d+/i,
          ''
        )
        .trim();
    }

    const type = this.determineAssignmentType(description);
    const estimatedMinutes = this.estimateTime(description, type, '');

    return {
      id: Date.now() + Math.random(),
      className,
      description,
      dueDate,
      type,
      estimatedMinutes,
      originalLine: line,
    };
  }

  addAssignmentRow(prefill = {}) {
    const rows = document.getElementById('assignmentRows');
    if (!rows) return;

    const row = document.createElement('div');
    row.className = 'grid grid-cols-1 md:grid-cols-12 gap-3 bg-gray-50 p-3 rounded-lg';

    row.innerHTML = `
      <div class="md:col-span-2">
        <label class="md:hidden text-xs text-gray-500">Class</label>
        <input type="text" class="w-full p-2 border border-gray-200 rounded-lg"
               placeholder="Math"
               value="${prefill.className || ''}"
               data-field="className">
      </div>

      <div class="md:col-span-5">
        <label class="md:hidden text-xs text-gray-500">Description</label>
        <input type="text" class="w-full p-2 border border-gray-200 rounded-lg"
               placeholder="Worksheet 5.3"
               value="${prefill.description || ''}"
               data-field="description">
      </div>

      <div class="md:col-span-2">
        <label class="md:hidden text-xs text-gray-500">Due date</label>
        <input type="date" class="w-full p-2 border border-gray-200 rounded-lg"
               value="${prefill.dueDate || ''}"
               data-field="dueDate">
      </div>

      <div class="md:col-span-2">
        <label class="md:hidden text-xs text-gray-500">Notes (optional)</label>
        <input type="text" class="w-full p-2 border border-gray-200 rounded-lg"
               placeholder="Hard, takes longer, or 60 minutes"
               value="${prefill.notes || ''}"
               data-field="notes">
      </div>

      <div class="md:col-span-1 flex md:justify-end items-end">
        <button type="button" class="remove-row text-red-500 hover:text-red-700 text-sm">Remove</button>
      </div>
    `;

    row.querySelector('.remove-row')?.addEventListener('click', () => row.remove());
    rows.appendChild(row);
  }

  // ----------------------------
  // Date extraction
  // ----------------------------
  extractDueDate(text) {
    const patterns = [
      /due\s+(\d{1,2}\/\d{1,2}(?:\/\d{4})?)/i,
      /(\d{1,2}\/\d{1,2}(?:\/\d{4})?)\s+due/i,
      /due\s+(\d{4}-\d{2}-\d{2})/i,
      /due\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{1,2})/i,
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) return this.normalizeDate(match[1] || match[2], match[3]);
    }

    return null;
  }

  normalizeDate(dateStr, monthName) {
    let normalized = '';

    if (monthName) {
      const monthMap = {
        jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
        jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
      };
      const month = monthMap[monthName.toLowerCase()];
      const day = parseInt(dateStr, 10);
      const year = new Date().getFullYear();
      normalized = new Date(year, month, day);
    } else if (dateStr.includes('-')) {
      normalized = this.parseLocalDateInput(dateStr);
    } else {
      const [month, day, year] = dateStr.split('/').map((n) => parseInt(n, 10));
      const finalYear = year || new Date().getFullYear();
      normalized = new Date(finalYear, month - 1, day);
    }

    if (normalized < this.settings.startDate) {
      normalized.setFullYear(normalized.getFullYear() + 1);
    }

    return normalized;
  }

  parseLocalDateAny(dateStr) {
    if (!dateStr) return null;

    // If it's "YYYY-MM-DD" (from <input type="date">)
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      const [y, m, d] = dateStr.split('-').map(Number);
      return new Date(y, m - 1, d, 12, 0, 0, 0); // local noon
    }

    // If it's "MM/DD/YYYY"
    if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateStr)) {
      const [mm, dd, yyyy] = dateStr.split('/').map(Number);
      return new Date(yyyy, mm - 1, dd, 12, 0, 0, 0); // local noon
    }

    // Fallback (avoid shifting by forcing noon)
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return null;
    d.setHours(12, 0, 0, 0);
    return d;
  }

  // ----------------------------
  // Type + time estimation
  // ----------------------------
  determineAssignmentType(description) {
    const lowerDesc = (description || '').toLowerCase();

    if (lowerDesc.match(/test|quiz|exam|study|review/)) return 'test';
    if (lowerDesc.match(/project|essay|presentation|lab report|poster/)) return 'project';
    if (lowerDesc.match(/worksheet|homework|problems|packet/)) return 'homework';
    if (lowerDesc.match(/read|chapter|pages|article|notes/)) return 'reading';

    return 'other';
  }

  estimateTime(description, type, notes = '') {
    const desc = String(description || '');
    const n = String(notes || '');
    const combined = `${desc} ${n}`.toLowerCase();

    // 1) If the user explicitly typed time anywhere, obey it
    const explicit = this.extractExplicitMinutes(combined);
    if (explicit !== null) return this.clampMinutes(explicit);

    // 2) Quantity-based estimation (works for ANY numbers)
    const mult = this.getDifficultyMultiplierFromText(combined);

    const pages = this.parsePagesSmart(combined);
    if (pages != null) {
      const minutesPerPage = 1.7; // tweak if you want
      return this.clampMinutes(Math.round(pages * minutesPerPage * mult));
    }

    const chapters = this.parseChaptersSmart(combined);
    if (chapters != null) {
      const minutesPerChapter = 18; // tweak if you want
      return this.clampMinutes(Math.round(chapters * minutesPerChapter * mult));
    }

    const problems = this.parseProblemCount(combined);
    if (problems != null) {
      const minutesPerProblem = 3.0; // tweak if you want
      return this.clampMinutes(Math.round(problems * minutesPerProblem * mult));
    }

    // 3) Fallback: your old logic (base by type + keywords)
    let baseMinutes =
      {
        reading: 30,
        homework: 45,
        test: 60,
        project: 90,
        other: 40,
      }[type] ?? 40;

    const lowerDesc = desc.toLowerCase();

    // Slight bump if it looks like a range (ch/pages) even without extracting a count
    if (/\b(ch|chapter|chapters)\b/.test(lowerDesc) && /(\d+\s*[-–]\s*\d+|\d+\s*(?:through|to)\s*\d+)/.test(lowerDesc)) {
      baseMinutes += 10;
    }

    if (lowerDesc.includes('outline')) baseMinutes = Math.max(baseMinutes - 10, 15);
    if (lowerDesc.includes('final')) baseMinutes += 30;

    // Apply difficulty multiplier from notes/desc
    baseMinutes = Math.round(baseMinutes * mult);

    return this.clampMinutes(baseMinutes);
  }

  extractExplicitMinutes(text) {
    if (!text) return null;

    const t = String(text).toLowerCase();

    const wordToNum = {
      zero: 0, one: 1, a: 1, an: 1,
      two: 2, three: 3, four: 4, five: 5,
      six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
      eleven: 11, twelve: 12
    };

    const normalized = t.replace(
      /\b(zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|a|an)\b/g,
      (m) => String(wordToNum[m])
    );

    const candidates = [];

    for (const m of normalized.matchAll(/\b(\d+(?:\.\d+)?)\s*(hours?|hrs?|hr)\b/g)) {
      const hours = parseFloat(m[1]);
      if (!isNaN(hours) && hours > 0) candidates.push(Math.round(hours * 60));
    }

    for (const m of normalized.matchAll(/\b(\d{1,3})\s*(minutes?|mins?|min)\b/g)) {
      const mins = parseInt(m[1], 10);
      if (!isNaN(mins) && mins > 0) candidates.push(mins);
    }

    for (const m of normalized.matchAll(/\b(\d+(?:\.\d+)?)\s*h\b/g)) {
      const hours = parseFloat(m[1]);
      if (!isNaN(hours) && hours > 0) candidates.push(Math.round(hours * 60));
    }

    const mixed = normalized.match(/\b(\d+(?:\.\d+)?)\s*(hours?|hrs?|hr)\b.*?\b(\d{1,3})\s*(minutes?|mins?|min)\b/);
    if (mixed) {
      const h = parseFloat(mixed[1]);
      const m = parseInt(mixed[3], 10);
      if (!isNaN(h) && !isNaN(m) && h >= 0 && m >= 0) {
        candidates.push(Math.round(h * 60) + m);
      }
    }

    const pure = normalized.match(/^\s*(\d{1,3})\s*$/);
    if (pure) {
      const val = parseInt(pure[1], 10);
      if (!isNaN(val) && val > 0) candidates.push(val);
    }

    // Support "10m" (no space)
    for (const m of normalized.matchAll(/\b(\d{1,3})m\b/g)) {
      const mins = parseInt(m[1], 10);
      if (!isNaN(mins) && mins > 0) candidates.push(mins);
    }

    // Support "1h30m" (no spaces)
    for (const m of normalized.matchAll(/\b(\d+(?:\.\d+)?)h(\d{1,3})m\b/g)) {
      const h = parseFloat(m[1]);
      const mm = parseInt(m[2], 10);
      if (!isNaN(h) && !isNaN(mm) && h >= 0 && mm >= 0) {
        candidates.push(Math.round(h * 60) + mm);
      }
    }


    if (candidates.length === 0) return null;
    return Math.max(...candidates);
  }

    // --- SMART QUANTITY PARSERS ---

  parseNumberRangeCount(text, labelRegex) {
    // Supports: "pages 4-8", "ch 4–8", "chapters 4 through 8", "pg 10 to 30"
    const s = String(text || '').toLowerCase();

    // range: 4-8 or 4–8
    let m = s.match(new RegExp(`${labelRegex}\\s*(\\d+)\\s*[-–]\\s*(\\d+)`, 'i'));
    if (m) {
      const a = parseInt(m[1], 10), b = parseInt(m[2], 10);
      if (!isNaN(a) && !isNaN(b) && b >= a) return (b - a + 1);
    }

    // range: 4 through 8 / 4 to 8
    m = s.match(new RegExp(`${labelRegex}\\s*(\\d+)\\s*(?:through|thru|to)\\s*(\\d+)`, 'i'));
    if (m) {
      const a = parseInt(m[1], 10), b = parseInt(m[2], 10);
      if (!isNaN(a) && !isNaN(b) && b >= a) return (b - a + 1);
    }

    return null;
  }

  parsePagesSmart(text) {
    const s = String(text || '').toLowerCase();

    // "pg 10-30" / "pages 10 through 30"
    const rangeCount =
      this.parseNumberRangeCount(s, String.raw`\b(?:pg|p|page|pages)\b`);
    if (rangeCount != null) return rangeCount;

    // "60 pages", "20 total pages", "15 pg"
    const m = s.match(/\b(\d+)\s*(?:pages|page|pg|p)\b/);
    if (m) return parseInt(m[1], 10);

    return null;
  }

  parseChaptersSmart(text) {
    const s = String(text || '').toLowerCase();

    // "chapters 4-8", "ch 4 through 8"
    const rangeCount =
      this.parseNumberRangeCount(s, String.raw`\b(?:chapter|chapters|ch)\.?\b`);
    if (rangeCount != null) return rangeCount;

    // single mention "chapter 7" / "ch 12"
    const single = s.match(/\b(?:chapter|ch)\.?\s*\d+\b/);
    if (single) return 1;

    return null;
  }

  parseProblemCount(text) {
    const s = String(text || '').toLowerCase();
    const m = s.match(/\b(\d+)\s*(?:problems|problem|questions|question|qs|q)\b/);
    if (m) return parseInt(m[1], 10);
    return null;
  }

  getDifficultyMultiplierFromText(text) {
    const s = String(text || '').toLowerCase();

    let mult = 1.0;

    if (/\b(super hard|very hard|really hard)\b/.test(s)) mult *= 1.6;
    else if (/\b(hard|difficult|confusing|challenging)\b/.test(s)) mult *= 1.35;

    if (/\b(takes longer|longer|slow|lengthy)\b/.test(s)) mult *= 1.15;
    if (/\b(easy|quick|fast)\b/.test(s)) mult *= 0.9;

    return mult;
  }

  clampMinutes(minutes) {
    const m = Math.round(minutes);
    return Math.max(5, Math.min(m, 180));
  }

  // ----------------------------
  // Scheduling Algorithm
  // ----------------------------
  generateSchedule(assignments, extracurricularMinutesByDate = {}) {
    if (!assignments || assignments.length === 0) return [];

    const schedule = {};
    const workDays = this.getWorkDaysBetween(
      this.settings.startDate,
      this.getLatestDueDate(assignments)
    );

    assignments.sort((a, b) => a.dueDate - b.dueDate);

    assignments.forEach((assignment) => {
      // FIX: Handle weekend due dates by using the previous work day
      const effectiveDueDate = this.getEffectiveDueDate(assignment.dueDate);
      
      const availableDays = workDays.filter(
        (day) => day <= effectiveDueDate && day >= this.settings.startDate
      );

      if (availableDays.length === 0) {
        console.warn('No available days for assignment:', assignment.description);
        return;
      }

      const chunks = this.splitAssignment(assignment, availableDays.length);

      chunks.forEach((chunk) => {
        const bestDay = this.findBestDayForChunk(
          schedule,
          availableDays,
          chunk.estimatedMinutes,
          extracurricularMinutesByDate
        );

        const key = bestDay.toDateString();
        if (!schedule[key]) schedule[key] = [];

        schedule[key].push({
          ...chunk,
          originalAssignment: assignment,
        });
      });
    });

    return this.scheduleToArray(schedule, extracurricularMinutesByDate);
  }

  // FIX: New helper to get effective due date
  getEffectiveDueDate(dueDate) {
    // If due date is on a weekend, use the previous work day
    const dayOfWeek = dueDate.getDay();
    const workDays = this.settings.workDays;
    
    // Check if due date day is in work days
    const dayNameMap = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const dueDayName = dayNameMap[dayOfWeek];
    
    if (workDays.includes(dueDayName)) {
      return new Date(dueDate);
    }
    
    // Find the previous work day
    let current = new Date(dueDate);
    while (current >= this.settings.startDate) {
      current.setDate(current.getDate() - 1);
      const currentDayName = dayNameMap[current.getDay()];
      if (workDays.includes(currentDayName)) {
        return current;
      }
    }
    
    // Fallback to original due date if no previous work day found
    return new Date(dueDate);
  }

  getWorkDaysBetween(start, end) {
    const days = [];
    const current = new Date(start);

    while (current <= end) {
      const dayName = current
        .toLocaleDateString('en-US', { weekday: 'short' })
        .toLowerCase();
      if (this.settings.workDays.includes(dayName)) {
        days.push(new Date(current));
      }
      current.setDate(current.getDate() + 1);
    }

    return days;
  }

  getLatestDueDate(assignments) {
    const validDates = (assignments || [])
      .map(a => a.dueDate)
      .filter(d => d instanceof Date && !isNaN(d.getTime()));

    if (validDates.length === 0) {
      return new Date(this.settings.startDate);
    }

    return new Date(Math.max(...validDates.map(d => d.getTime())));
  }

  splitAssignment(assignment, availableDayCount) {
    const { estimatedMinutes, description } = assignment;

    if (estimatedMinutes <= 60 || availableDayCount === 1) {
      return [{ ...assignment, part: 1, totalParts: 1 }];
    }

    const idealChunkSize = Math.max(
      30,
      Math.min(60, Math.ceil(estimatedMinutes / availableDayCount))
    );
    const chunkCount = Math.min(
      Math.ceil(estimatedMinutes / idealChunkSize),
      availableDayCount
    );

    const chunks = [];
    let remainingMinutes = estimatedMinutes;

    for (let i = 0; i < chunkCount; i++) {
      const chunkMinutes =
        i === chunkCount - 1
          ? remainingMinutes
          : Math.min(idealChunkSize, remainingMinutes);

      chunks.push({
        ...assignment,
        estimatedMinutes: chunkMinutes,
        description:
          chunkCount > 1
            ? `${description} (Part ${i + 1} of ${chunkCount})`
            : description,
        part: i + 1,
        totalParts: chunkCount,
      });

      remainingMinutes -= chunkMinutes;
    }

    return chunks;
  }

  // ENHANCED: Now includes slight bias toward earlier days and better distribution
  findBestDayForChunk(schedule, availableDays, chunkMinutes = 0, extracurricularMinutesByDate = {}) {
    if (availableDays.length === 1) return availableDays[0];

    const dayLoads = availableDays.map((day, index) => {
      const workLoad = this.getDayWorkload(schedule, day);
      const extra = this.getExtracurricularMinutesForDay(extracurricularMinutesByDate, day);

      const effectiveLimit = Math.max(15, this.settings.workloadLimit - extra);
      const totalIfAdded = workLoad + chunkMinutes;

      const relativeLoad = totalIfAdded / effectiveLimit;

      return { day, relativeLoad, index };
    });

    // Prefer days that are under capacity
    const feasibleDays = dayLoads.filter(d => d.relativeLoad <= 1.5);
    const candidates = feasibleDays.length ? feasibleDays : dayLoads;

    // Sort by load first, then by weekday order
    candidates.sort((a, b) => {
      if (a.relativeLoad !== b.relativeLoad) {
        return a.relativeLoad - b.relativeLoad;
      }
      return a.index - b.index;
    });

    return candidates[0].day;
  }

  getDayWorkload(schedule, day) {
    const key = day.toDateString();
    if (!schedule[key]) return 0;
    return schedule[key].reduce((total, chunk) => total + chunk.estimatedMinutes, 0);
  }

  parseLocalDateInput(dateStr) {
    // dateStr like "2026-01-17"
    if (!dateStr) return null;
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(y, m - 1, d, 12, 0, 0, 0); // noon local avoids DST/UTC shifts
  }

  formatLocalDateInput(dateObj) {
    const d = new Date(dateObj);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  scheduleToArray(scheduleObj, extracurricularMinutesByDate = {}) {
    const scheduleArray = [];

    Object.keys(scheduleObj).forEach((dateKey) => {
      const date = new Date(dateKey);
      const tasks = scheduleObj[dateKey];
      const totalMinutes = tasks.reduce((sum, task) => sum + task.estimatedMinutes, 0);

      const extra = extracurricularMinutesByDate[date.toDateString()] || 0;
      const effectiveLimit = this.settings.workloadLimit - extra;

      scheduleArray.push({
        date,
        tasks,
        totalMinutes,
        extracurricularMinutes: extra,
        effectiveLimit,
        workloadLevel: this.getWorkloadLevel(totalMinutes, effectiveLimit),
      });
    });

    return scheduleArray.sort((a, b) => a.date - b.date);
  }

  getWorkloadLevel(minutes, effectiveLimit = null) {
    const limit = effectiveLimit === null ? this.settings.workloadLimit : effectiveLimit;
    const safeLimit = Math.max(15, limit);
    const ratio = minutes / safeLimit;

    if (ratio <= 0.8) return 'green';
    if (ratio <= 1.1) return 'amber';
    return 'red';
  }

  // ----------------------------
  // Settings UI
  // ----------------------------
  updateSettings() {
    document.querySelectorAll('.toggle-btn').forEach((btn) => {
      const day = btn.dataset.day;
      if (this.settings.workDays.includes(day)) btn.classList.add('active');
      else btn.classList.remove('active');
    });

    const wl = document.getElementById('workloadLimit');
    if (wl) wl.value = this.settings.workloadLimit;

    const dm = document.getElementById('difficultyMode');
    if (dm) dm.value = this.settings.difficultyMode;
  }

  // ----------------------------
  // Missing info UI
  // ----------------------------
  showMissingInfo(missingInfo) {
    const section = document.getElementById('missingInfoSection');
    const list = document.getElementById('missingInfoList');
    if (!section || !list) return;

    if (!missingInfo || missingInfo.length === 0) {
      section.classList.add('hidden');
      return;
    }

    list.innerHTML = '';
    missingInfo.forEach((item) => {
      const div = document.createElement('div');
      div.className = 'flex items-center justify-between bg-white p-2 rounded border';
      div.innerHTML = `
        <span class="text-sm">${item.className}: ${item.description}</span>
        <div class="flex items-center gap-2">
          <input type="date" class="missing-date-picker text-sm p-1 border rounded" data-index="${item.index}">
          <button class="skip-item text-xs text-gray-500 hover:text-red-500" data-index="${item.index}">Skip</button>
        </div>
      `;
      list.appendChild(div);
    });

    list.querySelectorAll('.missing-date-picker').forEach((picker) => {
      picker.addEventListener('change', (e) => {
        const index = parseInt(e.target.dataset.index, 10);
        if (!e.target.value) return;

        const date = this.parseLocalDateInput(e.target.value);
        if (isNaN(date.getTime())) return;

        this.resolveMissingDate(index, date);
      });
    });

    list.querySelectorAll('.skip-item').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index, 10);
        this.skipMissingItem(index);
      });
    });

    section.classList.remove('hidden');
  }

  resolveMissingDate(index, date) {
    const rowsContainer = document.getElementById('assignmentRows');
    if (!rowsContainer) return;

    const rowEl = rowsContainer.children[index];
    if (!rowEl) return;

    const dueInput = rowEl.querySelector('[data-field="dueDate"]');
    if (!dueInput) return;

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    dueInput.value = `${yyyy}-${mm}-${dd}`;

    this.refreshMissingInfoUI();
  }

  skipMissingItem(index) {
    const rowsContainer = document.getElementById('assignmentRows');
    if (!rowsContainer) return;

    const rowEl = rowsContainer.children[index];
    if (rowEl) rowEl.remove();

    this.refreshMissingInfoUI();
  }

  refreshMissingInfoUI() {
    const assignments = this.getAssignmentsFromRows();
    const { missingInfo } = this.validateRowAssignments(assignments);

    if (missingInfo.length === 0) {
      document.getElementById('missingInfoSection')?.classList.add('hidden');
      return;
    }

    this.showMissingInfo(missingInfo);
  }

  // ----------------------------
  // Output rendering
  // ----------------------------
  displaySchedule(schedule) {
    const section = document.getElementById('outputSection');
    const daysContainer = document.getElementById('scheduleDays');
    if (!section || !daysContainer) return;

    if (!schedule || schedule.length === 0) {
      section.classList.add('hidden');
      return;
    }

    this.updateSummary(schedule);

    daysContainer.innerHTML = '';
    schedule.forEach((day, index) => {
      const dayCard = this.createDayCard(day, index);
      daysContainer.appendChild(dayCard);
    });

    if (typeof anime !== 'undefined') {
      anime({
        targets: '.day-card',
        translateY: [20, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        duration: 600,
        easing: 'easeOutQuart',
      });
    }

    section.classList.remove('hidden');
    section.scrollIntoView({ behavior: 'smooth' });
  }

  createDayCard(day) {
    const card = document.createElement('div');
    card.className = 'day-card bg-white rounded-lg border p-4 text-gray-900';

    const dayName = day.date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });

    const workloadPill =
      {
        green: '<span class="workload-green px-2 py-1 rounded-full text-xs">On Track</span>',
        amber: '<span class="workload-amber px-2 py-1 rounded-full text-xs">Heavy Day</span>',
        red: '<span class="workload-red px-2 py-1 rounded-full text-xs">Overloaded</span>',
      }[day.workloadLevel] || '';

    const extraLine = day.extracurricularMinutes
      ? `<div class="text-xs text-gray-500">Extracurriculars: ${day.extracurricularMinutes} min</div>`
      : '';

    card.innerHTML = `
      <div class="flex justify-between items-center mb-3">
        <h3 class="font-semibold text-lg">${dayName}</h3>
        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-600">${day.totalMinutes} min</span>
          ${workloadPill}
        </div>
      </div>
      ${extraLine}
      <div class="space-y-2 mt-2">
        ${day.tasks
          .map(
            (task) => `
          <div class="flex items-center justify-between p-2 bg-gray-50 rounded">
            <div>
              <div class="font-medium text-sm text-gray-800">
                ${task.className}: ${task.description}${task.notes ? ` (${task.notes})` : ''}
              </div>
              <div class="text-xs text-gray-500">Due: ${task.dueDate.toLocaleDateString()}</div>
            </div>
            <div class="text-sm text-gray-700">${task.estimatedMinutes} min</div>
          </div>
        `
          )
          .join('')}
      </div>
    `;

    return card;
  }

  updateSummary(schedule) {
    const totalAssignments = schedule.reduce((sum, day) => sum + day.tasks.length, 0);
    const totalDays = schedule.length;
    const totalMinutes = schedule.reduce((sum, day) => sum + day.totalMinutes, 0);

    const busiestDay = schedule.reduce(
      (max, day) => (day.totalMinutes > (max?.totalMinutes || 0) ? day : max),
      null
    );

    const ta = document.getElementById('totalAssignments');
    const td = document.getElementById('totalDays');
    const tm = document.getElementById('totalMinutes');
    const bd = document.getElementById('busiestDay');

    if (ta) ta.textContent = totalAssignments;
    if (td) td.textContent = totalDays;
    if (tm) tm.textContent = totalMinutes;
    if (bd)
      bd.textContent = busiestDay
        ? busiestDay.date.toLocaleDateString('en-US', { weekday: 'short' })
        : '-';

    const hasOverload = schedule.some((day) => day.workloadLevel === 'red');
    const warningSection = document.getElementById('warningMessage');
    if (warningSection) {
      if (hasOverload) warningSection.classList.remove('hidden');
      else warningSection.classList.add('hidden');
    }
  }

  // ----------------------------
  // Actions
  // ----------------------------
  async generatePlan() {
    const assignments = this.getAssignmentsFromRows();

    const extracurriculars = this.getExtracurricularsFromRows();
    const extracurricularMinutesByDate = this.buildExtracurricularMinutesByDate(extracurriculars);
    this.extracurricularMinutesByDate = extracurricularMinutesByDate;

    if (assignments.length === 0) {
      this.showInputError('Add at least one assignment row.');
      return;
    }

    const btn = document.getElementById('generateBtn');
    const originalText = btn ? btn.textContent : 'Generate';

    if (btn) {
      btn.innerHTML = '<div class="loading-spinner inline-block mr-2"></div>Generating...';
      btn.disabled = true;
    }

    try {
      const { assignments: parsedAssignments, missingInfo } =
        this.validateRowAssignments(assignments);

      if (missingInfo.length > 0) {
        this.showMissingInfo(missingInfo);
        if (btn) {
          btn.textContent = originalText;
          btn.disabled = false;
        }
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 300));
      this.schedule = this.generateSchedule(parsedAssignments, extracurricularMinutesByDate);
      this.displaySchedule(this.schedule);
      this.clearInputError();
    } catch (error) {
      console.error('Error generating plan:', error);
      this.showInputError('Error generating plan. Please check your input format.');
    } finally {
      if (btn) {
        btn.textContent = originalText;
        btn.disabled = false;
      }
    }
  }

  clearInput() {
    const rows = document.getElementById('assignmentRows');
    if (rows) rows.innerHTML = '';
    this.addAssignmentRow();

    this.clearInputError();
    document.getElementById('missingInfoSection')?.classList.add('hidden');
  }

  clearExtracurriculars() {
    const rows = document.getElementById('extracurricularRows');
    if (rows) rows.innerHTML = '';
    this.addExtracurricularRow();
  }

  loadExample() {
  const rows = document.getElementById('assignmentRows');
  if (!rows) return;
  rows.innerHTML = '';

  // Use the user's selected start date as the anchor (so examples always span the chosen week)
  const startEl = document.getElementById('startDate');
  const base = startEl?.value
    ? this.parseLocalDateInput(startEl.value)
    : (() => { const d = new Date(); d.setHours(12,0,0,0); return d; })();

  const iso = (d) => this.formatLocalDateInput(d);

  const addDaysFromBase = (n) => {
    const d = new Date(base);
    d.setHours(12,0,0,0);
    d.setDate(d.getDate() + n);
    return d;
  };

  // Spread across the NEXT Mon–Fri window starting from the chosen start date
  // (so you will see Thu/Fri included)
  const exampleAssignments = [
    { className: 'Math',      description: 'Worksheet 5.3',                    dueDate: iso(addDaysFromBase(2)), notes: 'hard, 60 minutes' },
    { className: 'English',   description: 'Read chapters 4–6',                dueDate: iso(addDaysFromBase(3)), notes: '' },
    { className: 'Biology',   description: 'Study for cell structure quiz',     dueDate: iso(addDaysFromBase(4)), notes: 'really hard' },
    { className: 'History',   description: 'DBQ outline – French Revolution',  dueDate: iso(addDaysFromBase(5)), notes: '' },  // Thu-ish
    { className: 'Chemistry', description: 'Lab report: acids & bases',         dueDate: iso(addDaysFromBase(6)), notes: 'takes longer' }, // Fri-ish
    { className: 'Spanish',   description: 'Vocabulary quiz chapters 1–3',      dueDate: iso(addDaysFromBase(7)), notes: 'quick' }, // spills to next week
  ];

  exampleAssignments.forEach(item => this.addAssignmentRow(item));
  this.clearInputError();
}

  showInputError(message) {
    const validationDiv = document.getElementById('inputValidation');
    if (!validationDiv) return;

    validationDiv.textContent = message;
    validationDiv.className = 'mt-2 text-sm text-red-600';
    validationDiv.classList.remove('hidden');

    const container = document.getElementById('assignmentRows');
    if (container) {
      container.classList.add('shake');
      setTimeout(() => container.classList.remove('shake'), 500);
    }
  }

  clearInputError() {
    const validationDiv = document.getElementById('inputValidation');
    if (!validationDiv) return;
    validationDiv.classList.add('hidden');
  }

  updateStartDate(e) {
    this.settings.startDate = this.parseLocalDateInput(e.target.value);
  }

  updateWorkloadLimit(e) {
    this.settings.workloadLimit = parseInt(e.target.value, 10);
  }

  updateDifficultyMode(e) {
    this.settings.difficultyMode = e.target.value;
  }

  toggleWorkDay(e) {
    const day = e.target.dataset.day;
    const isActive = e.target.classList.contains('active');

    if (isActive) {
      e.target.classList.remove('active');
      this.settings.workDays = this.settings.workDays.filter((d) => d !== day);
    } else {
      e.target.classList.add('active');
      this.settings.workDays.push(day);
    }

    if (this.settings.workDays.length === 0) {
      e.target.classList.add('active');
      this.settings.workDays.push(day);
      this.showInputError('Select at least one work day.');
    }
  }

  copyPlan() {
    const planText = this.generatePlanText();
    navigator.clipboard.writeText(planText).then(() => {
      this.showSuccessMessage('Plan copied to clipboard!');
    });
  }

  printPlan() {
    window.print();
  }

  regeneratePlan() {
    this.generatePlan();
  }

  generatePlanText() {
    let text = 'KatyPlan Study Schedule\n\n';

    this.schedule.forEach((day) => {
      const extra = day.extracurricularMinutes ? `, Extracurriculars: ${day.extracurricularMinutes} min` : '';
      text += `${day.date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
      })} (${day.totalMinutes} minutes${extra})\n`;

      day.tasks.forEach((task) => {
        text += `  • ${task.className}: ${task.description}${task.notes ? ` (${task.notes})` : ''} (${task.estimatedMinutes} min)\n`;
      });

      text += '\n';
    });

    return text;
  }

  showSuccessMessage(message) {
    const div = document.createElement('div');
    div.className =
      'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    div.textContent = message;
    document.body.appendChild(div);

    if (typeof anime !== 'undefined') {
      anime({
        targets: div,
        translateX: [100, 0],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuart',
      });

      setTimeout(() => {
        anime({
          targets: div,
          translateX: [0, 100],
          opacity: [1, 0],
          duration: 300,
          easing: 'easeInQuart',
          complete: () => div.remove(),
        });
      }, 3000);
    } else {
      setTimeout(() => div.remove(), 3000);
    }
  }

  scrollToHowItWorks() {
    document.getElementById('howItWorksSection')?.scrollIntoView({
      behavior: 'smooth',
    });
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new KatyPlan();
});