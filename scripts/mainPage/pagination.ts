import { router } from "../routing/routing.js";

export function viewPagination(totalPages: number, currentPage: number) {
    const pagination: HTMLUListElement = document.getElementById('pagination') as HTMLUListElement;
    pagination.innerHTML = '';

    const ul: HTMLUListElement = document.createElement('ul');
    ul.classList.add('pagination');

    const maxButtonsToShow: number = 10;
    const halfMaxButtonsToShow: number = Math.floor(maxButtonsToShow / 2);
    
    let startPage: number = 1;
    let endPage:number = totalPages;

    if (totalPages > maxButtonsToShow) {
        if (currentPage > halfMaxButtonsToShow) {
            startPage = Math.max(currentPage - halfMaxButtonsToShow, 1);
            endPage = Math.min(currentPage + halfMaxButtonsToShow, totalPages);
        } else {
            endPage = maxButtonsToShow;
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        const pageButton = document.createElement('li');
        pageButton.classList.add('page-item');

        const link: HTMLAnchorElement = document.createElement('a');
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

function updatePageQueryParam(pageNumber: number) {
    const newUrl: URL = new URL(window.location.href);
    newUrl.searchParams.set('page', pageNumber.toString());
    history.pushState(null, null, newUrl.toString());
    router();
}
