// "use client";

// import React, { useState, useEffect, ChangeEvent } from "react";
// import JSZip from "jszip";
// import { parseString } from "xml2js";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "../ui/card";
// import Link from "next/link";
// import { Button } from "../ui/button";

// interface ExtractedData {
//   slideNumber: number;
//   type: "slideText" | "note" | "comment";
//   text: string;
//   language: string;
//   author: string;
//   created: string;
// }

// interface PresentationDetails {
//   totalTime?: string;
//   words?: string;
//   application?: string;
//   presentationFormat?: string;
//   paragraphs?: string;
//   slides?: string;
//   notes?: string;
//   hiddenSlides?: string;
//   company?: string;
//   title?: string;
//   creator?: string;
//   lastModifiedBy?: string;
//   revision?: string;
//   created?: string;
//   modified?: string;
//   authors?: {
//     id: string;
//     initials: string;
//     name: string;
//   };
// }

// const PPTXTextExtractor = () => {
//   const [textData, setTextData] = useState<ExtractedData[]>([]);
//   const [filteredData, setFilteredData] = useState<ExtractedData[]>([]);
//   const [filterType, setFilterType] = useState<string>("");
//   const [customFilter, setCustomFilter] = useState<string>("");
//   const [caseInsensitive, setCaseInsensitive] = useState<boolean>(false);

//   const classificationMarkings = [
//     "UNCLASSIFIED",
//     "CONFIDENTIAL",
//     "SECRET",
//     "TOP SECRET",
//     "(U)", // Unclassified
//     "(C)", // Confidential
//     "(S)", // Secret
//     "(TS)", // Top Secret
//     "(U//FOUO)", // For Official Use Only
//     "(U//LES)", // Law Enforcement Sensitive
//     "(C//NF)", // Confidential No Foreign
//     "(C//REL TO USA, FVEY)", // Confidential Releasable to USA, Five Eyes
//     "(C//REL TO USA, AUS, CAN, GBR, NZL)", // Confidential Releasable to USA, Australia, Canada, Great Britain, New Zealand
//     "(S//NF)", // Secret No Foreign
//     "(S//REL TO USA, FVEY)", // Secret Releasable to USA, Five Eyes
//     "(S//REL TO USA, AUS, CAN, GBR, NZL)", // Secret Releasable to USA, Australia, Canada, Great Britain, New Zealand
//     "(S//REL TO USA, NATO)", // Secret Releasable to USA, NATO
//     "(TS//NF)", // Top Secret No Foreign
//     "(TS//SCI)", // Top Secret Sensitive Compartmented Information
//     "(TS//HCS)", // Top Secret HUMINT Control System
//     "(TS//TK)", // Top Secret Talent Keyhole
//     "(TS//SI)", // Top Secret Special Intelligence
//     "(TS//REL TO USA, FVEY)", // Top Secret Releasable to USA, Five Eyes
//     "(TS//REL TO USA, AUS, CAN, GBR, NZL)", // Top Secret Releasable to USA, Australia, Canada, Great Britain, New Zealand
//     "(TS//REL TO USA, NATO)", // Top Secret Releasable to USA, NATO
//     "(TS//SAR)", // Top Secret Special Access Required
//     "(TS//SAP)", // Top Secret Special Access Program
//     "(TS//RD)", // Top Secret Restricted Data
//     "(TS//FRD)", // Top Secret Formerly Restricted Data
//     "(TS//CNWDI)", // Top Secret Critical Nuclear Weapon Design Information
//     "(TS//ORCON)", // Top Secret Dissemination and Extraction Controlled by Originator
//     "(TS//NOFORN)", // Top Secret No Foreign
//     "(TS//PROPIN)", // Top Secret Proprietary Information
//     "(TS//RELIDO)", // Top Secret Release to Designated Officials
//     "(TS//REL)", // Top Secret Releasable to
//     "(TS//FGI)", // Top Secret Foreign Government Information
//     "(TS//EYES ONLY)", // Top Secret Eyes Only
//     "(TS//LIMDIS)", // Top Secret Limited Distribution
//     "(TS//EXDIS)", // Top Secret Exclusive Distribution
//     "(TS//SBU)", // Top Secret Sensitive But Unclassified
//     "(TS//LES)", // Top Secret Law Enforcement Sensitive
//     "(TS//FOUO)", // Top Secret For Official Use Only
//     "(TS//DEA)", // Top Secret Drug Enforcement Administration Sensitive
//     "(TS//FISA)", // Top Secret Foreign Intelligence Surveillance Act
//     "(TS//RSEN)", // Top Secret Restricted Sensitive Information
//     "(TS//DSEN)", // Top Secret Departmental Sensitive Information
//     "(TS//FOU)", // Top Secret For Official Use
//     "(TS//SHI)", // Top Secret Secret Handling Instructions
//     "(TS//LIM)", // Top Secret Limited Distribution
//     "(TS//SCI/NOFORN)", // Top Secret SCI No Foreign
//     "(TS//SCI/REL TO USA, FVEY)", // Top Secret SCI Releasable to USA, Five Eyes
//     "(TS//SCI/REL TO USA, NATO)", // Top Secret SCI Releasable to USA, NATO
//     "(TS//SAP/NOFORN)", // Top Secret SAP No Foreign
//     "(TS//SAP/REL TO USA, FVEY)", // Top Secret SAP Releasable to USA, Five Eyes
//     "(TS//SAP/REL TO USA, NATO)", // Top Secret SAP Releasable to USA, NATO
//   ];

