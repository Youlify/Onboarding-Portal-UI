import { serviceAxios } from "@service/http";

const pdfBlobDownload = async (requestUrl: string, fileName: string) => {
  try {
    const data = await serviceAxios.get<Blob>(requestUrl);
    const pdfBlob = new Blob([data.data], { type: "application/pdf" });
    const pdfBlobUrl = window.URL.createObjectURL(pdfBlob);
    const a = document.createElement("a");
    a.href = pdfBlobUrl;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(pdfBlobUrl);
  } catch (e) {
    console.log(e);
  }
};

export { pdfBlobDownload };
