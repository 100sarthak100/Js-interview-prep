import { countryData } from "./helper.js";

// import './styles.css';
const serachInput = document.getElementById("search");
const suggestion = document.getElementById("result");
const intersectionLine = document.getElementById("intersection-line")

const getSuggestions = (val) => {
  let filteredData = countryData?.filter((item) => {
    return item?.toLowerCase()?.includes(val?.toLowerCase());
  });

  //   console.log("filter", filteredData);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(filteredData);
    }, 300);
  });
};

let page = 1;
let count = 30;

let mainResponse = [];

const handleSuggestion = async (val) => {
    if(!mainResponse.length || Math.ceil(mainResponse.length / count) < page) {
        return;
    }

  console.log("mian response", mainResponse.length, page, count);
  let start = page * count - count;
  let end = page * count;

  console.log("start", start, end)

  for (let i = start; i < end; ++i) {
    let ele = mainResponse[i]
    console.log("ele", ele)

    if(!ele) {
        break;
    }

    const divEle = document.createElement("div");

    divEle.innerHTML = ele;
    divEle.classList.add("suggestion-item");
    divEle.setAttribute("data-key", ele);

    suggestion.appendChild(divEle);
  }

  page += 1;
//   suggestion.innerHTML = "";
};

const handleInputChange = async (e) => {
  //   console.log("e", e.target.value);

  let value = e.target.value;

  if (value) {
    const response = await getSuggestions(value);

    mainResponse = response;

    handleSuggestion(value);
  } else {
    suggestion.innerHTML = "";
  }
};

const handleSuggestionSelect = (e) => {
  console.log("s", e);

  const { key } = e.target.dataset;

  serachInput.value = key;

  suggestion.innerHTML = "";
};

(() => {
  serachInput.addEventListener("input", handleInputChange);

  suggestion.addEventListener("click", handleSuggestionSelect);
})();

let options = {
  //   root: document.querySelector("#result"),
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
};

const callback = (enteries, observer) => {
  console.log("observe", enteries, observer);

  enteries.forEach((item) => {
    console.log("item", item.isIntersecting)

    if(item?.isIntersecting) {
        handleSuggestion();
    }
  })
};

let observer = new IntersectionObserver(callback, options);

observer.observe(intersectionLine);
