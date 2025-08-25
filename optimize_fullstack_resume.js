const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function createOptimizedResume() {
  const doc = new PDFDocument({
    size: 'A4',
    margins: {
      top: 40,
      bottom: 40,
      left: 50,
      right: 50
    }
  });

  const outputPath = path.join(__dirname, 'public', 'FullStack.pdf');
  doc.pipe(fs.createWriteStream(outputPath));

  let yPos = 40;

  // Header - Name and Contact (more compact)
  doc.fontSize(22)
     .fillColor('#2c3e50')
     .text('Avazxon Asqarov', 50, yPos);
  
  yPos += 25;
  doc.fontSize(9)
     .fillColor('#34495e')
     .text('■ Tashkent, Uzbekistan  ■ asqarovavazxon77@gmail.com  ■ +998 99 299 69 37', 50, yPos);
  
  yPos += 12;
  doc.text('■ GitHub: github.com/AvazxonAD  ■ Upwork: upwork.com/freelancers/~0162399b5c954b5083', 50, yPos);

  yPos += 25;

  // Professional Summary (compact)
  doc.fontSize(13)
     .fillColor('#2c3e50')
     .text('Professional Summary', 50, yPos);
  
  yPos += 15;
  doc.fontSize(9)
     .fillColor('#34495e')
     .text('Full Stack Developer specializing in Node.js (Backend) and React (Frontend) with 2+ years of professional experience. Skilled in building scalable APIs, designing efficient relational & NoSQL database structures, and developing modern, responsive web applications. Proven ability to deliver secure, high-performance solutions for complex projects. Strong problem-solving skills and experienced in remote collaboration with international clients.', 50, yPos, { 
       width: 495, 
       lineGap: 2 
     });

  yPos += 50;

  // Core Skills (two columns to save space)
  doc.fontSize(13)
     .fillColor('#2c3e50')
     .text('Core Skills', 50, yPos);
  
  yPos += 15;
  doc.fontSize(9)
     .fillColor('#34495e');

  const leftColumnSkills = [
    '• Backend Development: Node.js, Express.js, REST API, WebSockets',
    '• Frontend Development: React.js, JavaScript (ES6+), HTML5, CSS3, TailwindCSS',
    '• Databases: PostgreSQL, MySQL, MongoDB, MS SQL, Database Design & Optimization',
    '• System Design: Clean Architecture, Microservices, Redis, Message Queues'
  ];

  const rightColumnSkills = [
    '• DevOps & Tools: Docker, Git, Linux, CI/CD pipelines',
    '• Testing & Security: Unit Testing, JWT Authentication, OAuth2, API Security',
    '• Other: Agile/Scrum, Remote Work Collaboration, Problem-Solving'
  ];

  // Left column
  let leftYPos = yPos;
  leftColumnSkills.forEach(skill => {
    doc.text(skill, 50, leftYPos, { width: 240, lineGap: 1 });
    leftYPos += 11;
  });

  // Right column
  let rightYPos = yPos;
  rightColumnSkills.forEach(skill => {
    doc.text(skill, 305, rightYPos, { width: 240, lineGap: 1 });
    rightYPos += 11;
  });

  yPos = Math.max(leftYPos, rightYPos) + 15;

  // Work Experience (more compact)
  doc.fontSize(13)
     .fillColor('#2c3e50')
     .text('Work Experience', 50, yPos);
  
  yPos += 20;

  // Smart Base (compact formatting)
  doc.fontSize(11)
     .fillColor('#2c3e50')
     .text('Smart Base – Full Stack Developer (Node.js + React)', 50, yPos);
  
  yPos += 12;
  doc.fontSize(9)
     .fillColor('#7f8c8d')
     .text('Jan 2023 – Present | Tashkent, Uzbekistan', 50, yPos);

  yPos += 12;
  doc.fillColor('#34495e')
     .text('- Developed and maintained secure backend services using Node.js and Express.js.', 50, yPos);
  yPos += 10;
  doc.text('- Designed scalable REST APIs integrated with PostgreSQL and MongoDB databases.', 50, yPos);
  yPos += 10;
  doc.text('- Implemented authentication & authorization systems (JWT, role-based access).', 50, yPos);
  yPos += 10;
  doc.text('- Built modern web interfaces with React.js, ensuring responsive and user-friendly design.', 50, yPos);
  yPos += 10;
  doc.text('- Collaborated with designers and backend engineers to deliver complete full-stack solutions.', 50, yPos);
  yPos += 10;
  doc.text('- Applied Clean Architecture principles for maintainable and scalable projects.', 50, yPos);

  yPos += 18;

  // Fizmasoft (compact formatting)
  doc.fontSize(11)
     .fillColor('#2c3e50')
     .text('Fizmasoft – Full Stack Developer (Node.js + React)', 50, yPos);
  
  yPos += 12;
  doc.fontSize(9)
     .fillColor('#7f8c8d')
     .text('Jan 2022 – Present | Tashkent, Uzbekistan', 50, yPos);

  yPos += 12;
  doc.fillColor('#34495e')
     .text('- Built and deployed full-stack web applications using Node.js and React.', 50, yPos);
  yPos += 10;
  doc.text('- Worked with relational and NoSQL databases (PostgreSQL, MongoDB).', 50, yPos);
  yPos += 10;
  doc.text('- Integrated third-party APIs and payment systems into backend services.', 50, yPos);
  yPos += 10;
  doc.text('- Collaborated with a small team to deliver client-focused software solutions.', 50, yPos);
  yPos += 10;
  doc.text('- Enhanced performance and scalability of existing projects.', 50, yPos);

  yPos += 20;

  // Languages and Additional Information (in two columns)
  doc.fontSize(13)
     .fillColor('#2c3e50')
     .text('Languages', 50, yPos);

  doc.text('Additional Information', 280, yPos);
  
  yPos += 15;
  doc.fontSize(9)
     .fillColor('#34495e');

  // Languages (left column)
  doc.text('• Uzbek – Native', 50, yPos);
  doc.text('• English – Intermediate (B1)', 50, yPos + 10);

  // Additional Information (right column)
  doc.text('• Open to remote full-time roles', 280, yPos);
  doc.text('• Available on Upwork / international projects', 280, yPos + 10);
  doc.text('• Strong adaptability and independent work skills', 280, yPos + 20);

  doc.end();

  console.log('Optimized FullStack resume created successfully at:', outputPath);
}

createOptimizedResume();