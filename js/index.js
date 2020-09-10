import { Img, download } from "./Zip.js";
import unzip from "./UnZip.js";

const Download = document.getElementById("download");
const Files = document.getElementById("Files");
const ImgDisplay = document.getElementById("ImgDisplay");
const fileList = document.getElementById("fileList");
const UnZip = document.getElementById("UnZip");
const url = document.getElementById("url");

let ALLFile = [];

//对所有压缩包内文件的展示
Object.defineProperty(ALLFile, "change", {
    set(value) {
        ALLFile = value;
        Files.value = "";
        ALLFile.forEach((file) => {
            let li = document.createElement("li");
            li.innerText = file.name;
            li.title = file.size / 1024 + "K";
            li.addEventListener("dblclick", (e) => {
                let i;
                [...e.target.parentElement.children].some((dom, index1) => (dom.isSameNode(e.target) ? ((i = index1), i) : false));
                ALLFile.splice(i, 1);
                e.target.remove();
            });
            fileList.appendChild(li);
        });
    },
});

// 下载图种按钮
Download.addEventListener("click", () => {
    if (Img.files.length && ALLFile) {
        download(ALLFile);
    }
});

// 图片上传按钮
Img.addEventListener("change", (e) => {
    try {
        URL.revokeObjectURL(ImgDisplay.src);
    } catch (err) {}

    let url = URL.createObjectURL(e.target.files[0]);
    console.log(ImgDisplay);
    ImgDisplay.src = url;
});

// 多文件上传按钮
Files.addEventListener("change", (e) => {
    fileList.innerHTML = "";
    ALLFile.change = [...e.target.files];
});

//解压在线文件
UnZip.addEventListener("click", (e) => {
    fetch(url.value)
        .then((res) => res.blob())
        .then((res) => unzip(res))
        .then((files) => {
            fileList.innerHTML = "";
            ALLFile.change = files;
            Img.src = url.value;
        })
        .catch((err) => alert("这个 URL 不行"));
});
