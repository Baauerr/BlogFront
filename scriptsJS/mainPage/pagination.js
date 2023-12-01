import { applyFormDataToClass } from "./mainPagePostView.js";
export function viewPagination(numberOfPages) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    const ul = document.createElement('ul');
    ul.classList.add('pagination');
    for (let i = 1; i <= numberOfPages; i++) {
        const pageButton = document.createElement('li');
        pageButton.classList.add('page-item');
        const link = document.createElement('a');
        link.classList.add('page-link');
        link.textContent = i.toString();
        link.addEventListener('click', function () {
            updatePageQueryParam(i);
        });
        pageButton.appendChild(link);
        ul.appendChild(pageButton);
    }
    pagination.appendChild(ul);
}
function updatePageQueryParam(pageNumber) {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('page', pageNumber);
    history.pushState(null, null, newUrl.toString());
    applyFormDataToClass();
}
//# sourceMappingURL=pagination.js.map