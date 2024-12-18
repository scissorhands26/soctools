import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { NetworkIcon, CpuIcon, ShieldAlertIcon } from 'lucide-react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Course } from '@/payload-types'

// Make the component async
export default async function TrainingPage() {
  // Fetch courses from the database
  const payload = await getPayload({ config: configPromise })
  const { docs: courses } = await payload.find({
    collection: 'courses',
    where: {
      status: {
        equals: 'published',
      },
    },
  })

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="bg-black py-12 md:py-24 lg:py-32">
          <div className="container">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Security Training
              </h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Level up your security analysis skills with our hands-on training courses.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32">
          <div className="container space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="border-primary">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <NetworkIcon className="w-6 h-6 text-primary" />
                      <CardTitle>{course.courseTitle}</CardTitle>
                    </div>
                    <CardDescription>
                      {course.courseDescription?.root?.children?.[0]?.text ||
                        'No description available'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">
                        Level: {course.courseLevel || 'Not specified'}
                      </div>
                      <div className="text-sm text-muted-foreground">Topic: {course.topic}</div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link
                      href={`/training/course/${course.slug}`}
                      className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                      Start Course
                    </Link>
                  </CardFooter>
                </Card>
              ))}

              {courses.length === 0 && (
                <div className="col-span-full text-center text-muted-foreground">
                  No courses available at the moment.
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