//   const profanityList = ["badword1", "badword2", "badword3"]; // Add your list of profanities here

//   const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const zip = new JSZip();
//       try {
//         const content = await zip.loadAsync(file);

//         // Extract presentation details
//         const presentationDetails = await extractPresentationDetails(content);

//         // Extract text from all relevant parts of the PPTX
//         const extractedData: ExtractedData[] = [];
//         const slideIdMapping: Record<string, number> = {};

//         // First extract slide texts
//         for (const [filename, fileData] of Object.entries(content.files)) {
//           if (
//             filename.startsWith("ppt/slides/slide") &&
//             filename.endsWith(".xml")
//           ) {
//             const xmlContent = await fileData.async("text");
//             const slideNumber = parseInt(filename.match(/slide(\d+)/)![1], 10);
//             const slideText = await extractTextFromSlide(
//               xmlContent,
//               slideNumber
//             );
//             extractedData.push(...slideText);

//             // Extract comment ID from slide
//             await extractCommentIdFromSlide(
//               xmlContent,
//               slideIdMapping,
//               slideNumber
//             );
//           }
//         }

//         // Then extract notes and comments based on slides
//         for (const [filename, fileData] of Object.entries(content.files)) {
//           if (
//             filename.startsWith("ppt/notesSlides/notesSlide") &&
//             filename.endsWith(".xml")
//           ) {
//             const xmlContent = await fileData.async("text");
//             const slideNumber = parseInt(
//               filename.match(/notesSlide(\d+)/)![1],
//               10
//             );
//             const notesText = await extractTextFromNotes(
//               xmlContent,
//               slideNumber
//             );
//             extractedData.push(...notesText);
//           }
//           if (
//             filename.startsWith("ppt/comments/") &&
//             filename.endsWith(".xml")
//           ) {
//             const xmlContent = await fileData.async("text");
//             const commentsText = await extractTextFromComments(
//               xmlContent,
//               slideIdMapping,
//               presentationDetails
//             );
//             extractedData.push(...commentsText);
//           }
//         }

//         setTextData(extractedData);
//         applyFilters(extractedData, filterType, customFilter, caseInsensitive);
//       } catch (error) {
//         console.error("Error reading PPTX file:", error);
//       }
//     }
//   };

//   const extractPresentationDetails = async (content: JSZip) => {
//     const details: PresentationDetails = {};

