const upload = document.querySelector('input[type="file"]');
const img = document.querySelector('#image');
const message = document.querySelector('#message');
const classifier = ml5.imageClassifier('MobileNet', modelReady);

upload.addEventListener("change", (event) => uploadImage(event));   // upload image
img.addEventListener("load", () => classifyImage());    // make sure image is loaded before classification

function modelReady() {
    console.log('model is ready!');
    message.innerHTML = 'Please upload an image!';
}

function uploadImage(event) {
    const files = event.target.files;
    
    if (files && files[0]) {
        const uploadedImg = files[0];

        img.onload = () => {
            URL.revokeObjectURL(uploadedImg.src);
        }

        img.src = URL.createObjectURL(uploadedImg);
    }
}

function showResults(results) {
    message.innerHTML = `I think the image is of a ${results[0].label}. I am ${resultsToPercentage(results[0].confidence)}% confident.`;
}

function classifyImage() {
    classifier
        .classify(img)
        .then(results => showResults(results))
        .catch(err => console.error(err));
}

function resultsToPercentage(num) {
    return Math.round((num + Number.EPSILON) * 10000) / 100;
}
