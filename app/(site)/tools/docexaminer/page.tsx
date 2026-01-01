'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, ChevronDown, ChevronUp } from 'lucide-react'
import JSZip from 'jszip'
import xmljs from 'xml-js'
import * as XLSX from 'xlsx'

interface SearchResult {
  text: string
  page: number
  source: 'content' | 'comment' | 'embedded'
  author?: string
  date?: string
  fullText?: string
  matchedTerm: string
  paragraphNumber?: number
  surroundingContext?: string
  embeddedFileName?: string
}

interface ParsedDocument {
  content: string[]
  comments: Array<{
    id: string
    author: string
    date: string
    text: string
  }>
  pageBreaks: number[]
  metadata: {
    creator?: string
    lastModifiedBy?: string
    created?: string
    modified?: string
    revision?: string
    title?: string
    subject?: string
    description?: string
    keywords?: string
    category?: string
  }
}

export default function DocxSearchApp() {
  const [file, setFile] = useState<File | null>(null)
  const [searchTerms, setSearchTerms] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<string>('')

  const [showDebugInfo, setShowDebugInfo] = useState(false)
  const [expandedResults, setExpandedResults] = useState<Set<number>>(new Set())

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (
      selectedFile &&
      selectedFile.type ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      setFile(selectedFile)
      setError(null)
    } else {
      setError('Please select a valid .docx file')
    }
  }

  // Highlight matched terms in the text
  const highlightMatch = (text: string, term: string) => {
    const regex = new RegExp(`(${term})`, 'gi')
    return text.replace(regex, `<span class="highlight">$1</span>`)
  }

  // Format the date to a more human-readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  // Extract content, comments, and embedded objects (e.g., spreadsheets)
  const extractDocxContent = async (file: File): Promise<ParsedDocument> => {
    const arrayBuffer = await file.arrayBuffer()
    const zip = await JSZip.loadAsync(arrayBuffer) // Ensure zip is defined here

    const documentXml = await zip.file('word/document.xml')?.async('string')
    const commentsXml = await zip.file('word/comments.xml')?.async('string')
    const corePropsXml = await zip.file('docProps/core.xml')?.async('string')
    const embeddingsFolder = zip.folder('word/embeddings') // Embedded objects like Excel files

    if (!documentXml) {
      throw new Error('Unable to extract document content')
    }

    const { content, pageBreaks } = parseDocumentContent(documentXml)
    const comments = commentsXml ? parseComments(commentsXml) : []
    const metadata = corePropsXml ? parseCoreProperties(corePropsXml) : {}

    // Extract embedded objects (spreadsheets, etc.)
    const embeddedResults = embeddingsFolder
      ? await extractEmbeddedFiles(embeddingsFolder, searchTerms)
      : []

    setDebugInfo((prev) => {
      return (
        `File Metadata:\n${JSON.stringify(metadata, null, 2)}\n\n` +
        `Extracted ${content.length} paragraphs and ${comments.length} comments.\n` +
        `Page breaks at paragraphs: ${pageBreaks.join(', ') || 'None'}\n\n` +
        '++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n'
      )
    })

    return { content, comments, pageBreaks, metadata }
  }

  // Function to extract and search embedded files (e.g., spreadsheets)
  const extractEmbeddedFiles = async (embeddedFiles: JSZip, searchTerms: string) => {
    const terms = searchTerms.split(',').map((term) => term.trim().toLowerCase())
    const results: SearchResult[] = []

    for (const fileName of Object.keys(embeddedFiles.files)) {
      const file = embeddedFiles.file(fileName)
      if (file && file.name.endsWith('.xlsx')) {
        // If it's an Excel file
        const arrayBuffer = await file.async('arraybuffer')
        const workbook = XLSX.read(arrayBuffer, { type: 'array' })

        workbook.SheetNames.forEach((sheetName) => {
          const sheet = workbook.Sheets[sheetName]
          const data = XLSX.utils.sheet_to_json<any[]>(sheet, { header: 1 })

          data.forEach((row, rowIndex) => {
            row.forEach((cellValue, cellIndex) => {
              if (typeof cellValue === 'string') {
                terms.forEach((term) => {
                  if (cellValue.toLowerCase().includes(term)) {
                    results.push({
                      text: cellValue,
                      page: 1, // Embedded objects may not have pages; adjust this accordingly
                      source: 'embedded',
                      matchedTerm: term,
                      surroundingContext: `Row ${rowIndex + 1}, Cell ${cellIndex + 1}`,
                      embeddedFileName: fileName,
                    })
                  }
                })
              }
            })
          })
        })
      }
    }
    return results
  }

  // Parse core properties XML and type it
  const parseCoreProperties = (xml: string): ParsedDocument['metadata'] => {
    const jsonObj = xmljs.xml2js(xml, {
      compact: true,
    }) as xmljs.ElementCompact
    const coreProps = jsonObj['cp:coreProperties'] as any

    return {
      creator: coreProps['dc:creator']?._text,
      lastModifiedBy: coreProps['cp:lastModifiedBy']?._text,
      created: coreProps['dcterms:created']?._text,
      modified: coreProps['dcterms:modified']?._text,
      revision: coreProps['cp:revision']?._text,
      title: coreProps['dc:title']?._text,
      subject: coreProps['dc:subject']?._text,
      description: coreProps['dc:description']?._text,
      keywords: coreProps['cp:keywords']?._text,
      category: coreProps['cp:category']?._text,
    }
  }

  const parseDocumentContent = (xml: string): { content: string[]; pageBreaks: number[] } => {
    const jsonObj = xmljs.xml2js(xml, {
      compact: true,
    }) as xmljs.ElementCompact
    const paragraphs = jsonObj['w:document']?.['w:body']?.['w:p'] ?? []
    const content: string[] = []
    const pageBreaks: number[] = []

    paragraphs.forEach((p: any, index: number) => {
      let paragraphText = ''
      const runs = Array.isArray(p['w:r']) ? p['w:r'] : [p['w:r']].filter(Boolean)

      runs.forEach((r: any) => {
        // Detect page breaks
        if (r?.['w:br']?.['_attributes']?.['w:type'] === 'page') {
          pageBreaks.push(index)
        }
        if (r?.['w:t']) {
          paragraphText += Array.isArray(r['w:t'])
            ? r['w:t'].map((t: any) => t?._text ?? '').join('')
            : (r['w:t']?._text ?? '')
        }
      })

      content.push(paragraphText.trim())
    })

    return { content, pageBreaks }
  }

  // Type guard to remove nulls
  function isNotNull<T>(value: T | null): value is T {
    return value !== null
  }

  const parseComments = (
    xml: string,
  ): Array<{ id: string; author: string; date: string; text: string }> => {
    const jsonObj = xmljs.xml2js(xml, {
      compact: true,
    }) as xmljs.ElementCompact
    const comments = jsonObj['w:comments']?.['w:comment'] ?? []

    const parsedComments = Array.isArray(comments)
      ? comments.map(extractCommentData)
      : [extractCommentData(comments)]

    // Use the isNotNull type guard to filter out null values
    return parsedComments.filter(isNotNull)
  }

  const extractCommentData = (
    comment: any,
  ): { id: string; author: string; date: string; text: string } | null => {
    if (!comment['w:p']) return null

    const id = comment['_attributes']?.['w:id'] ?? ''
    const author = comment['_attributes']?.['w:author'] ?? ''
    const date = comment['_attributes']?.['w:date'] ?? ''

    const paragraphs = Array.isArray(comment['w:p']) ? comment['w:p'] : [comment['w:p']]
    let text = ''

    paragraphs.forEach((paragraph: any) => {
      const runs = Array.isArray(paragraph['w:r']) ? paragraph['w:r'] : [paragraph['w:r']]
      runs.forEach((run: any) => {
        if (run['w:t']) {
          text += typeof run['w:t'] === 'string' ? run['w:t'] : (run['w:t']._text ?? '')
        }
      })
    })

    return { id, author, date, text }
  }

  const searchDocument = async () => {
    if (!file || !searchTerms) {
      setError('Please select a file and enter search terms')
      return
    }

    setIsLoading(true)
    setError(null)
    setDebugInfo('')
    try {
      const { content, comments, pageBreaks, metadata } = await extractDocxContent(file)
      const terms = searchTerms.split(',').map((term) => term.trim().toLowerCase())

      const searchInText = (
        text: string[],
        term: string,
        source: 'content' | 'comment',
      ): SearchResult[] => {
        return text.flatMap((paragraph, index) => {
          const regex = new RegExp(`(\\S{0,50}\\s*${term}\\s*\\S{0,50})`, 'gi')
          const matches = Array.from(paragraph.matchAll(regex), (m) => ({
            text: m[0].trim(),
            page: source === 'content' ? pageBreaks.filter((pb) => pb <= index).length + 1 : 1,
            source: source,
            matchedTerm: term,
            paragraphNumber: index + 1,
            surroundingContext: paragraph,
            fullText: paragraph,
          }))
          return matches
        })
      }

      const contentResults = terms.flatMap((term) => searchInText(content, term, 'content'))
      const commentResults = terms.flatMap((term) =>
        comments.flatMap((comment) => {
          const matches = searchInText([comment.text], term, 'comment')
          return matches.map((match) => ({
            ...match,
            author: comment.author,
            date: comment.date,
            fullText: comment.text,
          }))
        }),
      )

      const embeddedResults = await extractEmbeddedFiles(
        await JSZip.loadAsync(file), // Properly load the zip here
        searchTerms,
      )

      const allResults = [...contentResults, ...commentResults, ...embeddedResults]
      setResults(allResults)

      // Enhanced debug output for content
      setDebugInfo((prev) => {
        return (
          prev +
          `\nContent Search Results:\n${contentResults
            .map(
              (r) =>
                `Matched Term: ${r.matchedTerm}\nText: ${r.text}\nPage: ${r.page}, Paragraph: ${r.paragraphNumber}\n`,
            )
            .join('\n')}\n` +
          '++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n\n' +
          `Comments Search Results:\n${commentResults
            .map(
              (r) =>
                `Matched Term: ${r.matchedTerm}\nAuthor: ${
                  r.author
                }, Date: ${formatDate(r.date!)}\nText: ${r.text}\n`,
            )
            .join('\n')}` +
          `Embedded File Search Results:\n${embeddedResults
            .map(
              (r) =>
                `Matched Term: ${r.matchedTerm}\nText: ${r.text}\nFile: ${r.embeddedFileName}\nContext: ${r.surroundingContext}\n`,
            )
            .join('\n')}`
        )
      })

      if (allResults.length === 0) {
        setError('No matches found for the given search terms')
      }
    } catch (error) {
      console.error('Error processing document:', error)
      setError(
        `An error occurred while processing the document: ${
          error instanceof Error ? error.message : String(error)
        }`,
      )
    } finally {
      setIsLoading(false)
    }
  }

  const toggleResultExpansion = (index: number) => {
    setExpandedResults((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Docx Search App</h1>
      <div className="mb-4">
        <Input type="file" onChange={handleFileChange} accept=".docx" className="mb-2" />
        <Input
          type="text"
          placeholder="Enter search terms (comma-separated)"
          value={searchTerms}
          onChange={(e) => setSearchTerms(e.target.value)}
          className="mb-2"
        />
        <Button onClick={searchDocument} disabled={!file || !searchTerms || isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching...
            </>
          ) : (
            'Search Document'
          )}
        </Button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid gap-4">
        {results.map((result, index) => (
          <>
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  {result.source === 'content'
                    ? `Document Content (Page ${result.page})`
                    : result.source === 'comment'
                      ? 'Comment'
                      : `Embedded Object (${result.embeddedFileName})`}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p
                  className="text-sm mb-2"
                  dangerouslySetInnerHTML={{
                    __html: highlightMatch(result.text, result.matchedTerm),
                  }}
                />
                <div className="text-xs text-gray-500">
                  {result.source === 'content' ? (
                    <>
                      <p>Page: {result.page}</p>
                      <p>Paragraph: {result.paragraphNumber}</p>
                    </>
                  ) : result.source === 'comment' ? (
                    <>
                      <p>Author: {result.author}</p>
                      <p>Date: {formatDate(result.date!)}</p>
                    </>
                  ) : (
                    <>
                      <p>File: {result.embeddedFileName}</p>
                      <p>Context: {result.surroundingContext}</p>
                    </>
                  )}
                  <p>Matched term: {result.matchedTerm}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleResultExpansion(index)}
                    className="mt-2"
                  >
                    {expandedResults.has(index) ? (
                      <>
                        <ChevronUp className="h-4 w-4 mr-2" />
                        Hide full{' '}
                        {result.source === 'content'
                          ? 'paragraph'
                          : result.source === 'comment'
                            ? 'comment'
                            : 'embedded file content'}
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 mr-2" />
                        Show full{' '}
                        {result.source === 'content'
                          ? 'paragraph'
                          : result.source === 'comment'
                            ? 'comment'
                            : 'embedded file content'}
                      </>
                    )}
                  </Button>
                  {expandedResults.has(index) && (
                    <p className="mt-2 p-2 bg-gray-100 rounded">{result.fullText}</p>
                  )}
                </div>
              </CardContent>
            </Card>
            <hr />
          </>
        ))}
      </div>
      <div className="mt-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={showDebugInfo}
            onChange={(e) => setShowDebugInfo(e.target.checked)}
            className="mr-2"
          />
          Show Debug Information
        </label>
        {showDebugInfo && (
          <div className="mt-2 p-4 bg-gray-100 rounded">
            <h2 className="text-lg font-semibold mb-2">Debug Information</h2>
            <pre className="whitespace-pre-wrap text-sm">{debugInfo}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
