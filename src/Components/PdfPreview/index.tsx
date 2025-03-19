import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "./index.less";

interface PdfPreviewProps {
  pdfUrl: string;
  style?: React.CSSProperties;
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PdfPreview: React.FC<PdfPreviewProps> = ({ pdfUrl, style }) => {
  const [numPages, setNumPages] = useState(0);
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };
  return (
    <div className="pdf-view" style={style}>
      <Document
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        loading="Loading..."
      >
        {Array.from(new Array(numPages), (_, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            loading="Loading..."
          />
        ))}
      </Document>
    </div>
  );
};

export default PdfPreview;
