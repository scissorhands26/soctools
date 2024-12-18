import path from 'path'
import sharp from 'sharp'

import { fileURLToPath } from 'url'

import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { postgresAdapter } from '@payloadcms/db-postgres' // Updated to Postgres adapter
import { lexicalEditor } from '@payloadcms/richtext-lexical' // Using Lexical editor
import { buildConfig } from 'payload'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Tools } from './collections/Tools'
import { Courses } from './collections/Courses'
import { Topics } from './collections/Topics'
import { Modules } from './collections/Modules'
import { Lessons } from './collections/Lessons'
import { Quizzes } from './collections/Quizzes'
import { Questions } from './collections/Questions'
import { Answers } from './collections/Answers'
import { Submissions } from './collections/Submissions'
import { SubmissionAnswers } from './collections/SubmissionAnswers'
import { Enrollments } from './collections/Enrollments'
import { Progress } from './collections/Progress'
import { Skills } from './collections/Skills'
import { UserSkills } from './collections/UserSkills'
import { Badges } from './collections/Badges'
import { UserBadges } from './collections/UserBadges'
import { Achievements } from './collections/Achievements'
import { UserAchievements } from './collections/UserAchievements'
import { DiscussionThreads } from './collections/DiscussionThreads'
import { DiscussionPosts } from './collections/DiscussionPosts'
import { ActivityLogs } from './collections/ActivityLogs'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Media,
    Tools,
    Courses,
    Topics,
    Modules,
    Lessons,
    Quizzes,
    Questions,
    Answers,
    Submissions,
    SubmissionAnswers,
    Enrollments,
    Progress,
    Skills,
    UserSkills,
    Badges,
    UserBadges,
    Achievements,
    UserAchievements,
    DiscussionThreads,
    DiscussionPosts,
    ActivityLogs,
  ],
  editor: lexicalEditor({}),
  plugins: [payloadCloudPlugin()],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
})
