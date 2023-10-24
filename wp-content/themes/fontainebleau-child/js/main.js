// URL
const url = "https://fontainebleau.city-junction.com";
const chargesUrl = `${url}/_charges_api.php`;

const state = {
  page: 1,
};

// Services
const searchCatalogue = async ({
  page = 1,
  limit = 9,
  order = "H.hou_prx_mon ASC",
  cty_dst = "Any",
  houseRef = "",
  type = "Any",
  date = "Any",
  hou_sub_lea,
} = {}) => {
  try {
    const response = await fetch(
      `${url}/_housings.php?page=${page}&order=${order}&limit=${limit}&hou_ref=${houseRef}&typhou_idt=${type}&hou_dat_dis=${date}${
        hou_sub_lea ? "&hou_sub_lea=" + hou_sub_lea : ""
      }&cty_dst=${cty_dst}`,
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
  cty_dst = "Any",
  houseRef = "",
} = {}) => {
  try {
    const response = await fetch(
      `${url}/_housing-outside-fontainebleau.php?page=${page}&order=${order}&limit=${limit}&hou_ref=${houseRef}&cty_dst=${cty_dst}`,
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

const findById = async ({ hou_idt = "", limit = 1, clear = 1 } = {}) => {
  try {
    const response = await fetch(
      `${url}/_housings.php?hou_idt=${hou_idt}&clear=${clear}&limit=${limit}`,
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

const getCharges = async (hou_idt) => {
  try {
    const response = await fetch(`${chargesUrl}?hou_idt=${hou_idt}`, {
      method: "GET",
    });
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
  container.innerHTML = "";
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
      .replace("{{% SUB_DATE %}}", element?.hou_dat_dis_sub_lea)
      .replaceAll(
        "{{% URL %}}",
        "/wp-front/property-detail/?reference=" +
          element?.hou_url +
          "&hou_idt=" +
          element?.hou_idt
      )
      .replace(
        "{{% IMAGE_URL %}}",
        url + "/data/imgs/objects/catalog/" + element?.hou_img_1
      );

    const doc = parser.parseFromString(html, "text/html");
    const card = doc.querySelector(".card-item");
    const cardStar = card?.querySelector(".card-stars");
    let startsContent = "";

    const stars = parser.parseFromString(element?.hou_sta_lst, "text/html");
    nbrOfStars = stars.querySelectorAll("span")?.length;

    for (let index = 0; index < nbrOfStars; index++) {
      startsContent += '<i class="fa fa-star"></i>';
    }
    cardStar.innerHTML = startsContent;

    const auditEle = card?.querySelector(".card-audit img");
    const subleaseEle = card?.querySelector(".card-sub-date");
    const distanceEle = card?.querySelector(".distance__js");
    const km = element?.cty_dst?.split(" ")?.[0];
    if (km > 10) {
      distanceEle?.classList.remove("fa-street-view");
      distanceEle?.classList.add("fa-car");
    } else {
      distanceEle?.classList.add("fa-street-view");
      distanceEle?.classList.remove("fa-car");
    }

    if (element?.hou_sub_lea == "N") {
      subleaseEle?.remove();
    }

    if (element?.hou_ser != "") {
      auditEle?.setAttribute(
        "src",
        "/wp-front/wp-content/uploads/2023/10/itemaudited2023.png"
      );
    } else {
      auditEle?.remove();
    }

    container.append(card);
  });
};

const renderPagination = (totalCount) => {
  const paginationContainer = document.querySelector("#pagination-container");
  if (!paginationContainer) return;

  paginationContainer.innerHTML = "";

  const totalPages = Math.ceil(totalCount / 9);
  let html = "";

  for (let index = 0; index < totalPages; index++) {
    const page = index + 1;
    const pageElement = `<li data-page="${page}" class="pagination__item__js ${
      state.page == page ? "active" : ""
    }"><span data-page="${page}">${page}</span></li>`;
    html += pageElement;
  }
  paginationContainer.innerHTML = paginationElement.replace(
    "{{%CONTENT%}}",
    html
  );

  handlePaginationevents();
};

const handlePaginationevents = () => {
  const paginationItems = document.querySelectorAll(".pagination__item__js");
  if (!paginationItems) return;
  paginationItems.forEach((item) => {
    item.addEventListener("click", async (e) => {
      e.stopPropagation();
      const page = e.target?.dataset?.page;
      if (!page) return;

      document
        .querySelector(".pagination__item__js.active")
        ?.classList?.remove("active");
      item?.classList?.add("active");

      window.scrollTo(0, 250);
      state.page = page;
      if (location?.pathname == "/wp-front/results-sharing/") {
        const data = await searchCatalogue({ page, type: "Two bedrooms" });
        renderCards(data);
        initMap(data);
      } else if (
        location?.pathname == "/wp-front/insead-housing-options-near-fontainebleau/"
      ) {
        const data = await getNearBy({ page });
        renderCards(data);
      } else if (location?.pathname == "/wp-front/results-studio-8/") {
        const data = await searchCatalogue({ page, type: 9 });
        renderCards(data);
      } else {
        const data = await searchCatalogue({ page });
        renderCards(data);
        initMap(data);
      }
    });
  });
};

const renderFilters = (forSharing = false) => {
  const filterContainer = document.querySelector("#filter-container");
  if (!filterContainer) return;

  filterContainer.innerHTML = forSharing
    ? location.pathname == "/wp-front/search-catalogue/" ? filterElementForSearchCataglogue : filterElementForSharing
    : filterElement;
  handleFilterEvents();
};

const handleFilterEvents = () => {
  const typeFilter = document.querySelector(".type-filter");
  const dateFilter = document.querySelector(".date-filter");
  const priceFilter = document.querySelector(".price-filter");
  const distanceFilter = document.querySelector(".distance-filter");
  const refineBtn = document.querySelector("#refine-btn");

  refineBtn.addEventListener("click", async (e) => {
    e.stopPropagation();
    const type = typeFilter?.value;
    const date = dateFilter?.value;
    const price = priceFilter?.value;
    const distance = distanceFilter?.value;

    switch (location.pathname) {
      case "/wp-front/search-catalogue/":
      case "/wp-front/results-sharing/":
        const data = await searchCatalogue({
          type,
          date,
          order: price,
          cty_dst: distance,
        });
        renderCards(data);
        renderPagination(data?.data?.count);
        initMap(data);
        break;
      case "/wp-front/insead-housing-options-near-fontainebleau/":
        const nearBy = await getNearBy({
          order: price,
          cty_dst: distance,
        });
        renderCards(nearBy);
        renderPagination(nearBy?.data?.count);
        break;
      case "/wp-front/results-studio-8/":
      case "/wp-front/results-sublease/":
        const studenst = await searchCatalogue({
          type,
          date,
          order: price,
          cty_dst: distance,
        });
        renderCards(studenst);
        renderPagination(studenst?.data?.count);
        break;
      default:
        console.log("Nothing to filter");
        break;
    }
  });
};

const renderDetailsPage = (data) => {
  const [item] = data?.data?.items;

  const article = document.querySelector("article");

  const propertyEquipment = article?.querySelector("#property-equipment");

  if (propertyEquipment) {
    propertyEquipment.innerHTML = "";
    propertyEquipment.innerHTML = item?.hou_equ_col;
  }
  if (article) {
    let content = article?.innerHTML;
    content = content
      .replace("{{%cty_name%}}", item?.cty_nam)
      .replace("{{%hou_prx_mon_tot%}}", item?.hou_prx_mon_tot)
      .replace("{{%hou_prx_mon%}}", item?.hou_prx_mon)
      .replace("{{%hou_sec_dep_mnt%}}", item?.hou_sec_dep_mnt)
      .replace("{{%hou_exp_for%}}", item?.hou_exp_for)
      .replace("{{%hou_exp_pro%}}", item?.hou_exp_pro)
      .replace("{{%hou_dat_dis%}}", item?.hou_dat_dis)
      .replace("{{%hou_dat_dis%}}", item?.hou_dat_dis)
      .replace("{{%hou_sur%}}", item?.hou_sur)
      .replace("{{%cty_dst%}}", item?.cty_dst)
      .replace("{{%hou_bed_cnt%}}", item?.hou_bed_cnt)
      .replace("{{%hou_bth_cnt%}}", item?.hou_bth_cnt)
      .replace("{{%hou_dsc%}}", item?.hou_dsc)
      .replace("{{%hou_idt%}}", item?.hou_idt)
      .replace("{{%hou_ref%}}", item?.hou_ref)
      .replace("{{%hou_vis_cnt%}}", item?.hou_vis_cnt)
      .replace("{{%sub_cat%}}", item?.typhou_lib);

    article.innerHTML = content;

    // <div class="swiper-slide">Slide 1</div>
    const sliderEl = document?.querySelector("#property-slider");
    if (!sliderEl) return;
    let images = "";

    if (item?.hou_img_1) {
      images += `<div class="swiper-slide"><img src="${url}/data/imgs/objects/large/${item?.hou_img_1}" alt="${item?.cty_nam}" /></div>`;
    }
    if (item?.hou_img_2) {
      images += `<div class="swiper-slide"><img src="${url}/data/imgs/objects/large/${item?.hou_img_2}" alt="${item?.cty_nam}" /></div>`;
    }
    if (item?.hou_img_3) {
      images += `<div class="swiper-slide"><img src="${url}/data/imgs/objects/large/${item?.hou_img_3}" alt="${item?.cty_nam}" /></div>`;
    }
    if (item?.hou_img_4) {
      images += `<div class="swiper-slide"><img src="${url}/data/imgs/objects/large/${item?.hou_img_4}" alt="${item?.cty_nam}" /></div>`;
    }
    if (item?.hou_img_5) {
      images += `<div class="swiper-slide"><img src="${url}/data/imgs/objects/large/${item?.hou_img_5}" alt="${item?.cty_nam}" /></div>`;
    }
    if (item?.hou_img_6) {
      images += `<div class="swiper-slide"><img src="${url}/data/imgs/objects/large/${item?.hou_img_6}" alt="${item?.cty_nam}" /></div>`;
    }
    if (item?.hou_img_7) {
      images += `<div class="swiper-slide"><img src="${url}/data/imgs/objects/large/${item?.hou_img_7}" alt="${item?.cty_nam}" /></div>`;
    }
    if (item?.hou_img_8) {
      images += `<div class="swiper-slide"><img src="${url}/data/imgs/objects/large/${item?.hou_img_8}" alt="${item?.cty_nam}" /></div>`;
    }
    if (item?.hou_img_9) {
      images += `<div class="swiper-slide"><img src="${url}/data/imgs/objects/large/${item?.hou_img_9}" alt="${item?.cty_nam}" /></div>`;
    }
    sliderEl.innerHTML = slider?.replace("{{%SLIDERS%}}", images);

    new Swiper(".swiper", {
      // Optional parameters
      direction: "horizontal",
      loop: true,

      // If we need pagination
      // pagination: {
      //   el: ".swiper-pagination",
      // },

      // Navigation arrows
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      // And if we need scrollbar
      // scrollbar: {
      //   el: ".swiper-scrollbar",
      // },
    });
  }

  const distanceEle = document?.querySelector(".distance__js i");
  const km = item?.cty_dst?.split(" ")?.[0];
  if (km > 10) {
    distanceEle?.classList.remove("fa-street-view");
    distanceEle?.classList.add("fa-car");
  } else {
    distanceEle?.classList.add("fa-street-view");
    distanceEle?.classList.remove("fa-car");
  }

  const subleaseEle = document?.querySelector("#sublease");
  if (item?.hou_sub_lea == "N") {
    subleaseEle?.remove();
  }

  const parser = new DOMParser();
  const cardStar = document?.querySelector(".elementor-star-rating");
  let startsContent = "";

  const stars = parser.parseFromString(item?.hou_sta_lst, "text/html");
  nbrOfStars = stars.querySelectorAll("span")?.length;

  for (let index = 0; index < nbrOfStars; index++) {
    startsContent += '<i class="elementor-star-full"></i>';
  }
  cardStar.innerHTML = startsContent;
};

// Initialize and display the map
function makeInfoWindowEvent(map, infowindow, contentString, marker) {
  google.maps.event.addListener(marker, "click", function () {
    infowindow.setContent(contentString);
    infowindow.open(map, marker);
  });
}

function initMap(data) {
  let point = {
    lat: 48.4235486,
    lng: 2.5993443,
  };

  if (data?.items?.length > 0) {
    point = {
      lat: parseFloat(data?.data?.items?.[0]?.cty_lat),
      lng: parseFloat(data?.data?.items?.[0]?.cty_lng),
    };
  }

  const map = new google.maps.Map(document.getElementById("map-section"), {
    center: point,
    zoom: data?.items?.length > 0 ? 15 : 9,
  });

  const infowindow = new google.maps.InfoWindow();

  data?.data?.items?.forEach((item) => {
    const marker = new google.maps.Marker({
      position: {
        lat: parseFloat(item?.hou_lat),
        lng: parseFloat(item?.hou_lng),
      },
      map: map,
      title: item?.cty_nam,
    });
    const content = `<div class="map-info-window"><div class="map-info-window__header"><img width="170px" height="100px" src="${url}/data/imgs/objects/catalog/${item?.hou_img_1}" alt="${item?.cty_nam}" /></div><div class="map-info-window__body"><h3 style="margin:5px 0px">${item?.cty_nam}</h3><p style="margin: 2px">${item?.hou_add}</p><p style="margin: 2px">${item?.cty_zip}</p></div></div>`;
    makeInfoWindowEvent(map, infowindow, content, marker);
  });
}

function renderCharges(target, totalCharges, data, isExcluded = false) {
  const tbody = target.querySelector("tbody");
  const [row1, row2] = tbody.querySelectorAll("tr");
  const clonedTotal = row2?.cloneNode(true);

  tbody.innerHTML = "";

  data?.forEach((item) => {
    const clonedItem = row1?.cloneNode(true);
    clonedItem.querySelector("td:nth-child(1) > div > div").innerHTML =
      item?.nam;
    clonedItem.querySelector("td:nth-child(2) > div > div").innerHTML =
      item?.mnt;
    tbody.append(clonedItem);
  });
  if (isExcluded) return;
  clonedTotal.querySelector("td:nth-child(2) > div > div > b").innerHTML =
    totalCharges;
  tbody.append(clonedTotal);
}

document.addEventListener("DOMContentLoaded", async () => {
  switch (location.pathname) {
    case "/wp-front/search-catalogue/":
      const data = await searchCatalogue();
      renderCards(data);
      renderPagination(data?.data?.count);
      renderFilters(true);
      initMap(data);
      break;
    case "/wp-front/insead-housing-options-near-fontainebleau/":
      const nearBy = await getNearBy();
      renderCards(nearBy);
      renderFilters(false);
      renderPagination(nearBy?.data?.count);
      break;
    case "/wp-front/results-sharing/":
      const sharingData = await searchCatalogue({ type: "Two bedrooms" });
      renderCards(sharingData);
      renderPagination(sharingData?.data?.count);
      renderFilters(true);
      initMap(sharingData);
      break;
    case "/wp-front/results-studio-8/":
      const studenst = await searchCatalogue({ type: 9 });
      renderCards(studenst);
      renderFilters(false);
      renderPagination(studenst?.data?.count);
      break;
    case "/wp-front/results-sublease/":
      const subLeases = await searchCatalogue({ hou_sub_lea: "Y" });
      if (subLeases?.data?.items?.length == 0) {
        document.querySelector("#text-section").style.display = "block";
      } else {
        document.querySelector("#text-section").style.display = "none";
        renderCards(subLeases);
        renderFilters(false);
        renderPagination(subLeases?.data?.count);
      }
      initMap(subLeases);
      break;
    case "/wp-front/property-detail/":
      const params = new URLSearchParams(location.search);
      const id = params?.get("hou_idt");
      if (!id) return;
      const article = document.querySelector("#section-details");
      const loaderSection = document.querySelector("#loader-section");
      if (!article) return;
      // Render loading status
      article.style.display = "none";
      loaderSection.style.display = "block";
      loaderSection.innerHTML = '<i class="fa fa-spinner fa-5x fa-spin"></i>';
      const propertyDetails = await findById({
        hou_idt: params?.get("hou_idt"),
      });

      const { data: charges, isSuccess } = await getCharges(
        params?.get("hou_idt")
      );

      const noChargeContainer = document.querySelector("#nocharge");
      const excludedContainer = document.querySelector("#excluded");
      const includedFixedContainer = document.querySelector("#included-fixed");
      const includedProviContainer = document.querySelector("#included-provi");

      if (Object.keys(charges)?.length == 0) {
        noChargeContainer.style.display = "block";
        excludedContainer.style.display = "none";
        includedFixedContainer.style.display = "none";
        includedProviContainer.style.display = "none";
      } else {
        noChargeContainer.style.display = "none";
        if (charges?.excluded) {
          excludedContainer.style.display = "block";
          renderCharges(
            excludedContainer,
            propertyDetails?.data?.items?.[0]?.hou_exp_pro,
            charges?.excluded,
            true
          );
        } else {
          excludedContainer.style.display = "none";
        }
        if (charges?.forfait) {
          includedFixedContainer.style.display = "block";
          renderCharges(
            includedFixedContainer,
            propertyDetails?.data?.items?.[0]?.hou_exp_for,
            charges?.forfait
          );
        } else {
          includedFixedContainer.style.display = "none";
        }
        if (charges?.provision) {
          includedProviContainer.style.display = "block";
          renderCharges(
            includedProviContainer,
            propertyDetails?.data?.items?.[0]?.hou_exp_pro,
            charges?.provision
          );
        } else {
          includedProviContainer.style.display = "none";
        }
      }

      article.style.display = "block";
      loaderSection.style.display = "none";
      renderDetailsPage(propertyDetails);
      initMap(propertyDetails);
      break;
    default:
      console.log("Nothing to fetch");
      break;
  }
  console.log("Page loaded succefully");
});
