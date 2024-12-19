import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Trophy, ArrowLeft, FileText, Video, Code, Link as LinkIcon } from 'lucide-react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Course, Module, Lesson } from '@/payload-types'

interface Props {
  params: Promise<{
    courseSlug: string
    moduleSlug: string
  }>
}

export default async function ModulePage({ params }: Props) {
  const { courseSlug, moduleSlug } = await params
  const payload = await getPayload({ config: configPromise })

  // Find the course
  const { docs: courses } = await payload.find({
    collection: 'courses',
    where: {
      slug: {
        equals: courseSlug,
      },
      status: {
        equals: 'published',
      },
    },
  })

  if (courses.length === 0) {
    notFound()
  }

  const course = courses[0]

  // Find the module
  const { docs: modules } = await payload.find({
    collection: 'modules',
    where: {
      AND: [
        {
          course: {
            equals: course.id,
          },
        },
        {
          slug: {
            equals: moduleSlug,
          },
        },
      ],
    },
    depth: 1, // To get skill details
  })

  if (modules.length === 0) {
    notFound()
  }

  const courseModule = modules[0]

  // Get lessons for this module
  const { docs: lessons } = await payload.find({
    collection: 'lessons',
    where: {
      module: {
        equals: courseModule.id,
      },
    },
    sort: 'orderIndex',
  })

  // Calculate total XP for this module
  const totalXP = courseModule.skillsXP?.reduce((total, skillXP) => total + skillXP.xp, 0) || 0

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        {/* Module Header */}
        <section className="bg-black py-12 md:py-24">
          <div className="container">
            <div className="flex flex-col space-y-8">
              {/* Back to Course Link */}
              <Link
                href={`/training/course/${course.slug}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to {course.courseTitle}
              </Link>

              {/* Module Info */}
              <div className="flex flex-col items-start space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                  {courseModule.moduleTitle}
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {courseModule.moduleDescription?.root?.children?.[0]?.text ||
                    'No description available'}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{lessons.length} Lessons</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Trophy className="h-4 w-4" />
                    <span>{totalXP} XP Available</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {courseModule.skillsXP?.map((skillXP) => (
                    <Badge key={skillXP.id} variant="secondary">
                      {typeof skillXP.skill === 'object' ? skillXP.skill.name : ''} +{skillXP.xp}XP
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Module Content */}
        <section className="py-12 md:py-24">
          <div className="container">
            <div className="grid gap-6">
              <h2 className="text-3xl font-bold tracking-tighter">Lessons</h2>

              {/* Lesson List */}
              <div className="grid gap-4">
                {lessons.map((lesson, index) => (
                  <Card key={lesson.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            {lesson.lessonType === 'video' && <Video className="h-4 w-4" />}
                            {lesson.lessonType === 'text' && <FileText className="h-4 w-4" />}
                            {lesson.lessonType === 'interactive' && <Code className="h-4 w-4" />}
                            {lesson.lessonType === 'lab' && <Code className="h-4 w-4" />}
                            <CardTitle>
                              Lesson {index + 1}: {lesson.lessonTitle}
                            </CardTitle>
                          </div>
                        </div>
                        <Badge variant="outline">{lesson.lessonType}</Badge>
                      </div>
                    </CardHeader>
                    {lesson.resources && lesson.resources.length > 0 && (
                      <CardContent>
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Resources</h4>
                          <div className="flex flex-wrap gap-2">
                            {lesson.resources.map((resource, resourceIndex) => (
                              <Link
                                key={resourceIndex}
                                href={resource.resourceURL || '#'}
                                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <LinkIcon className="h-3 w-3" />
                                {resource.resourceTitle}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    )}
                    <CardFooter>
                      <Link
                        href={`/training/course/${course.slug}/module/${courseModule.slug}/lesson/${lesson.slug}`}
                        className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      >
                        Start Lesson
                      </Link>
                    </CardFooter>
                  </Card>
                ))}

                {lessons.length === 0 && (
                  <Card>
                    <CardHeader>
                      <CardDescription>No lessons available for this module yet.</CardDescription>
                    </CardHeader>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
