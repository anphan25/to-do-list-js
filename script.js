document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.querySelector("#name").value;
  const item = {
    id: new Date().toISOString(),
    name: name.trim(),
  };
  //aditem
  addItemToLS(item);
  addItemToUI(item);
});

const getList = () => {
  return JSON.parse(localStorage.getItem("list")) || [];
};

const addItemToLS = (item) => {
  const list = getList();
  list.push(item);
  localStorage.setItem("list", JSON.stringify(list));
};

const addItemToUI = (item) => {
  document.querySelector(".list").insertAdjacentHTML(
    "afterbegin",
    `<div class="mb-3 card d-flex flex-row justify-content-between align-item-center p-2">
      <span>${item.name}</span>
      <button type="button" class="btn btn-sm btn-danger btn-remove data-id=${item.id}">
        Xóa
      </button>
    </div>`
  );

  // const newCard = document.createElement("div");
  // newCard.className =
  //   "mb-3 card d-flex flex-row justify-content-between align-item-center p-2";
  // newCard.innerHTML = `<span>${item.name}</span>
  // <button type="button" class="btn btn-sm btn-danger btn-remove data-id=${item.id}">Xóa</button>`;
  // document.querySelector(".list").appendChild(newCard);
};

const renderItemUI = () => {
  const list = getList();
  list.forEach((item) => {
    addItemToUI(item);
  });
};

renderItemUI();

//remove
const removeItemFromLS = (id) => {
  const list = getList();
  const index = list.findIndex((item) => {
    item.id === id;
  });
  list.splice(index, 1);
  localStorage.setItem("list", JSON.stringify(list));
};
//Ko DOM được những ndoe dc tạo bởi js
//nên DOM thằng hca mấy thằng muốn DOM
document.querySelector(".list").addEventListener("click", (e) => {
  if (e.target.closest(".btn-remove")) {
    let isConfirmed = confirm(
      `Are you sure to remove ${e.target.previousElementSibling.innerHTML}`
    );
    if (isConfirmed) {
      //từ nút button tìm ra thằng card chứa nó
      const removedCard = e.target.parentElement;
      removedCard.remove();
      //xóa ls dựa trên id của thằng btn đã click
      removeItemFromLS(e.target.dataset.id);
    }
  }
});

//remove ALl
document.querySelector(".remove-btn-all").addEventListener("click", (e) => {
  let isConfirmed = confirm(`Are you sure to delete all ?`);
  if (isConfirmed) {
    localStorage.removeItem("list");
    document.querySelector(".list").innerHTML = "";
  }
});

//search
document.querySelector("#filter").addEventListener("keyup", (e) => {
  const value = e.target.value;
  const list = getList();
  const searchList = list.filter((item) => {
    return item.name.toLowerCase().includes(value.toLowerCase());
  });
  document.querySelector(".list").innerHTML = "";
  searchList.forEach((item) => {
    addItemToUI(item);
  });
});
