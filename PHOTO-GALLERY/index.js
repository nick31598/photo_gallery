const btnE1 = document.getElementById("btn")
const errorMessageE1 = document.getElementById("errorMessage")
const galleryEl = document.getElementById("gallery");

async function fetchImage(){
    const inputValue = document.getElementById("input").value;

    if(inputValue > 10 ||  inputValue < 1){
        errorMessageE1.style.display = "block";
        errorMessageE1.innerText = "Number should be between 0 and 11";
        return;
    }

    imgs = "";

    try {
        btnE1.style.display = "none";
        const loading = `<img src="spinner.svg" />`;
        galleryEl.innerHTML = loading;
    await fetch(
        `https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.round(
        Math.random() * 1000
      )}&client_id=mDKw0pKn-an6eO81mpHZR4EzdercZcrE_KM1PqpIrbg`
    ).then((res) =>
      res.json().then((data) => {
        if (data) {
          data.forEach((pic) => {
            imgs += `
            <img src=${pic.urls.small} alt="image"/>
            `;
            galleryEl.style.display = "block";
            galleryEl.innerHTML = imgs;
            btnE1.style.display = "block";
            errorMessageE1.style.display = "none";
          });
        }
      })
    );
  } catch (error) {
    console.log(error);
    errorMessageE1.style.display = "block";
    errorMessageE1.innerHTML = "An error happened, try again later";
    btnE1.style.display = "block";
    galleryEl.style.display = "none";
  }
}

btnE1.addEventListener("click", fetchImage);
