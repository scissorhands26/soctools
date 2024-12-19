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
import { BookOpen, Trophy, Clock } from 'lucide-react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Course, Module } from '@/payload-types'

interface Props {
  params: Promise<{
    courseSlug: string
  }>
}

export default async function CoursePage({ params }: Props) {
  const { courseSlug } = await params
  const payload = await getPayload({ config: configPromise })

  // Find the course by slug
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
    depth: 1, // To get instructor details
  })

  if (courses.length === 0) {
    notFound()
  }

  const course = courses[0]

  // Get modules for this course
  const { docs: modules } = await payload.find({
    collection: 'modules',
    where: {
      course: {
        equals: course.id,
      },
    },
    sort: 'orderIndex',
    depth: 1, // To get skill details
  })

  // Calculate total XP available in the course
  const totalXP = modules.reduce((total, module) => {
    return total + (module.skillsXP?.reduce((moduleTotal, skill) => moduleTotal + skill.xp, 0) || 0)
  }, 0)

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        {/* Course Header */}
        <section className="bg-black py-12 md:py-24">
          <div className="container">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <Badge variant="outline" className="text-primary">
                {course.courseLevel || 'All Levels'}
              </Badge>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                {course.courseTitle}
              </h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {(course.courseDescription?.root?.children?.[0]?.text as string) ||
                  'No description available'}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{modules.length} Modules</span>
                </div>
                <div className="flex items-center gap-1">
                  <Trophy className="h-4 w-4" />
                  <span>{totalXP} XP Available</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Self-paced</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Course Content */}
        <section className="py-12 md:py-24">
          <div className="container">
            <div className="grid gap-6">
              <h2 className="text-3xl font-bold tracking-tighter">Course Content</h2>

              {/* Module List */}
              <div className="grid gap-4">
                {modules.map((module, index) => (
                  <Card key={module.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <CardTitle>
                            Module {index + 1}: {module.moduleTitle}
                          </CardTitle>
                          <CardDescription>
                            {(module.moduleDescription?.root?.children?.[0]?.text as string) ||
                              'No description available'}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          {module.skillsXP?.map((skillXP) => (
                            <Badge key={skillXP.id} variant="secondary">
                              {typeof skillXP.skill === 'object' ? skillXP.skill.name : ''} +
                              {skillXP.xp}XP
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardFooter>
                      <Link
                        href={`/training/course/${course.slug}/module/${module.slug}`}
                        className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      >
                        Start Module
                      </Link>
                    </CardFooter>
                  </Card>
                ))}

                {modules.length === 0 && (
                  <Card>
                    <CardHeader>
                      <CardDescription>No modules available for this course yet.</CardDescription>
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
