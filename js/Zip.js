const Img = document.getElementById("Img");

async function getPicZip(input) {
    let zip = new JSZip();
    [...input].forEach((file) => zip.file(file.name, file));

    let content = await zip.generateAsync({ type: "blob" });
    let newOne = new File([Img.files[0], content], Img.files[0].name);
    return newOne;
}
function downBlob(fileList) {
    fileList.forEach((blob) => {
        let a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = blob.name;
        a.click();
        a.remove();
        console.log("%c 完成", "color:green");
    });
}

async function download(input) {
    let zipBlob = await getPicZip(input);
    downBlob([zipBlob]);
}
export { Img, download };
