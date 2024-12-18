import React from 'react'
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
import { ArrowLeft, FileText, Video, Code, Link as LinkIcon, Download } from 'lucide-react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Course, Module, Lesson } from '@/payload-types'

interface Props {
  params: Promise<{
    courseSlug: string
    moduleSlug: string
    lessonSlug: string
  }>
}

interface RichTextNode {
  type: string
  tag?: string
  format?: string
  indent?: number
  version?: number
  children?: RichTextChild[]
  direction?: string
  textStyle?: string
  textFormat?: number
}

interface RichTextChild {
  mode?: string
  text?: string
  type: string
  style?: string
  detail?: number
  format?: number
  version?: number
}

const RichTextBlock: React.FC<{ node: RichTextNode }> = ({ node }) => {
  if (node.type === 'heading' && node.tag === 'h2') {
    return (
      <h2 className="text-2xl font-bold mb-4">
        {node.children?.map((child, index) => <RichTextChild key={index} node={child} />)}
      </h2>
    )
  }

  if (node.type === 'paragraph') {
    return (
      <p className="mb-4">
        {node.children?.map((child, index) => <RichTextChild key={index} node={child} />)}
      </p>
    )
  }

  // Default fallback for unknown block types
  return (
    <div className="mb-4">
      {node.children?.map((child, index) => <RichTextChild key={index} node={child} />)}
    </div>
  )
}

const RichTextChild: React.FC<{ node: RichTextChild }> = ({ node }) => {
  if (node.type === 'text') {
    return <>{node.text}</>
  }

  // Default fallback for unknown child types
  return null
}

export default async function LessonPage({ params }: Props) {
  const { courseSlug, moduleSlug, lessonSlug } = await params
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
  })

  if (modules.length === 0) {
    notFound()
  }

  const module = modules[0]

  // Get the lesson
  const { docs: lessons } = await payload.find({
    collection: 'lessons',
    where: {
      AND: [
        {
          module: {
            equals: module.id,
          },
        },
        {
          slug: {
            equals: lessonSlug,
          },
        },
      ],
    },
    depth: 1, // To get media file details
  })

  if (lessons.length === 0) {
    notFound()
  }

  const lesson = lessons[0]

  // Get next lesson if available
  const { docs: nextLessons } = await payload.find({
    collection: 'lessons',
    where: {
      AND: [
        {
          module: {
            equals: module.id,
          },
        },
        {
          orderIndex: {
            greater_than: lesson.orderIndex,
          },
        },
      ],
    },
    sort: 'orderIndex',
    limit: 1,
  })

  const nextLesson = nextLessons[0]

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        {/* Lesson Header */}
        <section className="bg-black py-12 md:py-24">
          <div className="container">
            <div className="flex flex-col space-y-8">
              {/* Back to Module Link */}
              <Link
                href={`/training/course/${course.slug}/module/${module.slug}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to {module.moduleTitle}
              </Link>

              {/* Lesson Info */}
              <div className="flex flex-col items-start space-y-4">
                <div className="flex items-center gap-2">
                  {lesson.lessonType === 'video' && <Video className="h-5 w-5" />}
                  {lesson.lessonType === 'text' && <FileText className="h-5 w-5" />}
                  {lesson.lessonType === 'interactive' && <Code className="h-5 w-5" />}
                  {lesson.lessonType === 'lab' && <Code className="h-5 w-5" />}
                  <Badge variant="outline">{lesson.lessonType}</Badge>
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                  {lesson.lessonTitle}
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* Lesson Content */}
        <section className="py-12 md:py-24">
          <div className="container">
            <div className="grid gap-8">
              {/* Main Content */}
              <Card>
                <CardContent className="pt-6">
                  <div className="prose prose-neutral dark:prose-invert max-w-none">
                    {lesson.lessonContent?.root?.children?.map((block, index) => (
                      <RichTextBlock key={index} node={block as RichTextNode} />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Resources */}
              {lesson.resources && lesson.resources.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {lesson.resources.map((resource, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {resource.resourceType === 'pdf' && <FileText className="h-4 w-4" />}
                            {resource.resourceType === 'link' && <LinkIcon className="h-4 w-4" />}
                            {resource.resourceType === 'document' && (
                              <FileText className="h-4 w-4" />
                            )}
                            {resource.resourceType === 'tool' && <Code className="h-4 w-4" />}
                            {resource.resourceType === 'code_sample' && (
                              <Code className="h-4 w-4" />
                            )}
                            <span className="font-medium">{resource.resourceTitle}</span>
                          </div>
                          {resource.resourceFile ? (
                            <Link
                              href={
                                typeof resource.resourceFile === 'object'
                                  ? resource.resourceFile.url || '#'
                                  : '#'
                              }
                              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Download className="h-4 w-4" />
                              Download
                            </Link>
                          ) : (
                            <Link
                              href={resource.resourceURL || '#'}
                              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <LinkIcon className="h-4 w-4" />
                              Open
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Navigation */}
              <div className="flex justify-between">
                <Link
                  href={`/training/course/${course.slug}/module/${module.slug}`}
                  className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground"
                >
                  Back to Module
                </Link>
                {nextLesson ? (
                  <Link
                    href={`/training/course/${course.slug}/module/${module.slug}/lesson/${nextLesson.slug}`}
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Next Lesson
                  </Link>
                ) : (
                  <Link
                    href={`/training/course/${course.slug}/module/${module.slug}`}
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Complete Module
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