//     if (content.files["docProps/app.xml"]) {
//       const appXmlContent = await content.files["docProps/app.xml"].async(
//         "text"
//       );
//       await parseString(appXmlContent, (err, result) => {
//         if (err) {
//           console.error("Error parsing app.xml:", err);
//         } else {
//           details.totalTime = result["Properties"]["TotalTime"]?.[0] || "";
//           details.words = result["Properties"]["Words"]?.[0] || "";
//           details.application = result["Properties"]["Application"]?.[0] || "";
//           details.presentationFormat =
//             result["Properties"]["PresentationFormat"]?.[0] || "";
//           details.paragraphs = result["Properties"]["Paragraphs"]?.[0] || "";
//           details.slides = result["Properties"]["Slides"]?.[0] || "";
//           details.notes = result["Properties"]["Notes"]?.[0] || "";
//           details.hiddenSlides =
//             result["Properties"]["HiddenSlides"]?.[0] || "";
//           details.company = result["Properties"]["Company"]?.[0] || "";
//         }
//       });
//     }

//     if (content.files["docProps/core.xml"]) {
//       const coreXmlContent = await content.files["docProps/core.xml"].async(
//         "text"
//       );
//       await parseString(coreXmlContent, (err, result) => {
//         if (err) {
//           console.error("Error parsing core.xml:", err);
//         } else {
//           details.title = result["cp:coreProperties"]["dc:title"]?.[0] || "";
//           details.creator =
//             result["cp:coreProperties"]["dc:creator"]?.[0] || "";
//           details.lastModifiedBy =
//             result["cp:coreProperties"]["cp:lastModifiedBy"]?.[0] || "";
//           details.revision =
//             result["cp:coreProperties"]["cp:revision"]?.[0] || "";
//           details.created =
//             result["cp:coreProperties"]["dcterms:created"]?.[0]["_"] || "";
//           details.modified =
//             result["cp:coreProperties"]["dcterms:modified"]?.[0]["_"] || "";
//         }
//       });
//     }

//     if (content.files["ppt/authors.xml"]) {
//       const authorsXmlContent = await content.files["ppt/authors.xml"].async(
//         "text"
//       );
//       await parseString(authorsXmlContent, (err, result) => {
//         if (err) {
//           console.error("Error parsing authors.xml:", err);
//         } else {
//           details.authors = {
//             id: result["p188:authorLst"]["p188:author"][0].$.id,
//             initials: result["p188:authorLst"]["p188:author"][0].$.initials,
//             name: result["p188:authorLst"]["p188:author"][0].$.name,
//           };
//         }
//       });
//     }

//     return details;
//   };

//   const extractTextFromSlide = async (
//     xmlContent: string,
//     slideNumber: number
//   ): Promise<ExtractedData[]> => {
//     return new Promise((resolve, reject) => {
//       parseString(xmlContent, (err, result) => {
//         if (err) {
//           reject(err);
//         } else {
//           const textElements =
//             result["p:sld"]["p:cSld"][0]["p:spTree"][0]["p:sp"] || [];
//           const slideTextData: ExtractedData[] = [];

//           textElements.forEach((elem: any) => {
//             const paragraphs = elem["p:txBody"]?.[0]["a:p"] || [];
//             paragraphs.forEach((paragraph: any) => {
//               const textRuns = paragraph["a:r"] || [];
//               let paragraphText = "";
//               let language = "";
//               textRuns.forEach((textRun: any) => {
//                 const text = (textRun["a:t"] || []).join("");
//                 language = textRun["a:rPr"]?.[0]?.$?.lang || "";
//                 paragraphText += text;
//               });
//               if (paragraphText) {
//                 slideTextData.push({
//                   slideNumber,
//                   type: "slideText",
//                   text: paragraphText,
//                   language,
//                   author: "Unknown",
//                   created: "Unknown",
//                 });
//               }
//             });
//           });
//           resolve(slideTextData);
//         }
//       });
//     });
//   };

//   const extractTextFromNotes = async (
//     xmlContent: string,
//     slideNumber: number
//   ): Promise<ExtractedData[]> => {
//     return new Promise((resolve, reject) => {
//       parseString(xmlContent, (err, result) => {
//         if (err) {
//           reject(err);
//         } else {
//           const textElements =
//             result["p:notes"]["p:cSld"][0]["p:spTree"][0]["p:sp"] || [];
//           const notesTextData: ExtractedData[] = [];

