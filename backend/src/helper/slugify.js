export function slugify(text) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export const finalSlugify = async (slug, checkfunction) => {
    let finalSlug = slug;
    let count = 1;
    while (await checkfunction(finalSlug)) {
        finalSlug = `${slug}-${count}`
        console.log("Final Slug ->", finalSlug);
        count++
    }

    return finalSlug
}