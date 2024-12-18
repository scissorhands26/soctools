User Types:
Will we have students, instructors, and administrators?
Are there other specialized roles (e.g., guest lecturers, teaching assistants, content creators, system auditors)?
No, the students, instructors and admins are the only user types.

Authentication and Authorization:
How will users log in? Email and password, or will we integrate third-party auth providers (e.g., SSO, OAuth)?
They will login with email and password.
Will instructors and admins have privileges to create and manage courses, modules, lessons, etc.?
The instructors will have permissions over their own courses and modules. The admins will have permissions over everything.
Will students have restricted permissions (e.g., read-only access to course content, submit quizzes, participate in discussions)?
Yes, students will have restricted permissions. They will only be able to access the courses and modules they are enrolled in, but they will be able to self enroll. They will also be able to access the discussions and forums.

User Profiles:
What information will we store about each user? (Name, email, profile picture, bio, enrollment history)
That looks like a good starting point. I also want to add a field for the user's role. I would also like to gameify the platform. I am insired by runescape to add a leveling system. They should have a series of skills that they can level up. Ask me more here if you need before creating the collection (we should have a discussion about this).
Will we track user status (active, inactive, suspended)?
Yeah, we will track the user's status.

Course Structure:
Will a course be composed of multiple modules, and each module composed of multiple lessons?
A course will have a topic, say "Host Analysis". It will have a series of modules (like identifying malicious command line arguments, identifying malicious files, etc.). Each module could have 1 or more lesson. The lesson will serve as the "content of the module".
Are there prerequisites for certain modules or courses?
No, there are no prerequisites for the courses or modules.

Content Types:
Lessons: text, video, interactive labs, external tool links, etc.
Will we have downloadable resources associated with lessons (like PDFs, code samples)?
Yes. The lessons will be rich text.
Will we integrate with external lab environments (e.g., cybersecurity practice labs)?
Potentially in the future. Set it up so that we can integrate with external lab environments.

Course Lifecycle:
How are courses created, published, updated, and retired?
The courses will be created by the admins. They will be published by the admins. They will be updated by the admins. They will be retired by the admins.
Will courses have start/end dates or will they be self-paced and available indefinitely?
The courses will be self-paced and available indefinitely.
Assessments and Certification
Each module will have a quiz.

Quizzes and Exams:
Will each module have quizzes? Are there final exams?
There are no exams at this time. Just the quiz for each module.
What question types do we need (multiple choice, true/false, short answer, code challenges)?
The questions will be multiple choice, true/false, fill in the blank, short answer, and code challenges.
Will we store all students’ submissions and grades?
Yes.

Scoring and Feedback:
How are quiz/exam scores calculated?
The quiz/exam scores will be calculated based on the number of correct answers.
Will students get immediate feedback or only after instructor review?
Students will get immediate feedback.
Are there retry attempts?
Yes, there are retry attempts.

Completion and Certification:
Do students earn certificates or badges upon completing a course or passing a final exam?
The students will earn a badge for completing a module, which will be worth xp in the skill tree. So if the module is about windows processes, the student will earn xp in the "windows" skill.
Will completion be tracked at lesson level, module level, or course level?
Completion will be tracked at the module level.

Enrollment:
Will students self-enroll or do instructors/admins enroll them?
The students will self-enroll.
Are there enrollment caps, waitlists, or payment integrations?
There are no enrollment caps, waitlists, or payment integrations.

Progress Tracking:
Do we track which lessons a user has accessed/completed?
Yes, we will track which lessons a user has accessed/completed.
Will we record the time spent on each lesson or module?
Yes, we will record the time spent on each lesson or module.
Do we need a progress dashboard for students and instructors?
Yes, we need a progress dashboard for students and instructors.

Completion Criteria:
Is completion determined by finishing all lessons, passing a certain quiz score threshold, or both?
Completion will be determined by finishing all lessons, passing a certain quiz score threshold, or both.

Discussions and Forums:
Will there be discussion threads per course/module/lesson?
Yes, there will be discussion threads per module.
Can users post, reply, and like/upvote content?
Yes, users can post, reply, and like/upvote content.
Will discussion be moderated by instructors?
Yes, discussion will be moderated by instructors.

Messaging:
Will there be direct messaging between students and instructors?
No, there will not be direct messaging between students and instructors.

Analytics and Reporting:
Do we need analytics dashboards (e.g., how many users completed a course, average quiz scores, student engagement)?
Yes, we need analytics dashboards.
Should we log every user action for auditing and analytics?
Yes, we should log every user action for auditing and analytics.

File Uploads:
Will instructors upload media files, and will students also upload assignments or projects?
Yes, the instructors may upload media files for the modules, like a demo pcap for the students to download, etc.

External Integrations:
Will the LMS integrate with external tools like a cybersecurity sandbox environment (e.g., Hack The Box labs), or third-party video hosting?
Not at this time.
Will we integrate with third-party payment systems if courses are paid?
No, there are no paid courses at this time.

Versioning and Drafts:
Will we keep versions of lessons and quizzes to revert if needed?
No, we will not keep versions of lessons and quizzes to revert if needed.
Do we need a content approval workflow (e.g., draft → review → publish)?
No, we do not need a content approval workflow.

Number of Users and Data Volume:
Will this LMS serve a large number of concurrent users?
No, this LMS will not serve a large number of concurrent users.
Do we need caching, CDNs for videos, or load balancing?
No, we do not need caching, CDNs for videos, or load balancing.
