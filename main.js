Webcam.set({
    width: 350,
    height: 300,
    image_format:"png",
    png_quality: 90
})

Webcam.attach("#webcam")

function capture() {
    Webcam.snap((data_uri) => {
        document.getElementById("snapshot").innerHTML = "<img id ='snapimage' src=" + data_uri + ">"
    })
}

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/umRMyPIQd/model.json", modelLoaded)

function modelLoaded() {
    console.log("Model is OK")
}

function identify() {
    img = document.getElementById("snapimage")
    classifier.classify(img, gotResult)
}

function gotResult(error, result) {
    if (error) {
        console.log(error)
    } else {
        console.log(result)
        document.getElementById("object").innerHTML = "Object: " + result[0].label
        document.getElementById("accuracy").innerHTML = "Accuracy: " + (result[0].confidence*100).toFixed(2) + "%"
    }
}