//           textElements.forEach((elem: any) => {
//             const paragraphs = elem["p:txBody"]?.[0]["a:p"] || [];
//             let paragraphText = "";
//             let language = "";
//             paragraphs.forEach((paragraph: any) => {
//               const textRuns = paragraph["a:r"] || [];
//               textRuns.forEach((textRun: any) => {
//                 const text = (textRun["a:t"] || []).join("");
//                 language = textRun["a:rPr"]?.[0]?.$?.lang || "";
//                 paragraphText += text;
//               });
//             });
//             if (paragraphText) {
//               notesTextData.push({
//                 slideNumber,
//                 type: "note",
//                 text: paragraphText,
//                 language,
//                 author: "Unknown",
//                 created: "Unknown",
//               });
//             }
//           });
//           resolve(notesTextData);
//         }
//       });
//     });
//   };

//   const extractCommentIdFromSlide = async (
//     xmlContent: string,
//     slideIdMapping: Record<string, number>,
//     slideNumber: number
//   ): Promise<void> => {
//     return new Promise((resolve, reject) => {
//       parseString(xmlContent, (err, result) => {
//         if (err) {
//           reject(err);
//         } else {
//           const extLst = result["p:sld"]["p:cSld"][0]["p:extLst"] || [];
//           extLst.forEach((ext: any) => {
//             if (ext["p:ext"][0]["p14:creationId"][0].$.val) {
//               const commentId = ext["p:ext"][0]["p14:creationId"][0].$.val;
//               slideIdMapping[commentId] = slideNumber;
//             }
//           });
//           resolve();
//         }
//       });
//     });
//   };

//   const extractTextFromComments = async (
//     xmlContent: string,
//     slideIdMapping: Record<string, number>,
//     presentationDetails: PresentationDetails
//   ): Promise<ExtractedData[]> => {
//     return new Promise((resolve, reject) => {
//       parseString(xmlContent, (err, result) => {
//         if (err) {
//           reject(err);
//         } else {
//           const comments = result["p188:cmLst"]["p188:cm"] || [];
//           const commentsTextData: ExtractedData[] = [];

//           comments.forEach(async (comment: any) => {
//             const cId = comment["pc:sldMkLst"][0]["pc:sldMk"][0]["$"]["cId"];
//             const text =
//               comment["p188:txBody"][0]["a:p"][0]["a:r"][0]["a:t"][0];
//             const language =
//               comment["p188:txBody"][0]["a:p"][0]["a:r"][0]["a:rPr"]?.[0]?.$
//                 ?.lang || "";
//             const created = comment.$.created;
//             const author = comment.$.authorId;
//             const slideNumber = slideIdMapping[cId];
//             if (text && slideNumber !== undefined) {
//               commentsTextData.push({
//                 slideNumber,
//                 type: "comment",
//                 text,
//                 author: await lookupAuthor(author, presentationDetails),
//                 created,
//                 language,
//               });
//             }
//           });
//           resolve(commentsTextData);
//         }
//       });
//     });
//   };

//   const applyFilters = (
//     extractedData: ExtractedData[],
//     filterType: string,
//     customFilter: string,
//     caseInsensitive: boolean
//   ) => {
//     if (!extractedData) return;

//     let filterCriteria: string[] = [];
//     if (filterType === "classification") {
//       filterCriteria = classificationMarkings;
//     } else if (filterType === "profanity") {
//       filterCriteria = profanityList;
//     } else if (filterType === "custom" && customFilter) {
//       filterCriteria = customFilter.split(",").map((item) => item.trim());
//     }

//     const filteredData = extractedData.filter((entry) =>
//       filterCriteria.some((criteria) =>
//         caseInsensitive
//           ? entry.text.toLowerCase().includes(criteria.toLowerCase())
//           : entry.text.includes(criteria)
//       )
//     );

//     setFilteredData(filteredData);
//   };

