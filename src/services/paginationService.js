export const getPaginatedData = (items, page, perPage) => {
    const start = (page-1)*perPage
    const end = start + perPage
    return items.map((item,index)=>({
        ...item,
        displayId: index + 1
    })).slice(start,end)
}

export const getTotalPages = (totalItems, perPage) => {
    return Math.ceil(totalItems / perPage)
}

export const switchPage = (page, totalPages, currentPage) => {
    const pageNumber = currentPage.value
    if (page === 'prev' && pageNumber > 1) {
        return pageNumber-1
    } else if (page === 'next' && pageNumber < totalPages.value) {
        return pageNumber+1
    } else if (typeof page === 'number') {
        return page
    }
}