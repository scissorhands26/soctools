"use client";

import React, { useState } from "react";
import JSZip from "jszip";
import { parseString } from "xml2js";

const PPTXTextExtractor = () => {
  const [textData, setTextData] = useState([]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const zip = new JSZip();
      try {
        const content = await zip.loadAsync(file);

        // Extract presentation details
        const presentationDetails = await extractPresentationDetails(content);

        // Extract text from all relevant parts of the PPTX
        const extractedData = [];
        const slideIdMapping = {};

        // First extract slide texts
        for (const [filename, fileData] of Object.entries(content.files)) {
          if (
            filename.startsWith("ppt/slides/slide") &&
            filename.endsWith(".xml")
          ) {
            const xmlContent = await fileData.async("text");
            const slideNumber = parseInt(filename.match(/slide(\d+)/)[1], 10);
            const slideText = await extractTextFromSlide(
              xmlContent,
              slideNumber
            );
            extractedData.push(...slideText);

            // Extract comment ID from slide
            await extractCommentIdFromSlide(
              xmlContent,
              slideIdMapping,
              slideNumber
            );

            // Extract relationship ID for comments
            const relFilename =
              filename.replace("slides/slide", "slides/_rels/slide") + ".rels";
            if (content.files[relFilename]) {
              const relXmlContent = await content.files[relFilename].async(
                "text"
              );
              await extractSlideIdMapping(
                relXmlContent,
                slideIdMapping,
                slideNumber
              );
            }
          }
        }

        // Then extract notes and comments based on slides
        for (const [filename, fileData] of Object.entries(content.files)) {
          if (
            filename.startsWith("ppt/notesSlides/notesSlide") &&
            filename.endsWith(".xml")
          ) {
            const xmlContent = await fileData.async("text");
            const slideNumber = parseInt(
              filename.match(/notesSlide(\d+)/)[1],
              10
            );
            const notesText = await extractTextFromNotes(
              xmlContent,
              slideNumber
            );
            extractedData.push(...notesText);
          }
          if (
            filename.startsWith("ppt/comments/") &&
            filename.endsWith(".xml")
          ) {
            const xmlContent = await fileData.async("text");
            const commentsText = await extractTextFromComments(
              xmlContent,
              slideIdMapping
            );
            extractedData.push(...commentsText);
          }
        }

        setTextData({ presentationDetails, slides: extractedData });
      } catch (error) {
        console.error("Error reading PPTX file:", error);
      }
    }
  };

  const extractPresentationDetails = async (content) => {
    const details = {};

    if (content.files["docProps/app.xml"]) {
      const appXmlContent = await content.files["docProps/app.xml"].async(
        "text"
      );
      await parseString(appXmlContent, (err, result) => {
        if (err) {
          console.error("Error parsing app.xml:", err);
        } else {
          details.totalTime = result["Properties"]["TotalTime"]?.[0] || "";
          details.words = result["Properties"]["Words"]?.[0] || "";
          details.application = result["Properties"]["Application"]?.[0] || "";
          details.presentationFormat =
            result["Properties"]["PresentationFormat"]?.[0] || "";
          details.paragraphs = result["Properties"]["Paragraphs"]?.[0] || "";
          details.slides = result["Properties"]["Slides"]?.[0] || "";
          details.notes = result["Properties"]["Notes"]?.[0] || "";
          details.hiddenSlides =
            result["Properties"]["HiddenSlides"]?.[0] || "";
          details.company = result["Properties"]["Company"]?.[0] || "";
        }
      });
    }

    if (content.files["docProps/core.xml"]) {
      const coreXmlContent = await content.files["docProps/core.xml"].async(
        "text"
      );
      await parseString(coreXmlContent, (err, result) => {
        if (err) {
          console.error("Error parsing core.xml:", err);
        } else {
          details.title = result["cp:coreProperties"]["dc:title"]?.[0] || "";
          details.creator =
            result["cp:coreProperties"]["dc:creator"]?.[0] || "";
          details.lastModifiedBy =
            result["cp:coreProperties"]["cp:lastModifiedBy"]?.[0] || "";
          details.revision =
            result["cp:coreProperties"]["cp:revision"]?.[0] || "";
          details.created =
            result["cp:coreProperties"]["dcterms:created"]?.[0]["_"] || "";
          details.modified =
            result["cp:coreProperties"]["dcterms:modified"]?.[0]["_"] || "";
        }
      });
    }

    return details;
  };

  const extractTextFromSlide = async (xmlContent, slideNumber) => {
    return new Promise((resolve, reject) => {
      parseString(xmlContent, (err, result) => {
        if (err) {
          reject(err);
        } else {
          const textElements =
            result["p:sld"]["p:cSld"][0]["p:spTree"][0]["p:sp"] || [];
          const slideTextData = [];

          textElements.forEach((elem) => {
            const paragraphs = elem["p:txBody"]?.[0]["a:p"] || [];
            paragraphs.forEach((paragraph) => {
              const textRuns = paragraph["a:r"] || [];
              let paragraphText = "";
              textRuns.forEach((textRun) => {
                const text = (textRun["a:t"] || []).join("");
                paragraphText += text;
              });
              if (paragraphText) {
                slideTextData.push({
                  slideNumber,
                  type: "slideText",
                  text: paragraphText,
                });
              }
            });
          });
          resolve(slideTextData);
        }
      });
    });
  };

  const extractTextFromNotes = async (xmlContent, slideNumber) => {
    return new Promise((resolve, reject) => {
      parseString(xmlContent, (err, result) => {
        if (err) {
          reject(err);
        } else {
          const textElements =
            result["p:notes"]["p:cSld"][0]["p:spTree"][0]["p:sp"] || [];
          const notesTextData = [];

          textElements.forEach((elem) => {
            const paragraphs = elem["p:txBody"]?.[0]["a:p"] || [];
            let paragraphText = "";
            paragraphs.forEach((paragraph) => {
              const textRuns = paragraph["a:r"] || [];
              textRuns.forEach((textRun) => {
                const text = (textRun["a:t"] || []).join("");
                paragraphText += text;
              });
            });
            if (paragraphText) {
              notesTextData.push({
                slideNumber,
                type: "note",
                text: paragraphText,
              });
            }
          });
          resolve(notesTextData);
        }
      });
    });
  };

  const extractCommentIdFromSlide = async (
    xmlContent,
    slideIdMapping,
    slideNumber
  ) => {
    return new Promise((resolve, reject) => {
      parseString(xmlContent, (err, result) => {
        if (err) {
          reject(err);
        } else {
          const extLst = result["p:sld"]["p:cSld"][0]["p:extLst"] || [];
          extLst.forEach((ext) => {
            if (ext["p14:creationId"]) {
              const commentId = ext["p14:creationId"][0]["$"]["val"];
              slideIdMapping[commentId] = slideNumber;
            }
          });
          resolve();
        }
      });
    });
  };

  const extractSlideIdMapping = async (
    relXmlContent,
    slideIdMapping,
    slideNumber
  ) => {
    return new Promise((resolve, reject) => {
      parseString(relXmlContent, (err, result) => {
        if (err) {
          reject(err);
        } else {
          const relationships = result["Relationships"]["Relationship"] || [];
          relationships.forEach((relationship) => {
            if (relationship["$"]["Type"].includes("comments")) {
              const relId = relationship["$"]["Id"];
              slideIdMapping[relId] = slideNumber;
            }
          });
          resolve();
        }
      });
    });
  };

  const extractTextFromComments = async (xmlContent, slideIdMapping) => {
    return new Promise((resolve, reject) => {
      parseString(xmlContent, (err, result) => {
        if (err) {
          reject(err);
        } else {
          const comments = result["p188:cmLst"]["p188:cm"] || [];
          const commentsTextData = [];

          comments.forEach((comment) => {
            const cId = comment["pc:sldMkLst"][0]["pc:sldMk"][0]["$"]["cId"];
            const text =
              comment["p188:txBody"][0]["a:p"][0]["a:r"][0]["a:t"][0];
            const slideNumber = slideIdMapping[cId];
            if (text && slideNumber !== undefined) {
              commentsTextData.push({
                slideNumber,
                type: "comment",
                text,
              });
            }
          });
          resolve(commentsTextData);
        }
      });
    });
  };

  return (
    <div>
      <input type="file" accept=".pptx" onChange={handleFileChange} />
      <pre>{JSON.stringify(textData, null, 2)}</pre>
    </div>
  );
};

export default PPTXTextExtractor;