//   useEffect(() => {
//     applyFilters(textData, filterType, customFilter, caseInsensitive);
//   }, [textData, filterType, customFilter, caseInsensitive]);

//   async function lookupAuthor(
//     authorId: string,
//     presentationDetails: PresentationDetails
//   ) {
//     if (presentationDetails.authors) {
//       return presentationDetails.authors.name;
//     }
//     return "Unknown";
//   }

//   const findHitWord = (
//     text: string,
//     filterCriteria: string[],
//     caseInsensitive: boolean
//   ): string | null => {
//     for (const criteria of filterCriteria) {
//       const regex = new RegExp(`(${criteria})`, caseInsensitive ? "i" : "g");
//       if (regex.test(text)) {
//         return criteria;
//       }
//     }
//     return null;
//   };

//   return (
//     <div>
//       <div>
//         <h2 className="text-4xl mb-2">PowerPoint Scannner</h2>
//       </div>
//       <Input
//         type="file"
//         accept=".pptx"
//         onChange={handleFileChange}
//         className="bg-white text-black"
//       />

//       <div>
//         <Label>Select Filter Type:</Label>
//         <div className="flex flex-col text-center">
//           <div className="flex flex-row justify-between">
//             <Select
//               value={filterType}
//               onValueChange={(e: any) => setFilterType(e)}
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Select a filter" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="classification">
//                   Classification Markings
//                 </SelectItem>
//                 <SelectItem value="profanity">Profanity</SelectItem>
//                 <SelectItem value="custom">Custom Filter</SelectItem>
//               </SelectContent>
//             </Select>
//             <div>
//               <Label>
//                 <input
//                   type="checkbox"
//                   checked={caseInsensitive}
//                   onChange={(e) => setCaseInsensitive(e.target.checked)}
//                 />
//                 Case Insensitive
//               </Label>
//             </div>
//           </div>
//           <div>
//             {filterType === "custom" && (
//               <div>
//                 <Label>
//                   Custom Filter (comma-separated):
//                   <Input
//                     type="text"
//                     value={customFilter}
//                     onChange={(e) => setCustomFilter(e.target.value)}
//                   />
//                 </Label>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <div>
//         {filteredData.length > 0 ? (
//           <div className="my-4">
//             {filteredData.map((entry, index) => {
//               const hitWord = findHitWord(
//                 entry.text,
//                 filterType === "classification"
//                   ? classificationMarkings
//                   : filterType === "profanity"
//                   ? profanityList
//                   : filterType === "custom" && customFilter
//                   ? customFilter.split(",").map((item) => item.trim())
//                   : [],
//                 caseInsensitive
//               );
//               return (
//                 <Card key={index} className="mb-2">
//                   <CardHeader>
//                     <CardTitle className="flex flex-row justify-between">
//                       <span>Slide {entry.slideNumber}</span>
//                       <span className="text-lg">
//                         (
//                         {entry.type === "slideText"
//                           ? "Slide Text"
//                           : entry.type === "note"
//                           ? "Note"
//                           : entry.type === "comment"
//                           ? "Comment"
//                           : "Unknown"}
//                         )
//                       </span>
//                     </CardTitle>
//                     <CardDescription></CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <p>
//                       <strong>Hit on:</strong>{" "}
//                       <span className="text-red-500">{hitWord || "None"}</span>
//                     </p>
//                     <p>&quot;{entry.text}&quot;</p>
//                   </CardContent>
//                   <CardFooter>
//                     <div className="grid grid-cols-3 gap-2 border w-full text-center">
//                       <div>Author: {entry.author}</div>
//                       <div>Created: {entry.created}</div>
//                       <div>Language: {entry.language}</div>
//                     </div>
//                   </CardFooter>
//                 </Card>
//               );
//             })}
//           </div>
//         ) : (
//           <div className="text-center">No hits found</div>
//         )}
//         <div className="mt-5 w-full">
//           <Link href="/test_files/powerpoint.pptx" target="_blank" download>
//             <Button className="w-full">Download Sample PowerPoint</Button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PPTXTextExtractor;
