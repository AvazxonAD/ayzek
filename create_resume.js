const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function createResume() {
  const doc = new PDFDocument({
    size: 'A4',
    margins: {
      top: 50,
      bottom: 50,
      left: 50,
      right: 50
    }
  });

  const outputPath = path.join(__dirname, 'public', 'resume.pdf');
  
  // Ensure public directory exists
  const publicDir = path.join(__dirname, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  doc.pipe(fs.createWriteStream(outputPath));

  // Header - Name and Title
  doc.fontSize(24)
     .fillColor('#2c3e50')
     .text('Avazxon Asqarov', 50, 50);
  
  doc.fontSize(16)
     .fillColor('#7f8c8d')
     .text('Full Stack Developer (Node.js + React)', 50, 80);

  // Contact Information
  doc.fontSize(10)
     .fillColor('#34495e')
     .text('📍 Tashkent, Uzbekistan | 📧 asqarovavazxon77@gmail.com | 📱 +998 99 299 69 37', 50, 105);
  
  doc.text('🔗 GitHub: github.com/AvazxonAD | 💼 Upwork: upwork.com/freelancers/~0162399b5c954b5083', 50, 120);

  // Line separator
  doc.strokeColor('#bdc3c7')
     .lineWidth(1)
     .moveTo(50, 140)
     .lineTo(545, 140)
     .stroke();

  let yPos = 160;

  // Professional Summary
  doc.fontSize(14)
     .fillColor('#2c3e50')
     .text('Professional Summary', 50, yPos);
  
  yPos += 20;
  doc.fontSize(10)
     .fillColor('#34495e')
     .text('Full Stack Developer specializing in Node.js (Backend) and React (Frontend) with 2+ years of professional', 50, yPos, { width: 495, lineGap: 3 });
  yPos += 15;
  doc.text('experience. Skilled in building scalable APIs, designing efficient database structures, and developing modern', 50, yPos, { width: 495, lineGap: 3 });
  yPos += 15;
  doc.text('web applications. Proven ability to deliver secure, high-performance solutions and experienced in remote', 50, yPos, { width: 495, lineGap: 3 });
  yPos += 15;
  doc.text('collaboration with international clients.', 50, yPos, { width: 495, lineGap: 3 });

  yPos += 30;

  // Core Skills
  doc.fontSize(14)
     .fillColor('#2c3e50')
     .text('Core Skills', 50, yPos);
  
  yPos += 20;
  doc.fontSize(10)
     .fillColor('#34495e');

  const skills = [
    'Backend: Node.js, Express.js, REST API, WebSockets',
    'Frontend: React.js, JavaScript (ES6+), HTML5, CSS3, TailwindCSS',
    'Databases: PostgreSQL, MySQL, MongoDB, MS SQL, Database Design & Optimization',
    'System Design: Clean Architecture, Microservices, Redis, Message Queues',
    'DevOps & Tools: Docker, Git, Linux, CI/CD pipelines',
    'Security & Testing: JWT Authentication, OAuth2, API Security, Unit Testing',
    'Other: Agile/Scrum, Remote Work Collaboration, Problem-Solving'
  ];

  skills.forEach(skill => {
    doc.text(`• ${skill}`, 50, yPos, { width: 495, lineGap: 2 });
    yPos += 12;
  });

  yPos += 15;

  // Work Experience
  doc.fontSize(14)
     .fillColor('#2c3e50')
     .text('Work Experience', 50, yPos);
  
  yPos += 25;

  // Smart Base
  doc.fontSize(12)
     .fillColor('#2c3e50')
     .text('Smart Base – Full Stack Developer (Node.js + React)', 50, yPos);
  
  yPos += 15;
  doc.fontSize(10)
     .fillColor('#7f8c8d')
     .text('Jan 2023 – Present | Tashkent, Uzbekistan', 50, yPos);

  yPos += 18;
  doc.fillColor('#34495e');
  const smartBasePoints = [
    'Developed secure backend services using Node.js and Express.js with PostgreSQL and MongoDB',
    'Designed scalable REST APIs and implemented JWT/role-based authentication systems',
    'Built responsive React.js interfaces and collaborated on complete full-stack solutions',
    'Applied Clean Architecture principles for maintainable and scalable projects'
  ];

  smartBasePoints.forEach(point => {
    doc.text(`• ${point}`, 50, yPos, { width: 495, lineGap: 2 });
    yPos += 12;
  });

  yPos += 15;

  // Fizmasoft
  doc.fontSize(12)
     .fillColor('#2c3e50')
     .text('Fizmasoft – Full Stack Developer (Node.js + React)', 50, yPos);
  
  yPos += 15;
  doc.fontSize(10)
     .fillColor('#7f8c8d')
     .text('Jan 2022 – Present | Tashkent, Uzbekistan', 50, yPos);

  yPos += 18;
  doc.fillColor('#34495e');
  const fizmasoftPoints = [
    'Built and deployed full-stack web applications using Node.js and React',
    'Integrated third-party APIs and payment systems into backend services',
    'Enhanced performance and scalability of existing projects',
    'Collaborated with small teams to deliver client-focused software solutions'
  ];

  fizmasoftPoints.forEach(point => {
    doc.text(`• ${point}`, 50, yPos, { width: 495, lineGap: 2 });
    yPos += 12;
  });

  yPos += 20;

  // Languages & Additional Information
  doc.fontSize(14)
     .fillColor('#2c3e50')
     .text('Languages & Additional Information', 50, yPos);
  
  yPos += 20;
  doc.fontSize(10)
     .fillColor('#34495e')
     .text('Languages: Uzbek (Native), English (Intermediate B1)', 50, yPos);
  
  yPos += 12;
  doc.text('Availability: Open to remote full-time roles, Available for international projects via Upwork', 50, yPos);
  
  yPos += 12;
  doc.text('Work Style: Strong adaptability and independent work skills', 50, yPos);

  doc.end();

  console.log('Resume PDF created successfully at:', outputPath);
}

createResume();