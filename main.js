let saturate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayscale = document.getElementById("grayscale");
let Blur = document.getElementById("blur");
let huerotate = document.getElementById("hue-rotate");
let upload = document.getElementById("file");
let download = document.getElementById("download");
let img = document.querySelector(".img img");
let reset = document.querySelector("span");
let imgBox = document.querySelector(".img");
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
function resetValues() {
    saturate.value = 100 
    contrast.value = 100;
    brightness.value = 100;
    sepia.value = 100;
    grayscale.value = 0;
    Blur.value = 0;
    huerotate.value = 0;
}
download.onclick =  () => {
    download.href = canvas.toDataURL();
}
window.onload =  () => {
    resetValues();
    download.style.display = "none";
    reset.style.display = "none";
}
upload.onchange = () => {
    download.style.display = "block";
    reset.style.display = "block";
    resetValues();
    img.style.filter = "none";
    let file = new FileReader();
    file.readAsDataURL(upload.files[0]);
    file.onload = () => {
        img.src = file.result;
    };
    img.onload = function () {
        originalImage = new Image(); 
        originalImage.src = img.src; 
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);
        img.style.display = "none";
    }
}
let filters = document.querySelectorAll("ul li input");
filters.forEach(filter => {
    filter.addEventListener("input",  () => {
        ctx.filter = `
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${Blur.value}px)
        hue-rotate(${huerotate.value}deg)
        `;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }) 
})
reset.addEventListener("click", () => {
    resetValues();
    img.style.filter = "none";
    ctx.filter = "none";
    ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);
});