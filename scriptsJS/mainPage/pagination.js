import { router } from "../routing/routing.js";
export function viewPagination(totalPages, currentPage) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    const ul = document.createElement('ul');
    ul.classList.add('pagination');
    const maxButtonsToShow = 7;
    const halfMaxButtonsToShow = Math.floor(maxButtonsToShow / 2);
    let startPage = 1;
    let endPage = totalPages;
    if (totalPages > maxButtonsToShow) {
        if (currentPage > halfMaxButtonsToShow) {
            startPage = Math.max(currentPage - halfMaxButtonsToShow, 1);
            endPage = Math.min(currentPage + halfMaxButtonsToShow, totalPages);
        }
        else {
            endPage = maxButtonsToShow;
        }
    }
    for (let i = startPage; i <= endPage; i++) {
        const pageButton = document.createElement('li');
        pageButton.classList.add('page-item');
        const link = document.createElement('a');
        link.classList.add('page-link');
        link.textContent = i.toString();
        link.addEventListener('click', function () {
            updatePageQueryParam(i);
        });
        if (i === currentPage) {
            pageButton.classList.add('active');
        }
        pageButton.appendChild(link);
        ul.appendChild(pageButton);
    }
    pagination.appendChild(ul);
}
function updatePageQueryParam(pageNumber) {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('page', pageNumber.toString());
    history.pushState(null, null, newUrl.toString());
    router();
}
//# sourceMappingURL=pagination.js.map