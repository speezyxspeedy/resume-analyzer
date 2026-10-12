/**
 * ===================================================================
 * ResumeX — Premium AI Resume Analyzer
 * Pure Vanilla JavaScript Client-Side Engine
 * 100% Rule-Based & Private — Zero External Dependencies
 * ===================================================================
 */

(function () {
  'use strict';

  /* ===================================================================
     1. KNOWLEDGE BASES & RULE DICTIONARIES
     =================================================================== */

  // Power action verbs that signal leadership, execution, and technical excellence
  const ACTION_VERBS = [
    'accelerated', 'achieved', 'administered', 'advised', 'advocated', 'analyzed',
    'architected', 'authored', 'automated', 'boosted', 'budgeted', 'built',
    'centralized', 'championed', 'coached', 'collaborated', 'consolidated',
    'constructed', 'contracted', 'converted', 'coordinated', 'counseled', 'created',
    'customized', 'debugged', 'decreased', 'delegated', 'delivered', 'deployed',
    'designed', 'developed', 'devised', 'directed', 'distributed', 'documented',
    'doubled', 'drafted', 'drove', 'eliminated', 'engineered', 'enhanced',
    'established', 'evaluated', 'executed', 'expanded', 'expedited', 'facilitated',
    'forecasted', 'formulated', 'fostered', 'founded', 'generated', 'governed',
    'guided', 'halved', 'headed', 'identified', 'implemented', 'improved',
    'improvised', 'increased', 'influenced', 'initiated', 'inspected', 'instituted',
    'instructed', 'integrated', 'interpreted', 'introduced', 'invented', 'investigated',
    'launched', 'led', 'leveraged', 'managed', 'mapped', 'maximized', 'mentored',
    'migrated', 'minimized', 'modernized', 'monitored', 'motivated', 'navigated',
    'negotiated', 'optimized', 'orchestrated', 'organized', 'originated', 'outperformed',
    'overhauled', 'oversaw', 'partnered', 'performed', 'piloted', 'pioneered',
    'planned', 'prepared', 'presented', 'produced', 'programmed', 'promoted',
    'proposed', 'published', 're-engineered', 'rebuilt', 'recruited', 'redesigned',
    'reduced', 'refactored', 'reformed', 'regulated', 'remodeled', 'reorganized',
    'replaced', 'resolved', 'restructured', 'revamped', 'revitalized', 'revolutionized',
    'scaled', 'scheduled', 'secured', 'simplified', 'slashed', 'solicited',
    'spearheaded', 'standardized', 'streamlined', 'strengthened', 'structured',
    'supervized', 'surpassed', 'synthesized', 'systematized', 'targeted', 'tested',
    'tracked', 'trained', 'transformed', 'transitioned', 'troubleshot', 'unified',
    'upgraded', 'utilized', 'validated', 'visualized', 'won', 'yielded'
  ];

  // Passive, cliché, or weak phrasing that ATS and recruiters advise against
  const CLICHE_PHRASES = [
    'responsible for', 'duties included', 'worked on', 'helped with',
    'assisted in', 'handled', 'team player', 'hard working', 'hard-working',
    'go-getter', 'self-starter', 'detail oriented', 'detail-oriented',
    'fast learner', 'think outside the box', 'synergy', 'dynamic person',
    'people person', 'results driven', 'results-driven', 'work well under pressure'
  ];

  // Curated list of prominent technical and industry competencies
  const SKILLS_LIBRARY = [
    // Languages & Runtimes
    'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'golang', 'go',
    'rust', 'php', 'ruby', 'swift', 'kotlin', 'dart', 'html', 'css', 'sass',
    'sql', 'nosql', 'r', 'matlab', 'bash', 'shell', 'powershell',

    // Frontend Ecosystem
    'react', 'react.js', 'vue', 'vue.js', 'angular', 'next.js', 'nuxt', 'svelte',
    'tailwind', 'tailwind css', 'bootstrap', 'material ui', 'redux', 'zustand',
    'webpack', 'vite', 'esbuild', 'responsive design', 'web accessibility', 'wcag',

    // Backend, APIs & Systems
    'node.js', 'nodejs', 'express', 'express.js', 'nestjs', 'django', 'fastapi',
    'flask', 'spring boot', 'asp.net', 'laravel', 'graphql', 'rest api', 'restful',
    'grpc', 'microservices', 'websocket', 'websockets', 'event-driven architecture',

    // Databases & Storage
    'postgresql', 'postgres', 'mysql', 'mongodb', 'redis', 'elasticsearch',
    'dynamodb', 'sqlite', 'cassandra', 'prisma', 'typeorm', 'hibernate',

    // Cloud, DevOps & Infrastructure
    'aws', 'amazon web services', 'azure', 'google cloud', 'gcp', 'docker',
    'kubernetes', 'k8s', 'terraform', 'ansible', 'ci/cd', 'github actions',
    'jenkins', 'gitlab ci', 'linux', 'nginx', 'serverless', 'cloudformation',

    // Testing & Quality
    'jest', 'cypress', 'playwright', 'selenium', 'mocha', 'junit', 'pytest',
    'unit testing', 'integration testing', 'e2e testing', 'tdd', 'test-driven development',

    // Machine Learning & Data
    'machine learning', 'deep learning', 'pytorch', 'tensorflow', 'scikit-learn',
    'pandas', 'numpy', 'data analysis', 'data visualization', 'nlp', 'computer vision',
    'etl', 'apache spark', 'airflow', 'tableau', 'power bi',

    // Methodologies & Collaboration
    'git', 'github', 'gitlab', 'agile', 'scrum', 'kanban', 'jira', 'confluence',
    'system design', 'distributed systems', 'object-oriented programming', 'oop',
    'clean architecture', 'code review', 'performance optimization', 'scalability'
  ];

  // Common stop words to exclude when extracting custom keywords from JD
  const STOP_WORDS = new Set([
    'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t',
    'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by',
    'can', 'can\'t', 'cannot', 'could', 'couldn\'t', 'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing',
    'don\'t', 'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'hadn\'t', 'has', 'hasn\'t',
    'have', 'haven\'t', 'having', 'he', 'he\'d', 'he\'ll', 'he\'s', 'her', 'here', 'here\'s', 'hers',
    'herself', 'him', 'himself', 'his', 'how', 'how\'s', 'i', 'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if',
    'in', 'into', 'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself', 'let\'s', 'me', 'more', 'most', 'mustn\'t',
    'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our',
    'ours', 'ourselves', 'out', 'over', 'own', 'same', 'shan\'t', 'she', 'she\'d', 'she\'ll', 'she\'s',
    'should', 'shouldn\'t', 'so', 'some', 'such', 'than', 'that', 'that\'s', 'the', 'their', 'theirs',
    'them', 'themselves', 'then', 'there', 'there\'s', 'these', 'they', 'they\'d', 'they\'ll', 'they\'re',
    'they\'ve', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'wasn\'t',
    'we', 'we\'d', 'we\'ll', 'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when', 'when\'s',
    'where', 'where\'s', 'which', 'while', 'who', 'who\'s', 'whom', 'why', 'why\'s', 'with', 'won\'t',
    'would', 'wouldn\'t', 'you', 'you\'d', 'you\'ll', 'you\'re', 'you\'ve', 'your', 'yours', 'yourself',
    'yourselves', 'will', 'must', 'shall', 'may', 'might', 'can', 'years', 'experience', 'ability', 'looking',
    'work', 'role', 'team', 'ideal', 'candidate', 'company', 'position', 'requirements', 'qualifications',
    'skills', 'opportunity', 'including', 'knowledge', 'understanding', 'strong', 'good', 'excellent'
  ]);

  /* ===================================================================
     2. DEMO SAMPLE PRESETS
     =================================================================== */

  const SAMPLE_PRESETS = {
    fullstack: {
      name: 'Senior Full-Stack Engineer',
      resume: `ALEXANDER RIVERA
San Francisco, CA | (555) 382-9014 | alex.rivera@devmail.io | linkedin.com/in/alexrivera-tech | github.com/alexrivera-dev

PROFESSIONAL SUMMARY
Results-oriented Senior Full-Stack Engineer with 6+ years of experience architecting high-scale web platforms and cloud-native microservices. Proven track record of reducing latency by 42% and scaling user throughput to over 1.2M daily active users. Expert in React, TypeScript, Node.js, and AWS distributed infrastructure.

CORE SKILLS & TECHNOLOGIES
Languages & Frameworks: TypeScript, JavaScript, Python, React, Next.js, Node.js, Express, Tailwind CSS, HTML5, CSS3
Databases & Cache: PostgreSQL, MongoDB, Redis, Prisma ORM
Cloud & DevOps: AWS (EC2, S3, Lambda, ECS), Docker, Kubernetes, CI/CD, GitHub Actions, Terraform
Architectures & Testing: REST APIs, GraphQL, Microservices, System Design, Jest, Cypress, TDD, Agile/Scrum

PROFESSIONAL EXPERIENCE
Staff Software Engineer | NexaCloud Platforms
San Francisco, CA | 2022 - Present
- Architected and engineered an event-driven microservices architecture using Node.js, TypeScript, and AWS ECS, reducing system API latency by 38% for 850,000 enterprise users.
- Spearheaded the frontend rewrite from legacy Angular to Next.js and Tailwind CSS, increasing page load velocity by 54% and lifting web vitals score to 98/100.
- Orchestrated automated CI/CD deployment pipelines using GitHub Actions and Docker, reducing release cycle duration from 4 days to 25 minutes.
- Mentored a distributed team of 8 software engineers, instituting code review standards, test-driven development (TDD), and increasing test coverage from 61% to 92%.

Senior Full-Stack Developer | BrightWave Fintech
San Jose, CA | 2019 - 2022
- Engineered high-throughput payment processing APIs handling $45M in annual transaction volume with 99.99% uptime SLA.
- Optimized PostgreSQL database queries and introduced Redis caching layers, slashing database CPU utilization by 45% and eliminating query bottlenecks.
- Deployed real-time fraud alert dashboard using React, WebSockets, and Python, decreasing fraudulent chargebacks by 28% within the first two quarters.
- Collaborated closely with product managers and security auditors to achieve SOC2 Type II compliance.

EDUCATION
Bachelor of Science in Computer Science
University of California, Berkeley | Graduated 2019
Honors: Dean's Honor List, Magna Cum Laude

KEY PROJECTS
- CloudMetrics Observability Platform: Built an open-source real-time container metrics monitor using React, Go, and Docker. Earned 1,400+ GitHub stars and 20k+ downloads.
- Distributed Task Runner: Developed high-concurrency background job processor utilizing Redis and Node.js capable of 15,000 jobs/sec throughput.`,
      jd: `We are looking for a Senior Full-Stack Software Engineer to build and scale our high-throughput customer web applications.

Responsibilities:
- Architect, build, and maintain mission-critical web applications using React, Next.js, TypeScript, and Node.js.
- Design scalable REST APIs, GraphQL endpoints, and event-driven microservices.
- Optimize database schemas and queries using PostgreSQL and Redis caching.
- Build and operate cloud infrastructure on AWS leveraging Docker, Kubernetes, and CI/CD pipelines.
- Collaborate with product designers and engineers in an Agile Scrum environment.
- Champion engineering best practices, unit testing with Jest, and automated integration tests.

Requirements:
- 5+ years of software development experience with React, TypeScript, and Node.js.
- Strong knowledge of relational databases like PostgreSQL and caching with Redis.
- Hands-on cloud experience with AWS, Docker, and GitHub Actions CI/CD workflows.
- Demonstrated experience building distributed microservices and designing robust REST APIs.
- Bachelor's degree in Computer Science or equivalent practical experience.`
    },

    'frontend-needs-work': {
      name: 'Mid Frontend Developer (Needs Polish)',
      resume: `JORDAN CHEN
Seattle, WA | jordan.chen.code@email.com

SUMMARY
Passionate frontend developer who is a team player and hard-working fast learner. Looking for an exciting opportunity to build websites and web applications.

SKILLS
HTML, CSS, JavaScript, React, Git, Bootstrap

WORK EXPERIENCE
Frontend Developer | PixelCraft Studios
Seattle, WA | 2021 - Present
- Responsible for building websites for various clients using React and Bootstrap.
- Helped with fixing UI bugs and updated styling across multiple client websites.
- Worked on improving web page layouts and mobile responsive designs.
- Duties included attending daily standup meetings and working closely with the team.
- Assisted in integrating backend APIs into frontend components.

Junior Web Developer | Innovate Web Solutions
Seattle, WA | 2020 - 2021
- Worked on creating landing pages using HTML, CSS, and basic JavaScript.
- Handled content updates and image optimizations for marketing pages.
- Assisted senior developers with various programming tasks.

EDUCATION
Web Development Certificate - Tech Academy (2020)`,
      jd: `We are seeking a Frontend Engineer to join our core product team.

Responsibilities:
- Build modern, interactive user interfaces with React, TypeScript, Next.js, and Tailwind CSS.
- Connect frontend apps with REST APIs and GraphQL backends.
- Implement comprehensive automated test suites using Jest and Cypress.
- Optimize web application performance, Core Web Vitals, and accessibility (WCAG).
- Collaborate in a fast-paced environment with Git, Docker, and Agile development.

Qualifications:
- 2+ years of professional frontend experience with React and TypeScript.
- Strong understanding of state management (Redux or Zustand) and modern build tools (Vite or Webpack).
- Experience with unit testing (Jest) and end-to-end testing.
- Proven ability to write clean, maintainable, and well-tested code.`
    },

    'data-scientist': {
      name: 'Data Scientist & ML Specialist',
      resume: `PRIYA SHARMA, Ph.D.
Boston, MA | (617) 555-7182 | priya.sharma@mlresearch.org | linkedin.com/in/priyasharma-data | github.com/priyasharma-ml

SUMMARY
Senior Data Scientist with 5+ years of production machine learning experience. Specialized in NLP, predictive analytics, and deep learning architectures with PyTorch and Python. Successfully deployed models generating $3.2M in annual cost savings.

TECHNICAL SKILLS
Languages: Python, R, SQL, Bash
Machine Learning: PyTorch, TensorFlow, Scikit-Learn, HuggingFace, XGBoost, Pandas, NumPy
Data Engineering & Cloud: AWS (SageMaker, S3), Docker, Apache Spark, Airflow, Snowflake, PostgreSQL
Analysis & Tools: Data Visualization, Tableau, Git, CI/CD, A/B Testing, Statistical Modeling

EXPERIENCE
Senior Machine Learning Engineer | Boston Health Analytics
Boston, MA | 2021 - Present
- Engineered deep learning NLP pipeline using PyTorch and HuggingFace Transformers, analyzing 450,000 clinical records with 94.6% classification accuracy.
- Deployed real-time inference models using Docker and AWS SageMaker, slashing average inference latency from 1.4s to 120ms.
- Spearheaded A/B testing framework across 12 clinical trials, establishing statistical power thresholds and improving patient cohort selection by 31%.
- Automated daily ETL processing workflows with Apache Spark and Airflow, cutting data prep pipeline runtime by 65%.

Data Scientist | FinMetric Advisors
Boston, MA | 2019 - 2021
- Developed predictive churn model utilizing XGBoost and Scikit-Learn, reducing quarterly customer churn by 18% and retaining $2.4M in recurring revenue.
- Architected automated Snowflake and SQL reporting pipelines, delivering executive dashboards in Tableau viewed by 200+ global stakeholders.
- Conducted multivariate regression analyses and statistical anomaly detection on high-frequency transaction streams.

EDUCATION
Ph.D. in Computational Data Science
Massachusetts Institute of Technology (MIT) | 2019

Bachelor of Science in Mathematics & Statistics
Carnegie Mellon University | 2015

PUBLICATIONS & PROJECTS
- Published 3 peer-reviewed research papers on transformer attention mechanisms in IEEE.
- PyTorchML-Tools: Open-source model training utility with 650+ GitHub stars.`,
      jd: `We are hiring a Senior Data Scientist to lead our machine learning initiatives and predictive modeling pipeline.

What You Will Do:
- Build, train, and deploy production machine learning models using Python, PyTorch, and Scikit-Learn.
- Develop natural language processing (NLP) pipelines and transformer-based architectures.
- Create scalable data pipelines and ETL processes using SQL, Apache Spark, and Snowflake.
- Deploy models to AWS cloud environments using Docker and modern CI/CD practices.
- Design rigorous A/B experiments and statistical validation tests to measure product impact.

Qualifications:
- Master's or Ph.D. in Computer Science, Statistics, Mathematics, or related field.
- 4+ years of hands-on data science experience with Python, PyTorch, Pandas, and NumPy.
- Strong SQL proficiency and experience handling large-scale datasets with Spark or Snowflake.
- Experience with Docker containerization and cloud platforms such as AWS.
- Strong track record of translating complex data into measurable business outcomes.`
    }
  };

  /* ===================================================================
     3. DOM ELEMENTS SELECTION
     =================================================================== */

  // Text inputs & file elements
  const resumeTextEl = document.getElementById('resume-text');
  const jdTextEl = document.getElementById('jd-text');
  const fileInputEl = document.getElementById('resume-file-input');
  const dropZoneEl = document.getElementById('drop-zone');
  const clearResumeBtn = document.getElementById('clear-resume-btn');
  const clearJdBtn = document.getElementById('clear-jd-btn');
  const analyzeBtn = document.getElementById('analyze-btn');
  const resetBtn = document.getElementById('reset-btn');

  // Stats counters
  const resumeWordCountEl = document.getElementById('resume-word-count');
  const resumeCharCountEl = document.getElementById('resume-char-count');
  const jdWordCountEl = document.getElementById('jd-word-count');
  const jdKeywordCountEl = document.getElementById('jd-keyword-count');
  const fileIndicatorEl = document.getElementById('resume-file-indicator');
  const filenameEl = document.getElementById('resume-filename');

  // Dashboard view states
  const stateEmptyEl = document.getElementById('state-empty');
  const stateLoadingEl = document.getElementById('state-loading');
  const stateResultsEl = document.getElementById('state-results');
  const loadingStatusEl = document.getElementById('loading-step-text');
  const loadingProgressBarEl = document.getElementById('loading-progress-bar');
  const quickDemoBtn = document.getElementById('quick-demo-btn');

  // Sample presets dropdown
  const sampleDropdownBtn = document.getElementById('sample-dropdown-btn');
  const sampleDropdownMenu = document.getElementById('sample-dropdown-menu');

  // Toolbar actions
  const copyReportBtn = document.getElementById('copy-report-btn');
  const downloadReportBtn = document.getElementById('download-report-btn');
  const auditTimestampEl = document.getElementById('audit-timestamp');

  // Score hero elements
  const scoreNumberEl = document.getElementById('score-number');
  const scoreMeterCircle = document.getElementById('score-meter-circle');
  const scoreStatusBadgeEl = document.getElementById('score-status-badge');
  const keywordMatchBadgeEl = document.getElementById('keyword-match-badge');
  const scoreHeadlineEl = document.getElementById('score-headline');
  const scoreSummaryDescEl = document.getElementById('score-summary-desc');

  // Quick metrics
  const metricJdMatchEl = document.getElementById('metric-jd-match');
  const metricActionVerbsEl = document.getElementById('metric-action-verbs');
  const metricQuantCountEl = document.getElementById('metric-quant-count');
  const metricWordStatusEl = document.getElementById('metric-word-status');
  const metricWordsSubEl = document.getElementById('metric-words-sub');

  // Category breakdown
  const catScoreKeywordsEl = document.getElementById('cat-score-keywords');
  const catBarKeywordsEl = document.getElementById('cat-bar-keywords');
  const catDescKeywordsEl = document.getElementById('cat-desc-keywords');

  const catScoreMetricsEl = document.getElementById('cat-score-metrics');
  const catBarMetricsEl = document.getElementById('cat-bar-metrics');
  const catDescMetricsEl = document.getElementById('cat-desc-metrics');

  const catScoreVerbsEl = document.getElementById('cat-score-verbs');
  const catBarVerbsEl = document.getElementById('cat-bar-verbs');
  const catDescVerbsEl = document.getElementById('cat-desc-verbs');

  const catScoreStructureEl = document.getElementById('cat-score-structure');
  const catBarStructureEl = document.getElementById('cat-bar-structure');
  const catDescStructureEl = document.getElementById('cat-desc-structure');

  // Keywords intelligence elements
  const matchedKeywordsListEl = document.getElementById('matched-keywords-list');
  const missingKeywordsListEl = document.getElementById('missing-keywords-list');
  const matchedCountPillEl = document.getElementById('matched-count-pill');
  const missingCountPillEl = document.getElementById('missing-count-pill');
  const foundVerbsListEl = document.getElementById('found-verbs-list');
  const flaggedClichesListEl = document.getElementById('flagged-cliches-list');
  const filterTabs = document.querySelectorAll('.filter-tab');

  // Checklist items
  const checkContactEl = document.getElementById('check-contact');
  const checkLinksEl = document.getElementById('check-links');
  const checkExperienceEl = document.getElementById('check-experience');
  const checkEducationEl = document.getElementById('check-education');
  const checkSkillsEl = document.getElementById('check-skills');
  const checkProjectsEl = document.getElementById('check-projects');
  const checkQuantEl = document.getElementById('check-quant');
  const checkLengthEl = document.getElementById('check-length');

  // Strengths, improvements, tips lists
  const strengthsListEl = document.getElementById('strengths-list');
  const improvementsListEl = document.getElementById('improvements-list');
  const formattingTipsListEl = document.getElementById('formatting-tips-list');

  // Toast container
  const toastContainer = document.getElementById('toast-container');

  // Variable to store latest analysis state for copy/download
  let latestAnalysisReport = null;

  /* ===================================================================
     4. UTILITY FUNCTIONS & TOASTS
     =================================================================== */

  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
    } else if (type === 'error') {
      iconSvg = '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';
    } else if (type === 'warning') {
      iconSvg = '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
    } else {
      iconSvg = '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
    }

    toast.innerHTML = `${iconSvg}<span>${escapeHtml(message)}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 3200);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function countWords(str) {
    if (!str || !str.trim()) return 0;
    return str.trim().split(/\s+/).filter(Boolean).length;
  }

  function updateTextCounters() {
    const resumeText = resumeTextEl.value;
    const rWords = countWords(resumeText);
    const rChars = resumeText.length;
    resumeWordCountEl.textContent = `${rWords} word${rWords === 1 ? '' : 's'}`;
    resumeCharCountEl.textContent = `${rChars} character${rChars === 1 ? '' : 's'}`;

    const jdText = jdTextEl.value;
    const jWords = countWords(jdText);
    const potentialKeywords = extractKeywordsFromJD(jdText).length;
    jdWordCountEl.textContent = `${jWords} word${jWords === 1 ? '' : 's'}`;
    jdKeywordCountEl.textContent = `${potentialKeywords} target keyword${potentialKeywords === 1 ? '' : 's'}`;
  }

  /* ===================================================================
     5. KEYWORD EXTRACTION & NATURAL MATCHING HEURISTICS
     =================================================================== */

  /**
   * Extract key skills & terms from a Job Description using rule-based parsing.
   * Cross-references curated skills dictionary + detects capitalized tech acronyms & compounds.
   */
  function extractKeywordsFromJD(jdText) {
    if (!jdText || !jdText.trim()) return [];

    const lowerJD = jdText.toLowerCase();
    const detectedKeywordsSet = new Set();

    // 1. Check matching against our curated technical & domain library
    SKILLS_LIBRARY.forEach(skill => {
      // Word boundary regex for safe token matching
      const escaped = skill.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(`(?:^|[^a-z0-9#+])${escaped}(?:$|[^a-z0-9#+])`, 'i');
      if (regex.test(lowerJD)) {
        detectedKeywordsSet.add(skill);
      }
    });

    // 2. Extract technical patterns like PascalCase/CamelCase/Acronyms (e.g. CI/CD, AWS, OAuth, Kafka, ETL)
    const acronymMatches = jdText.match(/\b[A-Z]{2,}(?:\/[A-Z]+)?\b/g) || [];
    acronymMatches.forEach(acr => {
      const lower = acr.toLowerCase();
      if (!STOP_WORDS.has(lower) && acr.length >= 2 && acr.length <= 10) {
        detectedKeywordsSet.add(lower);
      }
    });

    // 3. Extract frequent non-stop technical bigrams & words
    const tokens = jdText.toLowerCase()
      .replace(/[^a-z0-9+#.-]/g, ' ')
      .split(/\s+/)
      .filter(t => t.length > 2 && !STOP_WORDS.has(t) && !/^\d+$/.test(t));

    const freqMap = {};
    tokens.forEach(t => {
      freqMap[t] = (freqMap[t] || 0) + 1;
    });

    // Take high-frequency domain words (frequency >= 2)
    Object.keys(freqMap).forEach(word => {
      if (freqMap[word] >= 2 && !STOP_WORDS.has(word) && word.length >= 3) {
        detectedKeywordsSet.add(word);
      }
    });

    return Array.from(detectedKeywordsSet);
  }

  /**
   * Check if a keyword is present in resume text with boundary awareness
   */
  function isKeywordInResume(keyword, resumeTextLower) {
    const escaped = keyword.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(?:^|[^a-z0-9#+])${escaped}(?:$|[^a-z0-9#+])`, 'i');
    return regex.test(resumeTextLower);
  }

  /* ===================================================================
     6. CORE RULE-BASED ANALYZER ENGINE
     =================================================================== */

  function performAnalysis(resumeText, jdText) {
    const resumeLower = resumeText.toLowerCase();
    const resumeLines = resumeText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const totalWords = countWords(resumeText);

    // -------------------------------------------------------------
    // CHECK 1: Contact Information & Online Profiles
    // -------------------------------------------------------------
    const emailRegex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/i;
    const phoneRegex = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
    const urlRegex = /(?:https?:\/\/)?(?:www\.)?(?:linkedin\.com\/in\/[^\s]+|github\.com\/[^\s]+|gitlab\.com\/[^\s]+|[a-z0-9-]+\.(?:io|dev|me|com|tech|app)\b)/i;

    const hasEmail = emailRegex.test(resumeText);
    const hasPhone = phoneRegex.test(resumeText);
    const hasOnlineProfile = urlRegex.test(resumeText);
    const hasLocation = /(?:san francisco|new york|seattle|austin|boston|chicago|london|remote|california|texas|washington|massachusetts|[A-Z]{2}\s+\d{5}|\b[A-Za-z\s]+,\s*[A-Z]{2}\b)/i.test(resumeText);

    const contactScoreDetails = {
      hasEmail,
      hasPhone,
      hasOnlineProfile,
      hasLocation
    };

    // -------------------------------------------------------------
    // CHECK 2: Standard ATS Section Headings
    // -------------------------------------------------------------
    const sections = {
      experience: /(?:^|\n)\s*(?:work\s+)?experience|employment(?:\s+history)?|professional\s+history|experience\b/i.test(resumeText),
      education: /(?:^|\n)\s*education|academic\s+background|degrees?|qualifications?\b/i.test(resumeText),
      skills: /(?:^|\n)\s*(?:core\s+)?skills|technical\s+skills|technologies|competencies\b/i.test(resumeText),
      projects: /(?:^|\n)\s*projects|key\s+projects|personal\s+projects|portfolio\b/i.test(resumeText),
      summary: /(?:^|\n)\s*(?:professional\s+)?summary|profile|about\s+me|objective\b/i.test(resumeText)
    };

    // -------------------------------------------------------------
    // CHECK 3: Quantifiable Accomplishments & Metrics
    // -------------------------------------------------------------
    // Detect percentages, dollar amounts, scale statistics, multipliers
    const percentMatches = resumeText.match(/\b\d+(?:\.\d+)?%/g) || [];
    const dollarMatches = resumeText.match(/\$\s*\d+[\d,]*(?:\.\d+)?[kKmMbB]?/g) || [];
    const scaleMatches = resumeText.match(/\b\d+(?:\.\d+)?[xX]\b|\b\d+[\d,]*\+?\s*(?:users|clients|teams|projects|customers|requests|rps|qps|stars|downloads|nodes|servers|engineers)\b/gi) || [];
    const allMetricsCount = percentMatches.length + dollarMatches.length + scaleMatches.length;

    // -------------------------------------------------------------
    // CHECK 4: Power Action Verbs vs Passive Clichés
    // -------------------------------------------------------------
    const detectedActionVerbs = [];
    ACTION_VERBS.forEach(verb => {
      const regex = new RegExp(`\\b${verb}\\b`, 'i');
      if (regex.test(resumeLower)) {
        detectedActionVerbs.push(verb);
      }
    });

    const detectedCliches = [];
    CLICHE_PHRASES.forEach(phrase => {
      if (resumeLower.includes(phrase)) {
        detectedCliches.push(phrase);
      }
    });

    // -------------------------------------------------------------
    // CHECK 5: Keywords Match against Job Description
    // -------------------------------------------------------------
    let targetKeywords = [];
    let matchedKeywords = [];
    let missingKeywords = [];
    let keywordMatchRate = 0;

    const hasJobDescription = jdText && jdText.trim().length > 30;

    if (hasJobDescription) {
      targetKeywords = extractKeywordsFromJD(jdText);
      if (targetKeywords.length === 0) {
        // Fallback to top detected tech skills
        targetKeywords = ['react', 'javascript', 'typescript', 'python', 'sql', 'git', 'ci/cd', 'docker', 'rest api', 'agile'];
      }

      targetKeywords.forEach(kw => {
        if (isKeywordInResume(kw, resumeLower)) {
          matchedKeywords.push(kw);
        } else {
          missingKeywords.push(kw);
        }
      });

      keywordMatchRate = Math.round((matchedKeywords.length / targetKeywords.length) * 100);
    } else {
      // General skill audit when no JD is supplied
      const generalSkillsFound = [];
      SKILLS_LIBRARY.forEach(skill => {
        if (isKeywordInResume(skill, resumeLower)) {
          generalSkillsFound.push(skill);
        }
      });

      matchedKeywords = generalSkillsFound.slice(0, 24);
      // Pick missing popular industry standards to suggest
      const popularStandards = ['docker', 'ci/cd', 'typescript', 'rest api', 'sql', 'git', 'testing', 'system design', 'agile', 'cloud'];
      popularStandards.forEach(std => {
        if (!isKeywordInResume(std, resumeLower)) {
          missingKeywords.push(std);
        }
      });

      keywordMatchRate = Math.min(100, Math.round((generalSkillsFound.length / 10) * 100));
    }

    // -------------------------------------------------------------
    // 7. COMPREHENSIVE 100-POINT SCORING RUBRIC
    // -------------------------------------------------------------

    // Category A: Keywords & Skill Overlap (Max 25 pts)
    let scoreKeywords = 0;
    if (hasJobDescription) {
      if (keywordMatchRate >= 80) scoreKeywords = 25;
      else if (keywordMatchRate >= 65) scoreKeywords = 22;
      else if (keywordMatchRate >= 50) scoreKeywords = 18;
      else if (keywordMatchRate >= 35) scoreKeywords = 14;
      else if (keywordMatchRate >= 20) scoreKeywords = 10;
      else scoreKeywords = 6;
    } else {
      // General skill density scoring
      const skillCount = matchedKeywords.length;
      if (skillCount >= 12) scoreKeywords = 24;
      else if (skillCount >= 8) scoreKeywords = 20;
      else if (skillCount >= 5) scoreKeywords = 16;
      else scoreKeywords = 10;
    }

    // Category B: Measurable Impact & Metrics (Max 25 pts)
    let scoreMetrics = 0;
    if (allMetricsCount >= 6) scoreMetrics = 25;
    else if (allMetricsCount >= 4) scoreMetrics = 22;
    else if (allMetricsCount >= 2) scoreMetrics = 17;
    else if (allMetricsCount === 1) scoreMetrics = 11;
    else scoreMetrics = 5; // Minimal or no quantifiable results

    // Category C: Power Action Verbs vs Passive Fluff (Max 25 pts)
    let scoreVerbs = 0;
    const verbCount = detectedActionVerbs.length;
    if (verbCount >= 8) scoreVerbs = 24;
    else if (verbCount >= 5) scoreVerbs = 20;
    else if (verbCount >= 3) scoreVerbs = 16;
    else if (verbCount >= 1) scoreVerbs = 11;
    else scoreVerbs = 6;

    // Penalty for clichés
    const clichePenalty = detectedCliches.length * 3;
    scoreVerbs = Math.max(4, scoreVerbs - clichePenalty);

    // Category D: ATS Structure & Sections (Max 25 pts)
    let scoreStructure = 0;
    // Contact Info (up to 7 pts)
    if (hasEmail) scoreStructure += 3;
    if (hasPhone) scoreStructure += 2;
    if (hasOnlineProfile) scoreStructure += 2;

    // Standard Sections (up to 12 pts)
    if (sections.experience) scoreStructure += 4;
    if (sections.education) scoreStructure += 3;
    if (sections.skills) scoreStructure += 3;
    if (sections.projects || sections.summary) scoreStructure += 2;

    // Word Length & Format (up to 6 pts)
    if (totalWords >= 350 && totalWords <= 1000) {
      scoreStructure += 6; // Optimal 1-2 pages
    } else if (totalWords >= 200 && totalWords <= 1300) {
      scoreStructure += 4;
    } else {
      scoreStructure += 2; // Too short or too lengthy
    }

    // Cap total score to 100
    const totalScore = Math.min(100, Math.max(10, scoreKeywords + scoreMetrics + scoreVerbs + scoreStructure));

    // -------------------------------------------------------------
    // 8. GENERATE STRENGTHS, IMPROVEMENTS & ACTIONABLE TIPS
    // -------------------------------------------------------------
    const strengths = [];
    const improvements = [];
    const tips = [];

    // Strengths analysis
    if (scoreMetrics >= 20) {
      strengths.push(`Exceptional quantifiable impact: detected ${allMetricsCount} measurable metrics, percentages, and performance results.`);
    } else if (allMetricsCount >= 2) {
      strengths.push(`Good demonstration of measurable outcomes with ${allMetricsCount} numerical achievements.`);
    }

    if (detectedActionVerbs.length >= 6) {
      strengths.push(`Dynamic leadership tone: detected ${detectedActionVerbs.length} high-impact action verbs (e.g., ${detectedActionVerbs.slice(0, 3).join(', ')}).`);
    }

    if (sections.experience && sections.education && sections.skills) {
      strengths.push('Clean ATS structural foundation with standard Experience, Education, and Skills hierarchy.');
    }

    if (hasJobDescription && keywordMatchRate >= 65) {
      strengths.push(`High target role alignment with ${keywordMatchRate}% job keyword overlap (${matchedKeywords.length} matching competencies).`);
    }

    if (hasOnlineProfile) {
      strengths.push('Included professional web presence (GitHub / LinkedIn / Portfolio) for recruiter verification.');
    }

    if (strengths.length === 0) {
      strengths.push('Valid readable resume document structure ready for targeted refinement.');
    }

    // Improvements analysis
    if (allMetricsCount < 3) {
      improvements.push(`Low quantifiable proof: Only ${allMetricsCount} measurable metrics found. Use the Google "X-Y-Z" formula (Accomplished [X] as measured by [Y] by doing [Z]).`);
    }

    if (detectedCliches.length > 0) {
      improvements.push(`Found ${detectedCliches.length} passive or cliché phrases ("${detectedCliches.join('", "')}"). Replace them with assertive action verbs.`);
    }

    if (detectedActionVerbs.length < 5) {
      improvements.push(`Limited action verbs detected (${detectedActionVerbs.length} found). Begin bullet points with strong verbs like Spearheaded, Engineered, Optimized, or Reduced.`);
    }

    if (hasJobDescription && missingKeywords.length > 0) {
      const topMissing = missingKeywords.slice(0, 5).join(', ');
      improvements.push(`Missing critical competencies from the target role: [ ${topMissing} ]. Naturally integrate relevant ones.`);
    }

    if (!sections.projects) {
      improvements.push('No dedicated Projects section identified. Adding 1-2 highlight projects with live links significantly boosts recruiter callbacks.');
    }

    if (!hasOnlineProfile) {
      improvements.push('No GitHub or LinkedIn profile link detected. Modern technical hiring managers expect clickable portfolio proof.');
    }

    if (totalWords < 350) {
      improvements.push(`Resume word count is low (${totalWords} words). A standard 1-page resume is typically 400 - 700 words with rich bullet details.`);
    } else if (totalWords > 1100) {
      improvements.push(`Resume word count is high (${totalWords} words). Consider condensing bullet points to fit within a crisp 1-2 page format.`);
    }

    // Actionable formatting tips
    tips.push({
      priority: 'high',
      title: 'Action Verbs on Every Bullet Point',
      desc: 'Ensure every single accomplishment bullet starts with a past-tense power verb (e.g., "Architected", "Engineered", "Reduced") rather than passive phrasing.'
    });

    tips.push({
      priority: allMetricsCount < 3 ? 'high' : 'med',
      title: 'Inject Measurable Metrics (% and $)',
      desc: 'Recruiters scan for quantifiable impact. Add metrics for latency reduction, cost savings, user scale, test coverage, or team size.'
    });

    tips.push({
      priority: hasJobDescription && missingKeywords.length > 3 ? 'high' : 'med',
      title: 'Tailor Skills to Job Description',
      desc: `Address top missing keywords (${missingKeywords.slice(0, 4).join(', ') || 'cloud, CI/CD, testing'}) throughout your experience bullets where authentic.`
    });

    tips.push({
      priority: 'info',
      title: 'ATS-Friendly Formatting Rule',
      desc: 'Use single-column layout, standard UTF-8 text fonts, and avoid placing crucial skills inside graphic tables, columns, or images that parsers cannot read.'
    });

    return {
      totalScore,
      totalWords,
      hasJobDescription,
      keywordMatchRate,
      contactScoreDetails,
      sections,
      allMetricsCount,
      detectedActionVerbs,
      detectedCliches,
      targetKeywords,
      matchedKeywords,
      missingKeywords,
      breakdown: {
        keywords: { score: scoreKeywords, max: 25 },
        metrics: { score: scoreMetrics, max: 25 },
        verbs: { score: scoreVerbs, max: 25 },
        structure: { score: scoreStructure, max: 25 }
      },
      strengths,
      improvements,
      tips
    };
  }

  /* ===================================================================
     7. RENDERING DASHBOARD RESULTS
     =================================================================== */

  function renderResults(analysis) {
    latestAnalysisReport = analysis;

    // Update timestamp
    const now = new Date();
    auditTimestampEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Render Overall Score & Radial Meter
    const score = analysis.totalScore;
    scoreNumberEl.textContent = score;

    // Animate circular SVG meter (circumference = 2 * PI * 50 = 314.159)
    const circumference = 314.159;
    const offset = circumference - (score / 100) * circumference;
    scoreMeterCircle.style.strokeDashoffset = offset;

    // Color-code the meter stroke and badge based on score bracket
    let scoreColor = '#10b981'; // Green
    let badgeText = 'Optimized';
    let badgeClass = 'badge-success';
    let headline = 'Competitive ATS Resume';
    let summaryDesc = 'Strong candidate profile with measurable accomplishments and clear section hierarchies.';

    if (score >= 85) {
      scoreColor = '#10b981';
      badgeText = 'Top Tier';
      badgeClass = 'badge-success';
      headline = 'Top-Tier ATS Compatibility';
      summaryDesc = 'Excellent structural clarity, rich keyword alignment, and quantifiable achievements.';
    } else if (score >= 70) {
      scoreColor = '#06b6d4';
      badgeText = 'Competitive';
      badgeClass = 'badge-accent';
      headline = 'Competitive Candidate Profile';
      summaryDesc = 'Strong foundation with minor keyword or metric opportunities to reach elite benchmark.';
    } else if (score >= 50) {
      scoreColor = '#f59e0b';
      badgeText = 'Needs Polish';
      badgeClass = 'badge-warning';
      headline = 'Decent Baseline, Gaps Identified';
      summaryDesc = 'Needs more quantifiable proof, stronger action verbs, and better keyword overlap with the role.';
    } else {
      scoreColor = '#f43f5e';
      badgeText = 'Requires Revision';
      badgeClass = 'badge-danger';
      headline = 'High Risk of ATS Filtering';
      summaryDesc = 'Missing critical sections, low keyword match, or lacking measurable accomplishments.';
    }

    scoreMeterCircle.style.stroke = scoreColor;
    scoreStatusBadgeEl.className = `badge ${badgeClass}`;
    scoreStatusBadgeEl.textContent = badgeText;
    scoreHeadlineEl.textContent = headline;
    scoreSummaryDescEl.textContent = summaryDesc;

    if (analysis.hasJobDescription) {
      keywordMatchBadgeEl.textContent = `${analysis.keywordMatchRate}% Role Match`;
      keywordMatchBadgeEl.className = analysis.keywordMatchRate >= 65 ? 'badge badge-success' : 'badge badge-warning';
      keywordMatchBadgeEl.style.display = 'inline-flex';
    } else {
      keywordMatchBadgeEl.textContent = 'General Heuristic Audit';
      keywordMatchBadgeEl.className = 'badge badge-subtle';
    }

    // 2. Render Quick Metrics
    metricJdMatchEl.textContent = `${analysis.keywordMatchRate}%`;
    metricActionVerbsEl.textContent = analysis.detectedActionVerbs.length;
    metricQuantCountEl.textContent = analysis.allMetricsCount;

    let wordStatus = 'Optimal';
    let wordColorClass = 'text-green';
    if (analysis.totalWords < 350) {
      wordStatus = 'Brief';
      wordColorClass = 'text-amber';
    } else if (analysis.totalWords > 1000) {
      wordStatus = 'Lengthy';
      wordColorClass = 'text-amber';
    }
    metricWordStatusEl.textContent = wordStatus;
    metricWordStatusEl.className = `metric-val ${wordColorClass}`;
    metricWordsSubEl.textContent = `${analysis.totalWords} words total`;

    // 3. Render Score Breakdown Rubric
    const b = analysis.breakdown;
    catScoreKeywordsEl.textContent = `${b.keywords.score} / ${b.keywords.max}`;
    catBarKeywordsEl.style.width = `${(b.keywords.score / b.keywords.max) * 100}%`;

    catScoreMetricsEl.textContent = `${b.metrics.score} / ${b.metrics.max}`;
    catBarMetricsEl.style.width = `${(b.metrics.score / b.metrics.max) * 100}%`;

    catScoreVerbsEl.textContent = `${b.verbs.score} / ${b.verbs.max}`;
    catBarVerbsEl.style.width = `${(b.verbs.score / b.verbs.max) * 100}%`;

    catScoreStructureEl.textContent = `${b.structure.score} / ${b.structure.max}`;
    catBarStructureEl.style.width = `${(b.structure.score / b.structure.max) * 100}%`;

    // 4. Render Keywords Intelligence & Chips
    renderKeywordChips(analysis.matchedKeywords, analysis.missingKeywords);
    matchedCountPillEl.textContent = analysis.matchedKeywords.length;
    missingCountPillEl.textContent = analysis.missingKeywords.length;

    // Power verbs list
    if (analysis.detectedActionVerbs.length > 0) {
      foundVerbsListEl.innerHTML = analysis.detectedActionVerbs.slice(0, 16).map(v =>
        `<span class="chip chip-verb">⚡ ${escapeHtml(v)}</span>`
      ).join('');
    } else {
      foundVerbsListEl.innerHTML = '<span class="chip-empty-note">No prominent action verbs detected.</span>';
    }

    // Flagged cliches list
    if (analysis.detectedCliches.length > 0) {
      flaggedClichesListEl.innerHTML = analysis.detectedCliches.map(c =>
        `<span class="chip chip-cliche">⚠️ "${escapeHtml(c)}"</span>`
      ).join('');
    } else {
      flaggedClichesListEl.innerHTML = '<span class="chip-empty-note">✓ None detected! Clean proactive phrasing.</span>';
    }

    // 5. Render ATS Checklist
    updateChecklist(analysis);

    // 6. Render Strengths & Improvements
    strengthsListEl.innerHTML = analysis.strengths.map(s =>
      `<li class="insight-list-item"><span class="insight-list-bullet">✓</span><span>${escapeHtml(s)}</span></li>`
    ).join('');

    improvementsListEl.innerHTML = analysis.improvements.map(i =>
      `<li class="insight-list-item"><span class="insight-list-bullet">!</span><span>${escapeHtml(i)}</span></li>`
    ).join('');

    // 7. Render Formatting Suggestions
    formattingTipsListEl.innerHTML = analysis.tips.map(tip => `
      <div class="tip-card">
        <div class="tip-card-header">
          <span class="tip-tag tip-tag-${tip.priority}">${tip.priority}</span>
          <span class="tip-title">${escapeHtml(tip.title)}</span>
        </div>
        <p class="tip-desc">${escapeHtml(tip.desc)}</p>
      </div>
    `).join('');
  }

  function renderKeywordChips(matched, missing) {
    if (matched.length > 0) {
      matchedKeywordsListEl.innerHTML = matched.map(kw =>
        `<span class="chip chip-matched">✓ ${escapeHtml(kw)}</span>`
      ).join('');
    } else {
      matchedKeywordsListEl.innerHTML = '<span class="chip-empty-note">No matching skills identified yet.</span>';
    }

    if (missing.length > 0) {
      missingKeywordsListEl.innerHTML = missing.map(kw =>
        `<span class="chip chip-missing">+ ${escapeHtml(kw)}</span>`
      ).join('');
    } else {
      missingKeywordsListEl.innerHTML = '<span class="chip-empty-note">🎉 No missing skills detected! 100% coverage.</span>';
    }
  }

  function updateChecklist(analysis) {
    const c = analysis.contactScoreDetails;
    const s = analysis.sections;

    // Contact info
    setChecklistItem(
      checkContactEl,
      c.hasEmail && c.hasPhone,
      c.hasEmail || c.hasPhone,
      c.hasEmail && c.hasPhone ? 'Complete' : (c.hasEmail ? 'Email only' : 'Missing info'),
      c.hasEmail && c.hasPhone ? 'Email and phone number detected.' : 'Ensure both professional email and phone number are present.'
    );

    // Online Profiles
    setChecklistItem(
      checkLinksEl,
      c.hasOnlineProfile,
      false,
      c.hasOnlineProfile ? 'Detected' : 'Missing',
      c.hasOnlineProfile ? 'GitHub, LinkedIn or portfolio link found.' : 'Add your LinkedIn or GitHub profile link for recruiters.'
    );

    // Experience Section
    setChecklistItem(
      checkExperienceEl,
      s.experience,
      false,
      s.experience ? 'Found' : 'Missing',
      s.experience ? 'Standard Experience / Work History heading present.' : 'Ensure an explicit "Experience" section header exists.'
    );

    // Education Section
    setChecklistItem(
      checkEducationEl,
      s.education,
      false,
      s.education ? 'Found' : 'Missing',
      s.education ? 'Standard Education header present.' : 'Ensure an explicit "Education" section header is included.'
    );

    // Skills Section
    setChecklistItem(
      checkSkillsEl,
      s.skills,
      false,
      s.skills ? 'Found' : 'Missing',
      s.skills ? 'Dedicated Skills section detected.' : 'Add a dedicated "Technical Skills" section for ATS parsers.'
    );

    // Projects Section
    setChecklistItem(
      checkProjectsEl,
      s.projects,
      false,
      s.projects ? 'Found' : 'Recommended',
      s.projects ? 'Projects or Portfolio section detected.' : 'Adding a Projects section showcases practical hands-on experience.'
    );

    // Quantifiable results
    setChecklistItem(
      checkQuantEl,
      analysis.allMetricsCount >= 3,
      analysis.allMetricsCount >= 1,
      analysis.allMetricsCount >= 3 ? 'Strong' : (analysis.allMetricsCount >= 1 ? 'Needs more' : 'None found'),
      `Detected ${analysis.allMetricsCount} measurable metrics (% or numbers).`
    );

    // Length
    const words = analysis.totalWords;
    const isOptimalLength = words >= 350 && words <= 1000;
    const isPassableLength = words >= 200 && words <= 1300;
    setChecklistItem(
      checkLengthEl,
      isOptimalLength,
      isPassableLength,
      isOptimalLength ? 'Optimal' : (words < 350 ? 'Too short' : 'Too long'),
      `${words} words (${isOptimalLength ? 'Recommended 1-2 pages' : 'Target 400 - 900 words'}).`
    );
  }

  function setChecklistItem(element, isPass, isWarn, badgeText, detailText) {
    element.classList.remove('pass', 'warn', 'fail');
    const badgeEl = element.querySelector('.check-badge');
    const detailEl = element.querySelector('.check-detail');
    const iconEl = element.querySelector('.check-status-icon');

    if (isPass) {
      element.classList.add('pass');
      badgeEl.textContent = badgeText;
      detailEl.textContent = detailText;
      iconEl.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>';
    } else if (isWarn) {
      element.classList.add('warn');
      badgeEl.textContent = badgeText;
      detailEl.textContent = detailText;
      iconEl.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
    } else {
      element.classList.add('fail');
      badgeEl.textContent = badgeText;
      detailEl.textContent = detailText;
      iconEl.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
    }
  }

  /* ===================================================================
     8. LOADING ANIMATION & RUN WORKFLOW
     =================================================================== */

  function startAnalysisFlow() {
    const resumeContent = resumeTextEl.value.trim();
    const jdContent = jdTextEl.value.trim();

    if (!resumeContent) {
      showToast('Please enter or upload your resume text to begin analysis.', 'warning');
      resumeTextEl.focus();
      return;
    }

    if (countWords(resumeContent) < 30) {
      showToast('Resume content is too short for a comprehensive audit (minimum 30 words).', 'warning');
      return;
    }

    // Switch views to animated scanning state
    stateEmptyEl.classList.remove('active');
    stateEmptyEl.classList.add('hidden');
    stateResultsEl.classList.remove('active');
    stateResultsEl.classList.add('hidden');
    stateLoadingEl.classList.remove('hidden');
    stateLoadingEl.classList.add('active');

    // Multi-step scanning steps simulation
    const steps = [
      { text: 'Parsing document structure & contact headers...', progress: '25%' },
      { text: 'Scanning for quantifiable impact metrics (% and $)...', progress: '50%' },
      { text: 'Evaluating power action verbs against passive clichés...', progress: '75%' },
      { text: 'Cross-referencing job competencies & generating rubric score...', progress: '100%' }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        loadingStatusEl.textContent = steps[currentStep].text;
        loadingProgressBarEl.style.width = steps[currentStep].progress;
      } else {
        clearInterval(interval);
        // Execute rule-based analysis
        const results = performAnalysis(resumeContent, jdContent);

        // Display results
        stateLoadingEl.classList.remove('active');
        stateLoadingEl.classList.add('hidden');
        stateResultsEl.classList.remove('hidden');
        stateResultsEl.classList.add('active');

        renderResults(results);
        showToast('Analysis completed successfully!', 'success');
      }
    }, 280);
  }

  /* ===================================================================
     9. EXPORT & COPY REPORT GENERATOR
     =================================================================== */

  function generatePlainTextReport(analysis) {
    if (!analysis) return '';

    const lines = [];
    lines.push('===============================================================');
    lines.push('RESUMEX — AI RESUME AUDIT & ATS ANALYSIS REPORT');
    lines.push(`Generated: ${new Date().toLocaleString()} (100% Client-Side Engine)`);
    lines.push('===============================================================\n');

    lines.push(`OVERALL SCORE: ${analysis.totalScore} / 100`);
    lines.push(`Job Description Match Rate: ${analysis.keywordMatchRate}%`);
    lines.push(`Total Word Count: ${analysis.totalWords} words`);
    lines.push(`Quantifiable Metrics Detected: ${analysis.allMetricsCount}`);
    lines.push(`Power Action Verbs Identified: ${analysis.detectedActionVerbs.length}\n`);

    lines.push('---------------------------------------------------------------');
    lines.push('SCORE BREAKDOWN (100 Point Rubric):');
    lines.push(`- Keyword & Skill Alignment: ${analysis.breakdown.keywords.score} / 25`);
    lines.push(`- Measurable Impact & Metrics: ${analysis.breakdown.metrics.score} / 25`);
    lines.push(`- Power Action Verbs Index: ${analysis.breakdown.verbs.score} / 25`);
    lines.push(`- ATS Structure & Sections: ${analysis.breakdown.structure.score} / 25\n`);

    lines.push('---------------------------------------------------------------');
    lines.push('SKILLS & KEYWORDS AUDIT:');
    lines.push(`Matched Skills (${analysis.matchedKeywords.length}):`);
    lines.push(analysis.matchedKeywords.length > 0 ? analysis.matchedKeywords.join(', ') : 'None');
    lines.push(`\nMissing Recommended Skills (${analysis.missingKeywords.length}):`);
    lines.push(analysis.missingKeywords.length > 0 ? analysis.missingKeywords.join(', ') : 'None');
    lines.push('');

    if (analysis.detectedActionVerbs.length > 0) {
      lines.push(`Detected Action Verbs: ${analysis.detectedActionVerbs.join(', ')}`);
    }
    if (analysis.detectedCliches.length > 0) {
      lines.push(`Flagged Cliché/Passive Phrasing: ${analysis.detectedCliches.join(', ')}`);
    }
    lines.push('');

    lines.push('---------------------------------------------------------------');
    lines.push('STANDOUT STRENGTHS:');
    analysis.strengths.forEach((s, idx) => {
      lines.push(`${idx + 1}. ${s}`);
    });
    lines.push('');

    lines.push('---------------------------------------------------------------');
    lines.push('PRIORITY IMPROVEMENTS:');
    analysis.improvements.forEach((imp, idx) => {
      lines.push(`${idx + 1}. ${imp}`);
    });
    lines.push('');

    lines.push('---------------------------------------------------------------');
    lines.push('ACTION PLAN & FORMATTING SUGGESTIONS:');
    analysis.tips.forEach(t => {
      lines.push(`[${t.priority.toUpperCase()}] ${t.title}: ${t.desc}`);
    });
    lines.push('\n===============================================================');
    lines.push('Report generated by ResumeX — Transparent Client-Side Heuristics.');
    lines.push('===============================================================');

    return lines.join('\n');
  }

  function handleCopyReport() {
    if (!latestAnalysisReport) {
      showToast('Please run an analysis first.', 'warning');
      return;
    }

    const reportText = generatePlainTextReport(latestAnalysisReport);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(reportText).then(() => {
        showToast('Analysis report copied to clipboard!', 'success');
      }).catch(() => {
        fallbackCopyText(reportText);
      });
    } else {
      fallbackCopyText(reportText);
    }
  }

  function fallbackCopyText(text) {
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = text;
    tempTextArea.style.position = 'fixed';
    tempTextArea.style.left = '-9999px';
    document.body.appendChild(tempTextArea);
    tempTextArea.focus();
    tempTextArea.select();
    try {
      document.execCommand('copy');
      showToast('Analysis report copied to clipboard!', 'success');
    } catch (e) {
      showToast('Could not auto-copy. Please check permissions.', 'error');
    }
    document.body.removeChild(tempTextArea);
  }

  function handleDownloadReport() {
    if (!latestAnalysisReport) {
      showToast('Please run an analysis first.', 'warning');
      return;
    }

    const reportText = generatePlainTextReport(latestAnalysisReport);
    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ResumeX_Audit_Report_${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Report downloaded as TXT file.', 'success');
  }

  /* ===================================================================
     10. FILE UPLOADER & DRAG-AND-DROP
     =================================================================== */

  function handleFileUpload(file) {
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.txt') && file.type !== 'text/plain') {
      showToast('Please upload a plain text (.txt) file.', 'error');
      return;
    }

    // Maximum 2MB text limit
    if (file.size > 2 * 1024 * 1024) {
      showToast('File size exceeds 2MB limit.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const content = e.target.result;
      resumeTextEl.value = content;
      filenameEl.textContent = file.name;
      fileIndicatorEl.classList.remove('hidden');
      updateTextCounters();
      showToast(`Loaded ${file.name} successfully!`, 'success');
    };
    reader.onerror = function () {
      showToast('Error reading file. Please try again.', 'error');
    };
    reader.readAsText(file);
  }

  /* ===================================================================
     11. EVENT LISTENERS & SETUP
     =================================================================== */

  function setupEventListeners() {
    // Textarea input monitoring
    resumeTextEl.addEventListener('input', updateTextCounters);
    jdTextEl.addEventListener('input', updateTextCounters);

    // Primary Analyze Button
    analyzeBtn.addEventListener('click', startAnalysisFlow);

    // Quick Demo button in empty state
    quickDemoBtn.addEventListener('click', () => {
      loadSamplePreset('fullstack');
      startAnalysisFlow();
    });

    // File Input change
    fileInputEl.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handleFileUpload(e.target.files[0]);
      }
    });

    // Drag and Drop support
    ['dragenter', 'dragover'].forEach(eventName => {
      dropZoneEl.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZoneEl.classList.add('dragover');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropZoneEl.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZoneEl.classList.remove('dragover');
      }, false);
    });

    dropZoneEl.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      if (dt && dt.files && dt.files[0]) {
        handleFileUpload(dt.files[0]);
      }
    });

    // Clear buttons
    clearResumeBtn.addEventListener('click', () => {
      resumeTextEl.value = '';
      fileIndicatorEl.classList.add('hidden');
      fileInputEl.value = '';
      updateTextCounters();
      showToast('Resume cleared.', 'info');
    });

    clearJdBtn.addEventListener('click', () => {
      jdTextEl.value = '';
      updateTextCounters();
      showToast('Job description cleared.', 'info');
    });

    // Reset All button
    resetBtn.addEventListener('click', () => {
      resumeTextEl.value = '';
      jdTextEl.value = '';
      fileIndicatorEl.classList.add('hidden');
      fileInputEl.value = '';
      updateTextCounters();

      stateResultsEl.classList.remove('active');
      stateResultsEl.classList.add('hidden');
      stateLoadingEl.classList.remove('active');
      stateLoadingEl.classList.add('hidden');
      stateEmptyEl.classList.remove('hidden');
      stateEmptyEl.classList.add('active');

      latestAnalysisReport = null;
      showToast('All fields and results reset.', 'info');
    });

    // Export toolbar buttons
    copyReportBtn.addEventListener('click', handleCopyReport);
    downloadReportBtn.addEventListener('click', handleDownloadReport);

    // Sample dropdown trigger
    sampleDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sampleDropdownBtn.parentElement.classList.toggle('open');
      const expanded = sampleDropdownBtn.getAttribute('aria-expanded') === 'true';
      sampleDropdownBtn.setAttribute('aria-expanded', !expanded);
    });

    // Sample dropdown items
    const sampleItems = sampleDropdownMenu.querySelectorAll('.dropdown-item');
    sampleItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const presetKey = item.getAttribute('data-sample');
        loadSamplePreset(presetKey);
        sampleDropdownBtn.parentElement.classList.remove('open');
        sampleDropdownBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close dropdown on outside click
    document.addEventListener('click', () => {
      sampleDropdownBtn.parentElement.classList.remove('open');
      sampleDropdownBtn.setAttribute('aria-expanded', 'false');
    });

    // Keywords tab filters
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.getAttribute('data-filter');
        const matchedSubcard = document.querySelector('.matched-subcard');
        const missingSubcard = document.querySelector('.missing-subcard');

        if (filter === 'all') {
          matchedSubcard.style.display = 'flex';
          missingSubcard.style.display = 'flex';
        } else if (filter === 'matched') {
          matchedSubcard.style.display = 'flex';
          missingSubcard.style.display = 'none';
        } else if (filter === 'missing') {
          matchedSubcard.style.display = 'none';
          missingSubcard.style.display = 'flex';
        }
      });
    });
  }

  function loadSamplePreset(key) {
    const preset = SAMPLE_PRESETS[key];
    if (!preset) return;

    resumeTextEl.value = preset.resume;
    jdTextEl.value = preset.jd;
    fileIndicatorEl.classList.remove('hidden');
    filenameEl.textContent = `${key}-demo.txt`;
    updateTextCounters();
    showToast(`Loaded "${preset.name}" preset!`, 'success');
  }

  // Initialize
  function init() {
    setupEventListeners();
    updateTextCounters();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
