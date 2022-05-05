export const readFileAsUrl = (file: File) => new Promise<string | null>((resolve) => {
  const reader = new FileReader();
  reader.onload = function () {
    const readResult = reader.result as string;
    resolve(readResult);
  };
  reader.onerror = function () {
    resolve(null);
  };
  reader.readAsDataURL(file);
});
