"use client";
import actionFile from "./actionFile";

export default function UploadForm() {
  return (
    <form action={actionFile}>
      <input type="file" name="arquivo" />
      <button className="border-2  border-slate-600" type="submit">
        Upload
      </button>
    </form>
  );
}
