const loadData = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
  const data = await res.json();
  displayTools(data);
};

const displayTools = (data) => {
  const cardContainer = document.getElementById("card-container");

  data.data.tools.forEach((tool) => {
    const toolCard = document.createElement("div");
    toolCard.classList = "card bg-base-100 shadow-xl";
    toolCard.innerHTML = `
                            <figure class="px-5 py-10 h-56 ">
                                    <img src="${
                                      tool.image
                                    }" alt="Shoes" class="rounded-lg" />
                            </figure>
                            <div class="card-body">
                                    <h2 class="card-title text-2xl font-semibold">Features</h2>
                                    <div>
                                    ${tool.features
                                      .map(
                                        (feature, index) => `
                                      <p class="mb-2">${
                                        index + 1
                                      }. ${feature}</p>
                                    `
                                      )
                                      .join("")}
                                  </div>
                                    <hr>
                                    <div class="flex justify-between items-center">
                                        <div class="space-y-4">
                                            <h4 class="card-title text-2xl font-semibold">${
                                              tool.name
                                            }</h4>
                                            <div class="flex items-center gap-4">
                                                <i class="fa-solid fa-calendar-days"></i>
                                                <span>${
                                                  tool.published_in
                                                }</span>
                                            </div>
                                        </div>
                                        <div>
                                            <button onclick="handleShowModal('${
                                              tool.id
                                            }')" class="bg-red-100 rounded-full p-3">
                                                <i class="fa-solid fa-arrow-right text-red-600 text-center"></i>
                                            </button>
                                        </div>
                                    </div>
                                    
                            </div>
    `;
    cardContainer.appendChild(toolCard);
  });
};

const handleShowModal = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/ai/tool/${id}`
  );
  const data = await res.json();
  showToolDetails(data);
};

const showToolDetails = (data) => {
  const firstBox = document.getElementById("first-div");
  firstBox.innerHTML = `
            <h3 class="text-xl font-semibold">${data.data?.description}</h3>
            <div class="flex flex-col md:flex-row lg:flex-row justify-between mt-6">
                ${data.data.pricing.map(
                  (price) => `
                <div class="border bg-white p-5 rounded-xl">
                    <p class="text-sm font-bold">${price?.price}</p>
                    <p class="text-md text-green-500 font-bold">${price?.plan}</p>
                </div>
                `
                )}
            </div>


            <div class="flex flex-col md:flex-row lg:flex-row mt-8 justify-between">
                  <div class="space-y-2">
                    <h4 class="text-2xl font-bold">Features</h4>
                     <p class="text-xs">1. ${
                       data.data.features[1].feature_name
                     }</p>
                     <p class="text-xs">2. ${
                       data.data.features[2].feature_name
                     }</p>
                     <p class="text-xs">3. ${
                       data.data.features[3].feature_name
                     }</p>
                  </div>

                  <div class="space-y-2 mt-5 md:mt-0 lg:mt-0">
                    <h4 class="text-2xl font-bold">Integrations</h4>
                     ${data?.data?.integrations
                       ?.map(
                         (integration, index) => `
                        <p class="text-xs"> ${
                          index + 1
                        }. ${integration}</p>                          
                    `
                       )
                       .join("")}
                  </div>
            </div>
  `;

  const secondBox = document.getElementById("second-div");
  secondBox.innerHTML = `
                 <img class="rounded-xl h-56" src="${
                   data.data.image_link
                 }"></img>
                 <div class="mt-4 space-y-2">
                        ${data.data.input_output_examples
                          .map(
                            (text, index) => `
                            <p class="text-xl font-bold">${index + 1}. ${
                              text.input
                            }</p>
                            <p>${text.output}</p>
                        `
                          )
                          .join("")}
                 </div>     
  `;
  show_detail_modal.showModal();
};

loadData();
