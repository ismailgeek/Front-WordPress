// URL
const url = "https://fontainebleau.city-junction.com";
// Services
const searchCatalogue = async ({
  page = 1,
  limit = 9,
  order = "H.hou_prx_mon ASC",
  houseRef = "",
  type = "Any",
  date = "Any",
} = {}) => {
  try {
    const response = await fetch(
      `${url}/_housings.php?page=${page}&order=${order}&limit=${limit}&hou_ref=${houseRef}&typhou_idt=${type}&hou_dat_dis=${date}`,
      {
        method: "GET",
      }
    );
    const json = await response.json();
    return {
      isSuccess: true,
      data: json,
    };
  } catch (error) {
    return {
      isSuccess: false,
      data: error,
    };
  }
};
const getNearBy = async ({
  page = 1,
  limit = 9,
  order = "H.hou_prx_mon ASC",
  houseRef = "",
} = {}) => {
  try {
    const response = await fetch(
      `${url}/_housing-outside-fontainebleau.php?page=${page}&order=${order}&limit=${limit}&hou_ref=${houseRef}`,
      {
        method: "GET",
      }
    );
    const json = await response.json();
    return {
      isSuccess: true,
      data: json,
    };
  } catch (error) {
    return {
      isSuccess: false,
      data: error,
    };
  }
};

// UI Helpers
const renderCards = (data) => {
  const parser = new DOMParser();
  const container = document.querySelector("#card-section");
  data?.data?.items?.forEach((element) => {
    let html = cardElement
      .replace("{{% DISTANCE %}}", element?.cty_dst)
      .replace("{{% DISTANCE %}}", element?.cty_dst)
      .replace("{{% TITLE %}}", element?.cty_nam)
      .replace("{{% NBR_OF_BEDS %}}", element?.hou_bed_cnt)
      .replace("{{% SHOWER %}}", element?.hou_bth_cnt)
      .replace("{{% CATEGORY %}}", element?.typhou_lib)
      .replace("{{% SURFACE %}}", element?.hou_sur)
      .replace("{{% NBR_OF_VIEWS %}}", element?.hou_vis_cnt)
      .replace("{{% PRICE %}}", element?.hou_prx_mon)
      .replaceAll(
        "{{% URL %}}",
        "/property-detail/?reference=" + element?.hou_url
      )
      .replace(
        "{{% IMAGE_URL %}}",
        url + "/data/imgs/objects/catalog/" + element?.hou_img_1
      );

    const doc = parser.parseFromString(html, "text/html");
    const card = doc.querySelector(".card-item");
    const cardStar = card?.querySelector(".card-stars");
    let startsContent = "";
    for (let index = 0; index < element?.hou_sta; index++) {
      startsContent += '<i class="fa fa-star"></i>';
    }
    cardStar.innerHTML = startsContent;

    const auditEle = card?.querySelector(".card-audit img");
    if (element?.hou_ser != "") {
      auditEle?.setAttribute(
        "src",
        "/wp-content/uploads/2023/10/itemaudited2023.png"
      );
    } else {
      auditEle?.remove();
    }

    container.append(card);
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  switch (location.pathname) {
    case "/search-catalogue/":
      const data = await searchCatalogue();
      renderCards(data);
      break;
    case "/insead-housing-options-near-fontainebleau/":
      const nearBy = await getNearBy();
      renderCards(nearBy);
      break;
    case "/results-sharing/":
      const sharingData = await searchCatalogue({ type: "Two bedrooms" });
      renderCards(sharingData);
      break;
    case "/results-studio-8/":
      const studenst = await searchCatalogue({ type: 9 });
      renderCards(studenst);
      break;
    default:
      console.log("Nothing to fetch");
      break;
  }
  console.log("Page loaded succefully");
});
