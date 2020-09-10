async function UnZip(ZipFile) {
    let zip = new JSZip();
    return [...(await zip.loadAsync(ZipFile).files)];
}
export default UnZip;
